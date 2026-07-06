import jaco from "../assets/jaco.png";
import vex from "../assets/vex.jpg";
import br from "../assets/br.jpg";
import cp from "../assets/cp.jpg";
import wf from "../assets/waifu.jpg";
import sb from "../assets/sb.jpg";
import ourai from "../assets/ourai.jpg";
import ted from "../assets/ted.png";
import csub from "../assets/csub.jpg";
import ucla from "../assets/ucla.jpg";
import reactor from "../assets/reactor.jpg";
import student from "../assets/student.jpg";
import teaching from "../assets/teaching.jpg";
import mecp from "../assets/mecp.jpg";
import robot from "../assets/robot.jpg";

// Personal metadata (source of truth: LinkedIn, Jul 2026)
export const profile = {
  name: "Christopher Tang",
  headline: "Incoming Math + CS @ Stanford",
  location: "Houston, Texas, United States",
  email: "tangchristopher111@gmail.com",
  linkedin: "https://www.linkedin.com/in/christophertangwastaken/",
  github: "https://github.com/C0derTang",
  proverb: "He who sleeps with an itchy butt wakes with a sticky finger.",
  topSkills: ["C++", "Cross-functional Team Leadership", "Autonomous Vehicles"],
};

// Navigation links
export const navLinks = [
  { id: "home", title: "Home", path: "/" },
  { id: "projects", title: "Projects", path: "/projects" },
  { id: "contact", title: "Contact", path: "/contact" },
];

// Technologies I'm proficient in with proficiency levels (0-100)
export const technologies = [
  { name: "C++", proficiency: 90 },
  { name: "Python", proficiency: 95 },
  { name: "Fusion 360", proficiency: 97 },
  { name: "Git", proficiency: 92 },
  { name: "JavaScript", proficiency: 80 },
  { name: "React", proficiency: 76 },
  { name: "Node.js", proficiency: 74 },
  { name: "TypeScript", proficiency: 65 },
  { name: "Chrome API", proficiency: 85 },
  { name: "Firebase", proficiency: 70 },
  { name: "SQL", proficiency: 60 },
  { name: "Talking to Women", proficiency: 0.67 },
];

// Experience timeline data (most recent first)
export const experienceData = [
  {
    id: "stanford",
    title: "B.S. Mathematics + Computer Science",
    company: "Stanford University",
    location: "Stanford, CA",
    date: "Sep 2026 - Jun 2030 (est.)",
    description: "Incoming freshman studying Math + CS",
    bullets: [
      "Admitted to study Mathematics and Computer Science",
      "Stockdale High School, Aug 2022 - May 2026 — National Merit distinction",
    ],
    type: "Education",
    image: student,
  },
  {
    id: "todd",
    title: "Software Engineer Intern",
    company: "Todd",
    location: "Remote",
    date: "Jun 2026 - Jul 2026",
    description: "Shipped full-stack product features and hardened the platform",
    bullets: [
      "Shipped search, navigation, and reminders features across a React/Next.js frontend",
      "Built against a Postgres/Drizzle backend with GitHub Actions CI",
      "Performed security patching and API hardening",
    ],
    type: "Internship",
    image: mecp,
  },
  {
    id: "cosmos-ucla",
    title: "Neuroscience and AI Research",
    company: "UCLA COSMOS",
    location: "Los Angeles, CA",
    date: "Jun 2025 - Aug 2025",
    description: "Conducted in-person AI research under Professor Hugh T. Blair",
    bullets: [
      "Implemented Deep Q-Network (DQN) agents in PyTorch to model behavioral convergence in competitive environments",
      "Simulated multi-agent training with Pygame and analyzed reward stability and policy evolution",
      "Visualized convergence metrics and presented findings at the UCLA COSMOS research symposium",
      "Drafting a paper detailing network architecture and experimental results",
    ],
    type: "Research",
    image: ucla,
  },
  {
    id: "jaco-oil",
    title: "Software Engineer Intern",
    company: "Jaco Oil Company",
    location: "Bakersfield, CA",
    date: "Aug 2024 - Dec 2024",
    description: "Engineered automation systems for retail fuel operations across two states",
    bullets: [
      "Replaced a legacy fuel log parser device by integrating its functionality into the existing VM environment",
      "Covered 120+ pumps across 54 retail sites in California and Arizona",
      "Automated daily store close and profit reports using Python and SQL",
      "Enhanced data reliability and processing speed through end-to-end automation",
    ],
    type: "Internship",
    image: jaco,
  },
  {
    id: "csub-engineering",
    title: "Engineering Intern",
    company: "CSU Bakersfield",
    location: "Bakersfield, CA",
    date: "Jan 2023 - May 2024",
    description: "Renewable energy research under Professor Zhongzhe Liu on steam hydrogasification of agricultural biomass",
    bullets: [
      "Operated high-pressure hydrogasification reactors to convert biomass into methane-rich fuel gas",
      "Measured feedstock ratios, maintained controlled thermal and pressure conditions, and ensured data reproducibility",
      "Collected and analyzed gas samples to quantify methane yield and optimize reactor parameters",
      "Collaborated with Professor Liu and research interns to refine setup design and improve process efficiency",
    ],
    type: "Research",
    image: csub,
  },
  {
    id: "bakersfield-robotics-founder",
    title: "Founder & Director",
    company: "Bakersfield Robotics",
    location: "Bakersfield, CA",
    date: "Jan 2023 - Present",
    description: "Founded a 501(c)(3) STEM education nonprofit providing free robotics training for underserved students",
    bullets: [
      "Established Bakersfield Robotics, providing year-round VEX training to over 100 students across local schools",
      "Secured CSU Bakersfield community grants and sponsorships to fund equipment and competitions",
      "Developed structured robotics curriculum and trained alumni mentors to lead peer instruction",
      "Organized regional workshops and tournaments to promote hands-on STEM learning and collaboration",
    ],
    type: "Non-profit",
    image: br,
  },
];

