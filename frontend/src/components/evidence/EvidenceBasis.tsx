interface EvidenceBasisProps {
  evidenceLevel?: string;
  className?: string;
}

type EvidenceTone = "local" | "regional" | "inferred" | "mixed" | "neutral";

interface EvidencePresentation {
  label: string;
  tone: EvidenceTone;
}

const evidencePresentations: Record<string, EvidencePresentation> = {
  polder30_direct: {
    label: "Polder 30 direct evidence",
    tone: "local",
  },
  polder30_direct_for_system_yield: {
    label: "Polder 30 direct system-yield evidence",
    tone: "local",
  },
  coastal_bangladesh_regional_not_polder30: {
    label: "Coastal Bangladesh regional evidence (not Polder 30)",
    tone: "regional",
  },
  general_agronomy: {
    label: "General agronomic evidence",
    tone: "inferred",
  },
  general_agronomy_inferred: {
    label: "General agronomic / inferred evidence",
    tone: "inferred",
  },
  general_agronomy_inferred_not_tested_in_polder30: {
    label: "General agronomic / inferred evidence (not tested in Polder 30)",
    tone: "inferred",
  },
  "general_agronomy + coastal_bangladesh_regional_not_polder30": {
    label: "General agronomic and coastal regional evidence (not Polder 30)",
    tone: "mixed",
  },
  "bangladesh_non_coastal_for_N_effect; polder30_direct_for_timing": {
    label: "Mixed basis: Bangladesh nitrogen evidence / Polder 30 timing",
    tone: "mixed",
  },
};

const toneClasses: Record<EvidenceTone, string> = {
  local:
    "border-[var(--color-green-700)]/30 bg-[var(--color-green-700)]/10 text-[var(--color-green-900)]",
  regional:
    "border-[var(--color-blue-600)]/30 bg-[var(--color-blue-600)]/10 text-[var(--color-blue-600)]",
  inferred:
    "border-[var(--color-earth-600)]/30 bg-[var(--color-earth-600)]/10 text-[var(--color-earth-600)]",
  mixed:
    "border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] text-[var(--color-ink-muted)]",
  neutral:
    "border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-ink-subtle)]",
};

function getEvidencePresentation(evidenceLevel?: string): EvidencePresentation {
  if (!evidenceLevel) {
    return {
      label: "Evidence basis not specified",
      tone: "neutral",
    };
  }

  return (
    evidencePresentations[evidenceLevel] ?? {
      label: evidenceLevel,
      tone: "neutral",
    }
  );
}

export function EvidenceBasis({
  evidenceLevel,
  className = "",
}: EvidenceBasisProps) {
  const presentation = getEvidencePresentation(evidenceLevel);

  return (
    <div className={className}>
      <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]">
        Evidence basis
      </p>

      <div className="mt-2 flex flex-wrap items-start gap-x-3 gap-y-2">
        <span
          className={`inline-flex max-w-full border px-2.5 py-1 text-xs leading-5 ${toneClasses[presentation.tone]}`}
        >
          {presentation.label}
        </span>

        <details className="text-xs text-[var(--color-ink-subtle)]">
          <summary className="cursor-pointer py-1 text-[var(--color-green-800)]">
            About this label
          </summary>
          <p className="mt-2 max-w-md leading-5">
            Evidence basis describes where this relationship has been studied.
            It is not a statistical confidence score.
          </p>
          {evidenceLevel && (
            <p className="mt-1 leading-5">
              Dataset value: <code>{evidenceLevel}</code>
            </p>
          )}
        </details>
      </div>
    </div>
  );
}
