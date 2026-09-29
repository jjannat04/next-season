import { researchRotationEvidence } from "../../data/research/rotation/rotationEvidenceData";
import type { RotationEvidence } from "../../types";

export function getRotationEvidence(): RotationEvidence[] {
  return researchRotationEvidence;
}

export function getPossibleRotations(
  previousCropId?: string,
): RotationEvidence[] {
  if (!previousCropId) {
    return researchRotationEvidence;
  }

  return researchRotationEvidence.filter(
    (evidence) => evidence.previousCropId === previousCropId,
  );
}
