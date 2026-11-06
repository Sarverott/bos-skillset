# Agent findings

Newest findings first. Date observations, name evidence, distinguish proposals
from decisions, and re-check facts that may drift. Sett answers in the devlog.

## 2026-11-06 — Cleo: integration round after Sett's scaffolding

- Sett's edits after Joker's guide are on `dev/Sarverott`, one commit per file,
  merged into `development` as `f896cfc`. Procedure: `docs/guidelines/integration-round.md`.
- The House and the ravens left the skillset: they are now at the scope level,
  `forge/blacksmith-organization-system/.delegations/{house,ravens}/` (not in
  any git repository). References in `AGENTS.md`, `BOS-CONTEXT.md`, the
  `bos-house` skill and the codebase map point there now *(assumed: a move by
  Sett, not a removal)*. An installed skill can't reach that path on another
  machine; the House's distribution is open [TODO].
- `resources/workshop-root/` (the guide for `__WORKSHOP/AGENTS.md`) was removed
  with no replacement in this repository; the live `~/__WORKSHOP/AGENTS.md` stays
  the only copy [TODO].
- Sett's new placeholders are empty files: `.app.json`, `.lsp.json`, `.mcp.json`,
  `settings.json`, `package.json`, `.codex-plugin/plugin.json`, `hooks/hooks.json`,
  `hooks/register.js`, `evals/evals.json`, root `SKILL.md`. Empty JSON doesn't
  parse: a host that reads `.mcp.json`, `hooks/hooks.json` or `settings.json` at
  the plugin root, or `npm`/Dependabot reading `package.json`, may fail until
  they are filled. Kept as Sett left them.
- `.github/dependabot.yml` now watches pip at `/`, but the requirements are in
  `docs/requirements.txt`; npm at `/` has an empty `package.json`. Dependabot may
  report errors for both until resolved. Not changed.
- `.codex-plugin/marketplace.json` duplicates the Claude marketplace and carries
  the same version `1.0.1`: one more place for the version (AGENTS.md lists four).
- A local `backup/development-premerge` branch holds two unpushed merges made
  before `origin/development` was fetched (one with a broken message). Safe to
  delete; kept because a hard reset was not permitted.

## 2026-11-06 — Joker: contributor-guide foundation

- Inspected sibling core `blacksmith-organization-system`, package version
  `1.11.0`, on `dev/Cleo`. Its untracked examples were left untouched. Read its
  guide, devlog, glossary, Taskfile, settings, tool registry and relevant source;
  ran `node src/cli.ts help` without changing that checkout.
- This skillset currently has no npm manifest, `.github/bos.json`, versioning
  hooks or release workflow. Its checked-in automation is
  `.github/workflows/checks.yml`. The core's abbreviated `revision → master`
  workflow is specific to the core; the full loop remains the local guide.
- Current core workshop resolution includes `WORKSHOP_ROOT` before ancestor
  discovery. Explicit paths may name the containing directory. Several local
  glossary and skill pages still describe older resolution, `.mjs` model files,
  `developement`, or nonexistent commands such as `bos project promote`.
  Reconciliation is recorded in devlog Phase 1, not silently completed here.
- `bos devlog state` reads the eight maintained devlog files and prints by
  default; `--write` generates STATE.md. Proposal parsing expects
  `### PP<n> beg`, not an arbitrary heading. Evidence:
  `src/models/devlog/class.ts` and `src/tools/devlog.ts` in the core.
- Core bumps operate on package versions; plugin manifests need their own
  synchronized update. Do not advertise release automation before wiring it.
- An empty, untracked root `SKILL.md` was present before this task. It is kept
  untouched and excluded from any task commit.

Reference dumps were supplied for this task and are removed before committing.
Maintained upstream references replace them:

- [Agent Skills specification](https://agentskills.io/specification)
- [Skill creation guidance](https://agentskills.io/skill-creation/best-practices)
- [Task documentation index](https://taskfile.dev/llms.txt)
- [Task schema](https://taskfile.dev/docs/reference/schema)
- [Task dependencies and ordered calls](https://taskfile.dev/docs/guide/dependencies)

### Validation

- `task skills`: passed; all 13 `bos-*` skills found. Also lists the existing
  template as `skill-name` and skips Sett's empty root `SKILL.md` for missing
  frontmatter. Those discovery issues are recorded in devlog Phase 1.
- `claude plugin validate .`: passed with warnings about root `CLAUDE.md`
  not shipping plugin context and a missing listing icon. The former is why
  contributor entrypoints and installed skill context are kept distinct.
- `task docs:build`: strict build passed after removing the supplied manuals;
  the baseline build failed on a broken example link in a manual.
- All three JSON manifests parse and all four version fields agree at `1.0.1`.
- The core's `devlog state --dir=<this checkout> --json` reads both phases,
  no pending inbox entries and no missing files. It writes nothing by default.
- npm registry access and uv's cache required execution outside the filesystem
  sandbox; the existing check commands themselves were unchanged.
