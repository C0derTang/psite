import { useSearchParams } from "react-router-dom";
import { projectsData } from "../constants";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "student", label: "Student" },
  { id: "teacher", label: "Teacher" },
  { id: "engineer", label: "Engineer" },
  { id: "programmer", label: "Programmer" },
  { id: "storyteller", label: "Storyteller" },
];

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const filter = params.get("filter") || "all";
  const filtered =
    filter === "all" ? projectsData : projectsData.filter((p) => p.category === filter);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
      <Reveal>
        <p className="eyebrow">Portfolio</p>
        <h1 className="section-title">Projects</h1>
        <p className="mt-3 max-w-xl text-[var(--muted)]">
          Everything here was built, taught, solved, or said out loud on a stage.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`chip ${filter === f.id ? "active" : ""}`}
              onClick={() => setParams(f.id === "all" ? {} : { filter: f.id })}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project, i) => (
          <Reveal key={project.id} delay={Math.min(i * 60, 240)} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
