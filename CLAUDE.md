# CLAUDE.md

This file provides guidance for Claude Code when working with this repository.

## Project Overview

This is the public documentation for Steadybit, a chaos engineering platform. The documentation is hosted at https://docs.steadybit.com via GitBook.

## Repository Structure

```
/quick-start/          - Getting started guides
/concepts/             - Core concepts (actions, discovery, query language)
/install-and-configure/ - Installation and configuration guides
/use-steadybit/        - Feature usage documentation
/integrate-with-steadybit/ - Integration guides (API, CLI, extensions, webhooks)
/troubleshooting/      - Troubleshooting guides and common fixes
/.gitbook/assets/      - Images and media assets managed by GitBook
```

## Key Configuration Files

- **SUMMARY.md** - Table of contents / navigation structure for GitBook
- **.gitbook.yml** - GitBook configuration, primarily contains URL redirects for backward compatibility
- **.bookignore** - Files excluded from GitBook rendering (e.g., fragment files, this file)

## Documentation Conventions

### File Organization
- Each section has a `README.md` as its index page
- Fragment files (`fragment-*.md`) are reusable content snippets included in other documents but not rendered as standalone pages
- Assets are stored in `.gitbook/assets/`

### Naming Conventions
- Directories use kebab-case: `install-and-configure`, `use-steadybit`
- Files use kebab-case: `getting-started.md`, `agent-architecture.md`

### When Adding New Pages
1. Create the markdown file in the appropriate directory
2. Add an entry to `SUMMARY.md` to include it in the navigation
3. If renaming/moving pages, add redirects in `.gitbook.yml` for backward compatibility

### When Adding Redirects
Add entries to `.gitbook.yml` in the `redirects:` section to map old URLs to new file locations.

## Writing Conventions

`.github/workflows/docs-lint.yml` enforces the checkable ones on every pull
request. It reports only what a change introduces, so existing violations never
fail a build — but don't add new ones. Run it locally with:

```bash
python3 .github/scripts/docs_lint.py --base origin/main
```

### Headings

Title case, with minor words (a, an, the, and, or, of, to, in, via, …) lowercase
unless they start the heading:

- `## Install Agent and Extensions`
- `### Configure a Container Runtime`

**Exception: question-style headings stay in sentence case.** The troubleshooting
pages are written as questions, and title-casing them reads wrong:

- `#### Why can't I install extension-container on Docker Desktop?`

The linter skips any heading containing a `?`.

### Spelling

US English: **color**, **behavior**, **organization**, **analyze**, **license**,
**center**, **canceled**, **judgment**, **customize**, **prioritize**,
**initialize**. Not `colour`, `behaviour`, `organisation`, `analyse`, `cancelled`.

The linter flags British forms in prose only. An identifier can legitimately
contain one - a config key really may be named `labelled` - and renaming
someone's field is not a docs decision. Plain misspellings are flagged
everywhere, code samples included, since a typo like `Kuberneters` is never a
valid identifier.

### Product and technology names

Use the vendor's casing in prose: **WebSocket**, **Docker Compose**, **Helm**
(the tool is `helm`), **GitHub**, **Kubernetes**, **OpenAPI**, **PostgreSQL**.

This applies to prose only. Identifiers keep whatever casing they really have —
`STEADYBIT_AGENT_WEBSOCKET_PING_INTERVAL`, `platform.publicWebsocketPort`, the
`helm` CLI, the `steadybit/helm-charts` repository, and protocol tokens such as
the `Upgrade: websocket` header.

### Lists

Use the serial (Oxford) comma: *a, b, and c* — not *a, b and c*. This one is not
linted, because distinguishing a three-item list from a compound like
"open- and closed-source extensions" is not reliably detectable.

### Dashes

An em dash (`—`) sets off a phrase inside a sentence. A hyphen stays a hyphen:
in compounds (`on-prem`), as a title separator in headings
(`## Step 1 - Get your keys`), and in literal values (`429 - Too Many Requests`).

### Tables

Every row in a table shares one width, padded from the widest cell per column.
After editing cell text, re-pad the table so the diff shows the change and not
the reflow.

### Moving or deleting a page

Add a redirect to `.gitbook.yml` for the page's old URL, or the old link 404s.
The linter fails a pull request that removes or renames a `.md` file without one,
and also checks that every redirect target still resolves to a file that exists.

## Common Tasks

### Adding a New Documentation Page
1. Create the `.md` file in the appropriate section directory
2. Update `SUMMARY.md` to add navigation entry
3. Add images to `.gitbook/assets/` if needed

### Reorganizing Documentation
1. Move files to new locations
2. Update `SUMMARY.md` navigation
3. Add redirects in `.gitbook.yml` to preserve old URLs

## CI/CD

- `.github/workflows/docs-lint.yml` - Runs `.github/scripts/docs_lint.py` on every pull
  request: broken links and anchors, unparseable JSON samples, known misspellings,
  product-name casing, US-English spelling, heading case, table alignment, trailing
  whitespace, redirect targets, and missing redirects for moved pages. It compares against the target
  branch, so only findings the pull request introduces fail the build.
