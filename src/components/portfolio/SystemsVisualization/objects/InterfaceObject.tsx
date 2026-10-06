import { SCENE_CONFIG } from "../scene-config";
import type { ScenePalette } from "../scene-types";
import { objectDetailOpacity, PanelDetail, SoftwarePanel } from "./SoftwarePanel";

type InterfaceObjectProps = {
  emphasized: boolean;
  dimmed: boolean;
  mobile: boolean;
  palette: ScenePalette;
};

export function InterfaceObject({ emphasized, dimmed, mobile, palette }: InterfaceObjectProps) {
  const config = SCENE_CONFIG.objects.interface;
  const opacity = objectDetailOpacity(emphasized, dimmed);

  return (
    <group rotation={SCENE_CONFIG.objects.rotations.interface}>
      <group position={config.browserPosition}>
        <SoftwarePanel
          size={config.browserSize}
          palette={palette}
          emphasized={emphasized}
          dimmed={dimmed}
        >
          <PanelDetail
            position={[0, 0.22, 0]}
            size={[1.12, 0.018, 0.014]}
            color={palette.edge}
            opacity={opacity}
          />
          <PanelDetail
            position={[-0.48, 0.29, 0]}
            size={[0.045, 0.045, 0.014]}
            color={palette.edge}
            opacity={opacity * 0.8}
          />
          <PanelDetail
            position={[-0.4, 0.29, 0]}
            size={[0.045, 0.045, 0.014]}
            color={palette.edge}
            opacity={opacity * 0.65}
          />
          <PanelDetail
            position={[-0.32, 0.29, 0]}
            size={[0.045, 0.045, 0.014]}
            color={palette.edge}
            opacity={opacity * 0.5}
          />
          <PanelDetail
            position={[-0.37, -0.04, 0]}
            size={[0.23, 0.28, 0.014]}
            color={palette.edge}
            opacity={opacity * 0.28}
          />
          <PanelDetail
            position={[0.14, 0.06, 0]}
            size={[0.48, 0.055, 0.014]}
            color={palette.edge}
            opacity={opacity * 0.62}
          />
          <PanelDetail
            position={[0.05, -0.08, 0]}
            size={[0.66, 0.035, 0.014]}
            color={palette.edge}
            opacity={opacity * 0.4}
          />
          {!mobile && (
            <PanelDetail
              position={[0.13, -0.18, 0]}
              size={[0.5, 0.035, 0.014]}
              color={palette.edge}
              opacity={opacity * 0.3}
            />
          )}
        </SoftwarePanel>
      </group>

      <group position={config.phonePosition} rotation={[0.02, -0.12, 0.035]}>
        <SoftwarePanel
          size={config.phoneSize}
          palette={palette}
          emphasized={emphasized}
          dimmed={dimmed}
        >
          <PanelDetail
            position={[0, 0.29, 0]}
            size={[0.16, 0.024, 0.014]}
            color={palette.edge}
            opacity={opacity * 0.65}
          />
          <PanelDetail
            position={[0, 0.12, 0]}
            size={[0.25, 0.13, 0.014]}
            color={palette.edge}
            opacity={opacity * 0.25}
          />
          <PanelDetail
            position={[-0.03, -0.04, 0]}
            size={[0.25, 0.035, 0.014]}
            color={palette.edge}
            opacity={opacity * 0.5}
          />
          <PanelDetail
            position={[-0.06, -0.14, 0]}
            size={[0.19, 0.035, 0.014]}
            color={palette.edge}
            opacity={opacity * 0.35}
          />
          <PanelDetail
            position={[0, -0.31, 0]}
            size={[0.1, 0.018, 0.014]}
            color={palette.edge}
            opacity={opacity * 0.6}
          />
        </SoftwarePanel>
      </group>
    </group>
  );
}