// About Me section configuration
export const aboutMeConfig = {
  roles: [
    {
      title: "a Student",
      image: student,
      description:
        "An inquisitive learner with a passion for discovery. From earning National Merit distinction to conducting neuroscience and AI research at UCLA COSMOS, I pursue knowledge that bridges science, logic, and imagination.",
      projectCategory: "student",
    },
    {
      title: "a Teacher",
      image: teaching,
      description:
        "A mentor who believes education amplifies impact. Through Bakersfield Robotics and language teaching, I've guided over 100 students and built programs that spark curiosity and confidence in STEM learning.",
      projectCategory: "teacher",
    },
    {
      title: "a Robotics Engineer",
      image: robot,
      description:
        "An engineer who transforms ideas into motion. Leading a team to the VEX Robotics World Championship, I've learned that great design fuses precision, creativity, and teamwork.",
      projectCategory: "engineer",
    },
    {
      title: "a Competitive Programmer",
      image: mecp,
      description:
        "A problem solver who finds elegance in logic. From USACO Silver to developing automation tools as a software intern, I turn algorithms into solutions that streamline and inspire.",
      projectCategory: "programmer",
    },
    {
      title: "a Storyteller",
      image: ted,
      description:
        "A storyteller connecting technology and humanity. As an AI Nexus author and TEDx speaker, I write to explore how innovation shapes the way we think, create, and grow.",
      projectCategory: "storyteller",
    },
  ],
  typingSpeed: 100, // milliseconds per character
  pauseBetweenRoles: 5000, // milliseconds to pause before switching roles
};

