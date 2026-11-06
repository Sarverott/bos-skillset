// What the suit tells agents: bos agent <tool>
import { tool } from "blacksmith-organization-system";

import { briefText } from "../agent/brief.mjs";

export const agentTools = [
  tool({
    model: "agent",
    name: "brief",
    info: "the session brief: the workshop, where you are in it, the House's boundaries, the rules",
    args: [{ name: "dir", type: "string", info: "where the agent works (default: current directory)" }],
    run: (suit, input) => {
      if (!suit.workshop.exists()) return `no workshop at ${suit.workshop.path} (bos workshop open creates it)`;
      return briefText(suit, input.dir ? String(input.dir) : suit.host.cwd());
    },
    render: (result) => result,
  }),
];
