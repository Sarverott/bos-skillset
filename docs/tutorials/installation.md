# Installation

The skills install into an agent; the workshop they describe is wherever the
agent runs (`~/__WORKSHOP` by default, `BOS_WORKSHOP` to point elsewhere).
The skills themselves need no build; only the core is an npm package.

## The core: the `bos` command

The skills tell agents to run `bos` (status, bootstrap, scopes, the craft
loop). It comes from the core:

```bash
npm install blacksmith-organization-system     # Node.js ≥ 22.18, local to the project
npx bos help
```

A local, pinned install keeps the version under the project's lockfile.
`npm install -g blacksmith-organization-system` makes `bos` available
everywhere instead. The Claude Code and Codex plugins need neither: their
session-start hook installs the version pinned in this repository's
`package.json` into the plugin's data directory (set `BOS_SKILLSET_NO_INSTALL=1`
to skip it), then tells the agent where the active workshop is.

Without the core, an agent can still use the skills as knowledge: where things
go and what each area means.

## Claude Code: the plugin

```
/plugin marketplace add Sarverott/bos-skillset
/plugin install bos@bos-skillset
```

## Codex: the plugin

```bash
codex plugin marketplace add Sarverott/bos-skillset
codex plugin add bos@bos-skillset
```

Codex asks you to trust the plugin's session-start hook before it runs.

## Gemini CLI: the extension

```bash
gemini extensions install https://github.com/Sarverott/bos-skillset
```

It loads `BOS-CONTEXT.md` as context.

## Cursor, Copilot and others

```bash
npx skills add Sarverott/bos-skillset --full-depth   # pick the agents and the skills it asks about
```

`--full-depth` is needed: the repository root is itself a skill
(`bos-skillset`), and without the flag the skills CLI stops there.

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
codex plugin marketplace add ~/__WORKSHOP/forge/blacksmith-organization-system/bos-skillset  # Codex
npx skills add ~/__WORKSHOP/forge/blacksmith-organization-system/bos-skillset --full-depth # other agents
```

Next: [getting started](GETTING_STARTED.md)
