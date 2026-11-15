# MORS AEGIS — Flame in Freefall verification

**Verification date:** 2026-11-15
**Scope:** local challenge-focused research application
**Primary experimental source:** NASA Physical Sciences Informatics (PSI), Combustion Science

## Challenge-source compliance

The 2026 Space Apps challenge identifies the NASA PSI Combustion Science repository as the data source on which the application is to be based. Every experimental table exposed by the challenge evidence API comes from an allowlisted PSI investigation file. Supporting assets bundled with the project also belong to those PSI records. NASA publications, standards, educational pages and the ScienceCasts video are explanatory references; they are not ingested as experiment rows. The earlier prototype's NASA FIRMS, NASA DONKI and NOAA SWPC feed routes are not wired into the application, and automated tests verify that the Earth-fire and space-weather API endpoints are unavailable.

Official references: [Space Apps challenge](https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall/?tab=resources), [filtered NASA PSI API · Research Area = Combustion Science](https://psi.nasa.gov/geode-py/ws/repo/search?source=psi&type=investigation&size=100&sort=Accession&order=asc&ffield=Research+Area&fvalue=combustion+science), [NASA PSI combustion search page](https://psi.nasa.gov/physci/repo/search?q=combustion).

The Sources page lists the official 2026 challenge introduction video separately from the NASA ScienceCasts educational video, so the two resources are not conflated.

## Source inventory and integrity

- 24 investigations appear in the captured NASA PSI Combustion search inventory.
- 16 source manifests returned a published `Experimental table` CSV; all 16 tables are bundled. The eight other manifest lookups returned no listing in this snapshot. This does not prove that no files exist for those investigations.
- The tables contain 1,329 source rows, retained per investigation and never pooled as one experiment.
- Eight additional supporting assets are from the bundled PSI-98 and PSI-100 investigations.
- PSI's official introduction video describes 24 investigations and roughly 12 TB overall. The available file-listing metadata enumerates 36,490 objects and about 9.16 TB across only the 16 study manifests that returned a listing. This partial snapshot is metadata, not a local download; the large raw archives were not downloaded.
- The challenge-data audit recomputed byte counts and SHA-256 hashes against `source_manifest.json`, parsed all table schemas, and wrote `quality_report.json`.
- Latest audit result: **16 tables · 8 supporting files · 1,329 separate source rows**.
- NASA PSI inventory and file manifests were refreshed from their official endpoints on 2026-11-14. All 16 bundled experimental CSVs still match the live manifest's file version and advertised byte count. No additional experimental table appeared. Eight inventory IDs returned no file listing; this remains an unknown, not evidence that no data exist.

The immutable source package is in `ms02-connectors/challenge-data/raw/`; inventory details are in `psi_combustion_inventory.json` and `psi_file_index.json`. Source IDs are allowlisted; an unknown investigation ID returns 404 instead of falling through to an unrelated legacy dataset.

## Scientific interpretation boundaries

- NASA PSI investigations use different apparatus, materials, flows, atmospheres, measurements, and row definitions. The interface exposes each source and flags the limits; it does not turn row count into sample size or present a global material-hazard ranking.
- The PSI-69 FLEX analysis is limited to liquid-droplet tests. Its `D²(t) = D₀² − Kt` burning-rate constant has units of area/time (`mm²/s`) and is not a solid-material flame-spread velocity.
- The investigation inventory ranks PSI records by metadata topic relevance plus flight/reduced-gravity context; table availability is shown separately and only breaks ties. The score is not a hazard estimate. The Investigation Lab computes only curated source-field summaries for each bundled study and displays selected experimental-condition values verbatim. It preserves table-specific row scope, filters SAFFIRE-I flow-reference rows from its two burn-time entries, keeps negative BASS-II CO values, withholds generic statistics for metadata/envelope-only tables, and directs FLEX to its dedicated stratified workbench. No means, confidence intervals, or causal estimates are pooled across investigations.
- The SPICE clock audit finds 469 source rows but 118 distinct date/ignition/flame-off clock pairs. Three pairs have flame-off earlier than ignition and are flagged; 115 non-negative same-day intervals have a median of 85 s and range 17–655 s. This is a derived clock check, not a count of independent burns or a calibrated spread rate.
- For reduced gravity, buoyancy-driven natural convection is strongly reduced; molecular diffusion and forced ventilation remain. The flame diagrams are labeled schematics, not experiment imagery.
- `pO₂ = xO₂ Ptotal` is used only as a dry-gas composition calculation. Mission-atmosphere examples are cited reference/design cases, not operational prescriptions or PSI experiment rows. Similar oxygen partial pressure does not establish equal flammability.
- No partial-gravity PSI combustion dataset is claimed. Normal-gravity and microgravity evidence may bound questions but cannot directly measure lunar or Martian gravity behavior.
- Optional AI-generated explanations are not measurements; the supplied evidence, deterministic calculations, and limitations remain separately identified.

Detailed review: `CHALLENGE_BRIEF_AND_VIDEO.md`, `CHALLENGE_DATA_REVIEW.md`, `SAFFIRE_SOURCE_REVIEW.md`, `SCIENTIFIC_SCOPE.md`, and `DATA_INVENTORY.md`.

## Active application surface

The active single-page application presents Overview, Flame Physics, Mission Atmospheres, Safety Insights, Mission Lessons, Challenge Evidence, Investigation Lab, Analysis Workbench, Comparison Studio, AI Copilot, Sources, Reports, and Settings. It also includes the dedicated Chart Guide and 3D Models page. The duplicate Provenance view was consolidated into Sources & Methods. The Investigation Lab summarizes the 16 bundled tables individually; the FLEX workbench remains the only full condition-stratified outcome analysis. The interactive collection contains 36 scientific plots: 30 study-specific source-table views and six PSI-69/FLEX views. The chart controls support zoom, pan, selected-point details and guide lines. The 3D Models page lists 41 supplied GLB concepts; its volumetric flame scene is explicitly explanatory and responds visually to oxygen, gravity mode, airflow, mist and fire state. Old Earth-fire globe, generic image-segmentation, unused experiment-explorer assets, and arbitrary CSV upload support were removed. Earth-fire, geomagnetic/space-weather, and other off-challenge feeds are not connected to active APIs. The workflow endpoint rejects caller-supplied datasets and runs only against the bundled PSI-69 table.

The public AI Copilot uses Qwen 2.5 3B on the separate RTX 4060 PC over private Tailscale. Exact measurements and limitations are computed deterministically and shown as the authoritative result; the model adds only a short qualitative interpretation. For numeric-result requests, the model receives the analysis type and evidence boundary, not raw rows, numeric outputs, or prior chat history. Numeric, universal, causal, and safety claims in that interpretation are rejected. Generated explanations are not measurements or validation.

## Verification performed

- `npm run data:audit` — passed; source inventory and checksums regenerated successfully.
- `npm run build:client` — passed; browser bundle rebuilt successfully.
- `node --check public/app.js` — passed.
- `node --check public/challenge-research.js` — passed.
- `node --check ms02-connectors/challenge-data/catalog.mjs` — passed.
- `node --check ms02-connectors/registry.mjs` — passed.
- `npm run lint` — passed with ESLint 10.
- `npm test` — **101 passed, 0 failed**. Coverage includes source integrity and row preservation, curated study-analysis fields and limitations, interactive plot behavior, 3D model inventory/state handling, theme contrast, AI-response claim filtering, unknown-source rejection, API contracts, security boundaries, unsupported old-feed endpoints, FLEX normalization/units, statistical boundaries, authentication, deterministic replay, and rejection of caller-supplied datasets by the workflow API.
- `npm run lint` — passed; the ignored presentation QA directory is excluded and browser globals are declared.
- The seven-slide English PowerPoint was exported from the existing branded deck, imported and finalized with the presentation tool. It preserves the 16:9 / Arial style, contains one editable, workbook-backed chart, and includes QR codes for the live site and GitHub repository.

## Limitations and handoff

This report verifies a research software/data package, not a NASA-endorsed tool or a validated spacecraft fire-safety system. It does not claim to download or analyze the PSI repository's multi-terabyte image/video archives, and the application makes no image-based flame-detection claim. The 2026 challenge video was reviewed through a locally generated English audio transcript because YouTube's caption endpoint returned HTTP 429; the timestamped notes are paraphrases, not official captions. Cross-investigation predictive fire-risk claims are not supported by the current tables. The local model was exercised through a live, same-origin Copilot request, but is not a scientific source. The public route is reachable through the temporary [Cloudflare Quick Tunnel preview](https://halifax-accent-berlin-mystery.trycloudflare.com/); `/`, `/api/health`, `/healthz`, and `/models/catalog.json` returned HTTP 200 on 2026-11-15. `/api/health` reports the local Ollama provider and Qwen model. The tunnel is active; its hostname can change if the Quick Tunnel process is recreated.

The public page is available without a login, and Coolify reported the application `running:healthy` during this verification. The Windows RTX 4060 PC, Ollama, and Tailscale must remain online for generated Copilot replies; deterministic evidence summaries remain available for bounded fallback cases. Before presenting, review the English interface, switch to Arabic once to check the language toggle, open one table from each major evidence family, and show its NASA PSI source and checksum status. Do not present a source ranking as a hazard score or derived atmosphere examples as NASA recommendations.
