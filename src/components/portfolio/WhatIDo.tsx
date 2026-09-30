import { useEffect, useState } from "react";

import { skills } from "@/lib/portfolio-data";

import { SYSTEMS, skillSystem, type SystemKey } from "./SystemsVisualization/systems-data";

type WhatIDoProps = {
  activeSystem: SystemKey | null;
  onActiveSystemChange: (system: SystemKey | null) => void;
};

export function WhatIDo({ activeSystem, onActiveSystemChange }: WhatIDoProps) {
  const [hoverCapable, setHoverCapable] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHoverCapable(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const activateSkill = (skill: string) => {
    const system = skillSystem(skill);
    if (system) onActiveSystemChange(system);
  };

  return (
    <div>
      <div className="mb-5 flex min-h-5 items-center gap-2 text-xs tracking-[0.12em] text-ink-4 uppercase">
        <span>{activeSystem ? SYSTEMS[activeSystem].label : "Tools across the system"}</span>
        {activeSystem && <span aria-hidden="true">/ related tools</span>}
      </div>
      <ul
        className="flex flex-wrap gap-x-8 gap-y-3"
        onMouseLeave={() => hoverCapable && onActiveSystemChange(null)}
      >
        {skills.map((skill) => {
          const system = skillSystem(skill);
          const isActive = activeSystem !== null && system === activeSystem;
          const dimmed = activeSystem !== null && !isActive;
          return (
            <li key={skill}>
              <button
                type="button"
                onMouseEnter={() => hoverCapable && activateSkill(skill)}
                onFocus={() => activateSkill(skill)}
                onBlur={() => hoverCapable && onActiveSystemChange(null)}
                onClick={() => system && onActiveSystemChange(isActive ? null : system)}
                className={`font-display text-left text-lg tracking-tight transition-all duration-300 outline-none md:text-4xl ${
                  isActive
                    ? "font-bold text-ink-1"
                    : dimmed
                      ? "font-medium text-ink-4"
                      : "font-medium text-ink-2"
                }`}
              >
                {skill}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
