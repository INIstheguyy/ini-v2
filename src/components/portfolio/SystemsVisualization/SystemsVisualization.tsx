import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

import { SystemsScene } from "./SystemsScene";
import { SYSTEMS, type SystemKey } from "./systems-data";
import type { ScenePalette } from "./scene-types";
import { SCENE_CONFIG } from "./scene-config";
import styles from "./systemsVisualization.module.css";

type SystemsVisualizationProps = {
  activeSystem: SystemKey | null;
  onActiveSystemChange: (system: SystemKey | null) => void;
  mobile: boolean;
  hoverCapable: boolean;
  reducedMotion: boolean;
  playIntro: boolean;
};

const paletteFor = (dark: boolean): ScenePalette =>
  dark
    ? {
        solid: "#3f3f46",
        solidActive: "#71717a",
        edge: "#fafafa",
        line: "#a1a1aa",
        pulse: "#ffffff",
      }
    : {
        solid: "#c7c7cc",
        solidActive: "#8f8f97",
        edge: "#18181b",
        line: "#71717a",
        pulse: "#09090b",
      };

export default function SystemsVisualization({
  activeSystem,
  onActiveSystemChange,
  mobile,
  hoverCapable,
  reducedMotion,
  playIntro,
}: SystemsVisualizationProps) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setDark(root.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const palette = paletteFor(dark);
  const camera = mobile ? SCENE_CONFIG.camera.mobile : SCENE_CONFIG.camera.desktop;

  return (
    <div
      className={styles["frame"]}
      role="group"
      aria-label="Interactive model showing interface, logic, data, and integrations connected through one application"
    >
      <div className={styles["canvas"]} aria-hidden="true">
        <Canvas
          dpr={mobile ? SCENE_CONFIG.dpr.mobile : SCENE_CONFIG.dpr.desktop}
          camera={{
            position: camera.position,
            fov: camera.fov,
            near: 0.1,
            far: 30,
          }}
          frameloop={reducedMotion ? "demand" : "always"}
          gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
          onPointerMissed={() => onActiveSystemChange(null)}
        >
          <SystemsScene
            activeSystem={activeSystem}
            onActiveSystemChange={onActiveSystemChange}
            mobile={mobile}
            reducedMotion={reducedMotion}
            playIntro={playIntro}
            palette={palette}
          />
        </Canvas>
      </div>

      {(Object.entries(SYSTEMS) as [SystemKey, (typeof SYSTEMS)[SystemKey]][]).map(
        ([key, system]) => (
          <button
            key={key}
            type="button"
            className={`${styles["label"]} ${styles[key]}`}
            data-active={activeSystem === key}
            data-dimmed={activeSystem !== null && activeSystem !== key}
            aria-pressed={activeSystem === key}
            onPointerEnter={() => hoverCapable && onActiveSystemChange(key)}
            onPointerLeave={() => hoverCapable && onActiveSystemChange(null)}
            onFocus={() => onActiveSystemChange(key)}
            onBlur={() => hoverCapable && onActiveSystemChange(null)}
            onClick={() => onActiveSystemChange(activeSystem === key ? null : key)}
          >
            <strong>{system.label}</strong>
            <span>{system.description}</span>
          </button>
        ),
      )}

      <div className={styles["coreLabel"]}>Application</div>
    </div>
  );
}
