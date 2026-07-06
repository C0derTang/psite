# Christopher Tang — The Graph

Personal site rendered as an Obsidian-style interactive knowledge graph. Every node is a chapter — education, research, robotics, software, teaching, storytelling — connected by the threads between them.

**Live:** [c0dertang.github.io](https://c0dertang.github.io/)

## How it works

- A d3-force simulation lays out the graph; nodes are draggable (fling them), the canvas pans and zooms.
- Clicking a node opens a detail panel and flies the camera to it. Selection syncs with the URL hash, so every node is deep-linkable (e.g. [`#vex-worlds`](https://c0dertang.github.io/#vex-worlds)) and the back button travels the graph.
- Honors `prefers-reduced-motion`.

## Stack

- React 19 + Vite 7
- d3-force / d3-zoom for the graph
- Tailwind CSS 4

## Development

```sh
npm install
npm run dev      # dev server
npm run build    # production build to dist/
npm run preview  # serve the production build
```

Graph content lives in `src/constants/index.js` (profile, experience, projects) and is assembled into nodes/edges in `src/graph/data.js`.

## Deployment

Pushing to `main` on [C0derTang.github.io](https://github.com/C0derTang/C0derTang.github.io) runs the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to the `gh-pages` branch. GitHub Pages serves that branch at [c0dertang.github.io](https://c0dertang.github.io/).
