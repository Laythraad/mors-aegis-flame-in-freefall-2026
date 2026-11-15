# MORS AEGIS — Flame in Freefall

MORS AEGIS is a research dashboard for the NASA Space Apps challenge **[Flame in Freefall: SI-Powered Fire Safety Insights from Microgravity Combustion Data](https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall/?tab=resources)**. It presents source-linked NASA Physical Sciences Informatics (PSI) combustion records, explains the transport physics behind flames in reduced gravity, and makes the limits of the available evidence visible.

**Current application version: `3.0.0-alpha.10`.** See [CHANGELOG.md](CHANGELOG.md) for changes and [versioning and backups](docs/VERSIONING_AND_BACKUPS.md) for restoring earlier snapshots.

## Run locally

Requirements: Node.js 22.13 or newer.

```powershell
Copy-Item .env.example .env
npm start
```

Open <http://127.0.0.1:4173>. Copy `.env.example` to configure optional Gemini or a private Ollama model; the NASA PSI evidence browser and physics pages work without an AI provider. Never commit `.env` or place credentials in source files. The service binds locally by default.

For a deliberately public research deployment, set `MORS_PUBLIC_READONLY=1` and exact HTTPS origins in `MORS_TRUSTED_ORIGINS`. Pages and GET APIs are public without a login; only the same-origin, rate-limited research Copilot POST is allowed. All other application-changing POST APIs remain blocked. Leave `MORS_ACCESS_TOKEN` unset in this mode. The local Ollama endpoint stays private on Tailscale; never expose its port publicly.

## Challenge evidence

**Primary measurement source: the NASA Physical Sciences Informatics (PSI) repository's Combustion Science investigation files**, linked from the challenge Resources. Measurement tables and supporting files come from those NASA PSI records; cited literature and standards provide scientific context and are never counted as experimental data. The official PSI search snapshot returns 24 investigation records. In the captured file-manifest snapshot, 16 investigations return file listings and each has one `Experimental table` CSV; all 16 tables are bundled. The other eight manifest lookups returned no file listing, which does not prove that NASA has no files for them. The 16 original tables contain 1,329 rows across separate, non-harmonized studies; this is a file inventory, not a pooled sample. The 2026 challenge video describes the overall repository as about 12 TB; our successful file-manifest snapshot lists 36,490 files totalling about 9.16 TB across the 16 returned manifests only. These are different coverage snapshots; the 9.16 TB subtotal is not a claim to have downloaded or enumerated the complete archive. Those payloads are not downloaded automatically. The app bundles the 16 small experimental tables and eight explicitly selected, relevant PSI support assets. Raw files remain byte-for-byte intact in `ms02-connectors/challenge-data/raw/`. `source_manifest.json` records each bundled asset's source record, available DOI and rights metadata, file version, byte count, and SHA-256. The full PSI investigation snapshot is in `psi_combustion_inventory.json`; the PSI file inventory is in `psi_file_index.json`.

