import * as THREE from "three";
import { createArc, updateArc } from "./arc";
import { dialAngle } from "./dial-angle";
import type { resolveThermostatConfig } from "./config";

function point(fraction: number, radius = 1.72) {
  const angle = dialAngle(fraction);
  return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
}

function ringMaterial(color: THREE.ColorRepresentation) {
  return new THREE.MeshStandardMaterial({ color, emissive: color, roughness: .2, metalness: .25 });
}

export class DialScene {
  readonly scene = new THREE.Scene();
  readonly disk = new THREE.Mesh(new THREE.CylinderGeometry(1.42, 1.48, .14, 96),
    new THREE.MeshPhysicalMaterial({ color: 0x102945, metalness: .45, roughness: .18, clearcoat: 1, transparent: true }));
  readonly track = new THREE.Mesh(createArc(.07), ringMaterial(0x173b55));
  readonly ring = new THREE.Mesh(createArc(.08), ringMaterial(0xffffff));
  readonly marker = new THREE.Mesh(new THREE.SphereGeometry(.11, 16, 12), new THREE.MeshBasicMaterial());
  readonly ticks = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ vertexColors: true }));
  readonly #inactive = new THREE.Color(0x37647f);
  fraction = NaN;
  #tube = NaN;
  #accent = "";

  constructor() {
    const light = new THREE.DirectionalLight(0xc5edff, 2.5);
    light.position.set(-3, 4, 6);
    this.disk.rotation.x = Math.PI / 2;
    this.disk.position.z = -.16;
    this.track.rotation.z = dialAngle(1);
    this.ticks.geometry.setFromPoints(Array.from({ length: 27 }, (_, i) =>
      [point(i / 26, 1.92), point(i / 26, i % 2 ? 1.98 : 2.04)]).flat());
    this.ticks.geometry.setAttribute("color", new THREE.Float32BufferAttribute(new Float32Array(27 * 6), 3));
    this.scene.add(new THREE.HemisphereLight(0xb5eaff, 0x071126, 2), light, this.disk, this.track, this.ring, this.ticks, this.marker);
  }

  update(config: ReturnType<typeof resolveThermostatConfig>, fraction: number, accent: string) {
    this.disk.material.opacity = config.glass_opacity;
    this.track.material.emissiveIntensity = this.ring.material.emissiveIntensity = config.glow_intensity;
    this.ticks.visible = config.show_dial_ticks;
    if (fraction !== this.fraction || config.ring_thickness !== this.#tube) {
      updateArc(this.ring.geometry, fraction, config.ring_thickness);
      this.ring.geometry.boundingSphere!.radius = 1.72 + config.ring_thickness;
      this.ring.visible = fraction > 0;
      this.ring.rotation.z = dialAngle(fraction);
      this.marker.position.copy(point(fraction));
      this.#tube = config.ring_thickness;
    }
    if (this.#accent !== accent || this.fraction !== fraction) {
      const active = this.ring.material.color.set(accent);
      this.ring.material.emissive.copy(active);
      this.marker.material.color.copy(active);
      const colors = this.ticks.geometry.getAttribute("color");
      for (let i = 0; i <= 26; i++) {
        const tint = i / 26 <= fraction ? active : this.#inactive;
        colors.setXYZ(i * 2, tint.r, tint.g, tint.b);
        colors.setXYZ(i * 2 + 1, tint.r, tint.g, tint.b);
      }
      colors.needsUpdate = true;
    }
    this.fraction = fraction;
    this.#accent = accent;
  }

  dispose() {
    for (const object of [this.disk, this.track, this.ring, this.marker, this.ticks]) {
      object.geometry.dispose();
      object.material.dispose();
    }
    this.scene.clear();
  }
}
