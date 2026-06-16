"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";

const items = [
  {
    title: "Art Direction",
    image: "/art-direction.webp",
    text: "Storytelling",
  },
  { title: "Branding", image: "/branding.webp", text: "Identity" },
  { title: "Webflow", image: "/webflow.webp", text: "Integration" },
  { title: "UI/UX Design", image: "/ui-ux.webp", text: "Wireframes" },
  { title: "GSAP Animations", image: "/gsap.webp", text: "Transitions" },
  { title: "Advertising", image: "/advertising.webp", text: "Creative Ads" },
  { title: "SEO & Content", image: "/seo.webp", text: "Ranking" },
];

// power4.out as a cubic bezier; used AI for this small bit
const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MotionPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="h-screen bg-stone-200 text-stone-900 flex flex-col items-center justify-center cursor-default">
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-10 py-6">
        <Link
          href="/"
          className="font-mono text-xs tracking-widest uppercase text-stone-900 hover:text-stone-500 transition-colors duration-200"
        >
          ← Home
        </Link>
        <span className="font-mono text-xs tracking-widest uppercase text-stone-900">
          Built with Motion
        </span>
      </nav>

      {items.map((item, i) => (
        <div
          key={item.title}
          className="relative flex items-center justify-around w-full uppercase"
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
        >
          <motion.img
            src={item.image}
            alt={item.title}
            className="absolute left-[1%] w-[384px] aspect-540/405 rounded-md object-cover z-20"
            initial={{ clipPath: "inset(50% 0 50% 0)", opacity: 0 }}
            animate={{
              clipPath:
                active === i ? "inset(0% 0 0% 0)" : "inset(50% 0 50% 0)",
              opacity: active === i ? 1 : 0,
            }}
            // animate in, snap out instantly
            transition={
              active === i ? { duration: 0.5, ease: easeOut } : { duration: 0 }
            }
          />
          <div className="flex-1" />
          <div className="relative z-10 px-12">
            <motion.h4
              className="font-extrabold tracking-[-0.45rem] text-8xl"
              animate={{ opacity: active !== null && active !== i ? 0.15 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {item.title}
            </motion.h4>
          </div>
          <div className="flex-1">
            <motion.p
              className="font-mono tracking-wide text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: active === i ? 1 : 0 }}
              transition={
                active === i
                  ? { duration: 0.4, ease: easeOut }
                  : { duration: 0 }
              }
            >
              {item.text}
            </motion.p>
          </div>
        </div>
      ))}
    </section>
  );
}
