import { Procedure } from "blacksmith-organization-system";

import { captureTtystory } from "./capture-ttystory.mjs";
import { recordClosing } from "./record-closing.mjs";

export const closing = new Procedure("closing", [
  { name: "capture the ttystory", run: captureTtystory },
  { name: "record the closing", run: recordClosing },
]);

export default closing;