| PSI record | Investigation | Source rows bundled | DOI |
|---|---|---:|---|
| PSI-20 | ACME Burning Rate Emulator (BRE) | 18 | — |
| PSI-21 | ACME Coflow Laminar Diffusion (CLD) Flame | 32 | — |
| PSI-22 | ACME Electric-Field Flames | 32 | — |
| PSI-23 | ACME Spherical Diffusion (s-Flame) | 18 | — |
| PSI-25 | Burning and Suppression of Solids-II (BASS-II) | 129 | [10.60555/4qc4-de67](https://doi.org/10.60555/4qc4-de67) |
| PSI-26 | Burning and Suppression of Solids (BASS) | 122 | [10.60555/58h4-dy80](https://doi.org/10.60555/58h4-dy80) |
| PSI-39 | Cool Flames Investigation (CFI) | 87 | — |
| PSI-47 | Dust and Aerosol Measurement Feasibility Test (DAFT) | 2 | — |
| PSI-68 | Flame Extinguishment Experiment-2 (FLEX-2) | 8 | — |
| PSI-69 | Flame Extinguishment Experiment (FLEX) | 274 | [10.60555/mbq8-0451](https://doi.org/10.60555/mbq8-0451) |
| PSI-98 | Spacecraft Fire Safety Experiment-I (SAFFIRE-I) | 4 | [10.60555/0t15-1z43](https://doi.org/10.60555/0t15-1z43) |
| PSI-99 | Spacecraft Fire Experiment-II (SAFFIRE-II) | 15 | [10.60555/2chp-m469](https://doi.org/10.60555/2chp-m469) |
| PSI-100 | Spacecraft Fire Experiment-III (SAFFIRE-III) | 2 | [10.60555/040q-4h36](https://doi.org/10.60555/040q-4h36) |
| PSI-101 | Smoke Aerosol Measurement Experiment-Reflight (SAME-R) | 109 | [10.60555/2np7-jv14](https://doi.org/10.60555/2np7-jv14) |
| PSI-102 | Smoke and Aerosol Measurement Experiment (SAME) | 8 | [10.60555/gd4k-8h62](https://doi.org/10.60555/gd4k-8h62) |
| PSI-107 | Smoke Point In Co-flow Experiment (SPICE) | 469 | — |

The measurement source remains the NASA PSI files specified for the challenge; this is not a merge with unrelated NASA feeds. The tables cover gaseous-flame investigations, smoke/aerosol sessions, droplet test conditions, and solid-material tests. Some are conditions or sample inventories, not measured flame-spread outcomes; the UI retains their fields without presenting them as hazard scores. Selected PSI-98/100 operating and image-nomenclature documents, the PSI-98 image archive, and two PSI-100 telemetry exports from those PSI records are also preserved and checksummed. Telemetry channel values stay strings until an authoritative calibration map establishes their units. The three bundled PSI-98 JPEGs are too dark to identify a flame and are not presented as flame detections.

## Problems found and project response

| Problem found | Change made | Remaining limit |
|---|---|---|
| The earlier prototype mixed Earth-fire and space-weather feeds with a microgravity-combustion challenge. | Removed the FIRMS, DONKI, NOAA, unrelated astronomy, quantum-demo and synthetic habitat-data routes/pages from the active challenge application. Tests confirm the off-topic feed endpoints are unavailable. | Those feeds are not used as challenge measurements or safety evidence. |
| PSI tables describe different fuels, apparatus, environments, variables and outcomes. | Keep each of the 16 source tables separate, preserve the original field names and values, show missingness and classify rows by study-specific meaning. | The 1,329 rows are a file inventory, not one pooled sample; cross-study hazard scores are not supported. |
| The official video describes a roughly 12 TB repository, but only part of its file inventory was returned in our snapshot. | Bundle the 16 small `Experimental table` CSVs that were listed, attach selected files from the same PSI investigations, and record source metadata, byte counts and SHA-256 hashes. | The snapshot lists about 9.16 TB across 16 returned study manifests; eight other manifest lookups returned no listing. We did not download the multi-terabyte archive. |
| Oxygen fraction alone can make habitat comparisons misleading. | Show `pO₂ = xO₂ Ptotal` beside the reference cases and explain that pressure, diluent, fuel, geometry, flow and ignition also affect flammability. | The cases are research references, not a selected lunar atmosphere or an operational prescription. |
| Some telemetry channels lack an authoritative calibration map, and some image assets cannot support flame identification. | Preserve telemetry values as strings and checksum source assets. Label the dark PSI-98 JPEGs as unsuitable for identifying a flame. | No telemetry-unit inference or image-based flame-detection result is claimed. |
| FLEX burning-rate values could be mistaken for solid-fuel flame spread. | Restrict detailed numerical analysis to PSI-69 droplet tests and identify `D²(t) = D₀² − Kt` as a droplet burning-rate relation. | FLEX results do not establish solid-material spread rates or a universal fire-risk model. |
| Challenge objectives could be mistaken for already-proven predictive performance. | Map the three video objectives to study discovery, investigation-specific evidence inspection and bounded fire-safety research questions. Distinguish source observations, calculations, interpretations and hypotheses. | Current data do not validate a cross-investigation predictive model, a universal hazard ranking, or certified spacecraft procedures. |

The dashboard distinguishes primary experimental data from background references. NASA's fire-safety technical brief, NASA-STD-3001 and the FLEX technical publication support explanation of mechanisms, definitions and safety context; they are not extra experiment rows. Detailed numeric analysis remains investigation-specific. In particular, FLEX's burning-rate constant is based on the droplet diameter-squared law (`D²(t) = D₀² − Kt`) and is not a solid-fuel flame-spread velocity.

Read the [official challenge resource audit](docs/OFFICIAL_CHALLENGE_RESOURCE_AUDIT.md), [challenge brief and NASA video review](docs/CHALLENGE_BRIEF_AND_VIDEO.md), [challenge data review](docs/CHALLENGE_DATA_REVIEW.md), and [SAFFIRE source-file review](docs/SAFFIRE_SOURCE_REVIEW.md) for the exact resource list, source interpretation, video analysis, physics, evidence limits, and candidate safety implications.

## Pages

- **Overview** — a video-derived checklist maps the three explicit judging objectives to the app's study discovery, model-evidence inspection, and fire-safety insights.
- **Flame Physics** — labeled Earth/microgravity schematic, buoyancy-driven flow versus diffusion and forced ventilation, the PSI-22 electric-field/ion-wind demonstration, Grashof and Péclet numbers, oxygen partial-pressure relation, and FLEX droplet law. Illustrations are schematics, not experimental imagery.
- **Mission Atmospheres** — NASA atmosphere reference cases for Earth/ISS, shuttle EVA preparation, exploration-atmosphere studies, and EVA suits, with calculated dry-gas oxygen partial pressure and explicit design-status caveats.
- **Safety Insights** — evidence-bounded prevention, ignition-source control, smoke/CO detection, suppression qualification, and crew response design questions.
- **3D Models** — interactive gallery for the 41 original GLB models, the Blender gallery, and source methods for HARBOR, PULSE-MIST, VAPOR-TRACE, and the extinction-pathway test rig, plus a 2D candidate-pathway map. The separate volumetric flame scenario responds visually to gravity mode, airflow, mist, and fire state. The current HARBOR clearance report records about 15 mm sampled surface separation and no sampled BVH overlap for the saved pose; it is a visual CAD check only, not a tolerance, load, thermal, installation-envelope, or flight qualification.
- **Mission Lessons** — the official challenge-linked Apollo 1, Apollo 13, Mir, and NASA Spinoff references, analyzed as incident or technology-transfer context rather than as PSI experiment measurements.
- **Challenge Evidence** — source records, checksums, source field inventories, row classifications and table inspection.
- **Related-project scan** — a dated review of public Flame in Freefall project artifacts, their useful ideas, and claims that need scientific context. It is explicitly not an official entrant or winners list: [docs/RELATED_CHALLENGE_PROJECTS.md](docs/RELATED_CHALLENGE_PROJECTS.md).
- **Investigation Lab** — select from the full PSI inventory and inspect curated, source-field-specific descriptive summaries and verbatim experiment-condition values for bundled tables. Studies with condition-only data or unresolved field meanings show the gap instead of a fabricated outcome.
- **Analysis Workbench / Comparison Studio** — reproducible PSI-69/FLEX analysis stratified by test conditions and comparison of individual matched FLEX records. These pages do not imply cross-study equivalence; arbitrary CSV import is intentionally unavailable so unrelated data cannot enter the challenge analysis path.
- **Chart Guide** — catalog of the scientific plots, source fields, interaction controls, reading notes, and interpretation limits. The interactive collection combines source-table views with PSI-69/FLEX plots; zoom, pan, point details, and guide lines support inspection without turning descriptive data into a predictive model.
- **AI Copilot** — deterministic, cited measurements and limitations remain the authoritative result; Qwen 2.5 3B on the separate GPU PC adds a short qualitative interpretation over private Tailscale. Unsupported numeric, universal, causal, and safety claims are filtered; deterministic answers remain available when the model is offline. Gemini can be used as an optional alternative. Generated text is never a measurement or validation.
- **Sources & Methods / Reports** — challenge-provided resources, source DOIs, evidence labels, data boundaries and exportable summaries. The duplicate Provenance view is consolidated into Sources & Methods.

The Arabic interface is a translation layer; English is the default scientific wording. Earth-fire maps, geomagnetic/space-weather feeds, unrelated astronomy or quantum demonstrations, and synthetic habitat telemetry are outside the active product scope.

## Committee presentation

The seven-slide English competition deck is available at [`deliverables/presentation/MORS_AEGIS_NASA_Space_Apps_Submission_7_Slides_AI.pptx`](deliverables/presentation/MORS_AEGIS_NASA_Space_Apps_Submission_7_Slides_AI.pptx). It includes the team logo, an editable PSI table-row chart, presenter notes, clickable links, website and repository QR codes, and the local AI workflow. The public site is read-only and does not require sign-in. The live website QR uses the current temporary Cloudflare Quick Tunnel hostname and may change if its service is recreated. Deployment details are in [the Coolify runbook](docs/COOLIFY_BACKUP_DEPLOYMENT.md).

For an HTTPS reverse proxy such as Cloudflare Tunnel, set `MORS_TRUSTED_ORIGINS` to exact public and proxy HTTPS origins, separated by commas; set `MORS_COOKIE_SECURE=1` if login is enabled. The server checks browser origins against this exact allowlist, so a proxy may use a different internal `Host` value without blocking the trusted public origin. Wildcard origins are rejected. `MORS_PUBLIC_READONLY=1` exposes read-only pages without login and rejects API mutation requests. A Cloudflare Quick Tunnel hostname can change when its process is recreated, so update the exact origin when that happens. When login is enabled for a private deployment, keep `MORS_ACCESS_TOKEN` private and out of the repository, slides, URLs, and logs.

## Data sources, API boundaries, and integrity audit

- `GET /api/challenge/catalog` — complete PSI investigation index, bundled table row/field inventories, curated per-study `studyAnalysis` summaries, supporting assets and SHA-256 validation status.
- `GET /api/challenge/table?id=PSI-69` — one allowlisted NASA PSI table as parsed source strings. IDs are restricted to the 16 bundled records.
- `POST /api/workflow` — deterministic checks of the bundled PSI-69/FLEX source; rejects caller-supplied datasets.
- Unknown table IDs return `404`.

The challenge experimental measurements are downloaded only from NASA PSI Combustion Science investigation files. NASA PSI inventory and file-index endpoints are used for the reproducible metadata/file refresh scripts; the website serves the checked-in inventory snapshot and checksummed files. NASA NTRS links are used for selected background papers and an atmosphere-design presentation, but this build does **not** claim that the NTRS API was harvested into the experiment dataset. NASA FIRMS, NASA DONKI, and NOAA SWPC feeds from the earlier prototype are out of scope and are not wired into the active application. They do not provide microgravity-combustion measurements.

Parsing trims only outer whitespace in the parsed view and maps empty cells to `null`; all non-empty values remain strings. Original source files are never rewritten. No cross-study unit harmonization or missing-value imputation is performed.

```powershell
npm run data:audit
npm test
```

`npm run data:inventory` refreshes the filtered PSI investigation inventory; `npm run data:file-index` refreshes official table-file versions; `npm run data:tables` downloads only public experimental-table CSVs missing locally, verifying every byte count; `npm run data:audit` regenerates `ms02-connectors/challenge-data/quality_report.json`. The audit reports file hashes, row counts, headers, missingness, and numeric-looking ranges as inventory only; it does not infer physical units from numeric text.

## Scientific interpretation and boundaries

In microgravity, buoyancy-driven natural convection is greatly reduced, but forced ventilation, molecular diffusion, fuel transport and pressure-driven flow still move heat and species. The interface uses `Gr = g β ΔT L³ / ν²` for buoyancy-to-viscous scaling and `Pe = U L / D` for advection-to-diffusion scaling. The oxygen relation `pO₂ = xO₂ Ptotal` shows why oxygen fraction alone does not characterize an atmosphere. Lower total pressure and a higher oxygen fraction may preserve oxygen partial pressure while increasing fire hazard; this is a safety trade-off, not an atmosphere prescription. Pre-EVA decompression-sickness mitigation is not a justification for unrestricted oxygen enrichment.

Observed NASA table values, calculated summaries, physical interpretation and hypotheses are identified separately. Small or unmatched samples do not support universal fire-risk rankings, causal claims, certification, or operational spacecraft recommendations. This is a research and education dashboard, not flight software.

## Architecture

```text
Browser SPA (public/)
  ├─ /api/challenge/catalog ── selected source manifest + PSI tables
  ├─ /api/challenge/table ──── allowlisted, investigation-specific rows
  ├─ /api/research/* ───────── bounded analysis of supported evidence
  └─ /api/copilot ──────────── local Ollama over Tailscale, deterministic fallback
```

`server.mjs` wires the HTTP application; `src/server/` contains configuration, request/security helpers and routes; `ms02-connectors/challenge-data/` holds the immutable source package and catalog; `ms05-analysis/` holds deterministic calculations; `public/` contains the accessible interface and visual explanations. See `docs/` for research decisions and data interpretation. For Coolify redeployment, public routing, recovery, and asset checks, use the [backup deployment runbook](docs/COOLIFY_BACKUP_DEPLOYMENT.md).

## Current verification status

Existing project verification is documented in [current verification and limitations](docs/FINAL_VERIFICATION.md). The System Concepts page is a new addition; its conceptual diagrams are not engineering validation or experimental evidence.
