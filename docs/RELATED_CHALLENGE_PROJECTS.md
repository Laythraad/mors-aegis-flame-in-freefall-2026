# Public project scan: Flame in Freefall

**Snapshot date:** 2026-11-15

**Scope:** public projects and prototypes that describe themselves as work for NASA Space Apps Challenge 2026, “Flame in Freefall.”

**Status caution:** NASA's official challenge brief defines the task, but I found no official public roster confirming that each site below was formally submitted, judged, or selected. This is a review of self-described public work, not a list of entrants, finalists, winners, or NASA-endorsed projects.

## What public projects show

| Public project | What its public artifact presents | Useful lesson for MORS AEGIS | Evidence boundary |
|---|---|---|---|
| [MicroFire Atlas](https://microfire-atlas.vercel.app/) · [repository](https://github.com/A-K-M-Asifuzzaman/MicroFire-Atlas) | A guided, nine-step answer to a lunar-habitat question; a curated atlas of 78 records from BASS-II, Saffire, and LUCI; a gravity-by-oxygen evidence-gap view; source-linked findings; a pixel-based NASA-video analysis; and an AI/model path that abstains when a requested condition is outside its evidence. Its site labels rankings as project heuristics, not NASA ratings. | Make a judge's path obvious, show which scenario dimensions match or differ, and make “no direct evidence” a useful answer. | Counts and validation descriptions are the project’s own. Its own documentation says the video analysis reports pixels because NASA footage has no calibration, and its 78 records are a curated subset, not the complete PSI archive. The gap grid is scenario-specific; MORS currently has an investigation-level coverage matrix, which is not the same thing. |
| [Fotia](https://github.com/AnteurAbderraouf/Fotia) · [live app](https://nasafotia.streamlit.app/) | A 24-investigation PSI catalogue; explicit sorting of tables into usable, partly usable, and no per-test outcome; a mission-atmosphere selector; separate classical models for selected datasets; a 3D flame view; and an AI assistant whose data access is described in the repository. The repository reports that only ten investigations yielded usable tables and states why some datasets should not be trained as classifiers. | Explain why a source can or cannot support a calculation before displaying a model. Publish AI-use disclosure, model scope, and validation details beside the feature. | Counts, code quality, and reported model results have not been independently reproduced in this scan. The repository itself distinguishes measured tests, simulations, and descriptive-only tables. |
| [FIREWISE-X](https://firewise-x.vercel.app/) | A BASS-II-focused dashboard that advertises 129 flight tests, a mission assessment, 3D/spacecraft visuals, an AI assistant, and computer-vision flame tracking. | A single real-data walkthrough can make the challenge connection legible quickly. Pair any striking number with its sensor, time, and volume context. | Its homepage describes 950 ppm as a peak. NASA's BASS-II report lists 950 ppm as a final sensor reading for a test; it says readings were taken before and after tests with a 0–1,000 ppm sensor. The report also records one over-range test. Thus “peak” or “ISS-wide concentration” is not supported by that table value. MORS now links the NASA report beside both PSI-25 CO plots and explains this distinction. |
| [FIRE-X](https://github.com/Hekimovraiz/FIRE-X) | A multi-page project README claiming 892 experiments across 29 suites, with SQL/RAG assistant, 3D/4D telemetry, and analytics. The README says its data spans both orbital and ground-bound experiments. | Broad search and retrieval can help users find research, but every count and model output needs a trace to source rows, units, platform, gravity regime, and inclusion rules. | The large counts and performance claims are self-reported and were not audited here. Ground and flight records must not be treated as one interchangeable microgravity sample. |
| [Flame in Freefall prototype](https://nasa-five-rose.vercel.app/) | A prototype dashboard that describes a small verified source set and explicitly marks unavailable or unverified data. | State the size of the curated subset and label unknown data rather than filling gaps with generated values. | The page is self-described as an unofficial prototype; formal entry status was not verified. |
| [FLARENEXUS](https://github.com/KhalidHasan03/Flame-in-Freefall) | A dashboard-shaped prototype with Flame Lab, Mission Lab, comparisons, and assistant routes. Its README explicitly says its records, metrics, risk scores, flame rendering, charts, and assistant answers are synthetic demonstration data. | Put a visible synthetic-data warning on mockups and keep them separate from NASA evidence. | It explicitly says its demonstration dataset is not a scientific result and does not represent a specific NASA experiment. It is not usable as a source of measurements. |

Search results also surfaced planning or team-formation posts rather than finished public research products: [Nasa_Hack_2026](https://github.com/Architbh007/Nasa_Hack_2026) labels itself “planning only,” while the [FlameSense AI discussion](https://github.com/nasa/spaceapps/discussions/1851) and [Firelytics AI discussion](https://github.com/nasa/spaceapps/discussions/1897) are recruitment threads. They should not be described as completed demonstrations.

## What MORS already has

MORS already bundles 16 separate NASA PSI experimental tables (1,329 source rows), has 36 interactive scientific plots, an investigation-level evidence-coverage matrix, a chart guide, source integrity checks, an overview demo path, and a labelled conceptual 3D models page. Those features overlap with several common patterns above. The MORS matrix reports the domains represented in each investigation; it does **not** claim the more specific mission-scenario coverage displayed by MicroFire Atlas.

The project keeps investigations separate because their materials, apparatus, fields, units, and outcomes are not harmonized. A future scenario-coverage view would be useful only if each cell retained its exact source record, named every mismatch, separated direct from analogous/mechanistic evidence, and abstained when the required condition was untested. A single cross-study “risk score” or copied prediction would reduce scientific quality.

## NASA source check: BASS-II carbon monoxide

The NASA PSI record identifies BASS-II as PSI-25, DOI [10.60555/4qc4-de67](https://doi.org/10.60555/4qc4-de67). NASA's [BASS-II Summary Report, NASA/TM-20210011385](https://ntrs.nasa.gov/citations/20210011385), states that:

- the CO sensor range was 0–1,000 ppm, with 1 ppm resolution;
- readings were taken before and after each test in the 250-L Microgravity Science Glovebox working volume;
- one test exceeded the CO sensor range (>1,000 ppm); and
- approximately 1.5 ppm in the 106-m³ U.S. Lab was an estimate after dilution of combustion products from a BASS-II-scale test, not a direct cabin sensor reading.

The 950 ppm value appearing in a BASS-II table is therefore a reported endpoint, not a time-resolved maximum or a universal spacecraft-cabin concentration. This context is now shown on MORS AEGIS's two PSI-25 CO charts, with a direct link to the NASA report. The underlying NASA table values remain unchanged.

## Sources

- [Official NASA Space Apps 2026 challenge brief](https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall/): asks teams to build an interactive SI-powered dashboard that summarizes, ranks, and interprets NASA microgravity combustion results.
- [NASA PSI-25 investigation page](https://psi.nasa.gov/physci/repo/data/investigations/PSI-25): official BASS-II metadata, objectives, conditions, DOI, and files.
- [NASA BASS-II Summary Report, NASA/TM-20210011385](https://ntrs.nasa.gov/citations/20210011385): CO sensor range, sampling context, test table, and chamber-to-lab dilution estimate.
