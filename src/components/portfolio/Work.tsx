import { useRef } from "react";

import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { projects } from "@/lib/portfolio-data";

export function Work() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = root.current;
      if (!section) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-work-item]");
      const stage = section.querySelector<HTMLElement>("[data-work-stage]");
      if (!stage) return;

      const clips = items.map(
        (item) => item.querySelector<HTMLElement>("[data-work-clip]")!,
      );
      const inners = items.map(
        (item) => item.querySelector<HTMLElement>("[data-work-inner]")!,
      );

      if (prefersReducedMotion()) {
        gsap.set(clips, { height: "auto" });
        gsap.set(inners, { opacity: 1, yPercent: 0 });
        return;
      }

      // The compact list rests against the bottom of the flex viewport. As a
      // panel opens, flexbox raises the growing track by that exact height,
      // keeping the remaining row labels anchored at the baseline. Reversing
      // the scroll brings those open panels back before folding them.
      gsap.set(stage, { overflow: "hidden" });
      gsap.set(clips, { height: 0 });
      gsap.set(inners, { opacity: 0, yPercent: -12 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=" + items.length * 650,
          pin: stage,
          scrub: 0.25,
          invalidateOnRefresh: true,
        },
      });

      items.forEach((_, index) => {
        const clip = clips[index]!;
        const inner = inners[index]!;

        timeline
          .to(clip, {
            height: () => inner.scrollHeight,
            duration: 0.6,
            ease: "none",
          })
          .to(
            inner,
            { opacity: 1, yPercent: 0, duration: 0.6, ease: "none" },
              "<",
          )
          .to({}, { duration: 0.25 });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={root}
      className="relative"
    >
      <div
        data-work-stage
        className="relative z-10 mx-auto flex h-[100svh] max-w-5xl flex-col justify-end bg-surface-1 px-6 md:px-10"
      >
        <div data-work-track className="w-full">
           <h2 className="font-display text-xs font-medium tracking-[0.2em] text-ink-4 uppercase">
          Work
        </h2>
          <ul className="mt-8 ">
            {projects.map((project, index) => (
              <li key={project.title} data-work-item className=" ">
                <article>
                  <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 py-4 md:grid-cols-[3.5rem_1fr_auto] md:py-5">
                    <p className="font-display text-sm font-medium text-ink-3">{index + 1}.</p>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-ink-1 md:text-2xl">
                      {project.title}
                    </h3>
                    <p className="hidden text-sm text-ink-4 md:block">{project.year}</p>
                  </div>
                  <div data-work-clip className="overflow-hidden">
                    <div data-work-inner className="grid gap-6 border-t border-hairline py-6 pl-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 md:pl-14">
                      <div>
                        <p className="max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
                          {project.summary}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="border-b border-ink-4 pb-0.5 text-sm text-ink-1 transition-colors hover:border-ink-1"
                          >
                            Live demo
                          </a>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="border-b border-hairline pb-0.5 text-sm text-ink-3 transition-colors hover:border-ink-2 hover:text-ink-1"
                          >
                            Source
                          </a>
                        </div>
                      </div>
                      <div className="text-sm text-ink-3 md:max-w-40 md:text-right">
                        {project.stack.join(" · ")}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
