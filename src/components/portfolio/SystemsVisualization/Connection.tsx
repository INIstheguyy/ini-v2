import { ThinLine } from "./ThinLine";
import type { Point3 } from "./systems-data";
import type { ScenePalette } from "./scene-types";
import { SCENE_CONFIG } from "./scene-config";

type ConnectionProps = {
  from: Point3;
  to: Point3;
  emphasized: boolean;
  dimmed: boolean;
  revealed: boolean;
  palette: ScenePalette;
};

export function Connection({ from, to, emphasized, dimmed, revealed, palette }: ConnectionProps) {
  const opacity = emphasized
    ? SCENE_CONFIG.connections.emphasizedOpacity
    : dimmed
      ? SCENE_CONFIG.connections.dimmedOpacity
      : SCENE_CONFIG.connections.idleOpacity;
  return (
    <ThinLine
      from={from}
      to={to}
      color={emphasized ? palette.edge : palette.line}
      opacity={opacity}
      revealed={revealed}
      revealDuration={SCENE_CONFIG.animation.intro.lineRevealSeconds}
    />
  );
}
