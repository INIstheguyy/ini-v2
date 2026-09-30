import { useEffect, useMemo } from "react";
import { BufferGeometry, Line, LineBasicMaterial, Vector3 } from "three";

import type { Point3 } from "./systems-data";

type ThinLineProps = {
  from: Point3;
  to: Point3;
  color: string;
  opacity: number;
};

export function ThinLine({ from, to, color, opacity }: ThinLineProps) {
  const geometry = useMemo(
    () => new BufferGeometry().setFromPoints([new Vector3(...from), new Vector3(...to)]),
    [from, to],
  );
  const material = useMemo(
    () =>
      new LineBasicMaterial({
        color,
        opacity,
        transparent: true,
        depthWrite: false,
      }),
    [color, opacity],
  );
  const line = useMemo(() => new Line(geometry, material), [geometry, material]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  return <primitive object={line} />;
}
