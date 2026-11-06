// Every tool, in the order `bos help` shows them: the core's, then the suit's.
// One entry is at once the CLI command, its help, and (read-only ones) an MCP tool.
import { TOOLS as CORE_TOOLS } from "blacksmith-organization-system";

import { agentTools } from "./agent.mjs";
import { houseTools } from "./house.mjs";
import { projectTools } from "./project.mjs";
import { skillsTools } from "./skills.mjs";
import { workshopTools } from "./workshop.mjs";

export { CORE_TOOLS };

export const SUIT_TOOLS = [...workshopTools, ...projectTools, ...houseTools, ...agentTools, ...skillsTools];

export const TOOLS = [...CORE_TOOLS, ...SUIT_TOOLS];

export function findTool(model, name) {
  const entry = TOOLS.find((t) => t.model === model && t.name === name);
  if (entry) return entry;
  const models = [...new Set(TOOLS.map((t) => t.model))];
  if (!models.includes(String(model))) throw new Error(`unknown model "${model}" (models: ${models.join(", ")})`);
  const names = TOOLS.filter((t) => t.model === model).map((t) => t.name);
  throw new Error(`${model} has no tool "${name}" (tools: ${names.join(", ")})`);
}

// a tool that has its own --json flag streams lines while it runs (bos workshop watch)
export const streams = (entry) => entry.args.some((arg) => arg.name === "json");
