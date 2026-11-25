// One-point perspective. Room coordinates are metres: x from the centre,
// y up from the floor, and z from the cut-away front towards the back wall.
export const ROOM_W = 4.8, ROOM_H = 2.5, ROOM_D = 4;
export const VIEW_W = 320, VIEW_H = 174, VANISH_X = VIEW_W / 2, VANISH_Y = 92;
export const FRONT_LEFT = 20, FRONT_RIGHT = VIEW_W - FRONT_LEFT, FRONT_CEILING = 14;
export const CAMERA_DISTANCE = 6.362, CAMERA_HEIGHT = 1;
export const SCALE_X = (FRONT_RIGHT - FRONT_LEFT) / ROOM_W, SCALE_Y = (VANISH_Y - FRONT_CEILING) / (ROOM_H - CAMERA_HEIGHT);

export const depthScale = (z: number) => 1 / (1 + z / CAMERA_DISTANCE);
export const screenX = (x: number, scale: number) => VANISH_X + x * SCALE_X * scale;
export const screenY = (y: number, scale: number) => VANISH_Y + (CAMERA_HEIGHT - y) * SCALE_Y * scale;
export function projectRoom(x: number, y: number, z: number): readonly [number, number] {
  const scale = depthScale(z);
  return [screenX(x, scale), screenY(y, scale)];
}

export const BACK_SCALE = depthScale(ROOM_D);
export const BACK_LEFT = screenX(-ROOM_W / 2, BACK_SCALE), BACK_RIGHT = screenX(ROOM_W / 2, BACK_SCALE);
export const BACK_FLOOR = screenY(0, BACK_SCALE), BACK_CEILING = screenY(ROOM_H, BACK_SCALE);
