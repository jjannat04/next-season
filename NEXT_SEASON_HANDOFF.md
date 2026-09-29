# NEXT SEASON — PROJECT HANDOFF

## 1. Project Identity

**Project:** Next Season  
**Original Challenge:** NASA Space Apps Challenge 2026 — “Field Shift: Adapting Farms with NASA Data”  
**Tagline:** “Plan what comes next.”

Next Season is a climate-aware agricultural decision-support platform for a selected region of Bangladesh. It helps users understand current field conditions, explore crop rotations, compare possible scenarios, and make informed decisions.

This is **not** intended to be just another dashboard or an opaque AI recommendation system.

Core user flow:

Landing → Explore a Farm → Farm Intelligence → Rotation Studio → Scenario Lab → Compare Rotations → Decision/Summary

Planned routes:

- `/`
- `/explore`
- `/intelligence`
- `/rotation`
- `/scenarios`
- `/compare`

---

## 2. Current Status

The frontend is implemented through **Step 21**.

### Completed

1. React + Vite foundation
2. Dependencies + Tailwind + typography
3. Project architecture + domain types
4. Mock/demo data + data service
5. Application shell + routing
6. Design system + navigation
7. Landing page
8. Farm Explorer + MapLibre
9. Farm Intelligence
10. Rotation Studio UI
11. Scenario Lab
12. Compare + Decision Summary
13. Landing photography
14. Rotation evidence panel
15. Scenario Lab refinement
16. Comparison page
17. Decision summary
18. Landing Journey section + Footer
19. Landing hero photography
20. Farm Explorer photography
21. Responsive Navbar/mobile menu

### IMPORTANT

**Do not restart the project.**

The next intended task is:

## Step 22 — Proper React Navigation

Convert internal `<a href="/...">` links to React Router `<Link to="...">`.

Likely files:

- `src/features/landing/JourneySection.tsx`
- `src/features/farm-explorer/FarmExplorerPage.tsx`
- `src/features/comparison/ComparisonPage.tsx`
- `src/features/landing/LandingPage.tsx`

Then run:

```bash
npm run build
```

Test:

`/ → /explore → /intelligence → /rotation → /scenarios → /compare`

Do not claim Step 22 is complete until it is actually verified.

---

## 3. Remaining Roadmap

### Step 22 — Proper React navigation

Replace internal anchors with React Router links.

### Step 23 — Responsive polish

Check mobile/tablet layouts, map sizing, chart overflow, navigation, typography, spacing, buttons, image cropping, scenario controls, and comparison layout.

### Step 24 — CSV ingestion and normalization

Architecture:

```text
Research CSVs
      ↓
CSV parser / normalizer
      ↓
Normalized domain types
      ↓
services/data/
      ↓
React UI
```

Do **not** parse CSVs directly inside React page components.

### Step 25 — Connect real research datasets

Recommended order:

1. Crop data
2. Rotation evidence
3. Regional soil data
4. NASA POWER climate data
5. NDVI/EVI
6. Other NASA datasets if needed

### Step 26 — Real rotation reasoning

Use research-backed evidence. Prefer explainable categories:

- Strong fit
- Moderate fit
- Needs consideration

Do not invent precise scientific scores.

### Step 27 — Final QA / demo / deployment

Verify routes, responsive behavior, data loading, missing-data handling, source attribution, demo/live labels, accessibility, performance, deployment, and final presentation flow.

---

## 4. Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Framer Motion
- Lucide React
- Zustand
- Recharts
- D3.js only where custom visualization is needed
- MapLibre GL
- react-map-gl

### Backend

- Django
- Django REST Framework

### Data/science

- Python
- Pandas
- GeoPandas
- NumPy
- Later: PostgreSQL/PostGIS
- Later: scikit-learn/PyTorch if ML is introduced

---

## 5. Environment

Developed on Windows + Git Bash.

Current versions:

- Node v24.21.0
- npm 11.19.0
- Vite 8.3.1

Project:

```text
/B/CODES/SELF/next-season
```

Frontend:

