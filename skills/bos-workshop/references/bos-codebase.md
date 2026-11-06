# BOS codebase map

BOS is two repositories in the scope `forge/blacksmith-organization-system/`. The
owner works in both in parallel with agents: re-check `git status`, `git log --all`
and the tree before acting, and treat what you find as intended.

## The core: `blacksmith-organization-system`

https://github.com/Sarverott/blacksmith-organization-system · npm `blacksmith-organization-system`
(its command: `bos`) · TypeScript on Node ≥ 22. Read its `AGENTS.md` and `docs/devlog/` first.
Everything BOS does lives here.

- `src/bos.ts`: the spine, `class BOS(host, options)`: `workshop`, `bootstrap()`, `inspect()`, `watch()`, `bumpScope()`, the flow; every model as `BOS.<Model>`
- `src/core/`: `host.ts` (the one door to the machine), `element.ts` (dirname, children, descriptors → ensure + inspect), `procedure.ts`, `context.ts` (`createIfMissing`), `tool.ts` (one tool format), `version.ts` (semver + GRIH)
- `src/models/<element>/class.ts`: the glossary as classes; `src/procedures/<name>/`: DESCRIPTION.md + a file per step; `src/bridges/`: git hosts and other outside systems through `Host.run`
- `src/tools/`: what `bos <model> <tool>` runs (`bos help` lists them)

## The skillset: `bos-skillset`

https://github.com/Sarverott/bos-skillset · no code, no npm package. Read its `AGENTS.md` first.

- `skills/bos-*/SKILL.md`: Agent Skills, one per element
- `.claude-plugin/`, `gemini-extension.json` + `BOS-CONTEXT.md`: what installs them into agents
- `resources/`: the House of Anubis (`house/`), the ravens (`ravens/`), the workshop root's guides (`workshop-root/`)
- `docs/glossary/`: the authoritative definitions; `docs/ideas/`: what could be built (MCP tools, session brief, procedures), and where it belongs
