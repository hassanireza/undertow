import type { MouseEventHandler, RefObject } from "react";
import { useCallback, useEffect, useRef } from "react";

import { GsapSetup } from "@/animation/gsapSetup";

interface PlayableRef<T extends HTMLElement> {
  ref: RefObject<T | null>;
  onMouseEnter: MouseEventHandler<T>;
}

export function usePlayOnceInView<T extends HTMLElement>(
  play: (container: T) => void,
  showEndState: (container: T) => void,
): PlayableRef<T> {
  const ref = useRef<T>(null);
  const enteredViewRef = useRef(false);

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
          if (entry.isIntersecting && !enteredViewRef.current) {
            enteredViewRef.current = true;
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

  const onMouseEnter = useCallback(() => {
    const container = ref.current;
    if (!container || GsapSetup.prefersReducedMotion()) return;
    if (!enteredViewRef.current) return;
    play(container);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, onMouseEnter };
}
