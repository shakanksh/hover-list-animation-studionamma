import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col h-screen bg-stone-200 text-stone-900 px-10 py-10">
      <header className="flex items-start justify-between">
        <div className="flex flex-col gap-1 max-w-md">
          <h1 className="font-extrabold tracking-[-0.1rem] text-2xl">Hover List Animation</h1>
          <p className="font-mono text-xs text-stone-500 leading-relaxed">
            A list of headings where hovering one row reveals its paired image — expanding from the center outward via a clip-path animation — while all other headings dim to gray. The same interaction built twice: once imperatively with GSAP, once declaratively with Motion.
            Inspired by <a href="https://studionamma.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-900 text-stone-500 transition-colors">Studio Namma</a>.
          </p>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors"
        >
          GitHub ↗
        </a>
      </header>

      <div className="flex-1 flex items-center justify-center gap-12">
        <Link href="/gsap" className="group flex flex-col gap-1">
          <span className="font-extrabold tracking-[-0.1rem] text-2xl group-hover:opacity-50 transition-opacity duration-200">GSAP</span>
          <span className="font-mono text-xs text-stone-500 leading-relaxed">Imperative — refs + killTweensOf ↗</span>
        </Link>
        <Link href="/motion" className="group flex flex-col gap-1">
          <span className="font-extrabold tracking-[-0.1rem] text-2xl group-hover:opacity-50 transition-opacity duration-200">Motion</span>
          <span className="font-mono text-xs text-stone-500 leading-relaxed">Declarative — state + animate props ↗</span>
        </Link>
      </div>
    </section>
  );
}
