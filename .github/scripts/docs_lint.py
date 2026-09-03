#!/usr/bin/env python3
"""Deterministic consistency checks for the Steadybit docs.

Runs every check against two trees - the pull request's merge result and the tip
of the branch it targets - and reports only what the pull request adds. Existing
debt therefore never fails a build, while anything a change introduces does.

Comparing against the *target branch tip* rather than the merge base is what
catches a merge silently undoing a fix that already landed: the fix is present
in the base tree and absent in the merge result, so it shows up as new.

Usage:
    python3 .github/scripts/docs_lint.py                 # whole tree, no baseline
    python3 .github/scripts/docs_lint.py --base origin/main
    python3 .github/scripts/docs_lint.py --base origin/main --format github

Exit code 1 if there is at least one new error. Warnings never fail the build.
"""

from __future__ import annotations

import argparse
import fnmatch
import json
import os
import re
import subprocess
import sys
import urllib.parse
from dataclasses import dataclass, field

# Pruned when walking. `.gitbook/` is kept, because image and asset links
# resolve into it; it is excluded from the linted set separately below.
PRUNE_DIRS = {".git", "node_modules"}
# Prefixes excluded from the set of documents we lint.
NOT_DOCS = (".github/", ".gitbook/")
CONVENTIONS = "CLAUDE.md"


# --------------------------------------------------------------------------- trees


class Tree:
    """A set of files, either the working directory or a git ref."""

    def __init__(self, ref: str | None = None):
        self.ref = ref
        self._cache: dict[str, str | None] = {}
        # The whole path set is listed once. Resolving a link touches three
        # candidate paths, so per-lookup `git cat-file` calls would mean
        # thousands of subprocesses.
        if ref:
            out = subprocess.run(
                ["git", "ls-tree", "-r", "--name-only", ref],
                capture_output=True, text=True, check=True).stdout.split("\n")
            paths = [p for p in out if p]
        else:
            paths = []
            for root, dirs, names in os.walk("."):
                dirs[:] = [d for d in dirs if d not in PRUNE_DIRS]
                for n in names:
                    paths.append(os.path.relpath(os.path.join(root, n), "."))
        self._blobs = {p for p in paths
                       if p.split("/")[0] not in PRUNE_DIRS}
        self._dirs = set()
        for p in self._blobs:
            parts = p.split("/")[:-1]
            for i in range(len(parts)):
                self._dirs.add("/".join(parts[: i + 1]))

    def files(self, suffix: str = ".md") -> list[str]:
        return sorted(p for p in self._blobs
                      if p.endswith(suffix) and not p.startswith(NOT_DOCS))

    def published(self) -> list[str]:
        """Documents GitBook actually renders as pages.

        `.bookignore` is the repo's own declaration of what is not published -
        CLAUDE.md and the reusable `fragment-*.md` snippets. Their prose is still
        linted; only page-level conventions such as heading case are skipped.
        """
        patterns = [l.strip() for l in (self.read(".bookignore") or "").split("\n")
                    if l.strip() and not l.startswith("#")]
        out = []
        for path in self.files():
            name = os.path.basename(path)
            if any(fnmatch.fnmatch(name, pat) or fnmatch.fnmatch(path, pat)
                   for pat in patterns):
                continue
            out.append(path)
        return out

    def read(self, path: str) -> str | None:
        if path in self._cache:
            return self._cache[path]
        text: str | None
        if self.ref:
            r = subprocess.run(["git", "show", f"{self.ref}:{path}"],
                               capture_output=True, text=True)
            text = r.stdout if r.returncode == 0 else None
        else:
            try:
                with open(path, encoding="utf-8") as fh:
                    text = fh.read()
            except (FileNotFoundError, IsADirectoryError, UnicodeDecodeError):
                text = None
        self._cache[path] = text
        return text

    def exists(self, path: str) -> bool:
        return path in self._blobs or path in self._dirs

    def isdir(self, path: str) -> bool:
        return path in self._dirs and path not in self._blobs


@dataclass(frozen=True)
class Finding:
    check: str
    path: str
    message: str
    line: int = 0
    warning: bool = False

    def key(self):
        """Identity used to diff against the baseline.

        Deliberately excludes the line number, so that shifting a paragraph does
        not resurface every finding below it as new.
        """
        return (self.check, self.path, self.message)


@dataclass
class Result:
    findings: list[Finding] = field(default_factory=list)

    def add(self, *a, **kw):
        self.findings.append(Finding(*a, **kw))


# ------------------------------------------------------------------- md utilities


FENCE = re.compile(r"^\s*(```|~~~)")


