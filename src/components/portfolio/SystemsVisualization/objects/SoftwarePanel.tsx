import { useEffect, useMemo, type ReactNode } from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import { SCENE_CONFIG } from "../scene-config";
import type { ScenePalette } from "../scene-types";
import type { Point3 } from "../systems-data";

export const objectDetailOpacity = (emphasized: boolean, dimmed: boolean) => {
  if (emphasized) return SCENE_CONFIG.objects.appearance.emphasizedDetailOpacity;
  if (dimmed) return SCENE_CONFIG.objects.appearance.dimmedDetailOpacity;
  return SCENE_CONFIG.objects.appearance.detailOpacity;
};

type SoftwarePanelProps = {
  size: Point3;
  palette: ScenePalette;
  emphasized: boolean;
  dimmed: boolean;
  opacityScale?: number;
  children?: ReactNode;
};

export function SoftwarePanel({
  size,
  palette,
  emphasized,
  dimmed,
  opacityScale = 1,
  children,
}: SoftwarePanelProps) {
  const [width, height, depth] = size;
  const detailOpacity = objectDetailOpacity(emphasized, dimmed) * opacityScale;
  const surfaceOpacity = dimmed
    ? SCENE_CONFIG.objects.appearance.dimmedSurfaceOpacity * opacityScale
    : SCENE_CONFIG.objects.appearance.surfaceOpacity * opacityScale;
  const edge = 0.022;
  const front = depth / 2 + 0.008;
  const cornerRadius = Math.min(0.035, depth * 0.38);
  const geometry = useMemo(
    () => new RoundedBoxGeometry(width, height, depth, 2, cornerRadius),
    [cornerRadius, depth, height, width],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <group>
      <mesh>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial
          color={emphasized ? palette.solidActive : palette.solid}
          opacity={surfaceOpacity}
          transparent
          roughness={0.88}
          metalness={0.02}
          userData={{ baseOpacity: surfaceOpacity }}
        />
      </mesh>
      <group position={[0, 0, front]}>
        {[
          {
            position: [0, height / 2, 0] as Point3,
            size: [width - cornerRadius * 2, edge, edge] as Point3,
          },
          {
            position: [0, -height / 2, 0] as Point3,
            size: [width - cornerRadius * 2, edge, edge] as Point3,
          },
          {
            position: [-width / 2, 0, 0] as Point3,
            size: [edge, height - cornerRadius * 2, edge] as Point3,
          },
          {
            position: [width / 2, 0, 0] as Point3,
            size: [edge, height - cornerRadius * 2, edge] as Point3,
          },
        ].map((part, index) => (
          <PanelDetail
            key={index}
            position={part.position}
            size={part.size}
            color={palette.edge}
            opacity={detailOpacity}
          />
        ))}
        {children}
      </group>
    </group>
  );
}

export function PanelDetail({
  position,
  size,
  color,
  opacity,
}: {
  position: Point3;
  size: Point3;
  color: string;
  opacity: number;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshBasicMaterial
        color={color}
        opacity={opacity}
        transparent
        userData={{ baseOpacity: opacity }}
      />
    </mesh>
  );
}
