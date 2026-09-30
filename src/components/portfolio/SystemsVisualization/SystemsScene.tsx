import { useEffect, useMemo, useState } from "react";

import { ApplicationCore } from "./objects/ApplicationCore";
import { DataObject } from "./objects/DataObject";
import { IntegrationsObject } from "./objects/IntegrationsObject";
import { InterfaceObject } from "./objects/InterfaceObject";
import { LogicObject } from "./objects/LogicObject";
import { Connection } from "./Connection";
import { SignalPulse } from "./SignalPulse";
import { SystemNode } from "./SystemNode";
import {
  CONNECTIONS,
  CORE_POSITION,
  INTRO_ROUTE,
  SYSTEMS,
  positionFor,
  type SystemKey,
} from "./systems-data";
import type { ScenePalette } from "./scene-types";
import { SCENE_CONFIG } from "./scene-config";

const STEP_DURATION = SCENE_CONFIG.animation.stepDurationMs;

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
  const [sequenceStep, setSequenceStep] = useState(-1);

  useEffect(() => {
    if (reducedMotion || !playIntro) {
      setSequenceStep(-1);
      return;
    }

    setSequenceStep(0);
    const timers = INTRO_ROUTE.slice(1).map((_, index) =>
      window.setTimeout(() => setSequenceStep(index + 1), (index + 1) * STEP_DURATION),
    );
    timers.push(window.setTimeout(() => setSequenceStep(-1), INTRO_ROUTE.length * STEP_DURATION));
    return () => timers.forEach(window.clearTimeout);
  }, [playIntro, reducedMotion]);

  const route = sequenceStep >= 0 ? INTRO_ROUTE[sequenceStep] : undefined;
  const sourceSystem = route?.from === "core" ? null : (route?.from ?? null);
  const coreMoment = useMemo(() => {
    if (!route) return null;
    if (route.to === "core") return 0.83;
    if (route.from === "core") return 0.14;
    return null;
  }, [route]);

  const renderSystem = (key: SystemKey) => {
    const emphasized = activeSystem === key || sourceSystem === key;
    const common = { emphasized, palette };
    const object = {
      interface: <InterfaceObject {...common} />,
      logic: <LogicObject {...common} />,
      data: <DataObject {...common} mobile={mobile} />,
      integrations: <IntegrationsObject {...common} mobile={mobile} />,
    }[key];

    return (
      <SystemNode
        key={key}
        system={key}
        position={positionFor(key, mobile)}
        active={activeSystem === key}
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

      {CONNECTIONS.map((connection) => {
        const selected =
          activeSystem !== null &&
          (connection.from === activeSystem || connection.to === activeSystem);
        const inIntro =
          route !== undefined &&
          ((connection.from === route.from && connection.to === route.to) ||
            (connection.from === route.to && connection.to === route.from));
        return (
          <Connection
            key={connection.id}
            from={positionFor(connection.from, mobile)}
            to={positionFor(connection.to, mobile)}
            emphasized={selected || inIntro}
            secondary={connection.secondary ?? false}
            mobile={mobile}
            palette={palette}
          />
        );
      })}

      <group position={CORE_POSITION}>
        <ApplicationCore
          palette={palette}
          reducedMotion={reducedMotion}
          mobile={mobile}
          sequenceStep={sequenceStep}
          coreMoment={coreMoment}
        />
      </group>

      {(Object.keys(SYSTEMS) as SystemKey[]).map(renderSystem)}

      {route && (
        <SignalPulse
          key={route.id}
          from={positionFor(route.from, mobile)}
          to={positionFor(route.to, mobile)}
          color={palette.pulse}
          mobile={mobile}
        />
      )}
    </>
  );
}
