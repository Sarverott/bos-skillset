import { join } from "node:path";

import { createIfMissing } from "blacksmith-organization-system";

// skills/bos-<type>/SKILL.md, only where none exists yet
export const writeSkills = (context) => {
  const { host } = context;
  for (const skill of context.skills) {
    const dir = join(context.root, "skills", skill.name);
    skill.created = createIfMissing(context, join(dir, "SKILL.md"), () => {
      host.mkdir(dir);
      host.writeText(join(dir, "SKILL.md"), skill.text);
    });
  }
};
