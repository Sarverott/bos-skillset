// The House of Anubis: bos house <tool>
import { tool } from "blacksmith-organization-system";

import { gathering } from "../procedures/gathering/_index.mjs";
import { houseText } from "../views/house.mjs";
import { contextFor } from "./context.mjs";

export const houseTools = [
  tool({
    model: "house",
    name: "show",
    info: "children, orders, bloodlines and each resident's state; resting residents are never called",
    args: [{ name: "all", type: "boolean", info: "also list every model per bloodline" }],
    run: async (suit) => {
      const { children, orders, bloodlines, catalog } = await gathering.run(contextFor(suit));
      return { reachable: catalog !== null, children, orders, bloodlines, catalog };
    },
    render: (result, input) => houseText(result, { all: Boolean(input.all) }),
  }),
  tool({
    model: "house",
    name: "may-call",
    info: "whether an AI resident (an ollama model) may be called: only active ones are",
    args: [{ name: "model", type: "string", info: "model name, e.g. tulu3", positional: true, required: true }],
    run: (suit, input) => ({ model: input.model, ...suit.house.stateOf(String(input.model)) }),
    render: (r) =>
      `${r.model}: ${r.state}${r.state === "active" ? " (may be called)" : " (never call or prompt it)"}${r.reason ? ` · ${r.reason}` : ""}`,
  }),
];
