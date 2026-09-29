import { demoRotationEvidence } from "../../data/mock";
import type { RotationEvidence } from "../../types";

export function getRotationEvidence(): RotationEvidence[] {
  return demoRotationEvidence;
}

export function getPossibleRotations(
  previousCropId?: string,
): RotationEvidence[] {
  if (!previousCropId) {
    return demoRotationEvidence;
  }

  return demoRotationEvidence.filter(
    (evidence) => evidence.previousCropId === previousCropId,
  );
}