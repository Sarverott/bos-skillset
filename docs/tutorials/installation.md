# Installation

The suit installs into an agent; the workshop it works in is wherever the
agent runs (`~/__WORKSHOP` by default, `BOS_WORKSHOP` to point elsewhere).
Only **Node.js ≥ 22.18** is needed: what is installed carries one bundled file,
`dist/bos-skillset.mjs`, with the core, the MCP server and every dependency in it.

## Claude Code: the plugin

```
/plugin marketplace add Sarverott/bos-skillset
/plugin install bos@bos-skillset
```

Restart the session: the brief appears at the start, `/mcp` lists `bos`, the
skills and the `/bos:*` commands are there, and `bos` is on the agent's PATH.
What it brings: [agent suit](agent-suit.md).

## Gemini CLI: the extension

```bash
gemini extensions install https://github.com/Sarverott/bos-skillset
```

It brings the `bos` MCP server (read-only tools) and `BOS-CONTEXT.md` as context.

## Codex, Cursor, Copilot and others: the skills

```bash
npx skills add Sarverott/bos-skillset        # pick the agents and the skills it asks about
```

The skills are plain Agent Skills (`skills/bos-*/SKILL.md`). For the tools,
add the MCP server too.

## Any MCP client

```bash
npx -y bos-skillset mcp                      # stdio; BOS_WORKSHOP=… to choose the workshop
```

Codex (`~/.codex/config.toml`):

```toml
[mcp_servers.bos]
command = "npx"
args = ["-y", "bos-skillset", "mcp"]
```

Cursor, Claude Desktop and others (`mcpServers` JSON):

```json
{ "mcpServers": { "bos": { "command": "npx", "args": ["-y", "bos-skillset", "mcp"] } } }
```

For an agent without skills or a session hook, put the rules in its context:
`BOS-CONTEXT.md` (or call the MCP tool `agent_brief` first).

## From a local clone

BOS is a project like any other, so its clone lives in the forge, in its scope:

```bash
cd ~/__WORKSHOP/forge/blacksmith-organization-system
git clone https://github.com/Sarverott/bos-skillset.git
cd bos-skillset && npm install && npm run build
```

Then point an agent at the clone instead of GitHub:

```
/plugin marketplace add ~/__WORKSHOP/forge/blacksmith-organization-system/bos-skillset     # Claude Code
gemini extensions link ~/__WORKSHOP/forge/blacksmith-organization-system/bos-skillset       # Gemini CLI
npx skills add ~/__WORKSHOP/forge/blacksmith-organization-system/bos-skillset              # other agents
```

`bin/bos` runs the bundle when it is built, and the source (with its
`node_modules`) otherwise, so a clone works without `npm run build` too.
`npm link` puts `bos-skillset` on your own PATH.

Check it:

```bash
node bin/bos workshop locate     # the workshop and the rule that found it
node bin/bos agent brief         # "you are in: forge / blacksmith-organization-system / bos-skillset"
npm test
```

Next: [getting started](GETTING_STARTED.md)
