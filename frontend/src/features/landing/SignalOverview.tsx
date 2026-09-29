import { CloudRain, GitCompareArrows, Leaf, Sprout } from "lucide-react";

import { Container } from "../../components/ui/Container";

const signals = [
  {
    icon: CloudRain,
    label: "Climate",
    title: "Rainfall and heat",
    description:
      "Historical climate observations reveal seasonal patterns in rainfall and temperature.",
  },
  {
    icon: Leaf,
    label: "Vegetation",
    title: "A field-level signal",
    description:
      "Vegetation observations add context about how the field and surrounding landscape are responding.",
  },
  {
    icon: Sprout,
    label: "Soil",
    title: "Conditions below ground",
    description:
      "Soil and water conditions shape which crop transitions deserve closer consideration.",
  },
  {
    icon: GitCompareArrows,
    label: "Rotation evidence",
    title: "What could follow",
    description:
      "Research evidence connects field constraints with crop timing, water, nutrients, and system outcomes.",
  },
];

export function SignalOverview() {
  return (
    <section className="bg-[var(--color-earth-blue)] text-[var(--color-on-dark)]">
      <Container>
        <div className="grid gap-14 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-28">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
              Field × Satellite
            </p>

            <h2 className="mt-4 max-w-lg font-[var(--font-display)] text-5xl leading-[1.02] sm:text-6xl">
              One field. Many signals.
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-white/72">
              Earth observation can show patterns across time. Field and crop
              research explains why those patterns matter for a decision on the
              ground.
            </p>
          </div>

          <div className="border-t border-white/25">
            {signals.map((signal, index) => {
              const Icon = signal.icon;

              return (
                <article
                  key={signal.label}
                  className="grid gap-5 border-b border-white/20 py-7 sm:grid-cols-[4rem_1fr] sm:py-9"
                >
                  <div className="flex items-center gap-3 sm:block">
                    <Icon
                      size={25}
                      strokeWidth={1.5}
                      className="text-[var(--color-blue-500)]"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-semibold tracking-[0.14em] text-white/50 sm:mt-4 sm:block">
                      0{index + 1}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                      {signal.label}
                    </p>
                    <h3 className="mt-2 font-[var(--font-display)] text-3xl leading-tight">
                      {signal.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
                      {signal.description}
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
