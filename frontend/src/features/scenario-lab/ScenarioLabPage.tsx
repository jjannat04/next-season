import { useMemo, useState } from "react";
import {
  CloudRain,
  Droplets,
  Mountain,
  ShieldAlert,
  ThermometerSun,
} from "lucide-react";

import { Container } from "../../components/ui/Container";
import { getScenario, getScenarios } from "../../services/data";
import type { Scenario, ScenarioChange } from "../../types";

export function ScenarioLabPage() {
  const scenarios = getScenarios();
  const [selectedScenarioId, setSelectedScenarioId] = useState(
    scenarios[0]?.id ?? "",
  );
  const selectedScenario = useMemo(
    () => getScenario(selectedScenarioId),
    [selectedScenarioId],
  );

  return (
    <div>
      <section className="border-b border-[var(--color-border)]">
        <Container>
          <div className="max-w-3xl py-16 lg:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-green-700)]">
              Scenario lab
            </p>
            <h1 className="mt-4 font-[var(--font-display)] text-5xl leading-tight sm:text-6xl">
              Explore what could change.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-ink-muted)]">
              Change one environmental assumption and examine how it alters the
              context around a possible next-season decision.
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="py-14 lg:py-20">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                  Choose a condition
                </p>
                <h2 className="mt-3 font-[var(--font-display)] text-3xl">
                  Environmental stress tests
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[var(--color-ink-subtle)]">
                Demonstration assumptions only. These are not NASA forecasts or
                predictions.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {scenarios.map((scenario) => (
                <ScenarioChoice
                  key={scenario.id}
                  scenario={scenario}
                  active={scenario.id === selectedScenarioId}
                  onSelect={() => setSelectedScenarioId(scenario.id)}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {selectedScenario ? (
        <section className="bg-[var(--color-forest)] text-[var(--color-on-dark)]">
          <Container>
            <div className="grid gap-12 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:py-24">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  Selected scenario · Demo
                </p>
                <h2 className="mt-4 font-[var(--font-display)] text-5xl leading-tight">
                  {selectedScenario.name}
                </h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-white/70">
                  {selectedScenario.description}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  What changes?
                </p>

                {selectedScenario.changes.length > 0 ? (
                  <div className="mt-4 divide-y divide-white/20 border-y border-white/20">
                    {selectedScenario.changes.map((change, index) => (
                      <ScenarioChangeRow
                        key={`${change.variable}-${index}`}
                        change={change}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 border-y border-white/20 py-7">
                    <p className="text-3xl font-[var(--font-display)]">
                      Reference conditions
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/68">
                      No environmental change is applied in the baseline.
                    </p>
                  </div>
                )}

                <div className="mt-8 flex items-start gap-3 border-l-2 border-[var(--color-amber-500)] pl-5">
                  <ShieldAlert
                    size={19}
                    className="mt-0.5 shrink-0 text-[var(--color-amber-500)]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium">Context, not a crop-specific result</p>
                    <p className="mt-2 text-sm leading-6 text-white/68">
                      The current prototype changes the environmental assumption
                      shown above. It does not yet calculate a crop-specific
                      rotation response.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : (
        <Container>
          <p className="py-12 text-sm text-[var(--color-ink-muted)]">
            No scenario is currently available.
          </p>
        </Container>
      )}

      <section className="border-b border-[var(--color-border)]">
        <Container>
          <div className="grid gap-8 py-14 lg:grid-cols-[0.7fr_1.3fr] lg:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-green-700)]">
              How to use this
            </p>
            <p className="max-w-3xl font-[var(--font-display)] text-3xl leading-snug text-[var(--color-ink)] sm:text-4xl">
              A scenario is not a prediction. It is a way to explore how
              different conditions could change the context around a possible
              crop rotation.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}

function ScenarioChoice({
  scenario,
  active,
  onSelect,
}: {
  scenario: Scenario;
  active: boolean;
  onSelect: () => void;
}) {
  const change = scenario.changes[0];
  const metadata = change ? getVariableMetadata(change.variable) : undefined;
  const Icon = metadata?.icon ?? Mountain;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={[
        "min-h-64 border-l-2 p-6 text-left transition-colors",
        active
          ? "border-[var(--color-amber-500)] bg-[var(--color-earth-blue)] text-[var(--color-on-dark)] shadow-[var(--shadow-soft)]"
          : "border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-green-700)]",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <Icon
          size={24}
          strokeWidth={1.5}
          className={active ? "text-[var(--color-blue-500)]" : metadata?.iconClassName}
          aria-hidden="true"
        />
        <span className={`text-xs font-semibold uppercase tracking-[0.12em] ${
          active ? "text-white/55" : "text-[var(--color-ink-subtle)]"
        }`}>
          Demo scenario
        </span>
      </div>

      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] opacity-65">
        {scenario.name}
      </p>
      <p className="mt-3 font-[var(--font-display)] text-4xl">
        {change ? formatChange(change.changePercent, change.changeAbsolute) : "Reference"}
      </p>
      <p className={`mt-4 text-sm leading-6 ${active ? "text-white/68" : "text-[var(--color-ink-muted)]"}`}>
        {change ? `${metadata?.label} stress test` : "Reference conditions with no applied change."}
      </p>
    </button>
  );
}

function ScenarioChangeRow({ change }: { change: ScenarioChange }) {
  const metadata = getVariableMetadata(change.variable);
  const Icon = metadata.icon;

  return (
    <div className="grid gap-5 py-7 sm:grid-cols-[3rem_0.7fr_1.3fr] sm:items-center">
      <Icon
        size={25}
        strokeWidth={1.5}
        className="text-[var(--color-blue-500)]"
        aria-hidden="true"
      />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
          {metadata.label}
        </p>
        <p className="mt-2 font-[var(--font-display)] text-4xl">
          {formatChange(change.changePercent, change.changeAbsolute)}
        </p>
      </div>
      <p className="text-sm leading-6 text-white/68">{metadata.description}</p>
    </div>
  );
}

function getVariableMetadata(variable: ScenarioChange["variable"]) {
  switch (variable) {
    case "rainfall":
      return {
        label: "Rainfall",
        description:
          "The rainfall assumption changes relative to the demonstration baseline.",
        icon: CloudRain,
        iconClassName: "text-[var(--color-blue-600)]",
      };
    case "temperature":
      return {
        label: "Temperature",
        description:
          "The temperature assumption changes relative to the demonstration baseline.",
        icon: ThermometerSun,
        iconClassName: "text-[var(--color-earth-600)]",
      };
    case "waterAvailability":
      return {
        label: "Water availability",
        description:
          "The assumed availability of water for the field changes.",
        icon: Droplets,
        iconClassName: "text-[var(--color-blue-600)]",
      };
    case "soilCondition":
      return {
        label: "Soil condition",
        description: "The assumed soil condition changes.",
        icon: Mountain,
        iconClassName: "text-[var(--color-earth-600)]",
      };
  }
}

function formatChange(changePercent?: number, changeAbsolute?: number) {
  if (changePercent !== undefined) {
    return `${changePercent > 0 ? "+" : ""}${changePercent}%`;
  }
  if (changeAbsolute !== undefined) {
    return `${changeAbsolute > 0 ? "+" : ""}${changeAbsolute}`;
  }
  return "No change";
}
