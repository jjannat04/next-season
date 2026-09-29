import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Scale,
} from "lucide-react";

import { Container } from "../../components/ui/Container";
import {
  getCrops,
  getPossibleRotations,
} from "../../services/data";

export function ComparisonPage() {
  const crops = getCrops();

  const [previousCropId, setPreviousCropId] = useState(
    crops[0]?.id ?? "",
  );

  const possibleRotations = useMemo(
    () => getPossibleRotations(previousCropId),
    [previousCropId],
  );

  const [firstRotationId, setFirstRotationId] = useState(
    possibleRotations[0]?.id ?? "",
  );

  const [secondRotationId, setSecondRotationId] = useState(
    possibleRotations[1]?.id ??
      possibleRotations[0]?.id ??
      "",
  );

  const previousCrop = crops.find(
    (crop) => crop.id === previousCropId,
  );

  const firstRotation = possibleRotations.find(
    (rotation) => rotation.id === firstRotationId,
  );

  const secondRotation = possibleRotations.find(
    (rotation) => rotation.id === secondRotationId,
  );

  const firstCrop = crops.find(
    (crop) => crop.id === firstRotation?.nextCropId,
  );

  const secondCrop = crops.find(
    (crop) => crop.id === secondRotation?.nextCropId,
  );
  const firstCropName = firstCrop?.name ?? firstRotation?.nextCropName;
  const secondCropName = secondCrop?.name ?? secondRotation?.nextCropName;

  function handlePreviousCropChange(
    cropId: string,
  ) {
    setPreviousCropId(cropId);

    const rotations = getPossibleRotations(cropId);

    setFirstRotationId(rotations[0]?.id ?? "");
    setSecondRotationId(
      rotations[1]?.id ??
        rotations[0]?.id ??
        "",
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="border-b border-[var(--color-border)]">
        <Container>
          <div className="max-w-3xl py-16 lg:py-20">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-green-700)]">
              Compare rotations
            </p>

            <h1 className="mt-4 font-[var(--font-display)] text-5xl leading-tight sm:text-6xl">
              Put possibilities side by side.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-ink-muted)] sm:text-lg">
              Compare the evidence behind different crop
              transitions before deciding what to explore next.
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="py-12 lg:py-16">
            {/* Current crop */}
            <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-7 lg:p-9">
              <div className="flex items-center gap-3">
                <Scale
                  size={21}
                  strokeWidth={1.5}
                  className="text-[var(--color-green-700)]"
                />

                <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                  Starting point
                </span>
              </div>

              <div className="mt-7 max-w-md">
                <label
                  htmlFor="comparison-current-crop"
                  className="text-xs text-[var(--color-ink-subtle)]"
                >
                  Current crop
                </label>

                <select
                  id="comparison-current-crop"
                  value={previousCropId}
                  onChange={(event) =>
                    handlePreviousCropChange(
                      event.target.value,
                    )
                  }
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-background)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-green-700)]"
                >
                  {crops.map((crop) => (
                    <option
                      key={crop.id}
                      value={crop.id}
                    >
                      {crop.name}
                    </option>
                  ))}
                </select>
              </div>

              {previousCrop && (
                <div className="mt-6 flex items-center gap-2 text-sm text-[var(--color-ink-muted)]">
                  <span className="font-medium text-[var(--color-ink)]">
                    {previousCrop.name}
                  </span>

                  <ArrowRight size={15} />

                  <span>
                    Compare possible next crops
                  </span>
                </div>
              )}
            </div>

            {/* Comparison selectors */}
            {possibleRotations.length > 0 ? (
              <>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  <RotationSelector
                    label="Option one"
                    value={firstRotationId}
                    rotations={possibleRotations}
                    crops={crops}
                    onChange={setFirstRotationId}
                  />

                  <RotationSelector
                    label="Option two"
                    value={secondRotationId}
                    rotations={possibleRotations}
                    crops={crops}
                    onChange={setSecondRotationId}
                  />
                </div>

                {/* Comparison */}
                <div className="mt-10">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                        Comparison
                      </p>

                      <h2 className="mt-3 font-[var(--font-display)] text-3xl">
                        What the evidence says
                      </h2>
                    </div>

                    <span className="hidden text-xs text-[var(--color-ink-subtle)] sm:block">
                      Demo evidence
                    </span>
                  </div>

                  <div className="mt-7 overflow-hidden border border-[var(--color-border)]">
                    <div className="grid md:grid-cols-2">
                      <ComparisonColumn
                        cropName={
                          firstCropName ??
                          "Option one"
                        }
                        rotation={firstRotation}
                      />

                      <ComparisonColumn
                        cropName={
                          secondCropName ??
                          "Option two"
                        }
                        rotation={secondRotation}
                        bordered
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-10 border border-[var(--color-border)] p-8">
                <p className="text-sm text-[var(--color-ink-muted)]">
                  No evidence-backed transitions are
                  currently available for this crop.
                </p>
              </div>
            )}
            {/* Decision summary */}
{firstRotation && secondRotation && (
  <section className="mt-12 border border-[var(--color-border)] bg-[var(--color-surface)]">
    <div className="p-7 lg:p-9">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-green-700)]">
        Your exploration
      </p>

      <h2 className="mt-3 font-[var(--font-display)] text-3xl">
        What you explored
      </h2>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
        This summary reflects the two crop transitions you
        selected. It is a way to review the evidence you explored,
        not a recommendation or prediction.
      </p>

      <div className="mt-8 grid gap-px overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-3">
        <div className="bg-[var(--color-background)] p-6">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]">
            Current crop
          </p>

          <p className="mt-2 font-[var(--font-display)] text-2xl">
            {previousCrop?.name ?? "—"}
          </p>
        </div>

        <div className="bg-[var(--color-background)] p-6">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]">
            Option one
          </p>

          <p className="mt-2 font-[var(--font-display)] text-2xl">
            {firstCropName ?? "—"}
          </p>
        </div>

        <div className="bg-[var(--color-background)] p-6">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]">
            Option two
          </p>

          <p className="mt-2 font-[var(--font-display)] text-2xl">
            {secondCropName ?? "—"}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
            {firstCropName ?? "Option one"}
          </p>

          <p className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]">
            {firstRotation.overallRotationBenefit ||
              firstRotation.systemYieldEvidence ||
              "No evidence summary available yet."}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
            {secondCropName ?? "Option two"}
          </p>

          <p className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]">
            {secondRotation.overallRotationBenefit ||
              secondRotation.systemYieldEvidence ||
              "No evidence summary available yet."}
          </p>
        </div>
      </div>

      <div className="mt-9 border-t border-[var(--color-border)] pt-6">
        <a
          href="/rotation"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-green-800)] transition-colors hover:text-[var(--color-green-900)]"
        >
          Explore another rotation
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  </section>
)}
          </div>
        </Container>
      </section>
    </div>
  );
}

