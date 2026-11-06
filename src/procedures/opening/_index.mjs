import { Procedure } from "blacksmith-organization-system";

import { bootstrapWorkshop } from "./bootstrap-workshop.mjs";
import { deployGuides } from "./deploy-guides.mjs";
import { recordOpening } from "./record-opening.mjs";

export const opening = new Procedure("opening", [
  { name: "bootstrap the workshop (core)", run: bootstrapWorkshop },
  { name: "deploy the agents' guides", run: deployGuides },
  { name: "record the opening", run: recordOpening },
]);

export default opening;
