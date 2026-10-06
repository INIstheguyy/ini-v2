import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils, Mesh } from "three";

import { SCENE_CONFIG } from "../scene-config";
import type { ScenePalette } from "../scene-types";
import type { Point3 } from "../systems-data";
import { objectDetailOpacity, PanelDetail, SoftwarePanel } from "./SoftwarePanel";

type ApplicationCoreProps = {
  palette: ScenePalette;
  reducedMotion: boolean;
  mobile: boolean;
  introStage: number;
  active: boolean;
  idle: boolean;
};

type ApplicationLayerProps = {
  index: number;
  revealed: boolean;
  position: Point3;
  size: Point3;
  opacityScale: number;
  active: boolean;
  reducedMotion: boolean;
  palette: ScenePalette;
  children: ReactNode;
};

function ApplicationLayer({
  index,
  revealed,
  position,
  size,
  opacityScale,
  active,
  reducedMotion,
  palette,
  children,
}: ApplicationLayerProps) {
  const group = useRef<Group>(null);
  const reveal = useRef(reducedMotion || revealed ? 1 : 0);
  const entry = SCENE_CONFIG.objects.application.entryOffset;
  const initialPosition: Point3 =
    reducedMotion || revealed
      ? position
      : [position[0] + entry[0], position[1] + entry[1], position[2] + entry[2]];

  useFrame((_, delta) => {
    if (!group.current) return;
    const target = reducedMotion || revealed ? 1 : 0;
    reveal.current = MathUtils.damp(
      reveal.current,
      target,
      SCENE_CONFIG.animation.intro.applicationDamping,
      delta,
    );
    group.current.visible = target > 0 || reveal.current > 0.002;

    const hiddenAmount = 1 - reveal.current;
    const layerDirection = index - 1;
    const activeSeparation = active
      ? layerDirection * SCENE_CONFIG.animation.activeApplicationSeparation
      : 0;
    const desiredX = position[0] + entry[0] * hiddenAmount;
    const desiredY = position[1] + entry[1] * hiddenAmount;
    const desiredZ = position[2] + entry[2] * hiddenAmount + activeSeparation;
    group.current.position.x = MathUtils.damp(group.current.position.x, desiredX, 10, delta);
    group.current.position.y = MathUtils.damp(group.current.position.y, desiredY, 10, delta);
    group.current.position.z = MathUtils.damp(group.current.position.z, desiredZ, 10, delta);

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

  return (
    <group ref={group} position={initialPosition} visible={reducedMotion || revealed}>
      <SoftwarePanel
        size={size}
        palette={palette}
        emphasized={active && index === 2}
        dimmed={false}
        opacityScale={opacityScale}
      >
        {children}
      </SoftwarePanel>
    </group>
  );
}

export function ApplicationCore({
  palette,
  reducedMotion,
  mobile,
  introStage,
  active,
  idle,
}: ApplicationCoreProps) {
  const group = useRef<Group>(null);
  const config = SCENE_CONFIG.objects.application;
  const detailOpacity = objectDetailOpacity(active, false);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const targetScale = active ? SCENE_CONFIG.animation.activeApplicationScale : 1;
    const scale = MathUtils.damp(group.current.scale.x, targetScale, 8, delta);
    group.current.scale.setScalar(scale);
    group.current.position.y =
      reducedMotion || !idle
        ? 0
        : Math.sin(clock.elapsedTime * 0.34) * SCENE_CONFIG.animation.idleApplicationFloat;
  });

  return (
    <group ref={group} rotation={[0.025, -0.08, 0.01]}>
      <ApplicationLayer
        index={0}
        revealed={introStage >= 1}
        position={config.layerPositions[0] ?? [0, 0, 0]}
        size={config.backSize}
        opacityScale={0.4}
        active={active}
        reducedMotion={reducedMotion}
        palette={palette}
      >
        <PanelDetail
          position={[0, 0.26, 0]}
          size={[1.32, 0.025, 0.014]}
          color={palette.edge}
          opacity={detailOpacity * 0.2}
        />
      </ApplicationLayer>

      <ApplicationLayer
        index={1}
        revealed={introStage >= 2}
        position={config.layerPositions[1] ?? [0, 0, 0]}
        size={config.middleSize}
        opacityScale={0.64}
        active={active}
        reducedMotion={reducedMotion}
        palette={palette}
      >
        <PanelDetail
          position={[-0.46, 0, 0]}
          size={[0.34, 0.72, 0.014]}
          color={palette.edge}
          opacity={detailOpacity * 0.2}
        />
        <PanelDetail
          position={[0.22, 0.18, 0]}
          size={[0.62, 0.08, 0.014]}
          color={palette.edge}
          opacity={detailOpacity * 0.28}
        />
      </ApplicationLayer>

      <ApplicationLayer
        index={2}
        revealed={introStage >= 3}
        position={config.layerPositions[2] ?? [0, 0, 0]}
        size={config.frontSize}
        opacityScale={1}
        active={active}
        reducedMotion={reducedMotion}
        palette={palette}
      >
        <PanelDetail
          position={[0, 0.34, 0]}
          size={[1.58, 0.024, 0.014]}
          color={palette.edge}
          opacity={detailOpacity * 0.62}
        />
        <PanelDetail
          position={[-0.68, 0.415, 0]}
          size={[0.045, 0.045, 0.014]}
          color={palette.edge}
          opacity={detailOpacity * 0.7}
        />
        <PanelDetail
          position={[-0.59, 0.415, 0]}
          size={[0.045, 0.045, 0.014]}
          color={palette.edge}
          opacity={detailOpacity * 0.55}
        />
        <PanelDetail
          position={[-0.5, 0.415, 0]}
          size={[0.045, 0.045, 0.014]}
          color={palette.edge}
          opacity={detailOpacity * 0.4}
        />
        <PanelDetail
          position={[-0.56, -0.07, 0]}
          size={[0.38, 0.68, 0.014]}
          color={palette.edge}
          opacity={detailOpacity * 0.28}
        />
        <PanelDetail
          position={[0.13, 0.15, 0]}
          size={[0.45, 0.22, 0.014]}
          color={palette.edge}
          opacity={detailOpacity * 0.24}
        />
        <PanelDetail
          position={[0.52, 0.17, 0]}
          size={[0.22, 0.035, 0.014]}
          color={palette.edge}
          opacity={detailOpacity * 0.5}
        />
        {[-0.28, 0.05, 0.38].map((x) => (
          <PanelDetail
            key={x}
            position={[x, -0.2, 0]}
            size={[0.25, 0.2, 0.014]}
            color={palette.edge}
            opacity={detailOpacity * 0.2}
          />
        ))}
        {!mobile && (
          <PanelDetail
            position={[0.05, -0.39, 0]}
            size={[0.54, 0.028, 0.014]}
            color={palette.edge}
            opacity={detailOpacity * 0.38}
          />
        )}
      </ApplicationLayer>
    </group>
  );
}