```text
/B/CODES/SELF/next-season/frontend
```

Run:

```bash
cd /B/CODES/SELF/next-season/frontend
npm install
npm run dev
```

Build:

```bash
npm run build
```

---

## 6. Frontend Structure

```text
frontend/
├── public/
│   └── images/
│       └── farm-hero.jpg
│
├── src/
│   ├── app/
│   │   ├── providers.tsx
│   │   └── router.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── navigation/
│   │   ├── map/
│   │   ├── charts/
│   │   └── photography/
│   ├── features/
│   │   ├── landing/
│   │   ├── farm-explorer/
│   │   ├── farm-intelligence/
│   │   ├── rotation-studio/
│   │   ├── scenario-lab/
│   │   └── comparison/
│   ├── data/
│   │   └── mock/
│   ├── services/
│   │   └── data/
│   ├── engine/
│   │   ├── rotation/
│   │   ├── scenarios/
│   │   └── insights/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   │   ├── domain.ts
│   │   └── index.ts
│   ├── styles/
│   │   └── tokens.css
│   ├── index.css
│   └── main.tsx
├── package.json
└── vite.config.ts
```

---

## 7. Domain Types

`src/types/domain.ts` contains:

- `DataStatus`
- `Farm`
- `FarmLocation`
- `ClimateObservation`
- `VegetationObservation`
- `SoilProfile`
- `Crop`
- `CropVariety`
- `RotationEvidence`
- `RotationStep`
- `Rotation`
- `RotationFit`
- `Scenario`
- `ScenarioChange`
- `Insight`
- `DataSource`
- `FarmImage`

`src/types/index.ts`:

```ts
export * from "./domain";
```

### ScenarioChange

```ts
export interface ScenarioChange {
  variable:
    | "rainfall"
    | "temperature"
    | "waterAvailability"
    | "soilCondition";
  changePercent?: number;
  changeAbsolute?: number;
}
```

Do not change this casually. Scenario Lab was already corrected to match it.

---

## 8. Mock Data

Current files:

```text
src/data/mock/
├── farm.ts
├── climate.ts
├── vegetation.ts
├── soil.ts
├── crops.ts
├── rotations.ts
├── scenarios.ts
├── insights.ts
└── index.ts
```

Mock data is explicitly marked:

```ts
dataStatus: "demo"
```

Do not present demo values as NASA measurements or scientific observations.

Current demo farm:

- Polder 30
- approximately 22.6 N, 89.5 E
- Khulna
- Demo Upazila

Treat these as demonstration values unless backed by actual research data.

---

## 9. Data Services

Current services:

```text
src/services/data/
├── farmService.ts
├── climateService.ts
├── soilService.ts
├── vegetationService.ts
├── cropService.ts
├── rotationService.ts
├── scenarioService.ts
├── insightService.ts
└── index.ts
```

Expected functions include:

```ts
getFarm()
getClimateData()
getVegetationData()
getSoilProfile()
getCrops()
getCrop()
getRotationEvidence()
getPossibleRotations()
getInsights()
calculateRotation()
calculateScenario()
```

Currently these primarily return mock data.

UI components should continue using services rather than importing CSVs directly.

---

## 10. Current UI / Design Direction

The visual direction is:

- real agriculture
- NASA / Earth observation
- climate science
- editorial storytelling
- interactive data visualization

Avoid:

- generic SaaS dashboard styling
- excessive cards
- excessive gradients
- glassmorphism
- fake AI language
- repetitive animations
- arbitrary numeric scores
- dense dashboard clutter

The interface should feel calm, credible, scientific, and human.

Typography:

- DM Sans for body/UI
- Instrument Serif for display/headlines

Design tokens are in:

```text
src/styles/tokens.css
```

---

## 11. Photography

Current real image:

```text
public/images/farm-hero.jpg
```

Component:

```text
src/components/photography/FarmHeroImage.tsx
```

Props:

```ts
interface FarmHeroImageProps {
  src: string;
  alt: string;
  eyebrow?: string;
  caption?: string;
}
```

