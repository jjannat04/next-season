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
    <header className="border-b border-white/10 bg-[var(--color-forest)] text-[var(--color-on-dark)]">
      <div className="mx-auto flex min-h-20 max-w-[var(--content-width)] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Brand */}
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-baseline gap-3 focus-visible:outline-[var(--color-amber-500)]"
          aria-label="Next Season home"
        >
          <span className="font-[var(--font-display)] text-[1.75rem] leading-none">
            Next Season
          </span>

          <span className="hidden text-[11px] uppercase tracking-[0.16em] text-white/60 sm:inline">
            Plan what comes next.
          </span>
        </NavLink>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:block"
        >
          <ul className="flex items-center gap-1">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "border-b-2 px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "border-[var(--color-amber-500)] text-white"
                        : "border-transparent text-white/65 hover:text-white",
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
          className="rounded-[var(--radius-sm)] p-2 text-[var(--color-on-dark)] hover:bg-white/10 lg:hidden"
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
          className="border-t border-white/10 lg:hidden"
        >
          <ul className="px-5 py-3 sm:px-8">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      "block border-l-2 px-4 py-3 text-base",
                      isActive
                        ? "border-[var(--color-amber-500)] font-medium text-white"
                        : "border-transparent text-white/70 hover:text-white",
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
