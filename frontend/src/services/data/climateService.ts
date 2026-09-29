import { demoClimateData } from "../../data/mock";
import type { ClimateObservation } from "../../types";

export function getClimateData(): ClimateObservation[] {
  return demoClimateData;
}