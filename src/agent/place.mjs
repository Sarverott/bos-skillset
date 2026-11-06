// Where a path sits in the workshop, down to its project: the core's placeOf gives area, scope
// and what is inside; the git repository around the path, when it lies in that scope, is the project.
import { join, relative } from "node:path";

import { placeOf, projectAround } from "blacksmith-organization-system";

export function placeIn(suit, path) {
  const place = placeOf(suit.workshop.path, path);
  if (place?.area !== "forge" || !place.scope || !place.inner) return place;
  const scope = join(suit.workshop.path, "forge", place.scope);
  try {
    const project = relative(scope, projectAround(suit.host, path).path);
    if (project && !project.startsWith("..")) return { ...place, project };
  } catch {}
  return place;
}
