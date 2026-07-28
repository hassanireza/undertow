import type { ReactElement } from "react";
import { useEffect, useRef } from "react";

import gsap from "gsap";

import { GsapSetup } from "@/animation/gsapSetup";
import { SpiralPath } from "@/components/ServiceArt/spiral";

import styles from "./HeroArt.module.css";

const CX = 150;
const CY = 200;
const SPIRAL = new SpiralPath(CX, CY, 4, 46, 2.1, 90);
const RING_RADII = [18, 34, 50];

function drawLine(el: SVGGraphicsElement): void {
  const length = (el as unknown as SVGGeometryElement).getTotalLength();
  gsap.set(el, { attr: { "stroke-dasharray": length, "stroke-dashoffset": length } });
}

export function HeroArt(): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spiralEl = container.querySelector<SVGPathElement>('[data-role="spiral"]');
    const surfaceLine = container.querySelector<SVGLineElement>('[data-role="surface"]');
    const point = container.querySelector<SVGCircleElement>('[data-role="point"]');
    const rings = container.querySelectorAll<SVGCircleElement>('[data-role="ring"]');

    if (GsapSetup.prefersReducedMotion()) {
      if (point) gsap.set(point, { opacity: 0 });
      rings.forEach((ring) => gsap.set(ring, { opacity: 0 }));
      return;
    }

    const timeline = gsap.timeline({ delay: 0.3 });

    if (point) {
      timeline.fromTo(point, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 0);
    }

    rings.forEach((ring, i) => {
      const radius = RING_RADII[i] ?? 20;
      timeline.fromTo(
        ring,
        { attr: { r: 0 }, opacity: 0.8 },
        { attr: { r: radius }, opacity: 0, duration: 1.1, ease: "power1.out" },
        0.35 + i * 0.16,
      );
    });

    if (point) {
      timeline.to(point, { opacity: 0, duration: 0.4 }, 1.1);
    }

    if (spiralEl) {
      drawLine(spiralEl);
      timeline.to(spiralEl, { attr: { "stroke-dashoffset": 0 }, duration: 1.6, ease: "power2.inOut" }, 0.9);
    }

    if (surfaceLine) {
      drawLine(surfaceLine);
      timeline.to(
        surfaceLine,
        { attr: { "stroke-dashoffset": 0 }, duration: 0.9, ease: "power1.inOut" },
        1.9,
      );
    }

    if (spiralEl) {
      timeline.to(
        spiralEl,
        { rotation: 8, transformOrigin: `${CX}px ${CY}px`, duration: 6, ease: "sine.inOut" },
        2.6,
      );
    }

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.frame} aria-hidden="true">
      <svg viewBox="0 0 300 400" className={styles.svg}>
        {RING_RADII.map((_, i) => (
          <circle key={i} data-role="ring" cx={CX} cy={CY} r={0} className={styles.strokeSoft} opacity={0} />
        ))}
        <circle data-role="point" cx={CX} cy={CY} r={2.4} className={styles.fillAccent} opacity={0} />
        <path data-role="spiral" d={SPIRAL.toPathData(0)} className={styles.strokeInk} />
        <line
          data-role="surface"
          x1={CX - 90}
          y1={CY - 90}
          x2={CX + 90}
          y2={CY - 90}
          className={styles.strokeAccent}
        />
      </svg>
    </div>
  );
}
