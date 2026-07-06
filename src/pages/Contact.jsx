import { useState } from "react";
import { profile } from "../constants";
import Reveal from "../components/Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section className="dotfield flex min-h-screen flex-col justify-center pt-16">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.2rem,5.5vw,3.8rem)] font-bold leading-[1.05]">
            Let's build something that ships<span className="text-[var(--accent)]">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[var(--muted)]">
            Open to research, internships, collaborations, and arguments about whether math or CS
            is the superior major. Based in {profile.location.split(",")[0]}, headed to Stanford.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button onClick={copyEmail} className="btn btn-solid">
              {copied ? "Copied ✓" : profile.email}
            </button>
            <a href={`mailto:${profile.email}`} className="btn">Open mail app</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn">LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn">GitHub</a>
          </div>
          <p className="mt-8 font-[var(--font-mono)] text-[11px] text-[var(--faint)]">
            Median response time: faster than a USACO judge queue.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
