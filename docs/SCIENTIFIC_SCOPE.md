# Scientific scope and calculation rules

## What the application measures

NASA PSI Combustion Science is the sole experiment-data source. The local package contains 16 original experimental tables from 16 PSI investigations, plus eight selected files attached to PSI-98 / PSI-100; a full metadata inventory describes 36,490 files across the 16 returned manifests. The source archives are not a pooled dataset. Table schema, apparatus, fuel/material, units and outcome definitions differ by investigation.

The app provides descriptive analysis only for PSI-69/FLEX because that table has per-test liquid-droplet outcomes with interpretable test labels. Other investigations are exposed with study-specific summaries and explicit data limitations. No model converts the full PSI corpus into one fire-danger score.

## Source-checked findings and boundaries

- **PSI-20 / ACME BRE:** 18 day-summary rows contain burner/fuel settings, oxygen concentration labels and flames-ignited counts. The concentration strings include 21%, 25%, 26.5%, 34% and 40%; `2100%` and `3400%` are preserved as source anomalies. Pressure is not resolved for each row. These are not per-flame trials or a controlled oxygen response curve.
- **PSI-25 / BASS-II:** calibrated initial oxygen fields span 13.6–22.2% by volume. Material, fan/air fields, ignition and other conditions vary; the table cannot isolate an oxygen-only causal effect or establish universal flammability limits.
- **PSI-69 / FLEX:** 274 liquid-droplet records include fuel, ambient composition/pressure and droplet measurements/outcomes. Detailed descriptive calculations are stratified by reported conditions. Pooled statistics are descriptive only and cannot be treated as a spacecraft-wide fire rate.
- **PSI-98 / SAFFIRE-I:** two actual sample records are distinct from pre-flow image references. Their opposite flow-direction burn times are too few to estimate a reliable direction effect.
- **PSI-99 / SAFFIRE-II:** source rows mix numbered sample entries, flow references and notes; the ambiguous `?-g` source header is retained verbatim.
- **PSI-100 / SAFFIRE-III:** its two experimental rows give sample conditions, flow direction and camera IDs, not flame-spread measurements. Raw telemetry is not converted into physical channels without an authoritative calibration map.
- **PSI-101 / SAME-R and PSI-102 / SAME:** smoke/aerosol and sample weight-loss evidence informs detection/material behavior; it is not interchangeable with flame-spread rate. PSI-102 has four numeric Teflon weight-loss values (2, 1, 2, 2 mg/min; mean 1.75 mg/min), but settings differ and the mean is not an airflow effect.
- **PSI-107 / SPICE:** the 469-row source is Smoke Point In Co-flow Experiment; its ethylene test log includes nozzle, fuel-rate, airflow and timing fields. It does not establish a universal metric comparable with FLEX droplet burning.

The exact 16-table row classifications and all field inventories are documented in [CHALLENGE_DATA_REVIEW.md](CHALLENGE_DATA_REVIEW.md) and regenerated into `ms02-connectors/challenge-data/quality_report.json`.

## Physics implemented

- **Buoyancy / natural convection:** `Gr = g β ΔT L³ / ν²`. At very low effective gravity, buoyant forcing decreases. This does not eliminate forced ventilation, fuel flow, molecular diffusion or all motion.
- **Advection versus diffusion:** `Pe = U L / D`, where `U` is an imposed flow speed, `L` a length scale, and `D` a species diffusivity. `U` can be nonzero in a spacecraft because fans continue to move cabin gas.
- **Oxygen in a dry gas mixture:** `pO₂ = xO₂ Ptotal`. Inspired and alveolar oxygen also depend on water vapor and CO₂ exchange; dry partial pressure alone is not a complete human physiology model or combustion-equivalence criterion.
- **FLEX droplet burning:** `D²(t) = D₀² − Kt` under the relevant quasi-steady droplet assumptions. `K` is condition-dependent and has units of area/time; it is not solid-fuel flame-spread velocity.
- **Gravity ratio:** `g* = g_eff / g₀` is a dimensionless framing quantity. “Microgravity” does not mean mathematically exact zero acceleration; report the actual platform/uncertainty when available.
- The risk-factor expression shown in the interface is conceptual, not a calibrated probability model.

Earth and microgravity flame drawings in the app are explicitly labelled schematics. Earth buoyancy tends to create a rising plume and entrain cooler reactants; low-momentum flames in microgravity can become rounded because buoyant convection is greatly reduced. Forced ventilation still changes flame shape and transport. No PSI-98 image is mislabeled as a representative flame photograph.

## Atmosphere cases are context, not experiment outcomes

The Mission Atmospheres page calculates `pO₂` from four NASA historical/reference/design cases: Earth/ISS 14.7 psia × 21% = 3.09 psia; Shuttle campout 10.2 psia × 26.5% = 2.70 psia; exploration-atmosphere concept 8.2 psia × 34% = 2.79 psia; and US EVA suit reference 4.3 psia × 100% = 4.30 psia. These calculations are clearly labelled as derived from NASA sources, not measured PSI results or prescribed future cabin settings.

EVA preparation is a pressure-transition / decompression-sickness trade involving denitrogenation, pressure, protocols and timing. Oxygen-enriched, lower-pressure atmosphere studies can reduce prebreathe burden, while oxygen-rich atmospheres create additional fire-safety constraints. Similar dry `pO₂` does not mean identical flammability. PSI-20's summary does not resolve pressure by day, so its oxygen labels cannot be matched into a complete pressure–oxygen response matrix.

## Scientific-safety labels shown in Mission Safety

The public page distinguishes four claim types: reported NASA PSI measurements linked to their study and conditions; derived values with named formula, inputs, and units; physical interpretations that remain separate from measurements; and missing mission evidence shown as an open research gap. Mission-relevance ordering is explicitly an inventory-navigation heuristic, never a probability or fire-hazard ranking. NASA incident histories and technology-transfer examples provide context only and are not merged into the PSI experimental data.
## Decisions the evidence can support

The app can help prioritize which investigations to inspect, show their conditions/outcomes, reveal missing fields, and turn the evidence into testable design questions: qualify materials across relevant oxygen/pressure/flow environments; control ignition sources; position smoke/CO detection around ventilation; and test suppression against each fuel/material and geometry. It cannot prescribe a spacecraft atmosphere, certify materials, infer a universal safest suppressant, or predict crew fire risk.

The challenge's current PSI set has no direct partial-gravity combustion dataset. E-FIELD experiments can study ion-driven transport mechanisms but do not simulate lunar gravity; rocket/propellant combustion is outside the low-velocity habitat-fire scope. See the challenge-provided NASA resources and [sources page code](../public/app.js).
