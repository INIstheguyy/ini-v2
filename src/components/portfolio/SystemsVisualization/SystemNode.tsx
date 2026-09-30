import { useRef, type ReactNode } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Group, MathUtils } from "three";

import type { Point3, SystemKey } from "./systems-data";
import { SCENE_CONFIG } from "./scene-config";

type SystemNodeProps = {
  system: SystemKey;
  position: Point3;
  active: boolean;
  mobile: boolean;
  reducedMotion: boolean;
  onActiveChange: (system: SystemKey | null) => void;
  children: ReactNode;
};

export function SystemNode({
  system,
  position,
  active,
  mobile,
  reducedMotion,
  onActiveChange,
  children,
}: SystemNodeProps) {
  const group = useRef<Group>(null);
  const phase = system.length * 0.7;

  useFrame(({ clock }, delta) => {
    if (!group.current) return;

    const targetScale = active ? SCENE_CONFIG.animation.activeObjectScale : 1;
    const nextScale = MathUtils.damp(group.current.scale.x, targetScale, 8, delta);
    group.current.scale.setScalar(nextScale);

    if (!reducedMotion) {
      const amplitude = mobile ? 0.018 : 0.035;
      group.current.position.y =
        position[1] + Math.sin(clock.elapsedTime * 0.55 + phase) * amplitude;
    }
  });

  const setFromPointer = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    if (event.nativeEvent.pointerType !== "touch") onActiveChange(system);
  };

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={setFromPointer}
      onPointerOut={(event) => {
        event.stopPropagation();
        if (event.nativeEvent.pointerType !== "touch") onActiveChange(null);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onActiveChange(active ? null : system);
      }}
    >
      {children}
    </group>
  );
}
