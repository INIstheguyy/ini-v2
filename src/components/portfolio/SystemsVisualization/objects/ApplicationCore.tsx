import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils } from "three";

import type { ScenePalette } from "../scene-types";
import { SCENE_CONFIG } from "../scene-config";

type ApplicationCoreProps = {
  palette: ScenePalette;
  reducedMotion: boolean;
  mobile: boolean;
  sequenceStep: number;
  coreMoment: number | null;
};

export function ApplicationCore({
  palette,
  reducedMotion,
  mobile,
  sequenceStep,
  coreMoment,
}: ApplicationCoreProps) {
  const group = useRef<Group>(null);
  const lastStep = useRef(sequenceStep);
  const stepStarted = useRef(0);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    if (lastStep.current !== sequenceStep) {
      lastStep.current = sequenceStep;
      stepStarted.current = clock.elapsedTime;
    }

    const elapsed = clock.elapsedTime - stepStarted.current;
    const distance = coreMoment === null ? 2 : Math.abs(elapsed / 1.08 - coreMoment);
    const pulse =
      reducedMotion || distance > 0.18
        ? 0
        : Math.sin((1 - distance / 0.18) * Math.PI) * SCENE_CONFIG.animation.corePulseStrength;
    const targetScale = 1 + pulse;
    const scale = MathUtils.damp(group.current.scale.x, targetScale, 11, delta);
    group.current.scale.setScalar(scale);

    if (!reducedMotion) {
      group.current.rotation.y += delta * (mobile ? 0.055 : 0.085);
      group.current.rotation.x += delta * 0.025;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[mobile ? 0.72 : 0.86, 1]} />
        <meshStandardMaterial color={palette.solid} roughness={0.68} metalness={0.1} flatShading />
      </mesh>
      <mesh scale={1.012}>
        <icosahedronGeometry args={[mobile ? 0.72 : 0.86, 1]} />
        <meshBasicMaterial color={palette.edge} opacity={0.72} transparent wireframe />
      </mesh>
    </group>
  );
}
