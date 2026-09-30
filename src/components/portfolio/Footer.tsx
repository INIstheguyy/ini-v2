import { FileText, Github, Linkedin } from "lucide-react";

function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 2.8h3.7l-8.1 9.3L24 21.2h-7.4l-5.8-7.6-6.6 7.6H.5l8.7-10L.1 2.8h7.6l5.3 7 5.9-7zm-1.3 16.4h2L6.6 4.7H4.5l13.1 14.5z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden  border-hairline pt-16 pb-10">
      {/* This block is intentionally full-bleed (not inside the max-w-5xl
          content container): the wordmark is viewport-relative, so it needs
          the actual viewport width available to size against. */}
      <div className="relative isolate w-full">
        <p
          aria-hidden="true"
          className="font-display w-full overflow-hidden text-center text-[clamp(3.5rem,15vw,13rem)] leading-[0.8] font-semibold tracking-tighter whitespace-nowrap text-ink-2 select-none"
        >
          INISTHEGUYY
        </p>
        <ul className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-center">
          <li className="flex items-center gap-5 rounded-full bg-surface-1 px-4 py-2 text-ink-1 shadow-sm md:gap-7 md:px-8">
            <span aria-label="X" title="X">
              <IconX className="h-5 w-5 md:h-6 md:w-6" />
            </span>
            <span aria-label="LinkedIn" title="LinkedIn">
              <Linkedin className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.8} />
            </span>
            <a
              href="https://github.com/INIstheguyy"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="transition-opacity hover:opacity-60"
            >
              <Github className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.8} />
            </a>
            <span aria-label="Résumé" title="Résumé">
              <FileText className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.8} />
            </span>
          </li>
        </ul>
      </div>
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <p className="sr-only">INISTHEGUYY</p>
        <p className="mt-10 text-center text-xs text-ink-4">
          © {new Date().getFullYear()} Inioluwa Komolafe
        </p>
      </div>
    </footer>
  );
}
