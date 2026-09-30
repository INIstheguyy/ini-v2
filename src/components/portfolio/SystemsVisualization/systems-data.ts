export type SystemKey = "interface" | "logic" | "data" | "integrations";

export type Point3 = [number, number, number];

export type SystemDefinition = {
  label: string;
  description: string;
  skills: string[];
  desktopPosition: Point3;
  mobilePosition: Point3;
};

export const SYSTEMS: Record<SystemKey, SystemDefinition> = {
  interface: {
    label: "Interface",
    description: "The visible layer people use",
    skills: ["React", "Next.js", "React Native", "Tailwind CSS", "Framer Motion", "GSAP", "Figma"],
    desktopPosition: [0.1, 2.25, -0.35],
    mobilePosition: [0.05, 1.95, -0.1],
  },
  logic: {
    label: "Logic",
    description: "Rules and application behavior",
    skills: ["JavaScript", "TypeScript", "Node.js", "Express.js", "RAG"],
    desktopPosition: [-3.05, 0.25, 0.35],
    mobilePosition: [-2.05, 0.2, 0.1],
  },
  data: {
    label: "Data",
    description: "Persistent application state",
    skills: ["SQL", "PostgreSQL", "Supabase"],
    desktopPosition: [-0.15, -2.2, -0.3],
    mobilePosition: [-0.1, -1.85, -0.1],
  },
  integrations: {
    label: "Integrations",
    description: "Connections to external systems",
    skills: ["REST API", "WebSockets & Webhooks"],
    desktopPosition: [3.05, 0.35, 0.15],
    mobilePosition: [2.05, 0.25, 0.05],
  },
};

export const CORE_POSITION: Point3 = [0, 0, 0.45];

export type ConnectionDefinition = {
  id: string;
  from: SystemKey | "core";
  to: SystemKey | "core";
  secondary?: boolean;
};

export const CONNECTIONS: ConnectionDefinition[] = [
  { id: "interface-core", from: "interface", to: "core" },
  { id: "logic-core", from: "logic", to: "core" },
  { id: "data-core", from: "data", to: "core" },
  { id: "integrations-core", from: "integrations", to: "core" },
  { id: "logic-data", from: "logic", to: "data", secondary: true },
  { id: "logic-interface", from: "logic", to: "interface", secondary: true },
  { id: "logic-integrations", from: "logic", to: "integrations", secondary: true },
];

export const INTRO_ROUTE: ConnectionDefinition[] = [
  { id: "intro-data-core", from: "data", to: "core" },
  { id: "intro-core-logic", from: "core", to: "logic" },
  { id: "intro-logic-integrations", from: "logic", to: "integrations" },
  { id: "intro-integrations-logic", from: "integrations", to: "logic" },
  { id: "intro-logic-interface", from: "logic", to: "interface" },
];

export const skillSystem = (skill: string): SystemKey | null => {
  const match = (Object.entries(SYSTEMS) as [SystemKey, SystemDefinition][]).find(
    ([, definition]) => definition.skills.includes(skill),
  );
  return match?.[0] ?? null;
};

export const positionFor = (key: SystemKey | "core", mobile: boolean): Point3 => {
  if (key === "core") return CORE_POSITION;
  return mobile ? SYSTEMS[key].mobilePosition : SYSTEMS[key].desktopPosition;
};
