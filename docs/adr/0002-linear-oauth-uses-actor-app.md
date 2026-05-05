# Linear OAuth uses `actor=app`

The Linear OAuth flow authorizes with `actor=app` rather than the simpler `actor=user`. Issues created by Faster Fixes are attributed to the Faster Fixes OAuth application (e.g. "Created by Faster Fixes"), not to the human who installed the integration. The token is bound to the app, not to the installer's user identity.

## Why

`actor=user` would be simpler — no token expiry, no refresh flow, attribution maps cleanly to a real human. The cost: when the installer leaves the customer's organization or has their Linear access revoked, the token dies and the integration silently breaks. Every Faster Fixes customer would face an eventual maintenance event tied to internal HR transitions — invisible to us, painful to them.

`actor=app` produces a stable, organization-scoped token whose lifecycle is independent of any individual user. It matches the GitHub App attribution model we already use (`GitHubInstallation` issues are attributed to the app, not the installer). Consistent attribution semantics across both Trackers makes mental model migration cheaper for both users and engineers.

## Consequences

- `LinearInstallation.refreshToken` and `tokenExpiresAt` are required, not aspirational. Tokens expire and must be rotated lazily on 401.
- Linear-side audit logs show "Faster Fixes" as the actor for issue creation/update, not the installer's name. Customers expecting "I created this" attribution must be told this is by design.
- Switching to `actor=user` later would require re-authorizing every existing installation.