def prose_lines(text: str):
    """Yield (line_number, line) for lines outside fenced code blocks."""
    infence = False
    for i, line in enumerate(text.split("\n"), 1):
        if FENCE.match(line):
            infence = not infence
            continue
        if not infence:
            yield i, line


def headings(text: str):
    for i, line in prose_lines(text):
        m = re.match(r"(#{1,6})\s+(.*\S)\s*$", line)
        if m:
            yield i, len(m.group(1)), m.group(2)


def slugs(title: str) -> set[str]:
    """Both slug conventions in use in this repo.

    Links here were written against two different slugifiers - one that collapses
    runs of dashes and one that does not - so an anchor counts as resolvable if
    either form matches.
    """
    t = re.sub(r"[`*_\[\]()]", "", title).strip().lower()
    t = re.sub(r"[^\w\s-]", "", t)
    t = re.sub(r"\s+", "-", t)
    return {t.strip("-"), re.sub(r"-{2,}", "-", t).strip("-")}


def anchors_of(text: str) -> set[str]:
    out: set[str] = set()
    for _, _, title in headings(text):
        out |= slugs(title)
    return out


def resolve(tree: Tree, src: str, target: str) -> str | None:
    """Resolve a relative or root-relative doc link to a file path."""
    if target.startswith("/"):
        base = os.path.normpath(target.lstrip("/"))
    else:
        base = os.path.normpath(os.path.join(os.path.dirname(src), target))
    if base in ("", "."):
        base = "."
    for cand in (base, base + ".md", os.path.join(base, "README.md")):
        if tree.exists(cand) and not tree.isdir(cand):
            return cand
    return base if tree.isdir(base) else None


LINK = re.compile(r"\[[^\]]*\]\(\s*(<[^>]*>|[^)\s]+)")


def links_in(line: str):
    for m in LINK.finditer(line):
        raw = m.group(1).strip()
        if raw.startswith("<") and raw.endswith(">"):
            raw = raw[1:-1]
        yield raw


# ----------------------------------------------------------------------- the checks


DENYLIST = {
    "langauge": "Language", "kuberneters": "Kubernetes", "receieve": "receive",
    "recieve": "receive", "succesfully": "successfully", "expermiment": "experiment",
    "refering": "referring", "versionized": "versioned", "verfiy": "verify",
    "similiar": "similar", "usally": "usually", "looses": "loses",
    "cirds": "CIDRs", "custer": "cluster", "groupd": "group",
    "identifiert": "identifier", "wether": "whether", "exeriment": "experiment",
    "mostly likely": "most likely", "heat dump": "heap dump",
    "productive usage": "production use", "per default": "by default",
    "on the long run": "in the long run",
}

# The docs are US English throughout. These forms are simply not US spellings,
# so matching them cannot collide with ordinary prose.
BRITISH = {
    "colour": "color", "colours": "colors", "coloured": "colored",
    "colouring": "coloring", "behaviour": "behavior", "behaviours": "behaviors",
    "organisation": "organization", "organisations": "organizations",
    "organise": "organize", "organised": "organized",
    "authorisation": "authorization", "authorise": "authorize",
    "initialisation": "initialization", "initialise": "initialize",
    "synchronisation": "synchronization", "synchronise": "synchronize",
    "virtualisation": "virtualization", "visualisation": "visualization",
    "customise": "customize", "prioritise": "prioritize",
    "recognise": "recognize", "summarise": "summarize", "utilise": "utilize",
    "familiarise": "familiarize", "familiarising": "familiarizing",
    "analyse": "analyze", "analysed": "analyzed", "analysing": "analyzing",
    "judgement": "judgment", "licence": "license", "centre": "center",
    "cancelled": "canceled", "cancelling": "canceling",
    "labelled": "labeled", "labelling": "labeling",
    "modelling": "modeling", "travelling": "traveling",
    "fulfilment": "fulfillment", "acknowledgement": "acknowledgment",
    "catalogue": "catalog", "defence": "defense", "favour": "favor",
    "whilst": "while", "amongst": "among",
}

# prose casing: wrong -> right. Applied outside code fences and outside `code spans`.
PRODUCT_NAMES = [
    (re.compile(r"\bWebsocket\b"), "WebSocket"),
    (re.compile(r"\bwebsockets?\b(?!\s*[:=])"), "WebSocket"),
    (re.compile(r"\bDocker compose\b"), "Docker Compose"),
    (re.compile(r"\bGithub\b"), "GitHub"),
    (re.compile(r"\bOpenApi\b"), "OpenAPI"),
    (re.compile(r"\bhelm (chart|charts|values|settings|parameter|script|repository)\b"), "Helm"),
]

