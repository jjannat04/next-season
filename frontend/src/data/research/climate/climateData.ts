import monthlyClimateCsv from "./monthly_climate_summary.csv?raw";
import yearlyClimateCsv from "./yearly_climate_summary.csv?raw";
import { parseCsv, type CsvRow } from "../parseCsv";
import type {
  ClimateDataset,
  ClimateObservation,
  DataSource,
} from "../../../types";

function optionalNumber(value: string | undefined): number | undefined {
  if (!value || value.toUpperCase() === "NA" || value.toUpperCase() === "N/A") {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function requiredValue(row: CsvRow, key: string): string {
  const value = row[key];

  if (!value) {
    throw new Error(`Missing required climate CSV value: ${key}`);
  }

  return value;
}

const yearlyRows = parseCsv(yearlyClimateCsv);
const years = yearlyRows.map((row) => Number(requiredValue(row, "YEAR")));
const dataPeriod = `${Math.min(...years)}–${Math.max(...years)}`;

function climateSource(id: string, title: string): DataSource {
  return {
    id,
    title,
    organization: "NASA",
    datasetOrProduct: "NASA POWER",
    sourceType: "curated_historical_csv",
    coordinates: "22.60 N, 89.50 E",
    dataPeriod,
    processingNote: "Team-curated / normalized CSV",
  };
}

const monthlySource = climateSource(
  "nasa-power-monthly-climate-summary",
  "monthly_climate_summary.csv",
);

const yearlySource = climateSource(
  "nasa-power-yearly-climate-summary",
  "yearly_climate_summary.csv",
);

function normalizeMonthlyRow(row: CsvRow): ClimateObservation {
  return {
    date: requiredValue(row, "MONTH").padStart(2, "0"),
    periodLabel: requiredValue(row, "Month_Name"),
    temperature: optionalNumber(row.Avg_Temp_C),
    minTemperature: optionalNumber(row.Min_Temp_C),
    maxTemperature: optionalNumber(row.Max_Temp_C),
    rainfall: optionalNumber(row.Avg_Precipitation_mm_day),
    pressure: optionalNumber(row.Surface_Pressure_kPa),
    source: monthlySource,
    dataStatus: "research",
  };
}

function normalizeYearlyRow(row: CsvRow): ClimateObservation {
  const year = requiredValue(row, "YEAR");

  return {
    date: year,
    periodLabel: year,
    temperature: optionalNumber(row.Avg_Temp_C),
    minTemperature: optionalNumber(row.Min_Temp_C),
    maxTemperature: optionalNumber(row.Max_Temp_C),
    rainfall: optionalNumber(row.Total_Precipitation_mm),
    source: yearlySource,
    dataStatus: "research",
  };
}

export const monthlyClimateDataset: ClimateDataset = {
  id: "monthly-climate-summary",
  title: "Monthly climate summary",
  temporalResolution: "monthly",
  observations: parseCsv(monthlyClimateCsv).map(normalizeMonthlyRow),
  units: {
    temperature: "°C",
    rainfall: "mm/day",
    pressure: "kPa",
  },
  fieldMeanings: {
    temperature: "Monthly mean temperature",
    rainfall: "Average daily precipitation within the month",
    minTemperature: "Monthly mean of daily minimum temperature",
    maxTemperature: "Monthly mean of daily maximum temperature",
    pressure: "Monthly mean surface pressure",
  },
  source: monthlySource,
  dataStatus: "research",
};

export const yearlyClimateDataset: ClimateDataset = {
  id: "yearly-climate-summary",
  title: "Yearly climate summary",
  temporalResolution: "yearly",
  observations: yearlyRows.map(normalizeYearlyRow),
  units: {
    temperature: "°C",
    rainfall: "mm",
  },
  fieldMeanings: {
    temperature: "Annual mean temperature",
    rainfall: "Annual total precipitation",
    minTemperature: "Lowest temperature recorded within the year",
    maxTemperature: "Highest temperature recorded within the year",
  },
  source: yearlySource,
  dataStatus: "research",
};
