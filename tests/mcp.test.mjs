import assert from "node:assert/strict";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { test } from "vitest";

import { createMcpServer, mcpName, offered, TOOLS } from "../src/index.mjs";
import { sandbox } from "./helpers.mjs";

async function connected(suit) {
  const [clientSide, serverSide] = InMemoryTransport.createLinkedPair();
  await createMcpServer(suit).connect(serverSide);
  const client = new Client({ name: "test", version: "0" });
  await client.connect(clientSide);
  return client;
}

test("MCP: every read-only tool of the core and the suit, none that writes or streams", async () => {
  const { root, suit } = sandbox();
  await suit.bootstrap();
  const client = await connected(suit);
  const { tools } = await client.listTools();
  assert.deepEqual(tools.map((t) => t.name).sort(), offered(TOOLS).map(mcpName).sort());
  for (const name of ["workshop_status", "flow_explain", "workshop_glossary", "house_may_call", "agent_brief"]) {
    assert.ok(
      tools.some((t) => t.name === name),
      name,
    );
  }
  for (const name of ["workshop_bootstrap", "workshop_open", "workshop_watch", "flow_next_pr", "project_hook"]) {
    assert.ok(!tools.some((t) => t.name === name), `not offered: ${name}`);
  }
  assert.ok(tools.every((t) => t.annotations?.readOnlyHint));
  assert.deepEqual(tools.find((t) => t.name === "house_may_call").inputSchema.required, ["model"]);

  const status = await client.callTool({ name: "workshop_status", arguments: {} });
  assert.match(status.content[0].text, new RegExp(root.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  const page = await client.callTool({ name: "workshop_glossary", arguments: { term: "forge" } });
  assert.match(page.content[0].text, /^# Forge/);
  const wrong = await client.callTool({ name: "scope_version", arguments: { scope: "no-such-scope" } });
  assert.ok(wrong.isError || /no-such-scope|0\.0\.0\.0/.test(wrong.content[0].text));
});
