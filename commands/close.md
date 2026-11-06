---
description: Close the BOS workshop — keep the shell history as a ttystory and record the closing
allowed-tools: Bash(bos workshop close:*)
---

Remind the user that bash writes its history on exit (`history -a` includes the current
shell), then run `bos workshop close` and report where the ttystory was kept.
Ttystories can hold secrets: never print their content.
