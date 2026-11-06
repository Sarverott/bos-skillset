// Where an agent session happens: the workshop found from the hook's cwd.
// Returns null when there is no workshop there; hooks never create one.
import { existsSync } from "node:fs";

import { NodeHost } from "blacksmith-organization-system";

import Suit from "../suit.mjs";

export function situate(input = {}, { host = new NodeHost() } = {}) {
  if (input.cwd && existsSync(input.cwd)) process.chdir(input.cwd);
  const suit = new Suit(host, { workshop: host.env("BOS_WORKSHOP") });
  return suit.workshop.exists() ? suit : null;
}
