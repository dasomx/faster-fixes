# Architecture Decision Records

This directory holds the architectural decisions for the Faster Fixes repo. Each ADR captures **one decision**, the alternatives that were considered, and the reasoning behind the choice — so a developer six months later can understand *why* the codebase looks the way it does.

## Conventions

- One file per decision: `NNNN-short-kebab-title.md` (e.g. `0001-event-sourced-orders.md`).
- Numbering is monotonic and never reused, even if a decision is later superseded.
- ADRs are produced lazily by `/grill-with-docs` when an architectural decision actually needs to be pinned down. Don't create speculative ADRs upfront.

## Suggested template

```markdown
# ADR-NNNN: <decision>

- **Status**: Proposed | Accepted | Superseded by ADR-XXXX
- **Date**: YYYY-MM-DD

## Context

What's the situation? What forces are at play?

## Decision

What did we decide?

## Alternatives considered

Other options and why they were rejected.

## Consequences

What changes because of this? What new constraints does it create?
```

## Status

No ADRs recorded yet. They'll appear here as `/grill-with-docs` produces them.
