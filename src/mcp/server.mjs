// BOS over the Model Context Protocol (stdio), generated from the tool registry: the core's
// tools and the suit's. Only read-only tools are offered, and none that streams forever:
// agents look and plan through MCP; changing the workshop stays a conscious act on the command line.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { VERSION } from "../self.mjs";
import Suit from "../suit.mjs";
import { streams, TOOLS } from "../tools/_index.mjs";

const READ_ONLY = { readOnlyHint: true, destructiveHint: false, openWorldHint: false };

export const mcpName = (entry) => `${entry.model}_${entry.name}`.replace(/-/g, "_");

export const offered = (tools = TOOLS) => tools.filter((entry) => entry.readOnly && !streams(entry));

// a tool's args → the zod shape MCP clients see
export function inputShape(entry) {
  const shape = {};
  for (const arg of entry.args) {
    const kind = arg.type === "boolean" ? z.boolean() : z.string();
    shape[arg.name] = (arg.required ? kind : kind.optional()).describe(arg.info);
  }
  return shape;
}

export function createMcpServer(suit = new Suit(undefined, { workshop: process.env.BOS_WORKSHOP })) {
  const server = new McpServer({ name: "bos", version: VERSION });
  for (const entry of offered()) {
    server.registerTool(
      mcpName(entry),
      {
        description: `bos ${entry.model} ${entry.name}: ${entry.info}`,
        inputSchema: inputShape(entry),
        annotations: READ_ONLY,
      },
      async (input = {}) => {
        try {
          const lines = [];
          const io = { print: (line) => lines.push(line), signal: new AbortController().signal };
          const result = await entry.run(suit, input, io);
          const text = entry.render ? entry.render(result, input) : JSON.stringify(result ?? null, null, 2);
          return { content: [{ type: "text", text: [...lines, text].join("\n") }] };
        } catch (error) {
          return { isError: true, content: [{ type: "text", text: `${mcpName(entry)}: ${error.message}` }] };
        }
      },
    );
  }
  return server;
}

export async function startMcpServer(suit) {
  await createMcpServer(suit).connect(new StdioServerTransport());
}
