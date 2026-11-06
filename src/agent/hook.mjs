// Claude Code hooks → BOS (hooks/hooks.json: `bos hook <event>`). The hook's JSON comes on stdin.
//   session-start  prints a short brief (becomes the agent's context) and records the session
//   bash           appends the agent's shell command to its ttystory in storylines
//   session-end    records the end of the session
// Outside a workshop it stays silent; it never fails the agent (always exits 0).
import { briefText } from "./brief.mjs";
import { recordAgentCommand, recordAgentEvent } from "./record.mjs";
import { situate } from "./situate.mjs";

export const EVENTS = ["session-start", "bash", "session-end"];

export async function readInput(stdin = process.stdin) {
  try {
    const chunks = [];
    for await (const chunk of stdin) chunks.push(chunk);
    return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch {
    return {};
  }
}

// what the hook prints (only session-start prints anything)
export function handleHook(event, input) {
  const suit = situate(input);
  if (!suit) return "";
  if (event === "session-start") {
    recordAgentEvent(suit, input, "agent-session-start");
    return briefText(suit, input.cwd ?? process.cwd());
  }
  if (event === "bash") recordAgentCommand(suit, input);
  if (event === "session-end") recordAgentEvent(suit, input, "agent-session-end");
  return "";
}

export async function runHook(event) {
  try {
    const text = handleHook(event, await readInput());
    if (text) process.stdout.write(text);
  } catch {}
  return 0;
}
