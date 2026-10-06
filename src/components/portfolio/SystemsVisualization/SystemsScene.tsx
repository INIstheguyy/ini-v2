import { useEffect, useState } from "react";

import { ApplicationCore } from "./objects/ApplicationCore";
import { DataObject } from "./objects/DataObject";
import { IntegrationsObject } from "./objects/IntegrationsObject";
import { InterfaceObject } from "./objects/InterfaceObject";
import { LogicObject } from "./objects/LogicObject";
import { Connection } from "./Connection";
import { SCENE_CONFIG } from "./scene-config";
import type { ScenePalette } from "./scene-types";
import { SystemNode } from "./SystemNode";
import { CONNECTIONS, CORE_POSITION, SYSTEMS, positionFor, type SystemKey } from "./systems-data";

const MODULE_ORDER: SystemKey[] = ["interface", "logic", "data", "integrations"];

type SystemsSceneProps = {
  activeSystem: SystemKey | null;
  onActiveSystemChange: (system: SystemKey | null) => void;
  mobile: boolean;
  reducedMotion: boolean;
  playIntro: boolean;
  palette: ScenePalette;
};

export function SystemsScene({
  activeSystem,
  onActiveSystemChange,
  mobile,
  reducedMotion,
  playIntro,
  palette,
}: SystemsSceneProps) {
  const [applicationStage, setApplicationStage] = useState(reducedMotion ? 3 : 0);
  const [visibleModuleCount, setVisibleModuleCount] = useState(
    reducedMotion ? MODULE_ORDER.length : 0,
  );
  const [visibleConnectionCount, setVisibleConnectionCount] = useState(
    reducedMotion ? CONNECTIONS.length : 0,
  );
  const [introComplete, setIntroComplete] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setApplicationStage(3);
      setVisibleModuleCount(MODULE_ORDER.length);
      setVisibleConnectionCount(CONNECTIONS.length);
      setIntroComplete(true);
      return;
    }

    if (!playIntro) {
      setApplicationStage(0);
      setVisibleModuleCount(0);
      setVisibleConnectionCount(0);
      setIntroComplete(false);
      return;
    }

    const intro = SCENE_CONFIG.animation.intro;
    const timers: number[] = [];
    setApplicationStage(1);
    setVisibleModuleCount(0);
    setVisibleConnectionCount(0);
    setIntroComplete(false);

    [2, 3].forEach((stage, index) => {
      timers.push(
        window.setTimeout(
          () => setApplicationStage(stage),
          (index + 1) * intro.applicationLayerStaggerMs,
        ),
      );
    });

    MODULE_ORDER.forEach((_, index) => {
      timers.push(
        window.setTimeout(
          () => setVisibleModuleCount(index + 1),
          intro.moduleStartMs + index * intro.moduleStaggerMs,
        ),
      );
    });

    CONNECTIONS.forEach((_, index) => {
      timers.push(
        window.setTimeout(
          () => setVisibleConnectionCount(index + 1),
          intro.connectionStartMs + index * intro.connectionStaggerMs,
        ),
      );
    });

    timers.push(window.setTimeout(() => setIntroComplete(true), intro.settleMs));
    return () => timers.forEach(window.clearTimeout);
  }, [playIntro, reducedMotion]);

  const renderSystem = (key: SystemKey, index: number) => {
    const emphasized = activeSystem === key;
    const dimmed = activeSystem !== null && activeSystem !== key;
    const common = { emphasized, dimmed, palette, mobile };
    const object = {
      interface: <InterfaceObject {...common} />,
      logic: <LogicObject {...common} />,
      data: <DataObject {...common} />,
      integrations: <IntegrationsObject {...common} />,
    }[key];

    return (
      <SystemNode
        key={key}
        system={key}
        position={positionFor(key, mobile)}
        active={emphasized}
        revealed={index < visibleModuleCount}
        idle={introComplete}
        mobile={mobile}
        reducedMotion={reducedMotion}
        onActiveChange={onActiveSystemChange}
      >
        {object}
      </SystemNode>
    );
  };

  return (
    <>
      <ambientLight
        intensity={
          mobile ? SCENE_CONFIG.lighting.ambientMobile : SCENE_CONFIG.lighting.ambientDesktop
        }
      />
      <directionalLight
        position={SCENE_CONFIG.lighting.directionalPosition}
        intensity={
          mobile
            ? SCENE_CONFIG.lighting.directionalMobile
            : SCENE_CONFIG.lighting.directionalDesktop
        }
      />

      {CONNECTIONS.map((connection, index) => {
        const selected =
          activeSystem !== null &&
          (connection.from === activeSystem || connection.to === activeSystem);
        return (
          <Connection
            key={connection.id}
            from={positionFor(connection.from, mobile)}
            to={positionFor(connection.to, mobile)}
            emphasized={selected}
            dimmed={activeSystem !== null && !selected}
            revealed={index < visibleConnectionCount}
            palette={palette}
          />
        );
      })}

      <group position={CORE_POSITION}>
        <ApplicationCore
          palette={palette}
          reducedMotion={reducedMotion}
          mobile={mobile}
          introStage={applicationStage}
          active={activeSystem !== null}
          idle={introComplete}
        />
      </group>

      {MODULE_ORDER.map(renderSystem)}
    </>
  );
}
