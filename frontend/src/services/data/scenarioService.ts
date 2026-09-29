import { demoScenarios } from "../../data/mock";
import type { Scenario } from "../../types";

export function getScenarios(): Scenario[] {
  return demoScenarios;
}

export function getScenario(id: string): Scenario | undefined {
  return demoScenarios.find((scenario) => scenario.id === id);
}