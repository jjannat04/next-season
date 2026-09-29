import type { Farm } from "../../types";

export const demoFarm: Farm = {
  id: "demo-farm-001",
  name: "Demo Coastal Farm",
  region: "Polder 30",
  description:
    "A demonstration farm used to explore climate-aware agricultural decisions.",
  location: {
    latitude: 22.6,
    longitude: 89.5,
    district: "Khulna",
    upazila: "Demo Upazila",
  },
  dataStatus: "demo",
};