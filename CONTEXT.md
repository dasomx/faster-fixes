# Faster Fixes

A widget that lets a website's end-users report bugs and feedback in-page; reports flow into a project inbox and can be mirrored to external trackers (GitHub Issues, Linear).

## Language

### Reporting

**Feedback**:
A bug report or comment submitted via the widget on a customer's site. The atomic unit of the inbox.
_Avoid_: Issue (reserved for tracker-side artifacts), Ticket, Bug report.

**Reviewer**:
The end-user of the customer's site who submitted a Feedback through the widget.
_Avoid_: Reporter, Submitter, User.

**Project**:
A Faster Fixes container scoped to one website (one widget install). Holds Feedback, settings, and at most one tracker link per integration.
_Avoid_: Site, App, Workspace.

### Feedback lifecycle

**Status**:
The state of a Feedback. Canonical values: `new`, `in_progress`, `resolved`, `archived`.

**Archived**:
A Feedback the team has decided not to act on (won't fix, duplicate, out of scope). Stored in the database as `status = "closed"` for legacy reasons; the literal will be renamed in a future migration. UI label is **Archived** everywhere (status dropdown, kanban action, archive view).
_Avoid_: Closed, Dismissed, Rejected.

### Integrations

**Tracker**:
An external issue-tracking system Faster Fixes can mirror Feedback into. Currently GitHub Issues and Linear.
_Avoid_: Integration target, Sink.

**Installation**:
The org-level connection to a Tracker (`GitHubInstallation`, `LinearInstallation`). One per (Organization × Tracker).

**Project link**:
The project-level binding from a Faster Fixes Project to a Tracker scope (a GitHub repo, a Linear team). One per (Project × Tracker).

**Issue link**:
The per-Feedback record connecting a single Feedback to its mirrored issue in a Tracker. A Feedback can have at most one issue link per Tracker, but may have one for GitHub *and* one for Linear simultaneously.

## Relationships

- A **Project** has zero or one **Project link** per **Tracker** (GitHub, Linear)
- A **Feedback** has zero or one **Issue link** per **Tracker**
- A **Reviewer** submits **Feedback** through the widget; Reviewers are not authenticated app users
- An **Installation** is owned by an Organization and shared across all Projects in that Organization
- The same **Feedback** may exist as a GitHub Issue and a Linear Issue at the same time; both are mirrors of the Feedback, not peers of each other

## Example dialogue

> **Dev:** "When a Reviewer submits a Feedback, do we create the GitHub Issue immediately?"
> **Domain expert:** "Only if the Project has an active GitHub Project link with auto-create enabled. Same for Linear, independently — a Project can mirror to neither, one, or both Trackers."
>
> **Dev:** "What if the team marks the Feedback as Archived?"
> **Domain expert:** "On the GitHub side it closes the Issue with `state_reason = not_planned`. On Linear it moves to a `canceled`-type state. The Feedback is the source of truth — Trackers are mirrors and must converge to it."

## Flagged ambiguities

- **"Closed" vs "Archived"** — historically used interchangeably. Resolved: the canonical user-facing term is **Archived**. The DB literal `"closed"` is retained for now to avoid a migration; rename is deferred.
- **"Issue"** — refers exclusively to a tracker-side artifact (GitHub Issue, Linear Issue). Internal app records are **Feedback**, never "issues".
