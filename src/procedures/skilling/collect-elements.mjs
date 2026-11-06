import { join } from "node:path";

import { BOS } from "blacksmith-organization-system";

import House from "../../house/class.mjs";
import { ROOT } from "../../self.mjs";
import { readPage } from "./glossary.mjs";

// the elements that stand on their own: every area and asset model of the core, and the House.
// The parts of .BOS (setup, nests, storylines…) belong to their owner's skill.
export const STANDALONE = [
  BOS.Workshop,
  BOS.Devarmory,
  BOS.Forge,
  BOS.Scope,
  BOS.Project,
  BOS.Craftbook,
  BOS.Archive,
  House,
];

export const collectElements = (context) => {
  context.root = context.options.root ?? ROOT;
  context.elements = STANDALONE.map((Model) => ({
    Model,
    type: Model.type,
    page: readPage(join(context.root, "docs", "glossary", `${Model.type}.md`)),
  }));
};
