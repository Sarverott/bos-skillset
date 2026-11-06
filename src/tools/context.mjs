// The context a suit procedure runs in: the core's (host, dryRun, changes, trace) and the suit.
import { createContext } from "blacksmith-organization-system";

export const contextFor = (suit, options = {}) => ({
  ...createContext(suit.host, { dryRun: Boolean(options.dryRun) }),
  suit,
  workshop: suit.workshop,
  options,
});

export const changesText = ({ dryRun, changes }) =>
  changes.length
    ? changes.map((path) => `${dryRun ? "would create" : "created"} ${path}`).join("\n")
    : "nothing missing";
