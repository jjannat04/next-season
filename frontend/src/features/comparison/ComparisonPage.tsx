import { useMemo, useState } from "react";
import { ArrowRight, ExternalLink, Scale } from "lucide-react";

import { EvidenceBasis } from "../../components/evidence/EvidenceBasis";
import { Container } from "../../components/ui/Container";
import type { DataSource, RotationEvidence } from "../../types";
import { getCrops, getPossibleRotations } from "../../services/data";

const comparisonRows: Array<{
  label: string;
  key: keyof Pick<
    RotationEvidence,
    | "seasonCompatibility"
    | "waterImplications"
    | "soilNutrientImplications"
    | "pestDiseaseBreak"
    | "salinityImplications"
    | "waterloggingImplications"
    | "systemYieldEvidence"
  >;
}> = [
  { label: "Season / timing", key: "seasonCompatibility" },
  { label: "Water", key: "waterImplications" },
  { label: "Soil / nutrients", key: "soilNutrientImplications" },
  { label: "Pest & disease", key: "pestDiseaseBreak" },
  { label: "Salinity", key: "salinityImplications" },
  { label: "Waterlogging", key: "waterloggingImplications" },
  { label: "System yield", key: "systemYieldEvidence" },
];

export function ComparisonPage() {
  const crops = getCrops();
  const [previousCropId, setPreviousCropId] = useState(crops[0]?.id ?? "");
  const possibleRotations = useMemo(
    () => getPossibleRotations(previousCropId),
    [previousCropId],
  );
  const [firstRotationId, setFirstRotationId] = useState(
    possibleRotations[0]?.id ?? "",
  );
  const [secondRotationId, setSecondRotationId] = useState(
    possibleRotations[1]?.id ?? possibleRotations[0]?.id ?? "",
  );

  const previousCrop = crops.find((crop) => crop.id === previousCropId);
  const firstRotation = possibleRotations.find(
    (rotation) => rotation.id === firstRotationId,
  );
  const secondRotation = possibleRotations.find(
    (rotation) => rotation.id === secondRotationId,
  );
  const firstCropName = getNextCropName(firstRotation, crops);
  const secondCropName = getNextCropName(secondRotation, crops);

  function handlePreviousCropChange(cropId: string) {
    const rotations = getPossibleRotations(cropId);
    setPreviousCropId(cropId);
    setFirstRotationId(rotations[0]?.id ?? "");
    setSecondRotationId(rotations[1]?.id ?? rotations[0]?.id ?? "");
  }

  return (
    <div>
      <section className="border-b border-[var(--color-border)]">
        <Container>
          <div className="max-w-3xl py-16 lg:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-green-700)]">
              Compare rotations
            </p>
            <h1 className="mt-4 font-[var(--font-display)] text-5xl leading-tight sm:text-6xl">
              Put possibilities side by side.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-ink-muted)]">
              Compare the tradeoffs documented for two crop transitions without
              turning research evidence into a ranking.
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="py-14 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-end">
              <div>
                <div className="flex items-center gap-3 text-[var(--color-green-700)]">
                  <Scale size={21} strokeWidth={1.5} aria-hidden="true" />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                    Starting point
                  </p>
                </div>
                <label
                  htmlFor="comparison-current-crop"
                  className="mt-5 block text-xs text-[var(--color-ink-subtle)]"
                >
                  Current crop
                </label>
                <select
                  id="comparison-current-crop"
                  value={previousCropId}
                  onChange={(event) => handlePreviousCropChange(event.target.value)}
                  className="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-3 text-base"
                >
                  {crops.map((crop) => (
                    <option key={crop.id} value={crop.id}>
                      {crop.name}
                    </option>
                  ))}
                </select>
              </div>

              {possibleRotations.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
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
              )}
            </div>

            {firstRotation && secondRotation ? (
              <>
                <div className="mt-14">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                    Evidence comparison
                  </p>
                  <h2 className="mt-3 font-[var(--font-display)] text-3xl">
                    What are the tradeoffs?
                  </h2>

                  <div className="mt-8 border-t border-[var(--color-border-strong)]">
                    <div className="grid grid-cols-2 gap-4 py-6 sm:grid-cols-[10rem_1fr_1fr] sm:gap-6">
                      <div className="hidden sm:block" />
                      <ComparisonHeading
                        previousCrop={previousCrop?.name}
                        cropName={firstCropName ?? "Option one"}
                      />
                      <ComparisonHeading
                        previousCrop={previousCrop?.name}
                        cropName={secondCropName ?? "Option two"}
                      />
                    </div>

                    {comparisonRows.map((row) => (
                      <ComparisonRow
                        key={row.key}
                        label={row.label}
                        firstCropName={firstCropName ?? "Option one"}
                        secondCropName={secondCropName ?? "Option two"}
                        firstValue={firstRotation[row.key]}
                        secondValue={secondRotation[row.key]}
                      />
                    ))}

                    <div className="grid gap-5 border-b border-[var(--color-border)] py-7 sm:grid-cols-[10rem_1fr_1fr] sm:gap-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]">
                        Evidence basis
                      </p>
                      <div>
                        <p className="mb-3 text-sm font-semibold sm:hidden">
                          {firstCropName ?? "Option one"}
                        </p>
                        <EvidenceBasis evidenceLevel={firstRotation.evidenceLevel} />
                      </div>
                      <div>
                        <p className="mb-3 text-sm font-semibold sm:hidden">
                          {secondCropName ?? "Option two"}
                        </p>
                        <EvidenceBasis evidenceLevel={secondRotation.evidenceLevel} />
                      </div>
                    </div>
                  </div>
                </div>

                <section className="mt-14 bg-[var(--color-earth-blue)] text-[var(--color-on-dark)]">
                  <div className="grid gap-10 p-7 lg:grid-cols-[0.65fr_1.35fr] lg:p-10">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                        Decision context
                      </p>
                      <h2 className="mt-3 font-[var(--font-display)] text-3xl">
                        Review the differences, not a winner.
                      </h2>
                      <p className="mt-4 text-sm leading-6 text-white/68">
                        These rows organize the evidence attached to each
                        transition. They do not recommend one crop over another.
                      </p>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2">
                      <SummaryColumn
                        cropName={firstCropName ?? "Option one"}
                        rotation={firstRotation}
                      />
                      <SummaryColumn
                        cropName={secondCropName ?? "Option two"}
                        rotation={secondRotation}
                      />
                    </div>
                  </div>
                </section>

                <section className="mt-12 border-t border-[var(--color-border-strong)] pt-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                    Research sources
                  </p>
                  <div className="mt-6 grid gap-10 md:grid-cols-2">
                    <SourceColumn
                      cropName={firstCropName ?? "Option one"}
                      source={firstRotation.source}
                      region={firstRotation.region}
                    />
                    <SourceColumn
                      cropName={secondCropName ?? "Option two"}
                      source={secondRotation.source}
                      region={secondRotation.region}
                    />
                  </div>
                </section>
              </>
            ) : (
              <p className="mt-12 text-sm text-[var(--color-ink-muted)]">
                No evidence-backed transitions are currently available for this crop.
              </p>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}

function RotationSelector({
  label,
  value,
  rotations,
  crops,
  onChange,
}: {
  label: string;
  value: string;
  rotations: ReturnType<typeof getPossibleRotations>;
  crops: ReturnType<typeof getCrops>;
  onChange: (value: string) => void;
}) {
  return (
    <div className="border-l-2 border-[var(--color-border-strong)] pl-5">
      <label className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
        {label}
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 block w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-3 text-base font-normal normal-case tracking-normal text-[var(--color-ink)]"
        >
          {rotations.map((rotation) => (
            <option key={rotation.id} value={rotation.id}>
              {getNextCropName(rotation, crops) ?? "Unknown crop"}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

function ComparisonHeading({
  previousCrop,
  cropName,
}: {
  previousCrop?: string;
  cropName: string;
}) {
  return (
    <div>
      <p className="text-xs text-[var(--color-ink-subtle)]">
        {previousCrop ?? "Current crop"} <ArrowRight size={13} className="inline" />
      </p>
      <p className="mt-1 font-[var(--font-display)] text-3xl">{cropName}</p>
    </div>
  );
}

function ComparisonRow({
  label,
  firstCropName,
  secondCropName,
  firstValue,
  secondValue,
}: {
  label: string;
  firstCropName: string;
  secondCropName: string;
  firstValue?: string;
  secondValue?: string;
}) {
  return (
    <div className="grid gap-5 border-b border-[var(--color-border)] py-7 sm:grid-cols-[10rem_1fr_1fr] sm:gap-6">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]">
        {label}
      </p>
      <ComparisonCell cropName={firstCropName} value={firstValue} />
      <ComparisonCell cropName={secondCropName} value={secondValue} />
    </div>
  );
}

function ComparisonCell({
  cropName,
  value,
}: {
  cropName: string;
  value?: string;
}) {
  if (!value) {
    return (
      <div>
        <p className="mb-2 text-sm font-semibold sm:hidden">{cropName}</p>
        <p className="text-sm text-[var(--color-ink-subtle)]">
          Evidence unavailable.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-2 text-sm font-semibold sm:hidden">{cropName}</p>
      <p className="line-clamp-4 text-sm leading-6 text-[var(--color-ink-muted)]">
        {value}
      </p>
      <details className="mt-2">
        <summary className="cursor-pointer text-sm font-semibold text-[var(--color-green-800)]">
          View full evidence
        </summary>
        <p className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]">{value}</p>
      </details>
    </div>
  );
}

function SummaryColumn({
  cropName,
  rotation,
}: {
  cropName: string;
  rotation: RotationEvidence;
}) {
  return (
    <div className="border-t border-white/20 pt-5">
      <p className="font-[var(--font-display)] text-2xl">{cropName}</p>
      <p className="mt-3 text-sm leading-6 text-white/70">
        {rotation.overallRotationBenefit ??
          rotation.evidenceSummary ??
          "Evidence summary not specified."}
      </p>
    </div>
  );
}

function SourceColumn({
  cropName,
  source,
  region,
}: {
  cropName: string;
  source?: DataSource;
  region?: string;
}) {
  const labels = source?.title.split(";").map((label) => label.trim()) ?? [];
  const urls = source?.sourceUrls ?? (source?.sourceUrl ? [source.sourceUrl] : []);

  return (
    <div>
      <p className="font-[var(--font-display)] text-2xl">{cropName}</p>
      <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
        {region ?? "Region not specified."}
      </p>
      {urls.length > 0 ? (
        <div className="mt-4 space-y-2">
          {urls.map((url, index) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-2 text-sm leading-5 text-[var(--color-green-800)]"
            >
              <ExternalLink size={14} className="mt-0.5 shrink-0" />
              {labels[index] ?? `Source ${index + 1}`}
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-[var(--color-ink-subtle)]">
          Source link unavailable.
        </p>
      )}
    </div>
  );
}

function getNextCropName(
  rotation: RotationEvidence | undefined,
  crops: ReturnType<typeof getCrops>,
) {
  if (!rotation) return undefined;
  return (
    crops.find((crop) => crop.id === rotation.nextCropId)?.name ??
    rotation.nextCropName
  );
}
