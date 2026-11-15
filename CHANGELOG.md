# Changelog
## 3.0.0-alpha.11 — 2026-11-15

- Tightened AI evidence grounding: factual claims and numeric thresholds must come directly from supplied NASA PSI context; limitation answers cannot add unsupported items.

## 3.0.0-alpha.10 — 2026-11-15

- Enabled the public, same-origin, rate-limited research Copilot endpoint while keeping all other write APIs blocked in public read-only mode.
- Connected Copilot to the existing Qwen 2.5 3B model on the RTX 4060 PC over private Tailscale; deterministic PSI-69 summaries remain available when it is offline.
- Kept optional Gemini credentials server-side and made the active AI provider visible in the Copilot interface.

## 3.0.0-alpha.9 — 2026-11-15

- Moved FLEX 3D axis names and measured ranges into a responsive readout above the chart so they remain readable on mobile without covering plotted observations.


## 3.0.0-alpha.8 — 2026-11-15

- Connected the 12–34 vol % FLEX PSI-69 oxygen control to the qualitative 3D flame envelope; exposed the dimensionless visual mapping and kept partial pressure as the only calculated physical value.
- Reworked the microgravity illustration as a hollow, blue diffusion-flame shell around a visible fuel droplet; preserved explicit non-CFD/non-prediction limits.
- Added a source-row 2D plot studio with selectable measurement axes, fuel/outcome filters, point-level source details, and an explicitly exploratory OLS fit.
- Made the FLEX 3D measurement view choose any three measured axes, filter by fuel and outcome, inspect row values, and zoom/rotate.
- Added an evidence-to-claim tree and corrected reduced-motion behavior in the flame scene.

## 3.0.0-alpha.7 — 2026-11-15

- Added a subtle animated starfield and orbiting planets that preserve the MORS navy, cyan, and gold identity.
- Respected reduced-motion preferences and added visual previews to the first-visit theme chooser.
- Synchronized the visible application version with the release.

## 3.0.0-alpha.6 — 2026-11-15

- Removed the login gate from public read-only deployments so judges can open research pages directly.
- Kept all application-changing API requests disabled in public read-only mode.

## 3.0.0-alpha.5 — 2026-11-15

- Fixed trusted-origin checks behind Coolify and Cloudflare Tunnel when the proxy's internal Host differs from the public browser origin.
- Preserved exact-origin allowlisting and cross-site request rejection.

## 3.0.0-alpha.4 — 2026-11-15

- Added a minimal unauthenticated `/healthz` liveness endpoint for Coolify; it reports only `status: ok` and reveals no configuration details.
- Updated the backup deployment health check to use `/healthz`, avoiding false failures from the access-token gate on `/api/health`.

## 3.0.0-alpha.3 — 2026-11-15

- Added NASA BASS forced-airflow versus flame-spread chart, with plotted points marked as approximate figure digitization.
- Added NASA gravity-regime versus flame-sphericity comparison, clearly distinguishing a measured point from an approximate model read-off.
- Added source provenance, methods, and limitations for supplemental NASA studies to the Sources page.
- Established pre-change ZIP backups, immutable Git backup tags, and versioned release tags.

## 3.0.0-alpha.2 — 2026-11-14

- Added the NASA PSI research interface improvements and evidence-linked visualizations present in the baseline commit.
