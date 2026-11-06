import { Procedure } from "blacksmith-organization-system";

import { collectElements } from "./collect-elements.mjs";
import { composeSkills } from "./compose-skill.mjs";
import { writeSkills } from "./write-skills.mjs";

// draft an agent skill for every standalone element that has none
export const skilling = new Procedure("skilling", [
  { name: "collect elements", run: collectElements },
  { name: "compose skills", run: composeSkills },
  { name: "write missing skills", run: writeSkills },
]);

export default skilling;