Future image metadata:

```ts
{
  id,
  src,
  alt,
  caption,
  location,
  crop,
  credit
}
```

Photography should be used for hero areas, farm/location panels, crop storytelling, carousels, and scenario storytelling.

---

## 12. Map

Component:

```text
src/components/map/FarmMap.tsx
```

Uses:

- MapLibre GL
- react-map-gl

The map already renders successfully.

There is a MapLibre production chunk-size warning, but it is currently only a warning.

---

## 13. Farm Intelligence

Page:

```text
src/features/farm-intelligence/FarmIntelligencePage.tsx
```

Includes:

- climate summary
- vegetation summary
- soil conditions
- climate timeline
- vegetation timeline

Charts:

```text
src/components/charts/ClimateChart.tsx
src/components/charts/VegetationChart.tsx
```

---

## 14. Rotation Studio

Page:

```text
src/features/rotation-studio/RotationStudioPage.tsx
```

Current UI:

- current crop selector
- evidence-backed transitions
- expandable evidence panel
- overall rotation benefit
- evidence explanation

Current mock relationships:

- Rice → Maize
- Rice → Sunflower

Some mock evidence still contains:

```text
Placeholder rotation evidence. Replace with research-backed evidence.
```

Replace this with actual research evidence.

Do not create arbitrary scientific scores.

---

## 15. Scenario Lab

Page:

```text
src/features/scenario-lab/ScenarioLabPage.tsx
```

Current scenarios:

1. Baseline
2. Lower rainfall (-15%)
3. Higher temperature (+10%)

These are demo scenarios.

---

## 16. Comparison Page

Page:

```text
src/features/comparison/ComparisonPage.tsx
```

Current features:

- current crop selector
- option one selector
- option two selector
- side-by-side evidence
- decision summary
- explore another rotation link

Step 22 should also check this page for internal anchor navigation.

---

# 17. Research Data Architecture

Recommended:

```text
Research CSVs
       ↓
Raw data
       ↓
Normalizer
       ↓
Domain types
       ↓
Data service
       ↓
UI
```

Recommended data layout:

```text
data/
├── region/
│   └── region.csv
├── nasa/
│   ├── rainfall.csv
│   ├── temperature.csv
│   ├── ndvi.csv
│   └── soil_moisture.csv
├── soil/
│   └── soil_profiles.csv
├── crops/
│   └── crops.csv
└── rotations/
    └── rotation_evidence.csv
```

---

## 18. Research Package

```text
research/
├── crops/
│   ├── rice.csv
│   ├── maize.csv
│   ├── sunflower.csv
│   ├── crop_4.csv
│   ├── crop_5.csv
│   └── crop_6.csv
├── climate/
│   └── nasa_power_daily.csv
├── soil/
│   └── regional_soil.csv
├── rotation/
│   └── rotation_evidence.csv
├── vegetation/
│   └── ndvi.csv
└── sources/
    └── sources.csv
```

---

## 19. Crop CSV Schema

```text
crop_name,
scientific_name,
variety,
season,
planting_window,
harvest_window,
growing_days,
water_requirement,
heat_tolerance,
salinity_tolerance,
waterlogging_tolerance,
soil_type,
soil_ph_range,
yield,
yield_unit,
region,
source,
source_url,
notes
```

Use:

```text
NA
```

for genuinely missing values rather than inventing zeroes.

---

## 20. Rotation Evidence Schema

```text
previous_crop,
next_crop,
season_compatibility,
water_implications,
soil_nutrient_implications,
pest_disease_break,
salinity_implications,
waterlogging_implications,
overall_rotation_benefit,
evidence_summary,
region,
source,
source_url,
notes
```

The research team should provide **evidence and reasons**, not arbitrary numerical scores.

With six crops, do not force all 30 directional pairs. Include evidence-backed relationships.

---

## 21. Regional Soil Schema

```text
region,
location,
latitude,
longitude,
soil_type,
soil_texture,
soil_ph,
organic_matter,
nitrogen,
phosphorus,
potassium,
salinity_ec,
drainage,
waterlogging_risk,
soil_depth,
data_year,
source,
source_url,
notes
```

