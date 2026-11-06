---
name: bos-house
description: "The House of Anubis as code: the AI residents of the setternet, grouped into families, each with a state and, for ravens, a duty. Use when creating, finding or handling a BOS house, or when the user mentions a house."
---

# House (BOS)

> Draft written from `docs/glossary/house.md` (no model in the core yet).
> Grow it by hand.

## What it is

The House of Anubis as code: the AI residents of the setternet, grouped into
families, each with a state and, for ravens, a duty. Residents are local
(served by ollama) or remote (instances built on world-scale online models).

| State | Meaning |
| ----- | ------- |
| `active` | may be called |
| `resting` | rests by its own decision: never called, never prompted |
| `frozen` | kept, not called until the author unfreezes it |

A resident's own state wins over its family's.

## Where

The scope's `.delegations/house/` (for BOS itself: `forge/blacksmith-organization-system/.delegations/house/`):
`HOUSE.md`, `bloodlines.json`, and one JSON file per family in `children/` and `orders/` *(assumed: moved there by Sett from the skillset's `resources/house/`)*:

```json
{
  "title": "Library masters",
  "state": "active",
  "patterns": [],
  "residents": [{ "model": "the-library-master___omnilibris-shakespeare-KFT_docs", "name": "Shakespeare" }]
}
```

`patterns` claim served models by name (the EON family uses them).
`"fromRavens": true` fills a family from the scope's `.delegations/ravens/`.

## Handling

Before calling any ollama model, find it in the House's registry:
only residents of a family whose `state` is `active` are called. `ollama list`
shows what is served; read only the names, never start or prompt a resident to
find out who it is.

Resting residents (the EON family among them) are never called, prompted or inspected.

## References

- [glossary](../../docs/glossary/house.md)
