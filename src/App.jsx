import { useCallback, useEffect, useState } from "react";
import GraphView from "./graph/GraphView";
import NodePanel from "./graph/NodePanel";
import { nodeById } from "./graph/data";
import { profile } from "./constants";

function initialNode() {
  const id = window.location.hash.slice(1);
  return nodeById.has(id) ? id : null;
}

function App() {
  const [selectedId, setSelectedId] = useState(initialNode);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // hash <-> selection sync (shareable deep links, back-button travel)
  const select = useCallback((id) => {
    setSelectedId(id);
    const hash = id ? `#${id}` : window.location.pathname;
    if (window.location.hash !== (id ? `#${id}` : "")) {
      history.pushState(null, "", hash);
    }
  }, []);

  useEffect(() => {
    const onPop = () => {
      const id = window.location.hash.slice(1);
      setSelectedId(nodeById.has(id) ? id : null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <div className="dotfield fixed inset-0 overflow-hidden">
      <GraphView selectedId={selectedId} onSelect={select} reducedMotion={reducedMotion} />

      {/* top-left: identity + fly home */}
      <button
        onClick={() => select("me")}
        className="fixed left-5 top-5 z-30 flex cursor-pointer items-center gap-3 border-0 bg-transparent p-0 text-left"
        aria-label="Fly to the Christopher Tang node"
      >
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--accent)] font-[var(--font-display)] text-sm font-bold text-white">
          CT
        </span>
        <span className="max-sm:hidden">
          <span className="block font-[var(--font-display)] text-sm font-semibold leading-tight text-[var(--text)]">
            {profile.name}
          </span>
          <span className="block font-[var(--font-mono)] text-[10px] tracking-[0.12em] text-[var(--faint)]">
            {profile.headline.toUpperCase()}
          </span>
        </span>
      </button>

      {/* top-right: external links */}
      <nav className="fixed right-5 top-5 z-30 flex gap-2" aria-label="External links">
        <a href={profile.github} target="_blank" rel="noreferrer" className="chip">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="chip">LinkedIn</a>
        <a href={`mailto:${profile.email}`} className="chip">Email</a>
      </nav>

      {/* bottom-left: hint */}
      <p className="pointer-events-none fixed bottom-5 left-5 z-30 m-0 font-[var(--font-mono)] text-[10.5px] tracking-[0.1em] text-[var(--faint)] max-sm:hidden">
        CLICK A NODE · DRAG TO FLING · SCROLL TO ZOOM · ESC TO RESET
      </p>

      <NodePanel nodeId={selectedId} onSelect={select} />
    </div>
  );
}

export default App;