---

## 22. NDVI / EVI Schema

```text
date,
region,
latitude,
longitude,
ndvi,
evi,
spatial_resolution,
temporal_resolution,
product_name,
product_version,
quality_flag,
source,
source_url,
notes
```

---

## 23. Source Registry

Recommended:

```text
source_id,
title,
organization,
authors,
publication_year,
source_type,
url,
dataset_or_product,
access_date,
relevant_topic,
description
```

Other datasets should reference `source_id` where practical.

---

## 24. Known Research Files

### NASA POWER

```text
POWER_Point_Daily_20140101_20240130_022d60N_089d50E_UTC.csv
```

Contains daily data from 2014–2024 including fields such as:

- T2M
- T2M_MIN
- T2M_MAX
- PS
- PRECTOTCORR

Coordinates:

- 22.6 N
- 89.5 E

### Crop research

```text
Crop_Data_Table_Filled.xlsx
```

Current research includes:

- Rice
- Maize
- Sunflower

### Rice / Polder 30 research

```text
Rice_Polder30_Accurate_Research_Data (1).xlsx
```

Contains detailed Polder-30 rice evidence, including varieties such as:

- BRRI dhan52
- BRRI dhan51
- BRRI dhan54
- BRRI dhan49
- BRRI dhan47
- BRRI dhan61
- BINA dhan8
- BRRI dhan29

Includes evidence on:

- duration
- planting/harvest windows
- water requirements
- temperature/rainfall
- soil pH
- soil texture
- salinity
- water salinity
- Kc
- waterlogging tolerance
- drought tolerance
- salinity tolerance
- yield

Known sources include BRRI, FAO, Blue Gold, SAU, AGRIS/IRRI, BRRI annual reports, and coastal polder research.

Never claim a value unless it is actually present in the research file.

---

## 25. Research Completeness

### Strong / available

- NASA POWER climate
- Rice research
- Polder 30/local soil evidence
- Rice varieties

### Partial

- Crop characteristics: 3 of 6 crops
- Rotation evidence

### Missing / not yet completed

- NDVI/EVI
- Full six-crop dataset
- Complete rotation evidence
- Full regional soil dataset

### Optional later

- SMAP soil moisture
- ET
- ECOSTRESS
- SRTM elevation
- land-cover data

Prioritize the core research before optional datasets.

---

## 26. Candidate NASA Products

Potential future integrations:

- GPM IMERG Final V07 — precipitation
- MODIS MOD13Q1 V061 — NDVI/EVI
- MODIS MOD11A2 — land surface temperature
- SMAP — soil moisture
- ECOSTRESS — LST/ET/ESI
- SRTM — elevation
- MCD12Q1 — land cover

Never fabricate NASA data.

---

## 27. NASA / Demo Modes

Eventually support:

```text
NASA / live mode
                 → normalized schema → services → UI
        /
Demo / curated CSV mode
```

Both should use the same domain model.

Demo/mock data must remain clearly labeled.

---

## 28. Rotation Engine Philosophy

Inputs:

- crop characteristics
- previous crop
- next crop
- rotation evidence
- climate conditions
- soil conditions
- scenario conditions
- user priorities

Outputs:

- fit category
- evidence
- tradeoffs
- reasons
- considerations

Preferred categories:

```text
Strong fit
Moderate fit
Needs consideration
```

The system should explain *why* a transition appears suitable or requires consideration.

Do not present a scientifically precise score unless the research methodology supports it.

---

## 29. Future Backend Architecture

Long-term:

```text
React UI
   ↓
Frontend data service
   ↓
Django REST API
   ↓
Python data/science layer
   ↓
CSV / PostgreSQL / PostGIS / NASA APIs
```

Potential backend:

```text
backend/
├── config/
├── apps/
│   ├── farms/
│   ├── crops/
│   ├── climate/
│   ├── soil/
│   ├── rotations/
│   ├── scenarios/
│   └── insights/
└── manage.py
```

