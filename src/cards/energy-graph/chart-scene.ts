import * as THREE from "three";

type Point = [number, number, number];
const WHITE = new THREE.Color(0xffffff);

export const BAR_CENTER_Z = 1.5;
// World-space thickness of the original bars at dataset spacing 1.
export const BAR_WORLD_DEPTH = .062;

/** Bounded pools: retain GPU resources between updates, release unused slots. */
export class ChartScene {
  #scene: THREE.Scene;
  readonly pointLight: THREE.PointLight;
  #pools = new Map<string, THREE.Object3D[]>();
  #used = new Map<string, number>();
  #materials = new Map<string, THREE.Material>();
  #box = new THREE.BoxGeometry(1, 1, 1);
  #edges = new THREE.EdgesGeometry(this.#box);
  #plane = new THREE.PlaneGeometry(1, 1);
  #cap = new THREE.CircleGeometry(1, 12);
  #tube = new THREE.CylinderGeometry(1, 1, 1, 12, 1, true);
  #joint = new THREE.SphereGeometry(1, 12, 8);
  #transform = new THREE.Object3D();
  #up = new THREE.Vector3(0, 1, 0);
  #direction = new THREE.Vector3();

  constructor(scene: THREE.Scene, pointLightIntensity: number) {
    this.#scene = scene;
    scene.add(new THREE.HemisphereLight(0x92e4ff, 0x080b24, 1.4));
    const key = new THREE.DirectionalLight(0xb5eaff, 1.8);
    key.position.set(-4, 10, 8);
    const rim = new THREE.DirectionalLight(0x8a66ff, 2);
    rim.position.set(5, 8, -6);
    // A low point source gives even short bars a view-dependent highlight.
    // Material roughness spreads it without an area-light lookup texture.
    const fill = this.pointLight = new THREE.PointLight(0xb6f4ff, pointLightIntensity);
    scene.add(key, rim, fill);
  }

