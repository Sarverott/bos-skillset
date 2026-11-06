import assert from "node:assert/strict";
import { test } from "vitest";

import { CORE_TOOLS, findTool, SUIT_TOOLS, TOOLS } from "../src/index.mjs";
import { glossaryName } from "../src/tools/workshop.mjs";
import { sandbox } from "./helpers.mjs";

test("one registry: the core's tools first, then the suit's, no name twice", () => {
  assert.deepEqual(TOOLS, [...CORE_TOOLS, ...SUIT_TOOLS]);
  const names = TOOLS.map((t) => `${t.model} ${t.name}`);
  assert.equal(new Set(names).size, names.length);
  for (const name of ["workshop status", "workshop bootstrap", "flow explain", "scope version"]) {
    assert.ok(names.includes(name), `core: ${name}`);
  }
  for (const name of ["workshop glossary", "workshop open", "house show", "project describe", "agent brief"]) {
    assert.ok(names.includes(name), `suit: ${name}`);
  }
  assert.throws(() => findTool("nope", "x"), /unknown model "nope"/);
  assert.throws(() => findTool("house", "x"), /house has no tool "x" \(tools: show, may-call\)/);
});

test("the glossary: a page per term, the list without one, nothing outside it", async () => {
  const { suit } = sandbox();
  const glossary = findTool("workshop", "glossary");
  const list = await glossary.run(suit, {});
  assert.ok(list.includes("forge") && list.includes("house") && !list.includes("README"));
  assert.match(await glossary.run(suit, { term: "House" }), /^# House/);
  assert.equal(glossaryName("../../etc/passwd"), "etcpasswd");
  assert.match(await glossary.run(suit, { term: "../../etc/passwd" }), /no glossary page/);
});

test("the House answers who may be called", async () => {
  const { suit } = sandbox();
  const mayCall = findTool("house", "may-call");
  assert.equal((await mayCall.run(suit, { model: "EON-beta___Chronus:latest" })).state, "resting");
  assert.match(mayCall.render(await mayCall.run(suit, { model: "tulu3" }), {}), /tulu3: active \(may be called\)/);
});
