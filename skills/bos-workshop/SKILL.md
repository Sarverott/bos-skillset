---
name: bos-workshop
description: Recognize the Blacksmith Organization System (BOS) workshop — `~/__WORKSHOP` per user or `/media/**/__WORKSHOP` per partition — as the default working area and root of code crafting, with its internal `.BOS/` and crafting areas forge, archive, devarmory and craftbook. Use whenever creating, cloning, locating or organizing projects, repositories, tools or notes, when a path contains `__WORKSHOP`, or when the user mentions BOS, the workshop, forge, archive, devarmory, craftbook, scope, sheme, throwbox, sarcophag, scrapnote, craftset or setternet.
---

# BOS Workshop

The Blacksmith Organization System (BOS) defines a `__WORKSHOP` directory as the
standard working area and default root of code crafting.

## Workshop roots

- **Per user:** `~/__WORKSHOP`
- **Per partition:** `/media/**/__WORKSHOP` (any mounted partition)

To find the active workshop, run `bos workshop locate`;
without the core installed, `scripts/find-workshop.sh`. Resolution order:

1. `--workshop=PATH` option
2. `$BOS_WORKSHOP` environment variable
3. Nearest ancestor of the current directory named `__WORKSHOP`
4. `~/__WORKSHOP`

## Tools

`bos` is the core's command (`npm install -g blacksmith-organization-system`).
If it is not installed, use this skill as knowledge and `scripts/find-workshop.sh`.

| Command | Does |
| ------- | ---- |
| `bos workshop status [--all]` | the whole workshop as one report with findings (reads only) |
| `bos workshop bootstrap --dryRun` | what is missing; without `--dryRun` it creates it (never overwrites) |
| `bos workshop watch` | changes as events, until Ctrl+C |
| `bos flow explain` | the project's craft loop |
| `bos help` | every tool |

## Standard areas

Every workshop always contains:

| Area         | Holds |
| ------------ | ----- |
| `.BOS/`      | BOS itself (internal): `setup/` (keys, VPN, aliases, tokens), `data/`, `nests/` (container/VM volumes), `storylines/` (shell history, logs), `workshop.json`, `Taskfile.yaml` |
| `devarmory/` | Tools: custom binaries, AppImages, build containers, IDE sets; listed in a manifest with checksums |
| `forge/`     | Active work: scopes (`forge/<scope>/<repository>`), projects, shemes, throwbox |
| `craftbook/` | Knowledge: scrapnotes (all notes not yet documents), craftsets (reusable procedure kits), recipes |
| `archive/`   | Work at rest: sarcophags (encrypted bare repos), exhibits, mirrors |

Where things go: code you are working on → `forge/<scope>/`; a tool → `devarmory/`;
a note or draft → `craftbook/scrapnotes/`; a mirror or closed repo → `archive/`;
graphics, CAD, photos or templates for a scope → a sheme inside that scope.

- What BOS is, the full tree and element types: [references/bos-concept.md](references/bos-concept.md)
- The core and the skillset, what each holds: [references/bos-codebase.md](references/bos-codebase.md)
- One page per element (workshop, forge, scope, sarcophag, …): `docs/glossary/` in this repository (authoritative)

## Rules

1. With no explicit path, place new or cloned projects inside the active
   workshop. Active work goes in `forge/`, grouped by scope:
   `forge/<scope>/<repository>`.
2. Never delete, rename, or restructure the standard areas.
3. Multiple workshops (home + partitions) are independent; do not move or sync
   between them unless asked.
4. The standard areas (`.BOS/` and the four crafting areas) must always exist. If one is missing, create it
   (`mkdir -p`, or `bos workshop bootstrap`) and tell the user. Don't rely on BOS running.
5. Every project has the standard anatomy: `README.md`, `LICENSE`, `AGENTS.md`
   (+ `CLAUDE.md` = `@AGENTS.md`), `Taskfile.yml`, `src/`, `docs/`, `tests/`, `.github/`.
6. Branches: `master` (canon) → `development` (code here; `dev/<name>` per contributor) →
   `revision` → `testing` → `releasing` → `master` via pull request. Don't commit to
   `master`. `bos flow explain` shows a project's own loop.
7. The owner works on BOS repositories in parallel with agents. Re-check the
   git state and file tree before acting, and treat what you find as intended.