  #unitLabels: THREE.Sprite[] = [];
  #plotBounds = new THREE.Box3();
  #corners = Array.from({ length: 8 }, () => new THREE.Vector3());
  cachePlotBounds(targets: THREE.Object3D[]) {
    this.#plotBounds.makeEmpty();
    for (const target of targets) this.#plotBounds.expandByObject(target);
  }
  begin() { this.#used.clear(); this.#unitLabels.length = 0; }

  stackUnits(camera: THREE.OrthographicCamera, fitting = false) {
    camera.updateMatrixWorld();
    const { min, max } = this.#plotBounds;
    const hasPlot = !this.#plotBounds.isEmpty();
    if (hasPlot) this.#corners.forEach((v, i) => v.set(i & 1 ? max.x : min.x,
      i & 2 ? max.y : min.y, i & 4 ? max.z : min.z).applyMatrix4(camera.matrixWorldInverse));
    let floor = -Infinity;
    for (const label of this.#unitLabels) {
      const { x, y } = label.getWorldPosition(this.#direction).applyMatrix4(camera.matrixWorldInverse);
      const left = x - label.scale.x / 2, right = x + label.scale.x / 2;
      // Only clear the projected plot silhouette directly beneath this label.
      // A high corner at the opposite end of the timeline must not lift it.
      if (hasPlot) for (let i = 0; i < 8; i++) for (let bit = 1; bit <= 4; bit *= 2) {
        if (i & bit) continue;
        let a = this.#corners[i], b = this.#corners[i | bit];
        if (a.x > b.x) [a, b] = [b, a];
        if (b.x < left || a.x > right) continue;
        const dx = b.x - a.x;
        const t = dx ? THREE.MathUtils.clamp(((b.y > a.y ? right : left) - a.x) / dx, 0, 1) : 0;
        floor = Math.max(floor, (dx ? a.y + t * (b.y - a.y) : Math.max(a.y,b.y)) + .08);
      }
      const height = label.scale.y;
      const centre = Math.max(y, floor + height / 2);
      // Move the billboard vertically in view space, retaining its axis anchor.
      label.center.y = .5 + (y - centre) / height;
      floor = centre + height / 2;
    }
    if (!fitting) {
      const overflow = floor - ((camera.top + camera.bottom) / 2 + (camera.top - camera.bottom) / (2 * camera.zoom) - .06);
      if (overflow > 0) for (const label of this.#unitLabels) label.center.y += overflow / label.scale.y;
    }
    return floor;
  }

  followCamera(camera: THREE.OrthographicCamera, target: THREE.Vector3) {
    // Work in view-relative axes so the light stays centred as the user
    // orbits. Convert back to chart coordinates to cancel dataset depth scaling.
    const position = this.pointLight.position.set(0, 0, 5);
    position.applyQuaternion(camera.quaternion).add(target);
    this.#scene.worldToLocal(position);
  }

  // Parallel dataset planes have a definite back-to-front order even when
  // their object centers (different hours and heights) sort the opposite way.
  sortTransparency(renderer: THREE.WebGLRenderer, camera: THREE.OrthographicCamera) {
    renderer.setTransparentSort((a, b) => {
      const direction = camera.matrixWorld.elements[10] >= 0 ? 1 : -1;
      const az = Number.isFinite(a.renderOrder) ? direction * a.renderOrder : a.renderOrder;
      const bz = Number.isFinite(b.renderOrder) ? direction * b.renderOrder : b.renderOrder;
      // At zero spacing, order chart elements by role before camera depth.
      // Otherwise a long price interval can tint only some of the bars it spans.
      return az - bz || (a.object.userData.blendOrder ?? 0) - (b.object.userData.blendOrder ?? 0)
        || b.z - a.z || a.id - b.id;
    });
  }

  #slot<T extends THREE.Object3D>(kind: string, create: () => T): T {
    const pool = this.#pools.get(kind) ?? [];
    this.#pools.set(kind, pool);
    const index = this.#used.get(kind) ?? 0;
    this.#used.set(kind, index + 1);
    if (!pool[index]) {
      pool[index] = create();
      this.#scene.add(pool[index]);
    }
    return pool[index] as T;
  }

  #material<T extends THREE.Material>(key: string, create: () => T): T {
    if (!this.#materials.has(key)) this.#materials.set(key, create());
    return this.#materials.get(key) as T;
  }

  strokes(series: string, color: number, maximum: number, opacity: number, z: number, joints = false) {
    const capacity = 2 ** Math.ceil(Math.log2(Math.max(1, maximum)));
    const key = `strokes:${series}`;
    const mesh = this.#slot(`${key}:${capacity}:${joints}`, () => new THREE.InstancedMesh(joints ? this.#joint : this.#tube,
      this.#material(key, () => new THREE.MeshBasicMaterial({ color })), capacity));
    mesh.count = 0;
    mesh.material.color.setHex(color);
    mesh.material.opacity = opacity;
    mesh.material.transparent = opacity < 1;
    mesh.material.depthWrite = opacity === 1;
    mesh.renderOrder = z;
    mesh.boundingBox = mesh.boundingSphere = null;
    mesh.userData.tips ??= [];
    mesh.userData.tips.length = 0;
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  joint(mesh: THREE.InstancedMesh, point: Point, radius: number) {
    const matrix = this.#transform.matrix.makeScale(radius, radius, radius);
    matrix.setPosition(...point);
    mesh.setMatrixAt(mesh.count++, matrix);
  }

  stroke(mesh: THREE.InstancedMesh, a: Point, b: Point, radius: number, tip?: string) {
    this.#direction.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    const length = this.#direction.length();
    if (!length) return;
    const t = this.#transform;
    t.position.set(...a).addScaledVector(this.#direction, .5);
    t.quaternion.setFromUnitVectors(this.#up, this.#direction.divideScalar(length));
    t.scale.set(radius, length, radius);
    t.updateMatrix();
    mesh.setMatrixAt(mesh.count, t.matrix);
    mesh.userData.tips[mesh.count++] = tip;
  }

  grid(color: number, opacity: number, maximum: number, z = -Infinity, series = "floor") {
    const key = `grid:${series}:${opacity}`;
    const lines = this.#slot(`${key}:${maximum}`, () => {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(maximum * 6, 3));
      return new THREE.LineSegments(g, this.#material(key, () =>
        new THREE.LineBasicMaterial({ color, opacity, transparent: true, depthWrite: false })));
    });
    lines.renderOrder = z;
    lines.material.color.setHex(color);
    const geometry = lines.geometry;
    geometry.setDrawRange(0, 0);
    (geometry.boundingBox ??= new THREE.Box3()).makeEmpty();
    return geometry;
  }

