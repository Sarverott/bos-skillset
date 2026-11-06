# BOS as the agent's suit

The suit lets an AI agent work *inside* the workshop, not next to it. The
same parts serve several agents ([installation](installation.md)):

| Part | Where | What the agent gets |
| ---- | ----- | ------------------- |
| **Skills** | `skills/bos-*/SKILL.md` | `bos-workshop` and one skill per element: what it is, where it lives, the commands that handle it. Plain Agent Skills: Claude Code, Gemini CLI, Codex, Cursor… |
| **MCP tools** | `bin/bos mcp` (`.claude-plugin/mcp.json`, `gemini-extension.json`) | generated from the tool registry, the core's and the suit's: every read-only tool as `<model>_<tool>` (`agent_brief`, `workshop_status`, `workshop_glossary`, `flow_explain`, `flow_next`, `devlog_state`, `house_show`, `house_may_call`, `project_describe`…). Writing tools and the endless `workshop watch` are not offered |
| **Session brief** | `SessionStart` hook (Claude Code); `agent_brief` and `BOS-CONTEXT.md` for others | the workshop, where the agent works (`forge / <scope> / <project>`), the House's boundaries (who rests and must never be called), the tools, the rules |
| **Slash commands** | `commands/*.md` (Claude Code) | `/bos:status`, `/bos:open`, `/bos:close`, `/bos:glossary`, `/bos:commit`, `/bos:flow`, `/bos:house` |
| **`bos` on PATH** | `bin/bos` (Claude Code) | the whole CLI as a bare command: the core's tools and the suit's |
| **Storylines** | `PostToolUse` and `SessionEnd` hooks (Claude Code) | the agent's sessions as events, and its shell commands as its own ttystory: `.BOS/storylines/ttystories/ttystory-<host>-claude-<session>.txt` (unixusat, cwd, command) |

The hooks never create a workshop and never block the agent. Outside a
workshop they stay silent.

## One file, no install step

`bin/bos` is what the hooks, the MCP server and the PATH run. It starts
`dist/bos-skillset.mjs`, one bundled file holding the core
(`blacksmith-organization-system`), the MCP SDK, zod and ollama's client, so an
installed plugin needs Node and nothing else: no `npm install` next to it. The
release on `master` builds it and commits it (`dist/` is ignored on the coding
branches), so what the marketplace installs always carries it. In a clone
without the bundle, `bin/bos` runs `src/cli.mjs` with the clone's `node_modules`.

## Why

Storylines exist to reuse command patterns and to teach AI to use the shell
the BOS way. With the suit, the agent's own work becomes part of that record,
next to the owner's ttystories. Treat agent ttystories like `.BOS/setup`:
shell history can contain secrets.

MCP stays read-only on purpose: agents look and plan through MCP, and changing
the workshop (`bos workshop open`, `bootstrap`, `flow next-pr`, `scope bump`…)
stays a conscious act on the command line, where the agent's permissions and
the owner's eyes are.
