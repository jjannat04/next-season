import {
  CloudRain,
  Leaf,
  Sprout,
  ThermometerSun,
} from "lucide-react";
import { Container } from "../../components/ui/Container";

const signals = [
  {
    icon: CloudRain,
    label: "Climate",
    title: "Rainfall is changing",
    description:
      "See how rainfall and temperature patterns shape the conditions of the coming season.",
    metric: "Rainfall",
    value: "Seasonal trend",
  },
  {
    icon: ThermometerSun,
    label: "Temperature",
    title: "Heat leaves a signal",
    description:
      "Understand how temperature conditions can affect crop timing and growing conditions.",
    metric: "Temperature",
    value: "Observed conditions",
  },
  {
    icon: Leaf,
    label: "Vegetation",
    title: "Fields tell a story",
    description:
      "Vegetation signals help reveal how crop and landscape conditions are evolving over time.",
    metric: "NDVI",
    value: "Vegetation health",
  },
  {
    icon: Sprout,
    label: "Soil",
    title: "Every rotation starts below ground",
    description:
      "Soil characteristics and water conditions influence which crop transitions make sense next.",
    metric: "Soil",
    value: "Field conditions",
  },
];

export function SignalOverview() {
  return (
    <section className="border-b border-[var(--color-border)]">
      <Container>
        <div className="py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-green-700)]">
              Read the field
            </p>

            <h2 className="mt-4 font-[var(--font-display)] text-4xl leading-tight sm:text-5xl">
              One field. Many signals.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-ink-muted)]">
              No single number explains a farm. Next Season brings
              different environmental signals together so you can see
              the bigger picture.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
            {signals.map((signal) => {
              const Icon = signal.icon;

              return (
                <article
                  key={signal.label}
                  className="group bg-[var(--color-background)] p-6 transition-colors duration-[var(--duration-normal)] hover:bg-[var(--color-surface)] lg:p-7"
                >
                  <div className="flex items-center justify-between">
                    <Icon
                      size={23}
                      strokeWidth={1.5}
                      className="text-[var(--color-green-700)]"
                    />

                    <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-ink-subtle)]">
                      {signal.label}
                    </span>
                  </div>

                  <h3 className="mt-12 font-[var(--font-display)] text-2xl leading-tight">
                    {signal.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-[var(--color-ink-muted)]">
                    {signal.description}
                  </p>

                  <div className="mt-8 border-t border-[var(--color-border)] pt-4">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-subtle)]">
                      {signal.metric}
                    </p>

                    <p className="mt-1 text-sm font-medium text-[var(--color-ink)]">
                      {signal.value}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}