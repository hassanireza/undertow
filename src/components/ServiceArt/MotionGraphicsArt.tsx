import type { ReactElement } from "react";

import gsap from "gsap";

import { SpiralPath } from "./spiral";
import { usePlayOnceInView } from "./usePlayOnceInView";
import styles from "./ServiceArt.module.css";

const TICK_COUNT = 8;
const TRACK_START = 24;
const TRACK_END = 176;
const TRACK_Y = 128;
const SPIRAL = new SpiralPath(100, 68, 6, 26, 1.4, 60);

function tickX(index: number): number {
  return TRACK_START + ((TRACK_END - TRACK_START) / (TICK_COUNT - 1)) * index;
}

const FINAL_ROTATION = ((TICK_COUNT - 1) * 360) / TICK_COUNT;

export function MotionGraphicsArt(): ReactElement {
  const { ref, onMouseEnter } = usePlayOnceInView<HTMLDivElement>(
    (container) => {
      const playhead = container.querySelector<SVGLineElement>('[data-role="playhead"]');
      const spiralEl = container.querySelector<SVGPathElement>('[data-role="spiral"]');
      const ticks = container.querySelectorAll<SVGCircleElement>('[data-role="tick"]');

      const timeline = gsap.timeline({ defaults: { ease: "none" } });
      const duration = 1.6;

      if (playhead) {
        timeline.fromTo(
          playhead,
          { x: 0 },
          { x: TRACK_END - TRACK_START, duration },
          0,
        );
      }

      for (let i = 0; i < TICK_COUNT; i += 1) {
        const time = (i / (TICK_COUNT - 1)) * duration;
        const tick = ticks[i];
        if (tick) {
          timeline.set(tick, { fill: "var(--color-accent)" }, time);
        }
        if (spiralEl) {
          const rotation = (i * 360) / TICK_COUNT;
          timeline.set(spiralEl, { attr: { d: SPIRAL.toPathData(rotation) } }, time);
        }
      }
    },
    (container) => {
      const playhead = container.querySelector<SVGLineElement>('[data-role="playhead"]');
      const spiralEl = container.querySelector<SVGPathElement>('[data-role="spiral"]');
      const ticks = container.querySelectorAll<SVGCircleElement>('[data-role="tick"]');
      if (playhead) gsap.set(playhead, { x: TRACK_END - TRACK_START });
      if (spiralEl) gsap.set(spiralEl, { attr: { d: SPIRAL.toPathData(FINAL_ROTATION) } });
      ticks.forEach((tick) => gsap.set(tick, { fill: "var(--color-accent)" }));
    },
  );

  return (
    <div ref={ref} onMouseEnter={onMouseEnter} className={styles.frame}>
      <svg viewBox="0 0 200 160" className={styles.svg}>
        <path data-role="spiral" d={SPIRAL.toPathData(0)} className={styles.strokeInk} />

        <line x1={TRACK_START} y1={TRACK_Y} x2={TRACK_END} y2={TRACK_Y} className={styles.strokeSoft} />
        {Array.from({ length: TICK_COUNT }, (_, i) => (
          <circle
            key={i}
            data-role="tick"
            cx={tickX(i)}
            cy={TRACK_Y}
            r={2.4}
            fill="var(--color-line-strong)"
            stroke="none"
          />
        ))}
        <line
          data-role="playhead"
          x1={TRACK_START}
          y1={TRACK_Y - 14}
          x2={TRACK_START}
          y2={TRACK_Y + 14}
          className={styles.strokeAccent}
        />
      </svg>
    </div>
  );
}
