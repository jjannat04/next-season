import { demoCrops } from "../../data/mock";
import type { Crop } from "../../types";

export function getCrops(): Crop[] {
  return demoCrops;
}

export function getCrop(id: string): Crop | undefined {
  return demoCrops.find((crop) => crop.id === id);
}