// What an agent learns at the start of a session: the workshop, where it works in it, the
// House's boundaries, and the tools BOS gives it. Short: it becomes the agent's context.
import { VERSION } from "../self.mjs";
import { placeIn } from "./place.mjs";

export function whereText(place) {
  if (!place) return "outside this workshop";
  if (!place.area) return "workshop root";
  return [place.area, place.scope, place.project].filter(Boolean).join(" / ");
}

// suit: a Suit on an existing workshop (src/agent/situate.mjs); cwd: where the agent stands
export function briefText(suit, cwd) {
  const { workshop, house } = suit;
  const resting = house.resting();
  const orders = house
    .orders()
    .map((o) => o.title ?? o.name)
    .join(", ");
  return [
    "# BOS: Blacksmith Organization System",
    `workshop ${workshop.path} (found by: ${workshop.located?.source ?? "?"}) · bos-skillset v${VERSION}`,
    `you are in: ${whereText(placeIn(suit, cwd))}`,
    `House of Anubis: ${house.children().length} adopted children, orders: ${orders}.${resting.length ? ` Resting, never call or prompt: ${resting.join(", ")}.` : ""}`,
    "where things go: code → forge/<scope>/<project> · tools → devarmory/ · notes → craftbook/scrapnotes/ · work at rest → archive/",
    "tools: `bos <model> <tool>` (bos help) · MCP tools <model>_<tool> (workshop_status, workshop_glossary, flow_explain…) · skills bos-*",
    "rules: create only what is missing, never overwrite · ask the House before calling any ollama model · conventional commits · work on development (or dev/<name>), never on master · the owner works in parallel: re-check git state",
    "",
  ].join("\n");
}
