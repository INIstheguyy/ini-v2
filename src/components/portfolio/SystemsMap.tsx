import { useState } from "react";

import { WhatIDo } from "./WhatIDo";
import { LazySystemsVisualization } from "./SystemsVisualization/LazySystemsVisualization";
import type { SystemKey } from "./SystemsVisualization/systems-data";

export function SystemsMap() {
  const [activeSystem, setActiveSystem] = useState<SystemKey | null>(null);

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      <LazySystemsVisualization
        activeSystem={activeSystem}
        onActiveSystemChange={setActiveSystem}
      />
      <WhatIDo activeSystem={activeSystem} onActiveSystemChange={setActiveSystem} />
    </div>
  );
}
