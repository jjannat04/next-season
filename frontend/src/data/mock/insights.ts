import type { Insight } from "../../types";

export const demoInsights: Insight[] = [
  {
    id: "climate-demo-001",
    title: "Climate conditions",
    description:
      "This is a demonstration insight. Research-backed climate analysis will replace it.",
    type: "climate",
    severity: "info",
    dataStatus: "demo",
  },

  {
    id: "soil-demo-001",
    title: "Soil context",
    description:
      "This is a demonstration insight based on placeholder soil data.",
    type: "soil",
    severity: "info",
    dataStatus: "demo",
  },

  {
    id: "rotation-demo-001",
    title: "Rotation exploration",
    description:
      "Explore different crop sequences to understand their potential trade-offs.",
    type: "rotation",
    severity: "info",
    dataStatus: "demo",
  },
];