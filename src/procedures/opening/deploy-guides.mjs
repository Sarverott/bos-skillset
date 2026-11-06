import { join } from "node:path";

import { createIfMissing } from "blacksmith-organization-system";

import { RESOURCES } from "../../self.mjs";

export const AGENT_GUIDES = ["AGENTS.md", "CLAUDE.md"];

// the workshop-root guides for AI agents; an existing one is never replaced
export const deployGuides = (context) => {
  const { host, workshop } = context;
  for (const guide of AGENT_GUIDES) {
    const target = workshop.file(guide);
    createIfMissing(context, target, () =>
      host.writeText(target, host.readText(join(RESOURCES, "workshop-root", guide)) ?? ""),
    );
  }
};
