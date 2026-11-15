## 3.0.0-alpha.21 — 2026-11-15

- Removed the dedicated 30-second project video and its generated media/build assets at the user's request; retained NASA educational references in the science guide.
- Added a first-visit welcome panel on the AI-first landing page for language, theme, and accent selection, plus a dedicated Black Hole theme with animated accretion and pointer-following light.
- Added a conceptual function diagram to each selected 3D system model, alongside its existing live model, purpose, and research value.
- Added question-aware retrieval from sixteen separately checksummed NASA PSI source tables to the AI Copilot; detailed verified calculations remain PSI-69-only to prevent invalid cross-study pooling.
## 3.0.0-alpha.20 — 2026-11-15

- Added a narrated 30-second English project film and a dedicated in-app watch/download page.

## 3.0.0-alpha.19 — 2026-11-15

- Added a first-visit and Settings accent-color picker with automatic contrast adjustment; scientific chart series retain their evidence meanings.
- Promoted the AI Copilot on the overview and documented its deterministic calculation, bounded interpretation, citation, and fallback workflow.
- Added a PSI-69 fuel-by-reported-outcome count matrix with source and scope caveats.
- Updated the seven-slide submission deck to feature the AI workflow and removed server and tunnel details.

# Changelog
## 3.0.0-alpha.18 — 2026-11-15

- Give the AI a bounded, analysis-specific explanation of averages, associations, comparisons, and source-record lookups.
- Shorten deterministic-result AI generation to a single, validated plain-language sentence.

## 3.0.0-alpha.17 — 2026-11-15

- Simplified the quantitative AI prompt to one evidence-bounded scope task, removing conflicting instructions that led Qwen to deny available results.
- Added `curl` to the runtime image so Coolify's configured HTTP health check can reach `/healthz`.

## 3.0.0-alpha.16 — 2026-11-15

- Reject AI statements that contradict a successfully computed result, including claims that the source data is absent or unusable.
- Require source-scope language for qualitative notes and clarify that the model may only explain the descriptive scope.

## 3.0.0-alpha.15 — 2026-11-15

- Keep raw measurements, calculated values, and prior chat history out of AI interpretation prompts when a verified numeric result is shown separately.
- Added a regression check for the AI/data boundary; the seven-slide presentation documents the AI scope and limitations.

## 3.0.0-alpha.14 — 2026-11-15

- Display deterministic source-cited results separately from the local AI's qualitative note; reject numeric, universal, causal, or safety claims from generated interpretation.
- Added regression checks for the AI-response boundary and clarified that calculations remain authoritative.

## 3.0.0-alpha.13 — 2026-11-15

- Corrected network-mode documentation and tests for the public, login-free read-only site and its trusted Copilot exception.
- Synchronized the source-chart inventory at 30 NASA study charts plus six PSI-69/FLEX views (36 total), and refreshed the seven-slide deck count.
- Fixed lint configuration for standard browser globals and excluded ignored presentation-review artifacts.

## 3.0.0-alpha.12 — 2026-11-15

- Route limitation questions to a deterministic source-cited answer after the local model repeated unsupported claims about confidence intervals.
- Clarified the supported PSI-69 limits, including per-variable missingness and the minimum sample threshold for bootstrap intervals.

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
