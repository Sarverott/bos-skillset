// Where the suit itself lives and which version it is. The same from src/ and from the
// bundle in dist/: both are one level below the root of the plugin.
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
export const RESOURCES = join(ROOT, "resources");
export const GLOSSARY = join(ROOT, "docs", "glossary");
export const SKILLS = join(ROOT, "skills");
export const VERSION = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")).version;

// the command git hooks, plugin hooks and MCP clients call (bin/bos: the bundle or the source)
export const CLI = join(ROOT, "bin", "bos");
export const BUNDLE = join(ROOT, "dist", "bos-skillset.mjs");
export const bundled = () => existsSync(BUNDLE);
