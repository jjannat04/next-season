import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const navigationItems = [
  { label: "Explore", path: "/explore" },
  { label: "Intelligence", path: "/intelligence" },
  { label: "Rotation", path: "/rotation" },
  { label: "Scenarios", path: "/scenarios" },
  { label: "Compare", path: "/compare" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
      <div className="mx-auto flex min-h-18 max-w-[1440px] items-center justify-between px-6">
        {/* Brand */}
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-baseline gap-2"
          aria-label="Next Season home"
        >
          <span className="font-[var(--font-display)] text-2xl leading-none">
            Next Season
          </span>

          <span className="hidden text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)] sm:inline">
            Plan what comes next.
          </span>
        </NavLink>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:block"
        >
          <ul className="flex items-center gap-1">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "text-[var(--color-green-800)]"
                        : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-[var(--radius-md)] p-2 text-[var(--color-ink)] md:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[var(--color-border)] md:hidden"
        >
          <ul className="px-6 py-3">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      "block border-b border-[var(--color-border)] py-4 text-sm",
                      isActive
                        ? "font-medium text-[var(--color-green-800)]"
                        : "text-[var(--color-ink-muted)]",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}