import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { aboutMeConfig, profile } from "../constants";

const STATS = [
  { value: "3x", label: "VEX Worlds qualifier" },
  { value: "100+", label: "students taught" },
  { value: "990+", label: "extension installs" },
  { value: "Top 16", label: "Science Bowl nationals" },
];

// Types each role out, holds, then deletes and moves to the next.
function useTypewriter(words, speed, pause) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let timeout;
    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? speed / 2.5 : speed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

export default function Hero() {
  const roles = aboutMeConfig.roles.map((r) => r.title);
  const typed = useTypewriter(roles, aboutMeConfig.typingSpeed, aboutMeConfig.pauseBetweenRoles);

  return (
    <section className="dotfield relative flex min-h-screen flex-col justify-center overflow-hidden pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 h-[480px] w-[480px] rounded-full bg-[var(--accent)] opacity-[0.07] blur-[130px]"
      />
      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <p className="eyebrow">Houston, TX → Stanford, CA</p>
        <h1 className="mt-6 text-[clamp(2.8rem,7.5vw,5.4rem)] font-bold leading-[1.02]">
          {profile.name}
          <span className="text-[var(--accent)]">.</span>
        </h1>
        <p className="mt-4 font-[var(--font-display)] text-[clamp(1.25rem,3vw,1.9rem)] font-medium text-[var(--muted)]">
          I am <span className="text-[var(--text)]">{typed}</span>
          <span className="caret" aria-hidden="true" />
        </p>
        <p className="mt-5 max-w-xl text-[var(--muted)]">
          {profile.headline}. I build robots, train neural networks, teach kids to do both, and
          occasionally give TED talks about why finishing things doesn't make you happy.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/projects" className="btn btn-solid">View projects</Link>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn">LinkedIn</a>
        </div>

        <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col border-l border-[var(--line-strong)] pl-4">
              <dt className="order-2 font-[var(--font-mono)] text-[10.5px] uppercase tracking-[0.14em] text-[var(--faint)]">
                {s.label}
              </dt>
              <dd className="m-0 font-[var(--font-display)] text-2xl font-semibold">{s.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-16 max-w-md font-[var(--font-mono)] text-[11px] leading-relaxed text-[var(--faint)]">
          “{profile.proverb}” — ancient proverb, also my LinkedIn summary
        </p>
      </div>
    </section>
  );
}
