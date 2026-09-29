import { demoVegetationData } from "../../data/mock";
import type { VegetationObservation } from "../../types";

export function getVegetationData(): VegetationObservation[] {
  return demoVegetationData;
}