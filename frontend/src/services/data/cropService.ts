import {
  researchCrops,
  researchCropVarieties,
} from "../../data/research/crops/cropData";
import type { Crop, CropVariety } from "../../types";

export function getCrops(): Crop[] {
  return researchCrops;
}

export function getCrop(id: string): Crop | undefined {
  return researchCrops.find((crop) => crop.id === id);
}

export function getCropVarieties(cropId: string): CropVariety[] {
  return researchCropVarieties.filter((variety) => variety.cropId === cropId);
}
