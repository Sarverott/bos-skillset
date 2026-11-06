// bos help: every tool, the core's first, then the suit's.
import { paint } from "./paint.mjs";

// how an argument is written: <operand>, --flag, --option=<value>; [in brackets] when optional
function argShape(arg) {
  let shape = `--${arg.name}=<value>`;
  if (arg.positional) shape = `<${arg.name}>`;
  else if (arg.type === "boolean") shape = `--${arg.name}`;
  return arg.required ? shape : `[${shape}]`;
}

const usage = (entry) => [`bos ${entry.model} ${entry.name}`, ...entry.args.map(argShape)].join(" ");

function toolLines(entry) {
  const writes = entry.readOnly ? "" : paint.yellow("  (writes)");
  const args = entry.args.map((arg) => `        ${arg.positional ? arg.name : `--${arg.name}`}: ${arg.info}`);
  return [`  ${usage(entry)}`, `      ${entry.info}${writes}`, ...args];
}

export function helpText({ core, suit }, versions) {
  return [
    `bos ${versions.suit}: the Blacksmith Organization System, suited up for AI agents (core ${versions.core})`,
    "",
    "usage: bos <model> <tool> [operands] [--flags]   common flags: --workshop=<path> --json",
    "       bos mcp                  the read-only tools as an MCP server (stdio)",
    "       bos hook <event>         Claude Code hooks: session-start, bash, session-end",
    "",
    paint.bold("core (blacksmith-organization-system)"),
    ...core.flatMap(toolLines),
    "",
    paint.bold("suit (bos-skillset)"),
    ...suit.flatMap(toolLines),
  ].join("\n");
}
