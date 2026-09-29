import { Outlet } from "react-router-dom";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function AppShell() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-ink)]">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}