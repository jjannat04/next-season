import type { Scenario } from "../../types";

export const demoScenarios: Scenario[] = [
  {
    id: "baseline",
    name: "Baseline",
    description: "Current demonstration conditions.",
    changes: [],
    dataStatus: "demo",
  },

  {
    id: "lower-rainfall",
    name: "Lower rainfall",
    description: "Explore a demonstration scenario with lower rainfall.",
    changes: [
      {
        variable: "rainfall",
        changePercent: -15,
      },
    ],
    dataStatus: "demo",
  },

  {
    id: "higher-temperature",
    name: "Higher temperature",
    description: "Explore a demonstration scenario with higher temperature.",
    changes: [
      {
        variable: "temperature",
        changePercent: 10,
      },
    ],
    dataStatus: "demo",
  },
];