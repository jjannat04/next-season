import {
  monthlyClimateDataset,
  yearlyClimateDataset,
} from "../../data/research/climate/climateData";
import type { ClimateDataset, ClimateObservation } from "../../types";

export function getClimateData(): ClimateObservation[] {
  return getMonthlyClimateDataset().observations;
}

export function getMonthlyClimateDataset(): ClimateDataset {
  return monthlyClimateDataset;
}

export function getYearlyClimateDataset(): ClimateDataset {
  return yearlyClimateDataset;
}
