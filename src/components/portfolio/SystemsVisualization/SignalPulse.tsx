import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";

import type { Point3 } from "./systems-data";
import { SCENE_CONFIG } from "./scene-config";

export function SignalPulse({
  from,
  to,
  color,
  mobile,
}: {
  from: Point3;
  to: Point3;
  color: string;
  mobile: boolean;
}) {
  const pulse = useRef<Mesh>(null);
  const startedAt = useRef<number | null>(null);
  const start = useRef(new Vector3(...from));
  const end = useRef(new Vector3(...to));

  useFrame(({ clock }) => {
    if (!pulse.current) return;
    const started = startedAt.current ?? clock.elapsedTime;
    startedAt.current = started;
    const progress = Math.min(
      (clock.elapsedTime - started) / SCENE_CONFIG.animation.pulseTravelSeconds,
      1,
    );
    const eased = progress * progress * (3 - 2 * progress);
    pulse.current.position.lerpVectors(start.current, end.current, eased);
    pulse.current.visible = progress < 1;
  });

  return (
    <mesh ref={pulse}>
      <sphereGeometry args={[mobile ? 0.07 : 0.085, 10, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}
