import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { GsapSetup } from "@/animation/gsapSetup";

interface ScrollRevealOptions {
  selector: string;
  stagger?: number;
  y?: number;
  once?: boolean;
  deps?: readonly unknown[];
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions) {
  const containerRef = useRef<T>(null);
  const deps = options.deps ?? [];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    GsapSetup.register();

    if (GsapSetup.prefersReducedMotion()) {
      return undefined;
    }

    const targets = container.querySelectorAll(options.selector);
    if (targets.length === 0) return undefined;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: options.y ?? 24 });

      ScrollTrigger.batch(targets, {
        start: "top 88%",
        once: options.once ?? true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: options.stagger ?? 0.08,
          }),
      });
    }, container);

    return () => ctx.revert();
  }, [options.selector, options.stagger, options.y, options.once, ...deps]);

  return containerRef;
}
