# Agent findings

Newest findings first. Date observations, name evidence, distinguish proposals
from decisions, and re-check facts that may drift. Sett answers in the devlog.

## 2026-11-06 — Joker: portable Dependabot skill for the next owning instance

- Sett requested a skill for the instance assigned to the core repository,
  explicitly preserving that repository's ownership boundary. No core checkout
  or core PR operations were performed in this round.
- `84ff4ea` adds `skills/handling-dependabot-prs/`: lowercase directory and
  discovery name follow the Agent Skills specification. The requested topic
  `handling-dependabot-PRs` is retained in the visible title.
- The 139-line entrypoint routes to bundled GitHub, npm/uv/Actions and BOS
  handoff references. A maintenance ledger, Codex UI metadata and eight
  offline behavioral snapshots ship in the same folder; no repository-root
  or sibling-checkout reference is required by an installed copy.
- It distinguishes review from authorized management, binds operations to the
  owning repository, preserves concurrent work, refreshes moving heads/bases,
  checks source locks and derived artifacts, and verifies landed replacements
  before closing duplicates. The core's real npm project must not inherit the
  skillset's earlier placeholder-based updater decision.
- The existing Codex manifest exposes `./skills/`, so no adapter rewrite or
  dependency change is needed for this new skill. Actual installation into
  a Codex session is Sett's next step; it was not simulated as a successful
  host session here. Install from the updated development checkout until the
  contribution follows the normal release route.
- Validation passed: skill-creator quick validator, an isolated folder copy
  with all local links confined to that copy, metadata/fixture checks, the
  exact CI discovery step, a negative discovery fixture omitting only the
  workflow name, and full `task check`. The eight behavior cases are provided
  for independent model evaluation, not reported as executed model runs.
- CI now verifies every skill folder explicitly instead of using a `bos-`
  prefix count, which could miss a workflow skill. Discovery still finds the
  existing template (`skill-name`); its exclusion remains a separate TODO.
- Owner intake preserved 12 file changes, one per commit on `dev/Sarverott`,
  then merged/pushed them through development (`3749377`). This includes the
  ruleset-export deletion and editor settings. Existing comment whitespace in
  the supplied snippet was retained. An interrupted intake attempt was safely
  refused by git before integration and completed on the owner branch.

## 2026-11-06 — Cleo: adapters filled, core pinned locally

- `package.json` pins the core `blacksmith-organization-system` ^1.11.0. It
  has no dependencies of its own, so `package-lock.json` holds one package and
  `npm audit` reports 0. `task setup` (`npm ci`) and `task bos -- <args>` run it
  from `node_modules`; CI checks that it installs and runs.
- `hooks/register.js` (SessionStart) follows the Claude Code
  "install dependencies into `CLAUDE_PLUGIN_DATA`" pattern: `npm ci
  --ignore-scripts` when `package.json` differs from the cached copy, then
  `bos workshop locate --json`, printed as plain-text context. Tested by
  running it directly in three cases: a fresh install (0.4 s), the cached
  run, and the core missing with the install skipped (exit 0 and a hint).
  It has not run inside a live Claude Code or Codex session yet.
- Codex (codex-cli 0.167.0, throwaway `CODEX_HOME`): `.codex-plugin/plugin.json`
  installs as `bos` 1.0.1, enabled. Codex reads a Codex-schema marketplace only
  at `.agents/plugins/marketplace.json`. Otherwise it falls back to
  `.claude-plugin/marketplace.json`, which already lists `bos`. The rewritten
  `.codex-plugin/marketplace.json` is therefore not read where it sits.
  Codex also documents `.codex-plugin/` as a compatibility overlay; the current
  format is a portable root `plugin.json`. *(assumed)* The legacy manifest's
  `skills`/`mcpServers` keys follow the Codex scaffold; the docs don't list them.
- The root `SKILL.md` collides with the skills CLI 1.7.6, which stops at a
  root `SKILL.md` and lists one skill. `--full-depth` restores all 14, plus the
  template's `skill-name` that was already being found. Claude Code, Codex and
  Gemini load `skills/` and are not affected.