// Projects data organized by categories
export const projectsData = [
  {
    id: "cosmos-ucla-research",
    title: "Neuroscience & AI Research",
    category: "student",
    image: ucla,
    description:
      "Selected among 32 students statewide for UCLA COSMOS Cluster 1 program. Investigated reinforcement learning strategies under Professor Hugh Blair, developing AI agents that learn defensive behaviors through competitive environments.",
    features: [
      "Designed and implemented Deep Q-Network models to study behavioral convergence patterns",
      "Authored research paper on agent defensive learning, currently drafting for eventual peer review",
      "Presented findings to faculty and peers at UCLA COSMOS research symposium",
      "Collaborated with graduate students and faculty to advance AI research methodologies",
    ],
    github: "https://github.com/C0derTang/defensive-convergence-nn",
    date: "Jul 2025 - Present",
  },
  {
    id: "vex-worlds",
    title: "VEX Robotics",
    category: "engineer",
    image: vex,
    description:
      "Led Liberty Robotics to the VEX Robotics World Championship, the first in school history. Designed and programmed competition robots for precision, speed, and reliability.",
    features: [
      "3x World Championship Qualifier (2x VEX IQ, 1x VEX VRC)",
      "Developed autonomous and driver control systems",
      "Directed build strategy and robot design reviews",
      "Mentored underclassmen in coding and team operations",
    ],
    documentation:
      "https://docs.google.com/presentation/d/1aSb6sM-2JXWvhS-6gr6mMKE4GM3tZjE0FG6S0PMGq_c/edit?usp=sharing",
    github: "https://github.com/C0derTang/pushback-nb",
    date: "Aug 2023 - Present",
  },
  {
    id: "bakersfield-robotics",
    title: "Bakersfield Robotics: STEM Nonprofit",
    category: "teacher",
    image: br,
    description:
      "Founded a 501(c)(3) STEM education nonprofit providing free robotics training for underserved students. Secured grants, developed curriculum, and built partnerships with local schools.",
    features: [
      "Founded Bakersfield Robotics, reaching over 100 students",
      "Secured funding through CSU Bakersfield community grants",
      "Trained alumni mentors and launched programs catering to students at 4 schools",
      "Expanded local STEM access through workshops and competitions",
    ],
    link: "https://bakersfieldrobotics.org/",
    date: "Jan 2023 - Present",
  },
  {
    id: "todd-internship",
    title: "Todd: Software Engineering",
    category: "programmer",
    image: mecp,
    description:
      "Software engineering internship shipping production features across the full stack of a consumer product.",
    features: [
      "Shipped search, navigation, and reminders features in a React/Next.js frontend",
      "Built on a Postgres/Drizzle backend with GitHub Actions CI",
      "Performed security patching and API hardening",
      "Delivered production code within a two-month sprint window",
    ],
    date: "Jun 2026 - Jul 2026",
  },
  {
    id: "waifu-focus",
    title: "Waifu Focus Chrome Extension",
    category: "programmer",
    image: wf,
    description:
      "Created a productivity Chrome extension to help users focus by gamifying work sessions and minimizing distractions.",
    features: [
      "Built extension with 990+ installs and 150+ active users at the time of writing",
      "Implemented time tracking and motivational system",
      "Collected user feedback to refine UX and functionality",
      "Maintained 4.8/5 average rating on Chrome Web Store",
    ],
    demo: "https://chromewebstore.google.com/detail/waifu-focus/oilebkjfhbkbmablbmhellicongmgbml",
    github: "https://github.com/C0derTang/waifu-focus",
    date: "Mar 2024 - Apr 2025",
  },
  {
    id: "ourai-articles",
    title: "OurAI: AI Nexus Magazine",
    category: "storyteller",
    image: ourai,
    description:
      "Staff writer for OurAI, a student-led platform exploring the intersection of artificial intelligence, ethics, and human creativity.",
    features: [
      "Published featured article on AI in competitive programming",
      "Reached 20+ days of cumulative global read time on HackerNoon",
      "Collaborated with editors to refine clarity and tone",
      "Wrote accessible, engaging content for broad audiences",
    ],
    link: "https://hackernoon.com/the-end-of-fair-play-in-coding-contests",
    documentation: "https://www.our-ai.org/ai-nexus/read",
    date: "Sep 2025 - Oct 2025",
  },
  {
    id: "usaco-cf-leetcode",
    title: "Competitive Programming",
    category: "programmer",
    image: cp,
    description:
      "Advanced through competitive programming platforms including USACO Silver, Codeforces, and LeetCode, solving algorithmic challenges in C++ and Python.",
    features: [
      "Achieved USACO Silver division ranking",
      "Solved 500+ problems across Codeforces and LeetCode",
      "Specialized in dynamic programming and graph theory",
      "Improved problem-solving speed and code efficiency",
    ],
    github: "https://github.com/C0derTang/mixed-cp-solutions",
    link: "https://codeforces.com/profile/theweakestsilver",
    date: "Jan 2022 - Present",
  },
  {
    id: "science-bowl",
    title: "National Science Bowl",
    category: "student",
    image: sb,
    description:
      "Led school's Science Bowl team to a Top 16 Nationals finish, the highest in school history. Specialized in chemistry and physics. Competed by earning points with a 4-person team through a fast-paced quiz format.",
    features: [
      "Independently studied college-level chemistry and physics",
      "Anchored the team in the final round of the regional qualifier, scoring 32 of our 70 points",
      "Led team members in buzzer timing and strategy",
      "Currently coaching underclassmen in chemistry and physics",
    ],
    link: "https://science.osti.gov/wdts/nsb/2025-Finals/Competition-Results",
    date: "Sep 2023 - Apr 2025",
  },
  {
    id: "tedx-speaker",
    title: "TEDx Speaker: The Arrival Fallacy",
    category: "storyteller",
    image: ted,
    description:
      "Delivered a TEDx talk on 'The Arrival Fallacy', exploring the psychology of achievement and how redefining success fuels continuous growth and creativity. Not the best execution, but I'm proud of the message I was able to convey.",
    features: [
      "Delivered talk to 30+ live audience at TEDx Stockdale",
      "Featured on TEDx YouTube channel (43M subscribers)",
      "Revised multiple drafts through peer and mentor feedback",
      "Shared insights on motivation and personal growth",
    ],
    link: "https://www.youtube.com/watch?v=e_l3Bcu7DlI",
    date: "Dec 2024 - May 2025",
  },
  {
    id: "csub-internship",
    title: "CSUB Engineering Intern",
    category: "engineer",
    image: reactor,
    description:
      "Conducted renewable energy research at California State University Bakersfield, operating high-pressure reactors to convert biomass into clean fuel. Worked directly with Professor Zhongzhe Liu on experimental design and data analysis.",
    features: [
      "Operated high-pressure hydrogasification reactors",
      "Collected and analyzed gas samples to quantify methane yield and optimize parameters",
      "Maintained controlled thermal and pressure conditions for data reproducibility",
      "Contributed to materials research that advances renewable energy solutions",
    ],
    date: "Jan 2023 - May 2024",
  },
];
