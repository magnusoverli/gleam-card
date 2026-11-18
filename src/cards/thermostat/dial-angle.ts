const start = 225, sweep = 270;
export const dialSweep = sweep * Math.PI / 180;

export function dialAngle(fraction: number): number {
  return (start - sweep * fraction) * Math.PI / 180;
}

/** Atan2 angles wrap at the negative X axis; split the unused arc at its midpoint. */
export function dialFraction(angle: number): number {
  const clockwise = ((start - angle * 180 / Math.PI) % 360 + 360) % 360;
  if (clockwise <= sweep) return clockwise / sweep;
  return clockwise < (360 + sweep) / 2 ? 1 : 0;
}
