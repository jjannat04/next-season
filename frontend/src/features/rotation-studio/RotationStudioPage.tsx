import { useMemo, useState } from "react";
import { ArrowRight, Sprout } from "lucide-react";

import { Container } from "../../components/ui/Container";
import {
  getCrops,
  getPossibleRotations,
} from "../../services/data";

export function RotationStudioPage() {
  const crops = getCrops();

  const [previousCropId, setPreviousCropId] = useState(
    crops[0]?.id ?? "",
  );

  const possibleRotations = useMemo(
    () => getPossibleRotations(previousCropId),
    [previousCropId],
  );

  const previousCrop = crops.find(
    (crop) => crop.id === previousCropId,
  );

  return (
    <div>
      {/* Header */}
      <section className="border-b border-[var(--color-border)]">
        <Container>
          <div className="max-w-3xl py-16 lg:py-20">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-green-700)]">
              Rotation studio
            </p>

            <h1 className="mt-4 font-[var(--font-display)] text-5xl leading-tight sm:text-6xl">
              Explore what comes next.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-ink-muted)] sm:text-lg">
              Start with the crop currently on the field and explore
              possible transitions for the following season.
            </p>
          </div>
        </Container>
      </section>

      {/* Rotation workspace */}
      <section>
        <Container>
          <div className="py-12 lg:py-16">
            {/* Current crop */}
            <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-7 lg:p-9">
              <div className="flex items-center gap-3">
                <Sprout
                  size={21}
                  strokeWidth={1.5}
                  className="text-[var(--color-green-700)]"
                />

                <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                  Current crop
                </span>
              </div>

              <div className="mt-8 max-w-md">
                <label
                  htmlFor="previous-crop"
                  className="text-xs text-[var(--color-ink-subtle)]"
                >
                  What is currently growing?
                </label>

                <select
                  id="previous-crop"
                  value={previousCropId}
                  onChange={(event) =>
                    setPreviousCropId(event.target.value)
                  }
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-background)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-green-700)]"
                >
                  {crops.map((crop) => (
                    <option key={crop.id} value={crop.id}>
                      {crop.name}
                    </option>
                  ))}
                </select>
              </div>

              {previousCrop && (
                <div className="mt-8 flex items-center gap-3 text-sm text-[var(--color-ink-muted)]">
                  <span className="font-medium text-[var(--color-ink)]">
                    {previousCrop.name}
                  </span>

                  <ArrowRight size={16} />

                  <span>Explore next-season options</span>
                </div>
              )}
            </div>

            {/* Possible transitions */}
            <div className="mt-10">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                    Possible transitions
                  </p>

                  <h2 className="mt-3 font-[var(--font-display)] text-3xl">
                    What could follow?
                  </h2>
                </div>

                <span className="text-xs text-[var(--color-ink-subtle)]">
                  Evidence-based exploration
                </span>
              </div>

              <div className="mt-7 grid gap-px overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)]">
                {possibleRotations.length > 0 ? (
  possibleRotations.map((rotation) => {
    const nextCrop = crops.find(
      (crop) => crop.id === rotation.nextCropId,
    );

    if (!nextCrop) {
      return null;
    }

    return (
      <RotationEvidenceCard
        key={rotation.id}
        previousCropName={previousCrop?.name ?? "Current crop"}
        nextCropName={nextCrop.name}
        evidenceSummary={rotation.evidenceSummary}
        seasonCompatibility={rotation.seasonCompatibility}
        waterImplications={rotation.waterImplications}
        soilNutrientImplications={rotation.soilNutrientImplications}
        pestDiseaseBreak={rotation.pestDiseaseBreak}
        salinityImplications={rotation.salinityImplications}
        waterloggingImplications={rotation.waterloggingImplications}
        overallRotationBenefit={rotation.overallRotationBenefit}
      />
    );
  })
) : (
  <div className="bg-[var(--color-background)] p-8">
    <p className="text-sm text-[var(--color-ink-muted)]">
      No evidence-backed transition is currently
      available for this crop.
    </p>
  </div>
)}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
interface RotationEvidenceCardProps {
  previousCropName: string;
  nextCropName: string;
  evidenceSummary?: string;
  seasonCompatibility?: string;
  waterImplications?: string;
  soilNutrientImplications?: string;
  pestDiseaseBreak?: string;
  salinityImplications?: string;
  waterloggingImplications?: string;
  overallRotationBenefit?: string;
}

function RotationEvidenceCard({
  previousCropName,
  nextCropName,
  evidenceSummary,
  seasonCompatibility,
  waterImplications,
  soilNutrientImplications,
  pestDiseaseBreak,
  salinityImplications,
  waterloggingImplications,
  overallRotationBenefit,
}: RotationEvidenceCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="bg-[var(--color-background)] p-6 lg:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[var(--color-ink-muted)]">
              {previousCropName}
            </span>

            <ArrowRight
              size={16}
              className="text-[var(--color-ink-subtle)]"
            />

            <span className="font-[var(--font-display)] text-2xl">
              {nextCropName}
            </span>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
  {evidenceSummary || "No evidence summary available yet."}
</p>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="shrink-0 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-4 py-2.5 text-xs font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface-muted)]"
          aria-expanded={expanded}
        >
          {expanded ? "Hide evidence" : "View evidence"}
        </button>
      </div>

      {expanded && (
        <div className="mt-7 border-t border-[var(--color-border)] pt-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
            Rotation evidence
          </p>

          <div className="mt-5 grid gap-px overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
            <EvidenceItem
              label="Season compatibility"
              value={seasonCompatibility}
            />

            <EvidenceItem
              label="Water implications"
              value={waterImplications}
            />

            <EvidenceItem
              label="Soil nutrients"
              value={soilNutrientImplications}
            />

            <EvidenceItem
              label="Pest / disease break"
              value={pestDiseaseBreak}
            />

            <EvidenceItem
              label="Salinity implications"
              value={salinityImplications}
            />

            <EvidenceItem
              label="Waterlogging implications"
              value={waterloggingImplications}
            />
          </div>

          {overallRotationBenefit && (
            <div className="mt-5 border-l-2 border-[var(--color-green-700)] pl-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]">
                Overall rotation benefit
              </p>

              <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)]">
                {overallRotationBenefit}
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

interface EvidenceItemProps {
  label: string;
  value?: string;
}

function EvidenceItem({ label, value }: EvidenceItemProps) {
  return (
    <div className="bg-[var(--color-background)] p-5">
      <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]">
        {label}
      </p>

      <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)]">
        {value || "No evidence available yet."}
      </p>
    </div>
  );
}