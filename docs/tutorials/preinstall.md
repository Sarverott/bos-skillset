# Preinstall

Needed:

- **Node.js ≥ 22.18**
- **git**

Optional:

- **an AI agent**: Claude Code, Gemini CLI, Codex, Cursor… ([installation](installation.md))
- **ollama**: lets Skryba, the scribe raven, refine commit messages (`bos project describe --skryba`)
- **gh**: the core's `bos flow next-pr` / `automerge` open and merge pull requests
- **Task** (taskfile.dev): installed with the dev dependencies as `@go-task/cli`; runs `Taskfile.yml`
- **Obsidian**: browse `docs/` as a vault

Decide where the workshop lives: `~/__WORKSHOP` by default, or
`/media/<user>/<partition>/__WORKSHOP` on a mounted drive. To point BOS
anywhere else, set `BOS_WORKSHOP` or pass `--workshop=PATH`.

Next: [installation](installation.md)
