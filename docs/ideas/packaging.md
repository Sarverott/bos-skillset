# Idea: packaging a plugin that carries code

Only needed again if the plugin carries code (an MCP server, hooks). While it
is skills and manifests, nothing has to be built or published: every agent
installs straight from the GitHub repository.

## One file, no install step

Claude Code and Gemini CLI install a plugin by copying the repository; they
don't run `npm install`. So code in a plugin must bring its dependencies. The
first build bundled everything (the core, the MCP SDK, zod, ollama's client)
with esbuild into one minified file, `dist/bos-skillset.mjs` (~800 KB), and a
launcher `bin/bos` ran it, or the source in a clone. `dist/` was ignored on the
coding branches and committed only by the release on `master`, so what the
marketplace installed always carried it.

Simpler, if the code lives in the core: the manifests call the core's own
`bos` through `npx -y blacksmith-organization-system@<version>`, and the
skillset carries no code and no dependencies at all.

## Where it stands (2026-11-06)

The skillset still carries no BOS code. `package.json` pins the core as its
only dependency, and the plugins' SessionStart hook (`hooks/register.js`)
installs it with `npm ci` into the plugin's data directory
(`CLAUDE_PLUGIN_DATA`, the pattern the Claude Code docs describe; Codex sets
the same variables). It redoes the install only when `package.json` changes.
So the plugin host doesn't have to run `npm install`, and nothing is
bundled. An MCP server would be declared in `.mcp.json` the same way, as
`${CLAUDE_PLUGIN_DATA}/node_modules/.bin/bos mcp`, once the core has one.

## Releasing

The first build used semantic-release on every station of the branch flow
(`development` → `-dev.N`, `testing` → `-beta.N`, `releasing` → `-rc.N`,
`master` → `x.y.z`), synced the version into every manifest
(`.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`,
`gemini-extension.json`), and published to npm and GitHub Packages. Its
dependency tree (semantic-release, commitlint, commitizen, husky, vitest,
biome) brought most of the Dependabot alerts. Without code, a release is a tag
and the version in the three manifests; the core's `bos flow bump` could set them.