MINOR = {"a", "an", "the", "and", "but", "or", "nor", "for", "so", "yet", "at",
         "by", "in", "of", "on", "to", "up", "via", "as", "per", "vs", "vs.",
         "with", "from", "into", "onto", "over", "is", "if"}

CODE_SPAN = re.compile(r"`[^`]*`")


def strip_code(line: str) -> str:
    return CODE_SPAN.sub(lambda m: " " * len(m.group(0)), line)


def check_links_and_anchors(tree: Tree, res: Result):
    cache: dict[str, set[str]] = {}
    for path in tree.files():
        text = tree.read(path) or ""
        for i, line in enumerate(text.split("\n"), 1):
            for raw in links_in(line):
                if raw.startswith(("http://", "https://", "mailto:", "#!")):
                    continue
                target, _, frag = raw.partition("#")
                target = urllib.parse.unquote(target)
                frag = urllib.parse.unquote(frag).lower()
                if target:
                    dest = resolve(tree, path, target)
                    if dest is None:
                        res.add("link", path, f"link target does not exist: {raw}", i)
                        continue
                else:
                    dest = path
                if not frag or frag.startswith("user-content-fn") or tree.isdir(dest):
                    continue
                if dest not in cache:
                    cache[dest] = anchors_of(tree.read(dest) or "")
                if frag not in cache[dest]:
                    res.add("anchor", path, f"no heading matches #{frag} in {dest}", i)


def check_code_blocks(tree: Tree, res: Result):
    for path in tree.files():
        text = tree.read(path) or ""
        for m in re.finditer(r"```json\n(.*?)```", text, re.S):
            body = m.group(1)
            if "..." in body:      # deliberate elision in an illustrative fragment
                continue
            try:
                json.loads(body)
            except ValueError as e:
                line = text[:m.start()].count("\n") + 1
                res.add("json", path, f"json code block does not parse: {e}", line)


def _scan(line: str) -> str:
    """Line with inline code spans and URLs blanked out."""
    return re.sub(r"\S*://\S+", " ", strip_code(line)).lower()


def check_denylist(tree: Tree, res: Result):
    for path in tree.files():
        text = tree.read(path) or ""

        # Misspellings are scanned everywhere, code fences included: the
        # "Kuberneters" typos we fixed lived in `//` comments inside query
        # examples. None of these strings can be a legitimate identifier.
        for i, line in enumerate(text.split("\n"), 1):
            bare = _scan(line)
            for bad, good in DENYLIST.items():
                if re.search(rf"(?<![\w-]){re.escape(bad)}(?![\w-])", bare):
                    res.add("spelling", path, f'"{bad}" should be "{good}"', i)

        # British spellings are prose-only. A config key or field really can be
        # named `labelled`, and renaming someone's identifier is not our call.
        for i, line in prose_lines(text):
            bare = _scan(line)
            for bad, good in BRITISH.items():
                if re.search(rf"(?<![\w-]){re.escape(bad)}(?![\w-])", bare):
                    res.add("us-english", path, f'"{bad}" should be "{good}"', i)


def check_product_names(tree: Tree, res: Result):
    for path in tree.files():
        for i, line in prose_lines(tree.read(path) or ""):
            bare = strip_code(line)
            if "://" in bare:
                bare = re.sub(r"\S*://\S+", " ", bare)
            for rx, right in PRODUCT_NAMES:
                m = rx.search(bare)
                if m:
                    res.add("product-name", path,
                            f'"{m.group(0)}" should use the casing "{right}"', i)


def check_heading_case(tree: Tree, res: Result):
    for path in tree.published():
        if path == "SUMMARY.md":
            continue                          # GitBook navigation, not prose
        for i, _level, title in headings(tree.read(path) or ""):
            if "?" in title:
                continue                      # question-style headings stay sentence case
            words = strip_code(title).split()
            for pos, w in enumerate(words):
                if pos == 0 or w.endswith(":"):
                    continue
                token = w.strip("*_~()[[]],.\"'")
                head = token.split("-")[0]
                if not head or not head[0].isalpha():
                    continue
                if head.lower() in MINOR or head.isupper() or any(
                        c in token for c in "./_@") or not head.islower():
                    continue
                res.add("heading-case", path,
                        f'heading should be title case: "{title}" (lowercase "{token}")', i)
                break


