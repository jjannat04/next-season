import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <Container>
        <div className="flex flex-col justify-between gap-4 py-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-[var(--font-display)] text-xl">
              Next Season
            </p>

            <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
              Plan what comes next.
            </p>
          </div>

          <p className="text-xs text-[var(--color-ink-subtle)]">
            Climate-aware agricultural exploration
          </p>
        </div>
      </Container>
    </footer>
  );
}