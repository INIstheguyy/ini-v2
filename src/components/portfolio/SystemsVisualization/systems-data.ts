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
    desktopPosition: [0.15, 2.25, -0.65],
    mobilePosition: [0.05, 1.95, -0.25],
  },
  logic: {
    label: "Logic",
    description: "Rules and application behavior",
    skills: ["JavaScript", "TypeScript", "Node.js", "Express.js", "RAG"],
    desktopPosition: [-3, 0.28, 0.65],
    mobilePosition: [-2.05, 0.2, 0.3],
  },
  data: {
    label: "Data",
    description: "Persistent application state",
    skills: ["SQL", "PostgreSQL", "Supabase"],
    desktopPosition: [-0.2, -2.17, -0.5],
    mobilePosition: [-0.1, -1.85, -0.2],
  },
  integrations: {
    label: "Integrations",
    description: "Connections to external systems",
    skills: ["REST API", "WebSockets & Webhooks"],
    desktopPosition: [3, 0.4, 0.35],
    mobilePosition: [2.05, 0.25, 0.15],
  },
};

export const CORE_POSITION: Point3 = [0, 0, 0.25];

export type ConnectionDefinition = {
  id: string;
  from: SystemKey | "core";
  to: SystemKey | "core";
};

export const CONNECTIONS: ConnectionDefinition[] = [
  { id: "interface-core", from: "interface", to: "core" },
  { id: "logic-core", from: "logic", to: "core" },
  { id: "data-core", from: "data", to: "core" },
  { id: "integrations-core", from: "integrations", to: "core" },
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
