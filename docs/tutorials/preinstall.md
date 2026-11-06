# Preinstall

Needed:

- **an AI agent**: Claude Code, Gemini CLI, Codex, Cursor… ([installation](installation.md))

For the `bos` command the skills use:

- **Node.js ≥ 22** and the core (`npm install -g blacksmith-organization-system`)
- **git**
- **gh**: the core's `bos flow next-pr` / `automerge` open and merge pull requests

Optional:

- **Task** (taskfile.dev) and **uv**: build the docs (`task docs:build`)
- **Obsidian**: browse `docs/` as a vault

Decide where the workshop lives: `~/__WORKSHOP` by default, or
`/media/<user>/<partition>/__WORKSHOP` on a mounted drive. To point BOS
anywhere else, set `BOS_WORKSHOP` or pass `--workshop=PATH`.

Next: [installation](installation.md)
