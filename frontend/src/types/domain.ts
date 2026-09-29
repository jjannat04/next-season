export type DataStatus = "demo" | "research" | "live";

export interface Farm {
  id: string;
  name: string;
  region: string;
  description?: string;
  location: FarmLocation;
  image?: FarmImage;
  dataStatus: DataStatus;
}

export interface FarmLocation {
  latitude: number;
  longitude: number;
  district?: string;
  upazila?: string;
}

export interface ClimateObservation {
  date: string;
  periodLabel?: string;
  rainfall?: number;
  temperature?: number;
  minTemperature?: number;
  maxTemperature?: number;
  pressure?: number;
  source?: DataSource;
  dataStatus: DataStatus;
}

export type ClimateTemporalResolution = "monthly" | "yearly";

export interface ClimateDataset {
  id: string;
  title: string;
  temporalResolution: ClimateTemporalResolution;
  observations: ClimateObservation[];
  units: {
    temperature: "°C";
    rainfall: "mm/day" | "mm";
    pressure?: "kPa";
  };
  fieldMeanings: {
    temperature: string;
    rainfall: string;
    minTemperature?: string;
    maxTemperature?: string;
    pressure?: string;
  };
  source: DataSource;
  dataStatus: DataStatus;
}

export interface VegetationObservation {
  date: string;
  ndvi?: number;
  evi?: number;
  source?: DataSource;
  dataStatus: DataStatus;
}

export interface SoilProfile {
  region: string;
  soilType?: string;
  soilTexture?: string;
  ph?: number;
  organicMatter?: number;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  salinity?: number;
  drainage?: string;
  waterloggingRisk?: string;
  source?: DataSource;
  dataStatus: DataStatus;
}

export interface Crop {
  id: string;
  name: string;
  scientificName?: string;
  variety?: string;
  season?: string;
  plantingWindow?: string;
  harvestWindow?: string;
  growingDays?: number;
  growingDaysText?: string;

  waterRequirement?: string;
  heatTolerance?: string;
  salinityTolerance?: string;
  waterloggingTolerance?: string;

  soilType?: string;
  soilPhRange?: string;

  yield?: number;
  yieldUnit?: string;
  region?: string;
  notes?: string;

  image?: FarmImage;

  source?: DataSource;
  dataStatus: DataStatus;
}

export interface CropVariety {
  id: string;
  cropId: string;
  name: string;
  season?: string;
  growingDays?: number;
  growingDaysText?: string;
  plantingWindow?: string;
  harvestWindow?: string;
  waterRequirement?: string;
  heatTolerance?: string;
  salinityTolerance?: string;
  waterloggingTolerance?: string;
  soilType?: string;
  soilPhRange?: string;
  yield?: number;
  yieldUnit?: string;
  region?: string;
  notes?: string;
  source?: DataSource;
  dataStatus: DataStatus;
}

export interface RotationEvidence {
  id: string;
  previousCropId: string;
  nextCropId: string;
  previousCropName?: string;
  nextCropName?: string;
  transitionType?: string;

  seasonCompatibility?: string;
  waterImplications?: string;
  soilNutrientImplications?: string;
  pestDiseaseBreak?: string;
  salinityImplications?: string;
  waterloggingImplications?: string;
  systemYieldEvidence?: string;

  overallRotationBenefit?: string;
  evidenceSummary?: string;

  evidenceLevel?: string;
  evidenceScope?: RotationEvidenceScope;
  region?: string;
  notes?: string;
  source?: DataSource;
  dataStatus: DataStatus;
}

export type RotationEvidenceScope =
  | "polder30_direct"
  | "coastal_bangladesh_regional"
  | "general_agronomy_inferred"
  | (string & {});

export interface RotationStep {
  id: string;
  cropId: string;
  season: string;
  position: number;
}

export interface Rotation {
  id: string;
  name: string;
  steps: RotationStep[];

  compatibility?: RotationFit;
  tradeoffs: string[];
  explanation: string[];

  dataStatus: DataStatus;
}

export type RotationFit =
  | "strong"
  | "moderate"
  | "consideration";

export interface Scenario {
  id: string;
  name: string;
  description?: string;

  changes: ScenarioChange[];

  dataStatus: DataStatus;
}

export interface ScenarioChange {
  variable:
    | "rainfall"
    | "temperature"
    | "waterAvailability"
    | "soilCondition";

  changePercent?: number;
  changeAbsolute?: number;
}

export interface Insight {
  id: string;
  title: string;
  description: string;

  type:
    | "climate"
    | "soil"
    | "vegetation"
    | "rotation"
    | "scenario";

  severity?: "info" | "attention" | "warning";

  source?: DataSource;

  dataStatus: DataStatus;
}

export interface DataSource {
  id: string;
  title: string;
  organization?: string;
  authors?: string;
  publicationYear?: number;
  sourceType?: string;
  url?: string;
  // Keeps CSV/source-registry provenance explicit while preserving the existing url field.
  sourceUrl?: string;
  sourceUrls?: string[];
  datasetOrProduct?: string;
  accessDate?: string;
  region?: string;
  coordinates?: string;
  dataPeriod?: string;
  processingNote?: string;
}

export interface FarmImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  location?: string;
  crop?: string;
  credit?: string;
}
