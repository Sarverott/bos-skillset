---
description: Where this branch stands in the BOS craft loop and what its next step is
argument-hint: "[branch]"
allowed-tools: Bash(bos flow explain:*), Bash(bos flow next:*), Bash(git branch --show-current:*), Bash(git status:*)
---

Run `bos flow explain`. Then take the branch (`$ARGUMENTS`, or `git branch --show-current`)
and run `bos flow next <branch>`. Tell the user where the branch is in the loop, what its
forward step is, and what would merge by itself. Do not push, merge or open pull requests
unless the user asks.
