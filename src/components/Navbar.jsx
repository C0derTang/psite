import { NavLink, Link } from "react-router-dom";
import { navLinks, profile } from "../constants";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[rgba(11,13,16,0.8)] backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-baseline gap-3 no-underline">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--accent)] font-[var(--font-display)] text-sm font-bold text-white">
            CT
          </span>
          <span className="hidden font-[var(--font-mono)] text-xs tracking-[0.18em] text-[var(--muted)] sm:inline">
            {profile.name.toUpperCase()}
          </span>
        </Link>
        <nav className="flex items-center gap-6 sm:gap-8" aria-label="Main">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {link.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
