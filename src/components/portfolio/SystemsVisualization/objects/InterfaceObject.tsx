import type { ScenePalette } from "../scene-types";

export function InterfaceObject({
  emphasized,
  palette,
}: {
  emphasized: boolean;
  palette: ScenePalette;
}) {
  return (
    <group rotation={[-0.08, -0.18, 0.02]}>
      <mesh>
        <boxGeometry args={[1.5, 0.92, 0.18]} />
        <meshStandardMaterial
          color={emphasized ? palette.solidActive : palette.solid}
          roughness={0.82}
          metalness={0.04}
        />
      </mesh>
      <mesh scale={1.012}>
        <boxGeometry args={[1.5, 0.92, 0.18]} />
        <meshBasicMaterial
          color={palette.edge}
          opacity={emphasized ? 0.9 : 0.42}
          transparent
          wireframe
        />
      </mesh>
      <mesh position={[-0.38, 0.16, 0.101]}>
        <boxGeometry args={[0.5, 0.08, 0.018]} />
        <meshBasicMaterial color={palette.edge} opacity={0.68} transparent />
      </mesh>
      <mesh position={[-0.24, -0.05, 0.101]}>
        <boxGeometry args={[0.78, 0.045, 0.018]} />
        <meshBasicMaterial color={palette.edge} opacity={0.38} transparent />
      </mesh>
      <mesh position={[-0.36, -0.21, 0.101]}>
        <boxGeometry args={[0.54, 0.045, 0.018]} />
        <meshBasicMaterial color={palette.edge} opacity={0.3} transparent />
      </mesh>
    </group>
  );
}
