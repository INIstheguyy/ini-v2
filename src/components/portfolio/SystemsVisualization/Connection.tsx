import { ThinLine } from "./ThinLine";
import type { Point3 } from "./systems-data";
import type { ScenePalette } from "./scene-types";

type ConnectionProps = {
  from: Point3;
  to: Point3;
  emphasized: boolean;
  secondary: boolean;
  mobile: boolean;
  palette: ScenePalette;
};

export function Connection({ from, to, emphasized, secondary, mobile, palette }: ConnectionProps) {
  const idleOpacity = secondary ? (mobile ? 0.11 : 0.16) : 0.28;
  return (
    <ThinLine
      from={from}
      to={to}
      color={emphasized ? palette.edge : palette.line}
      opacity={emphasized ? 0.84 : idleOpacity}
    />
  );
}
