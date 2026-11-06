# Joker

## 2026-11-06 — the skillset as a usable interface

My interpretation of Sett's request: make the contributor guide a coherent
contract for this repository, using the strongest applicable patterns from
the supplied guides. Keep the core's implementation and each repository's
release mechanics distinct.

The most useful pattern is a short chain of evidence: meaning in the glossary,
a verified core tool, instructions that a person or agent can follow, then a
packaging and usage check. A Taskfile makes the procedure discoverable; a
lockfile can make its tools reproducible. Neither replaces a working command.

I favour a private npm tooling manifest as the next integration step. It would
make core and discovery-tool versions explicit while preserving portable skill
folders. That is a proposed implementation direction, not a package installed
by this cleanup. The immediate result is the guide, devlog and findings.
