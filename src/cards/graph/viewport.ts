import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CAMERA_OFFSETS, fitCamera, setCameraSpan } from "../../shared/graph/camera";
import { BAR_WORLD_DEPTH, ChartScene } from "../../shared/graph/chart-scene";
import type { GraphSettings, Series } from "./config";
import { axisRange, HOUR, MINUTE, type Plot } from "./data";

export interface Lane extends Plot { series: Series; name: string; unit: string }
type View = GraphSettings["starting_view"];
const height = 4.8;
export class GraphViewport {
  readonly renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  private scene = new THREE.Scene();
  private chart = new ChartScene(this.scene, 48);
  private camera = new THREE.OrthographicCamera(-12, 12, 5, -5, .1, 120);
  private controls: OrbitControls;
  private resize: ResizeObserver;
  private events = new AbortController();
  private targets: THREE.Object3D[] = [];
  private ray = new THREE.Raycaster();
  private span = 12;
  private aspect = 1;
  private preset?: View;

  constructor(private stage: HTMLElement, initial: View, schedule: () => void, onPreset: (v?: View) => void, lost: () => void) {
    const r = this.renderer, canvas = r.domElement;
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    r.setClearColor(0x050914, 0);
    r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.4;
    stage.prepend(canvas);
    this.chart.sortTransparency(r, this.camera);
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.minPolarAngle = .01; this.controls.maxPolarAngle = Math.PI / 2 - .01;
    this.controls.minZoom = .55; this.controls.maxZoom = 4;
    this.controls.addEventListener("start", () => { this.preset = undefined; onPreset(); });
    this.controls.addEventListener("change", schedule);
    const signal = this.events.signal, tip = stage.querySelector<HTMLElement>(".tip")!;
    canvas.addEventListener("pointerleave", () => tip.style.display = "none", {signal});
    canvas.addEventListener("pointermove", e => {
      const box = canvas.getBoundingClientRect();
      const x = e.clientX - box.left, y = e.clientY - box.top;
      this.ray.setFromCamera(new THREE.Vector2(2*x/box.width - 1, 1 - 2*y/box.height), this.camera);
      for (const hit of this.ray.intersectObjects(this.targets, false)) {
        const text = hit.instanceId === undefined ? hit.object.userData.tip : hit.object.userData.tips?.[hit.instanceId];
        if (!text) continue;
        tip.textContent = text; tip.style.display = "block";
        tip.style.left = `${Math.max(4,Math.min(x+12,box.width-tip.offsetWidth-4))}px`;
        tip.style.top = `${Math.max(4,Math.min(y+8,box.height-tip.offsetHeight-4))}px`;
        return;
      }
      tip.style.display = "none";
    }, {signal});
    canvas.addEventListener("webglcontextlost", e => { e.preventDefault(); lost(); }, {signal});
    this.resize = new ResizeObserver(() => {
      const w = stage.clientWidth, h = stage.clientHeight;
      if (!w || !h) return;
      r.setSize(w,h,false); this.aspect = w/h;
      setCameraSpan(this.camera, this.aspect, this.span); this.fit(); schedule();
    });
    this.resize.observe(stage);
    this.view(initial);
  }
  view(v: View) {
    this.preset = v;
    this.camera.zoom = 1;
    this.controls.target.set(0,1.7,0);
    this.camera.position.copy(this.controls.target).add(new THREE.Vector3(...CAMERA_OFFSETS[v]));
    this.camera.updateProjectionMatrix(); this.controls.update(); this.fit();
  }
  private fit() {
    if (this.preset) this.span = fitCamera(this.scene,this.camera,this.controls,this.aspect,this.chart.stackUnits(this.camera,true)) ?? this.span;
  }
  plot(lanes: Lane[], config: GraphSettings, now: number, stamp: (t: number) => string, fmt: (v: number) => string) {
    const chart = this.chart, start = now - config.hours_to_show * HOUR;
    const x = (t: number) => (t-start)/(now-start)*18-9;
    this.controls.enabled = !config.lock_navigation;
    this.renderer.domElement.style.touchAction = config.lock_navigation ? "auto" : "none";
    this.stage.querySelector<HTMLElement>(".tip")!.style.display = "none";
    chart.pointLight.intensity = config.point_light_intensity;
    chart.begin(); this.targets.length = 0;
    // Only compatible units share a scale. Explicit bounds create an independent axis.
    const values = lanes.map(l => [...l.points, ...l.bars].map(p => p.value));
    let rear = 0;
    lanes.forEach((lane, i) => {
      const s = lane.series, key = `lane${i}`, z = -i * config.dataset_spacing / 4;
      const groups = lanes.map((other,j) => ({other,j})).filter(({other,j}) => j === i ||
        (lane.unit && other.unit === lane.unit && [s.min,s.max,other.series.min,other.series.max].every(b => b === undefined)));
      const [lo, hi] = axisRange(groups.flatMap(({j}) => values[j]), groups.some(({other}) => other.series.plot === "bar"), s.min, s.max);
      const y = (v: number) => (v-lo)/(hi-lo)*height;
      const color = parseInt(s.color.slice(1),16), shift = s.shift_minutes * MINUTE;
      const sx = (time: number) => x(time+shift);
      const label = [lane.name,lane.unit].filter(Boolean).join(" · ");
      const tip = (time: number, v: number) => `${lane.name}\n${stamp(time)}\n${fmt(v)} ${lane.unit}`.trimEnd();
      rear = z;
      const grid = chart.grid(color,.18,6,z,key);
      chart.gridSegment(grid,[-9,0,z],[-9,height,z]);
      for (let j=0;j<=4;j++) {
        const h = height*j/4;
        chart.gridSegment(grid,[-9,h,z],[9,h,z]);
        // At zero spacing place independent tick labels in separate columns.
        if (config.dataset_spacing || groups[0].j === i)
          chart.label(fmt(lo+(hi-lo)*j/4),[-9.8-(config.dataset_spacing ? 0 : i*1.7),h,z],s.color,.22);
      }
      chart.label(label,[-7,5.2,z],s.color,.3,true);
      const radius = .028*s.line_width/100, alpha = s.opacity/100;
      if (!alpha) return;
      if (s.plot === "bar") {
        const base = Math.max(lo,Math.min(hi,0));
        for (const b of lane.bars) {
          const a = sx(b.from), end = sx(b.to), v = Math.min(hi,Math.max(lo,b.value));
          if (end <= a || (b.value < lo && base === lo) || (b.value > hi && base === hi)) continue;
          const bar = chart.bar((a+end)/2,(end-a)*.82,Math.max(.008,Math.abs(y(v)-y(base))),BAR_WORLD_DEPTH,color,alpha,z,Math.min(y(v),y(base)),`${key}:bar`);
          bar.userData.tip = `${lane.name} · ${s.aggregate}\n${stamp(b.from)}–${stamp(b.to)}\n${fmt(b.value)} ${lane.unit}`.trimEnd();
          this.targets.push(bar);
        }
        return;
      }
      const strokes = chart.strokes(key,color,2*lane.points.length,alpha,z);
      const dots = chart.strokes(key,color,lane.points.length,alpha,z,true);
      const stroke = (t1:number,v1:number,t2:number,v2:number,text:string) => {
        if (Math.max(v1,v2)<lo || Math.min(v1,v2)>hi) return;
        const clip = (t:number,v:number): [number,number,number] => {
          const bounded = Math.min(hi,Math.max(lo,v));
          return [sx(t + (v2 === v1 ? 0 : (bounded-v)*(t2-t1)/(v2-v1))),y(bounded),z];
        };
        chart.stroke(strokes,clip(t1,v1),clip(t2,v2),radius,text);
      };
      lane.points.forEach((p,j) => {
        const prev = lane.points[j-1], text = tip(p.time,p.value);
        if (p.value >= lo && p.value <= hi) chart.joint(dots,[sx(p.time),y(p.value),z],radius*1.3,text);
        if (!prev || prev.run !== p.run) return;
        if (s.plot === "step") {
          stroke(prev.time,prev.value,p.time,prev.value,tip(prev.time,prev.value));
          stroke(p.time,prev.value,p.time,p.value,text);
        } else stroke(prev.time,prev.value,p.time,p.value,text);
      });
      if (strokes.count) this.targets.push(strokes);
      if (dots.count) this.targets.push(dots);
    });
    const times = chart.grid(0x2676b8,.2,8), step = (now-start)/6;
    for (let i=0; i<=6; i++) {
      const t = now - i*step;
      chart.gridSegment(times,[x(t),-.06,1],[x(t),-.06,rear-.4]);
      chart.label(stamp(t),[x(t),-.45,1],undefined,.25);
    }
    const marker = parseInt(config.now_marker_color.slice(1),16);
    chart.line([[9,0,1],[9,0,rear]],marker,.9,.022);
    chart.line([[9,0,rear],[9,height,rear]],marker,.9,.022);
    chart.end(); this.scene.updateMatrixWorld(true);
    chart.cachePlotBounds(this.targets); this.fit();
  }
  render() {
    this.chart.followCamera(this.camera,this.controls.target); this.chart.stackUnits(this.camera);
    this.renderer.render(this.scene,this.camera);
  }
  dispose() {
    this.events.abort(); this.resize.disconnect(); this.controls.dispose(); this.chart.dispose();
    this.renderer.dispose(); this.renderer.forceContextLoss(); this.renderer.domElement.remove();
    this.targets.length = 0;
  }
}
