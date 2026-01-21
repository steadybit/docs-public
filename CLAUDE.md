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

- `.github/workflows/redirect-url-checker.yml` - Validates that all redirects in `.gitbook.yml` resolve correctly
