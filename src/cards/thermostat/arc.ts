import { Sphere, TorusGeometry, Vector3 } from "three";
import { dialSweep } from "./dial-angle";

const segments = 120, sides = 10, radius = 1.72;

export function createArc(tube: number) {
  const geometry = new TorusGeometry(radius, tube, sides, segments, dialSweep);
  geometry.boundingSphere = new Sphere(new Vector3(), radius + tube);
  return geometry;
}

/** Keep indices and GPU buffers; move the endpoint exactly to the requested value. */
export function updateArc(geometry: TorusGeometry, fraction: number, tube: number) {
  const positions = geometry.getAttribute("position");
  const normals = geometry.getAttribute("normal");
  for (let j = 0; j <= sides; j++) {
    const v = j / sides * Math.PI * 2, cv = Math.cos(v), sv = Math.sin(v);
    for (let i = 0; i <= segments; i++) {
      const u = i / segments * dialSweep * fraction;
      const cu = Math.cos(u), su = Math.sin(u), index = j * (segments + 1) + i;
      positions.setXYZ(index, (radius + tube * cv) * cu, (radius + tube * cv) * su, tube * sv);
      normals.setXYZ(index, cv * cu, cv * su, sv);
    }
  }
  positions.needsUpdate = normals.needsUpdate = true;
}
