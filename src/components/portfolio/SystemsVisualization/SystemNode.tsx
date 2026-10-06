import { useRef, type ReactNode } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Group, MathUtils, Mesh } from "three";

import type { Point3, SystemKey } from "./systems-data";
import { SCENE_CONFIG } from "./scene-config";

type SystemNodeProps = {
  system: SystemKey;
  position: Point3;
  active: boolean;
  revealed: boolean;
  idle: boolean;
  mobile: boolean;
  reducedMotion: boolean;
  onActiveChange: (system: SystemKey | null) => void;
  children: ReactNode;
};

export function SystemNode({
  system,
  position,
  active,
  revealed,
  idle,
  mobile,
  reducedMotion,
  onActiveChange,
  children,
}: SystemNodeProps) {
  const group = useRef<Group>(null);
  const phase = system.length * 0.7;
  const reveal = useRef(reducedMotion || revealed ? 1 : 0);
  const baseScale = mobile
    ? SCENE_CONFIG.objects.baseScaleMobile
    : SCENE_CONFIG.objects.baseScaleDesktop;
  const entryOffset = SCENE_CONFIG.objects.entryOffsets[system];
  const initialPosition: Point3 =
    reducedMotion || revealed
      ? position
      : [position[0] + entryOffset[0], position[1] + entryOffset[1], position[2] + entryOffset[2]];

  useFrame(({ clock }, delta) => {
    if (!group.current) return;

    const revealTarget = reducedMotion || revealed ? 1 : 0;
    reveal.current = MathUtils.damp(
      reveal.current,
      revealTarget,
      SCENE_CONFIG.animation.intro.moduleDamping,
      delta,
    );
    group.current.visible = revealTarget > 0 || reveal.current > 0.002;

    const targetScale = baseScale * (active ? SCENE_CONFIG.animation.activeObjectScale : 1);
    const nextScale = MathUtils.damp(group.current.scale.x, targetScale, 8, delta);
    group.current.scale.setScalar(nextScale);

    const idleAmplitude =
      reducedMotion || !idle
        ? 0
        : mobile
          ? SCENE_CONFIG.animation.idleFloatMobile
          : SCENE_CONFIG.animation.idleFloatDesktop;
    const idleY = Math.sin(clock.elapsedTime * 0.42 + phase) * idleAmplitude;
    const hiddenAmount = 1 - reveal.current;
    const desiredX = position[0] + entryOffset[0] * hiddenAmount;
    const desiredY =
      position[1] +
      entryOffset[1] * hiddenAmount +
      idleY +
      (active ? SCENE_CONFIG.animation.activeObjectLift : 0);
    const desiredZ =
      position[2] +
      entryOffset[2] * hiddenAmount +
      (active ? SCENE_CONFIG.animation.activeObjectDepth : 0);
    group.current.position.x = MathUtils.damp(group.current.position.x, desiredX, 9, delta);
    group.current.position.y = MathUtils.damp(group.current.position.y, desiredY, 9, delta);
    group.current.position.z = MathUtils.damp(group.current.position.z, desiredZ, 9, delta);

    group.current.traverse((child) => {
      const material = (child as Mesh).material;
      if (!material) return;
      const materials = Array.isArray(material) ? material : [material];
      materials.forEach((item) => {
        const baseOpacity = item.userData["baseOpacity"];
        if (typeof baseOpacity === "number") {
          item.opacity = baseOpacity * reveal.current;
        }
      });
    });
  });

  const setFromPointer = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    if (event.nativeEvent.pointerType !== "touch") onActiveChange(system);
  };

  return (
    <group
      ref={group}
      position={initialPosition}
      scale={baseScale}
      visible={reducedMotion || revealed}
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
