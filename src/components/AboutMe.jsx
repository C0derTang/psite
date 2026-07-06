import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { aboutMeConfig } from "../constants";
import Reveal from "./Reveal";

// Rotating role showcase — auto-advances, pauses while the user is choosing.
export default function AboutMe() {
  const { roles, pauseBetweenRoles } = aboutMeConfig;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), pauseBetweenRoles);
    return () => clearInterval(id);
  }, [paused, roles.length, pauseBetweenRoles]);

  const role = roles[index];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24" id="about">
      <Reveal>
        <p className="eyebrow">01 — About</p>
        <h2 className="section-title">Five jobs, one person</h2>
      </Reveal>

      <Reveal delay={120}>
        <div
          className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1" role="tablist" aria-label="Roles">
            {roles.map((r, i) => (
              <button
                key={r.title}
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={`rounded-lg px-4 py-2.5 text-left font-[var(--font-display)] text-[15px] font-medium transition-colors ${
                  i === index
                    ? "bg-[var(--accent-soft)] text-[var(--text)]"
                    : "text-[var(--faint)] hover:text-[var(--muted)]"
                }`}
              >
                <span
                  className={`mr-3 font-[var(--font-mono)] text-[10px] ${
                    i === index ? "text-[var(--accent)]" : ""
                  }`}
                >
                  0{i + 1}
                </span>
                {r.title.replace(/^an? /, "")}
              </button>
            ))}
          </div>

          <div className="card grid gap-0 overflow-hidden sm:grid-cols-[220px_1fr]">
            <div className="img-frame !rounded-none !border-0 max-sm:h-48">
              <img key={role.image} src={role.image} alt={role.title} />
            </div>
            <div className="flex flex-col justify-between gap-6 p-7">
              <div>
                <h3 className="m-0 text-xl font-semibold">
                  I am <span className="text-[var(--accent)]">{role.title}</span>
                </h3>
                <p className="mb-0 mt-3 text-[var(--muted)]">{role.description}</p>
              </div>
              <Link to={`/projects?filter=${role.projectCategory}`} className="tlink self-start">
                See {role.projectCategory} projects →
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
