import riceCsv from "./rice.csv?raw";
import maizeCsv from "./maize.csv?raw";
import sunflowerCsv from "./sunflower.csv?raw";
import { parseCsv, type CsvRow } from "../parseCsv";
import type { Crop, CropVariety, DataSource } from "../../../types";

interface PrimaryCropFile {
  filename: string;
  csv: string;
}

const primaryCropFiles: PrimaryCropFile[] = [
  { filename: "rice.csv", csv: riceCsv },
  { filename: "maize.csv", csv: maizeCsv },
  { filename: "sunflower.csv", csv: sunflowerCsv },
];

function optionalText(value: string | undefined): string | undefined {
  const normalized = value?.trim();

  if (!normalized || normalized.toUpperCase() === "N/A" || normalized.toUpperCase() === "NA") {
    return undefined;
  }

  return normalized;
}

function optionalNumber(value: string | undefined): number | undefined {
  const normalized = optionalText(value);

  if (!normalized) {
    return undefined;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function exactGrowingDays(value: string | undefined): number | undefined {
  const normalized = optionalText(value);
  return normalized && /^\d+$/.test(normalized) ? Number(normalized) : undefined;
}

function requiredText(row: CsvRow, key: string): string {
  const value = optionalText(row[key]);

  if (!value) {
    throw new Error(`Missing required crop CSV value: ${key}`);
  }

  return value;
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function sourceForRow(
  row: CsvRow,
  filename: string,
  recordId: string,
): DataSource {
  const sourceTitle = requiredText(row, "source");

  return {
    id: `${recordId}-${slug(sourceTitle)}`,
    title: sourceTitle,
    sourceType: "curated_research_csv",
    sourceUrl: optionalText(row.source_url),
    datasetOrProduct: filename,
    region: optionalText(row.region),
    processingNote: "Team-curated / normalized CSV",
  };
}

function normalizeCrop(row: CsvRow, filename: string): Crop {
  const name = requiredText(row, "crop_name");
  const id = slug(name);

  return {
    id,
    name,
    scientificName: optionalText(row.scientific_name),
    season: optionalText(row.season),
    plantingWindow: optionalText(row.planting_window),
    harvestWindow: optionalText(row.harvest_window),
    growingDays: exactGrowingDays(row.growing_days),
    growingDaysText: optionalText(row.growing_days),
    waterRequirement: optionalText(row.water_requirement),
    heatTolerance: optionalText(row.heat_tolerance),
    salinityTolerance: optionalText(row.salinity_tolerance),
    waterloggingTolerance: optionalText(row.waterlogging_tolerance),
    soilType: optionalText(row.soil_type),
    soilPhRange: optionalText(row.soil_ph_range),
    yield: optionalNumber(row.yield),
    yieldUnit: optionalText(row.yield_unit),
    region: optionalText(row.region),
    notes: optionalText(row.notes),
    source: sourceForRow(row, filename, id),
    dataStatus: "research",
  };
}

function normalizeVariety(
  row: CsvRow,
  filename: string,
  rowIndex: number,
): CropVariety {
  const cropId = slug(requiredText(row, "crop_name"));
  const name = requiredText(row, "variety");
  const id = `${cropId}-${slug(name)}-${rowIndex + 1}`;

  return {
    id,
    cropId,
    name,
    season: optionalText(row.season),
    growingDays: exactGrowingDays(row.growing_days),
    growingDaysText: optionalText(row.growing_days),
    plantingWindow: optionalText(row.planting_window),
    harvestWindow: optionalText(row.harvest_window),
    waterRequirement: optionalText(row.water_requirement),
    heatTolerance: optionalText(row.heat_tolerance),
    salinityTolerance: optionalText(row.salinity_tolerance),
    waterloggingTolerance: optionalText(row.waterlogging_tolerance),
    soilType: optionalText(row.soil_type),
    soilPhRange: optionalText(row.soil_ph_range),
    yield: optionalNumber(row.yield),
    yieldUnit: optionalText(row.yield_unit),
    region: optionalText(row.region),
    notes: optionalText(row.notes),
    source: sourceForRow(row, filename, id),
    dataStatus: "research",
  };
}

const normalizedFiles = primaryCropFiles.map(({ filename, csv }) => {
  const rows = parseCsv(csv);
  const cropRow = rows.find(
    (row) => row.variety.trim().toLowerCase() === "species baseline",
  );

  if (!cropRow) {
    throw new Error(`Missing species baseline row in ${filename}`);
  }

  return {
    crop: normalizeCrop(cropRow, filename),
    varieties: rows
      .filter((row) => row !== cropRow)
      .map((row, index) => normalizeVariety(row, filename, index)),
  };
});

export const researchCrops: Crop[] = normalizedFiles.map(({ crop }) => crop);

export const researchCropVarieties: CropVariety[] = normalizedFiles.flatMap(
  ({ varieties }) => varieties,
);
