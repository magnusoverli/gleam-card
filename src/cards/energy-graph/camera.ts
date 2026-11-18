import { Box3, OrthographicCamera, Vector3, type Object3D } from "three";
import type { OrbitControls } from "three/addons/controls/OrbitControls.js";

export const CAMERA_OFFSETS: Record<string, [number, number, number]> = {
  isometric: [10, 10.3, 23.2],
  front: [0, .3, 28],
  top: [0, 28, .3],
};

export function setCameraSpan(camera: OrthographicCamera, aspect: number, span: number): void {
  camera.left = -span * aspect / 2;
  camera.right = span * aspect / 2;
  camera.top = span / 2;
  camera.bottom = -span / 2;
  camera.updateProjectionMatrix();
}

/** Fit the world-space chart bounds, including dataset depth, to the current view. */
export function fitCamera(
  scene: Object3D, camera: OrthographicCamera, controls: OrbitControls, aspect: number, labelTop: number,
): number | undefined {
  if (!(aspect > 0)) return;
  scene.updateMatrixWorld(true);
  const bounds = new Box3().setFromObject(scene);
  if (bounds.isEmpty()) return;
  camera.updateMatrixWorld(true);
  const view = new Box3();
  for (const x of [bounds.min.x, bounds.max.x])
    for (const y of [bounds.min.y, bounds.max.y])
      for (const z of [bounds.min.z, bounds.max.z])
        view.expandByPoint(new Vector3(x, y, z).applyMatrix4(camera.matrixWorldInverse));
  view.max.y = Math.max(view.max.y, labelTop);
  const center = view.getCenter(new Vector3());
  const shift = new Vector3().setFromMatrixColumn(camera.matrixWorld, 0).multiplyScalar(center.x)
    .addScaledVector(new Vector3().setFromMatrixColumn(camera.matrixWorld, 1), center.y);
  camera.position.add(shift);
  controls.target.add(shift);
  const size = view.getSize(new Vector3());
  const span = Math.max(size.y * 1.08, size.x / aspect * 1.08, .1);
  setCameraSpan(camera, aspect, span);
  controls.update();
  return span;
}