- `claude plugin validate .` passes again (Claude Code 2.1.319). The empty
  `hooks.json`/`.mcp.json` were the failure. The warnings left are the missing
  icon, and that the root CLAUDE.md isn't plugin context, which is expected
  because it is contributor-facing.
- `.mcp.json`, `.app.json`, `.lsp.json`, `settings.json` are valid empty maps
  on purpose: no MCP server, Codex app, BOS language server or plugin agent
  exists yet. The core mentions MCP only as a "next" face (`src/bos.ts`), so
  an MCP toolkit is core work first (Phase 2).
- Joker's Dependabot round, reviewed: the uv-native policy, the lock/export
  guard (`task docs:check-lock` and CI) and the repair of PR #40 by
  re-resolution rather than editing the export are sound. The guard caught a
  real divergence. The one gap Joker left open on purpose, npm, is now
  configured on `development`; it becomes active only on `master`.
- `.github/labeler.yml` is in the `actions/labeler@v4` format the workflow pins.
  v5 changed the format, so update both together.

## 2026-11-06 — Joker: first grouped update validates the guard

- After activation, Dependabot opened PR #40 with three updates: backrefs
  8.1, certifi 2026.10.23 and mkdocs-material 9.8.0. Its export named the new
  backrefs/certifi versions but its lockfile retained the old versions.
- `task docs:check-lock` reproduced the mismatch; the original GitHub Checks
  run `42208366149` failed. Re-resolve the three requested versions with uv
  and export again, then push repair `4eb7737` as a normal fast-forward to
  the bot branch. No requirements-only edits or force pushes.
- PR #40 merged as `2317581` after its checks passed.
- The repaired head passes consistency, strict docs build, Python 3.12
  installed-package compatibility, and GitHub docs/skills/security checks.
  The new check catches a real bot-generated divergence as intended.

## 2026-11-06 — Joker: Dependabot maintenance round

- Owner intake: the single uncommitted Copilot ruleset export is preserved
  unchanged as `dc55402` on `dev/Sarverott`, integrated into development as
  `3d1fdcb`, and pushed. It does not apply repository settings by itself.
- Nine open PRs (#26, #27, #28, #30, #33–#37) covered six unique packages.
  All edited generated requirements only. Resolve the versions together,
  regenerate both artifacts, and merge the batch through PR #38 (`69527e6`).
  Verify the exact lockfile/export on development before closing all nine
  originals as superseded. The stack is cleared.
- The tested versions are Markdown 3.11.2, MarkupSafe 3.0.4, platformdirs
  4.14.3, pymdown-extensions 12.3, python-dateutil 4.0.0 and watchdog 7.0.0.
  Resolution also removes six and adds tzdata. No direct dependency ranges
  were changed.
- Dependabot now uses native uv in `/docs`, includes transitive dependencies,
  groups weekly minor/patch updates, leaves majors separate and caps open
  version-update PRs at three per ecosystem. npm is omitted until the root
  placeholder is a usable project. Configuration-only PR #39 (`4dc7413`)
  activates this policy on master, where Dependabot reads it. No feature or
  adapter changes were promoted to master.
- `task docs:check-lock` and the docs CI job reject a stale requirements
  export without changing it. Docs commands use `--locked`. The procedure is
  [dependency maintenance](../guidelines/dependencies.md).
- Validation: Python 3.12 resolution, installed-package compatibility, strict
  docs build, and an edited page rebuilt in a temporary watchdog 7 preview.
  The preview fixture locates its config outside the docs directory, as
  MkDocs serve requires. The export guard accepts the current file and
  rejects a deliberately stale pin. GitHub docs, skills and security checks
  passed on the batch and activation PRs. The activation branch's full
  `task check` passed locally.
- Remaining failures are independent of these updates: development's full
  `task check` reaches the empty hooks/MCP JSON error; the Labeler workflow
  fails because `.github/labeler.yml` is absent (confirmed in run
  `42207408526`). The bot and adapter placeholders were not silently filled.
- The connected GitHub app can read this repository but rejects PR writes
  with HTTP 403. The authenticated local `gh` CLI completed the authorized
  PR creation, merges and closures. No force push, tags or package publishing.

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
