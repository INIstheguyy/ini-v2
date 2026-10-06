import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, Line, LineBasicMaterial, Vector3 } from "three";

import type { Point3 } from "./systems-data";

type ThinLineProps = {
  from: Point3;
  to: Point3;
  color: string;
  opacity: number;
  revealed?: boolean;
  revealDuration?: number;
};

export function ThinLine({
  from,
  to,
  color,
  opacity,
  revealed = true,
  revealDuration = 0.42,
}: ThinLineProps) {
  const progress = useRef(revealed ? 1 : 0);
  const revealStartedAt = useRef<number | null>(null);
  const wasRevealed = useRef(revealed);
  const start = useMemo(() => new Vector3(...from), [from]);
  const end = useMemo(() => new Vector3(...to), [to]);
  const currentEnd = useMemo(() => new Vector3(...from), [from]);
  const geometry = useMemo(
    () => new BufferGeometry().setFromPoints([start, currentEnd]),
    [currentEnd, start],
  );
  const material = useMemo(() => {
    const nextMaterial = new LineBasicMaterial({
      color,
      opacity,
      transparent: true,
      depthWrite: false,
    });
    nextMaterial.userData["baseOpacity"] = opacity;
    return nextMaterial;
  }, [color, opacity]);
  const line = useMemo(() => new Line(geometry, material), [geometry, material]);

  useFrame(({ clock }) => {
    if (revealed && !wasRevealed.current) {
      revealStartedAt.current = clock.elapsedTime;
    }
    wasRevealed.current = revealed;

    if (!revealed) {
      progress.current = 0;
      revealStartedAt.current = null;
    } else if (revealStartedAt.current !== null) {
      const raw = Math.min((clock.elapsedTime - revealStartedAt.current) / revealDuration, 1);
      progress.current = raw * raw * (3 - 2 * raw);
      if (raw === 1) revealStartedAt.current = null;
    } else if (progress.current === 0) {
      progress.current = 1;
    }

    currentEnd.lerpVectors(start, end, progress.current);
    const positions = geometry.getAttribute("position") as BufferAttribute;
    positions.setXYZ(0, start.x, start.y, start.z);
    positions.setXYZ(1, currentEnd.x, currentEnd.y, currentEnd.z);
    positions.needsUpdate = true;
  });

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  return <primitive object={line} />;
}