def check_tables(tree: Tree, res: Result):
    for path in tree.files():
        lines = (tree.read(path) or "").split("\n")
        block: list[tuple[int, int]] = []
        start = 0
        for i, line in enumerate(lines + [""]):
            if line.startswith("|"):
                if not block:
                    start = i
                block.append((i, len(line)))
            else:
                if len(block) > 2:
                    widths: dict[int, int] = {}
                    for _, w in block:
                        widths[w] = widths.get(w, 0) + 1
                    if len(widths) > 1:
                        major = max(widths, key=widths.get)
                        for n, w in block:
                            if w != major:
                                res.add("table-width", path,
                                        f"table row width {w} does not match the table's {major}",
                                        n + 1)
                    pipes = {lines[n].count("|") for n, _ in block}
                    if len(pipes) > 1:
                        res.add("table-columns", path,
                                f"table starting on line {start + 1} has rows with differing column counts",
                                start + 1)
                block = []


def check_trailing_whitespace(tree: Tree, res: Result):
    for path in tree.files():
        lines = (tree.read(path) or "").split("\n")
        infence = False
        for i, line in enumerate(lines, 1):
            if FENCE.match(line):
                infence = not infence
                continue
            if infence or line.rstrip() == line:
                continue
            nxt = lines[i] if i < len(lines) else ""
            hard_break = line.endswith("  ") and not line.endswith("   ")
            if hard_break and nxt.strip():
                continue                       # a real Markdown hard break
            res.add("trailing-whitespace", path, "line has trailing whitespace", i)


def redirects_of(tree: Tree) -> dict[str, str]:
    text = tree.read(".gitbook.yml") or ""
    out: dict[str, str] = {}
    inside = False
    for line in text.split("\n"):
        if line.startswith("redirects:"):
            inside = True
            continue
        if inside:
            m = re.match(r"\s+(\S+):\s*(\S+)\s*$", line)
            if m:
                out[m.group(1)] = m.group(2)
            elif line.strip() and not line.startswith((" ", "\t")):
                inside = False
    return out


def check_redirect_targets(tree: Tree, res: Result):
    for src, dest in redirects_of(tree).items():
        if resolve(tree, ".gitbook.yml", dest) is None:
            res.add("redirect-target", ".gitbook.yml",
                    f'redirect "{src}" points at "{dest}", which does not exist')


def check_moved_files(head: Tree, base: Tree, res: Result):
    """A page that moved or went away needs a redirect, or its URL 404s."""
    gone = set(base.files()) - set(head.files())
    redirects = redirects_of(head)
    covered = {k.rstrip("/") for k in redirects}
    for path in sorted(gone):
        if os.path.basename(path).startswith("fragment-") or path == CONVENTIONS:
            continue
        url = re.sub(r"(^|/)README\.md$", "", path)
        url = re.sub(r"\.md$", "", url).rstrip("/")
        if url and url not in covered:
            res.add("moved-file", ".gitbook.yml",
                    f'"{path}" was removed or moved but no redirect for "{url}" '
                    f"was added to .gitbook.yml")


CHECKS = [check_links_and_anchors, check_code_blocks, check_denylist,
          check_product_names, check_heading_case, check_tables,
          check_trailing_whitespace, check_redirect_targets]


def run(tree: Tree) -> Result:
    res = Result()
    for fn in CHECKS:
        fn(tree, res)
    return res


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", help="git ref to compare against (e.g. origin/main)")
    ap.add_argument("--format", choices=["text", "github"], default="text")
    args = ap.parse_args()

    head = Tree()
    findings = run(head).findings

    if args.base:
        base = Tree(args.base)
        known = {f.key() for f in run(base).findings}
        before = len(findings)
        findings = [f for f in findings if f.key() not in known]
        check_moved_files(head, base, (moved := Result()))
        findings += moved.findings
        print(f"comparing against {args.base}: "
              f"{before - len(findings) + len(moved.findings)} pre-existing finding(s) ignored\n")

    errors = [f for f in findings if not f.warning]
    warnings = [f for f in findings if f.warning]

    for group, label in ((errors, "error"), (warnings, "warning")):
        for f in sorted(group, key=lambda x: (x.path, x.line)):
            where = f"{f.path}:{f.line}" if f.line else f.path
            if args.format == "github":
                print(f"::{label} file={f.path},line={max(f.line, 1)}::"
                      f"[{f.check}] {f.message}")
            else:
                print(f"{label:7} {where:62} [{f.check}] {f.message}")

    print(f"\n{len(errors)} error(s), {len(warnings)} warning(s)")
    if errors:
        print(f"\nThese are new relative to the base. See {CONVENTIONS} for the conventions.")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
