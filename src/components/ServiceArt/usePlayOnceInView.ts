import type { RefObject } from "react";
import { useEffect, useRef } from "react";

import { GsapSetup } from "@/animation/gsapSetup";

export function usePlayOnceInView<T extends HTMLElement>(
  play: (container: T) => void,
  showEndState: (container: T) => void,
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const container = ref.current;
    if (!container) return undefined;

    if (GsapSetup.prefersReducedMotion()) {
      showEndState(container);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !playedRef.current) {
            playedRef.current = true;
            play(container);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(container);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
