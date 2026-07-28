import type { ReactElement } from "react";

import gsap from "gsap";

import { SpiralPath } from "./spiral";
import { usePlayOnceInView } from "./usePlayOnceInView";
import styles from "./ServiceArt.module.css";

const SPIRAL = new SpiralPath(100, 78, 5, 24, 1.6, 70);

interface FrameDef {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}

const FRAMES: FrameDef[] = [
  { id: "web", x: 26, y: 22, w: 60, h: 52, label: "WEB" },
  { id: "film", x: 96, y: 30, w: 78, h: 44, label: "FILM" },
  { id: "print", x: 60, y: 96, w: 44, h: 54, label: "PRINT" },
];

function drawLine(el: SVGGraphicsElement): void {
  const length = (el as unknown as SVGGeometryElement).getTotalLength();
  gsap.set(el, { attr: { "stroke-dasharray": length, "stroke-dashoffset": length } });
}

export function ArtDirectionArt(): ReactElement {
  const { ref, onMouseEnter } = usePlayOnceInView<HTMLDivElement>(
    (container) => {
      const spiralEl = container.querySelector<SVGPathElement>('[data-role="spiral"]');
      const timeline = gsap.timeline();

      if (spiralEl) {
        drawLine(spiralEl);
        timeline.to(spiralEl, { attr: { "stroke-dashoffset": 0 }, duration: 0.9, ease: "power2.inOut" }, 0);
      }

      FRAMES.forEach((frame, i) => {
        const rect = container.querySelector<SVGRectElement>(`[data-frame="${frame.id}"]`);
        const label = container.querySelector<SVGTextElement>(`[data-label="${frame.id}"]`);
        if (rect) {
          drawLine(rect);
          timeline.to(
            rect,
            { attr: { "stroke-dashoffset": 0 }, duration: 0.55, ease: "power1.out" },
            0.9 + i * 0.22,
          );
        }
        if (label) {
          timeline.fromTo(
            label,
            { opacity: 0, y: 4 },
            { opacity: 1, y: 0, duration: 0.3 },
            0.9 + i * 0.22 + 0.35,
          );
        }
      });
    },
    (container) => {
      const spiralEl = container.querySelector<SVGPathElement>('[data-role="spiral"]');
      if (spiralEl) gsap.set(spiralEl, { attr: { "stroke-dashoffset": 0 } });
      FRAMES.forEach((frame) => {
        const rect = container.querySelector<SVGRectElement>(`[data-frame="${frame.id}"]`);
        const label = container.querySelector<SVGTextElement>(`[data-label="${frame.id}"]`);
        if (rect) gsap.set(rect, { attr: { "stroke-dashoffset": 0 } });
        if (label) gsap.set(label, { opacity: 1, y: 0 });
      });
    },
  );

  return (
    <div ref={ref} onMouseEnter={onMouseEnter} className={styles.frame}>
      <svg viewBox="0 0 200 160" className={styles.svg}>
        {FRAMES.map((frame) => (
          <rect
            key={frame.id}
            data-frame={frame.id}
            x={frame.x}
            y={frame.y}
            width={frame.w}
            height={frame.h}
            className={styles.strokeSoft}
          />
        ))}
        <path data-role="spiral" d={SPIRAL.toPathData(0)} className={styles.strokeAccent} />
        {FRAMES.map((frame) => (
          <text
            key={frame.id}
            data-label={frame.id}
            x={frame.x + 4}
            y={frame.y + frame.h - 5}
            className={styles.label}
            opacity={0}
          >
            {frame.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
