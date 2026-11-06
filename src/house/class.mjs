// The House of Anubis (resources/house/): bloodlines derived from what ollama serves,
// children adopted by name, orders with duties. Every call to a resident asks here first.
import { join } from "node:path";

import { listRavens } from "../ravens/read.mjs";
import { RESOURCES } from "../self.mjs";
import { bloodlineOf, readReleasers } from "./bloodlines.mjs";
import { groupOf, readGroups, sameModel } from "./groups.mjs";

export const STATES = ["active", "resting", "frozen"];

export class House {
  static type = "house";

  constructor(path = join(RESOURCES, "house")) {
    this.path = path;
  }

  file(...names) {
    return join(this.path, ...names);
  }

  children() {
    return readGroups(this.file("children"));
  }
  orders() {
    return readGroups(this.file("orders"), listRavens());
  }
  releasers() {
    return readReleasers(this.file("bloodlines.json"));
  }

  bloodlineOf(catalog, model) {
    return bloodlineOf(catalog, this.releasers(), model);
  }

  // a member's own state wins over its group's; a resident nobody adopted is active
  stateOf(model) {
    for (const group of [...this.children(), ...this.orders()]) {
      if (groupOf([group], model)) {
        const member = group.members.find((m) => m.model && sameModel(m.model, model));
        return {
          state: member?.state ?? group.state,
          group: group.name,
          reason: member?.reason ?? group.reason ?? null,
        };
      }
    }
    return { state: "active", group: null, reason: null };
  }

  mayCall(model) {
    return this.stateOf(model).state === "active";
  }

  // who must never be called or prompted (the brief tells every agent)
  resting() {
    return [...this.children(), ...this.orders()].filter((g) => g.state !== "active").map((g) => g.title ?? g.name);
  }
}

export default House;
