import type { Point3 } from "../systems-data";
import type { ScenePalette } from "../scene-types";
import { ThinLine } from "../ThinLine";

const NODES: Point3[] = [
  [-0.5, 0.35, 0.08],
  [0.46, 0.4, -0.02],
  [-0.42, -0.38, 0.02],
  [0.48, -0.31, 0.13],
  [0.02, 0, 0.3],
];

const LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 4],
  [1, 3],
  [1, 4],
  [2, 3],
  [2, 4],
  [3, 4],
];

export function LogicObject({
  emphasized,
  palette,
}: {
  emphasized: boolean;
  palette: ScenePalette;
}) {
  return (
    <group rotation={[0.08, 0.22, -0.04]}>
      {LINKS.map(([from, to]) => (
        <ThinLine
          key={`${from}-${to}`}
          from={NODES[from] ?? [0, 0, 0]}
          to={NODES[to] ?? [0, 0, 0]}
          color={palette.edge}
          opacity={emphasized ? 0.86 : 0.44}
        />
      ))}
      {NODES.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[index === 4 ? 0.16 : 0.13, 10, 8]} />
          <meshStandardMaterial
            color={emphasized ? palette.solidActive : palette.solid}
            roughness={0.78}
          />
        </mesh>
      ))}
    </group>
  );
}
