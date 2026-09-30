import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";

import { SystemsMap } from "@/components/portfolio/SystemsMap";
import { Work } from "@/components/portfolio/Work";
import { Experiments } from "@/components/portfolio/Experiments";
import { Contact } from "@/components/portfolio/Contact";

const title = "Inioluwa Komolafe — Software Engineer";
const description =
  "Portfolio of Inioluwa Komolafe (inistheguyy): Software engineer building accessible, responsive web and mobile interfaces in React and TypeScript.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-surface-1">
      <Nav />
      <main>
        <Hero />
        <section id="what-i-do" className="mx-auto flex max-w-5xl flex-col gap-10 px-6 pt-28 md:gap-14 md:px-10 md:pt-40">
          <h2 className="font-display text-xs font-medium tracking-[0.2em] text-ink-4 uppercase">
            What I Do
          </h2>
          <SystemsMap />
        </section>
        <Work />
        {/* <Experiments /> */}
        <Contact />
      </main>
    </div>
  );
}
