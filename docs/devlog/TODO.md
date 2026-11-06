# TODO

## Phase 0: contributor foundation

- [x] Rewrite AGENTS.md around local responsibilities, the branch loop, devlog, AI enclave, tooling and skill authoring.
- [x] Remove the printed reference manuals before any commit; retain useful upstream links.
- [x] Establish the devlog and agents' findings with implemented and proposed capabilities distinguished.
- [x] Verify skill discovery, plugin validation and the strict docs build; record any limitations.

## Phase 1: adopt the core deliberately

- [ ] Reconcile glossary and skills with current workshop resolution, command names, branch spelling and descriptors.
- [ ] Add a private npm tooling manifest and lockfile for a verified core version and required tools; document reproducible setup.
- [ ] Add thin Task wrappers for core discovery and devlog state, using the managed local binary.
- [ ] Verify installed-skill reference availability and realistic usage, including a missing-core case.
- [ ] Exclude the skill template from install discovery and decide the purpose of Sett's empty root SKILL.md.
- [ ] Design manifest version synchronization before adopting commit bumps or automated releases.
- [x] Integrate Sett's scaffolding: one commit per file on `dev/Sarverott`, merged into `development`; procedure in `docs/guidelines/integration-round.md`.
- [ ] Fill or decide Sett's empty adapter placeholders (`.codex-plugin/plugin.json`, `.mcp.json`, `hooks/`, `settings.json`, `.lsp.json`, `.app.json`, `evals/`, `package.json`).
- [ ] Decide how agents on other machines reach the House now that it lives in the scope's `.delegations/`.
- [x] Preserve Sett's Copilot ruleset export as its own commit on `dev/Sarverott` and integrate it into development.
- [x] Resolve the Dependabot stack in one checked lock/export batch; use grouped uv updates in `/docs` and activate the configuration on the default branch (PRs #38 and #39).
- [ ] Supply the missing `.github/labeler.yml` configuration so the separate Labeler job can pass.

Phase 1 is follow-on work, not part of the contributor-guide cleanup.
