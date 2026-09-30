export const SCENE_CONFIG = {
  camera: {
    desktop: { position: [0, 0.1, 8.8] as [number, number, number], fov: 40 },
    mobile: { position: [0, 0.15, 8.4] as [number, number, number], fov: 43 },
  },
  dpr: {
    desktop: [1, 1.5] as [number, number],
    mobile: [1, 1.25] as [number, number],
  },
  lighting: {
    ambientDesktop: 1.05,
    ambientMobile: 1.25,
    directionalDesktop: 2.4,
    directionalMobile: 2.1,
    directionalPosition: [3.5, 4.5, 6] as [number, number, number],
  },
  animation: {
    stepDurationMs: 1080,
    pulseTravelSeconds: 0.9,
    corePulseStrength: 0.05,
    activeObjectScale: 1.055,
  },
} as const;
