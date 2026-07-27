import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export class GsapSetup {
  static register(): void {
    if (registered) return;
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }

  static prefersReducedMotion(): boolean {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
}
