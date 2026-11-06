import { Procedure } from "blacksmith-organization-system";

import { listServed } from "./list-served.mjs";
import { mergeResidents } from "./merge-residents.mjs";
import { readRegistry } from "./read-registry.mjs";

// the House of Anubis: registry merged with what ollama serves
export const gathering = new Procedure("gathering", [
  { name: "read the House registry", run: readRegistry },
  { name: "list served models", run: listServed },
  { name: "merge residents", run: mergeResidents },
]);

export default gathering;
