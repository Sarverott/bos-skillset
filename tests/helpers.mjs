// Tests run against temporary workshops only, never the real one.
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { NodeHost } from "blacksmith-organization-system";

import { Suit } from "../src/index.mjs";

// a fresh, not yet existing workshop path, and a suit pointed at it
export function sandbox() {
  const root = join(mkdtempSync(join(tmpdir(), "bos-")), "__WORKSHOP");
  const host = new NodeHost();
  return { root, host, suit: new Suit(host, { workshop: root }) };
}

// a git repository with one commit, e.g. forge/scope/project of a sandbox
export function repository(host, dir) {
  mkdirSync(dir, { recursive: true });
  const git = (...args) => {
    const result = host.run("git", args, { cwd: dir });
    if (result.status !== 0) throw new Error(result.stderr);
    return result.stdout;
  };
  git("init", "-q", "-b", "development");
  git("config", "user.email", "test@example.com");
  git("config", "user.name", "test");
  git("config", "commit.gpgsign", "false");
  writeFileSync(join(dir, "README.md"), "# project\n");
  git("add", "README.md");
  git("commit", "-q", "-m", "docs: start");
  return git;
}
