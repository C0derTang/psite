import { useEffect } from "react";
import { nodeById } from "./data";

export default function NodePanel({ nodeId, onSelect }) {
  const node = nodeById.get(nodeId);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onSelect(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSelect]);

  if (!node) return null;
  const { panel } = node;

  return (
    <aside
      key={node.id}
      className="glass-panel fixed z-20 flex flex-col max-lg:inset-x-3 max-lg:bottom-3 max-lg:max-h-[52vh] lg:right-6 lg:top-1/2 lg:max-h-[86vh] lg:w-[380px] lg:-translate-y-1/2"
      aria-label={`Details: ${node.label}`}
    >
      <header className="flex items-start justify-between gap-4 border-b border-[var(--line)] p-5 pb-4">
        <div>
          <p className="m-0 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em]" style={{ color: node.color }}>
            {panel.eyebrow}
          </p>
          <h2 className="m-0 mt-1.5 text-lg font-semibold leading-snug">{panel.title}</h2>
          {panel.date && (
            <p className="m-0 mt-1 font-[var(--font-mono)] text-[11px] text-[var(--faint)]">{panel.date}</p>
          )}
        </div>
        <button
          onClick={() => onSelect(null)}
          aria-label="Close panel"
          className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-lg border border-[var(--line-strong)] bg-transparent text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          ✕
        </button>
      </header>

      <div className="min-h-0 overflow-y-auto p-5">
        {panel.image && (
          <div className="img-frame mb-4 max-h-40 overflow-hidden">
            <img src={panel.image} alt={panel.title} loading="lazy" />
          </div>
        )}
        <p className="m-0 text-[14px] text-[var(--muted)]">{panel.body}</p>

        {panel.bullets && (
          <ul className="mt-3 flex list-none flex-col gap-1.5 p-0 text-[13px] text-[var(--muted)]">
            {panel.bullets.map((b, i) => (
              <li key={i} className="relative pl-4">
                <span className="absolute left-0 top-[0.62em] h-px w-2" style={{ background: node.color }} />
                {b}
              </li>
            ))}
          </ul>
        )}

        {panel.links?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {panel.links.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="tlink">
                {l.label} ↗
              </a>
            ))}
          </div>
        )}

        {panel.footnote && (
          <p className="mb-0 mt-4 font-[var(--font-mono)] text-[10.5px] leading-relaxed text-[var(--faint)]">
            {panel.footnote}
          </p>
        )}

        <div className="mt-5 border-t border-[var(--line)] pt-4">
          <p className="m-0 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--faint)]">
            Linked
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {node.neighbors.map((id) => {
              const n = nodeById.get(id);
              return (
                <button
                  key={id}
                  onClick={() => onSelect(id)}
                  className="chip"
                  style={{ borderColor: `${n.color}55`, color: n.color }}
                >
                  {n.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
