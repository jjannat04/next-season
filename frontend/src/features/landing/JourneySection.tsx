import {
  ArrowRight,
  Compass,
  GitCompareArrows,
  SlidersHorizontal,
} from "lucide-react";

import { Container } from "../../components/ui/Container";

const journeySteps = [
  {
    number: "01",
    icon: Compass,
    title: "Understand your field",
    description:
      "Explore climate, vegetation, soil, and location signals surrounding the farm.",
    link: "/explore",
    action: "Explore a farm",
  },
  {
    number: "02",
    icon: GitCompareArrows,
    title: "Explore crop rotations",
    description:
      "Start with the current crop and examine evidence-backed possibilities for the next season.",
    link: "/rotation",
    action: "Explore rotations",
  },
  {
    number: "03",
    icon: SlidersHorizontal,
    title: "Test possible futures",
    description:
      "Change environmental assumptions and see how different scenarios affect the context.",
    link: "/scenarios",
    action: "Open scenario lab",
  },
];

export function JourneySection() {
  return (
    <section className="border-b border-[var(--color-border)]">
      <Container>
        <div className="py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-green-700)]">
              How it works
            </p>

            <h2 className="mt-4 font-[var(--font-display)] text-4xl leading-tight sm:text-5xl">
              Explore before you decide.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-ink-muted)]">
              Move from understanding the field to exploring
              possibilities and testing different conditions.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)] lg:grid-cols-3">
            {journeySteps.map((step) => {
              const Icon = step.icon;

              return (
                <a
                  key={step.number}
                  href={step.link}
                  className="group bg-[var(--color-background)] p-7 transition-colors duration-[var(--duration-normal)] hover:bg-[var(--color-surface)] lg:p-9"
                >
                  <div className="flex items-center justify-between">
                    <Icon
                      size={22}
                      strokeWidth={1.5}
                      className="text-[var(--color-green-700)]"
                    />

                    <span className="text-xs font-medium tracking-[0.14em] text-[var(--color-ink-subtle)]">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-14 font-[var(--font-display)] text-2xl">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-[var(--color-ink-muted)]">
                    {step.description}
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-sm font-medium text-[var(--color-green-800)]">
                    {step.action}

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}