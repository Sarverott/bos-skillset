# Idea: BOS as the agent's suit

The suit lets an AI agent work *inside* the workshop, not next to it. Today
the skillset gives agents the **skills** only (`skills/bos-*`), and they run
the core's `bos` command. The parts below are the rest of the idea.

| Part | Where it would live | What the agent gets |
| ---- | ------------------- | ------------------- |
| **Skills** (exists) | `skills/bos-*/SKILL.md` | `bos-workshop` and one skill per element: what it is, where it lives, the commands that handle it. Plain Agent Skills: Claude Code, Gemini CLI, Codex, Cursor… |
| **MCP tools** | an MCP server in the core (`bos mcp`), referenced by `.claude-plugin/` and `gemini-extension.json` | generated from the core's tool registry: every read-only tool as `<model>_<tool>` (`workshop_status`, `flow_explain`, `flow_next`, `devlog_state`…). Writing tools and the endless `workshop watch` not offered |
| **Session brief** | a Claude Code `SessionStart` hook; `BOS-CONTEXT.md` for others | the workshop, where the agent works (`forge / <scope> / <project>`), the House's boundaries (who rests and must never be called), the tools, the rules |
| **Slash commands** | `commands/*.md` (Claude Code) | thin wrappers over `bos`: `/bos:status`, `/bos:flow`, `/bos:house`… |
| **Storylines** | `PostToolUse` and `SessionEnd` hooks (Claude Code) | the agent's sessions as events, and its shell commands as its own ttystory: `.BOS/storylines/ttystories/ttystory-<host>-claude-<session>.txt` (unixusat, cwd, command) |

Suit-only tools the first build had, on top of the core's:

- `agent brief`: the text of the session brief
- `workshop glossary [term]`: a glossary page by name
- `workshop open` / `close`: see [procedures](procedures.md)
- `project describe`, `prepare-message`, `install-hooks`, `hook`: commit drafts and git hooks
- `house show`, `house may-call <model>`: the House of Anubis (`resources/house/`)
- `skills list`, `skills draft`: the skills and drafts for elements without one

## Rules the idea keeps

- **MCP stays read-only.** Agents look and plan through MCP. Changing the
  workshop (`bootstrap`, `flow next-pr`, `scope bump`…) stays a conscious act
  on the command line, where the agent's permissions and the owner's eyes are.
- **Hooks never create a workshop and never block the agent.** Outside a
  workshop they stay silent.
- **Storylines may hold secrets.** Agent ttystories are shell history: treat
  them like `.BOS/setup`.

## Why

Storylines exist to reuse command patterns and to teach AI to use the shell
the BOS way. With the suit, the agent's own work becomes part of that record,
next to the owner's ttystories.

## Where it belongs

The MCP server, the brief and the recording are behaviour, so they belong in
the core (or a package of the scope built on it), not here. The skillset would
then carry only the manifests that point at it: `.claude-plugin/mcp.json`,
`hooks/hooks.json`, `commands/*.md`, `gemini-extension.json`'s `mcpServers`.
