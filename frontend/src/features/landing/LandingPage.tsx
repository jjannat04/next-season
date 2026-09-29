import { ArrowRight } from "lucide-react";
import { Container } from "../../components/ui/Container";
import { SignalOverview } from "./SignalOverview";
import { JourneySection } from "./JourneySection";


import { FarmHeroImage } from "../../components/photography/FarmHeroImage";

export function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[var(--color-border)]">
  <Container>
    <div className="grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:py-20">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-green-700)]">
          Climate-aware agriculture
        </p>

        <h1 className="mt-5 max-w-4xl font-[var(--font-display)] text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
          Plan what comes next.
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--color-ink-muted)] sm:text-lg">
          Next Season brings climate, vegetation, soil, and crop
          evidence together so you can explore what different
          growing seasons could look like.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="/explore"
            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-green-800)] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-green-900)]"
          >
            Explore a farm
            <ArrowRight size={16} />
          </a>

          <a
            href="/rotation"
            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface)]"
          >
            Explore rotations
          </a>
        </div>
      </div>

      <div>
        <FarmHeroImage
          src="/images/farm-hero.jpg"
          alt="Agricultural field viewed across a cultivated landscape"
          eyebrow="Field observation"
          caption="A field is shaped by more than the crop growing on it."
        />
      </div>
    </div>
  </Container>
</section>

      {/* Story */}
      <section id="story" className="border-b border-[var(--color-border)]">
        <Container>
          <div className="grid gap-12 py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:py-28">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-green-700)]">
                Why Next Season
              </p>

              <h2 className="mt-4 max-w-md font-[var(--font-display)] text-4xl leading-tight text-[var(--color-ink)] sm:text-5xl">
                The next crop begins with understanding the current season.
              </h2>
            </div>

            <div className="max-w-2xl">
              <p className="text-lg leading-8 text-[var(--color-ink)]">
                Farms are shaped by changing conditions. Rainfall,
                temperature, soil, vegetation, and water availability
                all influence what becomes possible next.
              </p>

              <p className="mt-6 text-base leading-7 text-[var(--color-ink-muted)]">
                Next Season brings these signals together so farmers can
                explore their field, understand what is changing, and
                compare possible crop rotations before making a decision.
              </p>

              <div className="mt-9">
                <a
                  href="/explore"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-green-800)] transition-colors hover:text-[var(--color-green-900)]"
                >
                  Start with a farm
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <SignalOverview />
      <JourneySection />
    </div>
  );
}