  gridSegment(g: THREE.BufferGeometry, a: Point, b: Point) {
    const pos = g.getAttribute("position"), i = g.drawRange.count;
    pos.setXYZ(i, ...a); pos.setXYZ(i + 1, ...b);
    pos.needsUpdate = true;
    g.setDrawRange(0, i + 2);
    for (const p of [a, b]) g.boundingBox!.expandByPoint(this.#direction.set(...p));
    g.boundingBox!.getBoundingSphere(g.boundingSphere ??= new THREE.Sphere());
  }

  line(points: Point[], color: number, opacity: number, radius: number, role = "marker") {
    const [a, b] = points;
    if (!a || !b) return;
    const key = `tube:${role}`;
    const object = this.#slot(key, () => new THREE.Mesh(this.#tube, this.#material(key, () =>
      new THREE.MeshBasicMaterial({ color, opacity, transparent: opacity < 1, depthWrite: opacity >= 1 }))));
    this.#direction.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    const length = this.#direction.length();
    object.visible = length > 0;
    object.material.color.setHex(color);
    object.material.opacity = opacity;
    object.renderOrder = a[2] === b[2] ? a[2] : -Infinity;
    object.position.set(...a);
    if (radius) object.position.addScaledVector(this.#direction, .5);
    if (length) object.quaternion.setFromUnitVectors(this.#up, this.#direction.divideScalar(length));
    object.scale.set(radius || 1, length, radius || 1);
    return object;
  }

  floorMarkerTip(x: number, y: number, z: number, radius: number, color: number) {
    // The floor tube is open-ended. Face its front cap toward the Front preset
    // and sort just the cap ahead of the translucent bars, not the whole tube.
    const cap = this.#slot("floorMarkerTip", () => new THREE.Mesh(this.#cap,
      this.#material("floorMarkerTip", () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .9, depthWrite: false }))));
    cap.position.set(x, y, z);
    cap.material.color.setHex(color);
    cap.scale.setScalar(radius);
    cap.renderOrder = z;
  }

  bar(center: number, width: number, height: number, depth: number, color: number, opacity: number) {
    const bar = this.#slot("bar", () => {
      const mesh = new THREE.Mesh(this.#box, this.#material("bar", () =>
        new THREE.MeshPhysicalMaterial({
          color: 0x22e4ef, emissive: 0x087d91, emissiveIntensity: .5,
          metalness: .18, roughness: .5, clearcoat: .45, clearcoatRoughness: .5, transparent: true,
          opacity: .65, depthWrite: false, side: THREE.DoubleSide,
        })));
      mesh.add(new THREE.LineSegments(this.#edges, this.#material("outline", () =>
        new THREE.LineBasicMaterial({ color: 0x8bffff, transparent: true, opacity: .9, depthWrite: false }))));
      mesh.renderOrder = mesh.children[0].renderOrder = BAR_CENTER_Z;
      mesh.userData.blendOrder = 1;
      mesh.children[0].userData.blendOrder = 2;
      return mesh;
    });
    bar.position.set(center, height / 2, BAR_CENTER_Z);
    bar.material.color.setHex(color);
    bar.material.emissive.copy(bar.material.color).multiplyScalar(.28);
    bar.material.opacity = opacity;
    bar.material.transparent = opacity < 1;
    bar.material.depthWrite = opacity === 1;
    const outline = (bar.children[0] as THREE.LineSegments<THREE.EdgesGeometry, THREE.LineBasicMaterial>).material;
    outline.color.copy(bar.material.color).lerp(WHITE, .25);
    outline.opacity = Math.min(1, opacity * .9 / .65);
    bar.scale.set(width, height, depth);
    return bar;
  }

  face(a: number, b: number, y: number, zero: number, z: number, future: boolean, color: number, opacity: number) {
    const key = future ? "future" : "recorded";
    const face = this.#slot(key, () => new THREE.Mesh(this.#plane, this.#material(key, () =>
      new THREE.MeshBasicMaterial({
        color: 0xff883f, transparent: true, opacity: future ? .16 : .3,
        depthWrite: false, side: THREE.DoubleSide,
      }))));
    face.position.set((a + b) / 2, (y + zero) / 2, z);
    face.renderOrder = z;
    face.userData.blendOrder = -1;
    face.material.color.setHex(color);
    face.material.opacity = (future ? .16 : .3) * opacity;
    face.scale.set(b - a, Math.abs(y - zero), 1);
    return face;
  }

  label(text: string, position: Point, color = "#87b4ce", size = .24, unit = false) {
    const sprite = this.#slot("label", () => {
      const canvas = document.createElement("canvas");
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return new THREE.Sprite(new THREE.SpriteMaterial({
        map: texture, transparent: true, depthTest: false, depthWrite: false,
      }));
    });
    const texture = sprite.material.map!;
    const canvas = texture.image as HTMLCanvasElement;
    const key = `${text}:${color}`;
    if (sprite.userData.label !== key) {
      const context = canvas.getContext("2d")!;
      context.font = "500 32px system-ui";
      const width = Math.ceil(context.measureText(text).width) + 24;
      // Texture dimensions are immutable after upload; replace only if needed.
      if (canvas.width !== width || canvas.height !== 56) {
        texture.dispose();
        canvas.width = width; canvas.height = 56;
        sprite.material.map = new THREE.CanvasTexture(canvas);
        sprite.material.map.colorSpace = THREE.SRGBColorSpace;
        sprite.material.needsUpdate = true;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.font = "500 32px system-ui"; context.textAlign = "center"; context.textBaseline = "middle";
      context.fillStyle = color; context.fillText(text, canvas.width / 2, 28);
      sprite.material.map!.needsUpdate = true;
      sprite.userData.label = key;
    }
    sprite.position.set(...position);
    sprite.center.set(.5, .5);
    if (unit) this.#unitLabels.push(sprite);
    sprite.renderOrder = Infinity;
    sprite.scale.set(size * canvas.width / 56, size, 1);
  }

  #release(object: THREE.Object3D) {
    object.removeFromParent();
    if (object instanceof THREE.InstancedMesh) object.dispose();
    if (object instanceof THREE.LineSegments) object.geometry.dispose();
    if (object instanceof THREE.Sprite) {
      object.material.map?.dispose();
      object.material.dispose();
    }
  }

  end() {
    for (const [kind, pool] of this.#pools) {
      const count = this.#used.get(kind) ?? 0;
      for (const object of pool.splice(count)) this.#release(object);
    }
  }

  dispose() {
    for (const pool of this.#pools.values()) for (const object of pool) this.#release(object);
    for (const material of this.#materials.values()) material.dispose();
    for (const geometry of [this.#box, this.#edges, this.#plane, this.#tube, this.#cap, this.#joint]) geometry.dispose();
    this.#pools.clear(); this.#materials.clear(); this.#scene.clear();
  }
}
