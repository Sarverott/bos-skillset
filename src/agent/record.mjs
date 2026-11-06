// An agent's work leaves storylines like a person's: its sessions as events, its shell
// commands as its own ttystory (ttystory-<host>-<agent>-<session>.txt, one line per command:
// unixusat, cwd, command). Storylines hold shell history: treat them like .BOS/setup.
import { createContext, Ttystories } from "blacksmith-organization-system";

import { placeIn } from "./place.mjs";

export function recordAgentEvent(suit, input, event, agent = "claude") {
  const storylines = suit.workshop.system.storylines;
  return storylines.record(
    {
      event,
      agent,
      session: input.session_id ?? null,
      source: input.source ?? null,
      model: input.model ?? null,
      place: placeIn(suit, input.cwd ?? suit.host.cwd()),
    },
    createContext(suit.host),
  );
}

export function recordAgentCommand(suit, input, agent = "claude") {
  const command = input.tool_input?.command;
  if (!command) return null;
  const { host } = suit;
  const ttystories = suit.workshop.system.storylines.child(Ttystories).ensure(createContext(host));
  const file = ttystories.file(`ttystory-${host.hostname()}-${agent}-${input.session_id ?? "unknown"}.txt`);
  host.appendText(file, `${host.now()}\t${input.cwd ?? host.cwd()}\t${command.replace(/\n/g, "\\n")}\n`);
  return file;
}
