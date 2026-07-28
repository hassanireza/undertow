import type { ReactElement } from "react";

import gsap from "gsap";

import { usePlayOnceInView } from "./usePlayOnceInView";
import styles from "./ServiceArt.module.css";

interface Block {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  fromX: number;
  fromY: number;
  fromRotate: number;
}

const BLOCKS: Block[] = [
  { id: "header", x: 20, y: 18, w: 160, h: 16, fromX: -24, fromY: -30, fromRotate: -8 },
  { id: "sidebar", x: 20, y: 42, w: 40, h: 88, fromX: -40, fromY: 18, fromRotate: 10 },
  { id: "col1", x: 68, y: 42, w: 54, h: 40, fromX: 26, fromY: -22, fromRotate: -12 },
  { id: "col2", x: 68, y: 90, w: 54, h: 40, fromX: -18, fromY: 30, fromRotate: 14 },
  { id: "aside", x: 130, y: 42, w: 50, h: 88, fromX: 36, fromY: 12, fromRotate: -9 },
];

function centerOf(block: Block): { x: number; y: number } {
  return { x: block.x + block.w / 2, y: block.y + block.h / 2 };
}

export function WebDesignArt(): ReactElement {
  const ref = usePlayOnceInView<HTMLDivElement>(
    (container) => {
      const timeline = gsap.timeline({ defaults: { ease: "back.out(1.6)" } });

      BLOCKS.forEach((block, i) => {
        const el = container.querySelector<SVGRectElement>(`[data-block="${block.id}"]`);
        if (!el) return;
        timeline.fromTo(
          el,
          { x: block.fromX, y: block.fromY, rotation: block.fromRotate, transformOrigin: "center" },
          { x: 0, y: 0, rotation: 0, duration: 0.6 },
          i * 0.09,
        );
      });

      const cursor = container.querySelector<SVGCircleElement>('[data-cursor="true"]');
      if (cursor) {
        timeline.set(cursor, { opacity: 1 }, 0);
        BLOCKS.forEach((block, i) => {
          const { x, y } = centerOf(block);
          timeline.to(cursor, { attr: { cx: x, cy: y }, duration: 0.35, ease: "power2.inOut" }, i * 0.09 + 0.35);
        });
        timeline.to(cursor, { opacity: 0, duration: 0.3 }, "+=0.2");
      }
    },
    (container) => {
      const cursor = container.querySelector<SVGCircleElement>('[data-cursor="true"]');
      if (cursor) gsap.set(cursor, { opacity: 0 });
    },
  );

  return (
    <div ref={ref} className={styles.frame}>
      <svg viewBox="0 0 200 160" className={styles.svg}>
        {BLOCKS.map((block) => (
          <rect
            key={block.id}
            data-block={block.id}
            x={block.x}
            y={block.y}
            width={block.w}
            height={block.h}
            className={styles.strokeInk}
          />
        ))}
        <circle data-cursor="true" cx={20} cy={18} r={3} className={styles.fillAccent} opacity={0} />
      </svg>
    </div>
  );
}
