import { lazy, Suspense, useEffect, useRef, useState } from "react";

import type { SystemKey } from "./systems-data";
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
    if (!marker.current || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      setPlayIntro(true);
      return;
    }

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          preloadObserver.disconnect();
        }
      },
      { rootMargin: "260px 0px", threshold: 0.01 },
    );
    const entryObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setPlayIntro(true);
          entryObserver.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    preloadObserver.observe(marker.current);
    entryObserver.observe(marker.current);
    return () => {
      preloadObserver.disconnect();
      entryObserver.disconnect();
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
