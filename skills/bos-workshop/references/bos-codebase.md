# BOS codebase map

BOS is two repositories in the scope `forge/blacksmith-organization-system/`. The
owner works in both in parallel with agents: re-check `git status`, `git log --all`
and the tree before acting, and treat what you find as intended.

## The core: `blacksmith-organization-system`

https://github.com/Sarverott/blacksmith-organization-system · npm `blacksmith-organization-system`
(1.x under the dist-tag `next`) · TypeScript run as is on Node ≥ 22.18. Read its `AGENTS.md`
and `docs/devlog/` first.

- `src/bos.ts`: the spine, `class BOS(host, options)`: `workshop`, `bootstrap()`, `inspect()`, `watch()`, `bumpScope()`, the flow; every model as `BOS.<Model>`
- `src/core/`: `host.ts` (the one door to the machine), `element.ts` (dirname, children, descriptors → ensure + inspect), `procedure.ts`, `context.ts` (`createIfMissing`), `tool.ts` (one tool format), `version.ts` (semver + GRIH)
- `src/models/<element>/class.ts`: the glossary as classes; `src/procedures/<name>/`: DESCRIPTION.md + a file per step; `src/bridges/`: git hosts and other outside systems through `Host.run`
- `src/tools/`: what `bos <model> <tool>` runs: workshop locate/status/bootstrap/watch, scope version/bump, devlog state, flow explain/next/next-pr/automerge/bump, project authors, version bump
- branches: `master` ← `revision` ← `development` ← `dev/<name>` (one per contributor; Claude Code is `dev/Cleo`)

## The skillset: `bos-skillset` (this repository)

https://github.com/Sarverott/bos-skillset · npm `bos-skillset` · ESM on Node ≥ 22.18, on top of the core.
Read its `AGENTS.md` first.

- `src/suit.mjs`: `class Suit extends BOS` (the core's) + `house`
- `src/tools/`: the suit's tools in the core's format: workshop glossary/open/close, project describe/prepare-message/install-hooks/hook, house show/may-call, agent brief, skills list/draft; `_index.mjs` = core tools + suit tools
- `src/mcp/server.mjs`: every read-only, non-streaming tool as an MCP tool `<model>_<tool>`
- `src/agent/`: Claude Code hooks (`bos hook session-start|bash|session-end`): the brief, the agent's work in storylines
- `src/procedures/`: opening, closing, describing (Skryba), hooking, gathering (House), skilling
- `skills/`, `commands/`, `hooks/hooks.json`, `.claude-plugin/`, `gemini-extension.json`, `BOS-CONTEXT.md`: what agents install
- `bin/bos` → `dist/bos-skillset.mjs` (one bundled file, built by `npm run build`, committed by the release on `master`) or `src/cli.mjs` in a clone
