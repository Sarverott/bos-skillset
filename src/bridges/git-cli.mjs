// git through its command line, by the core's one door to the machine (Host.run).
// Every answer is null (or empty) outside a repository instead of an error.
const STATES = { A: "added", M: "modified", D: "deleted", R: "modified", C: "added", T: "modified" };

export class GitCli {
  static id = "git-cli";

  constructor(host) {
    this.host = host;
  }

  try(args, cwd) {
    const { status, stdout } = this.host.run("git", args, { cwd });
    return status === 0 ? stdout.trim() : null;
  }

  root(cwd) {
    return this.try(["rev-parse", "--show-toplevel"], cwd);
  }
  branch(cwd) {
    return this.try(["rev-parse", "--abbrev-ref", "HEAD"], cwd);
  }
  head(cwd) {
    return this.try(["rev-parse", "HEAD"], cwd);
  }
  hooksPath(cwd) {
    return this.try(["config", "--get", "core.hooksPath"], cwd) || null;
  }

  // the last commit: { oid, subject }
  last(cwd) {
    const line = this.try(["log", "-1", "--format=%H%x09%s"], cwd);
    if (!line) return null;
    const [oid, subject = ""] = line.split("\t");
    return { oid, subject };
  }

  // what is staged: [[path, "added" | "modified" | "deleted"], …]; a rename counts as its new path
  staged(cwd) {
    const listed = this.try(["diff", "--cached", "--name-status", "--no-renames"], cwd) ?? "";
    return listed
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [mark, ...paths] = line.split("\t");
        return [paths.at(-1), STATES[mark[0]] ?? "modified"];
      });
  }
}

export default GitCli;
