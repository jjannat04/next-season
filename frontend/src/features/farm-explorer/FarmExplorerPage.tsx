import { ArrowRight, MapPinned } from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "../../components/ui/Container";
import { FarmMap } from "../../components/map/FarmMap";
import { FarmHeroImage } from "../../components/photography/FarmHeroImage";
import { getFarm } from "../../services/data";

export function FarmExplorerPage() {
  const farm = getFarm();

  return (
    <div>
      {/* Header */}
      <section className="border-b border-[var(--color-border)]">
        <Container>
          <div className="max-w-3xl py-16 lg:py-20">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-green-700)]">
              Explore a farm
            </p>

            <h1 className="mt-4 font-[var(--font-display)] text-5xl leading-tight sm:text-6xl">
              Start with the field.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-ink-muted)] sm:text-lg">
              Explore the demonstration region and begin with the
              environmental conditions surrounding the farm.
            </p>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section>
        <Container>
          <div className="py-10 lg:py-14">
            <FarmMap />
          </div>

          {/* Farm summary */}
          <div className="grid gap-px overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-3">
            <div className="bg-[var(--color-background)] p-6">
              <MapPinned
                size={20}
                className="text-[var(--color-green-700)]"
              />

              <p className="mt-6 text-xs uppercase tracking-[0.15em] text-[var(--color-ink-subtle)]">
                Location
              </p>

              <p className="mt-1 font-[var(--font-display)] text-2xl">
                {farm.location.district}
              </p>
            </div>

            <div className="bg-[var(--color-background)] p-6">
              <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-ink-subtle)]">
                Region
              </p>

              <p className="mt-1 font-[var(--font-display)] text-2xl">
                {farm.name}
              </p>
            </div>

            <div className="bg-[var(--color-background)] p-6">
              <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-ink-subtle)]">
                Next
              </p>

              <Link
                to="/intelligence"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-green-800)] hover:text-[var(--color-green-900)]"
              >
                View farm intelligence
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Field context + photography */}
          <div className="mt-px grid border border-[var(--color-border)] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="border-b border-[var(--color-border)] p-7 lg:border-b-0 lg:border-r lg:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                Field context
              </p>

              <h2 className="mt-3 font-[var(--font-display)] text-3xl">
                A closer look at the selected farm.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--color-ink-muted)]">
                Combine the farm location with climate, vegetation,
                and soil signals to understand the conditions
                surrounding the field.
              </p>

              <Link
                to="/intelligence"
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-green-800)] hover:text-[var(--color-green-900)]"
              >
                View farm intelligence
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="p-5 lg:p-7">
              <FarmHeroImage
                src="/images/farm-hero.jpg"
                alt="Cultivated agricultural field"
                eyebrow="Selected farm"
                caption="Photography is contextual — environmental data provides the deeper field view."
              />
            </div>
          </div>

          <div className="h-16" />
        </Container>
      </section>
    </div>
  );
}
