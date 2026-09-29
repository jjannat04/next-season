import {
  CalendarRange,
  Database,
  Droplets,
  Leaf,
  MapPin,
  Mountain,
  Satellite,
  ThermometerSun,
} from "lucide-react";

import { ClimateChart } from "../../components/charts/ClimateChart";
import { VegetationChart } from "../../components/charts/VegetationChart";
import { Container } from "../../components/ui/Container";
import {
  getFarm,
  getMonthlyClimateDataset,
  getSoilProfile,
  getVegetationData,
  getYearlyClimateDataset,
} from "../../services/data";

export function FarmIntelligencePage() {
  const farm = getFarm();
  const monthlyClimate = getMonthlyClimateDataset();
  const yearlyClimate = getYearlyClimateDataset();
  const climate = monthlyClimate.observations;
  const soil = getSoilProfile();
  const vegetation = getVegetationData();

  const latestVegetation = vegetation.at(-1);
  const hottestMonth = climate.reduce<(typeof climate)[number] | undefined>(
    (hottest, observation) =>
      observation.temperature !== undefined &&
      (hottest?.temperature === undefined ||
        observation.temperature > hottest.temperature)
        ? observation
        : hottest,
    undefined,
  );
  const wettestMonth = climate.reduce<(typeof climate)[number] | undefined>(
    (wettest, observation) =>
      observation.rainfall !== undefined &&
      (wettest?.rainfall === undefined || observation.rainfall > wettest.rainfall)
        ? observation
        : wettest,
    undefined,
  );
  const latestYear = yearlyClimate.observations.at(-1);

  const ndvi = latestVegetation?.ndvi;
  const evi = latestVegetation?.evi;
  const soilPh = soil.ph;
  const organicMatter = soil.organicMatter;

  return (
    <div>
      <section className="border-b border-[var(--color-border)]">
        <Container>
          <div className="grid gap-10 py-14 lg:grid-cols-[1fr_auto] lg:items-end lg:py-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-green-700)]">
                Farm intelligence
              </p>

              <h1 className="mt-4 font-[var(--font-display)] text-5xl leading-tight sm:text-6xl">
                Read the field.
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-ink-muted)]">
                Climate history and field context for understanding what is
                happening around the selected farm.
              </p>
            </div>

            <div className="border-l-2 border-[var(--color-clay)] pl-5 lg:min-w-72">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]">
                Selected location · Demo
              </p>
              <p className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
                {farm.name}
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm text-[var(--color-ink-muted)]">
                <MapPin size={15} aria-hidden="true" />
                {farm.region}, {farm.location.district}, Bangladesh
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-earth-blue)] text-[var(--color-on-dark)]">
        <Container>
          <div className="py-16 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <div className="flex items-center gap-3 text-white/65">
                  <Satellite size={21} strokeWidth={1.5} aria-hidden="true" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                    NASA POWER-derived climate history
                  </p>
                </div>

                <h2 className="mt-5 max-w-xl font-[var(--font-display)] text-4xl leading-tight sm:text-5xl">
                  The seasonal pattern around the field
                </h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-white/72">
                  Average daily precipitation rises sharply from June and
                  remains elevated through October, compared with the early-year
                  period.
                </p>
              </div>

              <dl className="grid border-y border-white/20 sm:grid-cols-3">
                <div className="py-5 sm:border-r sm:border-white/20 sm:px-6">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                    Coordinates
                  </dt>
                  <dd className="mt-2 text-base font-medium">
                    {monthlyClimate.source.coordinates}
                  </dd>
                </div>
                <div className="border-t border-white/20 py-5 sm:border-r sm:border-t-0 sm:border-white/20 sm:px-6">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                    Historical period
                  </dt>
                  <dd className="mt-2 text-base font-medium">
                    {monthlyClimate.source.dataPeriod}
                  </dd>
                </div>
                <div className="border-t border-white/20 py-5 sm:border-t-0 sm:pl-6">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                    Data status
                  </dt>
                  <dd className="mt-2 text-base font-medium">Research</dd>
                </div>
              </dl>
            </div>

            <div className="mt-14 grid gap-8 border-t border-white/20 pt-10 lg:grid-cols-[0.7fr_0.7fr_1fr]">
              <div>
                <div className="flex items-center gap-2 text-white/60">
                  <ThermometerSun size={18} aria-hidden="true" />
                  <p className="text-xs font-semibold uppercase tracking-[0.12em]">
                    Hottest monthly mean
                  </p>
                </div>
                <p className="mt-3 font-[var(--font-display)] text-5xl sm:text-6xl">
                  {hottestMonth?.temperature?.toFixed(1) ?? "—"}
                  <span className="ml-1 text-2xl">°C</span>
                </p>
                <p className="mt-2 text-sm text-white/65">
                  {hottestMonth?.periodLabel ?? "Not available"}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-white/60">
                  <Droplets size={18} aria-hidden="true" />
                  <p className="text-xs font-semibold uppercase tracking-[0.12em]">
                    Wettest monthly mean
                  </p>
                </div>
                <p className="mt-3 font-[var(--font-display)] text-5xl sm:text-6xl">
                  {wettestMonth?.rainfall?.toFixed(1) ?? "—"}
                  <span className="ml-1 text-xl">mm/day</span>
                </p>
                <p className="mt-2 text-sm text-white/65">
                  {wettestMonth?.periodLabel ?? "Not available"} daily average
                </p>
              </div>

              <div className="border-t border-white/20 pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                  Latest annual context
                </p>
                <p className="mt-3 text-2xl font-medium">
                  {latestYear?.periodLabel ?? "—"}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-7 gap-y-2 text-sm text-white/70">
                  <span>
                    {latestYear?.temperature?.toFixed(1) ?? "—"} °C annual mean
                  </span>
                  <span>
                    {latestYear?.rainfall?.toFixed(0) ?? "—"} mm annual total
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-white/20 pt-10">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                    Monthly seasonal pattern
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    Monthly mean temperature and average daily precipitation
                  </p>
                </div>
                <div className="flex flex-wrap gap-5 text-xs text-white/65">
                  <span className="flex items-center gap-2">
                    <span className="h-0.5 w-5 bg-[var(--color-earth-500)]" />
                    Temperature (°C)
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-0.5 w-5 bg-[var(--color-blue-500)]" />
                    Precipitation (mm/day)
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <ClimateChart data={climate} variant="dark" />
              </div>
            </div>

            <div className="mt-8 grid gap-4 border-t border-white/20 pt-6 text-sm text-white/68 sm:grid-cols-[1fr_auto] sm:items-start">
              <p className="flex max-w-3xl items-start gap-3">
                <Database size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  Source: {monthlyClimate.source.organization} /{" "}
                  {monthlyClimate.source.datasetOrProduct}. Team-curated,
                  normalized historical CSV. Not live API data.
                </span>
              </p>
              <p className="flex items-center gap-2 sm:justify-self-end">
                <CalendarRange size={17} aria-hidden="true" />
                {monthlyClimate.source.dataPeriod}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="py-16 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
              <article>
                <div className="flex flex-col justify-between gap-5 border-b border-[var(--color-border-strong)] pb-6 sm:flex-row sm:items-end">
                  <div>
                    <div className="flex items-center gap-3 text-[var(--color-green-700)]">
                      <Leaf size={21} strokeWidth={1.5} aria-hidden="true" />
                      <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                        Vegetation signal
                      </p>
                    </div>
                    <h2 className="mt-3 font-[var(--font-display)] text-3xl">
                      Watch the field change
                    </h2>
                  </div>
                  <p className="border-l-2 border-[var(--color-amber-500)] pl-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                    Demo data
                  </p>
                </div>

                <p className="mt-5 max-w-xl text-sm leading-6 text-[var(--color-ink-muted)]">
                  Prototype vegetation-index values illustrate the intended
                  interface. They are not satellite observations for this farm.
                </p>

                <div className="mt-8">
                  <VegetationChart data={vegetation} />
                </div>

                <div className="mt-5 flex flex-wrap gap-8 border-t border-[var(--color-border)] pt-5">
                  <div>
                    <p className="text-xs text-[var(--color-ink-subtle)]">Latest demo NDVI</p>
                    <p className="mt-1 text-xl font-semibold">
                      {ndvi?.toFixed(2) ?? "Not available"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-ink-subtle)]">Latest demo EVI</p>
                    <p className="mt-1 text-xl font-semibold">
                      {evi?.toFixed(2) ?? "Not available"}
                    </p>
                  </div>
                </div>
              </article>

              <article className="border-t border-[var(--color-border-strong)] pt-6 lg:border-t-0 lg:pt-0">
                <div className="flex items-start justify-between gap-5 border-b border-[var(--color-border-strong)] pb-6">
                  <div>
                    <div className="flex items-center gap-3 text-[var(--color-earth-600)]">
                      <Mountain size={21} strokeWidth={1.5} aria-hidden="true" />
                      <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                        Soil context
                      </p>
                    </div>
                    <h2 className="mt-3 font-[var(--font-display)] text-3xl">
                      Below the surface
                    </h2>
                  </div>
                  <p className="border-l-2 border-[var(--color-amber-500)] pl-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                    Demo data
                  </p>
                </div>

                <p className="mt-5 text-sm leading-6 text-[var(--color-ink-muted)]">
                  Prototype soil values for interface exploration. No external
                  source is attached to this profile.
                </p>

                <dl className="mt-8 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
                  <div className="flex items-baseline justify-between gap-5 py-4">
                    <dt className="text-sm text-[var(--color-ink-muted)]">Soil type</dt>
                    <dd className="text-right font-medium">{soil.soilType ?? "Not available"}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-5 py-4">
                    <dt className="text-sm text-[var(--color-ink-muted)]">pH</dt>
                    <dd className="font-[var(--font-display)] text-2xl">
                      {soilPh?.toFixed(1) ?? "Not available"}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-5 py-4">
                    <dt className="text-sm text-[var(--color-ink-muted)]">Organic matter</dt>
                    <dd className="font-[var(--font-display)] text-2xl">
                      {organicMatter !== undefined
                        ? `${organicMatter.toFixed(1)}%`
                        : "Not available"}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-5 py-4">
                    <dt className="text-sm text-[var(--color-ink-muted)]">Drainage</dt>
                    <dd className="font-medium capitalize">
                      {soil.drainage ?? "Not available"}
                    </dd>
                  </div>
                </dl>

                <p className="mt-6 flex items-start gap-3 text-sm leading-6 text-[var(--color-ink-muted)]">
                  <Droplets
                    size={17}
                    className="mt-0.5 shrink-0 text-[var(--color-blue-600)]"
                    aria-hidden="true"
                  />
                  These demo conditions provide context for exploring how soil
                  information could support a future field assessment.
                </p>
              </article>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