Do not build the entire backend before the frontend data model is stable.

---

## 30. Coding Rules

1. Inspect existing code before changing it.
2. Do not recreate completed pages.
3. Preserve the current design system.
4. Prefer relative imports for this project.
5. Keep domain types centralized.
6. Keep data access inside `src/services/data`.
7. Keep CSV parsing/normalization outside UI components.
8. Keep demo data clearly labeled.
9. Do not invent scientific values.
10. Do not invent NASA measurements.
11. Preserve source attribution.
12. Prefer evidence-backed explanations over arbitrary scores.
13. Run `npm run build` after meaningful changes.
14. Fix TypeScript errors rather than suppressing them.
15. Avoid giant monolithic components.
16. Reuse existing UI components.
17. Keep responsive behavior in mind.
18. Avoid unnecessary dependencies.
19. Do not restart from a blank Vite project.

---

## 31. Internal Navigation Rule

Use:

```tsx
import { Link } from "react-router-dom";
```

For internal routes:

```tsx
<Link to="/explore">Explore</Link>
```

Instead of:

```tsx
<a href="/explore">Explore</a>
```

External links may remain normal anchors.

---

## 32. Verification Checklist

After changes:

```bash
npm run build
```

Then verify:

- no full-page reload for internal navigation
- active navbar state
- mobile menu
- browser back/forward
- direct route loading
- images
- map
- charts
- scenario controls
- comparison controls
- no console errors
- no TypeScript/build errors

---

## 33. Git Workflow

Before moving accounts:

```bash
cd /B/CODES/SELF/next-season

git status

git add .

git commit -m "Next Season prototype through step 21"

git push
```

The repository is the source of truth for the code.

---

## 34. New ChatGPT / Codex Prompt

Use this in the new account:

> Read `NEXT_SEASON_HANDOFF.md` completely.
>
> This is an existing Next Season project. The frontend is already implemented through Step 21.
>
> Do NOT restart the project.
> Do NOT recreate completed pages.
> Do NOT replace the current architecture unless necessary.
>
> First inspect the repository and verify the current implementation against this handoff.
>
> Continue from Step 22:
> convert internal `<a href>` navigation to React Router `<Link>`, run the production build, and verify the route flow.
>
> After Step 22 is verified, proceed one checkpoint at a time.
>
> Keep the existing design language, domain model, data-service architecture, and research-data requirements.
>
> Scientific values must come from the provided research data. Do not invent values.

---

## 35. New ChatGPT Project

Recommended Project name:

```text
Next Season
```

Upload:

```text
NEXT_SEASON_HANDOFF.md
```

Then add research files as they become available.

Keep the Git repository as the primary code source.

---

## 36. Separation of Responsibilities

### ChatGPT / Codex

Use for:

- coding
- refactoring
- debugging
- architecture
- data normalization
- documentation
- research integration
- UI improvements

### Git

Use for:

- version history
- backup
- collaboration
- rollback

### Research team

Provides:

- scientifically supported data
- sources
- citations
- crop information
- rotation evidence
- regional information

### Application

Transforms:

```text
research evidence
→ normalized data
→ explainable analysis
→ interactive exploration
```

---

## 37. Final Product Principle

The product should not simply say:

> “Plant this crop.”

It should help the user see:

> What is happening in the field?

Then:

> What crop rotations are possible?

Then:

> What changes under different conditions?

Then:

> What are the tradeoffs?

Then:

> What should I consider before deciding?

The user remains the decision-maker.

---

# 38. Immediate Next Action

Start with:

## STEP 22 — Proper React Navigation

Inspect:

```text
src/features/landing/JourneySection.tsx
src/features/farm-explorer/FarmExplorerPage.tsx
src/features/comparison/ComparisonPage.tsx
src/features/landing/LandingPage.tsx
```

Convert internal anchors to React Router links.

Then:

```bash
npm run build
```

Do not move to CSV integration until navigation cleanup is verified.

---

# END OF HANDOFF
