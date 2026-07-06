import { experienceData } from "../constants";
import Reveal from "./Reveal";

const TYPE_COLORS = {
  Education: "text-[#e8b04b] border-[#e8b04b]",
  Internship: "text-[var(--accent)] border-[var(--accent)]",
  Research: "text-[#6fb1e8] border-[#6fb1e8]",
  "Non-profit": "text-[#7fd0a0] border-[#7fd0a0]",
};

export default function Experience() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24">
      <Reveal>
        <p className="eyebrow">03 — Track record</p>
        <h2 className="section-title">Experience</h2>
      </Reveal>

      <div className="timeline mt-12 flex flex-col gap-10 pl-10">
        {experienceData.map((exp, i) => (
          <Reveal key={exp.id} delay={Math.min(i * 60, 240)} className="relative">
            <span className="timeline-node -left-10" aria-hidden="true" />
            <article className="card grid gap-0 overflow-hidden lg:grid-cols-[1fr_200px]">
              <div className="p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`chip chip-static ${TYPE_COLORS[exp.type] || ""}`}>{exp.type}</span>
                  <span className="font-[var(--font-mono)] text-[11px] tracking-[0.08em] text-[var(--faint)]">
                    {exp.date} · {exp.location}
                  </span>
                </div>
                <h3 className="mb-0 mt-4 text-lg font-semibold">{exp.title}</h3>
                <p className="mt-1 font-[var(--font-display)] text-[15px] font-medium text-[var(--accent)]">
                  {exp.company}
                </p>
                <p className="mt-2 text-[var(--muted)]">{exp.description}</p>
                <ul className="mt-3 flex list-none flex-col gap-2 p-0 text-[14px] text-[var(--muted)]">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="relative pl-5">
                      <span className="absolute left-0 top-[0.62em] h-px w-2.5 bg-[var(--accent)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="img-frame !rounded-none !border-0 !border-l !border-[var(--line)] max-lg:hidden">
                <img src={exp.image} alt={exp.company} loading="lazy" />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
