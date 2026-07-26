import type { ReactElement } from "react";

export class ArtSeed {
  private constructor(private readonly value: number) {}

  static fromString(input: string): ArtSeed {
    let hash = 0;
    for (let i = 0; i < input.length; i += 1) {
      hash = (hash << 5) - hash + input.charCodeAt(i);
      hash |= 0;
    }
    return new ArtSeed(Math.abs(hash));
  }

  hue(offset = 0): number {
    return (this.value + offset * 47) % 360;
  }

  angle(): number {
    return (this.value % 140) + 20;
  }
}

interface PlaceholderArtProps {
  seed: string;
  className?: string;
}

export function PlaceholderArt({ seed, className }: PlaceholderArtProps): ReactElement {
  const art = ArtSeed.fromString(seed);
  const h1 = art.hue();
  const h2 = art.hue(1);
  const angle = art.angle();

  const style = {
    background: `linear-gradient(${angle}deg, hsl(${h1} 38% 88%) 0%, hsl(${h2} 30% 76%) 55%, hsl(${h1} 20% 18%) 130%)`,
  };

  return <div className={className} style={style} aria-hidden="true" />;
}
