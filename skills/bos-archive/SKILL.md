---
name: bos-archive
description: "Repositories at rest: the integrity base of the workshop. Use when creating, finding or handling a BOS archive, or when the user mentions a archive."
---

# Archive (BOS)

> Draft written from `docs/glossary/archive.md` and the core's `archive` model.
> Grow it by hand.

## What it is

Repositories at rest: the integrity base of the workshop. It holds scopes as
compressed, individual parts with their full history, mirrors buffering
between the craftspace and remote servers, and non-releasable repositories.

## Where

`__WORKSHOP/archive/`

## Handling

`bos workshop status` reports the archive area (reads only). [`TODO`] procedures for
moving work to rest (the core's phase 2: `bos archive mirror`).

## References

- [glossary](../../docs/glossary/archive.md)
- [model](https://github.com/Sarverott/blacksmith-organization-system/tree/master/src/models/archive/class.ts)
