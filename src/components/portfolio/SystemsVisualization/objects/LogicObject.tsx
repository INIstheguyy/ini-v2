import { SCENE_CONFIG } from "../scene-config";
import type { ScenePalette } from "../scene-types";
import { objectDetailOpacity, PanelDetail, SoftwarePanel } from "./SoftwarePanel";

type LogicObjectProps = {
  emphasized: boolean;
  dimmed: boolean;
  mobile: boolean;
  palette: ScenePalette;
};

const CODE_LINES = [
  { x: -0.08, y: 0.22, width: 0.5, strength: 0.65 },
  { x: 0.01, y: 0.13, width: 0.62, strength: 0.42 },
  { x: -0.04, y: 0.04, width: 0.52, strength: 0.52 },
  { x: 0.08, y: -0.05, width: 0.58, strength: 0.34 },
  { x: -0.02, y: -0.14, width: 0.42, strength: 0.46 },
  { x: 0.06, y: -0.23, width: 0.54, strength: 0.3 },
];

export function LogicObject({ emphasized, dimmed, mobile, palette }: LogicObjectProps) {
  const config = SCENE_CONFIG.objects.logic;
  const opacity = objectDetailOpacity(emphasized, dimmed);

  return (
    <group rotation={SCENE_CONFIG.objects.rotations.logic}>
      <group position={config.backPosition}>
        <SoftwarePanel
          size={config.backSize}
          palette={palette}
          emphasized={emphasized}
          dimmed={dimmed}
          opacityScale={0.48}
        >
          <PanelDetail
            position={[-0.42, 0, 0]}
            size={[0.24, 0.62, 0.012]}
            color={palette.edge}
            opacity={opacity * 0.12}
          />
        </SoftwarePanel>
      </group>

      <group position={config.frontPosition}>
        <SoftwarePanel
          size={config.frontSize}
          palette={palette}
          emphasized={emphasized}
          dimmed={dimmed}
        >
          <PanelDetail
            position={[-0.5, 0, 0]}
            size={[0.27, 0.72, 0.014]}
            color={palette.edge}
            opacity={opacity * 0.25}
          />
          {[-0.25, -0.14, -0.03, 0.08, 0.19].map((y, index) => (
            <PanelDetail
              key={y}
              position={[-0.52 + (index % 2) * 0.035, y, 0]}
              size={[index % 2 === 0 ? 0.13 : 0.1, 0.025, 0.012]}
              color={palette.edge}
              opacity={opacity * (0.32 + index * 0.045)}
            />
          ))}
          {CODE_LINES.slice(0, mobile ? 5 : CODE_LINES.length).map((line) => (
            <PanelDetail
              key={line.y}
              position={[line.x + 0.15, line.y, 0]}
              size={[line.width, 0.028, 0.012]}
              color={palette.edge}
              opacity={opacity * line.strength}
            />
          ))}
        </SoftwarePanel>
      </group>
    </group>
  );
}
