import { lazy, Suspense, useEffect, useRef, useState } from "react";

import type { SystemKey } from "./systems-data";
import { SCENE_CONFIG } from "./scene-config";
import styles from "./systemsVisualization.module.css";

const SystemsVisualization = lazy(() => import("./SystemsVisualization"));

type LazySystemsVisualizationProps = {
  activeSystem: SystemKey | null;
  onActiveSystemChange: (system: SystemKey | null) => void;
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function LoadingState() {
  return <div className={styles["loading"]}>System model</div>;
}

export function LazySystemsVisualization({
  activeSystem,
  onActiveSystemChange,
}: LazySystemsVisualizationProps) {
  const marker = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [playIntro, setPlayIntro] = useState(false);
  const mobile = useMediaQuery("(max-width: 767px)");
  const hoverCapable = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    let introTimer: number | undefined;
    const scheduleIntro = () => {
      introTimer ??= window.setTimeout(
        () => setPlayIntro(true),
        SCENE_CONFIG.viewport.introDelayMs,
      );
    };

    if (!marker.current || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      scheduleIntro();
      return () => window.clearTimeout(introTimer);
    }

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          preloadObserver.disconnect();
        }
      },
      { rootMargin: SCENE_CONFIG.viewport.preloadMargin, threshold: 0.01 },
    );
    const entryObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          scheduleIntro();
          entryObserver.disconnect();
        }
      },
      { threshold: SCENE_CONFIG.viewport.introVisibilityThreshold },
    );
    preloadObserver.observe(marker.current);
    entryObserver.observe(marker.current);
    return () => {
      preloadObserver.disconnect();
      entryObserver.disconnect();
      window.clearTimeout(introTimer);
    };
  }, []);

  return (
    <div ref={marker}>
      {shouldLoad ? (
        <Suspense fallback={<LoadingState />}>
          <SystemsVisualization
            activeSystem={activeSystem}
            onActiveSystemChange={onActiveSystemChange}
            mobile={mobile}
            hoverCapable={hoverCapable}
            reducedMotion={reducedMotion}
            playIntro={playIntro}
          />
        </Suspense>
      ) : (
        <LoadingState />
      )}
    </div>
  );
}
