// the version of the core this suit was built on (bundled in by esbuild with the rest)
import core from "blacksmith-organization-system/package.json" with { type: "json" };

export const CORE_VERSION = core.version;
