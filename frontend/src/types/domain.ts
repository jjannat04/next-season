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
  rainfall?: number;
  temperature?: number;
  minTemperature?: number;
  maxTemperature?: number;
  pressure?: number;
  dataStatus: DataStatus;
}

export interface VegetationObservation {
  date: string;
  ndvi?: number;
  evi?: number;
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

  waterRequirement?: string;
  heatTolerance?: string;
  salinityTolerance?: string;
  waterloggingTolerance?: string;

  soilType?: string;
  soilPhRange?: string;

  yield?: number;
  yieldUnit?: string;

  image?: FarmImage;

  dataStatus: DataStatus;
}

export interface CropVariety {
  id: string;
  cropId: string;
  name: string;
  growingDays?: number;
  plantingWindow?: string;
  harvestWindow?: string;
  notes?: string;
  dataStatus: DataStatus;
}

export interface RotationEvidence {
  id: string;
  previousCropId: string;
  nextCropId: string;

  seasonCompatibility?: string;
  waterImplications?: string;
  soilNutrientImplications?: string;
  pestDiseaseBreak?: string;
  salinityImplications?: string;
  waterloggingImplications?: string;

  overallRotationBenefit?: string;
  evidenceSummary?: string;

  source?: DataSource;
  dataStatus: DataStatus;
}

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
  datasetOrProduct?: string;
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