import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { graphData } from "./data";

const radius = (n) => (n.type === "root" ? 20 : 8 + n.degree * 1.4);

// Imperative d3 force-graph wrapped in a React shell.
// Selection state lives in React (App); camera + rendering live here.
export default function GraphView({ selectedId, onSelect, reducedMotion }) {
  const containerRef = useRef(null);
  const stateRef = useRef({});
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  // build the scene once
  useEffect(() => {
    const container = containerRef.current;
    const st = stateRef.current;
    const nodes = graphData.nodes.map((n) => ({ ...n }));
    const links = graphData.links.map((l) => ({ ...l }));
    const nodeIndex = new Map(nodes.map((n) => [n.id, n]));

    const w = container.clientWidth;
    const h = container.clientHeight;

    const svg = d3
      .select(container)
      .append("svg")
      .attr("class", "graph-svg")
      .attr("width", "100%")
      .attr("height", "100%");

    // glow filter for the active node
    const defs = svg.append("defs");
    const glow = defs.append("filter").attr("id", "node-glow").attr("x", "-80%").attr("y", "-80%").attr("width", "260%").attr("height", "260%");
    glow.append("feGaussianBlur").attr("stdDeviation", 6).attr("result", "blur");
    const merge = glow.append("feMerge");
    merge.append("feMergeNode").attr("in", "blur");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    const world = svg.append("g");

    const linkSel = world
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("class", "graph-edge");

    const nodeSel = world
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("class", (d) => `graph-node type-${d.type}`)
      .attr("role", "button")
      .attr("tabindex", 0)
      .attr("aria-label", (d) => d.label);

    // pulse ring behind the root
    nodeSel
      .filter((d) => d.type === "root")
      .append("circle")
      .attr("class", "root-pulse")
      .attr("r", radius(nodes[0]) + 6);

    nodeSel
      .append("circle")
      .attr("class", "node-dot")
      .attr("r", (d) => radius(d))
      .attr("fill", (d) => d.color);

    nodeSel
      .append("circle")
      .attr("class", "node-ring")
      .attr("r", (d) => radius(d) + 4.5)
      .attr("stroke", (d) => d.color);

    nodeSel
      .append("text")
      .attr("class", (d) => `node-label label-${d.type}`)
      .attr("dy", (d) => radius(d) + 15)
      .attr("text-anchor", "middle")
      .text((d) => d.label);

    // ---- simulation ----
    const sim = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => d.id).distance((l) => {
        const s = l.source.type, t = l.target.type;
        if (s === "root" || t === "root") return 130;
        if (s === "category" || t === "category") return 95;
        return 85;
      }).strength(0.5))
      .force("charge", d3.forceManyBody().strength(-380))
      .force("center", d3.forceCenter(w / 2, h / 2))
      .force("collide", d3.forceCollide().radius((d) => radius(d) + 22))
      .force("x", d3.forceX(w / 2).strength(0.045))
      .force("y", d3.forceY(h / 2).strength(0.055));

    const tick = () => {
      linkSel
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      nodeSel.attr("transform", (d) => `translate(${d.x},${d.y})`);
    };

    const reframe = () => {
      if (st.selected) st.flyTo(st.selected);
      else st.fitAll();
    };

    if (reducedMotion) {
      sim.stop();
      sim.tick(300);
      tick();
    } else {
      sim.on("tick", tick);
      // reframe once when the initial layout settles; never yank the camera after that
      sim.on("end", () => {
        if (!st.framed) {
          st.framed = true;
          reframe();
        }
      });
    }

    // ---- zoom / pan ----
    const zoom = d3
      .zoom()
      .extent(() => [[0, 0], [container.clientWidth, container.clientHeight]])
      .scaleExtent([0.25, 3.5])
      .on("zoom", (event) => {
        world.attr("transform", event.transform);
        // label level-of-detail: item labels appear once you're close enough
        svg.classed("zoomed-in", event.transform.k > 0.85);
      });
    svg.call(zoom).on("dblclick.zoom", null);

    // ---- drag nodes (fling toy) ----
    nodeSel.call(
      d3
        .drag()
        .on("start", (event, d) => {
          if (!event.active && !reducedMotion) sim.alphaTarget(0.25).restart();
          d.fx = d.x;
          d.fy = d.y;
          st.dragging = false;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
          st.dragging = true;
          if (reducedMotion) {
            d.x = event.x;
            d.y = event.y;
            sim.tick(2);
            tick();
          }
        })
        .on("end", (event, d) => {
          if (!event.active && !reducedMotion) sim.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    );

    // ---- hover: light the neighborhood, dim the rest ----
    nodeSel
      .on("mouseenter", (event, d) => {
        if (st.selected) return;
        const hood = new Set([d.id, ...d.neighbors]);
        nodeSel.classed("dimmed", (n) => !hood.has(n.id));
        linkSel
          .classed("dimmed", (l) => l.source.id !== d.id && l.target.id !== d.id)
          .classed("lit", (l) => l.source.id === d.id || l.target.id === d.id)
          .attr("stroke", (l) =>
            l.source.id === d.id || l.target.id === d.id ? d.color : null
          );
      })
      .on("mouseleave", () => {
        if (st.selected) return;
        nodeSel.classed("dimmed", false);
        linkSel.classed("dimmed", false).classed("lit", false).attr("stroke", null);
      })
      .on("click", (event, d) => {
        event.stopPropagation();
        if (st.dragging) return;
        onSelectRef.current(d.id);
      })
      .on("keydown", (event, d) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelectRef.current(d.id);
        }
      });

    svg.on("click", () => onSelectRef.current(null));

    // ---- camera helpers ----
    const dur = reducedMotion ? 0 : 750;

    st.fitAll = () => {
      const xs = nodes.map((n) => n.x), ys = nodes.map((n) => n.y);
      const [x0, x1] = [Math.min(...xs), Math.max(...xs)];
      const [y0, y1] = [Math.min(...ys), Math.max(...ys)];
      const cw = container.clientWidth, ch = container.clientHeight;
      const k = Math.min(2, 0.82 / Math.max((x1 - x0) / cw, (y1 - y0) / ch, 0.01));
      const t = d3.zoomIdentity
        .translate(cw / 2, ch / 2)
        .scale(k)
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2);
      svg.transition().duration(dur).ease(d3.easeCubicInOut).call(zoom.transform, t);
    };

    st.flyTo = (id) => {
      const n = nodeIndex.get(id);
      if (!n) return;
      const cw = container.clientWidth, ch = container.clientHeight;
      const desktop = cw >= 1024;
      // leave room for the panel: right side on desktop, bottom on mobile
      const cx = desktop ? (cw - 420) / 2 : cw / 2;
      const cy = desktop ? ch / 2 : ch * 0.24;
      const k = 2.1;
      const t = d3.zoomIdentity.translate(cx - n.x * k, cy - n.y * k).scale(k);
      svg.transition().duration(dur).ease(d3.easeCubicInOut).call(zoom.transform, t);
    };

    st.setSelected = (id) => {
      st.selected = id;
      nodeSel.classed("selected", (n) => n.id === id);
      nodeSel
        .select(".node-dot")
        .attr("filter", (n) => (n.id === id ? "url(#node-glow)" : null));
      if (id) {
        const sel = nodeIndex.get(id);
        const hood = new Set([id, ...sel.neighbors]);
        nodeSel.classed("dimmed", (n) => !hood.has(n.id));
        linkSel
          .classed("dimmed", (l) => l.source.id !== id && l.target.id !== id)
          .classed("lit", (l) => l.source.id === id || l.target.id === id)
          .attr("stroke", (l) =>
            l.source.id === id || l.target.id === id ? sel.color : null
          );
      } else {
        nodeSel.classed("dimmed", false);
        linkSel.classed("dimmed", false).classed("lit", false).attr("stroke", null);
      }
    };

    // early frame while the sim is still cooling; final frame comes from the "end" event
    const settle = setTimeout(reframe, reducedMotion ? 0 : 900);

    const onResize = reframe;
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(settle);
      window.removeEventListener("resize", onResize);
      sim.stop();
      svg.remove();
    };
  }, [reducedMotion]);

  // react to selection changes
  useEffect(() => {
    const st = stateRef.current;
    if (!st.setSelected) return;
    st.setSelected(selectedId);
    if (selectedId) st.flyTo(selectedId);
    else st.fitAll();
  }, [selectedId]);

  return <div ref={containerRef} className="absolute inset-0" />;
}
