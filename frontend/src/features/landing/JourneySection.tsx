import { Compass, GitCompareArrows, SlidersHorizontal } from "lucide-react";

import { Container } from "../../components/ui/Container";

const journeySteps = [
  {
    number: "01",
    icon: Compass,
    title: "Read the field",
    description:
      "Bring climate history, vegetation, soil, and location signals into view.",
  },
  {
    number: "02",
    icon: GitCompareArrows,
    title: "Explore rotations",
    description:
      "Examine sourced crop transitions and the evidence basis behind each relationship.",
  },
  {
    number: "03",
    icon: SlidersHorizontal,
    title: "Stress-test and compare",
    description:
      "Change environmental assumptions and compare how possible futures alter the context.",
  },
];

export function JourneySection() {
  return (
    <section className="border-b border-[var(--color-border)]">
      <Container>
        <div className="py-20 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-green-700)]">
                How Next Season works
              </p>

              <h2 className="mt-4 font-[var(--font-display)] text-4xl leading-tight sm:text-5xl">
                Explore before you decide.
              </h2>
            </div>

            <p className="max-w-xl text-base leading-7 text-[var(--color-ink-muted)] lg:justify-self-end">
              Move from a field-level reading to evidence-backed possibilities,
              then compare how changing conditions affect the picture.
            </p>
          </div>

          <ol className="mt-14 grid border-t border-[var(--color-border-strong)] lg:grid-cols-3">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <li
                  key={step.number}
                  className={`py-8 lg:px-8 lg:py-10 ${
                    index > 0
                      ? "border-t border-[var(--color-border)] lg:border-l lg:border-t-0"
                      : "lg:pl-0"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon
                      size={23}
                      strokeWidth={1.5}
                      className="text-[var(--color-green-700)]"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-semibold tracking-[0.14em] text-[var(--color-ink-subtle)]">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-10 font-[var(--font-display)] text-3xl leading-tight">
                    {step.title}
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--color-ink-muted)]">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
