import type { ScenePalette } from "../scene-types";

export function DataObject({
  emphasized,
  palette,
  mobile,
}: {
  emphasized: boolean;
  palette: ScenePalette;
  mobile: boolean;
}) {
  const layers = mobile ? [-0.26, 0, 0.26] : [-0.32, -0.1, 0.12, 0.34];

  return (
    <group rotation={[0.06, -0.2, 0]}>
      {layers.map((y) => (
        <group key={y} position={[0, y, 0]}>
          <mesh>
            <cylinderGeometry args={[0.62, 0.62, 0.24, mobile ? 18 : 24]} />
            <meshStandardMaterial
              color={emphasized ? palette.solidActive : palette.solid}
              roughness={0.86}
              metalness={0.03}
            />
          </mesh>
          <mesh scale={1.01}>
            <cylinderGeometry args={[0.62, 0.62, 0.24, mobile ? 18 : 24]} />
            <meshBasicMaterial
              color={palette.edge}
              opacity={emphasized ? 0.86 : 0.38}
              transparent
              wireframe
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
