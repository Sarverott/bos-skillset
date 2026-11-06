---
description: Show the BOS workshop as one report — areas, scopes, projects and findings
argument-hint: "[--all]"
allowed-tools: Bash(bos workshop status:*), Bash(bos agent brief:*)
---

Run `bos workshop status $ARGUMENTS` and `bos agent brief`, then summarize for the user:
which workshop is active, where we are in it, and every error or warning the report found,
each with the fix BOS suggests. Do not change anything.
