import rotationEvidenceCsv from "./rotation-evidence-prescreened.csv?raw";
import { parseCsv, type CsvRow } from "../parseCsv";
import type { DataSource, RotationEvidence } from "../../../types";

const expectedTransitions = new Set([
  "Rice (T. Aman)|Maize",
  "Rice (T. Aman)|Sunflower",
  "Rice (T. Aman)|Mungbean",
]);

function optionalText(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized || undefined;
}

function requiredText(row: CsvRow, key: string): string {
  const value = optionalText(row[key]);

  if (!value) {
    throw new Error(`Missing required rotation evidence value: ${key}`);
  }

  return value;
}

function cropId(name: string): string {
  if (name === "Rice (T. Aman)") {
    return "rice";
  }

  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function sourceForRow(row: CsvRow, id: string): DataSource {
  const sourceUrls = requiredText(row, "source_url")
    .split("|")
    .map((url) => url.trim())
    .filter(Boolean);

  return {
    id: `${id}-sources`,
    title: requiredText(row, "source"),
    sourceType: "curated_research_csv",
    sourceUrl: sourceUrls[0],
    sourceUrls,
    datasetOrProduct: "rotation-evidence.csv",
    region: optionalText(row.region),
    processingNote: "Prescreened / normalized CSV subset",
  };
}

function normalizeRotationEvidence(row: CsvRow): RotationEvidence {
  const previousCropName = requiredText(row, "previous_crop");
  const nextCropName = requiredText(row, "next_crop");
  const transitionKey = `${previousCropName}|${nextCropName}`;

  if (!expectedTransitions.has(transitionKey)) {
    throw new Error(`Unexpected prescreened rotation transition: ${transitionKey}`);
  }

  const previousCropId = cropId(previousCropName);
  const nextCropId = cropId(nextCropName);
  const id = `${previousCropId}-${nextCropId}-research`;

  return {
    id,
    previousCropId,
    nextCropId,
    previousCropName,
    nextCropName,
    transitionType: optionalText(row.transition_type),
    seasonCompatibility: optionalText(row.season_compatibility),
    waterImplications: optionalText(row.water_implications),
    soilNutrientImplications: optionalText(row.soil_nutrient_implications),
    pestDiseaseBreak: optionalText(row.pest_disease_break),
    salinityImplications: optionalText(row.salinity_implications),
    waterloggingImplications: optionalText(row.waterlogging_implications),
    systemYieldEvidence: optionalText(row.system_yield_evidence),
    evidenceLevel: requiredText(row, "evidence_level"),
    region: optionalText(row.region),
    notes: optionalText(row.notes),
    source: sourceForRow(row, id),
    dataStatus: "research",
  };
}

const rows = parseCsv(rotationEvidenceCsv);

if (rows.length !== expectedTransitions.size) {
  throw new Error("The prescreened rotation evidence must contain exactly three rows");
}

export const researchRotationEvidence: RotationEvidence[] = rows.map(
  normalizeRotationEvidence,
);
