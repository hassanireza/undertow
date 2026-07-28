export class SpiralPath {
  constructor(
    private readonly cx: number,
    private readonly cy: number,
    private readonly startRadius: number,
    private readonly endRadius: number,
    private readonly turns: number,
    private readonly points: number = 80,
  ) {}

  toPathData(rotationDegrees = 0): string {
    const rotation = (rotationDegrees * Math.PI) / 180;
    const coords: [number, number][] = [];

    for (let i = 0; i <= this.points; i += 1) {
      const t = i / this.points;
      const angle = t * this.turns * Math.PI * 2 + rotation;
      const radius = this.startRadius + (this.endRadius - this.startRadius) * t;
      const x = this.cx + Math.cos(angle) * radius;
      const y = this.cy + Math.sin(angle) * radius;
      coords.push([x, y]);
    }

    const [first, ...rest] = coords;
    if (!first) return "";
    const start = `M ${first[0].toFixed(2)} ${first[1].toFixed(2)}`;
    const segments = rest.map(([x, y]) => `L ${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
    return `${start} ${segments}`;
  }
}
