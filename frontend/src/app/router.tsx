import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "../components/navigation/AppShell";
import { LandingPage } from "../features/landing/LandingPage";
import { FarmExplorerPage } from "../features/farm-explorer/FarmExplorerPage";
import { FarmIntelligencePage } from "../features/farm-intelligence/FarmIntelligencePage";
import { RotationStudioPage } from "../features/rotation-studio/RotationStudioPage";
import { ScenarioLabPage } from "../features/scenario-lab/ScenarioLabPage";
import { ComparisonPage } from "../features/comparison/ComparisonPage";



export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/explore", element: <FarmExplorerPage /> },
      { path: "/intelligence", element: <FarmIntelligencePage /> },
      { path: "/rotation", element: <RotationStudioPage /> },
      { path: "/scenarios", element: <ScenarioLabPage /> },
      { path: "/compare", element: <ComparisonPage /> },
    ],
  },
]);