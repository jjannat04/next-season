import { useMemo, useState } from "react";
import {
  ArrowRight,
  CloudRain,
  Droplets,
  Mountain,
  ThermometerSun,
} from "lucide-react";

import { Container } from "../../components/ui/Container";
import {
  getScenario,
  getScenarios,
} from "../../services/data";

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
      {/* Header */}
      <section className="border-b border-[var(--color-border)]">
        <Container>
          <div className="max-w-3xl py-16 lg:py-20">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-green-700)]">
              Scenario lab
            </p>

            <h1 className="mt-4 font-[var(--font-display)] text-5xl leading-tight sm:text-6xl">
              Explore what could change.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-ink-muted)] sm:text-lg">
              Change the assumptions and explore how different
              environmental conditions could affect the next season.
            </p>
          </div>
        </Container>
      </section>

      {/* Scenario workspace */}
      <section>
        <Container>
          <div className="py-12 lg:py-16">
            {/* Scenario selector */}
            <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-7 lg:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                Choose a scenario
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {scenarios.map((scenario) => {
                  const active =
                    scenario.id === selectedScenarioId;

                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      onClick={() =>
                        setSelectedScenarioId(scenario.id)
                      }
                      className={[
                        "rounded-full border px-4 py-2.5 text-sm transition-colors",
                        active
                          ? "border-[var(--color-green-800)] bg-[var(--color-green-800)] text-white"
                          : "border-[var(--color-border-strong)] text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-ink)]",
                      ].join(" ")}
                    >
                      {scenario.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedScenario ? (
              <div className="mt-10">
                {/* Scenario description */}
                <div className="max-w-3xl">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                    Selected scenario
                  </p>

                  <h2 className="mt-3 font-[var(--font-display)] text-4xl">
                    {selectedScenario.name}
                  </h2>

                  <p className="mt-4 text-base leading-7 text-[var(--color-ink-muted)]">
                    {selectedScenario.description}
                  </p>
                </div>

                {/* Scenario changes */}
                {selectedScenario.changes.length > 0 ? (
                  <div
  className={[
    "mt-10 grid gap-px overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)]",
    selectedScenario.changes.length > 1
      ? "md:grid-cols-2"
      : "grid-cols-1",
  ].join(" ")}
>
                    {selectedScenario.changes.map((change, index) => (
                      <ScenarioChangeCard
                        key={`${change.variable}-${index}`}
                        variable={change.variable}
                        changePercent={change.changePercent}
                        changeAbsolute={change.changeAbsolute}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-10 border border-[var(--color-border)] bg-[var(--color-background)] p-8">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                      Current conditions
                    </p>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-ink-muted)]">
                      This is the baseline scenario. No environmental
                      changes have been applied.
                    </p>
                  </div>
                )}

                {/* Interpretation */}
                <div className="mt-10 border-l-2 border-[var(--color-green-700)] pl-5">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                    How to use this
                  </p>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
                    A scenario is not a prediction. It is a way to
                    explore how different conditions could change the
                    context around a possible crop rotation.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-10 border border-[var(--color-border)] p-8">
                <p className="text-sm text-[var(--color-ink-muted)]">
                  No scenario is currently available.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}

interface ScenarioChangeCardProps {
  variable:
    | "rainfall"
    | "temperature"
    | "waterAvailability"
    | "soilCondition";
  changePercent?: number;
  changeAbsolute?: number;
}

function ScenarioChangeCard({
  variable,
  changePercent,
  changeAbsolute,
}: ScenarioChangeCardProps) {
  const metadata = getVariableMetadata(variable);

  return (
    <article className="bg-[var(--color-background)] p-7 lg:p-9">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <metadata.icon
            size={21}
            strokeWidth={1.5}
            className={metadata.iconClassName}
          />

          <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
            {metadata.label}
          </span>
        </div>

        <span className="rounded-full bg-[var(--color-surface-muted)] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-subtle)]">
          Demo
        </span>
      </div>

      <div className="mt-10 flex items-end gap-4">
        <div>
          <p className="text-xs text-[var(--color-ink-subtle)]">
            Change
          </p>

          <p
            className={[
              "mt-1 font-[var(--font-display)] text-4xl",
              getChangeColor(changePercent, changeAbsolute),
            ].join(" ")}
          >
            {formatChange(changePercent, changeAbsolute)}
          </p>
        </div>

        <ArrowRight
          size={18}
          className="mb-2 text-[var(--color-ink-subtle)]"
        />

        <div className="max-w-xs">
          <p className="text-xs text-[var(--color-ink-subtle)]">
            Scenario effect
          </p>

          <p className="mt-1 text-sm leading-6 text-[var(--color-ink-muted)]">
            {metadata.description}
          </p>
        </div>
      </div>
    </article>
  );
}

function getVariableMetadata(
  variable:
    | "rainfall"
    | "temperature"
    | "waterAvailability"
    | "soilCondition",
) {
  switch (variable) {
    case "rainfall":
      return {
        label: "Rainfall",
        description:
          "The scenario changes the rainfall assumption relative to the baseline.",
        icon: CloudRain,
        iconClassName: "text-[var(--color-blue-600)]",
      };

    case "temperature":
      return {
        label: "Temperature",
        description:
          "The scenario changes the temperature assumption relative to the baseline.",
        icon: ThermometerSun,
        iconClassName: "text-[var(--color-earth-600)]",
      };

    case "waterAvailability":
      return {
        label: "Water availability",
        description:
          "The scenario changes the assumed availability of water for the field.",
        icon: Droplets,
        iconClassName: "text-[var(--color-blue-600)]",
      };

    case "soilCondition":
      return {
        label: "Soil condition",
        description:
          "The scenario changes the assumed soil condition.",
        icon: Mountain,
        iconClassName: "text-[var(--color-earth-600)]",
      };
  }
}

function formatChange(
  changePercent?: number,
  changeAbsolute?: number,
) {
  if (changePercent !== undefined) {
    const sign = changePercent > 0 ? "+" : "";

    return `${sign}${changePercent}%`;
  }

  if (changeAbsolute !== undefined) {
    const sign = changeAbsolute > 0 ? "+" : "";

    return `${sign}${changeAbsolute}`;
  }

  return "No change";
}

function getChangeColor(
  changePercent?: number,
  changeAbsolute?: number,
) {
  const change = changePercent ?? changeAbsolute;

  if (change === undefined || change === 0) {
    return "text-[var(--color-ink)]";
  }

  if (change > 0) {
    return "text-[var(--color-earth-600)]";
  }

  return "text-[var(--color-blue-600)]";
}