import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="bg-[var(--color-earth-blue)] text-[var(--color-on-dark)]">
      <Container>
        <div className="flex flex-col justify-between gap-6 py-10 sm:flex-row sm:items-end lg:py-12">
          <div>
            <p className="font-[var(--font-display)] text-2xl">
              Next Season
            </p>

            <p className="mt-2 text-sm text-white/70">
              Plan what comes next.
            </p>
          </div>

          <p className="max-w-xs text-sm text-white/65 sm:text-right">
            Climate-aware agricultural exploration
          </p>
        </div>
      </Container>
    </footer>
  );
}
