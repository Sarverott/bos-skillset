#!/usr/bin/env node
// SessionStart hook of the BOS plugin: registers the session with BOS.
// Claude Code and Codex both read hooks/hooks.json and both set CLAUDE_PLUGIN_ROOT
// and CLAUDE_PLUGIN_DATA (Codex also PLUGIN_ROOT and PLUGIN_DATA).
//
// Thin glue, no BOS behaviour: everything BOS does belongs to the core (`bos`).
//   1. make the core pinned by package.json available in the plugin's data
//      directory (the documented "install dependencies into the data directory" pattern)
//   2. ask the core where the active workshop is (`bos workshop locate --json`)
//   3. print a short plain-text context for the agent
// It never fails the session: every problem becomes a line of context instead.
// Set BOS_SKILLSET_NO_INSTALL=1 to skip step 1.

import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { delimiter, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const env = process.env;
const root = env.CLAUDE_PLUGIN_ROOT || env.PLUGIN_ROOT || join(dirname(fileURLToPath(import.meta.url)), '..');
const data = env.CLAUDE_PLUGIN_DATA || env.PLUGIN_DATA || '';
const project = env.CLAUDE_PROJECT_DIR || process.cwd();
const windows = process.platform === 'win32';
const bosBin = windows ? 'bos.cmd' : 'bos';

const read = (file) => {
  try {
    return readFileSync(file, 'utf8');
  } catch {
    return null;
  }
};

function installCore() {
  if (!data || env.BOS_SKILLSET_NO_INSTALL) return null;
  const manifest = join(root, 'package.json');
  const lock = join(root, 'package-lock.json');
  const copy = join(data, 'package.json');
  if (read(manifest) === null) return null;
  if (read(manifest) === read(copy) && existsSync(join(data, 'node_modules', '.bin', bosBin))) return null;
  try {
    mkdirSync(data, { recursive: true });
    copyFileSync(manifest, copy);
    if (existsSync(lock)) copyFileSync(lock, join(data, 'package-lock.json'));
  } catch (error) {
    return `could not prepare ${data}: ${error.message}`;
  }
  const args = [existsSync(lock) ? 'ci' : 'install', '--omit=dev', '--ignore-scripts', '--no-audit', '--no-fund'];
  const run = spawnSync('npm', args, { cwd: data, stdio: 'ignore', timeout: 150_000, shell: windows });
  if (run.status === 0) return null;
  rmSync(copy, { force: true }); // retried at the next session start
  return `npm ${args[0]} in ${data} failed`;
}

function findCore() {
  const dirs = [data && join(data, 'node_modules', '.bin'), join(root, 'node_modules', '.bin'), ...(env.PATH || '').split(delimiter)];
  for (const dir of dirs) {
    if (dir && existsSync(join(dir, bosBin))) return join(dir, bosBin);
  }
  return null;
}

function bos(bin, ...args) {
  const run = spawnSync(bin, args, { cwd: project, encoding: 'utf8', timeout: 15_000, shell: windows });
  return run.status === 0 ? run.stdout.trim() : null;
}

const lines = ['BOS (Blacksmith Organization System) plugin is active; the bos-* skills describe the workshop and its rules.'];
const installProblem = installCore();
const bin = findCore();

if (!bin) {
  lines.push(
    'The BOS core (`bos`) is not available here. Install it with `npm install blacksmith-organization-system`',
    '(locally in a project, or -g); until then, work from the skills alone and do not invent `bos` output.',
  );
} else {
  const version = bos(bin, '--version');
  lines.push(`BOS core: ${version ? `bos ${version}` : 'bos'} at ${bin}.`);
  const located = bos(bin, 'workshop', 'locate', '--json');
  try {
    const { root: workshop, source } = JSON.parse(located);
    lines.push(`Active workshop: ${workshop} (found by: ${source}). Check it with \`bos workshop status\` before writing.`);
  } catch {
    lines.push('`bos workshop locate` gave no workshop for this directory.');
  }
}
if (installProblem) lines.push(`Installing the core: ${installProblem}.`);

process.stdout.write(`${lines.join('\n')}\n`);
