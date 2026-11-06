// The suit as one self-contained file: dist/bos-skillset.mjs carries the core, the MCP SDK,
// zod and ollama, so an installed plugin works with Node and nothing else (no npm install).
// `npm run build`. dist/ is ignored on the coding branches; the release on master builds it and
// commits it (release.config.mjs), so what the marketplace installs always carries it.
import { build } from "esbuild";

export const options = {
  entryPoints: ["src/cli.mjs"],
  outfile: "dist/bos-skillset.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
  minify: true,
  legalComments: "none",
  logLevel: "info",
  // some bundled packages are CommonJS and require() node's built-ins
  banner: {
    js: 'import { createRequire as __bosRequire } from "node:module";\nconst require = __bosRequire(import.meta.url);',
  },
};

// run as a script (npm run build), not when a test imports the options
if (import.meta.url === `file://${process.argv[1]}`) await build(options);
