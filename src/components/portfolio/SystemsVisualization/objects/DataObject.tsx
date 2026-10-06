import { SCENE_CONFIG } from "../scene-config";
import type { ScenePalette } from "../scene-types";
import { objectDetailOpacity, PanelDetail, SoftwarePanel } from "./SoftwarePanel";

type DataObjectProps = {
  emphasized: boolean;
  dimmed: boolean;
  mobile: boolean;
  palette: ScenePalette;
};

export function DataObject({ emphasized, dimmed, mobile, palette }: DataObjectProps) {
  const config = SCENE_CONFIG.objects.data;
  const opacity = objectDetailOpacity(emphasized, dimmed);
  const cards = mobile ? config.cardPositions.slice(1) : config.cardPositions;

  return (
    <group rotation={SCENE_CONFIG.objects.rotations.data}>
      {cards.map((position, index) => (
        <group key={index} position={position}>
          <SoftwarePanel
            size={config.cardSize}
            palette={palette}
            emphasized={emphasized}
            dimmed={dimmed}
          >
            <PanelDetail
              position={[-0.24, 0, 0]}
              size={[0.018, 0.56, 0.012]}
              color={palette.edge}
              opacity={opacity * 0.48}
            />
            <PanelDetail
              position={[0.1, 0, 0]}
              size={[0.018, 0.56, 0.012]}
              color={palette.edge}
              opacity={opacity * 0.36}
            />
            <PanelDetail
              position={[0, 0.13, 0]}
              size={[1.02, 0.018, 0.012]}
              color={palette.edge}
              opacity={opacity * 0.58}
            />
            <PanelDetail
              position={[0, -0.03, 0]}
              size={[1.02, 0.015, 0.012]}
              color={palette.edge}
              opacity={opacity * 0.34}
            />
            {!mobile && (
              <PanelDetail
                position={[0, -0.18, 0]}
                size={[1.02, 0.015, 0.012]}
                color={palette.edge}
                opacity={opacity * 0.28}
              />
            )}
          </SoftwarePanel>
        </group>
      ))}
    </group>
  );
}
