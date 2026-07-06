import {
  profile,
  technologies,
  aboutMeConfig,
  projectsData,
  experienceData,
} from "../constants";

export const CATEGORY_COLORS = {
  me: "#e0424f",
  student: "#6fb1e8",
  teacher: "#7fd0a0",
  engineer: "#e8964b",
  programmer: "#b48ee8",
  storyteller: "#e8d24b",
  utility: "#8a93a6",
};

const CATEGORY_LABELS = {
  student: "Student",
  teacher: "Teacher",
  engineer: "Engineer",
  programmer: "Programmer",
  storyteller: "Storyteller",
};

function projectLinks(p) {
  return [
    p.github && { label: "GitHub", url: p.github },
    p.demo && { label: "Demo", url: p.demo },
    p.link && { label: "Link", url: p.link },
    p.documentation && { label: "Docs", url: p.documentation },
  ].filter(Boolean);
}

const nodes = [];
const links = [];

// ---- root ----
nodes.push({
  id: "me",
  label: "Christopher Tang",
  type: "root",
  color: CATEGORY_COLORS.me,
  panel: {
    eyebrow: "The main character",
    title: profile.name,
    date: profile.headline,
    body: `${profile.location}. I build robots, train neural networks, teach kids to do both, and occasionally give TED talks about why finishing things doesn't make you happy. Explore the graph — every node is a chapter.`,
    bullets: [
      "3x VEX Worlds qualifier — first in school history",
      "100+ students taught through my nonprofit",
      "990+ Chrome extension installs",
      "Top 16 at Science Bowl Nationals",
    ],
    links: [
      { label: "GitHub", url: profile.github },
      { label: "LinkedIn", url: profile.linkedin },
    ],
    footnote: `“${profile.proverb}” — ancient proverb, also my LinkedIn summary`,
  },
});

// ---- categories ----
for (const role of aboutMeConfig.roles) {
  const id = role.projectCategory;
  nodes.push({
    id,
    label: CATEGORY_LABELS[id],
    type: "category",
    color: CATEGORY_COLORS[id],
    panel: {
      eyebrow: "Category",
      title: `I am ${role.title}`,
      body: role.description,
      image: role.image,
    },
  });
  links.push({ source: "me", target: id });
}

// ---- projects ----
for (const p of projectsData) {
  nodes.push({
    id: p.id,
    label: p.title.split(":")[0],
    type: "item",
    color: CATEGORY_COLORS[p.category],
    panel: {
      eyebrow: CATEGORY_LABELS[p.category],
      title: p.title,
      date: p.date,
      body: p.description,
      bullets: p.features,
      links: projectLinks(p),
      image: p.image,
    },
  });
  links.push({ source: p.category, target: p.id });
}

// ---- experience not already covered by a project node ----
const expExtras = experienceData.filter((e) => ["stanford", "jaco-oil"].includes(e.id));
const EXP_CATEGORY = { stanford: "student", "jaco-oil": "programmer" };
for (const e of expExtras) {
  nodes.push({
    id: e.id,
    label: e.id === "stanford" ? "Stanford" : e.company,
    type: "item",
    color: CATEGORY_COLORS[EXP_CATEGORY[e.id]],
    panel: {
      eyebrow: e.type,
      title: `${e.title} · ${e.company}`,
      date: `${e.date} · ${e.location}`,
      body: e.description,
      bullets: e.bullets,
      image: e.image,
    },
  });
  links.push({ source: EXP_CATEGORY[e.id], target: e.id });
}

// ---- utility nodes ----
nodes.push({
  id: "skills",
  label: "Skills",
  type: "utility",
  color: CATEGORY_COLORS.utility,
  panel: {
    eyebrow: "Toolbox",
    title: "Skills & proficiencies",
    body: `LinkedIn-certified top skills: ${profile.topSkills.join(", ")}.`,
    bullets: technologies.map((t) =>
      t.proficiency < 1 ? `${t.name} — p = 0.0067` : `${t.name} — ${t.proficiency}%`
    ),
  },
});

nodes.push({
  id: "contact",
  label: "Contact",
  type: "utility",
  color: CATEGORY_COLORS.utility,
  panel: {
    eyebrow: "Correspondence",
    title: "Let's build something that ships",
    body: "Open to research, internships, collaborations, and arguments about whether math or CS is the superior major. Median response time: faster than a USACO judge queue.",
    links: [
      { label: "Email", url: `mailto:${profile.email}` },
      { label: "LinkedIn", url: profile.linkedin },
      { label: "GitHub", url: profile.github },
    ],
  },
});

// ---- edges beyond the tree: the interconnections worth traveling ----
links.push(
  { source: "me", target: "skills" },
  { source: "me", target: "contact" },
  { source: "me", target: "stanford" },
  { source: "skills", target: "programmer" },
  { source: "skills", target: "engineer" },
  // robotics thread
  { source: "vex-worlds", target: "bakersfield-robotics" },
  // algorithms thread
  { source: "cosmos-ucla-research", target: "usaco-cf-leetcode" },
  // software thread
  { source: "todd-internship", target: "waifu-focus" },
  { source: "jaco-oil", target: "csub-internship" },
  // storytelling thread
  { source: "tedx-speaker", target: "ourai-articles" },
  // academics thread
  { source: "stanford", target: "science-bowl" },
  { source: "stanford", target: "cosmos-ucla-research" }
);

// ---- derived: degree + neighbors ----
const neighborMap = new Map(nodes.map((n) => [n.id, new Set()]));
for (const l of links) {
  neighborMap.get(l.source)?.add(l.target);
  neighborMap.get(l.target)?.add(l.source);
}
for (const n of nodes) {
  n.neighbors = [...(neighborMap.get(n.id) || [])];
  n.degree = n.neighbors.length;
}

export const nodeById = new Map(nodes.map((n) => [n.id, n]));
export const graphData = { nodes, links };
