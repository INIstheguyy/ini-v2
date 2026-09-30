import type { ScenePalette } from "../scene-types";

export function IntegrationsObject({
  emphasized,
  palette,
  mobile,
}: {
  emphasized: boolean;
  palette: ScenePalette;
  mobile: boolean;
}) {
  const segments = mobile ? 18 : 28;

  return (
    <group rotation={[0.18, -0.22, 0.08]}>
      <mesh position={[-0.24, 0, 0]} rotation={[Math.PI / 2, 0.2, 0]}>
        <torusGeometry args={[0.43, 0.12, 8, segments]} />
        <meshStandardMaterial
          color={emphasized ? palette.solidActive : palette.solid}
          roughness={0.72}
          metalness={0.08}
        />
      </mesh>
      <mesh position={[0.24, 0, 0.03]} rotation={[Math.PI / 2, -0.2, Math.PI / 2]}>
        <torusGeometry args={[0.43, 0.12, 8, segments]} />
        <meshStandardMaterial
          color={emphasized ? palette.solidActive : palette.solid}
          roughness={0.72}
          metalness={0.08}
        />
      </mesh>
      <mesh position={[-0.24, 0, 0]} rotation={[Math.PI / 2, 0.2, 0]} scale={1.014}>
        <torusGeometry args={[0.43, 0.12, 8, segments]} />
        <meshBasicMaterial
          color={palette.edge}
          opacity={emphasized ? 0.88 : 0.34}
          transparent
          wireframe
        />
      </mesh>
      <mesh position={[0.24, 0, 0.03]} rotation={[Math.PI / 2, -0.2, Math.PI / 2]} scale={1.014}>
        <torusGeometry args={[0.43, 0.12, 8, segments]} />
        <meshBasicMaterial
          color={palette.edge}
          opacity={emphasized ? 0.88 : 0.34}
          transparent
          wireframe
        />
      </mesh>
    </group>
  );
}
