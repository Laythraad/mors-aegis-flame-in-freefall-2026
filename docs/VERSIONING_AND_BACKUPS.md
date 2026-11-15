# MORS AEGIS versions and backups

## What is kept

- `vX.Y.Z...` annotated Git tags are immutable application releases. Pushing a tag to GitHub gives the team a source snapshot for that exact commit.
- `backup/pre-vX.Y.Z...` annotated tags mark the exact repository state immediately before a new change.
- `backups/versions/*.zip` is a local ZIP copy of that pre-change state. This folder is intentionally ignored by Git so large backup archives do not inflate the source repository. Keep a copy on a separate disk or cloud backup if protection from computer or disk failure is needed.
- `CHANGELOG.md` records user-visible changes by application version.

## Before every change

1. Confirm `git status --short` is empty. Commit or safely preserve any in-progress change first.
2. Run `pwsh -File scripts/backup-current-version.ps1`.
3. Confirm the script reports both the ZIP path and backup tag. Do not edit project files if snapshot creation fails.
4. Make the requested change, update `package.json`, `public/index.html`, and `CHANGELOG.md` to the next prerelease version, and run `npm run build:client`.
5. Commit the complete release, create an annotated tag named exactly `v<package.json version>`, then push the branch and tags when publishing is authorized.

Use prerelease increments such as `3.0.0-alpha.3`, `3.0.0-alpha.4`, and so on until the release is stable. Do not overwrite old tags. If deployment is manual, verify Coolify reports the same release commit after deployment.

## Current release trail

- `v3.0.0-alpha.2`: baseline before the supplemental NASA plots.
- `backup/pre-v3.0.0-alpha.2-20261115-034254`: exact source snapshot immediately before versioning was added; its source commit is `9b1ab1f`.
- `backup/pre-v3.0.0-alpha.3-20261115-034454`: exact snapshot before this documentation correction.
- `v3.0.0-alpha.3`: source-linked supplemental NASA plots and versioning workflow.
- `backup/pre-v3.0.0-alpha.3-20261115-041147`: ZIP and tag snapshot before the public liveness endpoint change.
- `v3.0.0-alpha.4`: minimal Coolify health endpoint that does not bypass workspace authentication.
- `backup/pre-v3.0.0-alpha.4-20261115-042953`: ZIP and tag snapshot before the reverse-proxy origin check change.
- `v3.0.0-alpha.5`: exact trusted-origin handling when Coolify's internal Host differs from the public origin.
- `backup/pre-v3.0.0-alpha.5-20261115-043600`: ZIP and tag snapshot before removing login from the public judges' deployment.
- `v3.0.0-alpha.6`: anonymous access for the intentionally public read-only deployment.
- `backup/pre-v3.0.0-alpha.6-20261115-044730`: ZIP and tag snapshot before the cosmic motion and theme-preview update.
- `v3.0.0-alpha.7`: restrained animated starfield, orbital planets, theme previews, and current version badge.
- `backup/pre-v3.0.0-alpha.7-20261115-050129`: ZIP and tag snapshot before the flame/measurement-plot revision.
- `v3.0.0-alpha.8`: oxygen-responsive qualitative flame, selectable 2D/3D source-row plots, and evidence interpretation tree.
- `backup/pre-v3.0.0-alpha.8-20261115-073511`: ZIP and tag snapshot before the mobile 3D axis-label layout fix.
- `v3.0.0-alpha.9`: responsive axis labels and ranges displayed outside the FLEX 3D measurement plot.
- `backup/pre-v3.0.0-alpha.9-20261115-143720`: ZIP and tag snapshot before enabling the public research Copilot endpoint.
- `v3.0.0-alpha.10`: same-origin, rate-limited public Copilot request backed by local Qwen 2.5 3B over private Tailscale, with deterministic offline fallback.

- `backup/pre-v3.0.0-alpha.10-20261115-145424`: ZIP and tag snapshot before tightening AI evidence grounding.
- `v3.0.0-alpha.11`: Copilot answers stay within explicit PSI context; limitation questions are restricted to documented facts.

- `backup/pre-v3.0.0-alpha.11-20261115-145804`: ZIP and tag snapshot before routing limitation questions to deterministic evidence summaries.
- `v3.0.0-alpha.12`: deterministic, source-cited limits answers; local Qwen remains active for bounded research questions.

- `backup/pre-v3.0.0-alpha.12-20261115-150421`: ZIP and tag snapshot before the full test/lint reconciliation and verification-report refresh.
- `v3.0.0-alpha.13`: refreshed 36-plot deck/docs and corrected public-mode tests and lint configuration.

- `backup/pre-v3.0.0-alpha.13-20261115-151231`: ZIP and tag snapshot before separating authoritative results from generated interpretation.
- `v3.0.0-alpha.14`: deterministic results remain primary; generated qualitative interpretation is separately validated and displayed.
