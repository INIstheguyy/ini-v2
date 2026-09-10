import { useRef } from "react";

import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { gsap, prefersReducedMotion, SplitText } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    let splits: SplitText[] = [];

    const ctx = gsap.context(() => {
      // Entrance: title + subtext slide up + fade in on mount.
      gsap.from("[data-hero-item]", {
        y: 48,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.1,
      });

      // About copy: split into words so each word can reveal on its own,
      // instead of the whole paragraph fading as one block.
      splits = gsap.utils
        .toArray<HTMLElement>("[data-about-line]")
        .map((line) => new SplitText(line, { type: "words" }));
      const words = splits.flatMap((split) => split.words);

      gsap.fromTo(
        words,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: "[data-about-block]",
            start: "top 78%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );
    }, root);

    return () => {
      splits.forEach((split) => split.revert());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="mx-auto max-w-5xl px-6 pt-40 pb-28 md:px-10 md:pt-34 md:pb-24"
    >
      <h1
        data-hero-item
        className="font-display text-4xl leading-[0.95] font-semibold tracking-tight text-ink-1 md:text-7xl lg:text-[150px]"
      >
        INIOLUWA
        <br />
        KOMOLAFE
      </h1>
      <p data-hero-item className="mt-10 max-w-md text-lg lg:text-xl font-[500] leading-relaxed text-ink-2">
        Software engineer across web and mobile. I build accessible, responsive interfaces — and the
        systems underneath them — with a bias for clean code, interpretation of business ideas, user
        needs & how everything connects.
      </p>

      <div id="about" data-about-block className="mt-24 max-w-2xl space-y-8 md:mt-32">
        <h2 className="font-display text-xs font-medium tracking-[0.2em] text-ink-4 uppercase">
          About
        </h2>
        <div className="space-y-8">
          {/* <p data-about-line className="text-2xl leading-snug font-medium text-ink-1 md:text-3xl">
            I'm a front-end engineer with a habit of building clean, accessible, web experiences.
          </p> */}
          <p data-about-line className="text-lg lg:text-xl leading-relaxed text-ink-2">
            My current work focuses on modern web and mobile development, while I’m expanding my
            knowledge of backend architecture and system design to become a more well-rounded
            software engineer.
          </p>
          <p data-about-line className="text-lg lg:text-xl leading-relaxed text-ink-2">
            Outside the editor, I’m fascinated by the analysis and business of football — from
            tactical breakdowns to the economics behind the sport. I'm curious about human
            psychology, often exploring it through podcasts, as well as historical and
            narcotics-related documentaries that reveal how people and societies evolve.
          </p>
          <p data-about-line className="text-lg lg:text-xl leading-relaxed text-ink-2">
            At the core: I'm driven by learning, problem-solving, and turning complex ideas into solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
