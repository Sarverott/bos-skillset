# TODO

## Phase 0: contributor foundation

- [x] Rewrite AGENTS.md around local responsibilities, the branch loop, devlog, AI enclave, tooling and skill authoring.
- [x] Remove the printed reference manuals before any commit; retain useful upstream links.
- [x] Establish the devlog and agents' findings with implemented and proposed capabilities distinguished.
- [x] Verify skill discovery, plugin validation and the strict docs build; record any limitations.

## Phase 1: adopt the core deliberately

- [ ] Reconcile glossary and skills with current workshop resolution, command names, branch spelling and descriptors.
- [x] Add a private npm tooling manifest and lockfile for a verified core version and required tools; document reproducible setup (`package.json` pins the core ^1.11.0, `task setup` = `npm ci`).
- [x] Add thin Task wrappers for core discovery and devlog state, using the managed local binary (`task bos -- workshop locate`, `task bos -- devlog state`).
- [ ] Verify installed-skill reference availability and realistic usage, including a missing-core case.
- [x] Decide the purpose of Sett's empty root SKILL.md: it is the `bos-skillset` installation skill (Sett's decision); discovery then needs `--full-depth`.
- [ ] Exclude the skill template from install discovery (`--full-depth` still finds `assets/template` as `skill-name`).
- [ ] Design manifest version synchronization before adopting commit bumps or automated releases.
- [x] Integrate Sett's scaffolding: one commit per file on `dev/Sarverott`, merged into `development`; procedure in `docs/guidelines/integration-round.md`.
- [x] Fill Sett's empty adapter placeholders (`.codex-plugin/plugin.json`, `.mcp.json`, `hooks/`, `settings.json`, `.lsp.json`, `.app.json`, `evals/`, `package.json`); plugin validation passes again.
- [ ] Decide how agents on other machines reach the House now that it lives in the scope's `.delegations/`.
- [x] Preserve Sett's Copilot ruleset export as its own commit on `dev/Sarverott` and integrate it into development.
- [x] Resolve the Dependabot stack in one checked lock/export batch; use grouped uv updates in `/docs` and activate the configuration on the default branch (PRs #38 and #39).
- [x] Supply the missing `.github/labeler.yml` configuration so the separate Labeler job can pass (acts once it reaches the default branch).

Phase 1 is follow-on work, not part of the contributor-guide cleanup.

## Phase 2: one integrator for every agent host

The skillset as one package: Claude Code plugin, Codex plugin, Gemini CLI
extension, Agent Skills and an MCP toolkit adapter, all driven by the pinned core.

- [x] Package the verified Dependabot maintenance procedure as an installed workflow skill, with self-contained references, Codex metadata, a ledger template and eight offline evaluation cases (`handling-dependabot-prs`, commit `84ff4ea`).
- [ ] Execute the new skill's behavioral evaluation cases as independent model runs; structural/package/discovery checks already pass.
- [ ] Core: an MCP server (`bos mcp`, in the core repository); then declare it in `.mcp.json` (and `gemini-extension.json` `mcpServers`) through the pinned package, `${CLAUDE_PLUGIN_DATA}/node_modules/.bin/bos mcp`.
- [ ] Codex marketplace: Codex reads its own schema only at `.agents/plugins/marketplace.json`; move `.codex-plugin/marketplace.json` there, or drop it and keep the `.claude-plugin/marketplace.json` fallback (Sett's call).
- [ ] Codex now prefers a portable root `plugin.json` (agent-plugins.org schema) with `extensions["com.openai"]`; decide whether to adopt it beside `.codex-plugin/plugin.json`.
- [ ] Gemini CLI: verify whether an extension can run a start hook or MCP server to provide the core the same way.
- [ ] Activate the npm Dependabot entry on the default branch (configuration-only PR to `master`, with Sett's go).
- [ ] A square plugin icon (512–2048 px PNG) for `claude plugin validate` (`ICON_MISSING`) and the Codex `interface`.
- [ ] Run `evals/evals.json` with skill-creator; add `claude plugin eval` cases (directory per case) for the element skills.
- [ ] Decide Sett's empty, untracked component directories (`agents/`, `commands/`, `monitors/`, `themes/`, `references/`, `scripts/`, `src/`): fill them with real components or remove them.
- [ ] Synchronize the release version across its seven places (see AGENTS.md) before the next release.
- [ ] Exercise `hooks/register.js` in a real Claude Code and Codex session (it was tested by running it directly with plugin variables).
