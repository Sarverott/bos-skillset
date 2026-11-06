# Installation

The skills install into an agent; the workshop they describe is wherever the
agent runs (`~/__WORKSHOP` by default, `BOS_WORKSHOP` to point elsewhere).
Nothing is built or installed with npm for the skills themselves.

## The core: the `bos` command

The skills tell agents to run `bos` (status, bootstrap, scopes, the craft
loop). It comes from the core:

```bash
npm install -g blacksmith-organization-system     # Node.js ≥ 22
bos help
```

Without it, an agent can still use the skills as knowledge: where things go
and what each area means.

## Claude Code: the plugin

```
/plugin marketplace add Sarverott/bos-skillset
/plugin install bos@bos-skillset
```

## Gemini CLI: the extension

```bash
gemini extensions install https://github.com/Sarverott/bos-skillset
```

It loads `BOS-CONTEXT.md` as context.

## Codex, Cursor, Copilot and others

```bash
npx skills add Sarverott/bos-skillset        # pick the agents and the skills it asks about
```

For an agent without skills, put `BOS-CONTEXT.md` in its context.

## From a local clone

BOS is a project like any other, so its clone lives in the forge, in its scope:

```bash
cd ~/__WORKSHOP/forge/blacksmith-organization-system
git clone https://github.com/Sarverott/bos-skillset.git
```

Then point an agent at the clone instead of GitHub:

```
/plugin marketplace add ~/__WORKSHOP/forge/blacksmith-organization-system/bos-skillset     # Claude Code
gemini extensions link ~/__WORKSHOP/forge/blacksmith-organization-system/bos-skillset       # Gemini CLI
npx skills add ~/__WORKSHOP/forge/blacksmith-organization-system/bos-skillset              # other agents
```

Next: [getting started](GETTING_STARTED.md)
