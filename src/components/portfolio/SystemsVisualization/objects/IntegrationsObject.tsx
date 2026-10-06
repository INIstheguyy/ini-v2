import { SCENE_CONFIG } from "../scene-config";
import type { ScenePalette } from "../scene-types";
import type { Point3 } from "../systems-data";
import { ThinLine } from "../ThinLine";
import { objectDetailOpacity, PanelDetail, SoftwarePanel } from "./SoftwarePanel";

type IntegrationsObjectProps = {
  emphasized: boolean;
  dimmed: boolean;
  mobile: boolean;
  palette: ScenePalette;
};

export function IntegrationsObject({
  emphasized,
  dimmed,
  mobile,
  palette,
}: IntegrationsObjectProps) {
  const config = SCENE_CONFIG.objects.integrations;
  const opacity = objectDetailOpacity(emphasized, dimmed);
  const services = mobile ? config.servicePositions.slice(0, 2) : config.servicePositions;

  return (
    <group rotation={SCENE_CONFIG.objects.rotations.integrations}>
      {services.map((position, index) => {
        const port: Point3 = [
          config.apiPosition[0] + config.apiSize[0] / 2,
          0.22 - index * 0.22,
          config.apiPosition[2],
        ];
        return (
          <group key={index}>
            <ThinLine from={port} to={position} color={palette.edge} opacity={opacity * 0.62} />
            <group position={position}>
              <SoftwarePanel
                size={config.serviceSize}
                palette={palette}
                emphasized={emphasized}
                dimmed={dimmed}
                opacityScale={0.82}
              >
                <PanelDetail
                  position={[-0.15, 0, 0]}
                  size={[0.08, 0.08, 0.012]}
                  color={palette.edge}
                  opacity={opacity * (0.42 + index * 0.12)}
                />
                <PanelDetail
                  position={[0.07, 0.035, 0]}
                  size={[0.21, 0.03, 0.012]}
                  color={palette.edge}
                  opacity={opacity * 0.48}
                />
                <PanelDetail
                  position={[0.03, -0.04, 0]}
                  size={[0.15, 0.022, 0.012]}
                  color={palette.edge}
                  opacity={opacity * 0.28}
                />
              </SoftwarePanel>
            </group>
          </group>
        );
      })}

      <group position={config.apiPosition}>
        <SoftwarePanel
          size={config.apiSize}
          palette={palette}
          emphasized={emphasized}
          dimmed={dimmed}
        >
          <PanelDetail
            position={[-0.14, 0.31, 0]}
            size={[0.18, 0.035, 0.012]}
            color={palette.edge}
            opacity={opacity * 0.72}
          />
          {[0.16, -0.04, -0.24].map((y, index) => (
            <group key={y}>
              <PanelDetail
                position={[-0.19, y, 0]}
                size={[0.075, 0.075, 0.012]}
                color={palette.edge}
                opacity={opacity * (0.5 + index * 0.08)}
              />
              <PanelDetail
                position={[0.08, y + 0.02, 0]}
                size={[0.3, 0.035, 0.012]}
                color={palette.edge}
                opacity={opacity * 0.46}
              />
              <PanelDetail
                position={[0.03, y - 0.055, 0]}
                size={[0.2, 0.02, 0.012]}
                color={palette.edge}
                opacity={opacity * 0.25}
              />
            </group>
          ))}
        </SoftwarePanel>
      </group>
    </group>
  );
}
