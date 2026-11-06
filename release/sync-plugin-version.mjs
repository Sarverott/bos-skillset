// semantic-release plugin (local): every manifest of the suit follows the release, so installed
// plugins and extensions move to a new version exactly when the suit releases one on master.
import { readFileSync, writeFileSync } from "node:fs";

const MANIFESTS = {
  ".claude-plugin/plugin.json": (manifest, version) => {
    manifest.version = version;
  },
  ".claude-plugin/marketplace.json": (manifest, version) => {
    manifest.metadata.version = version;
    for (const plugin of manifest.plugins) plugin.version = version;
  },
  "gemini-extension.json": (manifest, version) => {
    manifest.version = version;
  },
};

export function prepare(_pluginConfig, { nextRelease, logger }) {
  for (const [path, set] of Object.entries(MANIFESTS)) {
    const manifest = JSON.parse(readFileSync(path, "utf8"));
    set(manifest, nextRelease.version);
    writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`);
    logger.log(`${path} → ${nextRelease.version}`);
  }
}
