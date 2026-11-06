---
description: Draft a conventional commit message for what is staged (Skryba refines it if the House allows)
argument-hint: "[--skryba]"
allowed-tools: Bash(bos project describe:*), Bash(bos house may-call:*), Bash(git status:*), Bash(git diff --cached:*)
---

1. Run `git status --short` and `git diff --cached --stat`. If nothing is staged, say so and stop.
2. Run `bos project describe $ARGUMENTS` for a draft. With `--skryba`, BOS asks the House
   itself before calling the raven.
3. Improve the draft from the staged diff: keep the conventional form `type(scope): subject`,
   choose the type honestly (`feat` new behaviour, `fix` fixes; it decides the next version),
   and write a short body on why.
4. Show the message. Commit only if the user asks, never with `--no-verify`, never on `master`.
