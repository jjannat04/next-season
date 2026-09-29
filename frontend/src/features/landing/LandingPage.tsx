import { ArrowRight, Database, MapPin, Satellite } from "lucide-react";
import { Link } from "react-router-dom";

import { FarmHeroImage } from "../../components/photography/FarmHeroImage";
import { Container } from "../../components/ui/Container";
import { getMonthlyClimateDataset } from "../../services/data/climateService";
import { JourneySection } from "./JourneySection";
import { SignalOverview } from "./SignalOverview";

export function LandingPage() {
  const climateSource = getMonthlyClimateDataset().source;

  return (
    <div>
      <section className="border-b border-[var(--color-border)]">
        <Container>
          <div className="grid gap-12 py-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16 lg:py-20">
            <div className="lg:py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-green-700)]">
                Field decisions, informed by Earth observation
              </p>

              <h1 className="mt-5 max-w-3xl font-[var(--font-display)] text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
                Plan what comes next.
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--color-ink-muted)]">
                Next Season brings climate history, field signals, and crop
                research together to help explore what a changing season could
                mean for the next crop.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-green-800)] px-5 py-3 text-sm font-semibold !text-[var(--color-on-dark)] shadow-[var(--shadow-control)] transition-colors hover:bg-[var(--color-green-900)]"
                >
                  Explore a farm
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/intelligence"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-green-700)]"
                >
                  View field intelligence
                </Link>
              </div>
            </div>

            <div>
              <FarmHeroImage
                src="/images/farm-hero.jpg"
                alt="Agricultural field viewed across a cultivated landscape"
                eyebrow="Field observation"
                caption="Cultivated land in a climate-sensitive coastal agricultural landscape."
                layout="editorial"
              />

              <dl className="grid border-x border-b border-[var(--color-border)] bg-[var(--color-surface)] sm:grid-cols-3">
                <div className="px-5 py-4 sm:border-r sm:border-[var(--color-border)]">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-subtle)]">
                    <Satellite size={15} aria-hidden="true" />
                    Earth observation
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-[var(--color-ink)]">
                    {climateSource.datasetOrProduct}-derived climate history
                  </dd>
                </div>

                <div className="border-t border-[var(--color-border)] px-5 py-4 sm:border-r sm:border-t-0 sm:border-[var(--color-border)]">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-subtle)]">
                    <MapPin size={15} aria-hidden="true" />
                    Prototype focus
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-[var(--color-ink)]">
                    Polder 30, Khulna
                  </dd>
                </div>

                <div className="border-t border-[var(--color-border)] px-5 py-4 sm:border-t-0">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-subtle)]">
                    <Database size={15} aria-hidden="true" />
                    Climate record
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-[var(--color-ink)]">
                    {climateSource.coordinates} · {climateSource.dataPeriod}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section id="story" className="border-b border-[var(--color-border)]">
        <Container>
          <div className="grid gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:py-28">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-green-700)]">
                Why the next crop is harder to choose
              </p>

              <h2 className="mt-4 max-w-lg font-[var(--font-display)] text-4xl leading-tight text-[var(--color-ink)] sm:text-5xl">
                The season leaves evidence behind.
              </h2>
            </div>

            <div className="max-w-2xl border-l-2 border-[var(--color-clay)] pl-6 sm:pl-9">
              <p className="text-xl leading-8 text-[var(--color-ink)]">
                Rainfall timing, heat, soil conditions, vegetation, and water
                availability can shift what is practical after harvest.
              </p>

              <p className="mt-6 text-base leading-7 text-[var(--color-ink-muted)]">
                Next Season is a decision-support prototype. It brings observed
                climate history and grounded crop and rotation research into one
                place, so possible transitions can be explored without reducing
                a field to a single score.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <SignalOverview />
      <JourneySection />
    </div>
  );
}
