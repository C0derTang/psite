import { useEffect, useRef, useState } from "react";
import { technologies, profile } from "../constants";
import Reveal from "./Reveal";

export default function Technologies() {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24">
      <Reveal>
        <p className="eyebrow">02 — Toolbox</p>
        <h2 className="section-title">Technologies</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {profile.topSkills.map((s) => (
            <span key={s} className="chip chip-static active">{s}</span>
          ))}
          <span className="chip chip-static">LinkedIn-certified top skills</span>
        </div>
      </Reveal>

      <div ref={ref} className="mt-10 grid gap-x-12 gap-y-6 sm:grid-cols-2">
        {technologies.map((tech, i) => {
          const gag = tech.proficiency < 1;
          return (
            <Reveal key={tech.name} delay={Math.min(i * 40, 300)}>
              <div className="flex items-baseline justify-between">
                <span className={`font-[var(--font-display)] text-[15px] font-medium ${gag ? "text-[var(--faint)]" : ""}`}>
                  {tech.name}
                </span>
                <span className="font-[var(--font-mono)] text-[11px] text-[var(--faint)]">
                  {gag ? "p = 0.0067" : `${tech.proficiency}%`}
                </span>
              </div>
              <div className="bar-track mt-2">
                <div
                  className="bar-fill"
                  style={{ width: animate ? `${Math.max(tech.proficiency, 0.7)}%` : 0 }}
                />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
