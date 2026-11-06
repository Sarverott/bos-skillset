// Which element has a skill, which got a fresh draft; and the skills this suit carries.
import { header, pad, paint } from "./paint.mjs";

export function draftsText({ skills, dryRun }) {
  const state = (created) => (created ? paint.green(dryRun ? "+ would draft" : "+ drafted") : paint.dim("● exists"));
  return [
    header("skills"),
    "",
    ...skills.map(({ name, created }) => `  ${pad(paint.cyan(name), 24)} ${state(created)}`),
  ].join("\n");
}

export function skillsText(skills) {
  return [
    header("skills of the suit"),
    "",
    ...skills.flatMap(({ name, description }) => [`  ${paint.cyan(name)}`, `      ${description}`]),
  ].join("\n");
}
