import { Link } from "react-router-dom";
import { navLinks, profile } from "../constants";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-10">
        <div>
          <p className="m-0 font-[var(--font-display)] font-semibold">{profile.name}</p>
          <p className="m-0 mt-1 font-[var(--font-mono)] text-[11px] text-[var(--faint)]">
            © 2026 · Built with React and an irresponsible amount of caffeine
          </p>
        </div>
        <nav className="flex gap-6" aria-label="Footer">
          {navLinks.map((l) => (
            <Link key={l.id} to={l.path} className="tlink !border-0">
              {l.title}
            </Link>
          ))}
          <a href={profile.github} target="_blank" rel="noreferrer" className="tlink !border-0">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="tlink !border-0">LinkedIn</a>
        </nav>
      </div>
    </footer>
  );
}
