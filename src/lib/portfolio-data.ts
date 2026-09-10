export type Project = {
  title: string;
  summary: string;
  live: string;
  github: string;
  year: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    title: "Career Compass",
    summary:
      "An AI-powered career discovery tool that helps people find career paths they didn't know existed by understanding their unique context through intelligent conversation.",
    live: "https://pattways.netlify.app/",
    github: "https://github.com/INIstheguyy/career-compass",
    year: "2025",
    stack: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "Festival Twin Finder",
    summary:
      "An AI that translates culture, not just words. Upload any festival — text, photo, or video — and get equivalent experiences in your country within seconds.",
    live: "https://festival-twin-finder.netlify.app/",
    github: "https://github.com/ExamSense/festival-twin-seeker",
    year: "2025",
    stack: ["React", "AI", "Netlify"],
  },
  {
    title: "ExamSense",
    summary:
      "A smart practice testing platform that helps WASSCE candidates identify weak topics through AI-powered analysis, turning practice tests into targeted learning paths.",
    live: "https://exam-sense.netlify.app/",
    github: "https://github.com/ExamSense/ExamSense.git",
    year: "2024",
    stack: ["React", "TypeScript", "Firebase"],
  },
  {
    title: "Festival Twin Finder",
    summary:
      "An AI that translates culture, not just words. Upload any festival — text, photo, or video — and get equivalent experiences in your country within seconds.",
    live: "https://festival-twin-finder.netlify.app/",
    github: "https://github.com/ExamSense/festival-twin-seeker",
    year: "2025",
    stack: ["React", "AI", "Netlify"],
  },
  {
    title: "ExamSense",
    summary:
      "A smart practice testing platform that helps WASSCE candidates identify weak topics through AI-powered analysis, turning practice tests into targeted learning paths.",
    live: "https://exam-sense.netlify.app/",
    github: "https://github.com/ExamSense/ExamSense.git",
    year: "2024",
    stack: ["React", "TypeScript", "Firebase"],
  },
];

export const skills: string[] = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  "Tailwind CSS",
  "Framer Motion",
  "GSAP",
  "Node.js",
  "Express.js",
  "SQL",
  "PostgreSQL",
  'REST API',
  "Supabase",
  "Figma",
  "RAG",
  "WebSockets & Webhooks",
];

export const sections = [
  { id: "about", label: "About" },
  { id: "what-i-do", label: "What I Do" },
  { id: "work", label: "Work" },
  { id: "experiments", label: "Experiments" },
  { id: "contact", label: "Contact" },
];

export const socials = [
  { label: "GitHub", handle: "@INIstheguyy", href: "https://github.com/INIstheguyy" },
  { label: "Reddit", handle: "@INIstheguyy", href: "https://www.reddit.com/user/INIstheguyy/" },
  { label: "Email", handle: "inistheguyy", href: "mailto:inistheguyy@gmail.com" },
];

