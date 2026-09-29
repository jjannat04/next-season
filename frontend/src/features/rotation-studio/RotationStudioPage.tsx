import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ExternalLink,
  Sprout,
} from "lucide-react";

import { EvidenceBasis } from "../../components/evidence/EvidenceBasis";
import { Container } from "../../components/ui/Container";
import type { DataSource, RotationEvidence } from "../../types";
import {
  getCrops,
  getCropVarieties,
  getPossibleRotations,
} from "../../services/data";

const evidenceFields: Array<{
  number: string;
  label: string;
  key: keyof Pick<
    RotationEvidence,
    | "seasonCompatibility"
    | "waterImplications"
    | "soilNutrientImplications"
    | "pestDiseaseBreak"
    | "salinityImplications"
    | "waterloggingImplications"
  >;
}> = [
  { number: "01", label: "Season / timing", key: "seasonCompatibility" },
  { number: "02", label: "Water", key: "waterImplications" },
  { number: "03", label: "Soil / nutrients", key: "soilNutrientImplications" },
  { number: "04", label: "Pest & disease", key: "pestDiseaseBreak" },
  { number: "05", label: "Salinity", key: "salinityImplications" },
  { number: "06", label: "Waterlogging", key: "waterloggingImplications" },
];

export function RotationStudioPage() {
  const crops = getCrops();
  const [previousCropId, setPreviousCropId] = useState(crops[0]?.id ?? "");
  const possibleRotations = useMemo(
    () => getPossibleRotations(previousCropId),
    [previousCropId],
  );
  const [selectedRotationId, setSelectedRotationId] = useState(
    possibleRotations[0]?.id ?? "",
  );

  const previousCrop = crops.find((crop) => crop.id === previousCropId);
  const cropVarieties = previousCrop ? getCropVarieties(previousCrop.id) : [];
  const selectedRotation =
    possibleRotations.find((rotation) => rotation.id === selectedRotationId) ??
    possibleRotations[0];

  function handlePreviousCropChange(cropId: string) {
    const rotations = getPossibleRotations(cropId);
    setPreviousCropId(cropId);
    setSelectedRotationId(rotations[0]?.id ?? "");
  }

  return (
    <div>
      <section className="border-b border-[var(--color-border)]">
        <Container>
          <div className="max-w-3xl py-16 lg:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-green-700)]">
              Rotation studio
            </p>
            <h1 className="mt-4 font-[var(--font-display)] text-5xl leading-tight sm:text-6xl">
              Explore what comes next.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-ink-muted)]">
              Start with the crop on the field, then examine why each researched
              transition may deserve consideration for the following season.
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="py-14 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div>
                <div className="flex items-center gap-3 text-[var(--color-green-700)]">
                  <Sprout size={21} strokeWidth={1.5} aria-hidden="true" />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                    Current crop
                  </p>
                </div>

                <label
                  htmlFor="previous-crop"
                  className="mt-6 block text-xs text-[var(--color-ink-subtle)]"
                >
                  What is currently growing?
                </label>
                <select
                  id="previous-crop"
                  value={previousCropId}
                  onChange={(event) => handlePreviousCropChange(event.target.value)}
                  className="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-3 text-base text-[var(--color-ink)]"
                >
                  {crops.map((crop) => (
                    <option key={crop.id} value={crop.id}>
                      {crop.name}
                    </option>
                  ))}
                </select>

                {previousCrop && (
                  <div className="mt-7 border-l-2 border-[var(--color-clay)] pl-5">
                    <p className="font-[var(--font-display)] text-3xl">
                      {selectedRotation?.previousCropName ?? previousCrop.name}
                    </p>
                    <p className="mt-2 text-sm italic text-[var(--color-ink-muted)]">
                      {previousCrop.scientificName}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-ink-subtle)]">
                      Species baseline: {previousCrop.source?.title ?? "Source unavailable"}
                      {previousCrop.region ? ` / ${previousCrop.region}` : ""}
                    </p>
                  </div>
                )}

                <details className="mt-7 border-t border-[var(--color-border)] pt-5">
                  <summary className="cursor-pointer text-sm font-semibold text-[var(--color-green-800)]">
                    View {cropVarieties.length} variety research records
                  </summary>
                  <div className="mt-5 space-y-5">
                    {cropVarieties.map((variety) => (
                      <div key={variety.id} className="border-l border-[var(--color-border-strong)] pl-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium">{variety.name}</p>
                            <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                              {[variety.season, variety.region].filter(Boolean).join(" / ")}
                            </p>
                          </div>
                          {variety.source?.sourceUrl && (
                            <a
                              href={variety.source.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Open source for ${variety.name}`}
                              className="text-[var(--color-green-800)]"
                            >
                              <ExternalLink size={15} />
                            </a>
                          )}
                        </div>
                        <p className="mt-2 text-xs leading-5 text-[var(--color-ink-subtle)]">
                          {variety.source?.title ?? "Source unavailable"}
                        </p>
                      </div>
                    ))}
                  </div>
                </details>
              </div>

              <div>
                <div className="flex items-center gap-3 text-[var(--color-ink-muted)]">
                  <ArrowDown size={18} aria-hidden="true" />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                    Possible next crops
                  </p>
                </div>

                {possibleRotations.length > 0 ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {possibleRotations.map((rotation) => {
                      const nextCrop = crops.find(
                        (crop) => crop.id === rotation.nextCropId,
                      );
                      const name = nextCrop?.name ?? rotation.nextCropName ?? "Unknown crop";
                      const active = rotation.id === selectedRotation?.id;

                      return (
                        <button
                          key={rotation.id}
                          type="button"
                          onClick={() => setSelectedRotationId(rotation.id)}
                          aria-pressed={active}
                          className={[
                            "min-h-28 border-l-2 px-5 py-4 text-left transition-colors",
                            active
                              ? "border-[var(--color-amber-500)] bg-[var(--color-forest)] text-[var(--color-on-dark)]"
                              : "border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-green-700)]",
                          ].join(" ")}
                        >
                          <span className={`text-xs uppercase tracking-[0.12em] ${
                            active ? "text-white/55" : "text-[var(--color-ink-subtle)]"
                          }`}>
                            {rotation.previousCropName ?? previousCrop?.name}
                          </span>
                          <span className="mt-3 flex items-center gap-2 font-[var(--font-display)] text-2xl">
                            <ArrowRight size={16} aria-hidden="true" />
                            {name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-5 text-sm text-[var(--color-ink-muted)]">
                    No evidence-backed transition is currently available for this crop.
                  </p>
                )}
              </div>
            </div>

            {selectedRotation && (
              <TransitionEvidence
                rotation={selectedRotation}
                nextCropName={
                  crops.find((crop) => crop.id === selectedRotation.nextCropId)?.name ??
                  selectedRotation.nextCropName ??
                  "Next crop"
                }
              />
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}

function TransitionEvidence({
  rotation,
  nextCropName,
}: {
  rotation: RotationEvidence;
  nextCropName: string;
}) {
  return (
    <section className="mt-16 border-t border-[var(--color-border-strong)] pt-10">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-green-700)]">
            Why this transition?
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="font-[var(--font-display)] text-3xl">
              {rotation.previousCropName}
            </span>
            <ArrowRight className="text-[var(--color-clay)]" size={22} />
            <span className="font-[var(--font-display)] text-4xl">
              {nextCropName}
            </span>
          </div>
          <p className="mt-6 text-base leading-7 text-[var(--color-ink-muted)]">
            {rotation.evidenceSummary ??
              rotation.overallRotationBenefit ??
              "Evidence summary not specified."}
          </p>

          <EvidenceBasis evidenceLevel={rotation.evidenceLevel} className="mt-7" />
          <p className="mt-4 max-w-lg text-sm leading-6 text-[var(--color-ink-subtle)]">
            This evidence basis applies to the research row as a whole. It does
            not mean every sub-claim below was directly measured in Polder 30.
          </p>
        </div>

        <div className="border-t border-[var(--color-border-strong)]">
          {evidenceFields.map((field) => (
            <EvidenceRow
              key={field.key}
              number={field.number}
              label={field.label}
              value={rotation[field.key]}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-10 border-t border-[var(--color-border)] pt-8 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]">
            System-yield evidence
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]">
            {rotation.systemYieldEvidence ?? "Evidence unavailable."}
          </p>
          {rotation.overallRotationBenefit && (
            <>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]">
                Overall rotation benefit
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]">
                {rotation.overallRotationBenefit}
              </p>
            </>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]">
            Research context
          </p>
          <dl className="mt-4 space-y-4 text-sm">
            <EvidenceDetail label="Transition type" value={rotation.transitionType} />
            <EvidenceDetail label="Region" value={rotation.region} />
            <EvidenceDetail label="Notes" value={rotation.notes} />
          </dl>
          {rotation.source && <SourceLinks source={rotation.source} />}
        </div>
      </div>
    </section>
  );
}

function EvidenceRow({
  number,
  label,
  value,
}: {
  number: string;
  label: string;
  value?: string;
}) {
  return (
    <div className="grid gap-3 border-b border-[var(--color-border)] py-6 sm:grid-cols-[3rem_10rem_1fr]">
      <span className="text-xs font-semibold tracking-[0.12em] text-[var(--color-ink-subtle)]">
        {number}
      </span>
      <p className="font-medium text-[var(--color-ink)]">{label}</p>
      {value ? (
        <div>
          <p className="line-clamp-3 text-sm leading-6 text-[var(--color-ink-muted)]">
            {value}
          </p>
          <details className="mt-2">
            <summary className="cursor-pointer text-sm font-semibold text-[var(--color-green-800)]">
              View full evidence
            </summary>
            <p className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]">
              {value}
            </p>
          </details>
        </div>
      ) : (
        <p className="text-sm text-[var(--color-ink-subtle)]">Evidence unavailable.</p>
      )}
    </div>
  );
}

function EvidenceDetail({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-subtle)]">
        {label}
      </dt>
      <dd className="mt-1 leading-6 text-[var(--color-ink-muted)]">
        {value ?? "Not specified."}
      </dd>
    </div>
  );
}

function SourceLinks({ source }: { source: DataSource }) {
  const labels = source.title.split(";").map((label) => label.trim());
  const urls = source.sourceUrls ?? (source.sourceUrl ? [source.sourceUrl] : []);

  return (
    <div className="mt-6 border-t border-[var(--color-border)] pt-5">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-subtle)]">
        Sources
      </p>
      <div className="mt-3 space-y-2">
        {urls.map((url, index) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-2 text-sm leading-5 text-[var(--color-green-800)] hover:text-[var(--color-green-900)]"
          >
            <ExternalLink size={14} className="mt-0.5 shrink-0" />
            {labels[index] ?? `Source ${index + 1}`}
          </a>
        ))}
      </div>
    </div>
  );
}
