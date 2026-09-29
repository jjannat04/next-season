import {
  Droplets,
  Leaf,
  Mountain,
  ThermometerSun,
} from "lucide-react";
import { ClimateChart } from "../../components/charts/ClimateChart";
import { VegetationChart } from "../../components/charts/VegetationChart";
import { Container } from "../../components/ui/Container";
import {
  getClimateData,
  getFarm,
  getSoilProfile,
  getVegetationData,
} from "../../services/data";

export function FarmIntelligencePage() {
  const farm = getFarm();
  const climate = getClimateData();
  const soil = getSoilProfile();
  const vegetation = getVegetationData();

  const latestClimate = climate.at(-1);
  const latestVegetation = vegetation.at(-1);

  // Safe values for optional data fields.
  // Real datasets may contain missing observations.
  const temperature = latestClimate?.temperature ?? 0;
  const rainfall = latestClimate?.rainfall ?? 0;

  const ndvi = latestVegetation?.ndvi ?? 0;
  const evi = latestVegetation?.evi ?? 0;

  const soilPh = soil.ph ?? 0;
  const organicMatter = soil.organicMatter ?? 0;

  return (
    <div>
      {/* Header */}
      <section className="border-b border-[var(--color-border)]">
        <Container>
          <div className="py-16 lg:py-20">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-green-700)]">
              Farm intelligence
            </p>

            <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <h1 className="font-[var(--font-display)] text-5xl leading-tight sm:text-6xl">
                  Read the field.
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-ink-muted)] sm:text-lg">
                  A snapshot of the environmental conditions shaping
                  the selected farm.
                </p>
              </div>

              <div className="lg:text-right">
                <p className="text-sm font-medium text-[var(--color-ink)]">
                  {farm.name}
                </p>

                <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                  {farm.location.district}, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Environmental signals */}
      <section>
        <Container>
          <div className="py-12 lg:py-16">
            <div className="grid gap-px overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2">
              {/* Climate */}
              <article className="bg-[var(--color-background)] p-7 lg:p-9">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ThermometerSun
                      size={21}
                      strokeWidth={1.5}
                      className="text-[var(--color-green-700)]"
                    />

                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                      Climate
                    </span>
                  </div>

                  <span className="rounded-full bg-[var(--color-surface-muted)] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-subtle)]">
                    Demo
                  </span>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-[var(--color-ink-subtle)]">
                      Temperature
                    </p>

                    <p className="mt-2 font-[var(--font-display)] text-4xl">
                      {temperature.toFixed(1)}°
                    </p>

                    <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                      Latest observation
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[var(--color-ink-subtle)]">
                      Rainfall
                    </p>

                    <p className="mt-2 font-[var(--font-display)] text-4xl">
                      {rainfall.toFixed(0)}
                      <span className="ml-1 text-lg">mm</span>
                    </p>

                    <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                      Monthly precipitation
                    </p>
                  </div>
                </div>
              </article>

              {/* Vegetation */}
              <article className="bg-[var(--color-background)] p-7 lg:p-9">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Leaf
                      size={21}
                      strokeWidth={1.5}
                      className="text-[var(--color-green-700)]"
                    />

                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                      Vegetation
                    </span>
                  </div>

                  <span className="rounded-full bg-[var(--color-surface-muted)] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-subtle)]">
                    Demo
                  </span>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-[var(--color-ink-subtle)]">
                      NDVI
                    </p>

                    <p className="mt-2 font-[var(--font-display)] text-4xl">
                      {ndvi.toFixed(2)}
                    </p>

                    <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                      Vegetation signal
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[var(--color-ink-subtle)]">
                      EVI
                    </p>

                    <p className="mt-2 font-[var(--font-display)] text-4xl">
                      {evi.toFixed(2)}
                    </p>

                    <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                      Enhanced vegetation signal
                    </p>
                  </div>
                </div>
              </article>
            </div>
            {/* Climate timeline */}
<article className="mt-px border border-[var(--color-border)] bg-[var(--color-background)] p-7 lg:p-9">
  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
        Climate timeline
      </p>

      <h2 className="mt-3 font-[var(--font-display)] text-3xl">
        How conditions have been changing
      </h2>

      <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-ink-muted)]">
        Temperature and rainfall observations provide context for
        understanding the conditions surrounding the farm.
      </p>
    </div>

    <span className="rounded-full bg-[var(--color-surface-muted)] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-subtle)]">
      Demo data
    </span>
  </div>

  <div className="mt-10">
    <ClimateChart data={climate} />
  </div>

  <div className="mt-5 flex flex-wrap gap-5 border-t border-[var(--color-border)] pt-4">
    <div className="flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
      <span className="h-2 w-2 rounded-full bg-[var(--color-earth-600)]" />
      Temperature
    </div>

    <div className="flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
      <span className="h-2 w-2 rounded-full bg-[var(--color-blue-600)]" />
      Rainfall
    </div>
  </div>
</article>

{/* Vegetation timeline */}
<article className="mt-px border border-[var(--color-border)] bg-[var(--color-background)] p-7 lg:p-9">
  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
        Vegetation timeline
      </p>

      <h2 className="mt-3 font-[var(--font-display)] text-3xl">
        Watch the field change
      </h2>

      <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-ink-muted)]">
        Vegetation indices provide another view of how field
        conditions evolve through time.
      </p>
    </div>

    <span className="rounded-full bg-[var(--color-surface-muted)] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-subtle)]">
      Demo data
    </span>
  </div>

  <div className="mt-10">
    <VegetationChart data={vegetation} />
  </div>

  <div className="mt-5 flex flex-wrap gap-5 border-t border-[var(--color-border)] pt-4">
    <div className="flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
      <span className="h-2 w-2 rounded-full bg-[var(--color-green-700)]" />
      NDVI
    </div>

    <div className="flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
      <span className="h-2 w-2 rounded-full bg-[var(--color-green-600)]" />
      EVI
    </div>
  </div>
</article>
            {/* Soil */}
            <article className="mt-px border border-[var(--color-border)] bg-[var(--color-background)] p-7 lg:p-9">
              <div className="flex items-center gap-3">
                <Mountain
                  size={21}
                  strokeWidth={1.5}
                  className="text-[var(--color-earth-600)]"
                />

                <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                  Soil conditions
                </span>
              </div>

              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs text-[var(--color-ink-subtle)]">
                    Soil type
                  </p>

                  <p className="mt-2 text-lg font-medium">
                    {soil.soilType}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[var(--color-ink-subtle)]">
                    pH
                  </p>

                  <p className="mt-2 font-[var(--font-display)] text-3xl">
                    {soilPh.toFixed(1)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[var(--color-ink-subtle)]">
                    Organic matter
                  </p>

                  <p className="mt-2 font-[var(--font-display)] text-3xl">
                    {organicMatter.toFixed(1)}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[var(--color-ink-subtle)]">
                    Drainage
                  </p>

                  <p className="mt-2 text-lg font-medium capitalize">
                    {soil.drainage}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex items-start gap-3 border-t border-[var(--color-border)] pt-5">
                <Droplets
                  size={17}
                  className="mt-0.5 text-[var(--color-blue-600)]"
                />

                <p className="max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
                  These conditions provide context for exploring which
                  crop transitions may fit the field in the next season.
                </p>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </div>
  );
}