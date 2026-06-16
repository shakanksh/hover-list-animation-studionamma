"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const items = [
  { title: "Art Direction", image: "/art-direction.webp", text: "Storytelling" },
  { title: "Branding", image: "/branding.webp", text: "Identity" },
  { title: "Webflow", image: "/webflow.webp", text: "Integration" },
  { title: "UI/UX Design", image: "/ui-ux.webp", text: "Wireframes" },
  { title: "GSAP Animations", image: "/gsap.webp", text: "Transitions" },
  { title: "Advertising", image: "/advertising.webp", text: "Creative Ads" },
  { title: "SEO & Content", image: "/seo.webp", text: "Ranking" },
];

export default function GSAPPage() {
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useGSAP(() => {
    // hide everything on mount
    gsap.set(imgRefs.current, { clipPath: "inset(50% 0 50% 0)", opacity: 0 });
    gsap.set(paraRefs.current, { opacity: 0 });
  }, []);

  const onEnter = (i: number) => {
    // kill running tweens so leave doesn't get overridden mid-animation
    gsap.killTweensOf(imgRefs.current[i]);
    gsap.killTweensOf(paraRefs.current[i]);

    gsap.to(imgRefs.current[i], { clipPath: "inset(0% 0 0% 0)", opacity: 1, duration: 0.5, ease: "power4.out" });
    gsap.to(paraRefs.current[i], { opacity: 1, duration: 0.4, ease: "power4.out" });

    headingRefs.current.forEach((el, idx) => {
      gsap.to(el, { opacity: idx === i ? 1 : 0.15, duration: 0.3 });
    });
  };

  const onLeave = (i: number) => {
    gsap.killTweensOf(imgRefs.current[i]);
    gsap.killTweensOf(paraRefs.current[i]);

    // instant hide — no exit animation
    gsap.set(imgRefs.current[i], { clipPath: "inset(50% 0 50% 0)", opacity: 0 });
    gsap.set(paraRefs.current[i], { opacity: 0 });

    headingRefs.current.forEach((el) => {
      gsap.to(el, { opacity: 1, duration: 0.3 });
    });
  };

  return (
    <section className="h-screen bg-stone-200 text-stone-900 flex flex-col items-center justify-center cursor-default">
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-10 py-6">
        <Link href="/" className="font-mono text-xs tracking-widest uppercase text-stone-900 hover:text-stone-500 transition-colors duration-200">← Home</Link>
        <span className="font-mono text-xs tracking-widest uppercase text-stone-900">Built with GSAP</span>
      </nav>

      {items.map((item, i) => (
        <div
          key={item.title}
          className="relative flex items-center justify-around w-full uppercase"
          onMouseEnter={() => onEnter(i)}
          onMouseLeave={() => onLeave(i)}
        >
          <img
            src={item.image}
            alt={item.title}
            ref={(el) => { imgRefs.current[i] = el; }}
            className="absolute left-[1%] w-[384px] aspect-540/405 rounded-md object-cover z-20"
          />
          <div className="flex-1" />
          <div className="relative z-10 px-12">
            <h4
              ref={(el) => { headingRefs.current[i] = el; }}
              className="font-extrabold tracking-[-0.45rem] text-8xl"
            >
              {item.title}
            </h4>
          </div>
          <div className="flex-1">
            <p
              ref={(el) => { paraRefs.current[i] = el; }}
              className="font-mono tracking-wide text-sm"
            >
              {item.text}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