interface RotationSelectorProps {
  label: string;
  value: string;
  rotations: ReturnType<
    typeof getPossibleRotations
  >;
  crops: ReturnType<typeof getCrops>;
  onChange: (value: string) => void;
}

function RotationSelector({
  label,
  value,
  rotations,
  crops,
  onChange,
}: RotationSelectorProps) {
  return (
    <div className="border border-[var(--color-border)] p-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
        {label}
      </p>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-4 w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-background)] px-4 py-3 text-sm outline-none focus:border-[var(--color-green-700)]"
      >
        {rotations.map((rotation) => {
          const crop = crops.find(
            (item) => item.id === rotation.nextCropId,
          );

          return (
            <option
              key={rotation.id}
              value={rotation.id}
            >
              {crop?.name ?? rotation.nextCropName ?? "Unknown crop"}
            </option>
          );
        })}
      </select>
    </div>
  );
}

interface ComparisonColumnProps {
  cropName: string;
  rotation:
    | ReturnType<typeof getPossibleRotations>[number]
    | undefined;
  bordered?: boolean;
}

function ComparisonColumn({
  cropName,
  rotation,
  bordered = false,
}: ComparisonColumnProps) {
  if (!rotation) {
    return (
      <div
        className={[
          "p-7",
          bordered
            ? "border-t border-[var(--color-border)] md:border-l md:border-t-0"
            : "",
        ].join(" ")}
      >
        <p className="text-sm text-[var(--color-ink-muted)]">
          Select a rotation option.
        </p>
      </div>
    );
  }

  return (
    <div
      className={[
        "p-7 lg:p-9",
        bordered
          ? "border-t border-[var(--color-border)] md:border-l md:border-t-0"
          : "",
      ].join(" ")}
    >
      <div className="flex items-center gap-2">
        <Check
          size={16}
          className="text-[var(--color-green-700)]"
        />

        <span className="text-xs uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]">
          Next crop
        </span>
      </div>

      <h3 className="mt-4 font-[var(--font-display)] text-3xl">
        {cropName}
      </h3>

      <div className="mt-8 space-y-6">
        <ComparisonItem
          label="Season compatibility"
          value={rotation.seasonCompatibility}
        />

        <ComparisonItem
          label="Water implications"
          value={rotation.waterImplications}
        />

        <ComparisonItem
          label="Soil nutrients"
          value={rotation.soilNutrientImplications}
        />

        <ComparisonItem
          label="Pest / disease break"
          value={rotation.pestDiseaseBreak}
        />

        <ComparisonItem
          label="Salinity implications"
          value={rotation.salinityImplications}
        />

        <ComparisonItem
          label="Waterlogging implications"
          value={rotation.waterloggingImplications}
        />

        <ComparisonItem
          label="System-yield evidence"
          value={rotation.systemYieldEvidence}
        />

        <ComparisonItem
          label="Evidence level"
          value={rotation.evidenceLevel}
        />

        <ComparisonItem
          label="Region"
          value={rotation.region}
        />
      </div>

      <div className="mt-8 border-t border-[var(--color-border)] pt-5">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]">
          Overall rotation benefit
        </p>

        <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)]">
          {rotation.overallRotationBenefit ||
            "No evidence summary available."}
        </p>
      </div>
    </div>
  );
}

interface ComparisonItemProps {
  label: string;
  value?: string;
}

function ComparisonItem({
  label,
  value,
}: ComparisonItemProps) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]">
        {label}
      </p>

      <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)]">
        {value || "No evidence available yet."}
      </p>
    </div>
  );
}
