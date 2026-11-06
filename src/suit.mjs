// The spine of the skillset: the core's BOS, suited up for AI agents. Everything the core
// does (workshop, scopes, flow, versions) comes from blacksmith-organization-system; the suit
// adds only what agents need on top of it: the House, the ravens, the glossary, the brief.
//   const suit = new Suit();  await suit.inspect();  suit.house.mayCall("tulu3")
import { BOS, NodeHost } from "blacksmith-organization-system";

import House from "./house/class.mjs";

export class Suit extends BOS {
  #house = null;

  constructor(host = new NodeHost(), options = {}) {
    super(host, options);
  }

  // the House of Anubis (resources/house/): asked before any AI resident is called
  get house() {
    this.#house ??= new House();
    return this.#house;
  }

  toString() {
    return `[<BOS_Suit::${this.workshop.path}>]`;
  }
}

export default Suit;
