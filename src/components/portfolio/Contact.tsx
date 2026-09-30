import { socials } from "@/lib/portfolio-data";
import { Footer } from "@/components/portfolio/Footer";

export function Contact() {
  return (
    <section id="contact">
      <div className="mx-auto max-w-5xl px-6 pt-28 md:px-10 ">
        <h2 className="font-display text-xs font-medium tracking-[0.2em] text-ink-4 uppercase">
          Contact
        </h2>
        <p className="mt-10 max-w-2xl font-display text-4xl leading-tight font-semibold tracking-tight text-ink-1 md:text-6xl">
          Got something worth building? Let's talk.
        </p>
        <a
          href="mailto:komolafeinioluwa9@gmail.com"
          className="mt-10 inline-block border-b border-ink-3 pb-1 text-lg text-ink-1 transition-colors hover:border-ink-1"
        >
          komolafeinioluwa9@gmail.com
        </a>
      </div>
      <Footer />
    </section>
  );
}
