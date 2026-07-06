const CATEGORY_LABELS = {
  student: "Student",
  teacher: "Teacher",
  engineer: "Engineer",
  programmer: "Programmer",
  storyteller: "Storyteller",
};

export default function ProjectCard({ project }) {
  const links = [
    project.github && { label: "GitHub", url: project.github },
    project.demo && { label: "Demo", url: project.demo },
    project.link && { label: "Link", url: project.link },
    project.documentation && { label: "Docs", url: project.documentation },
  ].filter(Boolean);

  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="img-frame aspect-[16/9] !rounded-none !border-0 !border-b !border-[var(--line)]">
        <img src={project.image} alt={project.title} loading="lazy" />
      </div>
      <div className="flex grow flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="chip chip-static">{CATEGORY_LABELS[project.category]}</span>
          <span className="font-[var(--font-mono)] text-[10.5px] text-[var(--faint)]">{project.date}</span>
        </div>
        <h3 className="mb-0 mt-4 text-lg font-semibold leading-snug">{project.title}</h3>
        <p className="mt-2 text-[14px] text-[var(--muted)]">{project.description}</p>
        <ul className="mt-3 flex list-none flex-col gap-1.5 p-0 text-[13.5px] text-[var(--muted)]">
          {project.features.map((f, i) => (
            <li key={i} className="relative pl-5">
              <span className="absolute left-0 top-[0.6em] h-px w-2.5 bg-[var(--accent)]" />
              {f}
            </li>
          ))}
        </ul>
        {links.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-4 pt-5">
            {links.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="tlink">
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
