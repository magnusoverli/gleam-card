/*! Gleam Card | Original code: Unlicense
# Third-party notices

The root LICENSE applies to original Gleam Card code. Third-party code retains
its own license; it is not covered by the project's public-domain dedication.

## Three.js

Gleam Card bundles Three.js 0.187.0 and its OrbitControls module from the
`three` npm package, licensed under the MIT License below.
Distributions containing this code must retain this notice.

The MIT License

Copyright © 2010-2026 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
var e = {
	LEFT: 0,
	MIDDLE: 1,
	RIGHT: 2,
	ROTATE: 0,
	DOLLY: 1,
	PAN: 2
}, t = {
	ROTATE: 0,
	PAN: 1,
	DOLLY_PAN: 2,
	DOLLY_ROTATE: 3
}, n = 1e3, r = 1001, i = 1002, a = 1003, o = 1004, s = 1005, c = 1006, l = 1007, u = 1008, d = 1009, f = 1010, p = 1011, m = 1012, h = 1013, g = 1014, _ = 1015, v = 1016, y = 1017, b = 1018, x = 1020, S = 35902, C = 35899, w = 1021, T = 1022, E = 1023, D = 1026, O = 1027, k = 1028, A = 1029, j = 1030, ee = 1031, te = 1033, M = 33776, N = 33777, P = 33778, F = 33779, I = 35840, ne = 35841, re = 35842, ie = 35843, ae = 36196, oe = 37492, L = 37496, se = 37488, ce = 37489, le = 37490, ue = 37491, de = 37808, fe = 37809, pe = 37810, me = 37811, he = 37812, ge = 37813, _e = 37814, ve = 37815, ye = 37816, be = 37817, xe = 37818, Se = 37819, Ce = 37820, we = 37821, Te = 36492, Ee = 36494, De = 36495, Oe = 36283, ke = 36284, Ae = 36285, je = 36286, R = 2300, Me = 2301, Ne = 2302, Pe = 2303, z = 2400, Fe = 2401, B = 2402, V = 3200, Ie = "srgb", Le = "srgb-linear", Re = "linear", ze = "srgb", Be = 7680, Ve = 35044, He = 2e3;
function Ue(e) {
	for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
	return !1;
}
function We(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function Ge(e) {
	return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
function Ke() {
	let e = Ge("canvas");
	return e.style.display = "block", e;
}
var qe = {};
function Je(...e) {
	let t = "THREE." + e.shift();
	console.log(t, ...e);
}
function Ye(e) {
	let t = e[0];
	if (typeof t == "string" && t.startsWith("TSL:")) {
		let t = e[1];
		t && t.isStackTrace ? e[0] += " " + t.getLocation() : e[1] = "Stack trace not available. Enable \"THREE.Node.captureStackTrace\" to capture stack traces.";
	}
	return e;
}
function H(...e) {
	e = Ye(e);
	let t = "THREE." + e.shift();
	{
		let n = e[0];
		n && n.isStackTrace ? console.warn(n.getError(t)) : console.warn(t, ...e);
	}
}
function U(...e) {
	e = Ye(e);
	let t = "THREE." + e.shift();
	{
		let n = e[0];
		n && n.isStackTrace ? console.error(n.getError(t)) : console.error(t, ...e);
	}
}
function Xe(...e) {
	let t = e.join(" ");
	t in qe || (qe[t] = !0, H(...e));
}
function Ze(e, t, n) {
	return new Promise(function(r, i) {
		function a() {
			switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) {
				case e.WAIT_FAILED:
					i();
					break;
				case e.TIMEOUT_EXPIRED:
					setTimeout(a, n);
					break;
				default: r();
			}
		}
		setTimeout(a, n);
	});
}
var Qe = {
	0: 0,
	2: 6,
	4: 4,
	3: 5,
	1: 1,
	6: 2,
	7: 7,
	5: 3
}, $e = class {
	addEventListener(e, t) {
		this._listeners === void 0 && (this._listeners = {});
		let n = this._listeners;
		n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
	}
	hasEventListener(e, t) {
		let n = this._listeners;
		return n !== void 0 && n[e] !== void 0 && n[e].indexOf(t) !== -1;
	}
	removeEventListener(e, t) {
		let n = this._listeners;
		if (n === void 0) return;
		let r = n[e];
		if (r !== void 0) {
			let e = r.indexOf(t);
			e !== -1 && r.splice(e, 1);
		}
	}
	dispatchEvent(e) {
		let t = this._listeners;
		if (t === void 0) return;
		let n = t[e.type];
		if (n !== void 0) {
			e.target = this;
			let t = n.slice(0);
			for (let n = 0, r = t.length; n < r; n++) t[n].call(this, e);
			e.target = null;
		}
	}
}, et = /* @__PURE__ */ "00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff".split("."), tt = 1234567, nt = Math.PI / 180, rt = 180 / Math.PI;
function it() {
	let e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0, r = Math.random() * 4294967295 | 0;
	return (et[e & 255] + et[e >> 8 & 255] + et[e >> 16 & 255] + et[e >> 24 & 255] + "-" + et[t & 255] + et[t >> 8 & 255] + "-" + et[t >> 16 & 15 | 64] + et[t >> 24 & 255] + "-" + et[n & 63 | 128] + et[n >> 8 & 255] + "-" + et[n >> 16 & 255] + et[n >> 24 & 255] + et[r & 255] + et[r >> 8 & 255] + et[r >> 16 & 255] + et[r >> 24 & 255]).toLowerCase();
}
function W(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function at(e, t) {
	return (e % t + t) % t;
}
function ot(e, t, n, r, i) {
	return r + (e - t) * (i - r) / (n - t);
}
function st(e, t, n) {
	return e === t ? 0 : (n - e) / (t - e);
}
function ct(e, t, n) {
	return (1 - n) * e + n * t;
}
function lt(e, t, n, r) {
	return ct(e, t, 1 - Math.exp(-n * r));
}
function ut(e, t = 1) {
	return t - Math.abs(at(e, t * 2) - t);
}
function dt(e, t, n) {
	return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * (3 - 2 * e));
}
function ft(e, t, n) {
	return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * e * (e * (e * 6 - 15) + 10));
}
function pt(e, t) {
	return e + Math.floor(Math.random() * (t - e + 1));
}
function mt(e, t) {
	return e + Math.random() * (t - e);
}
function ht(e) {
	return e * (.5 - Math.random());
}
function gt(e) {
	e !== void 0 && (tt = e);
	let t = tt += 1831565813;
	return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function _t(e) {
	return e * nt;
}
function vt(e) {
	return e * rt;
}
function yt(e) {
	return e > 0 && Number.isInteger(e) && 2 ** Math.round(Math.log2(e)) === e;
}
function bt(e) {
	return 2 ** Math.ceil(Math.log(e) / Math.LN2);
}
function xt(e) {
	return 2 ** Math.floor(Math.log(e) / Math.LN2);
}
function St(e, t, n, r, i) {
	let a = Math.cos, o = Math.sin, s = a(n / 2), c = o(n / 2), l = a((t + r) / 2), u = o((t + r) / 2), d = a((t - r) / 2), f = o((t - r) / 2), p = a((r - t) / 2), m = o((r - t) / 2);
	switch (i) {
		case "XYX":
			e.set(s * u, c * d, c * f, s * l);
			break;
		case "YZY":
			e.set(c * f, s * u, c * d, s * l);
			break;
		case "ZXZ":
			e.set(c * d, c * f, s * u, s * l);
			break;
		case "XZX":
			e.set(s * u, c * m, c * p, s * l);
			break;
		case "YXY":
			e.set(c * p, s * u, c * m, s * l);
			break;
		case "ZYZ":
			e.set(c * m, c * p, s * u, s * l);
			break;
		default: H("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + i);
	}
}
function Ct(e) {
	switch (e.constructor) {
		case Uint32Array: return 4294967295;
		case Uint16Array: return 65535;
		case Uint8Array:
		case Uint8ClampedArray: return 255;
		case Int32Array: return 2147483647;
		case Int16Array: return 32767;
		case Int8Array: return 127;
		default: return;
	}
}
function wt(e, t) {
	if (t.constructor === Float32Array) return e;
	let n = Ct(t);
	if (n === void 0) throw Error("THREE.MathUtils: Invalid component type.");
	return Math.max(e / n, -1);
}
function Tt(e, t) {
	if (t.constructor === Float32Array) return e;
	let n = Ct(t);
	if (n === void 0) throw Error("THREE.MathUtils: Invalid component type.");
	return Math.round(e * n);
}
var Et = {
	DEG2RAD: nt,
	RAD2DEG: rt,
	generateUUID: it,
	clamp: W,
	euclideanModulo: at,
	mapLinear: ot,
	inverseLerp: st,
	lerp: ct,
	damp: lt,
	pingpong: ut,
	smoothstep: dt,
	smootherstep: ft,
	randInt: pt,
	randFloat: mt,
	randFloatSpread: ht,
	seededRandom: gt,
	degToRad: _t,
	radToDeg: vt,
	isPowerOfTwo: yt,
	ceilPowerOfTwo: bt,
	floorPowerOfTwo: xt,
	setQuaternionFromProperEuler: St,
	normalize: Tt,
	denormalize: wt
}, G = class {
	static {
		this.prototype.isVector2 = !0;
	}
	constructor(e = 0, t = 0) {
		this.x = e, this.y = t;
	}
	get width() {
		return this.x;
	}
	set width(e) {
		this.x = e;
	}
	get height() {
		return this.y;
	}
	set height(e) {
		this.y = e;
	}
	set(e, t) {
		return this.x = e, this.y = t, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			default: throw Error("THREE.Vector2: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			default: throw Error("THREE.Vector2: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this;
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	applyMatrix3(e) {
		let t = this.x, n = this.y, r = e.elements;
		return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this;
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
	}
	clamp(e, t) {
		return this.x = W(this.x, e.x, t.x), this.y = W(this.y, e.y, t.y), this;
	}
	clampScalar(e, t) {
		return this.x = W(this.x, e, t), this.y = W(this.y, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(W(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y;
	}
	cross(e) {
		return this.x * e.y - this.y * e.x;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	angle() {
		return Math.atan2(-this.y, -this.x) + Math.PI;
	}
	angleTo(e) {
		let t = Math.sqrt(this.lengthSq() * e.lengthSq());
		if (t === 0) return Math.PI / 2;
		let n = this.dot(e) / t;
		return Math.acos(W(n, -1, 1));
	}
	distanceTo(e) {
		return Math.sqrt(this.distanceToSquared(e));
	}
	distanceToSquared(e) {
		let t = this.x - e.x, n = this.y - e.y;
		return t * t + n * n;
	}
	manhattanDistanceTo(e) {
		return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this;
	}
	rotateAround(e, t) {
		let n = Math.cos(t), r = Math.sin(t), i = this.x - e.x, a = this.y - e.y;
		return this.x = i * n - a * r + e.x, this.y = i * r + a * n + e.y, this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y;
	}
}, Dt = class {
	constructor(e = 0, t = 0, n = 0, r = 1) {
		this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
	}
	static slerpFlat(e, t, n, r, i, a, o) {
		let s = n[r + 0], c = n[r + 1], l = n[r + 2], u = n[r + 3], d = i[a + 0], f = i[a + 1], p = i[a + 2], m = i[a + 3];
		if (u !== m || s !== d || c !== f || l !== p) {
			let e = s * d + c * f + l * p + u * m;
			e < 0 && (d = -d, f = -f, p = -p, m = -m, e = -e);
			let t = 1 - o;
			if (e < .9995) {
				let n = Math.acos(e), r = Math.sin(n);
				t = Math.sin(t * n) / r, o = Math.sin(o * n) / r, s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o;
			} else {
				s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o;
				let e = 1 / Math.sqrt(s * s + c * c + l * l + u * u);
				s *= e, c *= e, l *= e, u *= e;
			}
		}
		e[t] = s, e[t + 1] = c, e[t + 2] = l, e[t + 3] = u;
	}
	static multiplyQuaternionsFlat(e, t, n, r, i, a) {
		let o = n[r], s = n[r + 1], c = n[r + 2], l = n[r + 3], u = i[a], d = i[a + 1], f = i[a + 2], p = i[a + 3];
		return e[t] = o * p + l * u + s * f - c * d, e[t + 1] = s * p + l * d + c * u - o * f, e[t + 2] = c * p + l * f + o * d - s * u, e[t + 3] = l * p - o * u - s * d - c * f, e;
	}
	get x() {
		return this._x;
	}
	set x(e) {
		this._x = e, this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(e) {
		this._y = e, this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(e) {
		this._z = e, this._onChangeCallback();
	}
	get w() {
		return this._w;
	}
	set w(e) {
		this._w = e, this._onChangeCallback();
	}
	set(e, t, n, r) {
		return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._w);
	}
	copy(e) {
		return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
	}
	setFromEuler(e, t = !0) {
		let n = e._x, r = e._y, i = e._z, a = e._order, o = Math.cos, s = Math.sin, c = o(n / 2), l = o(r / 2), u = o(i / 2), d = s(n / 2), f = s(r / 2), p = s(i / 2);
		switch (a) {
			case "XYZ":
				this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "YXZ":
				this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p;
				break;
			case "ZXY":
				this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "ZYX":
				this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p;
				break;
			case "YZX":
				this._x = d * l * u + c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "XZY":
				this._x = d * l * u - c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u + d * f * p;
				break;
			default: H("Quaternion: .setFromEuler() encountered an unknown order: " + a);
		}
		return t === !0 && this._onChangeCallback(), this;
	}
	setFromAxisAngle(e, t) {
		let n = t / 2, r = Math.sin(n);
		return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
	}
	setFromRotationMatrix(e) {
		let t = e.elements, n = t[0], r = t[4], i = t[8], a = t[1], o = t[5], s = t[9], c = t[2], l = t[6], u = t[10], d = n + o + u;
		if (d > 0) {
			let e = .5 / Math.sqrt(d + 1);
			this._w = .25 / e, this._x = (l - s) * e, this._y = (i - c) * e, this._z = (a - r) * e;
		} else if (n > o && n > u) {
			let e = 2 * Math.sqrt(1 + n - o - u);
			this._w = (l - s) / e, this._x = .25 * e, this._y = (r + a) / e, this._z = (i + c) / e;
		} else if (o > u) {
			let e = 2 * Math.sqrt(1 + o - n - u);
			this._w = (i - c) / e, this._x = (r + a) / e, this._y = .25 * e, this._z = (s + l) / e;
		} else {
			let e = 2 * Math.sqrt(1 + u - n - o);
			this._w = (a - r) / e, this._x = (i + c) / e, this._y = (s + l) / e, this._z = .25 * e;
		}
		return this._onChangeCallback(), this;
	}
	setFromUnitVectors(e, t) {
		let n = e.dot(t) + 1;
		return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
	}
	angleTo(e) {
		return 2 * Math.acos(Math.abs(W(this.dot(e), -1, 1)));
	}
	rotateTowards(e, t) {
		let n = this.angleTo(e);
		if (n === 0) return this;
		let r = Math.min(1, t / n);
		return this.slerp(e, r), this;
	}
	identity() {
		return this.set(0, 0, 0, 1);
	}
	invert() {
		return this.conjugate();
	}
	conjugate() {
		return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
	}
	dot(e) {
		return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
	}
	lengthSq() {
		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
	}
	length() {
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
	}
	normalize() {
		let e = this.length();
		return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x *= e, this._y *= e, this._z *= e, this._w *= e), this._onChangeCallback(), this;
	}
	multiply(e) {
		return this.multiplyQuaternions(this, e);
	}
	premultiply(e) {
		return this.multiplyQuaternions(e, this);
	}
	multiplyQuaternions(e, t) {
		let n = e._x, r = e._y, i = e._z, a = e._w, o = t._x, s = t._y, c = t._z, l = t._w;
		return this._x = n * l + a * o + r * c - i * s, this._y = r * l + a * s + i * o - n * c, this._z = i * l + a * c + n * s - r * o, this._w = a * l - n * o - r * s - i * c, this._onChangeCallback(), this;
	}
	slerp(e, t) {
		let n = e._x, r = e._y, i = e._z, a = e._w, o = this.dot(e);
		o < 0 && (n = -n, r = -r, i = -i, a = -a, o = -o);
		let s = 1 - t;
		if (o < .9995) {
			let e = Math.acos(o), c = Math.sin(e);
			s = Math.sin(s * e) / c, t = Math.sin(t * e) / c, this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this._onChangeCallback();
		} else this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this.normalize();
		return this;
	}
	slerpQuaternions(e, t, n) {
		return this.copy(e).slerp(t, n);
	}
	random() {
		let e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), i = Math.sqrt(n);
		return this.set(r * Math.sin(e), r * Math.cos(e), i * Math.sin(t), i * Math.cos(t));
	}
	equals(e) {
		return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
	}
	fromArray(e, t = 0) {
		return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
	}
	fromBufferAttribute(e, t) {
		return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
	}
	toJSON() {
		return this.toArray();
	}
	_onChange(e) {
		return this._onChangeCallback = e, this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x, yield this._y, yield this._z, yield this._w;
	}
}, K = class {
	static {
		this.prototype.isVector3 = !0;
	}
	constructor(e = 0, t = 0, n = 0) {
		this.x = e, this.y = t, this.z = n;
	}
	set(e, t, n) {
		return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this.z = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setZ(e) {
		return this.z = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			case 2:
				this.z = t;
				break;
			default: throw Error("THREE.Vector3: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw Error("THREE.Vector3: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this.z = e.z, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this.z += e.z, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this.z += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this.z -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this.z *= e, this;
	}
	multiplyVectors(e, t) {
		return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
	}
	applyEuler(e) {
		return this.applyQuaternion(kt.setFromEuler(e));
	}
	applyAxisAngle(e, t) {
		return this.applyQuaternion(kt.setFromAxisAngle(e, t));
	}
	applyMatrix3(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements;
		return this.x = i[0] * t + i[3] * n + i[6] * r, this.y = i[1] * t + i[4] * n + i[7] * r, this.z = i[2] * t + i[5] * n + i[8] * r, this;
	}
	applyNormalMatrix(e) {
		return this.applyMatrix3(e).normalize();
	}
	applyMatrix4(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements, a = 1 / (i[3] * t + i[7] * n + i[11] * r + i[15]);
		return this.x = (i[0] * t + i[4] * n + i[8] * r + i[12]) * a, this.y = (i[1] * t + i[5] * n + i[9] * r + i[13]) * a, this.z = (i[2] * t + i[6] * n + i[10] * r + i[14]) * a, this;
	}
	applyQuaternion(e) {
		let t = this.x, n = this.y, r = this.z, i = e.x, a = e.y, o = e.z, s = e.w, c = 2 * (a * r - o * n), l = 2 * (o * t - i * r), u = 2 * (i * n - a * t);
		return this.x = t + s * c + a * u - o * l, this.y = n + s * l + o * c - i * u, this.z = r + s * u + i * l - a * c, this;
	}
	project(e) {
		return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
	}
	unproject(e) {
		return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
	}
	transformDirection(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements;
		return this.x = i[0] * t + i[4] * n + i[8] * r, this.y = i[1] * t + i[5] * n + i[9] * r, this.z = i[2] * t + i[6] * n + i[10] * r, this.normalize();
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
	}
	clamp(e, t) {
		return this.x = W(this.x, e.x, t.x), this.y = W(this.y, e.y, t.y), this.z = W(this.z, e.z, t.z), this;
	}
	clampScalar(e, t) {
		return this.x = W(this.x, e, t), this.y = W(this.y, e, t), this.z = W(this.z, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(W(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
	}
	cross(e) {
		return this.crossVectors(this, e);
	}
	crossVectors(e, t) {
		let n = e.x, r = e.y, i = e.z, a = t.x, o = t.y, s = t.z;
		return this.x = r * s - i * o, this.y = i * a - n * s, this.z = n * o - r * a, this;
	}
	projectOnVector(e) {
		let t = e.lengthSq();
		if (t === 0) return this.set(0, 0, 0);
		let n = e.dot(this) / t;
		return this.copy(e).multiplyScalar(n);
	}
	projectOnPlane(e) {
		return Ot.copy(this).projectOnVector(e), this.sub(Ot);
	}
	reflect(e) {
		return this.sub(Ot.copy(e).multiplyScalar(2 * this.dot(e)));
	}
	angleTo(e) {
		let t = Math.sqrt(this.lengthSq() * e.lengthSq());
		if (t === 0) return Math.PI / 2;
		let n = this.dot(e) / t;
		return Math.acos(W(n, -1, 1));
	}
	distanceTo(e) {
		return Math.sqrt(this.distanceToSquared(e));
	}
	distanceToSquared(e) {
		let t = this.x - e.x, n = this.y - e.y, r = this.z - e.z;
		return t * t + n * n + r * r;
	}
	manhattanDistanceTo(e) {
		return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
	}
	setFromSpherical(e) {
		return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
	}
	setFromSphericalCoords(e, t, n) {
		let r = Math.sin(t) * e;
		return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this;
	}
	setFromCylindrical(e) {
		return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
	}
	setFromCylindricalCoords(e, t, n) {
		return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
	}
	setFromMatrixPosition(e) {
		let t = e.elements;
		return this.x = t[12], this.y = t[13], this.z = t[14], this;
	}
	setFromMatrixScale(e) {
		let t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
		return this.x = t, this.y = n, this.z = r, this;
	}
	setFromMatrixColumn(e, t) {
		return this.fromArray(e.elements, t * 4);
	}
	setFromMatrix3Column(e, t) {
		return this.fromArray(e.elements, t * 3);
	}
	setFromEuler(e) {
		return this.x = e._x, this.y = e._y, this.z = e._z, this;
	}
	setFromColor(e) {
		return this.x = e.r, this.y = e.g, this.z = e.b, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y && e.z === this.z;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
	}
	randomDirection() {
		let e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
		return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y, yield this.z;
	}
}, Ot = /*@__PURE__*/ new K(), kt = /*@__PURE__*/ new Dt(), q = class {
	static {
		this.prototype.isMatrix3 = !0;
	}
	constructor(e, t, n, r, i, a, o, s, c) {
		this.elements = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r, i, a, o, s, c);
	}
	set(e, t, n, r, i, a, o, s, c) {
		let l = this.elements;
		return l[0] = e, l[1] = r, l[2] = o, l[3] = t, l[4] = i, l[5] = s, l[6] = n, l[7] = a, l[8] = c, this;
	}
	identity() {
		return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
	}
	copy(e) {
		let t = this.elements, n = e.elements;
		return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
	}
	extractBasis(e, t, n) {
		return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
	}
	setFromMatrix4(e) {
		let t = e.elements;
		return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this;
	}
	multiply(e) {
		return this.multiplyMatrices(this, e);
	}
	premultiply(e) {
		return this.multiplyMatrices(e, this);
	}
	multiplyMatrices(e, t) {
		let n = e.elements, r = t.elements, i = this.elements, a = n[0], o = n[3], s = n[6], c = n[1], l = n[4], u = n[7], d = n[2], f = n[5], p = n[8], m = r[0], h = r[3], g = r[6], _ = r[1], v = r[4], y = r[7], b = r[2], x = r[5], S = r[8];
		return i[0] = a * m + o * _ + s * b, i[3] = a * h + o * v + s * x, i[6] = a * g + o * y + s * S, i[1] = c * m + l * _ + u * b, i[4] = c * h + l * v + u * x, i[7] = c * g + l * y + u * S, i[2] = d * m + f * _ + p * b, i[5] = d * h + f * v + p * x, i[8] = d * g + f * y + p * S, this;
	}
	multiplyScalar(e) {
		let t = this.elements;
		return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
	}
	determinant() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8];
		return t * a * l - t * o * c - n * i * l + n * o * s + r * i * c - r * a * s;
	}
	invert() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = l * a - o * c, d = o * s - l * i, f = c * i - a * s, p = t * u + n * d + r * f;
		if (p === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
		let m = 1 / p;
		return e[0] = u * m, e[1] = (r * c - l * n) * m, e[2] = (o * n - r * a) * m, e[3] = d * m, e[4] = (l * t - r * s) * m, e[5] = (r * i - o * t) * m, e[6] = f * m, e[7] = (n * s - c * t) * m, e[8] = (a * t - n * i) * m, this;
	}
	transpose() {
		let e, t = this.elements;
		return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
	}
	getNormalMatrix(e) {
		return this.setFromMatrix4(e).invert().transpose();
	}
	transposeIntoArray(e) {
		let t = this.elements;
		return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
	}
	setUvTransform(e, t, n, r, i, a, o) {
		let s = Math.cos(i), c = Math.sin(i);
		return this.set(n * s, n * c, -n * (s * a + c * o) + a + e, -r * c, r * s, -r * (-c * a + s * o) + o + t, 0, 0, 1), this;
	}
	scale(e, t) {
		return Xe("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(At.makeScale(e, t)), this;
	}
	rotate(e) {
		return Xe("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(At.makeRotation(-e)), this;
	}
	translate(e, t) {
		return Xe("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(At.makeTranslation(e, t)), this;
	}
	makeTranslation(e, t) {
		return e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, t, 0, 0, 1), this;
	}
	makeRotation(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, -n, 0, n, t, 0, 0, 0, 1), this;
	}
	makeScale(e, t) {
		return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this;
	}
	equals(e) {
		let t = this.elements, n = e.elements;
		for (let e = 0; e < 9; e++) if (t[e] !== n[e]) return !1;
		return !0;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 9; n++) this.elements[n] = e[n + t];
		return this;
	}
	toArray(e = [], t = 0) {
		let n = this.elements;
		return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
	}
	clone() {
		return new this.constructor().fromArray(this.elements);
	}
}, At = /*@__PURE__*/ new q(), jt = /*@__PURE__*/ new q().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322), Mt = /*@__PURE__*/ new q().set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715);
function Nt() {
	let e = {
		enabled: !0,
		workingColorSpace: Le,
		spaces: {},
		convert: function(e, t, n) {
			return this.enabled === !1 || t === n || !t || !n || (this.spaces[t].transfer === "srgb" && (e.r = Pt(e.r), e.g = Pt(e.g), e.b = Pt(e.b)), this.spaces[t].primaries !== this.spaces[n].primaries && (e.applyMatrix3(this.spaces[t].toXYZ), e.applyMatrix3(this.spaces[n].fromXYZ)), this.spaces[n].transfer === "srgb" && (e.r = Ft(e.r), e.g = Ft(e.g), e.b = Ft(e.b))), e;
		},
		workingToColorSpace: function(e, t) {
			return this.convert(e, this.workingColorSpace, t);
		},
		colorSpaceToWorking: function(e, t) {
			return this.convert(e, t, this.workingColorSpace);
		},
		getPrimaries: function(e) {
			return this.spaces[e].primaries;
		},
		getTransfer: function(e) {
			return e === "" ? Re : this.spaces[e].transfer;
		},
		getToneMappingMode: function(e) {
			return this.spaces[e].outputColorSpaceConfig.toneMappingMode || "standard";
		},
		getLuminanceCoefficients: function(e, t = this.workingColorSpace) {
			return e.fromArray(this.spaces[t].luminanceCoefficients);
		},
		define: function(e) {
			Object.assign(this.spaces, e);
		},
		_getMatrix: function(e, t, n) {
			return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ);
		},
		_getDrawingBufferColorSpace: function(e) {
			return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace;
		},
		_getUnpackColorSpace: function(e = this.workingColorSpace) {
			return this.spaces[e].workingColorSpaceConfig.unpackColorSpace;
		}
	}, t = [
		.64,
		.33,
		.3,
		.6,
		.15,
		.06
	], n = [
		.2126,
		.7152,
		.0722
	], r = [.3127, .329];
	return e.define({
		[Le]: {
			primaries: t,
			whitePoint: r,
			transfer: Re,
			toXYZ: jt,
			fromXYZ: Mt,
			luminanceCoefficients: n,
			workingColorSpaceConfig: { unpackColorSpace: Ie },
			outputColorSpaceConfig: { drawingBufferColorSpace: Ie }
		},
		[Ie]: {
			primaries: t,
			whitePoint: r,
			transfer: ze,
			toXYZ: jt,
			fromXYZ: Mt,
			luminanceCoefficients: n,
			outputColorSpaceConfig: { drawingBufferColorSpace: Ie }
		}
	}), e;
}
var J = /*@__PURE__*/ Nt();
function Pt(e) {
	return e < .04045 ? e * .0773993808 : (e * .9478672986 + .0521327014) ** 2.4;
}
function Ft(e) {
	return e < .0031308 ? e * 12.92 : 1.055 * e ** .41666 - .055;
}
var It, Lt = class {
	static getDataURL(e, t = "image/png") {
		if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
		let n;
		if (e instanceof HTMLCanvasElement) n = e;
		else {
			It === void 0 && (It = Ge("canvas")), It.width = e.width, It.height = e.height;
			let t = It.getContext("2d");
			e instanceof ImageData ? t.putImageData(e, 0, 0) : t.drawImage(e, 0, 0, e.width, e.height), n = It;
		}
		return n.toDataURL(t);
	}
	static sRGBToLinear(e) {
		if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
			let t = Ge("canvas");
			t.width = e.width, t.height = e.height;
			let n = t.getContext("2d");
			n.drawImage(e, 0, 0, e.width, e.height);
			let r = n.getImageData(0, 0, e.width, e.height), i = r.data;
			for (let e = 0; e < i.length; e++) i[e] = Pt(i[e] / 255) * 255;
			return n.putImageData(r, 0, 0), t;
		}
		if (e.data) {
			let t = e.data.slice(0);
			for (let e = 0; e < t.length; e++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[e] = Math.floor(Pt(t[e] / 255) * 255) : t[e] = Pt(t[e]);
			return {
				data: t,
				width: e.width,
				height: e.height
			};
		}
		return H("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
	}
}, Rt = 0, zt = class {
	constructor(e = null) {
		this.isTextureSource = !0, Object.defineProperty(this, "id", { value: Rt++ }), this.uuid = it(), this.data = e, this.dataReady = !0, this.version = 0;
	}
	getSize(e) {
		let t = this.data;
		return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayWidth, t.displayHeight, 0) : t === null ? e.set(0, 0, 0) : e.set(t.width || 0, t.height || 0, t.depth || 0), e;
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid];
		let n = {
			uuid: this.uuid,
			url: ""
		}, r = this.data;
		if (r !== null) {
			let e;
			if (Array.isArray(r)) {
				e = [];
				for (let t = 0, n = r.length; t < n; t++) r[t].isDataTexture ? e.push(Bt(r[t].image)) : e.push(Bt(r[t]));
			} else e = Bt(r);
			n.url = e;
		}
		return t || (e.images[this.uuid] = n), n;
	}
};
function Bt(e) {
	return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? Lt.getDataURL(e) : e.data ? {
		data: Array.from(e.data),
		width: e.width,
		height: e.height,
		type: e.data.constructor.name
	} : (H("Texture: Unable to serialize Texture."), {});
}
var Vt = 0, Ht = /*@__PURE__*/ new K(), Ut = class e extends $e {
	constructor(t = e.DEFAULT_IMAGE, n = e.DEFAULT_MAPPING, i = r, a = r, o = c, s = u, l = E, f = d, p = e.DEFAULT_ANISOTROPY, m = "") {
		super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Vt++ }), this.uuid = it(), this.name = "", this.source = new zt(t), this.mipmaps = [], this.mapping = n, this.channel = 0, this.wrapS = i, this.wrapT = a, this.magFilter = o, this.minFilter = s, this.anisotropy = p, this.format = l, this.internalFormat = null, this.type = f, this.offset = new G(0, 0), this.repeat = new G(1, 1), this.center = new G(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new q(), this.generateMipmaps = !0, this.mipmapsAutoUpdate = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = m, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(t && t.depth && t.depth > 1), this.pmremVersion = 0, this.isPMREMTexture = !1, this.normalized = !1;
	}
	get width() {
		return this.source.getSize(Ht).x;
	}
	get height() {
		return this.source.getSize(Ht).y;
	}
	get depth() {
		return this.source.getSize(Ht).z;
	}
	get image() {
		return this.source.data;
	}
	set image(e) {
		this.source.data = e;
	}
	updateMatrix() {
		this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.normalized = e.normalized, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.mipmapsAutoUpdate = e.mipmapsAutoUpdate, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isPMREMTexture = e.isPMREMTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
	}
	setValues(e) {
		for (let t in e) {
			let n = e[t];
			if (n === void 0) {
				H(`Texture.setValues(): parameter '${t}' has value of undefined.`);
				continue;
			}
			let r = this[t];
			r === void 0 ? H(`Texture.setValues(): property '${t}' does not exist.`) : r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[t] = n;
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid];
		let n = {
			metadata: {
				version: 4.7,
				type: "Texture",
				generator: "Texture.toJSON"
			},
			uuid: this.uuid,
			name: this.name,
			image: this.source.toJSON(e).uuid,
			mapping: this.mapping,
			channel: this.channel,
			repeat: [this.repeat.x, this.repeat.y],
			offset: [this.offset.x, this.offset.y],
			center: [this.center.x, this.center.y],
			rotation: this.rotation,
			wrap: [this.wrapS, this.wrapT],
			format: this.format,
			internalFormat: this.internalFormat,
			type: this.type,
			normalized: this.normalized,
			colorSpace: this.colorSpace,
			minFilter: this.minFilter,
			magFilter: this.magFilter,
			anisotropy: this.anisotropy,
			flipY: this.flipY,
			generateMipmaps: this.generateMipmaps,
			mipmapsAutoUpdate: this.mipmapsAutoUpdate,
			premultiplyAlpha: this.premultiplyAlpha,
			unpackAlignment: this.unpackAlignment
		};
		return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	transformUv(e) {
		if (this.mapping !== 300) return e;
		if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) {
			case n:
				e.x -= Math.floor(e.x);
				break;
			case r:
				e.x = e.x < 0 ? 0 : 1;
				break;
			case i: Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x -= Math.floor(e.x);
		}
		if (e.y < 0 || e.y > 1) switch (this.wrapT) {
			case n:
				e.y -= Math.floor(e.y);
				break;
			case r:
				e.y = e.y < 0 ? 0 : 1;
				break;
			case i: Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y -= Math.floor(e.y);
		}
		return this.flipY && (e.y = 1 - e.y), e;
	}
	set needsUpdate(e) {
		e === !0 && (this.version++, this.source.needsUpdate = !0);
	}
	set needsPMREMUpdate(e) {
		e === !0 && this.pmremVersion++;
	}
};
Ut.DEFAULT_IMAGE = null, Ut.DEFAULT_MAPPING = 300, Ut.DEFAULT_ANISOTROPY = 1;
var Wt = class {
	static {
		this.prototype.isVector4 = !0;
	}
	constructor(e = 0, t = 0, n = 0, r = 1) {
		this.x = e, this.y = t, this.z = n, this.w = r;
	}
	get width() {
		return this.z;
	}
	set width(e) {
		this.z = e;
	}
	get height() {
		return this.w;
	}
	set height(e) {
		this.w = e;
	}
	set(e, t, n, r) {
		return this.x = e, this.y = t, this.z = n, this.w = r, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this.z = e, this.w = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setZ(e) {
		return this.z = e, this;
	}
	setW(e) {
		return this.w = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			case 2:
				this.z = t;
				break;
			case 3:
				this.w = t;
				break;
			default: throw Error("THREE.Vector4: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw Error("THREE.Vector4: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z, this.w);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w === void 0 ? 1 : e.w, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this.z += e, this.w += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
	}
	applyMatrix4(e) {
		let t = this.x, n = this.y, r = this.z, i = this.w, a = e.elements;
		return this.x = a[0] * t + a[4] * n + a[8] * r + a[12] * i, this.y = a[1] * t + a[5] * n + a[9] * r + a[13] * i, this.z = a[2] * t + a[6] * n + a[10] * r + a[14] * i, this.w = a[3] * t + a[7] * n + a[11] * r + a[15] * i, this;
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	setAxisAngleFromQuaternion(e) {
		this.w = 2 * Math.acos(e.w);
		let t = Math.sqrt(1 - e.w * e.w);
		return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
	}
	setAxisAngleFromRotationMatrix(e) {
		let t, n, r, i, a = .01, o = .1, s = e.elements, c = s[0], l = s[4], u = s[8], d = s[1], f = s[5], p = s[9], m = s[2], h = s[6], g = s[10];
		if (Math.abs(l - d) < a && Math.abs(u - m) < a && Math.abs(p - h) < a) {
			if (Math.abs(l + d) < o && Math.abs(u + m) < o && Math.abs(p + h) < o && Math.abs(c + f + g - 3) < o) return this.set(1, 0, 0, 0), this;
			t = Math.PI;
			let e = (c + 1) / 2, s = (f + 1) / 2, _ = (g + 1) / 2, v = (l + d) / 4, y = (u + m) / 4, b = (p + h) / 4;
			return e > s && e > _ ? e < a ? (n = 0, r = .707106781, i = .707106781) : (n = Math.sqrt(e), r = v / n, i = y / n) : s > _ ? s < a ? (n = .707106781, r = 0, i = .707106781) : (r = Math.sqrt(s), n = v / r, i = b / r) : _ < a ? (n = .707106781, r = .707106781, i = 0) : (i = Math.sqrt(_), n = y / i, r = b / i), this.set(n, r, i, t), this;
		}
		let _ = Math.sqrt((h - p) * (h - p) + (u - m) * (u - m) + (d - l) * (d - l));
		return Math.abs(_) < .001 && (_ = 1), this.x = (h - p) / _, this.y = (u - m) / _, this.z = (d - l) / _, this.w = Math.acos((c + f + g - 1) / 2), this;
	}
	setFromMatrixPosition(e) {
		let t = e.elements;
		return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
	}
	clamp(e, t) {
		return this.x = W(this.x, e.x, t.x), this.y = W(this.y, e.y, t.y), this.z = W(this.z, e.z, t.z), this.w = W(this.w, e.w, t.w), this;
	}
	clampScalar(e, t) {
		return this.x = W(this.x, e, t), this.y = W(this.y, e, t), this.z = W(this.z, e, t), this.w = W(this.w, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(W(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y, yield this.z, yield this.w;
	}
}, Gt = class extends $e {
	constructor(e = 1, t = 1, n = {}) {
		super(), n = Object.assign({
			generateMipmaps: !1,
			internalFormat: null,
			minFilter: c,
			depthBuffer: !0,
			stencilBuffer: !1,
			resolveColorBuffer: !0,
			resolveDepthBuffer: !0,
			resolveStencilBuffer: !0,
			storeMultisampledColorBuffer: !0,
			storeMultisampledDepthBuffer: !0,
			storeMultisampledStencilBuffer: !0,
			depthTexture: null,
			samples: 0,
			count: 1,
			depth: 1,
			multiview: !1,
			useArrayDepthTexture: !1
		}, n), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = n.depth, this.scissor = new Wt(0, 0, e, t), this.scissorTest = !1, this.viewport = new Wt(0, 0, e, t), this.textures = [];
		let r = n.count;
		for (let i = 0; i < r; i++) this.textures[i] = new Ut({
			width: e,
			height: t,
			depth: n.depth
		}), this.textures[i].isRenderTargetTexture = !0, this.textures[i].renderTarget = this;
		this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveColorBuffer = n.resolveColorBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.storeMultisampledColorBuffer = n.storeMultisampledColorBuffer, this.storeMultisampledDepthBuffer = n.storeMultisampledDepthBuffer, this.storeMultisampledStencilBuffer = n.storeMultisampledStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview, this.useArrayDepthTexture = n.useArrayDepthTexture;
	}
	_setTextureOptions(e = {}) {
		let t = {
			minFilter: c,
			generateMipmaps: !1,
			flipY: !1,
			internalFormat: null
		};
		e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.mipmapsAutoUpdate !== void 0 && (t.mipmapsAutoUpdate = e.mipmapsAutoUpdate), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
		for (let e = 0; e < this.textures.length; e++) this.textures[e].setValues(t);
	}
	get texture() {
		return this.textures[0];
	}
	set texture(e) {
		this.textures[0] = e;
	}
	set depthTexture(e) {
		this._depthTexture !== null && this._depthTexture.renderTarget === this && (this._depthTexture.renderTarget = null), e !== null && e.renderTarget === null && (e.renderTarget = this), this._depthTexture = e;
	}
	get depthTexture() {
		return this._depthTexture;
	}
	setSize(e, t, n = 1) {
		if (this.width !== e || this.height !== t || this.depth !== n) {
			this.width = e, this.height = t, this.depth = n;
			for (let r = 0, i = this.textures.length; r < i; r++) this.textures[r].image.width = e, this.textures[r].image.height = t, this.textures[r].image.depth = n, this.textures[r].isData3DTexture !== !0 && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1);
			this.dispose();
		}
		this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
		for (let t = 0, n = e.textures.length; t < n; t++) {
			this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
			let n = Object.assign({}, e.textures[t].image);
			this.textures[t].source = new zt(n);
		}
		if (this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveColorBuffer = e.resolveColorBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, this.storeMultisampledColorBuffer = e.storeMultisampledColorBuffer, this.storeMultisampledDepthBuffer = e.storeMultisampledDepthBuffer, this.storeMultisampledStencilBuffer = e.storeMultisampledStencilBuffer, e.depthTexture !== null) {
			if (e.depthTexture.renderTarget === e) {
				let t = e.depthTexture.clone();
				t.renderTarget = null, this.depthTexture = t;
			} else this.depthTexture = e.depthTexture;
		} else this.depthTexture = null;
		return this.samples = e.samples, this.multiview = e.multiview, this.useArrayDepthTexture = e.useArrayDepthTexture, this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, Kt = class extends Gt {
	constructor(e = 1, t = 1, n = {}) {
		super(e, t, n), this.isWebGLRenderTarget = !0;
	}
}, qt = class extends Ut {
	constructor(e = null, t = 1, n = 1, i = 1) {
		super(null), this.isDataArrayTexture = !0, this.image = {
			data: e,
			width: t,
			height: n,
			depth: i
		}, this.magFilter = a, this.minFilter = a, this.wrapR = r, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
	}
	copy(e) {
		return super.copy(e), this.wrapR = e.wrapR, this;
	}
	addLayerUpdate(e) {
		this.layerUpdates.add(e);
	}
	clearLayerUpdates() {
		this.layerUpdates.clear();
	}
}, Jt = class extends Ut {
	constructor(e = null, t = 1, n = 1, i = 1) {
		super(null), this.isData3DTexture = !0, this.image = {
			data: e,
			width: t,
			height: n,
			depth: i
		}, this.magFilter = a, this.minFilter = a, this.wrapR = r, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
	}
	copy(e) {
		return super.copy(e), this.wrapR = e.wrapR, this;
	}
}, Yt = class e {
	static {
		this.prototype.isMatrix4 = !0;
	}
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		this.elements = [
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h);
	}
	set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		let g = this.elements;
		return g[0] = e, g[4] = t, g[8] = n, g[12] = r, g[1] = i, g[5] = a, g[9] = o, g[13] = s, g[2] = c, g[6] = l, g[10] = u, g[14] = d, g[3] = f, g[7] = p, g[11] = m, g[15] = h, this;
	}
	identity() {
		return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	clone() {
		return new e().fromArray(this.elements);
	}
	copy(e) {
		let t = this.elements, n = e.elements;
		return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
	}
	copyPosition(e) {
		let t = this.elements, n = e.elements;
		return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
	}
	setFromMatrix3(e) {
		let t = e.elements;
		return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this;
	}
	extractBasis(e, t, n) {
		return this.determinantAffine() === 0 ? (e.set(1, 0, 0), t.set(0, 1, 0), n.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this);
	}
	makeBasis(e, t, n) {
		return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1), this;
	}
	extractRotation(e) {
		if (e.determinantAffine() === 0) return this.identity();
		let t = this.elements, n = e.elements, r = 1 / Xt.setFromMatrixColumn(e, 0).length(), i = 1 / Xt.setFromMatrixColumn(e, 1).length(), a = 1 / Xt.setFromMatrixColumn(e, 2).length();
		return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * i, t[5] = n[5] * i, t[6] = n[6] * i, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
	}
	makeRotationFromEuler(e) {
		let t = this.elements, n = e.x, r = e.y, i = e.z, a = Math.cos(n), o = Math.sin(n), s = Math.cos(r), c = Math.sin(r), l = Math.cos(i), u = Math.sin(i);
		if (e.order === "XYZ") {
			let e = a * l, n = a * u, r = o * l, i = o * u;
			t[0] = s * l, t[4] = -s * u, t[8] = c, t[1] = n + r * c, t[5] = e - i * c, t[9] = -o * s, t[2] = i - e * c, t[6] = r + n * c, t[10] = a * s;
		} else if (e.order === "YXZ") {
			let e = s * l, n = s * u, r = c * l, i = c * u;
			t[0] = e + i * o, t[4] = r * o - n, t[8] = a * c, t[1] = a * u, t[5] = a * l, t[9] = -o, t[2] = n * o - r, t[6] = i + e * o, t[10] = a * s;
		} else if (e.order === "ZXY") {
			let e = s * l, n = s * u, r = c * l, i = c * u;
			t[0] = e - i * o, t[4] = -a * u, t[8] = r + n * o, t[1] = n + r * o, t[5] = a * l, t[9] = i - e * o, t[2] = -a * c, t[6] = o, t[10] = a * s;
		} else if (e.order === "ZYX") {
			let e = a * l, n = a * u, r = o * l, i = o * u;
			t[0] = s * l, t[4] = r * c - n, t[8] = e * c + i, t[1] = s * u, t[5] = i * c + e, t[9] = n * c - r, t[2] = -c, t[6] = o * s, t[10] = a * s;
		} else if (e.order === "YZX") {
			let e = a * s, n = a * c, r = o * s, i = o * c;
			t[0] = s * l, t[4] = i - e * u, t[8] = r * u + n, t[1] = u, t[5] = a * l, t[9] = -o * l, t[2] = -c * l, t[6] = n * u + r, t[10] = e - i * u;
		} else if (e.order === "XZY") {
			let e = a * s, n = a * c, r = o * s, i = o * c;
			t[0] = s * l, t[4] = -u, t[8] = c * l, t[1] = e * u + i, t[5] = a * l, t[9] = n * u - r, t[2] = r * u - n, t[6] = o * l, t[10] = i * u + e;
		}
		return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
	}
	makeRotationFromQuaternion(e) {
		return this.compose(Qt, e, $t);
	}
	lookAt(e, t, n) {
		let r = this.elements;
		return nn.subVectors(e, t), nn.lengthSq() === 0 && (nn.z = 1), nn.normalize(), en.crossVectors(n, nn), en.lengthSq() === 0 && (Math.abs(n.z) === 1 ? nn.x += 1e-4 : nn.z += 1e-4, nn.normalize(), en.crossVectors(n, nn)), en.normalize(), tn.crossVectors(nn, en), r[0] = en.x, r[4] = tn.x, r[8] = nn.x, r[1] = en.y, r[5] = tn.y, r[9] = nn.y, r[2] = en.z, r[6] = tn.z, r[10] = nn.z, this;
	}
	multiply(e) {
		return this.multiplyMatrices(this, e);
	}
	premultiply(e) {
		return this.multiplyMatrices(e, this);
	}
	multiplyMatrices(e, t) {
		let n = e.elements, r = t.elements, i = this.elements, a = n[0], o = n[4], s = n[8], c = n[12], l = n[1], u = n[5], d = n[9], f = n[13], p = n[2], m = n[6], h = n[10], g = n[14], _ = n[3], v = n[7], y = n[11], b = n[15], x = r[0], S = r[4], C = r[8], w = r[12], T = r[1], E = r[5], D = r[9], O = r[13], k = r[2], A = r[6], j = r[10], ee = r[14], te = r[3], M = r[7], N = r[11], P = r[15];
		return i[0] = a * x + o * T + s * k + c * te, i[4] = a * S + o * E + s * A + c * M, i[8] = a * C + o * D + s * j + c * N, i[12] = a * w + o * O + s * ee + c * P, i[1] = l * x + u * T + d * k + f * te, i[5] = l * S + u * E + d * A + f * M, i[9] = l * C + u * D + d * j + f * N, i[13] = l * w + u * O + d * ee + f * P, i[2] = p * x + m * T + h * k + g * te, i[6] = p * S + m * E + h * A + g * M, i[10] = p * C + m * D + h * j + g * N, i[14] = p * w + m * O + h * ee + g * P, i[3] = _ * x + v * T + y * k + b * te, i[7] = _ * S + v * E + y * A + b * M, i[11] = _ * C + v * D + y * j + b * N, i[15] = _ * w + v * O + y * ee + b * P, this;
	}
	multiplyScalar(e) {
		let t = this.elements;
		return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
	}
	determinant() {
		let e = this.elements, t = e[0], n = e[4], r = e[8], i = e[12], a = e[1], o = e[5], s = e[9], c = e[13], l = e[2], u = e[6], d = e[10], f = e[14], p = e[3], m = e[7], h = e[11], g = e[15], _ = s * f - c * d, v = o * f - c * u, y = o * d - s * u, b = a * f - c * l, x = a * d - s * l, S = a * u - o * l;
		return t * (m * _ - h * v + g * y) - n * (p * _ - h * b + g * x) + r * (p * v - m * b + g * S) - i * (p * y - m * x + h * S);
	}
	determinantAffine() {
		let e = this.elements, t = e[0], n = e[4], r = e[8], i = e[1], a = e[5], o = e[9], s = e[2], c = e[6], l = e[10];
		return t * (a * l - o * c) - n * (i * l - o * s) + r * (i * c - a * s);
	}
	transpose() {
		let e = this.elements, t;
		return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
	}
	setPosition(e, t, n) {
		let r = this.elements;
		return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this;
	}
	invert() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = e[9], d = e[10], f = e[11], p = e[12], m = e[13], h = e[14], g = e[15], _ = t * o - n * a, v = t * s - r * a, y = t * c - i * a, b = n * s - r * o, x = n * c - i * o, S = r * c - i * s, C = l * m - u * p, w = l * h - d * p, T = l * g - f * p, E = u * h - d * m, D = u * g - f * m, O = d * g - f * h, k = _ * O - v * D + y * E + b * T - x * w + S * C;
		if (k === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		let A = 1 / k;
		return e[0] = (o * O - s * D + c * E) * A, e[1] = (r * D - n * O - i * E) * A, e[2] = (m * S - h * x + g * b) * A, e[3] = (d * x - u * S - f * b) * A, e[4] = (s * T - a * O - c * w) * A, e[5] = (t * O - r * T + i * w) * A, e[6] = (h * y - p * S - g * v) * A, e[7] = (l * S - d * y + f * v) * A, e[8] = (a * D - o * T + c * C) * A, e[9] = (n * T - t * D - i * C) * A, e[10] = (p * x - m * y + g * _) * A, e[11] = (u * y - l * x - f * _) * A, e[12] = (o * w - a * E - s * C) * A, e[13] = (t * E - n * w + r * C) * A, e[14] = (m * v - p * b - h * _) * A, e[15] = (l * b - u * v + d * _) * A, this;
	}
	scale(e) {
		let t = this.elements, n = e.x, r = e.y, i = e.z;
		return t[0] *= n, t[4] *= r, t[8] *= i, t[1] *= n, t[5] *= r, t[9] *= i, t[2] *= n, t[6] *= r, t[10] *= i, t[3] *= n, t[7] *= r, t[11] *= i, this;
	}
	getMaxScaleOnAxis() {
		let e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
		return Math.sqrt(Math.max(t, n, r));
	}
	makeTranslation(e, t, n) {
		return e.isVector3 ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1) : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this;
	}
	makeRotationX(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this;
	}
	makeRotationY(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this;
	}
	makeRotationZ(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	makeRotationAxis(e, t) {
		let n = Math.cos(t), r = Math.sin(t), i = 1 - n, a = e.x, o = e.y, s = e.z, c = i * a, l = i * o;
		return this.set(c * a + n, c * o - r * s, c * s + r * o, 0, c * o + r * s, l * o + n, l * s - r * a, 0, c * s - r * o, l * s + r * a, i * s * s + n, 0, 0, 0, 0, 1), this;
	}
	makeScale(e, t, n) {
		return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
	}
	makeShear(e, t, n, r, i, a) {
		return this.set(1, n, i, 0, e, 1, a, 0, t, r, 1, 0, 0, 0, 0, 1), this;
	}
	compose(e, t, n) {
		let r = this.elements, i = t._x, a = t._y, o = t._z, s = t._w, c = i + i, l = a + a, u = o + o, d = i * c, f = i * l, p = i * u, m = a * l, h = a * u, g = o * u, _ = s * c, v = s * l, y = s * u, b = n.x, x = n.y, S = n.z;
		return r[0] = (1 - (m + g)) * b, r[1] = (f + y) * b, r[2] = (p - v) * b, r[3] = 0, r[4] = (f - y) * x, r[5] = (1 - (d + g)) * x, r[6] = (h + _) * x, r[7] = 0, r[8] = (p + v) * S, r[9] = (h - _) * S, r[10] = (1 - (d + m)) * S, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
	}
	decompose(e, t, n) {
		let r = this.elements;
		e.x = r[12], e.y = r[13], e.z = r[14];
		let i = this.determinantAffine();
		if (i === 0) return n.set(1, 1, 1), t.identity(), this;
		let a = Xt.set(r[0], r[1], r[2]).length(), o = Xt.set(r[4], r[5], r[6]).length(), s = Xt.set(r[8], r[9], r[10]).length();
		i < 0 && (a = -a), Zt.copy(this);
		let c = 1 / a, l = 1 / o, u = 1 / s;
		return Zt.elements[0] *= c, Zt.elements[1] *= c, Zt.elements[2] *= c, Zt.elements[4] *= l, Zt.elements[5] *= l, Zt.elements[6] *= l, Zt.elements[8] *= u, Zt.elements[9] *= u, Zt.elements[10] *= u, t.setFromRotationMatrix(Zt), n.x = a, n.y = o, n.z = s, this;
	}
	makePerspective(e, t, n, r, i, a, o = He, s = !1) {
		let c = this.elements, l = 2 * i / (t - e), u = 2 * i / (n - r), d = (t + e) / (t - e), f = (n + r) / (n - r), p, m;
		if (s) p = i / (a - i), m = a * i / (a - i);
		else if (o === 2e3) p = -(a + i) / (a - i), m = -2 * a * i / (a - i);
		else if (o === 2001) p = -a / (a - i), m = -a * i / (a - i);
		else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
		return c[0] = l, c[4] = 0, c[8] = d, c[12] = 0, c[1] = 0, c[5] = u, c[9] = f, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = p, c[14] = m, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
	}
	makeOrthographic(e, t, n, r, i, a, o = He, s = !1) {
		let c = this.elements, l = 2 / (t - e), u = 2 / (n - r), d = -(t + e) / (t - e), f = -(n + r) / (n - r), p, m;
		if (s) p = 1 / (a - i), m = a / (a - i);
		else if (o === 2e3) p = -2 / (a - i), m = -(a + i) / (a - i);
		else if (o === 2001) p = -1 / (a - i), m = -i / (a - i);
		else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
		return c[0] = l, c[4] = 0, c[8] = 0, c[12] = d, c[1] = 0, c[5] = u, c[9] = 0, c[13] = f, c[2] = 0, c[6] = 0, c[10] = p, c[14] = m, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
	}
	equals(e) {
		let t = this.elements, n = e.elements;
		for (let e = 0; e < 16; e++) if (t[e] !== n[e]) return !1;
		return !0;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 16; n++) this.elements[n] = e[n + t];
		return this;
	}
	toArray(e = [], t = 0) {
		let n = this.elements;
		return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
	}
}, Xt = /*@__PURE__*/ new K(), Zt = /*@__PURE__*/ new Yt(), Qt = /*@__PURE__*/ new K(0, 0, 0), $t = /*@__PURE__*/ new K(1, 1, 1), en = /*@__PURE__*/ new K(), tn = /*@__PURE__*/ new K(), nn = /*@__PURE__*/ new K(), rn = /*@__PURE__*/ new Yt(), an = /*@__PURE__*/ new Dt(), on = class e {
	constructor(t = 0, n = 0, r = 0, i = e.DEFAULT_ORDER) {
		this.isEuler = !0, this._x = t, this._y = n, this._z = r, this._order = i;
	}
	get x() {
		return this._x;
	}
	set x(e) {
		this._x = e, this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(e) {
		this._y = e, this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(e) {
		this._z = e, this._onChangeCallback();
	}
	get order() {
		return this._order;
	}
	set order(e) {
		this._order = e, this._onChangeCallback();
	}
	set(e, t, n, r = this._order) {
		return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this;
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._order);
	}
	copy(e) {
		return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
	}
	setFromRotationMatrix(e, t = this._order, n = !0) {
		let r = e.elements, i = r[0], a = r[4], o = r[8], s = r[1], c = r[5], l = r[9], u = r[2], d = r[6], f = r[10];
		switch (t) {
			case "XYZ":
				this._y = Math.asin(W(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-l, f), this._z = Math.atan2(-a, i)) : (this._x = Math.atan2(d, c), this._z = 0);
				break;
			case "YXZ":
				this._x = Math.asin(-W(l, -1, 1)), Math.abs(l) < .9999999 ? (this._y = Math.atan2(o, f), this._z = Math.atan2(s, c)) : (this._y = Math.atan2(-u, i), this._z = 0);
				break;
			case "ZXY":
				this._x = Math.asin(W(d, -1, 1)), Math.abs(d) < .9999999 ? (this._y = Math.atan2(-u, f), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(s, i));
				break;
			case "ZYX":
				this._y = Math.asin(-W(u, -1, 1)), Math.abs(u) < .9999999 ? (this._x = Math.atan2(d, f), this._z = Math.atan2(s, i)) : (this._x = 0, this._z = Math.atan2(-a, c));
				break;
			case "YZX":
				this._z = Math.asin(W(s, -1, 1)), Math.abs(s) < .9999999 ? (this._x = Math.atan2(-l, c), this._y = Math.atan2(-u, i)) : (this._x = 0, this._y = Math.atan2(o, f));
				break;
			case "XZY":
				this._z = Math.asin(-W(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, i)) : (this._x = Math.atan2(-l, f), this._y = 0);
				break;
			default: H("Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
		}
		return this._order = t, n === !0 && this._onChangeCallback(), this;
	}
	setFromQuaternion(e, t, n) {
		return rn.makeRotationFromQuaternion(e), this.setFromRotationMatrix(rn, t, n);
	}
	setFromVector3(e, t = this._order) {
		return this.set(e.x, e.y, e.z, t);
	}
	reorder(e) {
		return an.setFromEuler(this), this.setFromQuaternion(an, e);
	}
	equals(e) {
		return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
	}
	fromArray(e) {
		return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
	}
	_onChange(e) {
		return this._onChangeCallback = e, this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x, yield this._y, yield this._z, yield this._order;
	}
};
on.DEFAULT_ORDER = "XYZ";
var sn = class {
	constructor() {
		this.mask = 1;
	}
	set(e) {
		this.mask = 1 << e >>> 0;
	}
	enable(e) {
		this.mask |= 1 << e;
	}
	enableAll() {
		this.mask = -1;
	}
	toggle(e) {
		this.mask ^= 1 << e;
	}
	disable(e) {
		this.mask &= ~(1 << e);
	}
	disableAll() {
		this.mask = 0;
	}
	test(e) {
		return (this.mask & e.mask) !== 0;
	}
	isEnabled(e) {
		return !!(this.mask & 1 << e);
	}
}, cn = 0, ln = /*@__PURE__*/ new K(), un = /*@__PURE__*/ new Dt(), dn = /*@__PURE__*/ new Yt(), fn = /*@__PURE__*/ new K(), pn = /*@__PURE__*/ new K(), mn = /*@__PURE__*/ new K(), hn = /*@__PURE__*/ new Dt(), gn = /*@__PURE__*/ new K(1, 0, 0), _n = /*@__PURE__*/ new K(0, 1, 0), vn = /*@__PURE__*/ new K(0, 0, 1), yn = { type: "added" }, bn = { type: "removed" }, xn = {
	type: "childadded",
	child: null
}, Sn = {
	type: "childremoved",
	child: null
}, Cn = class e extends $e {
	constructor() {
		super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: cn++ }), this.uuid = it(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = e.DEFAULT_UP.clone();
		let t = new K(), n = new on(), r = new Dt(), i = new K(1, 1, 1);
		function a() {
			r.setFromEuler(n, !1);
		}
		function o() {
			n.setFromQuaternion(r, void 0, !1);
		}
		n._onChange(a), r._onChange(o), Object.defineProperties(this, {
			position: {
				configurable: !0,
				enumerable: !0,
				value: t
			},
			rotation: {
				configurable: !0,
				enumerable: !0,
				value: n
			},
			quaternion: {
				configurable: !0,
				enumerable: !0,
				value: r
			},
			scale: {
				configurable: !0,
				enumerable: !0,
				value: i
			},
			modelViewMatrix: { value: new Yt() },
			normalMatrix: { value: new q() }
		}), this.matrix = new Yt(), this.matrixWorld = new Yt(), this.matrixAutoUpdate = e.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new sn(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
	}
	onBeforeShadow() {}
	onAfterShadow() {}
	onBeforeRender() {}
	onAfterRender() {}
	applyMatrix4(e) {
		this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale), this.pivot !== null && this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot);
	}
	applyQuaternion(e) {
		return this.quaternion.premultiply(e), this;
	}
	setRotationFromAxisAngle(e, t) {
		this.quaternion.setFromAxisAngle(e, t);
	}
	setRotationFromEuler(e) {
		this.quaternion.setFromEuler(e, !0);
	}
	setRotationFromMatrix(e) {
		this.quaternion.setFromRotationMatrix(e);
	}
	setRotationFromQuaternion(e) {
		this.quaternion.copy(e);
	}
	rotateOnAxis(e, t) {
		return un.setFromAxisAngle(e, t), this.quaternion.multiply(un), this;
	}
	rotateOnWorldAxis(e, t) {
		return un.setFromAxisAngle(e, t), this.quaternion.premultiply(un), this;
	}
	rotateX(e) {
		return this.rotateOnAxis(gn, e);
	}
	rotateY(e) {
		return this.rotateOnAxis(_n, e);
	}
	rotateZ(e) {
		return this.rotateOnAxis(vn, e);
	}
	translateOnAxis(e, t) {
		return ln.copy(e).applyQuaternion(this.quaternion), this.position.add(ln.multiplyScalar(t)), this;
	}
	translateX(e) {
		return this.translateOnAxis(gn, e);
	}
	translateY(e) {
		return this.translateOnAxis(_n, e);
	}
	translateZ(e) {
		return this.translateOnAxis(vn, e);
	}
	localToWorld(e) {
		return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
	}
	worldToLocal(e) {
		return this.updateWorldMatrix(!0, !1), e.applyMatrix4(dn.copy(this.matrixWorld).invert());
	}
	lookAt(e, t, n) {
		e.isVector3 ? fn.copy(e) : fn.set(e, t, n);
		let r = this.parent;
		this.updateWorldMatrix(!0, !1), pn.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? dn.lookAt(pn, fn, this.up) : dn.lookAt(fn, pn, this.up), this.quaternion.setFromRotationMatrix(dn), r && (dn.extractRotation(r.matrixWorld), un.setFromRotationMatrix(dn), this.quaternion.premultiply(un.invert()));
	}
	add(e) {
		if (arguments.length > 1) {
			for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
			return this;
		}
		return e === this ? (U("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(yn), xn.child = e, this.dispatchEvent(xn), xn.child = null) : U("Object3D.add: object not an instance of THREE.Object3D.", e), this);
	}
	remove(e) {
		if (arguments.length > 1) {
			for (let e = 0; e < arguments.length; e++) this.remove(arguments[e]);
			return this;
		}
		let t = this.children.indexOf(e);
		return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(bn), Sn.child = e, this.dispatchEvent(Sn), Sn.child = null), this;
	}
	removeFromParent() {
		let e = this.parent;
		return e !== null && e.remove(this), this;
	}
	clear() {
		return this.remove(...this.children);
	}
	attach(e) {
		return this.updateWorldMatrix(!0, !1), dn.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), dn.multiply(e.parent.matrixWorld)), e.applyMatrix4(dn), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(yn), xn.child = e, this.dispatchEvent(xn), xn.child = null, this;
	}
	getObjectById(e) {
		return this.getObjectByProperty("id", e);
	}
	getObjectByName(e) {
		return this.getObjectByProperty("name", e);
	}
	getObjectByProperty(e, t) {
		if (this[e] === t) return this;
		for (let n = 0, r = this.children.length; n < r; n++) {
			let r = this.children[n].getObjectByProperty(e, t);
			if (r !== void 0) return r;
		}
	}
	getObjectsByProperty(e, t, n = []) {
		this[e] === t && n.push(this);
		let r = this.children;
		for (let i = 0, a = r.length; i < a; i++) r[i].getObjectsByProperty(e, t, n);
		return n;
	}
	getWorldPosition(e) {
		return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
	}
	getWorldQuaternion(e) {
		return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(pn, e, mn), e;
	}
	getWorldScale(e) {
		return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(pn, hn, e), e;
	}
	getWorldDirection(e) {
		this.updateWorldMatrix(!0, !1);
		let t = this.matrixWorld.elements;
		return e.set(t[8], t[9], t[10]).normalize();
	}
	raycast() {}
	intersectsFrustum() {
		return !0;
	}
	traverse(e) {
		e(this);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].traverse(e);
	}
	traverseVisible(e) {
		if (this.visible === !1) return;
		e(this);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].traverseVisible(e);
	}
	traverseAncestors(e) {
		let t = this.parent;
		t !== null && (e(t), t.traverseAncestors(e));
	}
	updateMatrix() {
		this.matrix.compose(this.position, this.quaternion, this.scale);
		let e = this.pivot;
		if (e !== null) {
			let t = e.x, n = e.y, r = e.z, i = this.matrix.elements;
			i[12] += t - i[0] * t - i[4] * n - i[8] * r, i[13] += n - i[1] * t - i[5] * n - i[9] * r, i[14] += r - i[2] * t - i[6] * n - i[10] * r;
		}
		this.matrixWorldNeedsUpdate = !0;
	}
	updateMatrixWorld(e) {
		this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].updateMatrixWorld(e);
	}
	updateWorldMatrix(e, t, n = !1) {
		let r = this.parent;
		if (e === !0 && r !== null && r.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, n = !0), t === !0) {
			let e = this.children;
			for (let t = 0, r = e.length; t < r; t++) e[t].updateWorldMatrix(!1, !0, n);
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string", n = {};
		t && (e = {
			geometries: {},
			materials: {},
			textures: {},
			images: {},
			shapes: {},
			skeletons: {},
			animations: {},
			nodes: {}
		}, n.metadata = {
			version: 4.7,
			type: "Object",
			generator: "Object3D.toJSON"
		});
		let r = {};
		r.uuid = this.uuid, r.type = this.type, r.name = this.name, r.castShadow = this.castShadow, r.receiveShadow = this.receiveShadow, r.visible = this.visible, r.frustumCulled = this.frustumCulled, r.renderOrder = this.renderOrder, r.static = this.static, r.matrixAutoUpdate = this.matrixAutoUpdate, Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.morphTargetDictionary !== void 0 && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((e) => ({
			...e,
			boundingBox: e.boundingBox ? e.boundingBox.toJSON() : void 0,
			boundingSphere: e.boundingSphere ? e.boundingSphere.toJSON() : void 0
		})), r.instanceInfo = this._instanceInfo.map((e) => ({ ...e })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(e), r.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
		function i(t, n) {
			return t[n.uuid] === void 0 && (t[n.uuid] = n.toJSON(e)), n.uuid;
		}
		if (this.isScene) this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
		else if (this.isMesh || this.isLine || this.isPoints) {
			r.geometry = i(e.geometries, this.geometry);
			let t = this.geometry.parameters;
			if (t !== void 0 && t.shapes !== void 0) {
				let n = t.shapes;
				if (Array.isArray(n)) for (let t = 0, r = n.length; t < r; t++) {
					let r = n[t];
					i(e.shapes, r);
				}
				else i(e.shapes, n);
			}
		}
		if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (i(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0) {
			if (Array.isArray(this.material)) {
				let t = [];
				for (let n = 0, r = this.material.length; n < r; n++) t.push(i(e.materials, this.material[n]));
				r.material = t;
			} else r.material = i(e.materials, this.material);
		}
		if (this.children.length > 0) {
			r.children = [];
			for (let t = 0; t < this.children.length; t++) r.children.push(this.children[t].toJSON(e).object);
		}
		if (this.animations.length > 0) {
			r.animations = [];
			for (let t = 0; t < this.animations.length; t++) {
				let n = this.animations[t];
				r.animations.push(i(e.animations, n));
			}
		}
		if (t) {
			let t = a(e.geometries), r = a(e.materials), i = a(e.textures), o = a(e.images), s = a(e.shapes), c = a(e.skeletons), l = a(e.animations), u = a(e.nodes);
			t.length > 0 && (n.geometries = t), r.length > 0 && (n.materials = r), i.length > 0 && (n.textures = i), o.length > 0 && (n.images = o), s.length > 0 && (n.shapes = s), c.length > 0 && (n.skeletons = c), l.length > 0 && (n.animations = l), u.length > 0 && (n.nodes = u);
		}
		return n.object = r, n;
		function a(e) {
			let t = [];
			for (let n in e) {
				let r = e[n];
				delete r.metadata, t.push(r);
			}
			return t;
		}
	}
	clone(e) {
		return new this.constructor().copy(this, e);
	}
	copy(e, t = !0) {
		if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.pivot = e.pivot === null ? null : e.pivot.clone(), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0) for (let t = 0; t < e.children.length; t++) {
			let n = e.children[t];
			this.add(n.clone());
		}
		return this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
};
Cn.DEFAULT_UP = /*@__PURE__*/ new K(0, 1, 0), Cn.DEFAULT_MATRIX_AUTO_UPDATE = !0, Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var wn = class extends Cn {
	constructor() {
		super(), this.isGroup = !0, this.type = "Group";
	}
}, Tn = { type: "move" }, En = class {
	constructor() {
		this._targetRay = null, this._grip = null, this._hand = null;
	}
	getHandSpace() {
		return this._hand === null && (this._hand = new wn(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
	}
	getTargetRaySpace() {
		return this._targetRay === null && (this._targetRay = new wn(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new K(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new K()), this._targetRay;
	}
	getGripSpace() {
		return this._grip === null && (this._grip = new wn(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new K(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new K(), this._grip.eventsEnabled = !1), this._grip;
	}
	dispatchEvent(e) {
		return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
	}
	connect(e) {
		if (e && e.hand) {
			let t = this._hand;
			if (t) for (let n of e.hand.values()) this._getHandJoint(t, n);
		}
		return this.dispatchEvent({
			type: "connected",
			data: e
		}), this;
	}
	disconnect(e) {
		return this.dispatchEvent({
			type: "disconnected",
			data: e
		}), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
	}
	update(e, t, n) {
		let r = null, i = null, a = null, o = this._targetRay, s = this._grip, c = this._hand;
		if (e && t.session.visibilityState !== "visible-blurred") {
			if (c && e.hand) {
				a = !0;
				for (let r of e.hand.values()) {
					let e = t.getJointPose(r, n), i = this._getHandJoint(c, r);
					e !== null && (i.matrix.fromArray(e.transform.matrix), i.matrix.decompose(i.position, i.quaternion, i.scale), i.matrixWorldNeedsUpdate = !0, i.jointRadius = e.radius), i.visible = e !== null;
				}
				let r = c.joints["index-finger-tip"], i = c.joints["thumb-tip"], o = r.position.distanceTo(i.position);
				c.inputState.pinching && o > .025 ? (c.inputState.pinching = !1, this.dispatchEvent({
					type: "pinchend",
					handedness: e.handedness,
					target: this
				})) : !c.inputState.pinching && o <= .015 && (c.inputState.pinching = !0, this.dispatchEvent({
					type: "pinchstart",
					handedness: e.handedness,
					target: this
				}));
			} else s !== null && e.gripSpace && (i = t.getPose(e.gripSpace, n), i !== null && (s.matrix.fromArray(i.transform.matrix), s.matrix.decompose(s.position, s.quaternion, s.scale), s.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (s.hasLinearVelocity = !0, s.linearVelocity.copy(i.linearVelocity)) : s.hasLinearVelocity = !1, i.angularVelocity ? (s.hasAngularVelocity = !0, s.angularVelocity.copy(i.angularVelocity)) : s.hasAngularVelocity = !1, s.eventsEnabled && s.dispatchEvent({
				type: "gripUpdated",
				data: e,
				target: this
			})));
			o !== null && (r = t.getPose(e.targetRaySpace, n), r === null && i !== null && (r = i), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.quaternion, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(Tn)));
		}
		return o !== null && (o.visible = r !== null), s !== null && (s.visible = i !== null), c !== null && (c.visible = a !== null), this;
	}
	_getHandJoint(e, t) {
		if (e.joints[t.jointName] === void 0) {
			let n = new wn();
			n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
		}
		return e.joints[t.jointName];
	}
}, Dn = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
}, On = {
	h: 0,
	s: 0,
	l: 0
}, kn = {
	h: 0,
	s: 0,
	l: 0
};
function An(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - n) : e;
}
var Y = class {
	constructor(e, t, n) {
		return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
	}
	set(e, t, n) {
		if (t === void 0 && n === void 0) {
			let t = e;
			t && t.isColor ? this.copy(t) : typeof t == "number" ? this.setHex(t) : typeof t == "string" && this.setStyle(t);
		} else this.setRGB(e, t, n);
		return this;
	}
	setScalar(e) {
		return this.r = e, this.g = e, this.b = e, this;
	}
	setHex(e, t = Ie) {
		return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, J.colorSpaceToWorking(this, t), this;
	}
	setRGB(e, t, n, r = J.workingColorSpace) {
		return this.r = e, this.g = t, this.b = n, J.colorSpaceToWorking(this, r), this;
	}
	setHSL(e, t, n, r = J.workingColorSpace) {
		if (e = at(e, 1), t = W(t, 0, 1), n = W(n, 0, 1), t === 0) this.r = this.g = this.b = n;
		else {
			let r = n <= .5 ? n * (1 + t) : n + t - n * t, i = 2 * n - r;
			this.r = An(i, r, e + 1 / 3), this.g = An(i, r, e), this.b = An(i, r, e - 1 / 3);
		}
		return J.colorSpaceToWorking(this, r), this;
	}
	setStyle(e, t = Ie) {
		function n(t) {
			t !== void 0 && parseFloat(t) < 1 && H("Color: Alpha component of " + e + " will be ignored.");
		}
		let r;
		if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
			let i, a = r[1], o = r[2];
			switch (a) {
				case "rgb":
				case "rgba":
					if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(255, parseInt(i[1], 10)) / 255, Math.min(255, parseInt(i[2], 10)) / 255, Math.min(255, parseInt(i[3], 10)) / 255, t);
					if (i = /^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(100, parseFloat(i[1])) / 100, Math.min(100, parseFloat(i[2])) / 100, Math.min(100, parseFloat(i[3])) / 100, t);
					break;
				case "hsl":
				case "hsla":
					if (i = /^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o)) return n(i[4]), this.setHSL(parseFloat(i[1]) / 360, parseFloat(i[2]) / 100, parseFloat(i[3]) / 100, t);
					break;
				default: H("Color: Unknown color model " + e);
			}
		} else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
			let n = r[1], i = n.length;
			if (i === 3) return this.setRGB(parseInt(n.charAt(0), 16) / 15, parseInt(n.charAt(1), 16) / 15, parseInt(n.charAt(2), 16) / 15, t);
			if (i === 6) return this.setHex(parseInt(n, 16), t);
			H("Color: Invalid hex color " + e);
		} else if (e && e.length > 0) return this.setColorName(e, t);
		return this;
	}
	setColorName(e, t = Ie) {
		let n = Dn[e.toLowerCase()];
		return n === void 0 ? H("Color: Unknown color " + e) : this.setHex(n, t), this;
	}
	clone() {
		return new this.constructor(this.r, this.g, this.b);
	}
	copy(e) {
		return this.r = e.r, this.g = e.g, this.b = e.b, this;
	}
	copySRGBToLinear(e) {
		return this.r = Pt(e.r), this.g = Pt(e.g), this.b = Pt(e.b), this;
	}
	copyLinearToSRGB(e) {
		return this.r = Ft(e.r), this.g = Ft(e.g), this.b = Ft(e.b), this;
	}
	convertSRGBToLinear() {
		return this.copySRGBToLinear(this), this;
	}
	convertLinearToSRGB() {
		return this.copyLinearToSRGB(this), this;
	}
	getHex(e = Ie) {
		return J.workingToColorSpace(jn.copy(this), e), Math.round(W(jn.r * 255, 0, 255)) * 65536 + Math.round(W(jn.g * 255, 0, 255)) * 256 + Math.round(W(jn.b * 255, 0, 255));
	}
	getHexString(e = Ie) {
		return ("000000" + this.getHex(e).toString(16)).slice(-6);
	}
	getHSL(e, t = J.workingColorSpace) {
		J.workingToColorSpace(jn.copy(this), t);
		let n = jn.r, r = jn.g, i = jn.b, a = Math.max(n, r, i), o = Math.min(n, r, i), s, c, l = (o + a) / 2;
		if (o === a) s = 0, c = 0;
		else {
			let e = a - o;
			switch (c = l <= .5 ? e / (a + o) : e / (2 - a - o), a) {
				case n:
					s = (r - i) / e + (r < i ? 6 : 0);
					break;
				case r:
					s = (i - n) / e + 2;
					break;
				case i: s = (n - r) / e + 4;
			}
			s /= 6;
		}
		return e.h = s, e.s = c, e.l = l, e;
	}
	getRGB(e, t = J.workingColorSpace) {
		return J.workingToColorSpace(jn.copy(this), t), e.r = jn.r, e.g = jn.g, e.b = jn.b, e;
	}
	getStyle(e = Ie) {
		J.workingToColorSpace(jn.copy(this), e);
		let t = jn.r, n = jn.g, r = jn.b;
		return e === "srgb" ? `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})` : `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`;
	}
	offsetHSL(e, t, n) {
		return this.getHSL(On), this.setHSL(On.h + e, On.s + t, On.l + n);
	}
	add(e) {
		return this.r += e.r, this.g += e.g, this.b += e.b, this;
	}
	addColors(e, t) {
		return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
	}
	addScalar(e) {
		return this.r += e, this.g += e, this.b += e, this;
	}
	sub(e) {
		return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
	}
	multiply(e) {
		return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
	}
	multiplyScalar(e) {
		return this.r *= e, this.g *= e, this.b *= e, this;
	}
	lerp(e, t) {
		return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
	}
	lerpColors(e, t, n) {
		return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
	}
	lerpHSL(e, t) {
		this.getHSL(On), e.getHSL(kn);
		let n = ct(On.h, kn.h, t), r = ct(On.s, kn.s, t), i = ct(On.l, kn.l, t);
		return this.setHSL(n, r, i), this;
	}
	setFromVector3(e) {
		return this.r = e.x, this.g = e.y, this.b = e.z, this;
	}
	applyMatrix3(e) {
		let t = this.r, n = this.g, r = this.b, i = e.elements;
		return this.r = i[0] * t + i[3] * n + i[6] * r, this.g = i[1] * t + i[4] * n + i[7] * r, this.b = i[2] * t + i[5] * n + i[8] * r, this;
	}
	equals(e) {
		return e.r === this.r && e.g === this.g && e.b === this.b;
	}
	fromArray(e, t = 0) {
		return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
	}
	fromBufferAttribute(e, t) {
		return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
	}
	toJSON() {
		return this.getHex();
	}
	*[Symbol.iterator]() {
		yield this.r, yield this.g, yield this.b;
	}
}, jn = /*@__PURE__*/ new Y();
Y.NAMES = Dn;
var Mn = class extends Cn {
	constructor() {
		super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new on(), this.environmentIntensity = 1, this.environmentRotation = new on(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	copy(e, t) {
		return super.copy(e, t), this.background = e.background === null ? null : e.background.clone(), this.environment = e.environment === null ? null : e.environment.clone(), this.fog = e.fog === null ? null : e.fog.clone(), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), this.overrideMaterial = e.overrideMaterial === null ? null : e.overrideMaterial.clone(), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return this.fog !== null && (t.object.fog = this.fog.toJSON()), t.object.backgroundBlurriness = this.backgroundBlurriness, t.object.backgroundIntensity = this.backgroundIntensity, t.object.backgroundRotation = this.backgroundRotation.toArray(), t.object.environmentIntensity = this.environmentIntensity, t.object.environmentRotation = this.environmentRotation.toArray(), t;
	}
}, Nn = /*@__PURE__*/ new K(), Pn = /*@__PURE__*/ new K(), Fn = /*@__PURE__*/ new K(), In = /*@__PURE__*/ new K(), Ln = /*@__PURE__*/ new K(), Rn = /*@__PURE__*/ new K(), zn = /*@__PURE__*/ new K(), Bn = /*@__PURE__*/ new K(), Vn = /*@__PURE__*/ new K(), Hn = /*@__PURE__*/ new K(), Un = /*@__PURE__*/ new Wt(), Wn = /*@__PURE__*/ new Wt(), Gn = /*@__PURE__*/ new Wt(), Kn = class e {
	constructor(e = new K(), t = new K(), n = new K()) {
		this.a = e, this.b = t, this.c = n;
	}
	static getNormal(e, t, n, r) {
		r.subVectors(n, t), Nn.subVectors(e, t), r.cross(Nn);
		let i = r.lengthSq();
		return i > 0 ? r.multiplyScalar(1 / Math.sqrt(i)) : r.set(0, 0, 0);
	}
	static getBarycoord(e, t, n, r, i) {
		Nn.subVectors(r, t), Pn.subVectors(n, t), Fn.subVectors(e, t);
		let a = Nn.dot(Nn), o = Nn.dot(Pn), s = Nn.dot(Fn), c = Pn.dot(Pn), l = Pn.dot(Fn), u = a * c - o * o;
		if (u === 0) return i.set(0, 0, 0), null;
		let d = 1 / u, f = (c * s - o * l) * d, p = (a * l - o * s) * d;
		return i.set(1 - f - p, p, f);
	}
	static containsPoint(e, t, n, r) {
		return this.getBarycoord(e, t, n, r, In) !== null && In.x >= 0 && In.y >= 0 && In.x + In.y <= 1;
	}
	static getInterpolation(e, t, n, r, i, a, o, s) {
		return this.getBarycoord(e, t, n, r, In) === null ? (s.x = 0, s.y = 0, "z" in s && (s.z = 0), "w" in s && (s.w = 0), null) : (s.setScalar(0), s.addScaledVector(i, In.x), s.addScaledVector(a, In.y), s.addScaledVector(o, In.z), s);
	}
	static getInterpolatedAttribute(e, t, n, r, i, a) {
		return Un.setScalar(0), Wn.setScalar(0), Gn.setScalar(0), Un.fromBufferAttribute(e, t), Wn.fromBufferAttribute(e, n), Gn.fromBufferAttribute(e, r), a.setScalar(0), a.addScaledVector(Un, i.x), a.addScaledVector(Wn, i.y), a.addScaledVector(Gn, i.z), a;
	}
	static isFrontFacing(e, t, n, r) {
		return Nn.subVectors(n, t), Pn.subVectors(e, t), Nn.cross(Pn).dot(r) < 0;
	}
	set(e, t, n) {
		return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
	}
	setFromPointsAndIndices(e, t, n, r) {
		return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this;
	}
	setFromAttributeAndIndices(e, t, n, r) {
		return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
	}
	getArea() {
		return Nn.subVectors(this.c, this.b), Pn.subVectors(this.a, this.b), Nn.cross(Pn).length() * .5;
	}
	getMidpoint(e) {
		return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
	}
	getNormal(t) {
		return e.getNormal(this.a, this.b, this.c, t);
	}
	getPlane(e) {
		return e.setFromCoplanarPoints(this.a, this.b, this.c);
	}
	getBarycoord(t, n) {
		return e.getBarycoord(t, this.a, this.b, this.c, n);
	}
	getInterpolation(t, n, r, i, a) {
		return e.getInterpolation(t, this.a, this.b, this.c, n, r, i, a);
	}
	containsPoint(t) {
		return e.containsPoint(t, this.a, this.b, this.c);
	}
	isFrontFacing(t) {
		return e.isFrontFacing(this.a, this.b, this.c, t);
	}
	intersectsBox(e) {
		return e.intersectsTriangle(this);
	}
	closestPointToPoint(e, t) {
		let n = this.a, r = this.b, i = this.c, a, o;
		Ln.subVectors(r, n), Rn.subVectors(i, n), Bn.subVectors(e, n);
		let s = Ln.dot(Bn), c = Rn.dot(Bn);
		if (s <= 0 && c <= 0) return t.copy(n);
		Vn.subVectors(e, r);
		let l = Ln.dot(Vn), u = Rn.dot(Vn);
		if (l >= 0 && u <= l) return t.copy(r);
		let d = s * u - l * c;
		if (d <= 0 && s >= 0 && l <= 0 && s - l > 0) return a = s / (s - l), t.copy(n).addScaledVector(Ln, a);
		Hn.subVectors(e, i);
		let f = Ln.dot(Hn), p = Rn.dot(Hn);
		if (p >= 0 && f <= p) return t.copy(i);
		let m = f * c - s * p;
		if (m <= 0 && c >= 0 && p <= 0) return o = c / (c - p), t.copy(n).addScaledVector(Rn, o);
		let h = l * p - f * u;
		if (h <= 0 && u - l >= 0 && f - p >= 0) return zn.subVectors(i, r), o = (u - l) / (u - l + (f - p)), t.copy(r).addScaledVector(zn, o);
		let g = 1 / (h + m + d);
		return a = m * g, o = d * g, t.copy(n).addScaledVector(Ln, a).addScaledVector(Rn, o);
	}
	equals(e) {
		return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
	}
}, qn = class {
	constructor(e = new K(Infinity, Infinity, Infinity), t = new K(-Infinity, -Infinity, -Infinity)) {
		this.isBox3 = !0, this.min = e, this.max = t;
	}
	set(e, t) {
		return this.min.copy(e), this.max.copy(t), this;
	}
	setFromArray(e) {
		this.makeEmpty();
		for (let t = 0, n = e.length; t < n; t += 3) this.expandByPoint(Yn.fromArray(e, t));
		return this;
	}
	setFromBufferAttribute(e) {
		this.makeEmpty();
		for (let t = 0, n = e.count; t < n; t++) this.expandByPoint(Yn.fromBufferAttribute(e, t));
		return this;
	}
	setFromPoints(e) {
		this.makeEmpty();
		for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
		return this;
	}
	setFromCenterAndSize(e, t) {
		let n = Yn.copy(t).multiplyScalar(.5);
		return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
	}
	setFromObject(e, t = !1) {
		return this.makeEmpty(), this.expandByObject(e, t);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.min.copy(e.min), this.max.copy(e.max), this;
	}
	makeEmpty() {
		return this.min.x = this.min.y = this.min.z = Infinity, this.max.x = this.max.y = this.max.z = -Infinity, this;
	}
	isEmpty() {
		return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
	}
	getCenter(e) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5);
	}
	getSize(e) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
	}
	expandByPoint(e) {
		return this.min.min(e), this.max.max(e), this;
	}
	expandByVector(e) {
		return this.min.sub(e), this.max.add(e), this;
	}
	expandByScalar(e) {
		return this.min.addScalar(-e), this.max.addScalar(e), this;
	}
	expandByObject(e, t = !1) {
		e.updateWorldMatrix(!1, !1);
		let n = e.geometry;
		if (n !== void 0) {
			let r = n.getAttribute("position");
			if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0 && e.isBatchedMesh !== !0) for (let t = 0, n = r.count; t < n; t++) e.isMesh === !0 ? e.getVertexPosition(t, Yn) : Yn.fromBufferAttribute(r, t), Yn.applyMatrix4(e.matrixWorld), this.expandByPoint(Yn);
			else e.boundingBox === void 0 ? (n.boundingBox === null && n.computeBoundingBox(), Xn.copy(n.boundingBox)) : (e.boundingBox === null && e.computeBoundingBox(), Xn.copy(e.boundingBox)), Xn.applyMatrix4(e.matrixWorld), this.union(Xn);
		}
		let r = e.children;
		for (let e = 0, n = r.length; e < n; e++) this.expandByObject(r[e], t);
		return this;
	}
	containsPoint(e) {
		return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
	}
	containsBox(e) {
		return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
	}
	getParameter(e, t) {
		return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z));
	}
	intersectsBox(e) {
		return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
	}
	intersectsSphere(e) {
		return this.clampPoint(e.center, Yn), Yn.distanceToSquared(e.center) <= e.radius * e.radius;
	}
	intersectsPlane(e) {
		let t, n;
		return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
	}
	intersectsTriangle(e) {
		if (this.isEmpty()) return !1;
		this.getCenter(rr), ir.subVectors(this.max, rr), Zn.subVectors(e.a, rr), Qn.subVectors(e.b, rr), $n.subVectors(e.c, rr), er.subVectors(Qn, Zn), tr.subVectors($n, Qn), nr.subVectors(Zn, $n);
		let t = [
			0,
			-er.z,
			er.y,
			0,
			-tr.z,
			tr.y,
			0,
			-nr.z,
			nr.y,
			er.z,
			0,
			-er.x,
			tr.z,
			0,
			-tr.x,
			nr.z,
			0,
			-nr.x,
			-er.y,
			er.x,
			0,
			-tr.y,
			tr.x,
			0,
			-nr.y,
			nr.x,
			0
		];
		return !sr(t, Zn, Qn, $n, ir) || (t = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		], !sr(t, Zn, Qn, $n, ir)) ? !1 : (ar.crossVectors(er, tr), t = [
			ar.x,
			ar.y,
			ar.z
		], sr(t, Zn, Qn, $n, ir));
	}
	clampPoint(e, t) {
		return t.copy(e).clamp(this.min, this.max);
	}
	distanceToPoint(e) {
		return this.clampPoint(e, Yn).distanceTo(e);
	}
	getBoundingSphere(e) {
		return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Yn).length() * .5), e;
	}
	intersect(e) {
		return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
	}
	union(e) {
		return this.min.min(e.min), this.max.max(e.max), this;
	}
	applyMatrix4(e) {
		return this.isEmpty() || (Jn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Jn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Jn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Jn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Jn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Jn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Jn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Jn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Jn)), this;
	}
	translate(e) {
		return this.min.add(e), this.max.add(e), this;
	}
	equals(e) {
		return e.min.equals(this.min) && e.max.equals(this.max);
	}
	toJSON() {
		return {
			min: this.min.toArray(),
			max: this.max.toArray()
		};
	}
	fromJSON(e) {
		return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
	}
}, Jn = [
	/*@__PURE__*/ new K(),
	/*@__PURE__*/ new K(),
	/*@__PURE__*/ new K(),
	/*@__PURE__*/ new K(),
	/*@__PURE__*/ new K(),
	/*@__PURE__*/ new K(),
	/*@__PURE__*/ new K(),
	/*@__PURE__*/ new K()
], Yn = /*@__PURE__*/ new K(), Xn = /*@__PURE__*/ new qn(), Zn = /*@__PURE__*/ new K(), Qn = /*@__PURE__*/ new K(), $n = /*@__PURE__*/ new K(), er = /*@__PURE__*/ new K(), tr = /*@__PURE__*/ new K(), nr = /*@__PURE__*/ new K(), rr = /*@__PURE__*/ new K(), ir = /*@__PURE__*/ new K(), ar = /*@__PURE__*/ new K(), or = /*@__PURE__*/ new K();
function sr(e, t, n, r, i) {
	for (let a = 0, o = e.length - 3; a <= o; a += 3) {
		or.fromArray(e, a);
		let o = i.x * Math.abs(or.x) + i.y * Math.abs(or.y) + i.z * Math.abs(or.z), s = t.dot(or), c = n.dot(or), l = r.dot(or);
		if (Math.max(-Math.max(s, c, l), Math.min(s, c, l)) > o) return !1;
	}
	return !0;
}
var cr = /*@__PURE__*/ new K(), lr = /*@__PURE__*/ new G(), ur = 0, dr = class extends $e {
	constructor(e, t, n = !1) {
		if (super(), Array.isArray(e)) throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");
		this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: ur++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e === void 0 ? 0 : e.length / t, this.normalized = n, this.usage = Ve, this.updateRanges = [], this.gpuType = _, this.version = 0, this._normalizationScale = e === void 0 ? void 0 : Ct(e);
	}
	onUploadCallback() {}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	setUsage(e) {
		return this.usage = e, this;
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	copy(e) {
		return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this._normalizationScale = e._normalizationScale, this;
	}
	copyAt(e, t, n) {
		e *= this.itemSize, n *= t.itemSize;
		for (let r = 0, i = this.itemSize; r < i; r++) this.array[e + r] = t.array[n + r];
		return this;
	}
	copyArray(e) {
		return this.array.set(e), this;
	}
	applyMatrix3(e) {
		if (this.itemSize === 2) for (let t = 0, n = this.count; t < n; t++) lr.fromBufferAttribute(this, t), lr.applyMatrix3(e), this.setXY(t, lr.x, lr.y);
		else if (this.itemSize === 3) for (let t = 0, n = this.count; t < n; t++) cr.fromBufferAttribute(this, t), cr.applyMatrix3(e), this.setXYZ(t, cr.x, cr.y, cr.z);
		return this;
	}
	applyMatrix4(e) {
		for (let t = 0, n = this.count; t < n; t++) cr.fromBufferAttribute(this, t), cr.applyMatrix4(e), this.setXYZ(t, cr.x, cr.y, cr.z);
		return this;
	}
	applyNormalMatrix(e) {
		for (let t = 0, n = this.count; t < n; t++) cr.fromBufferAttribute(this, t), cr.applyNormalMatrix(e), this.setXYZ(t, cr.x, cr.y, cr.z);
		return this;
	}
	transformDirection(e) {
		for (let t = 0, n = this.count; t < n; t++) cr.fromBufferAttribute(this, t), cr.transformDirection(e), this.setXYZ(t, cr.x, cr.y, cr.z);
		return this;
	}
	set(e, t = 0) {
		return this.array.set(e, t), this;
	}
	getComponent(e, t) {
		let n = this.array[e * this.itemSize + t];
		return this.normalized && (n = this._denormalize(n)), n;
	}
	setComponent(e, t, n) {
		return this.normalized && (n = this._normalize(n)), this.array[e * this.itemSize + t] = n, this;
	}
	getX(e) {
		let t = this.array[e * this.itemSize];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setX(e, t) {
		return this.normalized && (t = this._normalize(t)), this.array[e * this.itemSize] = t, this;
	}
	getY(e) {
		let t = this.array[e * this.itemSize + 1];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setY(e, t) {
		return this.normalized && (t = this._normalize(t)), this.array[e * this.itemSize + 1] = t, this;
	}
	getZ(e) {
		let t = this.array[e * this.itemSize + 2];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setZ(e, t) {
		return this.normalized && (t = this._normalize(t)), this.array[e * this.itemSize + 2] = t, this;
	}
	getW(e) {
		let t = this.array[e * this.itemSize + 3];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setW(e, t) {
		return this.normalized && (t = this._normalize(t)), this.array[e * this.itemSize + 3] = t, this;
	}
	setXY(e, t, n) {
		return e *= this.itemSize, this.normalized && (t = this._normalize(t), n = this._normalize(n)), this.array[e + 0] = t, this.array[e + 1] = n, this;
	}
	setXYZ(e, t, n, r) {
		return e *= this.itemSize, this.normalized && (t = this._normalize(t), n = this._normalize(n), r = this._normalize(r)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
	}
	setXYZW(e, t, n, r, i) {
		return e *= this.itemSize, this.normalized && (t = this._normalize(t), n = this._normalize(n), r = this._normalize(r), i = this._normalize(i)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = i, this;
	}
	onUpload(e) {
		return this.onUploadCallback = e, this;
	}
	clone() {
		return new this.constructor(this.array, this.itemSize).copy(this);
	}
	toJSON() {
		let e = {
			itemSize: this.itemSize,
			type: this.array.constructor.name,
			array: Array.from(this.array),
			normalized: this.normalized
		};
		return e.name = this.name, e.usage = this.usage, e.gpuType = this.gpuType, e;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	_denormalize(e) {
		let t = this._normalizationScale;
		return t === void 0 ? wt(e, this.array) : Math.max(e / t, -1);
	}
	_normalize(e) {
		let t = this._normalizationScale;
		return t === void 0 ? Tt(e, this.array) : Math.round(e * t);
	}
}, fr = class extends dr {
	constructor(e, t, n) {
		super(new Uint16Array(e), t, n);
	}
}, pr = class extends dr {
	constructor(e, t, n) {
		super(new Uint32Array(e), t, n);
	}
}, mr = class extends dr {
	constructor(e, t, n) {
		super(new Float32Array(e), t, n);
	}
}, hr = /*@__PURE__*/ new qn(), gr = /*@__PURE__*/ new K(), _r = /*@__PURE__*/ new K(), vr = class {
	constructor(e = new K(), t = -1) {
		this.isSphere = !0, this.center = e, this.radius = t;
	}
	set(e, t) {
		return this.center.copy(e), this.radius = t, this;
	}
	setFromPoints(e, t) {
		let n = this.center;
		t === void 0 ? hr.setFromPoints(e).getCenter(n) : n.copy(t);
		let r = 0;
		for (let t = 0, i = e.length; t < i; t++) r = Math.max(r, n.distanceToSquared(e[t]));
		return this.radius = Math.sqrt(r), this;
	}
	copy(e) {
		return this.center.copy(e.center), this.radius = e.radius, this;
	}
	isEmpty() {
		return this.radius < 0;
	}
	makeEmpty() {
		return this.center.set(0, 0, 0), this.radius = -1, this;
	}
	containsPoint(e) {
		return e.distanceToSquared(this.center) <= this.radius * this.radius;
	}
	distanceToPoint(e) {
		return e.distanceTo(this.center) - this.radius;
	}
	intersectsSphere(e) {
		let t = this.radius + e.radius;
		return e.center.distanceToSquared(this.center) <= t * t;
	}
	intersectsBox(e) {
		return e.intersectsSphere(this);
	}
	intersectsPlane(e) {
		return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
	}
	clampPoint(e, t) {
		let n = this.center.distanceToSquared(e);
		return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
	}
	getBoundingBox(e) {
		return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
	}
	applyMatrix4(e) {
		return this.center.applyMatrix4(e), this.radius *= e.getMaxScaleOnAxis(), this;
	}
	translate(e) {
		return this.center.add(e), this;
	}
	expandByPoint(e) {
		if (this.isEmpty()) return this.center.copy(e), this.radius = 0, this;
		gr.subVectors(e, this.center);
		let t = gr.lengthSq();
		if (t > this.radius * this.radius) {
			let e = Math.sqrt(t), n = (e - this.radius) * .5;
			this.center.addScaledVector(gr, n / e), this.radius += n;
		}
		return this;
	}
	union(e) {
		return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (_r.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(gr.copy(e.center).add(_r)), this.expandByPoint(gr.copy(e.center).sub(_r))), this);
	}
	equals(e) {
		return e.center.equals(this.center) && e.radius === this.radius;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		return {
			radius: this.radius,
			center: this.center.toArray()
		};
	}
	fromJSON(e) {
		return this.radius = e.radius, this.center.fromArray(e.center), this;
	}
}, yr = 0, br = /*@__PURE__*/ new Yt(), xr = /*@__PURE__*/ new Cn(), Sr = /*@__PURE__*/ new K(), Cr = /*@__PURE__*/ new qn(), wr = /*@__PURE__*/ new qn(), Tr = /*@__PURE__*/ new K(), Er = class e extends $e {
	constructor() {
		super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: yr++ }), this.uuid = it(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
			start: 0,
			count: Infinity
		}, this.userData = {}, this._transformed = !1;
	}
	getIndex() {
		return this.index;
	}
	setIndex(e) {
		return this.index = Array.isArray(e) ? new (Ue(e) ? pr : fr)(e, 1) : e, this;
	}
	setIndirect(e, t = 0) {
		return this.indirect = e, this.indirectOffset = t, this;
	}
	getIndirect() {
		return this.indirect;
	}
	getAttribute(e) {
		return this.attributes[e];
	}
	setAttribute(e, t) {
		return this.attributes[e] = t, this;
	}
	deleteAttribute(e) {
		return delete this.attributes[e], this;
	}
	hasAttribute(e) {
		return this.attributes[e] !== void 0;
	}
	addGroup(e, t, n = 0) {
		this.groups.push({
			start: e,
			count: t,
			materialIndex: n
		});
	}
	clearGroups() {
		this.groups = [];
	}
	setDrawRange(e, t) {
		this.drawRange.start = e, this.drawRange.count = t;
	}
	applyMatrix4(e) {
		let t = this.attributes.position;
		t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
		let n = this.attributes.normal;
		if (n !== void 0) {
			let t = new q().getNormalMatrix(e);
			n.applyNormalMatrix(t), n.needsUpdate = !0;
		}
		let r = this.attributes.tangent;
		return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this._transformed = !0, this;
	}
	applyQuaternion(e) {
		return br.makeRotationFromQuaternion(e), this.applyMatrix4(br), this;
	}
	rotateX(e) {
		return br.makeRotationX(e), this.applyMatrix4(br), this;
	}
	rotateY(e) {
		return br.makeRotationY(e), this.applyMatrix4(br), this;
	}
	rotateZ(e) {
		return br.makeRotationZ(e), this.applyMatrix4(br), this;
	}
	translate(e, t, n) {
		return br.makeTranslation(e, t, n), this.applyMatrix4(br), this;
	}
	scale(e, t, n) {
		return br.makeScale(e, t, n), this.applyMatrix4(br), this;
	}
	lookAt(e) {
		return xr.lookAt(e), xr.updateMatrix(), this.applyMatrix4(xr.matrix), this;
	}
	center() {
		return this.computeBoundingBox(), this.boundingBox.getCenter(Sr).negate(), this.translate(Sr.x, Sr.y, Sr.z), this;
	}
	setFromPoints(e) {
		let t = this.getAttribute("position");
		if (t === void 0) {
			let t = [];
			for (let n = 0, r = e.length; n < r; n++) {
				let r = e[n];
				t.push(r.x, r.y, r.z || 0);
			}
			this.setAttribute("position", new mr(t, 3));
		} else {
			let n = Math.min(e.length, t.count);
			for (let r = 0; r < n; r++) {
				let n = e[r];
				t.setXYZ(r, n.x, n.y, n.z || 0);
			}
			e.length > t.count && H("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
		}
		return this;
	}
	computeBoundingBox() {
		this.boundingBox === null && (this.boundingBox = new qn());
		let e = this.attributes.position, t = this.morphAttributes.position;
		if (e && e.isGLBufferAttribute) U("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new K(-Infinity, -Infinity, -Infinity), new K(Infinity, Infinity, Infinity));
		else {
			if (e !== void 0) {
				if (this.boundingBox.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
					let n = t[e];
					Cr.setFromBufferAttribute(n), this.morphTargetsRelative ? (Tr.addVectors(this.boundingBox.min, Cr.min), this.boundingBox.expandByPoint(Tr), Tr.addVectors(this.boundingBox.max, Cr.max), this.boundingBox.expandByPoint(Tr)) : (this.boundingBox.expandByPoint(Cr.min), this.boundingBox.expandByPoint(Cr.max));
				}
			} else this.boundingBox.makeEmpty();
			(isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && U("BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The \"position\" attribute is likely to have NaN values.", this);
		}
	}
	computeBoundingSphere() {
		this.boundingSphere === null && (this.boundingSphere = new vr());
		let e = this.attributes.position, t = this.morphAttributes.position;
		if (e && e.isGLBufferAttribute) U("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new K(), Infinity);
		else if (e) {
			let n = this.boundingSphere.center;
			if (Cr.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
				let n = t[e];
				wr.setFromBufferAttribute(n), this.morphTargetsRelative ? (Tr.addVectors(Cr.min, wr.min), Cr.expandByPoint(Tr), Tr.addVectors(Cr.max, wr.max), Cr.expandByPoint(Tr)) : (Cr.expandByPoint(wr.min), Cr.expandByPoint(wr.max));
			}
			Cr.getCenter(n);
			let r = 0;
			for (let t = 0, i = e.count; t < i; t++) Tr.fromBufferAttribute(e, t), r = Math.max(r, n.distanceToSquared(Tr));
			if (t) for (let i = 0, a = t.length; i < a; i++) {
				let a = t[i], o = this.morphTargetsRelative;
				for (let t = 0, i = a.count; t < i; t++) Tr.fromBufferAttribute(a, t), o && (Sr.fromBufferAttribute(e, t), Tr.add(Sr)), r = Math.max(r, n.distanceToSquared(Tr));
			}
			this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && U("BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The \"position\" attribute is likely to have NaN values.", this);
		}
	}
	computeTangents() {
		let e = this.index, t = this.attributes;
		if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
			U("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
			return;
		}
		let n = t.position, r = t.normal, i = t.uv, a = this.getAttribute("tangent");
		(a === void 0 || a.count !== n.count) && (a = new dr(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", a));
		let o = [], s = [], c = new Uint8Array(n.count);
		for (let e = 0; e < n.count; e++) o[e] = new K(), s[e] = new K();
		let l = new K(), u = new K(), d = new K(), f = new G(), p = new G(), m = new G(), h = new K(), g = new K();
		function _(e, t, r) {
			c[e] = c[t] = c[r] = 1, l.fromBufferAttribute(n, e), u.fromBufferAttribute(n, t), d.fromBufferAttribute(n, r), f.fromBufferAttribute(i, e), p.fromBufferAttribute(i, t), m.fromBufferAttribute(i, r), u.sub(l), d.sub(l), p.sub(f), m.sub(f);
			let a = 1 / (p.x * m.y - m.x * p.y);
			isFinite(a) && (h.copy(u).multiplyScalar(m.y).addScaledVector(d, -p.y).multiplyScalar(a), g.copy(d).multiplyScalar(p.x).addScaledVector(u, -m.x).multiplyScalar(a), o[e].add(h), o[t].add(h), o[r].add(h), s[e].add(g), s[t].add(g), s[r].add(g));
		}
		let v = this.groups;
		v.length === 0 && (v = [{
			start: 0,
			count: e.count
		}]);
		for (let t = 0, n = v.length; t < n; ++t) {
			let n = v[t], r = n.start, i = n.count;
			for (let t = r, n = r + i; t < n; t += 3) _(e.getX(t + 0), e.getX(t + 1), e.getX(t + 2));
		}
		let y = new K(), b = new K(), x = new K(), S = new K();
		function C(e) {
			x.fromBufferAttribute(r, e), S.copy(x);
			let t = o[e];
			y.copy(t), y.sub(x.multiplyScalar(x.dot(t))).normalize(), b.crossVectors(S, t);
			let n = b.dot(s[e]) < 0 ? -1 : 1;
			a.setXYZW(e, y.x, y.y, y.z, n);
		}
		for (let e = 0, t = n.count; e < t; ++e) c[e] && C(e);
		this._transformed = !0;
	}
	computeVertexNormals() {
		let e = this.index, t = this.getAttribute("position");
		if (t !== void 0) {
			let n = this.getAttribute("normal");
			if (n === void 0 || n.count !== t.count) n = new dr(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
			else for (let e = 0, t = n.count; e < t; e++) n.setXYZ(e, 0, 0, 0);
			let r = new K(), i = new K(), a = new K(), o = new K(), s = new K(), c = new K(), l = new K(), u = new K();
			if (e) for (let d = 0, f = e.count; d < f; d += 3) {
				let f = e.getX(d + 0), p = e.getX(d + 1), m = e.getX(d + 2);
				r.fromBufferAttribute(t, f), i.fromBufferAttribute(t, p), a.fromBufferAttribute(t, m), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), o.fromBufferAttribute(n, f), s.fromBufferAttribute(n, p), c.fromBufferAttribute(n, m), o.add(l), s.add(l), c.add(l), n.setXYZ(f, o.x, o.y, o.z), n.setXYZ(p, s.x, s.y, s.z), n.setXYZ(m, c.x, c.y, c.z);
			}
			else for (let e = 0, o = t.count; e < o; e += 3) r.fromBufferAttribute(t, e + 0), i.fromBufferAttribute(t, e + 1), a.fromBufferAttribute(t, e + 2), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), n.setXYZ(e + 0, l.x, l.y, l.z), n.setXYZ(e + 1, l.x, l.y, l.z), n.setXYZ(e + 2, l.x, l.y, l.z);
			this.normalizeNormals(), n.needsUpdate = !0;
		}
	}
	normalizeNormals() {
		let e = this.attributes.normal;
		for (let t = 0, n = e.count; t < n; t++) Tr.fromBufferAttribute(e, t), Tr.normalize(), e.setXYZ(t, Tr.x, Tr.y, Tr.z);
	}
	toNonIndexed() {
		function t(e, t) {
			let n = e.array, r = e.itemSize, i = e.normalized, a = new n.constructor(t.length * r), o = 0, s = 0;
			for (let i = 0, c = t.length; i < c; i++) {
				o = e.isInterleavedBufferAttribute ? t[i] * e.data.stride + e.offset : t[i] * r;
				for (let e = 0; e < r; e++) a[s++] = n[o++];
			}
			return new dr(a, r, i);
		}
		if (this.index === null) return H("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
		let n = new e(), r = this.index.array, i = this.attributes;
		for (let e in i) {
			let a = i[e], o = t(a, r);
			n.setAttribute(e, o);
		}
		let a = this.morphAttributes;
		for (let e in a) {
			let i = [], o = a[e];
			for (let e = 0, n = o.length; e < n; e++) {
				let n = o[e], a = t(n, r);
				i.push(a);
			}
			n.morphAttributes[e] = i;
		}
		n.morphTargetsRelative = this.morphTargetsRelative;
		let o = this.groups;
		for (let e = 0, t = o.length; e < t; e++) {
			let t = o[e];
			n.addGroup(t.start, t.count, t.materialIndex);
		}
		return n;
	}
	toJSON() {
		let e = { metadata: {
			version: 4.7,
			type: "BufferGeometry",
			generator: "BufferGeometry.toJSON"
		} };
		if (e.uuid = this.uuid, e.type = this.parameters !== void 0 && this._transformed === !0 ? "BufferGeometry" : this.type, e.name = this.name, Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0 && this._transformed !== !0) {
			let t = this.parameters;
			for (let n in t) t[n] !== void 0 && (e[n] = t[n]);
			return e;
		}
		e.data = { attributes: {} };
		let t = this.index;
		t !== null && (e.data.index = {
			type: t.array.constructor.name,
			array: Array.prototype.slice.call(t.array)
		});
		let n = this.attributes;
		for (let t in n) {
			let r = n[t];
			e.data.attributes[t] = r.toJSON(e.data);
		}
		let r = {}, i = !1;
		for (let t in this.morphAttributes) {
			let n = this.morphAttributes[t], a = [];
			for (let t = 0, r = n.length; t < r; t++) {
				let r = n[t];
				a.push(r.toJSON(e.data));
			}
			a.length > 0 && (r[t] = a, i = !0);
		}
		i && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
		let a = this.groups;
		a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
		let o = this.boundingSphere;
		return o !== null && (e.data.boundingSphere = o.toJSON()), e;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
		let t = {};
		this.name = e.name;
		let n = e.index;
		n !== null && this.setIndex(n.clone());
		let r = e.attributes;
		for (let e in r) {
			let n = r[e];
			this.setAttribute(e, n.clone(t));
		}
		let i = e.morphAttributes;
		for (let e in i) {
			let n = [], r = i[e];
			for (let e = 0, i = r.length; e < i; e++) n.push(r[e].clone(t));
			this.morphAttributes[e] = n;
		}
		this.morphTargetsRelative = e.morphTargetsRelative;
		let a = e.groups;
		for (let e = 0, t = a.length; e < t; e++) {
			let t = a[e];
			this.addGroup(t.start, t.count, t.materialIndex);
		}
		let o = e.boundingBox;
		o !== null && (this.boundingBox = o.clone());
		let s = e.boundingSphere;
		return s !== null && (this.boundingSphere = s.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this._transformed = e._transformed, this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, Dr = class {
	constructor(e, t) {
		this.isInterleavedBuffer = !0, this.array = e, this.stride = t, this.count = e === void 0 ? 0 : e.length / t, this.usage = Ve, this.updateRanges = [], this.version = 0, this.uuid = it();
	}
	onUploadCallback() {}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	setUsage(e) {
		return this.usage = e, this;
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	copy(e) {
		return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this;
	}
	copyAt(e, t, n) {
		e *= this.stride, n *= t.stride;
		for (let r = 0, i = this.stride; r < i; r++) this.array[e + r] = t.array[n + r];
		return this;
	}
	set(e, t = 0) {
		return this.array.set(e, t), this;
	}
	clone(e) {
		e.arrayBuffers === void 0 && (e.arrayBuffers = {});
		let t = Or(this.array);
		e.arrayBuffers[t] === void 0 && (e.arrayBuffers[t] = this.array.slice(0).buffer);
		let n = new this.array.constructor(e.arrayBuffers[t]), r = new this.constructor(n, this.stride);
		return r.setUsage(this.usage), r;
	}
	onUpload(e) {
		return this.onUploadCallback = e, this;
	}
	toJSON(e) {
		e.arrayBuffers === void 0 && (e.arrayBuffers = {});
		let t = Or(this.array);
		e.arrayBuffers[t] === void 0 && (e.arrayBuffers[t] = Array.from(new Uint32Array(this.array.slice(0).buffer)));
		let n = {
			uuid: this.uuid,
			buffer: t,
			type: this.array.constructor.name,
			stride: this.stride
		};
		return n.usage = this.usage, n;
	}
};
function Or(e) {
	return e.buffer._uuid === void 0 && (e.buffer._uuid = it()), e.byteOffset === 0 && e.byteLength === e.buffer.byteLength ? e.buffer._uuid : e.buffer._uuid + ":" + e.byteOffset + ":" + e.byteLength;
}
var kr = /*@__PURE__*/ new K(), Ar = class e {
	constructor(e, t, n, r = !1) {
		this.isInterleavedBufferAttribute = !0, this.name = "", this.data = e, this.itemSize = t, this.offset = n, this.normalized = r, this._normalizationScale = e === void 0 ? void 0 : Ct(e.array);
	}
	get count() {
		return this.data.count;
	}
	get array() {
		return this.data.array;
	}
	set needsUpdate(e) {
		this.data.needsUpdate = e;
	}
	applyMatrix4(e) {
		for (let t = 0, n = this.data.count; t < n; t++) kr.fromBufferAttribute(this, t), kr.applyMatrix4(e), this.setXYZ(t, kr.x, kr.y, kr.z);
		return this;
	}
	applyNormalMatrix(e) {
		for (let t = 0, n = this.count; t < n; t++) kr.fromBufferAttribute(this, t), kr.applyNormalMatrix(e), this.setXYZ(t, kr.x, kr.y, kr.z);
		return this;
	}
	transformDirection(e) {
		for (let t = 0, n = this.count; t < n; t++) kr.fromBufferAttribute(this, t), kr.transformDirection(e), this.setXYZ(t, kr.x, kr.y, kr.z);
		return this;
	}
	getComponent(e, t) {
		let n = this.array[e * this.data.stride + this.offset + t];
		return this.normalized && (n = this._denormalize(n)), n;
	}
	setComponent(e, t, n) {
		return this.normalized && (n = this._normalize(n)), this.data.array[e * this.data.stride + this.offset + t] = n, this;
	}
	setX(e, t) {
		return this.normalized && (t = this._normalize(t)), this.data.array[e * this.data.stride + this.offset] = t, this;
	}
	setY(e, t) {
		return this.normalized && (t = this._normalize(t)), this.data.array[e * this.data.stride + this.offset + 1] = t, this;
	}
	setZ(e, t) {
		return this.normalized && (t = this._normalize(t)), this.data.array[e * this.data.stride + this.offset + 2] = t, this;
	}
	setW(e, t) {
		return this.normalized && (t = this._normalize(t)), this.data.array[e * this.data.stride + this.offset + 3] = t, this;
	}
	getX(e) {
		let t = this.data.array[e * this.data.stride + this.offset];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	getY(e) {
		let t = this.data.array[e * this.data.stride + this.offset + 1];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	getZ(e) {
		let t = this.data.array[e * this.data.stride + this.offset + 2];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	getW(e) {
		let t = this.data.array[e * this.data.stride + this.offset + 3];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setXY(e, t, n) {
		return e = e * this.data.stride + this.offset, this.normalized && (t = this._normalize(t), n = this._normalize(n)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this;
	}
	setXYZ(e, t, n, r) {
		return e = e * this.data.stride + this.offset, this.normalized && (t = this._normalize(t), n = this._normalize(n), r = this._normalize(r)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = r, this;
	}
	setXYZW(e, t, n, r, i) {
		return e = e * this.data.stride + this.offset, this.normalized && (t = this._normalize(t), n = this._normalize(n), r = this._normalize(r), i = this._normalize(i)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = r, this.data.array[e + 3] = i, this;
	}
	clone(t) {
		if (t === void 0) {
			Je("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
			let e = [];
			for (let t = 0; t < this.count; t++) {
				let n = t * this.data.stride + this.offset;
				for (let t = 0; t < this.itemSize; t++) e.push(this.data.array[n + t]);
			}
			return new dr(new this.array.constructor(e), this.itemSize, this.normalized);
		}
		return t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}), t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)), new e(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
	}
	toJSON(e) {
		if (e === void 0) {
			Je("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
			let e = [];
			for (let t = 0; t < this.count; t++) {
				let n = t * this.data.stride + this.offset;
				for (let t = 0; t < this.itemSize; t++) e.push(this.data.array[n + t]);
			}
			return {
				itemSize: this.itemSize,
				type: this.array.constructor.name,
				array: e,
				normalized: this.normalized
			};
		}
		return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)), {
			isInterleavedBufferAttribute: !0,
			itemSize: this.itemSize,
			data: this.data.uuid,
			offset: this.offset,
			normalized: this.normalized
		};
	}
	_denormalize(e) {
		let t = this._normalizationScale;
		return t === void 0 ? wt(e, this.data.array) : Math.max(e / t, -1);
	}
	_normalize(e) {
		let t = this._normalizationScale;
		return t === void 0 ? Tt(e, this.data.array) : Math.round(e * t);
	}
}, jr = /*@__PURE__*/ new K(), Mr = /*@__PURE__*/ new K(), Nr = /*@__PURE__*/ new q(), Pr = class {
	constructor(e = new K(1, 0, 0), t = 0) {
		this.isPlane = !0, this.normal = e, this.constant = t;
	}
	set(e, t) {
		return this.normal.copy(e), this.constant = t, this;
	}
	setComponents(e, t, n, r) {
		return this.normal.set(e, t, n), this.constant = r, this;
	}
	setFromNormalAndCoplanarPoint(e, t) {
		return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
	}
	setFromCoplanarPoints(e, t, n) {
		let r = jr.subVectors(n, t).cross(Mr.subVectors(e, t)).normalize();
		return this.setFromNormalAndCoplanarPoint(r, e), this;
	}
	copy(e) {
		return this.normal.copy(e.normal), this.constant = e.constant, this;
	}
	normalize() {
		let e = 1 / this.normal.length();
		return this.normal.multiplyScalar(e), this.constant *= e, this;
	}
	negate() {
		return this.constant *= -1, this.normal.negate(), this;
	}
	distanceToPoint(e) {
		return this.normal.dot(e) + this.constant;
	}
	distanceToSphere(e) {
		return this.distanceToPoint(e.center) - e.radius;
	}
	projectPoint(e, t) {
		return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
	}
	intersectLine(e, t, n = !0) {
		let r = e.delta(jr), i = this.normal.dot(r);
		if (i === 0) return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
		let a = -(e.start.dot(this.normal) + this.constant) / i;
		return n === !0 && (a < 0 || a > 1) ? null : t.copy(e.start).addScaledVector(r, a);
	}
	intersectsLine(e) {
		let t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
		return t < 0 && n > 0 || n < 0 && t > 0;
	}
	intersectsBox(e) {
		return e.intersectsPlane(this);
	}
	intersectsSphere(e) {
		return e.intersectsPlane(this);
	}
	coplanarPoint(e) {
		return e.copy(this.normal).multiplyScalar(-this.constant);
	}
	applyMatrix4(e, t) {
		let n = t || Nr.getNormalMatrix(e), r = this.coplanarPoint(jr).applyMatrix4(e), i = this.normal.applyMatrix3(n).normalize();
		return this.constant = -r.dot(i), this;
	}
	translate(e) {
		return this.constant -= e.dot(this.normal), this;
	}
	equals(e) {
		return e.normal.equals(this.normal) && e.constant === this.constant;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		return {
			normal: this.normal.toArray(),
			constant: this.constant
		};
	}
	fromJSON(e) {
		return this.normal.fromArray(e.normal), this.constant = e.constant, this;
	}
}, Fr = 0, Ir = class extends $e {
	constructor() {
		super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Fr++ }), this.uuid = it(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Y(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Be, this.stencilZFail = Be, this.stencilZPass = Be, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
	}
	get alphaTest() {
		return this._alphaTest;
	}
	set alphaTest(e) {
		this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
	}
	onBeforeRender() {}
	onBeforeCompile() {}
	customProgramCacheKey() {
		return this.onBeforeCompile.toString();
	}
	setValues(e) {
		if (e !== void 0) for (let t in e) {
			let n = e[t];
			if (n === void 0) {
				H(`Material: parameter '${t}' has value of undefined.`);
				continue;
			}
			let r = this[t];
			r === void 0 ? H(`Material: '${t}' is not a property of THREE.${this.type}.`) : r && r.isColor ? r.set(n) : r && r.isVector2 && n && n.isVector2 || r && r.isEuler && n && n.isEuler || r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n;
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		t && (e = {
			textures: {},
			images: {}
		});
		let n = { metadata: {
			version: 4.7,
			type: "Material",
			generator: "Material.toJSON"
		} };
		n.uuid = this.uuid, n.type = this.type, n.blending = this.blending, n.side = this.side, n.shadowSide = this.shadowSide, n.vertexColors = this.vertexColors, n.opacity = this.opacity, n.transparent = this.transparent, n.blendSrc = this.blendSrc, n.blendDst = this.blendDst, n.blendEquation = this.blendEquation, n.blendSrcAlpha = this.blendSrcAlpha, n.blendDstAlpha = this.blendDstAlpha, n.blendEquationAlpha = this.blendEquationAlpha, n.blendColor = this.blendColor.getHex(), n.blendAlpha = this.blendAlpha, n.depthFunc = this.depthFunc, n.depthTest = this.depthTest, n.depthWrite = this.depthWrite, n.colorWrite = this.colorWrite, n.clipIntersection = this.clipIntersection, n.clipShadows = this.clipShadows, n.stencilWriteMask = this.stencilWriteMask, n.stencilFunc = this.stencilFunc, n.stencilRef = this.stencilRef, n.stencilFuncMask = this.stencilFuncMask, n.stencilFail = this.stencilFail, n.stencilZFail = this.stencilZFail, n.stencilZPass = this.stencilZPass, n.stencilWrite = this.stencilWrite, n.polygonOffset = this.polygonOffset, n.polygonOffsetFactor = this.polygonOffsetFactor, n.polygonOffsetUnits = this.polygonOffsetUnits, n.dithering = this.dithering, n.alphaTest = this.alphaTest, n.alphaHash = this.alphaHash, n.alphaToCoverage = this.alphaToCoverage, n.premultipliedAlpha = this.premultipliedAlpha, n.forceSinglePass = this.forceSinglePass, n.allowOverride = this.allowOverride, n.visible = this.visible, n.toneMapped = this.toneMapped, n.name = this.name, this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.diffuseRoughness !== void 0 && (n.diffuseRoughness = this.diffuseRoughness), this.diffuseRoughnessMap && this.diffuseRoughnessMap.isTexture && (n.diffuseRoughnessMap = this.diffuseRoughnessMap.toJSON(e).uuid), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.retroreflectivity !== void 0 && (n.retroreflectivity = this.retroreflectivity), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessMinimum !== void 0 && (n.iridescenceThicknessMinimum = this.iridescenceThicknessMinimum), this.iridescenceThicknessMaximum !== void 0 && (n.iridescenceThicknessMaximum = this.iridescenceThicknessMaximum), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), Array.isArray(this.clippingPlanes) && this.clippingPlanes.length > 0 && (n.clippingPlanes = this.clippingPlanes.map((e) => e.toJSON())), this.rotation !== void 0 && (n.rotation = this.rotation), this.depthPacking !== void 0 && (n.depthPacking = this.depthPacking), this.linewidth !== void 0 && (n.linewidth = this.linewidth), this.linecap !== void 0 && (n.linecap = this.linecap), this.linejoin !== void 0 && (n.linejoin = this.linejoin), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.wireframe !== void 0 && (n.wireframe = this.wireframe), this.wireframeLinewidth !== void 0 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== void 0 && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== void 0 && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading !== void 0 && (n.flatShading = this.flatShading), this.fog !== void 0 && (n.fog = this.fog), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
		function r(e) {
			let t = [];
			for (let n in e) {
				let r = e[n];
				delete r.metadata, t.push(r);
			}
			return t;
		}
		if (t) {
			let t = r(e.textures), i = r(e.images);
			t.length > 0 && (n.textures = t), i.length > 0 && (n.images = i);
		}
		return n;
	}
	fromJSON(e, t) {
		if (e.uuid !== void 0 && (this.uuid = e.uuid), e.name !== void 0 && (this.name = e.name), e.color !== void 0 && this.color !== void 0 && this.color.setHex(e.color), e.roughness !== void 0 && (this.roughness = e.roughness), e.metalness !== void 0 && (this.metalness = e.metalness), e.sheen !== void 0 && (this.sheen = e.sheen), e.sheenColor !== void 0 && (this.sheenColor = new Y().setHex(e.sheenColor)), e.sheenRoughness !== void 0 && (this.sheenRoughness = e.sheenRoughness), e.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(e.emissive), e.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(e.specular), e.specularIntensity !== void 0 && (this.specularIntensity = e.specularIntensity), e.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(e.specularColor), e.shininess !== void 0 && (this.shininess = e.shininess), e.clearcoat !== void 0 && (this.clearcoat = e.clearcoat), e.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = e.clearcoatRoughness), e.diffuseRoughness !== void 0 && (this.diffuseRoughness = e.diffuseRoughness), e.dispersion !== void 0 && (this.dispersion = e.dispersion), e.retroreflectivity !== void 0 && (this.retroreflectivity = e.retroreflectivity), e.iridescence !== void 0 && (this.iridescence = e.iridescence), e.iridescenceIOR !== void 0 && (this.iridescenceIOR = e.iridescenceIOR), e.iridescenceThicknessMinimum !== void 0 && (this.iridescenceThicknessMinimum = e.iridescenceThicknessMinimum), e.iridescenceThicknessMaximum !== void 0 && (this.iridescenceThicknessMaximum = e.iridescenceThicknessMaximum), e.iridescenceThicknessRange !== void 0 && (this.iridescenceThicknessMinimum = e.iridescenceThicknessRange[0], this.iridescenceThicknessMaximum = e.iridescenceThicknessRange[1]), e.transmission !== void 0 && (this.transmission = e.transmission), e.thickness !== void 0 && (this.thickness = e.thickness), e.attenuationDistance !== void 0 && (this.attenuationDistance = e.attenuationDistance), e.attenuationColor !== void 0 && this.attenuationColor !== void 0 && this.attenuationColor.setHex(e.attenuationColor), e.anisotropy !== void 0 && (this.anisotropy = e.anisotropy), e.anisotropyRotation !== void 0 && (this.anisotropyRotation = e.anisotropyRotation), e.fog !== void 0 && (this.fog = e.fog), e.flatShading !== void 0 && (this.flatShading = e.flatShading), e.blending !== void 0 && (this.blending = e.blending), e.combine !== void 0 && (this.combine = e.combine), e.side !== void 0 && (this.side = e.side), e.shadowSide !== void 0 && (this.shadowSide = e.shadowSide), e.opacity !== void 0 && (this.opacity = e.opacity), e.transparent !== void 0 && (this.transparent = e.transparent), e.alphaTest !== void 0 && (this.alphaTest = e.alphaTest), e.alphaHash !== void 0 && (this.alphaHash = e.alphaHash), e.depthFunc !== void 0 && (this.depthFunc = e.depthFunc), e.depthTest !== void 0 && (this.depthTest = e.depthTest), e.depthWrite !== void 0 && (this.depthWrite = e.depthWrite), e.colorWrite !== void 0 && (this.colorWrite = e.colorWrite), e.clippingPlanes !== void 0 && (this.clippingPlanes = e.clippingPlanes.map((e) => new Pr().fromJSON(e))), e.clipIntersection !== void 0 && (this.clipIntersection = e.clipIntersection), e.clipShadows !== void 0 && (this.clipShadows = e.clipShadows), e.depthPacking !== void 0 && (this.depthPacking = e.depthPacking), e.blendSrc !== void 0 && (this.blendSrc = e.blendSrc), e.blendDst !== void 0 && (this.blendDst = e.blendDst), e.blendEquation !== void 0 && (this.blendEquation = e.blendEquation), e.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = e.blendSrcAlpha), e.blendDstAlpha !== void 0 && (this.blendDstAlpha = e.blendDstAlpha), e.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = e.blendEquationAlpha), e.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(e.blendColor), e.blendAlpha !== void 0 && (this.blendAlpha = e.blendAlpha), e.stencilWriteMask !== void 0 && (this.stencilWriteMask = e.stencilWriteMask), e.stencilFunc !== void 0 && (this.stencilFunc = e.stencilFunc), e.stencilRef !== void 0 && (this.stencilRef = e.stencilRef), e.stencilFuncMask !== void 0 && (this.stencilFuncMask = e.stencilFuncMask), e.stencilFail !== void 0 && (this.stencilFail = e.stencilFail), e.stencilZFail !== void 0 && (this.stencilZFail = e.stencilZFail), e.stencilZPass !== void 0 && (this.stencilZPass = e.stencilZPass), e.stencilWrite !== void 0 && (this.stencilWrite = e.stencilWrite), e.wireframe !== void 0 && (this.wireframe = e.wireframe), e.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = e.wireframeLinewidth), e.wireframeLinecap !== void 0 && (this.wireframeLinecap = e.wireframeLinecap), e.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = e.wireframeLinejoin), e.rotation !== void 0 && (this.rotation = e.rotation), e.linewidth !== void 0 && (this.linewidth = e.linewidth), e.linecap !== void 0 && (this.linecap = e.linecap), e.linejoin !== void 0 && (this.linejoin = e.linejoin), e.dashSize !== void 0 && (this.dashSize = e.dashSize), e.gapSize !== void 0 && (this.gapSize = e.gapSize), e.scale !== void 0 && (this.scale = e.scale), e.polygonOffset !== void 0 && (this.polygonOffset = e.polygonOffset), e.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = e.polygonOffsetFactor), e.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = e.polygonOffsetUnits), e.dithering !== void 0 && (this.dithering = e.dithering), e.alphaToCoverage !== void 0 && (this.alphaToCoverage = e.alphaToCoverage), e.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = e.premultipliedAlpha), e.forceSinglePass !== void 0 && (this.forceSinglePass = e.forceSinglePass), e.allowOverride !== void 0 && (this.allowOverride = e.allowOverride), e.visible !== void 0 && (this.visible = e.visible), e.toneMapped !== void 0 && (this.toneMapped = e.toneMapped), e.userData !== void 0 && (this.userData = e.userData), e.vertexColors !== void 0 && (this.vertexColors = typeof e.vertexColors == "number" ? e.vertexColors > 0 : e.vertexColors), e.size !== void 0 && (this.size = e.size), e.sizeAttenuation !== void 0 && (this.sizeAttenuation = e.sizeAttenuation), e.map !== void 0 && (this.map = t[e.map] || null), e.matcap !== void 0 && (this.matcap = t[e.matcap] || null), e.alphaMap !== void 0 && (this.alphaMap = t[e.alphaMap] || null), e.bumpMap !== void 0 && (this.bumpMap = t[e.bumpMap] || null), e.bumpScale !== void 0 && (this.bumpScale = e.bumpScale), e.normalMap !== void 0 && (this.normalMap = t[e.normalMap] || null), e.normalMapType !== void 0 && (this.normalMapType = e.normalMapType), e.normalScale !== void 0) {
			let t = e.normalScale;
			Array.isArray(t) === !1 && (t = [t, t]), this.normalScale = new G().fromArray(t);
		}
		return e.displacementMap !== void 0 && (this.displacementMap = t[e.displacementMap] || null), e.displacementScale !== void 0 && (this.displacementScale = e.displacementScale), e.displacementBias !== void 0 && (this.displacementBias = e.displacementBias), e.roughnessMap !== void 0 && (this.roughnessMap = t[e.roughnessMap] || null), e.metalnessMap !== void 0 && (this.metalnessMap = t[e.metalnessMap] || null), e.emissiveMap !== void 0 && (this.emissiveMap = t[e.emissiveMap] || null), e.emissiveIntensity !== void 0 && (this.emissiveIntensity = e.emissiveIntensity), e.specularMap !== void 0 && (this.specularMap = t[e.specularMap] || null), e.specularIntensityMap !== void 0 && (this.specularIntensityMap = t[e.specularIntensityMap] || null), e.specularColorMap !== void 0 && (this.specularColorMap = t[e.specularColorMap] || null), e.envMap !== void 0 && (this.envMap = t[e.envMap] || null), e.envMapRotation !== void 0 && this.envMapRotation.fromArray(e.envMapRotation), e.envMapIntensity !== void 0 && (this.envMapIntensity = e.envMapIntensity), e.reflectivity !== void 0 && (this.reflectivity = e.reflectivity), e.refractionRatio !== void 0 && (this.refractionRatio = e.refractionRatio), e.lightMap !== void 0 && (this.lightMap = t[e.lightMap] || null), e.lightMapIntensity !== void 0 && (this.lightMapIntensity = e.lightMapIntensity), e.aoMap !== void 0 && (this.aoMap = t[e.aoMap] || null), e.aoMapIntensity !== void 0 && (this.aoMapIntensity = e.aoMapIntensity), e.gradientMap !== void 0 && (this.gradientMap = t[e.gradientMap] || null), e.clearcoatMap !== void 0 && (this.clearcoatMap = t[e.clearcoatMap] || null), e.clearcoatRoughnessMap !== void 0 && (this.clearcoatRoughnessMap = t[e.clearcoatRoughnessMap] || null), e.clearcoatNormalMap !== void 0 && (this.clearcoatNormalMap = t[e.clearcoatNormalMap] || null), e.clearcoatNormalScale !== void 0 && (this.clearcoatNormalScale = new G().fromArray(e.clearcoatNormalScale)), e.diffuseRoughnessMap !== void 0 && (this.diffuseRoughnessMap = t[e.diffuseRoughnessMap] || null), e.iridescenceMap !== void 0 && (this.iridescenceMap = t[e.iridescenceMap] || null), e.iridescenceThicknessMap !== void 0 && (this.iridescenceThicknessMap = t[e.iridescenceThicknessMap] || null), e.transmissionMap !== void 0 && (this.transmissionMap = t[e.transmissionMap] || null), e.thicknessMap !== void 0 && (this.thicknessMap = t[e.thicknessMap] || null), e.anisotropyMap !== void 0 && (this.anisotropyMap = t[e.anisotropyMap] || null), e.sheenColorMap !== void 0 && (this.sheenColorMap = t[e.sheenColorMap] || null), e.sheenRoughnessMap !== void 0 && (this.sheenRoughnessMap = t[e.sheenRoughnessMap] || null), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
		let t = e.clippingPlanes, n = null;
		if (t !== null) {
			let e = t.length;
			n = Array(e);
			for (let r = 0; r !== e; ++r) n[r] = t[r].clone();
		}
		return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
}, Lr = class extends Ir {
	constructor(e) {
		super(), this.isSpriteMaterial = !0, this.type = "SpriteMaterial", this.color = new Y(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.rotation = e.rotation, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
	}
}, Rr, zr = /*@__PURE__*/ new K(), Br = /*@__PURE__*/ new K(), Vr = /*@__PURE__*/ new K(), Hr = /*@__PURE__*/ new G(), Ur = /*@__PURE__*/ new G(), Wr = /*@__PURE__*/ new Yt(), Gr = /*@__PURE__*/ new K(), Kr = /*@__PURE__*/ new K(), qr = /*@__PURE__*/ new K(), Jr = /*@__PURE__*/ new G(), Yr = /*@__PURE__*/ new G(), Xr = /*@__PURE__*/ new G(), Zr = class extends Cn {
	constructor(e = new Lr()) {
		if (super(), this.isSprite = !0, this.type = "Sprite", Rr === void 0) {
			Rr = new Er();
			let e = new Dr(new Float32Array([
				-.5,
				-.5,
				0,
				0,
				0,
				.5,
				-.5,
				0,
				1,
				0,
				.5,
				.5,
				0,
				1,
				1,
				-.5,
				.5,
				0,
				0,
				1
			]), 5);
			Rr.setIndex([
				0,
				1,
				2,
				0,
				2,
				3
			]), Rr.setAttribute("position", new Ar(e, 3, 0, !1)), Rr.setAttribute("uv", new Ar(e, 2, 3, !1));
		}
		this.geometry = Rr, this.material = e, this.center = new G(.5, .5), this.count = 1;
	}
	intersectsFrustum(e) {
		return e.intersectsSprite(this);
	}
	raycast(e, t) {
		e.camera === null && U("Sprite: \"Raycaster.camera\" needs to be set in order to raycast against sprites."), Br.setFromMatrixScale(this.matrixWorld), Wr.copy(e.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld), Vr.setFromMatrixPosition(this.modelViewMatrix), e.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1 && Br.multiplyScalar(-Vr.z);
		let n = this.material.rotation, r, i;
		n !== 0 && (i = Math.cos(n), r = Math.sin(n));
		let a = this.center;
		Qr(Gr.set(-.5, -.5, 0), Vr, a, Br, r, i), Qr(Kr.set(.5, -.5, 0), Vr, a, Br, r, i), Qr(qr.set(.5, .5, 0), Vr, a, Br, r, i), Jr.set(0, 0), Yr.set(1, 0), Xr.set(1, 1);
		let o = e.ray.intersectTriangle(Gr, Kr, qr, !1, zr);
		if (o === null && (Qr(Kr.set(-.5, .5, 0), Vr, a, Br, r, i), Yr.set(0, 1), o = e.ray.intersectTriangle(Gr, qr, Kr, !1, zr), o === null)) return;
		let s = e.ray.origin.distanceTo(zr);
		s < e.near || s > e.far || t.push({
			distance: s,
			point: zr.clone(),
			uv: Kn.getInterpolation(zr, Gr, Kr, qr, Jr, Yr, Xr, new G()),
			face: null,
			object: this
		});
	}
	copy(e, t) {
		return super.copy(e, t), e.center !== void 0 && this.center.copy(e.center), this.material = e.material, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.center = this.center.toArray(), t;
	}
};
function Qr(e, t, n, r, i, a) {
	Hr.subVectors(e, n).addScalar(.5).multiply(r), i === void 0 ? Ur.copy(Hr) : (Ur.x = a * Hr.x - i * Hr.y, Ur.y = i * Hr.x + a * Hr.y), e.copy(t), e.x += Ur.x, e.y += Ur.y, e.applyMatrix4(Wr);
}
var $r = /*@__PURE__*/ new K(), ei = /*@__PURE__*/ new K(), ti = /*@__PURE__*/ new K(), ni = /*@__PURE__*/ new K(), ri = class {
	constructor(e = new K(), t = new K(0, 0, -1)) {
		this.origin = e, this.direction = t;
	}
	set(e, t) {
		return this.origin.copy(e), this.direction.copy(t), this;
	}
	copy(e) {
		return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
	}
	at(e, t) {
		return t.copy(this.origin).addScaledVector(this.direction, e);
	}
	lookAt(e) {
		return this.direction.copy(e).sub(this.origin).normalize(), this;
	}
	recast(e) {
		return this.origin.copy(this.at(e, $r)), this;
	}
	closestPointToPoint(e, t) {
		t.subVectors(e, this.origin);
		let n = t.dot(this.direction);
		return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
	}
	distanceToPoint(e) {
		return Math.sqrt(this.distanceSqToPoint(e));
	}
	distanceSqToPoint(e) {
		let t = $r.subVectors(e, this.origin).dot(this.direction);
		return t < 0 ? this.origin.distanceToSquared(e) : ($r.copy(this.origin).addScaledVector(this.direction, t), $r.distanceToSquared(e));
	}
	distanceSqToSegment(e, t, n, r) {
		ei.copy(e).add(t).multiplyScalar(.5), ti.copy(t).sub(e).normalize(), ni.copy(this.origin).sub(ei);
		let i = e.distanceTo(t) * .5, a = -this.direction.dot(ti), o = ni.dot(this.direction), s = -ni.dot(ti), c = ni.lengthSq(), l = Math.abs(1 - a * a), u, d, f, p;
		if (l > 0) {
			if (u = a * s - o, d = a * o - s, p = i * l, u >= 0) {
				if (d >= -p) {
					if (d <= p) {
						let e = 1 / l;
						u *= e, d *= e, f = u * (u + a * d + 2 * o) + d * (a * u + d + 2 * s) + c;
					} else d = i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
				} else d = -i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
			} else d <= -p ? (u = Math.max(0, -(-a * i + o)), d = u > 0 ? -i : Math.min(Math.max(-i, -s), i), f = -u * u + d * (d + 2 * s) + c) : d <= p ? (u = 0, d = Math.min(Math.max(-i, -s), i), f = d * (d + 2 * s) + c) : (u = Math.max(0, -(a * i + o)), d = u > 0 ? i : Math.min(Math.max(-i, -s), i), f = -u * u + d * (d + 2 * s) + c);
		} else d = a > 0 ? -i : i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
		return n && n.copy(this.origin).addScaledVector(this.direction, u), r && r.copy(ei).addScaledVector(ti, d), f;
	}
	intersectSphere(e, t) {
		if (e.radius < 0) return null;
		$r.subVectors(e.center, this.origin);
		let n = $r.dot(this.direction), r = $r.dot($r) - n * n, i = e.radius * e.radius;
		if (r > i) return null;
		let a = Math.sqrt(i - r), o = n - a, s = n + a;
		return s < 0 ? null : o < 0 ? this.at(s, t) : this.at(o, t);
	}
	intersectsSphere(e) {
		return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
	}
	distanceToPlane(e) {
		let t = e.normal.dot(this.direction);
		if (t === 0) return e.distanceToPoint(this.origin) === 0 ? 0 : null;
		let n = -(this.origin.dot(e.normal) + e.constant) / t;
		return n >= 0 ? n : null;
	}
	intersectPlane(e, t) {
		let n = this.distanceToPlane(e);
		return n === null ? null : this.at(n, t);
	}
	intersectsPlane(e) {
		let t = e.distanceToPoint(this.origin);
		return t === 0 || e.normal.dot(this.direction) * t < 0;
	}
	intersectBox(e, t) {
		let n, r, i, a, o, s, c = 1 / this.direction.x, l = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin;
		return c >= 0 ? (n = (e.min.x - d.x) * c, r = (e.max.x - d.x) * c) : (n = (e.max.x - d.x) * c, r = (e.min.x - d.x) * c), l >= 0 ? (i = (e.min.y - d.y) * l, a = (e.max.y - d.y) * l) : (i = (e.max.y - d.y) * l, a = (e.min.y - d.y) * l), n > a || i > r || ((i > n || isNaN(n)) && (n = i), (a < r || isNaN(r)) && (r = a), u >= 0 ? (o = (e.min.z - d.z) * u, s = (e.max.z - d.z) * u) : (o = (e.max.z - d.z) * u, s = (e.min.z - d.z) * u), n > s || o > r) || ((o > n || n !== n) && (n = o), (s < r || r !== r) && (r = s), r < 0) ? null : this.at(n >= 0 ? n : r, t);
	}
	intersectsBox(e) {
		return this.intersectBox(e, $r) !== null;
	}
	intersectTriangle(e, t, n, r, i) {
		let a = this.origin, o = this.direction, s = o.x, c = o.y, l = o.z, u = e.x - a.x, d = e.y - a.y, f = e.z - a.z, p = t.x - a.x, m = t.y - a.y, h = t.z - a.z, g = n.x - a.x, _ = n.y - a.y, v = n.z - a.z, y = Math.abs(s), b = Math.abs(c), x = Math.abs(l), S, C, w, T, E, D, O, k, A, j, ee, te;
		if (y >= b && y >= x ? (w = s, D = u, A = p, te = g, s >= 0 ? (S = c, C = l, T = d, E = f, O = m, k = h, j = _, ee = v) : (S = l, C = c, T = f, E = d, O = h, k = m, j = v, ee = _)) : b >= x ? (w = c, D = d, A = m, te = _, c >= 0 ? (S = l, C = s, T = f, E = u, O = h, k = p, j = v, ee = g) : (S = s, C = l, T = u, E = f, O = p, k = h, j = g, ee = v)) : (w = l, D = f, A = h, te = v, l >= 0 ? (S = s, C = c, T = u, E = d, O = p, k = m, j = g, ee = _) : (S = c, C = s, T = d, E = u, O = m, k = p, j = _, ee = g)), w === 0) return null;
		let M = S / w, N = C / w, P = 1 / w, F = T - M * D, I = E - N * D, ne = O - M * A, re = k - N * A, ie = j - M * te, ae = ee - N * te, oe = ie * re - ae * ne, L = F * ae - I * ie, se = ne * I - re * F;
		if (r) {
			if (oe < 0 || L < 0 || se < 0) return null;
		} else if ((oe < 0 || L < 0 || se < 0) && (oe > 0 || L > 0 || se > 0)) return null;
		let ce = oe + L + se;
		if (ce === 0) return null;
		let le = P * (oe * D + L * A + se * te);
		return (ce > 0 ? le < 0 : le > 0) ? null : this.at(le / ce, i);
	}
	applyMatrix4(e) {
		return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
	}
	equals(e) {
		return e.origin.equals(this.origin) && e.direction.equals(this.direction);
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, ii = class extends Ir {
	constructor(e) {
		super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Y(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new on(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
	}
}, ai = /*@__PURE__*/ new Yt(), oi = /*@__PURE__*/ new ri(), si = /*@__PURE__*/ new vr(), ci = /*@__PURE__*/ new K(), li = /*@__PURE__*/ new K(), ui = /*@__PURE__*/ new K(), di = /*@__PURE__*/ new K(), fi = /*@__PURE__*/ new K(), pi = /*@__PURE__*/ new K(), mi = /*@__PURE__*/ new K(), hi = /*@__PURE__*/ new K(), gi = class extends Cn {
	constructor(e = new Er(), t = new ii()) {
		super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
	}
	copy(e, t) {
		return super.copy(e, t), this.morphTargetInfluences = e.morphTargetInfluences === void 0 ? void 0 : e.morphTargetInfluences.slice(), this.morphTargetDictionary = e.morphTargetDictionary === void 0 ? void 0 : Object.assign({}, e.morphTargetDictionary), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
	}
	updateMorphTargets() {
		let e = this.geometry.morphAttributes, t = Object.keys(e);
		if (t.length > 0) {
			let n = e[t[0]];
			if (n !== void 0) {
				this.morphTargetInfluences = [], this.morphTargetDictionary = {};
				for (let e = 0, t = n.length; e < t; e++) {
					let t = n[e].name || String(e);
					this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
				}
			}
		}
	}
	getVertexPosition(e, t) {
		let n = this.geometry, r = n.attributes.position, i = n.morphAttributes.position, a = n.morphTargetsRelative;
		t.fromBufferAttribute(r, e);
		let o = this.morphTargetInfluences;
		if (i && o) {
			pi.set(0, 0, 0);
			for (let n = 0, r = i.length; n < r; n++) {
				let r = o[n], s = i[n];
				r !== 0 && (fi.fromBufferAttribute(s, e), a ? pi.addScaledVector(fi, r) : pi.addScaledVector(fi.sub(t), r));
			}
			t.add(pi);
		}
		return t;
	}
	intersectsFrustum(e) {
		return e.intersectsObject(this);
	}
	raycast(e, t) {
		let n = this.geometry, r = this.material, i = this.matrixWorld;
		r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), si.copy(n.boundingSphere), si.applyMatrix4(i), oi.copy(e.ray).recast(e.near), si.containsPoint(oi.origin) === !1 && (oi.intersectSphere(si, ci) === null || oi.origin.distanceToSquared(ci) > (e.far - e.near) ** 2) || (ai.copy(i).invert(), oi.copy(e.ray).applyMatrix4(ai), (n.boundingBox === null || oi.intersectsBox(n.boundingBox) !== !1) && this._computeIntersections(e, t, oi)));
	}
	_computeIntersections(e, t, n) {
		let r, i = this.geometry, a = this.material, o = i.index, s = i.attributes.position, c = i.attributes.uv, l = i.attributes.uv1, u = i.attributes.normal, d = i.groups, f = i.drawRange;
		if (o !== null) {
			if (Array.isArray(a)) for (let i = 0, s = d.length; i < s; i++) {
				let s = d[i], p = a[s.materialIndex], m = Math.max(s.start, f.start), h = Math.min(o.count, Math.min(s.start + s.count, f.start + f.count));
				for (let i = m, a = h; i < a; i += 3) {
					let a = o.getX(i), d = o.getX(i + 1), f = o.getX(i + 2);
					r = vi(this, p, e, n, c, l, u, a, d, f), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = s.materialIndex, t.push(r));
				}
			}
			else {
				let i = Math.max(0, f.start), s = Math.min(o.count, f.start + f.count);
				for (let d = i, f = s; d < f; d += 3) {
					let i = o.getX(d), s = o.getX(d + 1), f = o.getX(d + 2);
					r = vi(this, a, e, n, c, l, u, i, s, f), r && (r.faceIndex = Math.floor(d / 3), t.push(r));
				}
			}
		} else if (s !== void 0) {
			if (Array.isArray(a)) for (let i = 0, o = d.length; i < o; i++) {
				let o = d[i], p = a[o.materialIndex], m = Math.max(o.start, f.start), h = Math.min(s.count, Math.min(o.start + o.count, f.start + f.count));
				for (let i = m, a = h; i < a; i += 3) {
					let a = i, s = i + 1, d = i + 2;
					r = vi(this, p, e, n, c, l, u, a, s, d), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = o.materialIndex, t.push(r));
				}
			}
			else {
				let i = Math.max(0, f.start), o = Math.min(s.count, f.start + f.count);
				for (let s = i, d = o; s < d; s += 3) {
					let i = s, o = s + 1, d = s + 2;
					r = vi(this, a, e, n, c, l, u, i, o, d), r && (r.faceIndex = Math.floor(s / 3), t.push(r));
				}
			}
		}
	}
};
function _i(e, t, n, r, i, a, o, s) {
	let c;
	if (c = t.side === 1 ? r.intersectTriangle(o, a, i, !0, s) : r.intersectTriangle(i, a, o, t.side === 0, s), c === null) return null;
	hi.copy(s), hi.applyMatrix4(e.matrixWorld);
	let l = n.ray.origin.distanceTo(hi);
	return l < n.near || l > n.far ? null : {
		distance: l,
		point: hi.clone(),
		object: e
	};
}
function vi(e, t, n, r, i, a, o, s, c, l) {
	e.getVertexPosition(s, li), e.getVertexPosition(c, ui), e.getVertexPosition(l, di);
	let u = _i(e, t, n, r, li, ui, di, mi);
	if (u) {
		let e = new K();
		Kn.getBarycoord(mi, li, ui, di, e), i && (u.uv = Kn.getInterpolatedAttribute(i, s, c, l, e, new G())), a && (u.uv1 = Kn.getInterpolatedAttribute(a, s, c, l, e, new G())), o && (u.normal = Kn.getInterpolatedAttribute(o, s, c, l, e, new K()), u.normal.dot(r.direction) > 0 && u.normal.multiplyScalar(-1));
		let t = {
			a: s,
			b: c,
			c: l,
			normal: new K(),
			materialIndex: 0
		};
		Kn.getNormal(li, ui, di, t.normal), u.face = t, u.barycoord = e;
	}
	return u;
}
var yi = class extends Ut {
	constructor(e = null, t = 1, n = 1, r, i, o, s, c, l = a, u = a, d, f) {
		super(null, o, s, c, l, u, r, i, d, f), this.isDataTexture = !0, this.image = {
			data: e,
			width: t,
			height: n
		}, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
	}
}, bi = class extends dr {
	constructor(e, t, n, r = 1) {
		super(e, t, n), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = r;
	}
	copy(e) {
		return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e;
	}
}, xi = /*@__PURE__*/ new Yt(), Si = /*@__PURE__*/ new Yt(), Ci = [], wi = /*@__PURE__*/ new qn(), Ti = /*@__PURE__*/ new Yt(), Ei = /*@__PURE__*/ new gi(), Di = /*@__PURE__*/ new vr(), Oi = class extends gi {
	constructor(e, t, n) {
		super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new bi(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
		for (let e = 0; e < n; e++) this.setMatrixAt(e, Ti);
	}
	computeBoundingBox() {
		let e = this.geometry, t = this.count;
		this.boundingBox === null && (this.boundingBox = new qn()), e.boundingBox === null && e.computeBoundingBox(), this.boundingBox.makeEmpty();
		for (let n = 0; n < t; n++) this.getMatrixAt(n, xi), wi.copy(e.boundingBox).applyMatrix4(xi), this.boundingBox.union(wi);
	}
	computeBoundingSphere() {
		let e = this.geometry, t = this.count;
		this.boundingSphere === null && (this.boundingSphere = new vr()), e.boundingSphere === null && e.computeBoundingSphere(), this.boundingSphere.makeEmpty();
		for (let n = 0; n < t; n++) this.getMatrixAt(n, xi), Di.copy(e.boundingSphere).applyMatrix4(xi), this.boundingSphere.union(Di);
	}
	copy(e, t) {
		return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), this.morphTexture = e.morphTexture === null ? null : e.morphTexture.clone(), this.instanceColor = e.instanceColor === null ? null : e.instanceColor.clone(), this.count = e.count, this.boundingBox = e.boundingBox === null ? null : e.boundingBox.clone(), this.boundingSphere = e.boundingSphere === null ? null : e.boundingSphere.clone(), this;
	}
	getColorAt(e, t) {
		return this.instanceColor === null ? t.setRGB(1, 1, 1) : t.fromArray(this.instanceColor.array, e * 3);
	}
	getMatrixAt(e, t) {
		return t.fromArray(this.instanceMatrix.array, e * 16);
	}
	getMorphAt(e, t) {
		let n = t.morphTargetInfluences, r = this.morphTexture.source.data.data, i = e * (n.length + 1) + 1;
		for (let e = 0; e < n.length; e++) n[e] = r[i + e];
	}
	raycast(e, t) {
		let n = this.matrixWorld, r = this.count;
		if (Ei.geometry = this.geometry, Ei.material = this.material, Ei.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Di.copy(this.boundingSphere), Di.applyMatrix4(n), e.ray.intersectsSphere(Di) !== !1)) for (let i = 0; i < r; i++) {
			this.getMatrixAt(i, xi), Si.multiplyMatrices(n, xi), Ei.matrixWorld = Si, Ei.raycast(e, Ci);
			for (let e = 0, n = Ci.length; e < n; e++) {
				let n = Ci[e];
				n.instanceId = i, n.object = this, t.push(n);
			}
			Ci.length = 0;
		}
	}
	setColorAt(e, t) {
		return this.instanceColor === null && (this.instanceColor = new bi(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), t.toArray(this.instanceColor.array, e * 3), this;
	}
	setMatrixAt(e, t) {
		return t.toArray(this.instanceMatrix.array, e * 16), this;
	}
	setMorphAt(e, t) {
		let n = t.morphTargetInfluences, r = n.length + 1;
		this.morphTexture === null && (this.morphTexture = new yi(new Float32Array(r * this.count), r, this.count, k, _));
		let i = this.morphTexture.source.data.data, a = 0;
		for (let e = 0; e < n.length; e++) a += n[e];
		let o = this.geometry.morphTargetsRelative ? 1 : 1 - a, s = r * e;
		return i[s] = o, i.set(n, s + 1), this;
	}
	updateMorphTargets() {}
	dispose() {
		super.dispose(), this.instanceMatrix.dispose(), this.instanceColor !== null && this.instanceColor.dispose(), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null);
	}
}, ki = /*@__PURE__*/ new vr(), Ai = /*@__PURE__*/ new G(.5, .5), ji = /*@__PURE__*/ new K(), Mi = class {
	constructor(e = new Pr(), t = new Pr(), n = new Pr(), r = new Pr(), i = new Pr(), a = new Pr()) {
		this.planes = [
			e,
			t,
			n,
			r,
			i,
			a
		];
	}
	set(e, t, n, r, i, a) {
		let o = this.planes;
		return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(r), o[4].copy(i), o[5].copy(a), this;
	}
	copy(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) t[n].copy(e.planes[n]);
		return this;
	}
	setFromProjectionMatrix(e, t = He, n = !1) {
		let r = this.planes, i = e.elements, a = i[0], o = i[1], s = i[2], c = i[3], l = i[4], u = i[5], d = i[6], f = i[7], p = i[8], m = i[9], h = i[10], g = i[11], _ = i[12], v = i[13], y = i[14], b = i[15];
		if (r[0].setComponents(c - a, f - l, g - p, b - _).normalize(), r[1].setComponents(c + a, f + l, g + p, b + _).normalize(), r[2].setComponents(c + o, f + u, g + m, b + v).normalize(), r[3].setComponents(c - o, f - u, g - m, b - v).normalize(), n) r[4].setComponents(s, d, h, y).normalize(), r[5].setComponents(c - s, f - d, g - h, b - y).normalize();
		else if (r[4].setComponents(c - s, f - d, g - h, b - y).normalize(), t === 2e3) r[5].setComponents(c + s, f + d, g + h, b + y).normalize();
		else if (t === 2001) r[5].setComponents(s, d, h, y).normalize();
		else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
		return this;
	}
	intersectsObject(e) {
		if (e.boundingSphere !== void 0) e.boundingSphere === null && e.computeBoundingSphere(), ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
		else {
			let t = e.geometry;
			t.boundingSphere === null && t.computeBoundingSphere(), ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
		}
		return this.intersectsSphere(ki);
	}
	intersectsSprite(e) {
		return ki.center.set(0, 0, 0), ki.radius = .7071067811865476 + Ai.distanceTo(e.center), ki.applyMatrix4(e.matrixWorld), this.intersectsSphere(ki);
	}
	intersectsSphere(e) {
		let t = this.planes, n = e.center, r = -e.radius;
		for (let e = 0; e < 6; e++) if (t[e].distanceToPoint(n) < r) return !1;
		return !0;
	}
	intersectsBox(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) {
			let r = t[n];
			if (ji.x = r.normal.x > 0 ? e.max.x : e.min.x, ji.y = r.normal.y > 0 ? e.max.y : e.min.y, ji.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(ji) < 0) return !1;
		}
		return !0;
	}
	containsPoint(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) if (t[n].distanceToPoint(e) < 0) return !1;
		return !0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, Ni = /*@__PURE__*/ new Yt(), Pi = class e {
	constructor() {
		this.coordinateSystem = He, this._frustums = [], this._count = 0;
	}
	setFromArrayCamera(e) {
		let t = e.cameras, n = this._frustums;
		for (let e = 0; e < t.length; e++) {
			let r = t[e];
			Ni.multiplyMatrices(r.projectionMatrix, r.matrixWorldInverse), n[e] === void 0 && (n[e] = new Mi()), n[e].setFromProjectionMatrix(Ni, r.coordinateSystem, r.reversedDepth);
		}
		return this._count = t.length, this;
	}
	getFrustum(e) {
		return this._frustums[e];
	}
	intersectsObject(e) {
		let t = this._frustums;
		for (let n = 0; n < this._count; n++) if (t[n].intersectsObject(e)) return !0;
		return !1;
	}
	intersectsSprite(e) {
		let t = this._frustums;
		for (let n = 0; n < this._count; n++) if (t[n].intersectsSprite(e)) return !0;
		return !1;
	}
	intersectsSphere(e) {
		let t = this._frustums;
		for (let n = 0; n < this._count; n++) if (t[n].intersectsSphere(e)) return !0;
		return !1;
	}
	intersectsBox(e) {
		let t = this._frustums;
		for (let n = 0; n < this._count; n++) if (t[n].intersectsBox(e)) return !0;
		return !1;
	}
	containsPoint(e) {
		let t = this._frustums;
		for (let n = 0; n < this._count; n++) if (t[n].containsPoint(e)) return !0;
		return !1;
	}
	copy(e) {
		this.coordinateSystem = e.coordinateSystem;
		let t = this._frustums, n = e._frustums;
		for (let r = 0; r < e._count; r++) t[r] === void 0 && (t[r] = new Mi()), t[r].copy(n[r]);
		return this._count = e._count, this;
	}
	clone() {
		return new e().copy(this);
	}
}, Fi = class extends Ir {
	constructor(e) {
		super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new Y(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this;
	}
}, Ii = /*@__PURE__*/ new K(), Li = /*@__PURE__*/ new K(), Ri = /*@__PURE__*/ new Yt(), zi = /*@__PURE__*/ new ri(), Bi = /*@__PURE__*/ new vr(), Vi = /*@__PURE__*/ new K(), Hi = /*@__PURE__*/ new K(), Ui = class extends Cn {
	constructor(e = new Er(), t = new Fi()) {
		super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
	}
	copy(e, t) {
		return super.copy(e, t), this.morphTargetInfluences = e.morphTargetInfluences === void 0 ? void 0 : e.morphTargetInfluences.slice(), this.morphTargetDictionary = e.morphTargetDictionary === void 0 ? void 0 : Object.assign({}, e.morphTargetDictionary), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
	}
	computeLineDistances() {
		let e = this.geometry;
		if (e.index === null) {
			let t = e.attributes.position, n = [0];
			for (let e = 1, r = t.count; e < r; e++) Ii.fromBufferAttribute(t, e - 1), Li.fromBufferAttribute(t, e), n[e] = n[e - 1], n[e] += Ii.distanceTo(Li);
			e.setAttribute("lineDistance", new mr(n, 1));
		} else H("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
		return this;
	}
	intersectsFrustum(e) {
		return e.intersectsObject(this);
	}
	raycast(e, t) {
		let n = this.geometry, r = this.matrixWorld, i = e.params.Line.threshold, a = n.drawRange;
		if (n.boundingSphere === null && n.computeBoundingSphere(), Bi.copy(n.boundingSphere), Bi.applyMatrix4(r), Bi.radius += i, e.ray.intersectsSphere(Bi) === !1) return;
		Ri.copy(r).invert(), zi.copy(e.ray).applyMatrix4(Ri);
		let o = i / ((this.scale.x + this.scale.y + this.scale.z) / 3), s = o * o, c = this.isLineSegments ? 2 : 1, l = n.index, u = n.attributes.position;
		if (l !== null) {
			let n = Math.max(0, a.start), r = Math.min(l.count, a.start + a.count);
			for (let i = n, a = r - 1; i < a; i += c) {
				let n = l.getX(i), r = l.getX(i + 1), a = Wi(this, e, zi, s, n, r, i);
				a && t.push(a);
			}
			if (this.isLineLoop) {
				let i = l.getX(r - 1), a = l.getX(n), o = Wi(this, e, zi, s, i, a, r - 1);
				o && t.push(o);
			}
		} else {
			let n = Math.max(0, a.start), r = Math.min(u.count, a.start + a.count);
			for (let i = n, a = r - 1; i < a; i += c) {
				let n = Wi(this, e, zi, s, i, i + 1, i);
				n && t.push(n);
			}
			if (this.isLineLoop) {
				let i = Wi(this, e, zi, s, r - 1, n, r - 1);
				i && t.push(i);
			}
		}
	}
	updateMorphTargets() {
		let e = this.geometry.morphAttributes, t = Object.keys(e);
		if (t.length > 0) {
			let n = e[t[0]];
			if (n !== void 0) {
				this.morphTargetInfluences = [], this.morphTargetDictionary = {};
				for (let e = 0, t = n.length; e < t; e++) {
					let t = n[e].name || String(e);
					this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
				}
			}
		}
	}
};
function Wi(e, t, n, r, i, a, o) {
	let s = e.geometry.attributes.position;
	if (Ii.fromBufferAttribute(s, i), Li.fromBufferAttribute(s, a), n.distanceSqToSegment(Ii, Li, Vi, Hi) > r) return;
	Vi.applyMatrix4(e.matrixWorld);
	let c = t.ray.origin.distanceTo(Vi);
	if (!(c < t.near || c > t.far)) return {
		distance: c,
		point: Hi.clone().applyMatrix4(e.matrixWorld),
		index: o,
		face: null,
		faceIndex: null,
		barycoord: null,
		object: e
	};
}
var Gi = /*@__PURE__*/ new K(), Ki = /*@__PURE__*/ new K(), qi = class extends Ui {
	constructor(e, t) {
		super(e, t), this.isLineSegments = !0, this.type = "LineSegments";
	}
	computeLineDistances() {
		let e = this.geometry;
		if (e.index === null) {
			let t = e.attributes.position, n = [];
			for (let e = 0, r = t.count; e < r; e += 2) Gi.fromBufferAttribute(t, e), Ki.fromBufferAttribute(t, e + 1), n[e] = e === 0 ? 0 : n[e - 1], n[e + 1] = n[e] + Gi.distanceTo(Ki);
			e.setAttribute("lineDistance", new mr(n, 1));
		} else H("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
		return this;
	}
}, Ji = class extends Ut {
	constructor(e = [], t = 301, n, r, i, a, o, s, c, l) {
		super(e, t, n, r, i, a, o, s, c, l), this.isCubeTexture = !0, this.flipY = !1;
	}
	get images() {
		return this.image;
	}
	set images(e) {
		this.image = e;
	}
}, Yi = class extends Ut {
	constructor(e, t, n, r, i, a, o, s, c) {
		super(e, t, n, r, i, a, o, s, c), this.isCanvasTexture = !0, this.needsUpdate = !0;
	}
}, Xi = class extends Ut {
	constructor(e, t, n = g, r, i, o, s = a, c = a, l, u = D, d = 1) {
		if (u !== 1026 && u !== 1027) throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
		super({
			width: e,
			height: t,
			depth: d
		}, r, i, o, s, c, u, n, l), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
	}
	copy(e) {
		return super.copy(e), this.source = new zt(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.compareFunction = this.compareFunction, t;
	}
}, Zi = class extends Xi {
	constructor(e, t = g, n = 301, r, i, o = a, s = a, c, l = D) {
		let u = {
			width: e,
			height: e,
			depth: 1
		}, d = [
			u,
			u,
			u,
			u,
			u,
			u
		];
		super(e, e, t, n, r, i, o, s, c, l), this.image = d, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
	}
	get images() {
		return this.image;
	}
	set images(e) {
		this.image = e;
	}
}, Qi = class extends Ut {
	constructor(e = null) {
		super(), this.sourceTexture = e, this.isExternalTexture = !0;
	}
	copy(e) {
		return super.copy(e), this.sourceTexture = e.sourceTexture, this;
	}
}, $i = class e extends Er {
	constructor(e = 1, t = 1, n = 1, r = 1, i = 1, a = 1) {
		super(), this.type = "BoxGeometry", this.parameters = {
			width: e,
			height: t,
			depth: n,
			widthSegments: r,
			heightSegments: i,
			depthSegments: a
		};
		let o = this;
		r = Math.floor(r), i = Math.floor(i), a = Math.floor(a);
		let s = [], c = [], l = [], u = [], d = 0, f = 0;
		p("z", "y", "x", -1, -1, n, t, e, a, i, 0), p("z", "y", "x", 1, -1, n, t, -e, a, i, 1), p("x", "z", "y", 1, 1, e, n, t, r, a, 2), p("x", "z", "y", 1, -1, e, n, -t, r, a, 3), p("x", "y", "z", 1, -1, e, t, n, r, i, 4), p("x", "y", "z", -1, -1, e, t, -n, r, i, 5), this.setIndex(s), this.setAttribute("position", new mr(c, 3)), this.setAttribute("normal", new mr(l, 3)), this.setAttribute("uv", new mr(u, 2));
		function p(e, t, n, r, i, a, p, m, h, g, _) {
			let v = a / h, y = p / g, b = a / 2, x = p / 2, S = m / 2, C = h + 1, w = g + 1, T = 0, E = 0, D = new K();
			for (let a = 0; a < w; a++) {
				let o = a * y - x;
				for (let s = 0; s < C; s++) D[e] = (s * v - b) * r, D[t] = o * i, D[n] = S, c.push(D.x, D.y, D.z), D[e] = 0, D[t] = 0, D[n] = m > 0 ? 1 : -1, l.push(D.x, D.y, D.z), u.push(s / h), u.push(1 - a / g), T += 1;
			}
			for (let e = 0; e < g; e++) for (let t = 0; t < h; t++) {
				let n = d + t + C * e, r = d + t + C * (e + 1), i = d + (t + 1) + C * (e + 1), a = d + (t + 1) + C * e;
				s.push(n, r, a), s.push(r, i, a), E += 6;
			}
			o.addGroup(f, E, _), f += E, d += T;
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
	}
}, ea = class e extends Er {
	constructor(e = 1, t = 32, n = 0, r = Math.PI * 2) {
		super(), this.type = "CircleGeometry", this.parameters = {
			radius: e,
			segments: t,
			thetaStart: n,
			thetaLength: r
		}, t = Math.max(3, t);
		let i = [], a = [], o = [], s = [], c = new K(), l = new G();
		a.push(0, 0, 0), o.push(0, 0, 1), s.push(.5, .5);
		for (let i = 0, u = 3; i <= t; i++, u += 3) {
			let d = n + i / t * r;
			c.x = e * Math.cos(d), c.y = e * Math.sin(d), a.push(c.x, c.y, c.z), o.push(0, 0, 1), l.x = (a[u] / e + 1) / 2, l.y = (a[u + 1] / e + 1) / 2, s.push(l.x, l.y);
		}
		for (let e = 1; e <= t; e++) i.push(e, e + 1, 0);
		this.setIndex(i), this.setAttribute("position", new mr(a, 3)), this.setAttribute("normal", new mr(o, 3)), this.setAttribute("uv", new mr(s, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.segments, t.thetaStart, t.thetaLength);
	}
}, ta = class e extends Er {
	constructor(e = 1, t = 1, n = 1, r = 32, i = 1, a = !1, o = 0, s = Math.PI * 2) {
		super(), this.type = "CylinderGeometry", this.parameters = {
			radiusTop: e,
			radiusBottom: t,
			height: n,
			radialSegments: r,
			heightSegments: i,
			openEnded: a,
			thetaStart: o,
			thetaLength: s
		};
		let c = this;
		r = Math.floor(r), i = Math.floor(i);
		let l = [], u = [], d = [], f = [], p = 0, m = [], h = n / 2, g = 0;
		_(), a === !1 && (e > 0 && v(!0), t > 0 && v(!1)), this.setIndex(l), this.setAttribute("position", new mr(u, 3)), this.setAttribute("normal", new mr(d, 3)), this.setAttribute("uv", new mr(f, 2));
		function _() {
			let a = new K(), _ = new K(), v = 0, y = (t - e) / n;
			for (let c = 0; c <= i; c++) {
				let l = [], g = c / i, v = g * (t - e) + e;
				for (let e = 0; e <= r; e++) {
					let t = e / r, i = t * s + o, c = Math.sin(i), m = Math.cos(i);
					_.x = v * c, _.y = -g * n + h, _.z = v * m, u.push(_.x, _.y, _.z), a.set(c, y, m).normalize(), d.push(a.x, a.y, a.z), f.push(t, 1 - g), l.push(p++);
				}
				m.push(l);
			}
			for (let n = 0; n < r; n++) for (let r = 0; r < i; r++) {
				let a = m[r][n], o = m[r + 1][n], s = m[r + 1][n + 1], c = m[r][n + 1];
				(e > 0 || r !== 0) && (l.push(a, o, c), v += 3), (t > 0 || r !== i - 1) && (l.push(o, s, c), v += 3);
			}
			c.addGroup(g, v, 0), g += v;
		}
		function v(n) {
			let i = p, a = new G(), m = new K(), _ = 0, v = n === !0 ? e : t, y = n === !0 ? 1 : -1;
			for (let e = 1; e <= r; e++) u.push(0, h * y, 0), d.push(0, y, 0), f.push(.5, .5), p++;
			let b = p;
			for (let e = 0; e <= r; e++) {
				let t = e / r * s + o, n = Math.cos(t), i = Math.sin(t);
				m.x = v * i, m.y = h * y, m.z = v * n, u.push(m.x, m.y, m.z), d.push(0, y, 0), a.x = n * .5 + .5, a.y = i * .5 * y + .5, f.push(a.x, a.y), p++;
			}
			for (let e = 0; e < r; e++) {
				let t = i + e, r = b + e;
				n === !0 ? l.push(r, r + 1, t) : l.push(r + 1, r, t), _ += 3;
			}
			c.addGroup(g, _, n === !0 ? 1 : 2), g += _;
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
	}
}, na = /*@__PURE__*/ new K(), ra = /*@__PURE__*/ new K(), ia = /*@__PURE__*/ new K(), aa = /*@__PURE__*/ new Kn(), oa = class extends Er {
	constructor(e = null, t = 1) {
		if (super(), this.type = "EdgesGeometry", this.parameters = {
			geometry: e,
			thresholdAngle: t
		}, e !== null) {
			let n = 1e4, r = Math.cos(nt * t), i = e.getIndex(), a = e.getAttribute("position"), o = i ? i.count : a.count, s = [
				0,
				0,
				0
			], c = [
				"a",
				"b",
				"c"
			], l = [
				,
				,
				,
			], u = /* @__PURE__ */ new Map(), d = [];
			for (let e = 0; e < o; e += 3) {
				i ? (s[0] = i.getX(e), s[1] = i.getX(e + 1), s[2] = i.getX(e + 2)) : (s[0] = e, s[1] = e + 1, s[2] = e + 2);
				let { a: t, b: o, c: f } = aa;
				if (t.fromBufferAttribute(a, s[0]), o.fromBufferAttribute(a, s[1]), f.fromBufferAttribute(a, s[2]), aa.getNormal(ia), l[0] = `${Math.round(t.x * n)},${Math.round(t.y * n)},${Math.round(t.z * n)}`, l[1] = `${Math.round(o.x * n)},${Math.round(o.y * n)},${Math.round(o.z * n)}`, l[2] = `${Math.round(f.x * n)},${Math.round(f.y * n)},${Math.round(f.z * n)}`, l[0] !== l[1] && l[1] !== l[2] && l[2] !== l[0]) for (let e = 0; e < 3; e++) {
					let t = (e + 1) % 3, n = l[e], i = l[t], a = aa[c[e]], o = aa[c[t]], f = `${n}_${i}`, p = `${i}_${n}`, m = u.get(p);
					m ? (ia.dot(m.normal) <= r && (d.push(a.x, a.y, a.z), d.push(o.x, o.y, o.z)), u.set(p, null)) : u.has(f) || u.set(f, {
						index0: s[e],
						index1: s[t],
						normal: ia.clone()
					});
				}
			}
			for (let e of u.values()) if (e) {
				let { index0: t, index1: n } = e;
				na.fromBufferAttribute(a, t), ra.fromBufferAttribute(a, n), d.push(na.x, na.y, na.z), d.push(ra.x, ra.y, ra.z);
			}
			this.setAttribute("position", new mr(d, 3));
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
}, sa = class e extends Er {
	constructor(e = 1, t = 1, n = 1, r = 1) {
		super(), this.type = "PlaneGeometry", this.parameters = {
			width: e,
			height: t,
			widthSegments: n,
			heightSegments: r
		};
		let i = e / 2, a = t / 2, o = Math.floor(n), s = Math.floor(r), c = o + 1, l = s + 1, u = e / o, d = t / s, f = [], p = [], m = [], h = [];
		for (let e = 0; e < l; e++) {
			let t = e * d - a;
			for (let n = 0; n < c; n++) {
				let r = n * u - i;
				p.push(r, -t, 0), m.push(0, 0, 1), h.push(n / o), h.push(1 - e / s);
			}
		}
		for (let e = 0; e < s; e++) for (let t = 0; t < o; t++) {
			let n = t + c * e, r = t + c * (e + 1), i = t + 1 + c * (e + 1), a = t + 1 + c * e;
			f.push(n, r, a), f.push(r, i, a);
		}
		this.setIndex(f), this.setAttribute("position", new mr(p, 3)), this.setAttribute("normal", new mr(m, 3)), this.setAttribute("uv", new mr(h, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.width, t.height, t.widthSegments, t.heightSegments);
	}
}, ca = class e extends Er {
	constructor(e = 1, t = 32, n = 16, r = 0, i = Math.PI * 2, a = 0, o = Math.PI) {
		super(), this.type = "SphereGeometry", this.parameters = {
			radius: e,
			widthSegments: t,
			heightSegments: n,
			phiStart: r,
			phiLength: i,
			thetaStart: a,
			thetaLength: o
		}, t = Math.max(3, Math.floor(t)), n = Math.max(2, Math.floor(n));
		let s = Math.min(a + o, Math.PI), c = 0, l = [], u = new K(), d = new K(), f = [], p = [], m = [], h = [];
		for (let f = 0; f <= n; f++) {
			let g = [], _ = f / n, v = a + _ * o, y = e * Math.cos(v), b = Math.sqrt(e * e - y * y), x = 0;
			f === 0 && a === 0 ? x = .5 / t : f === n && s === Math.PI && (x = -.5 / t);
			for (let e = 0; e <= t; e++) {
				let n = e / t, a = r + n * i;
				u.x = -b * Math.cos(a), u.y = y, u.z = b * Math.sin(a), p.push(u.x, u.y, u.z), d.copy(u).normalize(), m.push(d.x, d.y, d.z), h.push(n + x, 1 - _), g.push(c++);
			}
			l.push(g);
		}
		for (let e = 0; e < n; e++) for (let r = 0; r < t; r++) {
			let t = l[e][r + 1], i = l[e][r], o = l[e + 1][r], c = l[e + 1][r + 1];
			(e !== 0 || a > 0) && f.push(t, i, c), (e !== n - 1 || s < Math.PI) && f.push(i, o, c);
		}
		this.setIndex(f), this.setAttribute("position", new mr(p, 3)), this.setAttribute("normal", new mr(m, 3)), this.setAttribute("uv", new mr(h, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
	}
}, la = class e extends Er {
	constructor(e = 1, t = .4, n = 12, r = 48, i = Math.PI * 2, a = 0, o = Math.PI * 2) {
		super(), this.type = "TorusGeometry", this.parameters = {
			radius: e,
			tube: t,
			radialSegments: n,
			tubularSegments: r,
			arc: i,
			thetaStart: a,
			thetaLength: o
		}, n = Math.floor(n), r = Math.floor(r);
		let s = [], c = [], l = [], u = [], d = new K(), f = new K(), p = new K();
		for (let s = 0; s <= n; s++) {
			let m = a + s / n * o;
			for (let a = 0; a <= r; a++) {
				let o = a / r * i;
				f.x = (e + t * Math.cos(m)) * Math.cos(o), f.y = (e + t * Math.cos(m)) * Math.sin(o), f.z = t * Math.sin(m), c.push(f.x, f.y, f.z), d.x = e * Math.cos(o), d.y = e * Math.sin(o), p.subVectors(f, d).normalize(), l.push(p.x, p.y, p.z), u.push(a / r), u.push(s / n);
			}
		}
		for (let e = 1; e <= n; e++) for (let t = 1; t <= r; t++) {
			let n = (r + 1) * e + t - 1, i = (r + 1) * (e - 1) + t - 1, a = (r + 1) * (e - 1) + t, o = (r + 1) * e + t;
			s.push(n, i, o), s.push(i, a, o);
		}
		this.setIndex(s), this.setAttribute("position", new mr(c, 3)), this.setAttribute("normal", new mr(l, 3)), this.setAttribute("uv", new mr(u, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc, t.thetaStart, t.thetaLength);
	}
};
function ua(e) {
	let t = {};
	for (let n in e) {
		t[n] = {};
		for (let r in e[n]) {
			let i = e[n][r];
			if (fa(i)) i.isRenderTargetTexture ? (H("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[n][r] = null) : t[n][r] = i.clone();
			else if (Array.isArray(i)) {
				if (fa(i[0])) {
					let e = [];
					for (let t = 0, n = i.length; t < n; t++) e[t] = i[t].clone();
					t[n][r] = e;
				} else t[n][r] = i.slice();
			} else t[n][r] = i;
		}
	}
	return t;
}
function da(e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = ua(e[n]);
		for (let e in r) t[e] = r[e];
	}
	return t;
}
function fa(e) {
	return e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture || e.isQuaternion);
}
function pa(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) t.push(e[n].clone());
	return t;
}
function ma(e) {
	let t = e.getRenderTarget();
	return t === null ? e.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : J.workingColorSpace;
}
var ha = {
	clone: ua,
	merge: da
}, ga = "void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", _a = "void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", va = class extends Ir {
	constructor(e) {
		super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = ga, this.fragmentShader = _a, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
			clipCullDistance: !1,
			multiDraw: !1
		}, this.defaultAttributeValues = {
			color: [
				1,
				1,
				1
			],
			uv: [0, 0],
			uv1: [0, 0]
		}, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = ua(e.uniforms), this.uniformsGroups = pa(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		t.glslVersion = this.glslVersion, t.uniforms = {};
		for (let n in this.uniforms) {
			let r = this.uniforms[n].value;
			r && r.isTexture ? t.uniforms[n] = {
				type: "t",
				value: r.toJSON(e).uuid
			} : r && r.isColor ? t.uniforms[n] = {
				type: "c",
				value: r.getHex()
			} : r && r.isVector2 ? t.uniforms[n] = {
				type: "v2",
				value: r.toArray()
			} : r && r.isVector3 ? t.uniforms[n] = {
				type: "v3",
				value: r.toArray()
			} : r && r.isVector4 ? t.uniforms[n] = {
				type: "v4",
				value: r.toArray()
			} : r && r.isMatrix3 ? t.uniforms[n] = {
				type: "m3",
				value: r.toArray()
			} : r && r.isMatrix4 ? t.uniforms[n] = {
				type: "m4",
				value: r.toArray()
			} : t.uniforms[n] = { value: r };
		}
		Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
		let n = {};
		for (let e in this.extensions) this.extensions[e] === !0 && (n[e] = !0);
		return Object.keys(n).length > 0 && (t.extensions = n), t;
	}
	fromJSON(e, t) {
		if (super.fromJSON(e, t), e.uniforms !== void 0) for (let n in e.uniforms) {
			let r = e.uniforms[n];
			switch (this.uniforms[n] = {}, r.type) {
				case "t":
					this.uniforms[n].value = t[r.value] || null;
					break;
				case "c":
					this.uniforms[n].value = new Y().setHex(r.value);
					break;
				case "v2":
					this.uniforms[n].value = new G().fromArray(r.value);
					break;
				case "v3":
					this.uniforms[n].value = new K().fromArray(r.value);
					break;
				case "v4":
					this.uniforms[n].value = new Wt().fromArray(r.value);
					break;
				case "m3":
					this.uniforms[n].value = new q().fromArray(r.value);
					break;
				case "m4":
					this.uniforms[n].value = new Yt().fromArray(r.value);
					break;
				default: this.uniforms[n].value = r.value;
			}
		}
		if (e.defines !== void 0 && (this.defines = e.defines), e.vertexShader !== void 0 && (this.vertexShader = e.vertexShader), e.fragmentShader !== void 0 && (this.fragmentShader = e.fragmentShader), e.glslVersion !== void 0 && (this.glslVersion = e.glslVersion), e.extensions !== void 0) for (let t in e.extensions) this.extensions[t] = e.extensions[t];
		return e.lights !== void 0 && (this.lights = e.lights), e.clipping !== void 0 && (this.clipping = e.clipping), this;
	}
}, ya = class extends va {
	constructor(e) {
		super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
	}
}, ba = class extends Ir {
	constructor(e) {
		super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = { STANDARD: "" }, this.color = new Y(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Y(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new G(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new on(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
	}
}, xa = class extends ba {
	constructor(e) {
		super(), this.isMeshPhysicalMaterial = !0, this.defines = {
			STANDARD: "",
			PHYSICAL: ""
		}, this.type = "MeshPhysicalMaterial", this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new G(1, 1), this.clearcoatNormalMap = null, this.diffuseRoughnessMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
			get: function() {
				return W(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
			},
			set: function(e) {
				this.ior = (1 + .4 * e) / (1 - .4 * e);
			}
		}), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessMinimum = 100, this.iridescenceThicknessMaximum = 400, this.iridescenceThicknessMap = null, this.sheenColor = new Y(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = Infinity, this.attenuationColor = new Y(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new Y(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._diffuseRoughness = 0, this._dispersion = 0, this._iridescence = 0, this._retroreflectivity = 0, this._sheen = 0, this._transmission = 0, this.setValues(e);
	}
	get anisotropy() {
		return this._anisotropy;
	}
	set anisotropy(e) {
		this._anisotropy > 0 != e > 0 && this.version++, this._anisotropy = e;
	}
	get clearcoat() {
		return this._clearcoat;
	}
	set clearcoat(e) {
		this._clearcoat > 0 != e > 0 && this.version++, this._clearcoat = e;
	}
	get diffuseRoughness() {
		return this._diffuseRoughness;
	}
	set diffuseRoughness(e) {
		this._diffuseRoughness > 0 != e > 0 && this.version++, this._diffuseRoughness = e;
	}
	get iridescence() {
		return this._iridescence;
	}
	set iridescence(e) {
		this._iridescence > 0 != e > 0 && this.version++, this._iridescence = e;
	}
	get dispersion() {
		return this._dispersion;
	}
	set dispersion(e) {
		this._dispersion > 0 != e > 0 && this.version++, this._dispersion = e;
	}
	get retroreflectivity() {
		return this._retroreflectivity;
	}
	set retroreflectivity(e) {
		this._retroreflectivity > 0 != e > 0 && this.version++, this._retroreflectivity = e;
	}
	get sheen() {
		return this._sheen;
	}
	set sheen(e) {
		this._sheen > 0 != e > 0 && this.version++, this._sheen = e;
	}
	get transmission() {
		return this._transmission;
	}
	set transmission(e) {
		this._transmission > 0 != e > 0 && this.version++, this._transmission = e;
	}
	get iridescenceThicknessRange() {
		return Xe("MeshPhysicalMaterial: The \"iridescenceThicknessRange\" property has been replaced by \"iridescenceThicknessMinimum\" and \"iridescenceThicknessMaximum\"."), [this.iridescenceThicknessMinimum, this.iridescenceThicknessMaximum];
	}
	set iridescenceThicknessRange(e) {
		Xe("MeshPhysicalMaterial: The \"iridescenceThicknessRange\" property has been replaced by \"iridescenceThicknessMinimum\" and \"iridescenceThicknessMaximum\"."), this.iridescenceThicknessMinimum = e[0], this.iridescenceThicknessMaximum = e[1];
	}
	copy(e) {
		return super.copy(e), this.defines = {
			STANDARD: "",
			PHYSICAL: ""
		}, this.anisotropy = e.anisotropy, this.anisotropyRotation = e.anisotropyRotation, this.anisotropyMap = e.anisotropyMap, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.diffuseRoughness = e.diffuseRoughness, this.diffuseRoughnessMap = e.diffuseRoughnessMap, this.dispersion = e.dispersion, this.ior = e.ior, this.iridescence = e.iridescence, this.iridescenceMap = e.iridescenceMap, this.iridescenceIOR = e.iridescenceIOR, this.iridescenceThicknessMinimum = e.iridescenceThicknessMinimum, this.iridescenceThicknessMaximum = e.iridescenceThicknessMaximum, this.iridescenceThicknessMap = e.iridescenceThicknessMap, this.retroreflectivity = e.retroreflectivity, this.sheen = e.sheen, this.sheenColor.copy(e.sheenColor), this.sheenColorMap = e.sheenColorMap, this.sheenRoughness = e.sheenRoughness, this.sheenRoughnessMap = e.sheenRoughnessMap, this.transmission = e.transmission, this.transmissionMap = e.transmissionMap, this.thickness = e.thickness, this.thicknessMap = e.thicknessMap, this.attenuationDistance = e.attenuationDistance, this.attenuationColor.copy(e.attenuationColor), this.specularIntensity = e.specularIntensity, this.specularIntensityMap = e.specularIntensityMap, this.specularColor.copy(e.specularColor), this.specularColorMap = e.specularColorMap, this;
	}
}, Sa = class extends Ir {
	constructor(e) {
		super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = V, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
	}
}, Ca = class extends Ir {
	constructor(e) {
		super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
	}
};
function wa(e, t) {
	return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == "number" ? new t(e) : Array.prototype.slice.call(e);
}
function Ta(e) {
	return e !== void 0 && e.inTangents !== void 0 && e.outTangents !== void 0;
}
var Ea = class {
	constructor(e, t, n, r) {
		this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = r === void 0 ? new t.constructor(n) : r, this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
	}
	evaluate(e) {
		let t = this.parameterPositions, n = this._cachedIndex, r = t[n], i = t[n - 1];
		validate_interval: {
			seek: {
				let a;
				linear_scan: {
					forward_scan: if (!(e < r)) {
						for (let a = n + 2;;) {
							if (r === void 0) {
								if (e < i) break forward_scan;
								return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
							}
							if (n === a) break;
							if (i = r, r = t[++n], e < r) break seek;
						}
						a = t.length;
						break linear_scan;
					}
					if (!(e >= i)) {
						let o = t[1];
						e < o && (n = 2, i = o);
						for (let a = n - 2;;) {
							if (i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
							if (n === a) break;
							if (r = i, i = t[--n - 1], e >= i) break seek;
						}
						a = n, n = 0;
						break linear_scan;
					}
					break validate_interval;
				}
				for (; n < a;) {
					let r = n + a >>> 1;
					e < t[r] ? a = r : n = r + 1;
				}
				if (r = t[n], i = t[n - 1], i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
				if (r === void 0) return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
			}
			this._cachedIndex = n, this.intervalChanged_(n, i, r);
		}
		return this.interpolate_(n, i, e, r);
	}
	getSettings_() {
		return this.settings || this.DefaultSettings_;
	}
	copySampleValue_(e) {
		let t = this.resultBuffer, n = this.sampleValues, r = this.valueSize, i = e * r;
		for (let e = 0; e !== r; ++e) t[e] = n[i + e];
		return t;
	}
	interpolate_() {
		throw Error("THREE.Interpolant: Call to abstract method.");
	}
	intervalChanged_() {}
}, Da = class extends Ea {
	constructor(e, t, n, r) {
		super(e, t, n, r), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
			endingStart: z,
			endingEnd: z
		};
	}
	intervalChanged_(e, t, n) {
		let r = this.parameterPositions, i = e - 2, a = e + 1, o = r[i], s = r[a];
		if (o === void 0) switch (this.getSettings_().endingStart) {
			case Fe:
				i = e, o = 2 * t - n;
				break;
			case B:
				i = r.length - 2, o = t + r[i] - r[i + 1];
				break;
			default: i = e, o = n;
		}
		if (s === void 0) switch (this.getSettings_().endingEnd) {
			case Fe:
				a = e, s = 2 * n - t;
				break;
			case B:
				a = 1, s = n + r[1] - r[0];
				break;
			default: a = e - 1, s = t;
		}
		let c = (n - t) * .5, l = this.valueSize;
		this._weightPrev = c / (t - o), this._weightNext = c / (s - n), this._offsetPrev = i * l, this._offsetNext = a * l;
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this._offsetPrev, u = this._offsetNext, d = this._weightPrev, f = this._weightNext, p = (n - t) / (r - t), m = p * p, h = m * p, g = -d * h + 2 * d * m - d * p, _ = (1 + d) * h + (-1.5 - 2 * d) * m + (-.5 + d) * p + 1, v = (-1 - f) * h + (1.5 + f) * m + .5 * p, y = f * h - f * m;
		for (let e = 0; e !== o; ++e) i[e] = g * a[l + e] + _ * a[c + e] + v * a[s + e] + y * a[u + e];
		return i;
	}
}, Oa = class extends Ea {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = (n - t) / (r - t), u = 1 - l;
		for (let e = 0; e !== o; ++e) i[e] = a[c + e] * u + a[s + e] * l;
		return i;
	}
}, ka = class extends Ea {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e) {
		return this.copySampleValue_(e - 1);
	}
}, Aa = class extends Ea {
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this.inTangents, u = this.outTangents;
		if (!l || !u) {
			let e = (n - t) / (r - t), l = 1 - e;
			for (let t = 0; t !== o; ++t) i[t] = a[c + t] * l + a[s + t] * e;
			return i;
		}
		let d = o * 2, f = e - 1;
		for (let p = 0; p !== o; ++p) {
			let o = a[c + p], m = a[s + p], h = f * d + p * 2, g = u[h], _ = u[h + 1], v = e * d + p * 2, y = l[v], b = l[v + 1], x = Na(n, t, g, y, r);
			i[p] = ja(x, o, _, b, m);
		}
		return i;
	}
};
function ja(e, t, n, r, i) {
	let a = 1 - e;
	return a * a * a * t + 3 * a * a * e * n + 3 * a * e * e * r + e * e * e * i;
}
function Ma(e, t, n, r, i) {
	let a = 1 - e;
	return 3 * a * a * (n - t) + 6 * a * e * (r - n) + 3 * e * e * (i - r);
}
function Na(e, t, n, r, i) {
	let a = (e - t) / (i - t);
	for (let o = 0; o < 8; o++) {
		let o = ja(a, t, n, r, i) - e;
		if (Math.abs(o) < 1e-10) break;
		let s = Ma(a, t, n, r, i);
		if (Math.abs(s) < 1e-10) break;
		a = Math.max(0, Math.min(1, a - o / s));
	}
	return a;
}
var Pa = class {
	constructor(e, t, n, r) {
		if (e === void 0) throw Error("THREE.KeyframeTrack: track name is undefined");
		if (t === void 0 || t.length === 0) throw Error("THREE.KeyframeTrack: no keyframes in track named " + e);
		this.name = e, this.times = wa(t, this.TimeBufferType), this.values = wa(n, this.ValueBufferType), this.setInterpolation(r || this.DefaultInterpolation);
	}
	static toJSON(e) {
		let t = e.constructor, n;
		if (t.toJSON !== this.toJSON) n = t.toJSON(e);
		else {
			n = {
				name: e.name,
				times: wa(e.times, Array),
				values: wa(e.values, Array)
			};
			let t = e.getInterpolation();
			t !== e.DefaultInterpolation && (n.interpolation = t), Ta(e.settings) && (n.settings = {
				inTangents: wa(e.settings.inTangents, Array),
				outTangents: wa(e.settings.outTangents, Array)
			});
		}
		return n.type = e.ValueTypeName, n;
	}
	InterpolantFactoryMethodDiscrete(e) {
		return new ka(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodLinear(e) {
		return new Oa(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodSmooth(e) {
		return new Da(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodBezier(e) {
		let t = new Aa(this.times, this.values, this.getValueSize(), e);
		return this.settings && (t.inTangents = this.settings.inTangents, t.outTangents = this.settings.outTangents), t;
	}
	setInterpolation(e) {
		let t;
		switch (e) {
			case R:
				t = this.InterpolantFactoryMethodDiscrete;
				break;
			case Me:
				t = this.InterpolantFactoryMethodLinear;
				break;
			case Ne:
				t = this.InterpolantFactoryMethodSmooth;
				break;
			case Pe: t = this.InterpolantFactoryMethodBezier;
		}
		if (t === void 0) {
			let t = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
			if (this.createInterpolant === void 0) {
				if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
				else throw Error(t);
			}
			return H("KeyframeTrack:", t), this;
		}
		return this.createInterpolant = t, this;
	}
	getInterpolation() {
		switch (this.createInterpolant) {
			case this.InterpolantFactoryMethodDiscrete: return R;
			case this.InterpolantFactoryMethodLinear: return Me;
			case this.InterpolantFactoryMethodSmooth: return Ne;
			case this.InterpolantFactoryMethodBezier: return Pe;
		}
	}
	getValueSize() {
		return this.values.length / this.times.length;
	}
	shift(e) {
		if (e !== 0) {
			let t = this.times;
			for (let n = 0, r = t.length; n !== r; ++n) t[n] += e;
			Ta(this.settings) && (Fa(this.settings.inTangents, e), Fa(this.settings.outTangents, e));
		}
		return this;
	}
	scale(e) {
		if (e !== 1) {
			let t = this.times;
			for (let n = 0, r = t.length; n !== r; ++n) t[n] *= e;
			Ta(this.settings) && (Ia(this.settings.inTangents, e), Ia(this.settings.outTangents, e));
		}
		return this;
	}
	trim(e, t) {
		let n = this.times, r = n.length, i = 0, a = r - 1;
		for (; i !== r && n[i] < e;) ++i;
		for (; a !== -1 && n[a] > t;) --a;
		if (++a, i !== 0 || a !== r) {
			i >= a && (a = Math.max(a, 1), i = a - 1);
			let e = this.getValueSize();
			this.times = n.slice(i, a), this.values = this.values.slice(i * e, a * e);
		}
		return this;
	}
	validate() {
		let e = !0, t = this.getValueSize();
		t - Math.floor(t) !== 0 && (U("KeyframeTrack: Invalid value size in track.", this), e = !1);
		let n = this.times, r = this.values, i = n.length;
		i === 0 && (U("KeyframeTrack: Track is empty.", this), e = !1);
		let a = null;
		for (let t = 0; t !== i; t++) {
			let r = n[t];
			if (typeof r == "number" && isNaN(r)) {
				U("KeyframeTrack: Time is not a valid number.", this, t, r), e = !1;
				break;
			}
			if (a !== null && a > r) {
				U("KeyframeTrack: Out of order keys.", this, t, r, a), e = !1;
				break;
			}
			a = r;
		}
		if (r !== void 0 && We(r)) for (let t = 0, n = r.length; t !== n; ++t) {
			let n = r[t];
			if (isNaN(n)) {
				U("KeyframeTrack: Value is not a valid number.", this, t, n), e = !1;
				break;
			}
		}
		return e;
	}
	optimize() {
		let e = this.times.slice(), t = this.values.slice(), n = this.getValueSize(), r = this.getInterpolation() === Ne, i = e.length - 1, a = 1;
		for (let o = 1; o < i; ++o) {
			let i = !1, s = e[o];
			if (s !== e[o + 1] && (o !== 1 || s !== e[0])) {
				if (r) i = !0;
				else {
					let e = o * n, r = e - n, a = e + n;
					for (let o = 0; o !== n; ++o) {
						let n = t[e + o];
						if (n !== t[r + o] || n !== t[a + o]) {
							i = !0;
							break;
						}
					}
				}
			}
			if (i) {
				if (o !== a) {
					e[a] = e[o];
					let r = o * n, i = a * n;
					for (let e = 0; e !== n; ++e) t[i + e] = t[r + e];
				}
				++a;
			}
		}
		if (i > 0) {
			e[a] = e[i];
			for (let e = i * n, r = a * n, o = 0; o !== n; ++o) t[r + o] = t[e + o];
			++a;
		}
		return a === e.length ? (this.times = e, this.values = t) : (this.times = e.slice(0, a), this.values = t.slice(0, a * n)), this;
	}
	clone() {
		let e = this.times.slice(), t = this.values.slice(), n = this.constructor, r = new n(this.name, e, t);
		return r.createInterpolant = this.createInterpolant, Ta(this.settings) && (r.settings = {
			inTangents: this.settings.inTangents.slice(),
			outTangents: this.settings.outTangents.slice()
		}), r;
	}
};
function Fa(e, t) {
	for (let n = 0, r = e.length; n !== r; n += 2) e[n] += t;
}
function Ia(e, t) {
	for (let n = 0, r = e.length; n !== r; n += 2) e[n] *= t;
}
Pa.prototype.ValueTypeName = "", Pa.prototype.TimeBufferType = Float32Array, Pa.prototype.ValueBufferType = Float32Array, Pa.prototype.DefaultInterpolation = Me;
var La = class extends Pa {
	constructor(e, t, n) {
		super(e, t, n);
	}
};
La.prototype.ValueTypeName = "bool", La.prototype.ValueBufferType = Array, La.prototype.DefaultInterpolation = R, La.prototype.InterpolantFactoryMethodLinear = void 0, La.prototype.InterpolantFactoryMethodSmooth = void 0;
var Ra = class extends Pa {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
Ra.prototype.ValueTypeName = "color";
var za = class extends Pa {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
za.prototype.ValueTypeName = "number";
var Ba = class extends Ea {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = (n - t) / (r - t), c = e * o;
		for (let e = c + o; c !== e; c += 4) Dt.slerpFlat(i, 0, a, c - o, a, c, s);
		return i;
	}
}, Va = class extends Pa {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	InterpolantFactoryMethodLinear(e) {
		return new Ba(this.times, this.values, this.getValueSize(), e);
	}
};
Va.prototype.ValueTypeName = "quaternion", Va.prototype.InterpolantFactoryMethodSmooth = void 0;
var Ha = class extends Pa {
	constructor(e, t, n) {
		super(e, t, n);
	}
};
Ha.prototype.ValueTypeName = "string", Ha.prototype.ValueBufferType = Array, Ha.prototype.DefaultInterpolation = R, Ha.prototype.InterpolantFactoryMethodLinear = void 0, Ha.prototype.InterpolantFactoryMethodSmooth = void 0;
var Ua = class extends Pa {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
Ua.prototype.ValueTypeName = "vector";
var Wa = class extends Cn {
	static registerNode(e) {
		this.prototype._lightNode = e;
	}
	constructor(e, t = 1) {
		super(), this.isLight = !0, this.type = "Light", this.color = new Y(e), this.intensity = t;
	}
	copy(e, t) {
		return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, t;
	}
}, Ga = class extends Wa {
	constructor(e, t, n) {
		super(e, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(Cn.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Y(t);
	}
	copy(e, t) {
		return super.copy(e, t), this.groundColor.copy(e.groundColor), this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.groundColor = this.groundColor.getHex(), t;
	}
}, Ka = /*@__PURE__*/ new Yt(), qa = /*@__PURE__*/ new K(), Ja = /*@__PURE__*/ new K(), Ya = class {
	constructor(e) {
		this.camera = e, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new G(512, 512), this.mapType = d, this.map = null, this.mapPass = null, this.matrix = new Yt(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Mi(), this._frameExtents = new G(1, 1), this._viewportCount = 1, this._viewports = [new Wt(0, 0, 1, 1)];
	}
	getViewportCount() {
		return this._viewportCount;
	}
	getCamera() {
		return this.camera;
	}
	getFrustum() {
		return this._frustum;
	}
	updateMatrices(e) {
		let t = this.camera;
		qa.setFromMatrixPosition(e.matrixWorld), t.position.copy(qa), Ja.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(Ja), t.updateMatrixWorld(), this._updateMatrix(t, this.matrix, this._frustum);
	}
	_updateMatrix(e, t, n, r) {
		Ka.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), n.setFromProjectionMatrix(Ka, e.coordinateSystem, e.reversedDepth);
		let i = this._frameExtents, a = r ? r.z / i.x : 1, o = r ? r.w / i.y : 1, s = r ? r.x / i.x : 0, c = r ? r.y / i.y : 0;
		e.coordinateSystem === 2001 || e.reversedDepth ? t.set(.5 * a, 0, 0, .5 * a + s, 0, .5 * o, 0, .5 * o + c, 0, 0, 1, 0, 0, 0, 0, 1) : t.set(.5 * a, 0, 0, .5 * a + s, 0, .5 * o, 0, .5 * o + c, 0, 0, .5, .5, 0, 0, 0, 1), t.multiply(Ka);
	}
	getViewport(e) {
		return this._viewports[e];
	}
	getFrameExtents() {
		return this._frameExtents;
	}
	dispose() {
		this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
	}
	copy(e) {
		return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this.mapType = e.mapType, this.biasNode = e.biasNode, this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		let e = {};
		return e.intensity = this.intensity, e.bias = this.bias, e.normalBias = this.normalBias, e.radius = this.radius, e.blurSamples = this.blurSamples, e.mapSize = this.mapSize.toArray(), e.mapType = this.mapType, e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
	}
}, Xa = /*@__PURE__*/ new K(), Za = /*@__PURE__*/ new Dt(), Qa = /*@__PURE__*/ new K(), $a = class extends Cn {
	constructor() {
		super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Yt(), this.projectionMatrix = new Yt(), this.projectionMatrixInverse = new Yt(), this.coordinateSystem = He, this._reversedDepth = !1;
	}
	get reversedDepth() {
		return this._reversedDepth;
	}
	copy(e, t) {
		return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
	}
	getWorldDirection(e) {
		return super.getWorldDirection(e).negate();
	}
	updateMatrixWorld(e) {
		super.updateMatrixWorld(e), this.matrixWorld.decompose(Xa, Za, Qa), Qa.x === 1 && Qa.y === 1 && Qa.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Xa, Za, Qa.set(1, 1, 1)).invert();
	}
	updateWorldMatrix(e, t, n = !1) {
		super.updateWorldMatrix(e, t, n), this.matrixWorld.decompose(Xa, Za, Qa), Qa.x === 1 && Qa.y === 1 && Qa.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Xa, Za, Qa.set(1, 1, 1)).invert();
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, eo = /*@__PURE__*/ new K(), to = /*@__PURE__*/ new G(), no = /*@__PURE__*/ new G(), ro = class extends $a {
	constructor(e = 50, t = 1, n = .1, r = 2e3) {
		super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
	}
	copy(e, t) {
		return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
	}
	setFocalLength(e) {
		let t = .5 * this.getFilmHeight() / e;
		this.fov = rt * 2 * Math.atan(t), this.updateProjectionMatrix();
	}
	getFocalLength() {
		let e = Math.tan(nt * .5 * this.fov);
		return .5 * this.getFilmHeight() / e;
	}
	getEffectiveFOV() {
		return rt * 2 * Math.atan(Math.tan(nt * .5 * this.fov) / this.zoom);
	}
	getFilmWidth() {
		return this.filmGauge * Math.min(this.aspect, 1);
	}
	getFilmHeight() {
		return this.filmGauge / Math.max(this.aspect, 1);
	}
	getViewBounds(e, t, n) {
		eo.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse), t.set(eo.x, eo.y).multiplyScalar(-e / eo.z), eo.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), n.set(eo.x, eo.y).multiplyScalar(-e / eo.z);
	}
	getViewSize(e, t) {
		return this.getViewBounds(e, to, no), t.subVectors(no, to);
	}
	setViewOffset(e, t, n, r, i, a) {
		this.aspect = e / t, this.view === null && (this.view = {
			enabled: !0,
			fullWidth: 1,
			fullHeight: 1,
			offsetX: 0,
			offsetY: 0,
			width: 1,
			height: 1
		}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		let e = this.near, t = e * Math.tan(nt * .5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, i = -.5 * r, a = this.view;
		if (this.view !== null && this.view.enabled) {
			let e = a.fullWidth, o = a.fullHeight;
			i += a.offsetX * r / e, t -= a.offsetY * n / o, r *= a.width / e, n *= a.height / o;
		}
		let o = this.filmOffset;
		o !== 0 && (i += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(i, i + r, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
	}
}, io = class extends Ya {
	constructor() {
		super(new ro(90, 1, .5, 500)), this.isPointLightShadow = !0;
	}
}, ao = class extends Wa {
	constructor(e, t, n = 0, r = 2) {
		super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = r, this.shadow = new io();
	}
	get power() {
		return this.intensity * 4 * Math.PI;
	}
	set power(e) {
		this.intensity = e / (4 * Math.PI);
	}
	dispose() {
		super.dispose(), this.shadow.dispose();
	}
	copy(e, t) {
		return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.distance = this.distance, t.object.decay = this.decay, t.object.shadow = this.shadow.toJSON(), t;
	}
}, oo = class extends $a {
	constructor(e = -1, t = 1, n = 1, r = -1, i = .1, a = 2e3) {
		super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = r, this.near = i, this.far = a, this.updateProjectionMatrix();
	}
	copy(e, t) {
		return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
	}
	setViewOffset(e, t, n, r, i, a) {
		this.view === null && (this.view = {
			enabled: !0,
			fullWidth: 1,
			fullHeight: 1,
			offsetX: 0,
			offsetY: 0,
			width: 1,
			height: 1
		}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		let e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2, i = n - e, a = n + e, o = r + t, s = r - t;
		if (this.view !== null && this.view.enabled) {
			let e = (this.right - this.left) / this.view.fullWidth / this.zoom, t = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
			i += e * this.view.offsetX, a = i + e * this.view.width, o -= t * this.view.offsetY, s = o - t * this.view.height;
		}
		this.projectionMatrix.makeOrthographic(i, a, o, s, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
	}
}, so = class extends Ya {
	constructor() {
		super(new oo(-5, 5, 5, -5, .5, 500)), this.isDirectionalLightShadow = !0;
	}
}, co = class extends Wa {
	constructor(e, t) {
		super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(Cn.DEFAULT_UP), this.updateMatrix(), this.target = new Cn(), this.shadow = new so();
	}
	dispose() {
		super.dispose(), this.shadow.dispose();
	}
	copy(e) {
		return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.shadow = this.shadow.toJSON(), t.object.target = this.target.uuid, t;
	}
}, lo = -90, uo = 1, fo = class extends Cn {
	constructor(e, t, n) {
		super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
		let r = new ro(lo, uo, e, t);
		r.layers = this.layers, this.add(r);
		let i = new ro(lo, uo, e, t);
		i.layers = this.layers, this.add(i);
		let a = new ro(lo, uo, e, t);
		a.layers = this.layers, this.add(a);
		let o = new ro(lo, uo, e, t);
		o.layers = this.layers, this.add(o);
		let s = new ro(lo, uo, e, t);
		s.layers = this.layers, this.add(s);
		let c = new ro(lo, uo, e, t);
		c.layers = this.layers, this.add(c);
	}
	updateCoordinateSystem() {
		let e = this.coordinateSystem, t = this.children.concat(), [n, r, i, a, o, s] = t;
		for (let e of t) this.remove(e);
		if (e === 2e3) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), i.up.set(0, 0, -1), i.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), s.up.set(0, 1, 0), s.lookAt(0, 0, -1);
		else if (e === 2001) n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), i.up.set(0, 0, 1), i.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), s.up.set(0, -1, 0), s.lookAt(0, 0, -1);
		else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
		for (let e of t) this.add(e), e.updateMatrixWorld();
	}
	update(e, t) {
		this.parent === null && this.updateMatrixWorld();
		let { renderTarget: n, activeMipmapLevel: r } = this;
		this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
		let [i, a, o, s, c, l] = this.children, u = e.getRenderTarget(), d = e.getActiveCubeFace(), f = e.getActiveMipmapLevel(), p = e.xr.enabled;
		e.xr.enabled = !1;
		let m = n.texture.mipmapsAutoUpdate;
		n.texture.mipmapsAutoUpdate = !1;
		let h = !1;
		h = e.isWebGLRenderer === !0 ? e.state.buffers.depth.getReversed() : e.reversedDepthBuffer, e.setRenderTarget(n, 0, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, i), e.setRenderTarget(n, 1, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(n, 2, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(n, 3, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(n, 4, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, c), n.texture.mipmapsAutoUpdate = m, e.setRenderTarget(n, 5, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, l), e.setRenderTarget(u, d, f), e.xr.enabled = p, n.texture.needsPMREMUpdate = !0;
	}
}, po = class extends ro {
	constructor(e = []) {
		super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e, this.perCameraFrustumCulled = !1;
	}
}, mo = "\\[\\]\\.:\\/", ho = /* @__PURE__ */ RegExp("[\\[\\]\\.:\\/]", "g"), go = "[^\\[\\]\\.:\\/]", _o = "[^" + mo.replace("\\.", "") + "]", vo = /*@__PURE__*/ "((?:WC+[\\/:])*)".replace("WC", go), yo = /*@__PURE__*/ "(WCOD+)?".replace("WCOD", _o), bo = /*@__PURE__*/ "(?:\\.(WC+)(?:\\[(.+)\\])?)?".replace("WC", go), xo = /*@__PURE__*/ "\\.(WC+)(?:\\[(.+)\\])?".replace("WC", go), So = RegExp("^" + vo + yo + bo + xo + "$"), Co = [
	"material",
	"materials",
	"bones",
	"map"
], wo = class {
	constructor(e, t, n) {
		let r = n || To.parseTrackName(t);
		this._targetGroup = e, this._bindings = e.subscribe_(t, r);
	}
	getValue(e, t) {
		this.bind();
		let n = this._targetGroup.nCachedObjects_, r = this._bindings[n];
		r !== void 0 && r.getValue(e, t);
	}
	setValue(e, t) {
		let n = this._bindings;
		for (let r = this._targetGroup.nCachedObjects_, i = n.length; r !== i; ++r) n[r].setValue(e, t);
	}
	bind() {
		let e = this._bindings;
		for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].bind();
	}
	unbind() {
		let e = this._bindings;
		for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].unbind();
	}
}, To = class e {
	constructor(t, n, r) {
		this.path = n, this.parsedPath = r || e.parseTrackName(n), this.node = e.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
	}
	static create(t, n, r) {
		return t && t.isAnimationObjectGroup ? new e.Composite(t, n, r) : new e(t, n, r);
	}
	static sanitizeNodeName(e) {
		return e.replace(/\s/g, "_").replace(ho, "");
	}
	static parseTrackName(e) {
		let t = So.exec(e);
		if (t === null) throw Error("THREE.PropertyBinding: Cannot parse trackName: " + e);
		let n = {
			nodeName: t[2],
			objectName: t[3],
			objectIndex: t[4],
			propertyName: t[5],
			propertyIndex: t[6]
		}, r = n.nodeName && n.nodeName.lastIndexOf(".");
		if (r !== void 0 && r !== -1) {
			let e = n.nodeName.substring(r + 1);
			Co.indexOf(e) !== -1 && (n.nodeName = n.nodeName.substring(0, r), n.objectName = e);
		}
		if (n.propertyName === null || n.propertyName.length === 0) throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + e);
		return n;
	}
	static findNode(e, t) {
		if (t === void 0 || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid) return e;
		if (e.skeleton) {
			let n = e.skeleton.getBoneByName(t);
			if (n !== void 0) return n;
		}
		if (e.children) {
			let n = function(e) {
				for (let r = 0; r < e.length; r++) {
					let i = e[r];
					if (i.name === t || i.uuid === t) return i;
					let a = n(i.children);
					if (a) return a;
				}
				return null;
			}, r = n(e.children);
			if (r) return r;
		}
		return null;
	}
	_getValue_unavailable() {}
	_setValue_unavailable() {}
	_getValue_direct(e, t) {
		e[t] = this.targetObject[this.propertyName];
	}
	_getValue_array(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) e[t++] = n[r];
	}
	_getValue_arrayElement(e, t) {
		e[t] = this.resolvedProperty[this.propertyIndex];
	}
	_getValue_toArray(e, t) {
		this.resolvedProperty.toArray(e, t);
	}
	_setValue_direct(e, t) {
		this.targetObject[this.propertyName] = e[t];
	}
	_setValue_direct_setNeedsUpdate(e, t) {
		this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0;
	}
	_setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
		this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_array(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
	}
	_setValue_array_setNeedsUpdate(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
		this.targetObject.needsUpdate = !0;
	}
	_setValue_array_setMatrixWorldNeedsUpdate(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
		this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_arrayElement(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t];
	}
	_setValue_arrayElement_setNeedsUpdate(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0;
	}
	_setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_fromArray(e, t) {
		this.resolvedProperty.fromArray(e, t);
	}
	_setValue_fromArray_setNeedsUpdate(e, t) {
		this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0;
	}
	_setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
		this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_getValue_unbound(e, t) {
		this.bind(), this.getValue(e, t);
	}
	_setValue_unbound(e, t) {
		this.bind(), this.setValue(e, t);
	}
	bind() {
		let t = this.node, n = this.parsedPath, r = n.objectName, i = n.propertyName, a = n.propertyIndex;
		if (t || (t = e.findNode(this.rootNode, n.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
			H("PropertyBinding: No target node found for track: " + this.path + ".");
			return;
		}
		if (r) {
			let e = n.objectIndex;
			switch (r) {
				case "materials":
					if (!t.material) {
						U("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!t.material.materials) {
						U("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
						return;
					}
					t = t.material.materials;
					break;
				case "bones":
					if (!t.skeleton) {
						U("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
						return;
					}
					t = t.skeleton.bones;
					for (let n = 0; n < t.length; n++) if (t[n].name === e) {
						e = n;
						break;
					}
					break;
				case "map":
					if ("map" in t) {
						t = t.map;
						break;
					}
					if (!t.material) {
						U("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!t.material.map) {
						U("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
						return;
					}
					t = t.material.map;
					break;
				default:
					if (t[r] === void 0) {
						U("PropertyBinding: Can not bind to objectName of node undefined.", this);
						return;
					}
					t = t[r];
			}
			if (e !== void 0) {
				if (t[e] === void 0) {
					U("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
					return;
				}
				t = t[e];
			}
		}
		let o = t[i];
		if (o === void 0) {
			let e = n.nodeName;
			U("PropertyBinding: Trying to update property for track: " + e + "." + i + " but it wasn't found.", t);
			return;
		}
		let s = this.Versioning.None;
		this.targetObject = t, t.isMaterial === !0 ? s = this.Versioning.NeedsUpdate : t.isObject3D === !0 && (s = this.Versioning.MatrixWorldNeedsUpdate);
		let c = this.BindingType.Direct;
		if (a !== void 0) {
			if (i === "morphTargetInfluences") {
				if (!t.geometry) {
					U("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
					return;
				}
				if (!t.geometry.morphAttributes) {
					U("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
					return;
				}
				t.morphTargetDictionary[a] !== void 0 && (a = t.morphTargetDictionary[a]);
			}
			c = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = a;
		} else o.fromArray !== void 0 && o.toArray !== void 0 ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = o) : Array.isArray(o) ? (c = this.BindingType.EntireArray, this.resolvedProperty = o) : this.propertyName = i;
		this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][s];
	}
	unbind() {
		this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
	}
};
To.Composite = wo, To.prototype.BindingType = {
	Direct: 0,
	EntireArray: 1,
	ArrayElement: 2,
	HasFromToArray: 3
}, To.prototype.Versioning = {
	None: 0,
	NeedsUpdate: 1,
	MatrixWorldNeedsUpdate: 2
}, To.prototype.GetterByBindingType = [
	To.prototype._getValue_direct,
	To.prototype._getValue_array,
	To.prototype._getValue_arrayElement,
	To.prototype._getValue_toArray
], To.prototype.SetterByBindingTypeAndVersioning = [
	[
		To.prototype._setValue_direct,
		To.prototype._setValue_direct_setNeedsUpdate,
		To.prototype._setValue_direct_setMatrixWorldNeedsUpdate
	],
	[
		To.prototype._setValue_array,
		To.prototype._setValue_array_setNeedsUpdate,
		To.prototype._setValue_array_setMatrixWorldNeedsUpdate
	],
	[
		To.prototype._setValue_arrayElement,
		To.prototype._setValue_arrayElement_setNeedsUpdate,
		To.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
	],
	[
		To.prototype._setValue_fromArray,
		To.prototype._setValue_fromArray_setNeedsUpdate,
		To.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
	]
];
var Eo = /*@__PURE__*/ new Yt(), Do = class {
	constructor(e, t, n = 0, r = Infinity) {
		this.ray = new ri(e, t), this.near = n, this.far = r, this.camera = null, this.layers = new sn(), this.params = {
			Mesh: {},
			Line: { threshold: 1 },
			LOD: {},
			Points: { threshold: 1 },
			Sprite: {}
		};
	}
	set(e, t) {
		this.ray.set(e, t);
	}
	setFromCamera(e, t) {
		t.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(e.x, e.y, .5).unproject(t).sub(this.ray.origin).normalize(), this.camera = t) : t.isOrthographicCamera ? (this.ray.origin.set(e.x, e.y, t.projectionMatrix.elements[14]).unproject(t), this.ray.direction.set(0, 0, -1).transformDirection(t.matrixWorld), this.camera = t) : U("Raycaster: Unsupported camera type: " + t.type);
	}
	setFromXRController(e) {
		return Eo.identity().extractRotation(e.matrixWorld), this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(Eo), this;
	}
	intersectObject(e, t = !0, n = []) {
		return ko(e, this, n, t), n.sort(Oo), n;
	}
	intersectObjects(e, t = !0, n = []) {
		for (let r = 0, i = e.length; r < i; r++) ko(e[r], this, n, t);
		return n.sort(Oo), n;
	}
};
function Oo(e, t) {
	return e.distance - t.distance;
}
function ko(e, t, n, r) {
	let i = !0;
	if (e.layers.test(t.layers) && e.raycast(t, n) === !1 && (i = !1), i === !0 && r === !0) {
		let r = e.children;
		for (let e = 0, i = r.length; e < i; e++) ko(r[e], t, n, !0);
	}
}
var Ao = class {
	constructor(e = 1, t = 0, n = 0) {
		this.radius = e, this.phi = t, this.theta = n;
	}
	set(e, t, n) {
		return this.radius = e, this.phi = t, this.theta = n, this;
	}
	copy(e) {
		return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this;
	}
	makeSafe() {
		let e = 1e-6;
		return this.phi = W(this.phi, e, Math.PI - e), this;
	}
	setFromVector3(e) {
		return this.setFromCartesianCoords(e.x, e.y, e.z);
	}
	setFromCartesianCoords(e, t, n) {
		return this.radius = Math.sqrt(e * e + t * t + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(W(t / this.radius, -1, 1))), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
};
(class {
	static {
		this.prototype.isMatrix2 = !0;
	}
	constructor(e, t, n, r) {
		this.elements = [
			1,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r);
	}
	identity() {
		return this.set(1, 0, 0, 1), this;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 4; n++) this.elements[n] = e[n + t];
		return this;
	}
	set(e, t, n, r) {
		let i = this.elements;
		return i[0] = e, i[2] = t, i[1] = n, i[3] = r, this;
	}
});
var jo = class extends $e {
	constructor(e, t = null) {
		super(), this.object = e, this.domElement = t, this.enabled = !0, this.state = -1, this.keys = {}, this.mouseButtons = {
			LEFT: null,
			MIDDLE: null,
			RIGHT: null
		}, this.touches = {
			ONE: null,
			TWO: null
		};
	}
	connect(e) {
		this.domElement !== null && this.disconnect(), this.domElement = e;
	}
	disconnect() {}
	dispose() {}
	update() {}
};
function Mo(e, t, n, r) {
	let i = No(r);
	switch (n) {
		case w: return e * t;
		case k: return e * t / i.components * i.byteLength;
		case A: return e * t / i.components * i.byteLength;
		case j: return e * t * 2 / i.components * i.byteLength;
		case ee: return e * t * 2 / i.components * i.byteLength;
		case T: return e * t * 3 / i.components * i.byteLength;
		case E: return e * t * 4 / i.components * i.byteLength;
		case te: return e * t * 4 / i.components * i.byteLength;
		case M:
		case N: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
		case P:
		case F: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case ne:
		case ie: return Math.max(e, 16) * Math.max(t, 8) / 4;
		case I:
		case re: return Math.max(e, 8) * Math.max(t, 8) / 2;
		case ae:
		case oe:
		case se:
		case ce: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
		case L:
		case le:
		case ue: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case de: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case fe: return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
		case pe: return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
		case me: return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
		case he: return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
		case ge: return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
		case _e: return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
		case ve: return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
		case ye: return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
		case be: return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
		case xe: return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
		case Se: return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
		case Ce: return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
		case we: return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
		case Te:
		case Ee:
		case De: return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
		case Oe:
		case ke: return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
		case Ae:
		case je: return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
	}
	throw Error(`Unable to determine texture byte length for ${n} format.`);
}
function No(e) {
	switch (e) {
		case d:
		case f: return {
			byteLength: 1,
			components: 1
		};
		case m:
		case p:
		case v: return {
			byteLength: 2,
			components: 1
		};
		case y:
		case b: return {
			byteLength: 2,
			components: 4
		};
		case g:
		case h:
		case _: return {
			byteLength: 4,
			components: 1
		};
		case S:
		case C: return {
			byteLength: 4,
			components: 3
		};
	}
	throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "187" } })), typeof window < "u" && (window.__THREE__ ? H("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "187");
// node_modules/three/build/three.module.js
function Po() {
	let e = null, t = !1, n = null, r = null;
	function i(t, a) {
		r = e.requestAnimationFrame(i), n(t, a);
	}
	return {
		start: function() {
			t !== !0 && n !== null && e !== null && (r = e.requestAnimationFrame(i), t = !0);
		},
		stop: function() {
			e !== null && e.cancelAnimationFrame(r), t = !1;
		},
		setAnimationLoop: function(e) {
			n = e;
		},
		setContext: function(t) {
			e = t;
		}
	};
}
function Fo(e) {
	let t = /* @__PURE__ */ new WeakMap();
	function n(t, n) {
		let r = t.array, i = t.usage, a = r.byteLength, o = e.createBuffer();
		e.bindBuffer(n, o), e.bufferData(n, r, i), t.onUploadCallback();
		let s;
		if (r instanceof Float32Array) s = e.FLOAT;
		else if (typeof Float16Array < "u" && r instanceof Float16Array) s = e.HALF_FLOAT;
		else if (r instanceof Uint16Array) s = t.isFloat16BufferAttribute ? e.HALF_FLOAT : e.UNSIGNED_SHORT;
		else if (r instanceof Int16Array) s = e.SHORT;
		else if (r instanceof Uint32Array) s = e.UNSIGNED_INT;
		else if (r instanceof Int32Array) s = e.INT;
		else if (r instanceof Int8Array) s = e.BYTE;
		else if (r instanceof Uint8Array) s = e.UNSIGNED_BYTE;
		else if (r instanceof Uint8ClampedArray) s = e.UNSIGNED_BYTE;
		else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: " + r);
		return {
			buffer: o,
			type: s,
			bytesPerElement: r.BYTES_PER_ELEMENT,
			version: t.version,
			size: a
		};
	}
	function r(t, n, r) {
		let i = n.array, a = n.updateRanges;
		if (e.bindBuffer(r, t), a.length === 0) e.bufferSubData(r, 0, i);
		else {
			a.sort((e, t) => e.start - t.start);
			let t = 0;
			for (let e = 1; e < a.length; e++) {
				let n = a[t], r = a[e];
				r.start <= n.start + n.count + 1 ? n.count = Math.max(n.count, r.start + r.count - n.start) : (++t, a[t] = r);
			}
			a.length = t + 1;
			for (let t = 0, n = a.length; t < n; t++) {
				let n = a[t];
				e.bufferSubData(r, n.start * i.BYTES_PER_ELEMENT, i, n.start, n.count);
			}
			n.clearUpdateRanges();
		}
		n.onUploadCallback();
	}
	function i(e) {
		return e.isInterleavedBufferAttribute && (e = e.data), t.get(e);
	}
	function a(n) {
		n.isInterleavedBufferAttribute && (n = n.data);
		let r = t.get(n);
		r && (e.deleteBuffer(r.buffer), t.delete(n));
	}
	function o(e, i) {
		if (e.isInterleavedBufferAttribute && (e = e.data), e.isGLBufferAttribute) {
			let n = t.get(e);
			(!n || n.version < e.version) && t.set(e, {
				buffer: e.buffer,
				type: e.type,
				bytesPerElement: e.elementSize,
				version: e.version
			});
			return;
		}
		let a = t.get(e);
		if (a === void 0) t.set(e, n(e, i));
		else if (a.version < e.version) {
			if (a.size !== e.array.byteLength) throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
			r(a.buffer, e, i), a.version = e.version;
		}
	}
	return {
		get: i,
		remove: a,
		update: o
	};
}
var X = {
	alphahash_fragment: "#ifdef USE_ALPHAHASH\n	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif",
	alphahash_pars_fragment: "#ifdef USE_ALPHAHASH\n	const float ALPHA_HASH_SCALE = 0.05;\n	float hash2D( vec2 value ) {\n		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n	}\n	float hash3D( vec3 value ) {\n		return hash2D( vec2( hash2D( value.xy ), value.z ) );\n	}\n	float getAlphaHashThreshold( vec3 position ) {\n		float maxDeriv = max(\n			length( dFdx( position.xyz ) ),\n			length( dFdy( position.xyz ) )\n		);\n		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n		vec2 pixScales = vec2(\n			exp2( floor( log2( pixScale ) ) ),\n			exp2( ceil( log2( pixScale ) ) )\n		);\n		vec2 alpha = vec2(\n			hash3D( floor( pixScales.x * position.xyz ) ),\n			hash3D( floor( pixScales.y * position.xyz ) )\n		);\n		float lerpFactor = fract( log2( pixScale ) );\n		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n		float a = min( lerpFactor, 1.0 - lerpFactor );\n		vec3 cases = vec3(\n			x * x / ( 2.0 * a * ( 1.0 - a ) ),\n			( x - 0.5 * a ) / ( 1.0 - a ),\n			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n		);\n		float threshold = ( x < ( 1.0 - a ) )\n			? ( ( x < a ) ? cases.x : cases.y )\n			: cases.z;\n		return clamp( threshold , 1.0e-6, 1.0 );\n	}\n#endif",
	alphamap_fragment: "#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif",
	alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif",
	alphatest_fragment: "#ifdef USE_ALPHATEST\n	#ifdef ALPHA_TO_COVERAGE\n	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n	if ( diffuseColor.a == 0.0 ) discard;\n	#else\n	if ( diffuseColor.a < alphaTest ) discard;\n	#endif\n#endif",
	alphatest_pars_fragment: "#ifdef USE_ALPHATEST\n	uniform float alphaTest;\n#endif",
	aomap_fragment: "#ifdef USE_AOMAP\n	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n	reflectedLight.indirectDiffuse *= ambientOcclusion;\n	#if defined( USE_CLEARCOAT ) \n		clearcoatSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_SHEEN ) \n		sheenSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD )\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n	#endif\n#endif",
	aomap_pars_fragment: "#ifdef USE_AOMAP\n	uniform sampler2D aoMap;\n	uniform float aoMapIntensity;\n#endif",
	batching_pars_vertex: "#ifdef USE_BATCHING\n	#if ! defined( GL_ANGLE_multi_draw )\n	#define gl_DrawID _gl_DrawID\n	uniform int _gl_DrawID;\n	#endif\n	uniform highp sampler2D batchingTexture;\n	uniform highp usampler2D batchingIdTexture;\n	mat4 getBatchingMatrix( const in float i ) {\n		int size = textureSize( batchingTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n	float getIndirectIndex( const in int i ) {\n		int size = textureSize( batchingIdTexture, 0 ).x;\n		int x = i % size;\n		int y = i / size;\n		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );\n	}\n#endif\n#ifdef USE_BATCHING_COLOR\n	uniform sampler2D batchingColorTexture;\n	vec4 getBatchingColor( const in float i ) {\n		int size = textureSize( batchingColorTexture, 0 ).x;\n		int j = int( i );\n		int x = j % size;\n		int y = j / size;\n		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );\n	}\n#endif",
	batching_vertex: "#ifdef USE_BATCHING\n	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );\n#endif",
	begin_vertex: "vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n	vPosition = vec3( position );\n#endif",
	beginnormal_vertex: "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n	vec3 objectTangent = vec3( tangent.xyz );\n#endif",
	bsdfs: "float G_BlinnPhong_Implicit( ) {\n	return 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( specularColor, 1.0, dotVH );\n	float G = G_BlinnPhong_Implicit( );\n	float D = D_BlinnPhong( shininess, dotNH );\n	return F * ( G * D );\n} // validated",
	iridescence_fragment: "#ifdef USE_IRIDESCENCE\n	const mat3 XYZ_TO_REC709 = mat3(\n		 3.2404542, -0.9692660,  0.0556434,\n		-1.5371385,  1.8760108, -0.2040259,\n		-0.4985314,  0.0415560,  1.0572252\n	);\n	vec3 Fresnel0ToIor( vec3 fresnel0 ) {\n		vec3 sqrtF0 = sqrt( fresnel0 );\n		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n	}\n	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n	}\n	float IorToFresnel0( float transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n	}\n	vec3 evalSensitivity( float OPD, vec3 shift ) {\n		float phase = 2.0 * PI * OPD * 1.0e-9;\n		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n		xyz /= 1.0685e-7;\n		vec3 rgb = XYZ_TO_REC709 * xyz;\n		return rgb;\n	}\n	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n		vec3 I;\n		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n		float cosTheta2Sq = 1.0 - sinTheta2Sq;\n		if ( cosTheta2Sq < 0.0 ) {\n			return vec3( 1.0 );\n		}\n		float cosTheta2 = sqrt( cosTheta2Sq );\n		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n		float R12 = F_Schlick( R0, 1.0, cosTheta1 );\n		float T121 = 1.0 - R12;\n		float phi12 = 0.0;\n		if ( iridescenceIOR < outsideIOR ) phi12 = PI;\n		float phi21 = PI - phi12;\n		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n		vec3 phi23 = vec3( 0.0 );\n		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n		vec3 phi = vec3( phi21 ) + phi23;\n		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n		vec3 r123 = sqrt( R123 );\n		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n		vec3 C0 = R12 + Rs;\n		I = C0;\n		vec3 Cm = Rs - T121;\n		for ( int m = 1; m <= 2; ++ m ) {\n			Cm *= r123;\n			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n			I += Cm * Sm;\n		}\n		return max( I, vec3( 0.0 ) );\n	}\n#endif",
	bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n	vec2 dHdxy_fwd() {\n		vec2 dSTdx = dFdx( vBumpMapUv );\n		vec2 dSTdy = dFdy( vBumpMapUv );\n		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n		return vec2( dBx, dBy );\n	}\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n		vec3 vN = surf_norm;\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n		float fDet = dot( vSigmaX, R1 ) * faceDirection;\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n	}\n#endif",
	clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n	vec4 plane;\n	#ifdef ALPHA_TO_COVERAGE\n		float distanceToPlane, distanceGradient;\n		float clipOpacity = 1.0;\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n			distanceGradient = fwidth( distanceToPlane ) / 2.0;\n			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			if ( clipOpacity == 0.0 ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			float unionClipOpacity = 1.0;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n				distanceGradient = fwidth( distanceToPlane ) / 2.0;\n				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			}\n			#pragma unroll_loop_end\n			clipOpacity *= 1.0 - unionClipOpacity;\n		#endif\n		diffuseColor.a *= clipOpacity;\n		if ( diffuseColor.a == 0.0 ) discard;\n	#else\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			bool clipped = true;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n			}\n			#pragma unroll_loop_end\n			if ( clipped ) discard;\n		#endif\n	#endif\n#endif",
	clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
	clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n#endif",
	clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0\n	vClipPosition = - mvPosition.xyz;\n#endif",
	color_fragment: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n	diffuseColor *= vColor;\n#endif",
	color_pars_fragment: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#endif",
	color_pars_vertex: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	varying vec4 vColor;\n#endif",
	color_vertex: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	vColor = vec4( 1.0 );\n#endif\n#ifdef USE_COLOR_ALPHA\n	vColor *= color;\n#elif defined( USE_COLOR )\n	vColor.rgb *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n	vColor.rgb *= instanceColor.rgb;\n#endif\n#ifdef USE_BATCHING_COLOR\n	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );\n#endif",
	common: "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n	const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n	return fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n	float precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n	float precisionSafeLength( vec3 v ) {\n		float maxComponent = max3( abs( v ) );\n		return length( v / maxComponent ) * maxComponent;\n	}\n#endif\nstruct IncidentLight {\n	vec3 color;\n	vec3 direction;\n	bool visible;\n};\nstruct ReflectedLight {\n	vec3 directDiffuse;\n	vec3 directSpecular;\n	vec3 indirectDiffuse;\n	vec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n	varying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\n#define inverseTransformDirection transformDirectionByInverseViewMatrix\nvec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {\n	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );\n}\nvec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {\n	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n	return m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n	return vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n	return RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated",
	defaultnormal_vertex: "vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n	vec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n	mat3 bm = mat3( batchingMatrix );\n	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n	transformedNormal = bm * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = bm * transformedTangent;\n	#endif\n#endif\n#ifdef USE_INSTANCING\n	mat3 im = mat3( instanceMatrix );\n	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n	transformedNormal = im * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = im * transformedTangent;\n	#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n	transformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n#endif",
	displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n	uniform sampler2D displacementMap;\n	uniform float displacementScale;\n	uniform float displacementBias;\n#endif",
	displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif",
	emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE\n		emissiveColor = sRGBTransferEOTF( emissiveColor );\n	#endif\n	totalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
	emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n	uniform sampler2D emissiveMap;\n#endif",
	colorspace_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
	colorspace_pars_fragment: "vec4 LinearTransferOETF( in vec4 value ) {\n	return value;\n}\nvec4 sRGBTransferEOTF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}",
	envmap_fragment: "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vec3 cameraToFrag;\n		if ( isOrthographic ) {\n			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToFrag = normalize( vWorldPosition - cameraPosition );\n		}\n		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vec3 reflectVec = reflect( cameraToFrag, worldNormal );\n		#else\n			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n		#endif\n	#else\n		vec3 reflectVec = vReflect;\n	#endif\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );\n		#ifdef ENVMAP_BLENDING_MULTIPLY\n			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n		#elif defined( ENVMAP_BLENDING_MIX )\n			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n		#elif defined( ENVMAP_BLENDING_ADD )\n			outgoingLight += envColor.xyz * specularStrength * reflectivity;\n		#endif\n	#endif\n#endif",
	envmap_common_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float envMapIntensity;\n	uniform mat3 envMapRotation;\n	uniform samplerCube envMap;\n	#ifdef ENVMAP_TYPE_PMREM\n		float roughnessToMip( const in float roughness ) {\n			float r = clamp( roughness, 0.0, 1.0 );\n			return ENVMAP_MAX_LOD * r * ( 2.0 - r );\n		}\n	#endif\n#endif",
	envmap_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float reflectivity;\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		varying vec3 vWorldPosition;\n		uniform float refractionRatio;\n	#else\n		varying vec3 vReflect;\n	#endif\n#endif",
	envmap_pars_vertex: "#ifdef USE_ENVMAP\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		\n		varying vec3 vWorldPosition;\n	#else\n		varying vec3 vReflect;\n		uniform float refractionRatio;\n	#endif\n#endif",
	envmap_physical_pars_fragment: "#ifdef USE_ENVMAP\n	vec3 getIBLIrradiance( const in vec3 normal ) {\n		#ifdef ENVMAP_TYPE_PMREM\n			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );\n			return PI * envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n		#ifdef ENVMAP_TYPE_PMREM\n			vec3 reflectVec = reflect( - viewDir, normal );\n			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );\n			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );\n			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );\n			return envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	#ifdef USE_RETROREFLECTION\n		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n			#ifdef ENVMAP_TYPE_PMREM\n				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );\n				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );\n				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );\n				return envMapColor.rgb * envMapIntensity;\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n	#endif\n	#ifdef USE_ANISOTROPY\n		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n			#ifdef ENVMAP_TYPE_PMREM\n				vec3 bentNormal = cross( bitangent, viewDir );\n				bentNormal = normalize( cross( bentNormal, bitangent ) );\n				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n				return getIBLRadiance( viewDir, bentNormal, roughness );\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n		#ifdef USE_RETROREFLECTION\n			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n				#ifdef ENVMAP_TYPE_PMREM\n					vec3 bentNormal = cross( bitangent, viewDir );\n					bentNormal = normalize( cross( bentNormal, bitangent ) );\n					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n					return getIBLRetroRadiance( viewDir, bentNormal, roughness );\n				#else\n					return vec3( 0.0 );\n				#endif\n			}\n		#endif\n	#endif\n#endif",
	envmap_vertex: "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vWorldPosition = worldPosition.xyz;\n	#else\n		vec3 cameraToVertex;\n		if ( isOrthographic ) {\n			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n		}\n		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vReflect = reflect( cameraToVertex, worldNormal );\n		#else\n			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n		#endif\n	#endif\n#endif",
	fog_vertex: "#ifdef USE_FOG\n	vFogDepth = - mvPosition.z;\n#endif",
	fog_pars_vertex: "#ifdef USE_FOG\n	varying float vFogDepth;\n#endif",
	fog_fragment: "#ifdef USE_FOG\n	#ifdef FOG_EXP2\n		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n	#else\n		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n	#endif\n	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
	fog_pars_fragment: "#ifdef USE_FOG\n	uniform vec3 fogColor;\n	varying float vFogDepth;\n	#ifdef FOG_EXP2\n		uniform float fogDensity;\n	#else\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n#endif",
	gradientmap_pars_fragment: "#ifdef USE_GRADIENTMAP\n	uniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n	float dotNL = dot( normal, lightDirection );\n	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n	#ifdef USE_GRADIENTMAP\n		return vec3( texture2D( gradientMap, coord ).r );\n	#else\n		vec2 fw = fwidth( coord ) * 0.5;\n		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n	#endif\n}",
	lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n	uniform sampler2D lightMap;\n	uniform float lightMapIntensity;\n#endif",
	lights_lambert_fragment: "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;",
	lights_lambert_pars_fragment: "varying vec3 vViewPosition;\nstruct LambertMaterial {\n	vec3 diffuseColor;\n	float specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Lambert\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert",
	lights_pars_begin: "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n	uniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n	float x = normal.x, y = normal.y, z = normal.z;\n	vec3 result = shCoefficients[ 0 ] * 0.886227;\n	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n	return result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n	return irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n	vec3 irradiance = ambientLightColor;\n	return irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n	if ( cutoffDistance > 0.0 ) {\n		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n	}\n	return distanceFalloff;\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n	return smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_SUN_LIGHTS > 0\n	struct SunLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];\n	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {\n		light.color = sunLight.color;\n		light.direction = sunLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_DIR_LIGHTS > 0\n	struct DirectionalLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n		light.color = directionalLight.color;\n		light.direction = directionalLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_POINT_LIGHTS > 0\n	struct PointLight {\n		vec3 position;\n		vec3 color;\n		float distance;\n		float decay;\n	};\n	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = pointLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float lightDistance = length( lVector );\n		light.color = pointLight.color;\n		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n		light.visible = ( light.color != vec3( 0.0 ) );\n	}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n	struct SpotLight {\n		vec3 position;\n		vec3 direction;\n		vec3 color;\n		float distance;\n		float decay;\n		float coneCos;\n		float penumbraCos;\n	};\n	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = spotLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float angleCos = dot( light.direction, spotLight.direction );\n		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n		if ( spotAttenuation > 0.0 ) {\n			float lightDistance = length( lVector );\n			light.color = spotLight.color * spotAttenuation;\n			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n			light.visible = ( light.color != vec3( 0.0 ) );\n		} else {\n			light.color = vec3( 0.0 );\n			light.visible = false;\n		}\n	}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n	struct RectAreaLight {\n		vec3 color;\n		vec3 position;\n		vec3 halfWidth;\n		vec3 halfHeight;\n	};\n	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;\n	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n	struct HemisphereLight {\n		vec3 direction;\n		vec3 skyColor;\n		vec3 groundColor;\n	};\n	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n		float dotNL = dot( normal, hemiLight.direction );\n		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n		return irradiance;\n	}\n#endif\n#include <lightprobes_pars_fragment>",
	lights_toon_fragment: "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",
	lights_toon_pars_fragment: "varying vec3 vViewPosition;\nstruct ToonMaterial {\n	vec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Toon\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon",
	lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
	lights_phong_pars_fragment: "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n	vec3 diffuseColor;\n	vec3 specularColor;\n	float specularShininess;\n	float specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong",
	lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.metalness = metalnessFactor;\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.045 );\nmaterial.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef USE_DIFFUSE_ROUGHNESS\n	float diffuseRoughnessFactor = diffuseRoughness;\n	#ifdef USE_DIFFUSE_ROUGHNESSMAP\n		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;\n	#endif\n	material.diffuseRoughness = saturate( diffuseRoughnessFactor );\n#endif\n#ifdef IOR\n	material.ior = ior;\n	#ifdef USE_SPECULAR\n		float specularIntensityFactor = specularIntensity;\n		vec3 specularColorFactor = specularColor;\n		#ifdef USE_SPECULAR_COLORMAP\n			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n		#endif\n		#ifdef USE_SPECULAR_INTENSITYMAP\n			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n		#endif\n		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n	#else\n		float specularIntensityFactor = 1.0;\n		vec3 specularColorFactor = vec3( 1.0 );\n		material.specularF90 = 1.0;\n	#endif\n	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n#else\n	material.specularColor = vec3( 0.04 );\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n	material.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n	material.clearcoat = clearcoat;\n	material.clearcoatRoughness = clearcoatRoughness;\n	material.clearcoatF0 = vec3( 0.04 );\n	material.clearcoatF90 = 1.0;\n	#ifdef USE_CLEARCOATMAP\n		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n	#endif\n	#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n	#endif\n	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );\n	material.clearcoatRoughness += geometryRoughness;\n	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_DISPERSION\n	material.dispersion = dispersion;\n#endif\n#ifdef USE_RETROREFLECTION\n	material.retroreflectivity = retroreflectivity;\n#endif\n#ifdef USE_IRIDESCENCE\n	material.iridescence = iridescence;\n	material.iridescenceIOR = iridescenceIOR;\n	#ifdef USE_IRIDESCENCEMAP\n		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n	#endif\n	#ifdef USE_IRIDESCENCE_THICKNESSMAP\n		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n	#else\n		material.iridescenceThickness = iridescenceThicknessMaximum;\n	#endif\n#endif\n#ifdef USE_SHEEN\n	material.sheenColor = sheenColor;\n	#ifdef USE_SHEEN_COLORMAP\n		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n	#endif\n	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	#ifdef USE_ANISOTROPYMAP\n		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n	#else\n		vec2 anisotropyV = anisotropyVector;\n	#endif\n	material.anisotropy = length( anisotropyV );\n	if( material.anisotropy == 0.0 ) {\n		anisotropyV = vec2( 1.0, 0.0 );\n	} else {\n		anisotropyV /= material.anisotropy;\n		material.anisotropy = saturate( material.anisotropy );\n	}\n	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif",
	lights_physical_pars_fragment: "uniform sampler2D dfgLUT;\nstruct PhysicalMaterial {\n	vec3 diffuseColor;\n	vec3 diffuseContribution;\n	vec3 specularColor;\n	vec3 specularColorBlended;\n	float roughness;\n	float metalness;\n	float specularF90;\n	float dispersion;\n	vec2 dfg;\n	vec3 multiScatteringCompensation;\n	#ifdef USE_DIFFUSE_ROUGHNESS\n		float diffuseRoughness;\n	#endif\n	#ifdef USE_RETROREFLECTION\n		float retroreflectivity;\n	#endif\n	#ifdef USE_CLEARCOAT\n		float clearcoat;\n		float clearcoatRoughness;\n		vec3 clearcoatF0;\n		float clearcoatF90;\n	#endif\n	#ifdef USE_IRIDESCENCE\n		float iridescence;\n		float iridescenceIOR;\n		float iridescenceThickness;\n		vec3 iridescenceFresnel;\n		vec3 iridescenceF0Dielectric;\n		vec3 iridescenceF0Metallic;\n	#endif\n	#ifdef USE_SHEEN\n		vec3 sheenColor;\n		float sheenRoughness;\n	#endif\n	#ifdef IOR\n		float ior;\n	#endif\n	#ifdef USE_TRANSMISSION\n		float transmission;\n		float transmissionAlpha;\n		float thickness;\n		float attenuationDistance;\n		vec3 attenuationColor;\n	#endif\n	#ifdef USE_ANISOTROPY\n		float anisotropy;\n		float alphaT;\n		vec3 anisotropyT;\n		vec3 anisotropyB;\n	#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\n#ifdef USE_DIFFUSE_ROUGHNESS\n	const float EON_EPSILON = 1e-7;\n	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {\n		float muComp = 1.0 - mu;\n		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );\n		return A * ( 1.0 + roughness * gOverPi );\n	}\n	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {\n		vec3 rho = saturate( diffuseColor );\n		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float s = dot( lightDir, viewDir ) - dotNL * dotNV;\n		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;\n		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );\n		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );\n		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );\n		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );\n		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );\n		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );\n		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI\n			* max( EON_EPSILON, 1.0 - albedoV )\n			* max( EON_EPSILON, 1.0 - albedoL )\n			/ max( EON_EPSILON, 1.0 - averageAlbedo );\n		return singleScatter + multiScatter;\n	}\n	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {\n		vec3 rho = saturate( diffuseColor );\n		if ( roughness <= EON_EPSILON ) return rho;\n		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );\n		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );\n		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );\n		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );\n		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );\n	}\n#endif\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n	float a2 = pow2( alpha );\n	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n	return 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n	float a2 = pow2( alpha );\n	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n	return RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n		return 0.5 / max( gv + gl, EPSILON );\n	}\n	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n		float a2 = alphaT * alphaB;\n		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n		highp float v2 = dot( v, v );\n		float w2 = a2 / v2;\n		return RECIPROCAL_PI * a2 * pow2 ( w2 );\n	}\n#endif\n#ifdef USE_CLEARCOAT\n	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n		vec3 f0 = material.clearcoatF0;\n		float f90 = material.clearcoatF90;\n		float roughness = max( material.clearcoatRoughness, 0.045 );\n		float alpha = pow2( roughness );\n		vec3 halfDir = normalize( lightDir + viewDir );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float dotNH = saturate( dot( normal, halfDir ) );\n		float dotVH = saturate( dot( viewDir, halfDir ) );\n		vec3 F = F_Schlick( f0, f90, dotVH );\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n		return F * ( V * D );\n	}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n	vec3 f0 = material.specularColorBlended;\n	float f90 = material.specularF90;\n	float roughness = max( material.roughness, 0.045 );\n	float alpha = pow2( roughness );\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( f0, f90, dotVH );\n	#ifdef USE_IRIDESCENCE\n		F = mix( F, material.iridescenceFresnel, material.iridescence );\n	#endif\n	#ifdef USE_ANISOTROPY\n		float dotTL = dot( material.anisotropyT, lightDir );\n		float dotTV = dot( material.anisotropyT, viewDir );\n		float dotTH = dot( material.anisotropyT, halfDir );\n		float dotBL = dot( material.anisotropyB, lightDir );\n		float dotBV = dot( material.anisotropyB, viewDir );\n		float dotBH = dot( material.anisotropyB, halfDir );\n		float alphaT = max( material.alphaT, alpha );\n		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );\n	#else\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n	#endif\n	return F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n	const float LUT_SIZE = 64.0;\n	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n	const float LUT_BIAS = 0.5 / LUT_SIZE;\n	float dotNV = saturate( dot( N, V ) );\n	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n	uv = uv * LUT_SCALE + LUT_BIAS;\n	return uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n	float l = length( f );\n	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n	float x = dot( v1, v2 );\n	float y = abs( x );\n	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n	float b = 3.4175940 + ( 4.1616724 + y ) * y;\n	float v = a / b;\n	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n	return cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n	vec3 lightNormal = cross( v1, v2 );\n	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n	vec3 T1, T2;\n	T1 = normalize( V - N * dot( V, N ) );\n	T2 = - cross( N, T1 );\n	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );\n	vec3 coords[ 4 ];\n	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n	coords[ 0 ] = normalize( coords[ 0 ] );\n	coords[ 1 ] = normalize( coords[ 1 ] );\n	coords[ 2 ] = normalize( coords[ 2 ] );\n	coords[ 3 ] = normalize( coords[ 3 ] );\n	vec3 vectorFormFactor = vec3( 0.0 );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n	return vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n	float alpha = pow2( roughness );\n	float invAlpha = 1.0 / alpha;\n	float cos2h = dotNH * dotNH;\n	float sin2h = max( 1.0 - cos2h, 0.0078125 );\n	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float D = D_Charlie( sheenRoughness, dotNH );\n	float V = V_Neubelt( dotNV, dotNL );\n	return sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float r2 = roughness * roughness;\n	float rInv = 1.0 / ( roughness + 0.1 );\n	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;\n	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;\n	float DG = exp( a * dotNV + b );\n	return saturate( DG );\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;\n	return specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n	#ifdef USE_IRIDESCENCE\n		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n	#else\n		vec3 Fr = specularColor;\n	#endif\n	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n	float Ess = fab.x + fab.y;\n	float Ems = 1.0 - Ess;\n	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n	singleScatter += FssEss;\n	multiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n		vec3 normal = geometryNormal;\n		vec3 viewDir = geometryViewDir;\n		vec3 position = geometryPosition;\n		vec3 lightPos = rectAreaLight.position;\n		vec3 halfWidth = rectAreaLight.halfWidth;\n		vec3 halfHeight = rectAreaLight.halfHeight;\n		vec3 lightColor = rectAreaLight.color;\n		float roughness = material.roughness;\n		vec3 rectCoords[ 4 ];\n		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n		vec2 uv = LTC_Uv( normal, viewDir, roughness );\n		vec4 t1 = texture2D( ltc_1, uv );\n		vec4 t2 = texture2D( ltc_2, uv );\n		mat3 mInv = mat3(\n			vec3( t1.x, 0, t1.y ),\n			vec3(    0, 1,    0 ),\n			vec3( t1.z, 0, t1.w )\n		);\n		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );\n		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n		#ifdef USE_CLEARCOAT\n			vec3 Ncc = geometryClearcoatNormal;\n			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );\n			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );\n			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );\n			mat3 mInvClearcoat = mat3(\n				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),\n				vec3(             0, 1,             0 ),\n				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )\n			);\n			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;\n			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );\n		#endif\n	}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	#ifdef USE_CLEARCOAT\n		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n		vec3 ccIrradiance = dotNLcc * directLight.color;\n		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n	#endif\n	#ifdef USE_SHEEN\n \n 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n \n 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );\n \n 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );\n \n 		irradiance *= sheenEnergyComp;\n \n 	#endif\n	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n	#ifdef USE_RETROREFLECTION\n		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );\n		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );\n		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );\n	#endif\n	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;\n	vec3 halfDir = normalize( directLight.direction + geometryViewDir );\n	float dotVH = saturate( dot( geometryViewDir, halfDir ) );\n	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );\n	#ifdef USE_RETROREFLECTION\n		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );\n		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );\n		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );\n		F = mix( F, retroF, saturate( material.retroreflectivity ) );\n	#endif\n	#ifdef USE_DIFFUSE_ROUGHNESS\n		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );\n	#else\n		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );\n	#endif\n	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 singleScattering = vec3( 0.0 );\n	vec3 multiScattering = vec3( 0.0 );\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );\n	#else\n		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );\n	#endif\n	#ifdef USE_DIFFUSE_ROUGHNESS\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );\n		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );\n	#else\n		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );\n	#endif\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		diffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectDiffuse += diffuse;\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n	#ifdef USE_CLEARCOAT\n		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;\n 	#endif\n	vec3 singleScatteringDielectric = vec3( 0.0 );\n	vec3 multiScatteringDielectric = vec3( 0.0 );\n	vec3 singleScatteringMetallic = vec3( 0.0 );\n	vec3 multiScatteringMetallic = vec3( 0.0 );\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );\n	#else\n		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );\n	#endif\n	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );\n	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );\n	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;\n	#ifdef USE_DIFFUSE_ROUGHNESS\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );\n	#else\n		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );\n	#endif\n	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n	vec3 indirectSpecular = radiance * singleScattering;\n	indirectSpecular += multiScattering * cosineWeightedIrradiance;\n	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		indirectSpecular *= sheenEnergyComp;\n		indirectDiffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectSpecular += indirectSpecular;\n	reflectedLight.indirectDiffuse += indirectDiffuse;\n}\n#define RE_Direct				RE_Direct_Physical\n#define RE_Direct_RectArea		RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular		RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
	lights_fragment_begin: "\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n	geometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n	float dotNVi = saturate( dot( normal, geometryViewDir ) );\n	if ( material.iridescenceThickness == 0.0 ) {\n		material.iridescence = 0.0;\n	} else {\n		material.iridescence = saturate( material.iridescence );\n	}\n	if ( material.iridescence > 0.0 ) {\n		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );\n		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );\n		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );\n		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );\n	}\n#endif\n#ifdef STANDARD\n	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );\n	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;\n	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )\n		float EssMs = material.dfg.x + material.dfg.y;\n		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );\n	#endif\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n	PointLight pointLight;\n	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		pointLight = pointLights[ i ];\n		getPointLightInfo( pointLight, geometryPosition, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n		pointLightShadow = pointLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n	SpotLight spotLight;\n	vec4 spotColor;\n	vec3 spotLightCoord;\n	bool inSpotLightMap;\n	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		spotLight = spotLights[ i ];\n		getSpotLightInfo( spotLight, geometryPosition, directLight );\n		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n		#else\n		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#endif\n		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n		#endif\n		#undef SPOT_LIGHT_MAP_INDEX\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		spotLightShadow = spotLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )\n	SunLight sunLight;\n	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0\n	SunLightShadow sunLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {\n		sunLight = sunLights[ i ];\n		getSunLightInfo( sunLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )\n		sunLightShadow = sunLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n	DirectionalLight directionalLight;\n	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		directionalLight = directionalLights[ i ];\n		getDirectionalLightInfo( directionalLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n		directionalLightShadow = directionalLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n	RectAreaLight rectAreaLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n		rectAreaLight = rectAreaLights[ i ];\n		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n	vec3 iblIrradiance = vec3( 0.0 );\n	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n	#if defined( USE_LIGHT_PROBES )\n		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n	#endif\n	#if ( NUM_HEMI_LIGHTS > 0 )\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_LIGHT_PROBE_GRIDS > 0\n		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;\n		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );\n		int probeGrid = - 1;\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {\n			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;\n		}\n		#pragma unroll_loop_end\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {\n			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if defined( RE_IndirectSpecular )\n	vec3 radiance = vec3( 0.0 );\n	vec3 clearcoatRadiance = vec3( 0.0 );\n#endif",
	lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n		irradiance += lightMapIrradiance;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )\n		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )\n			iblIrradiance += getIBLIrradiance( geometryNormal );\n		#endif\n	#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n	#ifdef USE_ANISOTROPY\n		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n	#else\n		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n	#endif\n	#ifdef USE_RETROREFLECTION\n		#ifdef USE_ANISOTROPY\n			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n		#else\n			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );\n		#endif\n		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );\n	#endif\n	radiance += iblRadiance;\n	#ifdef USE_CLEARCOAT\n		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n	#endif\n#endif",
	lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n	#if defined( LAMBERT ) || defined( PHONG )\n		irradiance += iblIrradiance;\n	#endif\n	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif",
	lightprobes_pars_fragment: "#if NUM_LIGHT_PROBE_GRIDS > 0\nuniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];\nuniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];\nuniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];\nuniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];\nbool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {\n	vec3 spacing = ( probesMax - probesMin ) / probesResolution;\n	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;\n	vec3 margin = spacing * 0.01;\n	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );\n}\nvec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {\n	vec3 res = probesResolution;\n	vec3 gridRange = probesMax - probesMin;\n	vec3 probeSpacing = gridRange / res;\n	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;\n	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );\n	float nz          = res.z;\n	float paddedSlices = nz + 2.0;\n	float atlasDepth  = 7.0 * paddedSlices;\n	float uvZBase     = uvw.z * nz + 1.0;\n	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );\n	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );\n	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );\n	vec3 c0 = s0.xyz;\n	vec3 c1 = vec3( s0.w, s1.xy );\n	vec3 c2 = vec3( s1.zw, s2.x );\n	vec3 c3 = s2.yzw;\n	vec3 c4 = s3.xyz;\n	vec3 c5 = vec3( s3.w, s4.xy );\n	vec3 c6 = vec3( s4.zw, s5.x );\n	vec3 c7 = s5.yzw;\n	vec3 c8 = s6.xyz;\n	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;\n	vec3 result = c0 * 0.886227;\n	result += c1 * 2.0 * 0.511664 * y;\n	result += c2 * 2.0 * 0.511664 * z;\n	result += c3 * 2.0 * 0.511664 * x;\n	result += c4 * 2.0 * 0.429043 * x * y;\n	result += c5 * 2.0 * 0.429043 * y * z;\n	result += c6 * ( 0.743125 * z * z - 0.247708 );\n	result += c7 * 2.0 * 0.429043 * x * z;\n	result += c8 * 0.429043 * ( x * x - y * y );\n	return max( result, vec3( 0.0 ) );\n}\n#endif",
	logdepthbuf_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
	logdepthbuf_pars_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	uniform float logDepthBufFC;\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif",
	logdepthbuf_pars_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif",
	logdepthbuf_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	vFragDepth = 1.0 + gl_Position.w;\n	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n#endif",
	map_fragment: "#ifdef USE_MAP\n	vec4 sampledDiffuseColor = texture2D( map, vMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );\n	#endif\n	diffuseColor *= sampledDiffuseColor;\n#endif",
	map_pars_fragment: "#ifdef USE_MAP\n	uniform sampler2D map;\n#endif",
	map_particle_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n	#if defined( USE_POINTS_UV )\n		vec2 uv = vUv;\n	#else\n		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n	#endif\n#endif\n#ifdef USE_MAP\n	diffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",
	map_particle_pars_fragment: "#if defined( USE_POINTS_UV )\n	varying vec2 vUv;\n#else\n	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n		uniform mat3 uvTransform;\n	#endif\n#endif\n#ifdef USE_MAP\n	uniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif",
	metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n	metalnessFactor *= texelMetalness.b;\n#endif",
	metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n	uniform sampler2D metalnessMap;\n#endif",
	morphinstance_vertex: "#ifdef USE_INSTANCING_MORPH\n	float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n	}\n#endif",
	morphcolor_vertex: "#if defined( USE_MORPHCOLORS )\n	#if defined( USE_COLOR_ALPHA )\n		vColor *= morphTargetBaseInfluence;\n	#elif defined( USE_COLOR )\n		vColor.rgb *= morphTargetBaseInfluence;\n	#endif\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		#if defined( USE_COLOR_ALPHA )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n		#elif defined( USE_COLOR )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n		#endif\n	}\n#endif",
	morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n	objectNormal *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif",
	morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n	#ifndef USE_INSTANCING_MORPH\n		uniform float morphTargetBaseInfluence;\n		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	#endif\n	uniform sampler2DArray morphTargetsTexture;\n	uniform ivec2 morphTargetsTextureSize;\n	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n		int y = texelIndex / morphTargetsTextureSize.x;\n		int x = texelIndex - y * morphTargetsTextureSize.x;\n		ivec3 morphUV = ivec3( x, y, morphTargetIndex );\n		return texelFetch( morphTargetsTexture, morphUV, 0 );\n	}\n#endif",
	morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n	transformed *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif",
	normal_fragment_begin: "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n#else\n	vec3 normal = normalize( vNormal );\n	#ifdef DOUBLE_SIDED\n		normal *= faceDirection;\n	#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n	#ifdef USE_TANGENT\n		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn = getTangentFrame( - vViewPosition, normal,\n		#if defined( USE_NORMALMAP )\n			vNormalMapUv\n		#elif defined( USE_CLEARCOAT_NORMALMAP )\n			vClearcoatNormalMapUv\n		#else\n			vUv\n		#endif\n		);\n	#endif\n	#ifdef DOUBLE_SIDED\n		tbn[0] *= faceDirection;\n		tbn[1] *= faceDirection;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	#ifdef USE_TANGENT\n		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n	#endif\n	#ifdef DOUBLE_SIDED\n		tbn2[0] *= faceDirection;\n		tbn2[1] *= faceDirection;\n	#endif\n#endif\nvec3 nonPerturbedNormal = normal;",
	normal_fragment_maps: "#ifdef USE_NORMALMAP_OBJECTSPACE\n	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#ifdef FLIP_SIDED\n		normal = - normal;\n	#endif\n	#ifdef DOUBLE_SIDED\n		normal = normal * faceDirection;\n	#endif\n	normal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#if defined( USE_PACKED_NORMALMAP )\n		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );\n	#endif\n	mapN.xy *= normalScale;\n	normal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",
	normal_pars_fragment: "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif",
	normal_pars_vertex: "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif",
	normal_vertex: "#ifndef FLAT_SHADED\n	vNormal = normalize( transformedNormal );\n	#ifdef USE_TANGENT\n		vTangent = normalize( transformedTangent );\n		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n		#ifdef FLIP_SIDED\n			vBitangent = - vBitangent;\n		#endif\n	#endif\n#endif",
	normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n	uniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( uv.st );\n		vec2 st1 = dFdy( uv.st );\n		vec3 N = surf_norm;\n		vec3 q1perp = cross( q1, N );\n		vec3 q0perp = cross( N, q0 );\n		vec3 T = q1perp * st0.x + q0perp * st1.x;\n		vec3 B = q1perp * st0.y + q0perp * st1.y;\n		float det = max( dot( T, T ), dot( B, B ) );\n		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n		return mat3( T * scale, B * scale, N );\n	}\n#endif",
	clearcoat_normal_fragment_begin: "#ifdef USE_CLEARCOAT\n	vec3 clearcoatNormal = nonPerturbedNormal;\n#endif",
	clearcoat_normal_fragment_maps: "#ifdef USE_CLEARCOAT_NORMALMAP\n	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n	clearcoatMapN.xy *= clearcoatNormalScale;\n	clearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif",
	clearcoat_pars_fragment: "#ifdef USE_CLEARCOATMAP\n	uniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform sampler2D clearcoatNormalMap;\n	uniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform sampler2D clearcoatRoughnessMap;\n#endif",
	iridescence_pars_fragment: "#ifdef USE_IRIDESCENCEMAP\n	uniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform sampler2D iridescenceThicknessMap;\n#endif",
	opaque_fragment: "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );",
	packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n	return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n	return 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;\nconst float Inv255 = 1. / 255.;\nconst vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );\nconst vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );\nconst vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );\nconst vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );\nvec4 packDepthToRGBA( const in float v ) {\n	if( v <= 0.0 )\n		return vec4( 0., 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec4( 1., 1., 1., 1. );\n	float vuf;\n	float af = modf( v * PackFactors.a, vuf );\n	float bf = modf( vuf * ShiftRight8, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );\n}\nvec3 packDepthToRGB( const in float v ) {\n	if( v <= 0.0 )\n		return vec3( 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec3( 1., 1., 1. );\n	float vuf;\n	float bf = modf( v * PackFactors.b, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec3( vuf * Inv255, gf * PackUpscale, bf );\n}\nvec2 packDepthToRG( const in float v ) {\n	if( v <= 0.0 )\n		return vec2( 0., 0. );\n	if( v >= 1.0 )\n		return vec2( 1., 1. );\n	float vuf;\n	float gf = modf( v * 256., vuf );\n	return vec2( vuf * Inv255, gf );\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n	return dot( v, UnpackFactors4 );\n}\nfloat unpackRGBToDepth( const in vec3 v ) {\n	return dot( v, UnpackFactors3 );\n}\nfloat unpackRGToDepth( const in vec2 v ) {\n	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;\n}\nvec4 pack2HalfToRGBA( const in vec2 v ) {\n	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( const in vec4 v ) {\n	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n	\n		return depth * ( far - near ) - far;\n	#else\n		return depth * ( near - far ) - near;\n	#endif\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		return ( near * far ) / ( ( near - far ) * depth - near );\n	#else\n		return ( near * far ) / ( ( far - near ) * depth - far );\n	#endif\n}",
	premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n	gl_FragColor.rgb *= gl_FragColor.a;\n#endif",
	project_vertex: "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n	mvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n	mvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",
	dithering_fragment: "#ifdef DITHERING\n	gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
	dithering_pars_fragment: "#ifdef DITHERING\n	vec3 dithering( vec3 color ) {\n		float grid_position = rand( gl_FragCoord.xy );\n		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n		return color + dither_shift_RGB;\n	}\n#endif",
	roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n	roughnessFactor *= texelRoughness.g;\n#endif",
	roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n	uniform sampler2D roughnessMap;\n#endif",
	shadowmap_pars_fragment: "#if NUM_SPOT_LIGHT_COORDS > 0\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		#define SUN_LIGHT_CASCADES 2\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];\n		#endif\n		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];\n		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];\n		varying vec4 vSunShadowWorldPosition;\n		varying vec3 vSunShadowWorldNormal;\n		struct SunLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#endif\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#elif defined( SHADOWMAP_TYPE_BASIC )\n			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float interleavedGradientNoise( vec2 position ) {\n			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );\n		}\n		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {\n			const float goldenAngle = 2.399963229728653;\n			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );\n			float theta = float( sampleIndex ) * goldenAngle + phi;\n			return vec2( cos( theta ), sin( theta ) ) * r;\n		}\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n				vec2 radius = shadowRadius * texelSize;\n				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n				shadow = (\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )\n				) * 0.2;\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#elif defined( SHADOWMAP_TYPE_VSM )\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;\n				float mean = distribution.x;\n				float variance = distribution.y * distribution.y;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					float hard_shadow = step( mean, shadowCoord.z );\n				#else\n					float hard_shadow = step( shadowCoord.z, mean );\n				#endif\n				\n				if ( hard_shadow == 1.0 ) {\n					shadow = 1.0;\n				} else {\n					variance = max( variance, 0.0000001 );\n					float d = shadowCoord.z - mean;\n					float p_max = variance / ( variance + d * d );\n					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );\n					shadow = max( hard_shadow, p_max );\n				}\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#else\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				float depth = texture2D( shadowMap, shadowCoord.xy ).r;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					shadow = step( depth, shadowCoord.z );\n				#else\n					shadow = step( shadowCoord.z, depth );\n				#endif\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#endif\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		float getSunShadow(\n			#if defined( SHADOWMAP_TYPE_PCF )\n				sampler2DShadow shadowMap,\n			#else\n				sampler2D shadowMap,\n			#endif\n			SunLightShadow sunLightShadow,\n			int shadowIndex\n		) {\n			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );\n			float viewDepth = vSunShadowWorldPosition.w;\n			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;\n			float shadow = 1.0;\n			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {\n				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];\n				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {\n					float cascadeShadow = getShadow(\n						shadowMap,\n						sunLightShadow.shadowMapSize,\n						sunLightShadow.shadowIntensity,\n						sunLightShadow.shadowBias,\n						sunLightShadow.shadowRadius,\n						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition\n					);\n					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );\n				}\n			}\n			return shadow;\n		}\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n	#if defined( SHADOWMAP_TYPE_PCF )\n	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 bd3D = normalize( lightToPosition );\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			float lightDistance = length( lightToPosition );\n			float depthRange = shadowCameraFar - shadowCameraNear;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				float depthA = - shadowCameraNear / depthRange - shadowBias;\n				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );\n			#else\n				float depthA = shadowCameraFar / depthRange + shadowBias;\n				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );\n			#endif\n			float texelSize = shadowRadius / shadowMapSize.x;\n			vec3 absDir = abs( bd3D );\n			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );\n			tangent = normalize( cross( bd3D, tangent ) );\n			vec3 bitangent = cross( bd3D, tangent );\n			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n			shadow = 0.0;\n			for ( int i = 0; i < 5; i ++ ) {\n				vec2 offset = vogelDiskSample( i, 5, phi );\n				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;\n				vec3 absDirection = abs( direction );\n				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );\n				shadow += texture( shadowMap, vec4( direction, dp ) );\n			}\n			shadow *= 0.2;\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#elif defined( SHADOWMAP_TYPE_BASIC )\n	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n			dp += shadowBias;\n			vec3 bd3D = normalize( lightToPosition );\n			float depth = textureCube( shadowMap, bd3D ).r;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				depth = 1.0 - depth;\n			#endif\n			shadow = step( dp, depth );\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#endif\n	#endif\n#endif",
	shadowmap_pars_vertex: "#if NUM_SPOT_LIGHT_COORDS > 0\n	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		varying vec4 vSunShadowWorldPosition;\n		varying vec3 vSunShadowWorldNormal;\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n#endif",
	shadowmap_vertex: "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n	#ifdef HAS_NORMAL\n		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );\n	#else\n		vec3 shadowWorldNormal = vec3( 0.0 );\n	#endif\n	vec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );\n		vSunShadowWorldNormal = shadowWorldNormal;\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n		shadowWorldPosition = worldPosition;\n		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n		#endif\n		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n	}\n	#pragma unroll_loop_end\n#endif",
	shadowmask_pars_fragment: "float getShadowMask() {\n	float shadow = 1.0;\n	#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n	SunLightShadow sunLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {\n		sunLight = sunLightShadows[ i ];\n		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n		directionalLight = directionalLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n		spotLight = spotLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n	PointLightShadow pointLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n		pointLight = pointLightShadows[ i ];\n		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#endif\n	return shadow;\n}",
	skinbase_vertex: "#ifdef USE_SKINNING\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
	skinning_pars_vertex: "#ifdef USE_SKINNING\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n	uniform highp sampler2D boneTexture;\n	mat4 getBoneMatrix( const in float i ) {\n		int size = textureSize( boneTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n#endif",
	skinning_vertex: "#ifdef USE_SKINNING\n	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	transformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
	skinnormal_vertex: "#ifdef USE_SKINNING\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n	#ifdef USE_TANGENT\n		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n	#endif\n#endif",
	specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n	specularStrength = texelSpecular.r;\n#else\n	specularStrength = 1.0;\n#endif",
	specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n	uniform sampler2D specularMap;\n#endif",
	tonemapping_fragment: "#if defined( TONE_MAPPING )\n	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
	tonemapping_pars_fragment: "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n	return saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	return saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 CineonToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	color = max( vec3( 0.0 ), color - 0.004 );\n	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n	return a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n	const mat3 ACESInputMat = mat3(\n		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),\n		vec3( 0.04823, 0.01566, 0.83777 )\n	);\n	const mat3 ACESOutputMat = mat3(\n		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),\n		vec3( -0.07367, -0.00605,  1.07602 )\n	);\n	color *= toneMappingExposure / 0.6;\n	color = ACESInputMat * color;\n	color = RRTAndODTFit( color );\n	color = ACESOutputMat * color;\n	return saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n	vec3( 1.6605, - 0.1246, - 0.0182 ),\n	vec3( - 0.5876, 1.1329, - 0.1006 ),\n	vec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n	vec3( 0.6274, 0.0691, 0.0164 ),\n	vec3( 0.3293, 0.9195, 0.0880 ),\n	vec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n	vec3 x2 = x * x;\n	vec3 x4 = x2 * x2;\n	return + 15.5 * x4 * x2\n		- 40.14 * x4 * x\n		+ 31.96 * x4\n		- 6.868 * x2 * x\n		+ 0.4298 * x2\n		+ 0.1191 * x\n		- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n	const mat3 AgXInsetMatrix = mat3(\n		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n	);\n	const mat3 AgXOutsetMatrix = mat3(\n		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n	);\n	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;\n	color *= toneMappingExposure;\n	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n	color = AgXInsetMatrix * color;\n	color = max( color, 1e-10 );	color = log2( color );\n	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n	color = clamp( color, 0.0, 1.0 );\n	color = agxDefaultContrastApprox( color );\n	color = AgXOutsetMatrix * color;\n	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n	color = clamp( color, 0.0, 1.0 );\n	return color;\n}\nvec3 NeutralToneMapping( vec3 color ) {\n	const float StartCompression = 0.8 - 0.04;\n	const float Desaturation = 0.15;\n	color *= toneMappingExposure;\n	float x = min( color.r, min( color.g, color.b ) );\n	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n	color -= offset;\n	float peak = max( color.r, max( color.g, color.b ) );\n	if ( peak < StartCompression ) return color;\n	float d = 1. - StartCompression;\n	float newPeak = 1. - d * d / ( peak + d - StartCompression );\n	color *= newPeak / peak;\n	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n	return mix( color, vec3( newPeak ), g );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",
	transmission_fragment: "#ifdef USE_TRANSMISSION\n	material.transmission = transmission;\n	material.transmissionAlpha = 1.0;\n	material.thickness = thickness;\n	material.attenuationDistance = attenuationDistance;\n	material.attenuationColor = attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n	#endif\n	vec3 pos = vWorldPosition;\n	vec3 v = normalize( cameraPosition - pos );\n	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );\n	vec4 transmitted = getIBLVolumeRefraction(\n		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,\n		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n		material.attenuationColor, material.attenuationDistance );\n	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif",
	transmission_pars_fragment: "#ifdef USE_TRANSMISSION\n	uniform float transmission;\n	uniform float thickness;\n	uniform float attenuationDistance;\n	uniform vec3 attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		uniform sampler2D transmissionMap;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		uniform sampler2D thicknessMap;\n	#endif\n	uniform vec2 transmissionSamplerSize;\n	uniform sampler2D transmissionSamplerMap;\n	uniform mat4 modelMatrix;\n	uniform mat4 projectionMatrix;\n	varying vec3 vWorldPosition;\n	float w0( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n	}\n	float w1( float a ) {\n		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n	}\n	float w2( float a ){\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n	}\n	float w3( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * a * a );\n	}\n	float g0( float a ) {\n		return w0( a ) + w1( a );\n	}\n	float g1( float a ) {\n		return w2( a ) + w3( a );\n	}\n	float h0( float a ) {\n		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n	}\n	float h1( float a ) {\n		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n	}\n	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n		uv = uv * texelSize.zw + 0.5;\n		vec2 iuv = floor( uv );\n		vec2 fuv = fract( uv );\n		float g0x = g0( fuv.x );\n		float g1x = g1( fuv.x );\n		float h0x = h0( fuv.x );\n		float h1x = h1( fuv.x );\n		float h0y = h0( fuv.y );\n		float h1y = h1( fuv.y );\n		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n	}\n	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n		vec2 fLodSizeInv = 1.0 / fLodSize;\n		vec2 cLodSizeInv = 1.0 / cLodSize;\n		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n		return mix( fSample, cSample, fract( lod ) );\n	}\n	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n		vec3 modelScale;\n		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n		return normalize( refractionVector ) * thickness * modelScale;\n	}\n	float applyIorToRoughness( const in float roughness, const in float ior ) {\n		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n	}\n	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n	}\n	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n		if ( isinf( attenuationDistance ) ) {\n			return vec3( 1.0 );\n		} else {\n			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;\n		}\n	}\n	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n		const in vec3 attenuationColor, const in float attenuationDistance ) {\n		vec4 transmittedLight;\n		vec3 transmittance;\n		#ifdef USE_DISPERSION\n			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n			for ( int i = 0; i < 3; i ++ ) {\n				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n				vec3 refractedRayExit = position + transmissionRay;\n				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n				vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n				refractionCoords += 1.0;\n				refractionCoords /= 2.0;\n				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n				transmittedLight[ i ] = transmissionSample[ i ];\n				transmittedLight.a += transmissionSample.a;\n				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n			}\n			transmittedLight.a /= 3.0;\n		#else\n			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n			vec3 refractedRayExit = position + transmissionRay;\n			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n			vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n			refractionCoords += 1.0;\n			refractionCoords /= 2.0;\n			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n		#endif\n		vec3 attenuatedColor = transmittance * transmittedLight.rgb;\n		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n	}\n#endif",
	uv_pars_fragment: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_DIFFUSE_ROUGHNESSMAP\n	varying vec2 vDiffuseRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif",
	uv_pars_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	uniform mat3 mapTransform;\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform mat3 alphaMapTransform;\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	uniform mat3 lightMapTransform;\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	uniform mat3 aoMapTransform;\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	uniform mat3 bumpMapTransform;\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	uniform mat3 normalMapTransform;\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	uniform mat3 displacementMapTransform;\n	varying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	uniform mat3 emissiveMapTransform;\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	uniform mat3 metalnessMapTransform;\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	uniform mat3 roughnessMapTransform;\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_DIFFUSE_ROUGHNESSMAP\n	uniform mat3 diffuseRoughnessMapTransform;\n	varying vec2 vDiffuseRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	uniform mat3 anisotropyMapTransform;\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	uniform mat3 clearcoatMapTransform;\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform mat3 clearcoatNormalMapTransform;\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform mat3 clearcoatRoughnessMapTransform;\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	uniform mat3 sheenColorMapTransform;\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	uniform mat3 sheenRoughnessMapTransform;\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	uniform mat3 iridescenceMapTransform;\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform mat3 iridescenceThicknessMapTransform;\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	uniform mat3 specularMapTransform;\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	uniform mat3 specularColorMapTransform;\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	uniform mat3 specularIntensityMapTransform;\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif",
	uv_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	vUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DIFFUSE_ROUGHNESSMAP\n	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif",
	worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n	vec4 worldPosition = vec4( transformed, 1.0 );\n	#ifdef USE_BATCHING\n		worldPosition = batchingMatrix * worldPosition;\n	#endif\n	#ifdef USE_INSTANCING\n		worldPosition = instanceMatrix * worldPosition;\n	#endif\n	worldPosition = modelMatrix * worldPosition;\n#endif",
	background_vert: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	gl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
	background_frag: "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n	vec4 texColor = texture2D( t2D, vUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	backgroundCube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}",
	backgroundCube_frag: "uniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <envmap_common_pars_fragment>\nvoid main() {\n	#ifdef ENVMAP_TYPE_PMREM\n		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );\n	#else\n		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}",
	cube_frag: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n	gl_FragColor = texColor;\n	gl_FragColor.a *= opacity;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	depth_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vHighPrecisionZW = gl_Position.zw;\n}",
	depth_frag: "#if DEPTH_PACKING == 3200\n	uniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#if DEPTH_PACKING == 3200\n		diffuseColor.a = opacity;\n	#endif\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <logdepthbuf_fragment>\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];\n	#else\n		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;\n	#endif\n	#if DEPTH_PACKING == 3200\n		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n	#elif DEPTH_PACKING == 3201\n		gl_FragColor = packDepthToRGBA( fragCoordZ );\n	#elif DEPTH_PACKING == 3202\n		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n	#elif DEPTH_PACKING == 3203\n		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n	#endif\n}",
	distance_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <worldpos_vertex>\n	#include <clipping_planes_vertex>\n	vWorldPosition = worldPosition.xyz;\n}",
	distance_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	float dist = length( vWorldPosition - referencePosition );\n	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n	dist = saturate( dist );\n	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );\n}",
	equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n}",
	equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vec3 direction = normalize( vWorldDirection );\n	vec2 sampleUV = equirectUv( direction );\n	gl_FragColor = texture2D( tEquirect, sampleUV );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	vLineDistance = scale * lineDistance;\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}",
	linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	if ( mod( vLineDistance, totalSize ) > dashSize ) {\n		discard;\n	}\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	meshbasic_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinbase_vertex>\n		#include <skinnormal_vertex>\n		#include <defaultnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <fog_vertex>\n}",
	meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n	#else\n		reflectedLight.indirectDiffuse += vec3( 1.0 );\n	#endif\n	#include <aomap_fragment>\n	reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n	vec3 outgoingLight = reflectedLight.indirectDiffuse;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshlambert_vert: "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshlambert_frag: "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_lambert_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n	vViewPosition = - mvPosition.xyz;\n}",
	meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	vec3 viewDir = normalize( vViewPosition );\n	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n	vec3 y = cross( viewDir, x );\n	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n	#ifdef USE_MATCAP\n		vec4 matcapColor = texture2D( matcap, uv );\n	#else\n		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n	#endif\n	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshnormal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	vViewPosition = - mvPosition.xyz;\n#endif\n}",
	meshnormal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );\n	#ifdef OPAQUE\n		gl_FragColor.a = 1.0;\n	#endif\n}",
	meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_phong_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshphysical_vert: "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n	varying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n	vWorldPosition = worldPosition.xyz;\n#endif\n}",
	meshphysical_frag: "#define STANDARD\n#ifdef PHYSICAL\n	#define IOR\n	#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n	uniform float ior;\n#endif\n#ifdef USE_SPECULAR\n	uniform float specularIntensity;\n	uniform vec3 specularColor;\n	#ifdef USE_SPECULAR_COLORMAP\n		uniform sampler2D specularColorMap;\n	#endif\n	#ifdef USE_SPECULAR_INTENSITYMAP\n		uniform sampler2D specularIntensityMap;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT\n	uniform float clearcoat;\n	uniform float clearcoatRoughness;\n#endif\n#ifdef USE_DIFFUSE_ROUGHNESS\n	uniform float diffuseRoughness;\n	#ifdef USE_DIFFUSE_ROUGHNESSMAP\n		uniform sampler2D diffuseRoughnessMap;\n	#endif\n#endif\n#ifdef USE_DISPERSION\n	uniform float dispersion;\n#endif\n#ifdef USE_RETROREFLECTION\n	uniform float retroreflectivity;\n#endif\n#ifdef USE_IRIDESCENCE\n	uniform float iridescence;\n	uniform float iridescenceIOR;\n	uniform float iridescenceThicknessMinimum;\n	uniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n	uniform vec3 sheenColor;\n	uniform float sheenRoughness;\n	#ifdef USE_SHEEN_COLORMAP\n		uniform sampler2D sheenColorMap;\n	#endif\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		uniform sampler2D sheenRoughnessMap;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	uniform vec2 anisotropyVector;\n	#ifdef USE_ANISOTROPYMAP\n		uniform sampler2D anisotropyMap;\n	#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <roughnessmap_fragment>\n	#include <metalnessmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <clearcoat_normal_fragment_begin>\n	#include <clearcoat_normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_physical_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n	#include <transmission_fragment>\n	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n	#ifdef USE_SHEEN\n \n		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;\n \n 	#endif\n	#ifdef USE_CLEARCOAT\n		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n	#endif\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshtoon_vert: "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshtoon_frag: "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_toon_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n	varying vec2 vUv;\n	uniform mat3 uvTransform;\n#endif\nvoid main() {\n	#ifdef USE_POINTS_UV\n		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	#endif\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	gl_PointSize = size;\n	#ifdef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n	#endif\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <fog_vertex>\n}",
	points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_particle_fragment>\n	#include <color_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	shadow_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n	#include <logdepthbuf_fragment>\n	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	sprite_vert: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	vec4 mvPosition = modelViewMatrix[ 3 ];\n	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n	#ifndef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) scale *= - mvPosition.z;\n	#endif\n	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n	vec2 rotatedPosition;\n	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n	mvPosition.xy += rotatedPosition;\n	gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}",
	sprite_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}"
}, Z = {
	common: {
		diffuse: { value: /*@__PURE__*/ new Y(16777215) },
		opacity: { value: 1 },
		map: { value: null },
		mapTransform: { value: /*@__PURE__*/ new q() },
		alphaMap: { value: null },
		alphaMapTransform: { value: /*@__PURE__*/ new q() },
		alphaTest: { value: 0 }
	},
	specularmap: {
		specularMap: { value: null },
		specularMapTransform: { value: /*@__PURE__*/ new q() }
	},
	envmap: {
		envMap: { value: null },
		envMapRotation: { value: /*@__PURE__*/ new q() },
		reflectivity: { value: 1 },
		ior: { value: 1.5 },
		refractionRatio: { value: .98 },
		dfgLUT: { value: null }
	},
	aomap: {
		aoMap: { value: null },
		aoMapIntensity: { value: 1 },
		aoMapTransform: { value: /*@__PURE__*/ new q() }
	},
	lightmap: {
		lightMap: { value: null },
		lightMapIntensity: { value: 1 },
		lightMapTransform: { value: /*@__PURE__*/ new q() }
	},
	bumpmap: {
		bumpMap: { value: null },
		bumpMapTransform: { value: /*@__PURE__*/ new q() },
		bumpScale: { value: 1 }
	},
	normalmap: {
		normalMap: { value: null },
		normalMapTransform: { value: /*@__PURE__*/ new q() },
		normalScale: { value: /*@__PURE__*/ new G(1, 1) }
	},
	displacementmap: {
		displacementMap: { value: null },
		displacementMapTransform: { value: /*@__PURE__*/ new q() },
		displacementScale: { value: 1 },
		displacementBias: { value: 0 }
	},
	emissivemap: {
		emissiveMap: { value: null },
		emissiveMapTransform: { value: /*@__PURE__*/ new q() }
	},
	metalnessmap: {
		metalnessMap: { value: null },
		metalnessMapTransform: { value: /*@__PURE__*/ new q() }
	},
	roughnessmap: {
		roughnessMap: { value: null },
		roughnessMapTransform: { value: /*@__PURE__*/ new q() }
	},
	gradientmap: { gradientMap: { value: null } },
	fog: {
		fogDensity: { value: 25e-5 },
		fogNear: { value: 1 },
		fogFar: { value: 2e3 },
		fogColor: { value: /*@__PURE__*/ new Y(16777215) }
	},
	lights: {
		ambientLightColor: { value: [] },
		lightProbe: { value: [] },
		sunLights: {
			value: [],
			properties: {
				direction: {},
				color: {}
			}
		},
		sunLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		sunShadowMatrix: { value: [] },
		sunShadowCascade: { value: [] },
		directionalLights: {
			value: [],
			properties: {
				direction: {},
				color: {}
			}
		},
		directionalLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		directionalShadowMatrix: { value: [] },
		spotLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				direction: {},
				distance: {},
				coneCos: {},
				penumbraCos: {},
				decay: {}
			}
		},
		spotLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		spotLightMap: { value: [] },
		spotLightMatrix: { value: [] },
		pointLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				decay: {},
				distance: {}
			}
		},
		pointLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {},
				shadowCameraNear: {},
				shadowCameraFar: {}
			}
		},
		pointShadowMatrix: { value: [] },
		hemisphereLights: {
			value: [],
			properties: {
				direction: {},
				skyColor: {},
				groundColor: {}
			}
		},
		rectAreaLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				width: {},
				height: {}
			}
		},
		ltc_1: { value: null },
		ltc_2: { value: null },
		probesSH: { value: [] },
		probesMin: { value: [] },
		probesMax: { value: [] },
		probesResolution: { value: [] }
	},
	points: {
		diffuse: { value: /*@__PURE__*/ new Y(16777215) },
		opacity: { value: 1 },
		size: { value: 1 },
		scale: { value: 1 },
		map: { value: null },
		alphaMap: { value: null },
		alphaMapTransform: { value: /*@__PURE__*/ new q() },
		alphaTest: { value: 0 },
		uvTransform: { value: /*@__PURE__*/ new q() }
	},
	sprite: {
		diffuse: { value: /*@__PURE__*/ new Y(16777215) },
		opacity: { value: 1 },
		center: { value: /*@__PURE__*/ new G(.5, .5) },
		rotation: { value: 0 },
		map: { value: null },
		mapTransform: { value: /*@__PURE__*/ new q() },
		alphaMap: { value: null },
		alphaMapTransform: { value: /*@__PURE__*/ new q() },
		alphaTest: { value: 0 }
	}
}, Io = {
	basic: {
		uniforms: /*@__PURE__*/ da([
			Z.common,
			Z.specularmap,
			Z.envmap,
			Z.aomap,
			Z.lightmap,
			Z.fog
		]),
		vertexShader: X.meshbasic_vert,
		fragmentShader: X.meshbasic_frag
	},
	lambert: {
		uniforms: /*@__PURE__*/ da([
			Z.common,
			Z.specularmap,
			Z.envmap,
			Z.aomap,
			Z.lightmap,
			Z.emissivemap,
			Z.bumpmap,
			Z.normalmap,
			Z.displacementmap,
			Z.fog,
			Z.lights,
			{
				emissive: { value: /*@__PURE__*/ new Y(0) },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: X.meshlambert_vert,
		fragmentShader: X.meshlambert_frag
	},
	phong: {
		uniforms: /*@__PURE__*/ da([
			Z.common,
			Z.specularmap,
			Z.envmap,
			Z.aomap,
			Z.lightmap,
			Z.emissivemap,
			Z.bumpmap,
			Z.normalmap,
			Z.displacementmap,
			Z.fog,
			Z.lights,
			{
				emissive: { value: /*@__PURE__*/ new Y(0) },
				specular: { value: /*@__PURE__*/ new Y(1118481) },
				shininess: { value: 30 },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: X.meshphong_vert,
		fragmentShader: X.meshphong_frag
	},
	standard: {
		uniforms: /*@__PURE__*/ da([
			Z.common,
			Z.envmap,
			Z.aomap,
			Z.lightmap,
			Z.emissivemap,
			Z.bumpmap,
			Z.normalmap,
			Z.displacementmap,
			Z.roughnessmap,
			Z.metalnessmap,
			Z.fog,
			Z.lights,
			{
				emissive: { value: /*@__PURE__*/ new Y(0) },
				roughness: { value: 1 },
				metalness: { value: 0 },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: X.meshphysical_vert,
		fragmentShader: X.meshphysical_frag
	},
	toon: {
		uniforms: /*@__PURE__*/ da([
			Z.common,
			Z.aomap,
			Z.lightmap,
			Z.emissivemap,
			Z.bumpmap,
			Z.normalmap,
			Z.displacementmap,
			Z.gradientmap,
			Z.fog,
			Z.lights,
			{ emissive: { value: /*@__PURE__*/ new Y(0) } }
		]),
		vertexShader: X.meshtoon_vert,
		fragmentShader: X.meshtoon_frag
	},
	matcap: {
		uniforms: /*@__PURE__*/ da([
			Z.common,
			Z.bumpmap,
			Z.normalmap,
			Z.displacementmap,
			Z.fog,
			{ matcap: { value: null } }
		]),
		vertexShader: X.meshmatcap_vert,
		fragmentShader: X.meshmatcap_frag
	},
	points: {
		uniforms: /*@__PURE__*/ da([Z.points, Z.fog]),
		vertexShader: X.points_vert,
		fragmentShader: X.points_frag
	},
	dashed: {
		uniforms: /*@__PURE__*/ da([
			Z.common,
			Z.fog,
			{
				scale: { value: 1 },
				dashSize: { value: 1 },
				totalSize: { value: 2 }
			}
		]),
		vertexShader: X.linedashed_vert,
		fragmentShader: X.linedashed_frag
	},
	depth: {
		uniforms: /*@__PURE__*/ da([Z.common, Z.displacementmap]),
		vertexShader: X.depth_vert,
		fragmentShader: X.depth_frag
	},
	normal: {
		uniforms: /*@__PURE__*/ da([
			Z.common,
			Z.bumpmap,
			Z.normalmap,
			Z.displacementmap,
			{ opacity: { value: 1 } }
		]),
		vertexShader: X.meshnormal_vert,
		fragmentShader: X.meshnormal_frag
	},
	sprite: {
		uniforms: /*@__PURE__*/ da([Z.sprite, Z.fog]),
		vertexShader: X.sprite_vert,
		fragmentShader: X.sprite_frag
	},
	background: {
		uniforms: {
			uvTransform: { value: /*@__PURE__*/ new q() },
			t2D: { value: null },
			backgroundIntensity: { value: 1 }
		},
		vertexShader: X.background_vert,
		fragmentShader: X.background_frag
	},
	backgroundCube: {
		uniforms: {
			envMap: { value: null },
			backgroundBlurriness: { value: 0 },
			backgroundIntensity: { value: 1 },
			backgroundRotation: { value: /*@__PURE__*/ new q() }
		},
		vertexShader: X.backgroundCube_vert,
		fragmentShader: X.backgroundCube_frag
	},
	cube: {
		uniforms: {
			tCube: { value: null },
			tFlip: { value: -1 },
			opacity: { value: 1 }
		},
		vertexShader: X.cube_vert,
		fragmentShader: X.cube_frag
	},
	equirect: {
		uniforms: { tEquirect: { value: null } },
		vertexShader: X.equirect_vert,
		fragmentShader: X.equirect_frag
	},
	distance: {
		uniforms: /*@__PURE__*/ da([
			Z.common,
			Z.displacementmap,
			{
				referencePosition: { value: /*@__PURE__*/ new K() },
				nearDistance: { value: 1 },
				farDistance: { value: 1e3 }
			}
		]),
		vertexShader: X.distance_vert,
		fragmentShader: X.distance_frag
	},
	shadow: {
		uniforms: /*@__PURE__*/ da([
			Z.lights,
			Z.fog,
			{
				color: { value: /*@__PURE__*/ new Y(0) },
				opacity: { value: 1 }
			}
		]),
		vertexShader: X.shadow_vert,
		fragmentShader: X.shadow_frag
	}
};
Io.physical = {
	uniforms: /*@__PURE__*/ da([Io.standard.uniforms, {
		clearcoat: { value: 0 },
		clearcoatMap: { value: null },
		clearcoatMapTransform: { value: /*@__PURE__*/ new q() },
		clearcoatNormalMap: { value: null },
		clearcoatNormalMapTransform: { value: /*@__PURE__*/ new q() },
		clearcoatNormalScale: { value: /*@__PURE__*/ new G(1, 1) },
		clearcoatRoughness: { value: 0 },
		clearcoatRoughnessMap: { value: null },
		clearcoatRoughnessMapTransform: { value: /*@__PURE__*/ new q() },
		diffuseRoughness: { value: 0 },
		diffuseRoughnessMap: { value: null },
		diffuseRoughnessMapTransform: { value: /*@__PURE__*/ new q() },
		dispersion: { value: 0 },
		retroreflectivity: { value: 0 },
		iridescence: { value: 0 },
		iridescenceMap: { value: null },
		iridescenceMapTransform: { value: /*@__PURE__*/ new q() },
		iridescenceIOR: { value: 1.3 },
		iridescenceThicknessMinimum: { value: 100 },
		iridescenceThicknessMaximum: { value: 400 },
		iridescenceThicknessMap: { value: null },
		iridescenceThicknessMapTransform: { value: /*@__PURE__*/ new q() },
		sheen: { value: 0 },
		sheenColor: { value: /*@__PURE__*/ new Y(0) },
		sheenColorMap: { value: null },
		sheenColorMapTransform: { value: /*@__PURE__*/ new q() },
		sheenRoughness: { value: 1 },
		sheenRoughnessMap: { value: null },
		sheenRoughnessMapTransform: { value: /*@__PURE__*/ new q() },
		transmission: { value: 0 },
		transmissionMap: { value: null },
		transmissionMapTransform: { value: /*@__PURE__*/ new q() },
		transmissionSamplerSize: { value: /*@__PURE__*/ new G() },
		transmissionSamplerMap: { value: null },
		thickness: { value: 0 },
		thicknessMap: { value: null },
		thicknessMapTransform: { value: /*@__PURE__*/ new q() },
		attenuationDistance: { value: 0 },
		attenuationColor: { value: /*@__PURE__*/ new Y(0) },
		specularColor: { value: /*@__PURE__*/ new Y(1, 1, 1) },
		specularColorMap: { value: null },
		specularColorMapTransform: { value: /*@__PURE__*/ new q() },
		specularIntensity: { value: 1 },
		specularIntensityMap: { value: null },
		specularIntensityMapTransform: { value: /*@__PURE__*/ new q() },
		anisotropyVector: { value: /*@__PURE__*/ new G() },
		anisotropyMap: { value: null },
		anisotropyMapTransform: { value: /*@__PURE__*/ new q() }
	}]),
	vertexShader: X.meshphysical_vert,
	fragmentShader: X.meshphysical_frag
};
var Lo = {
	r: 0,
	b: 0,
	g: 0
}, Ro = /*@__PURE__*/ new Yt(), zo = /*@__PURE__*/ new q();
zo.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Bo(e, t, n, r, i, a) {
	let o = new Y(0), s = i === !0 ? 0 : 1, c, l, u = null, d = 0, f = null;
	function p(e) {
		let n = e.isScene === !0 ? e.background : null;
		if (n && n.isTexture) {
			let r = e.backgroundBlurriness > 0;
			n = t.get(n, r);
		}
		return n;
	}
	function m(t) {
		let r = !1, i = p(t);
		i === null ? g(o, s) : i && i.isColor && (g(i, 1), r = !0);
		let c = e.xr.getEnvironmentBlendMode();
		c === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : c === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (e.autoClear || r) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil));
	}
	function h(t, n) {
		let i = p(n);
		i && i.isCubeTexture ? (l === void 0 && (l = new gi(new $i(1, 1, 1), new va({
			name: "BackgroundCubeMaterial",
			uniforms: ua(Io.backgroundCube.uniforms),
			vertexShader: Io.backgroundCube.vertexShader,
			fragmentShader: Io.backgroundCube.fragmentShader,
			side: 1,
			depthTest: !1,
			depthWrite: !1,
			fog: !1,
			allowOverride: !1
		})), l.geometry.deleteAttribute("normal"), l.geometry.deleteAttribute("uv"), l.onBeforeRender = function(e, t, n) {
			this.matrixWorld.copyPosition(n.matrixWorld);
		}, Object.defineProperty(l.material, "envMap", { get: function() {
			return this.uniforms.envMap.value;
		} }), r.update(l)), l.material.uniforms.envMap.value = i, l.material.uniforms.backgroundBlurriness.value = n.backgroundBlurriness, l.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ro.makeRotationFromEuler(n.backgroundRotation)).transpose(), i.isRenderTargetTexture === !1 && l.material.uniforms.backgroundRotation.value.premultiply(zo), l.material.toneMapped = J.getTransfer(i.colorSpace) !== ze, (u !== i || d !== i.version || f !== e.toneMapping) && (l.material.needsUpdate = !0, u = i, d = i.version, f = e.toneMapping), l.layers.enableAll(), t.unshift(l, l.geometry, l.material, 0, 0, null)) : i && i.isTexture && (c === void 0 && (c = new gi(new sa(2, 2), new va({
			name: "BackgroundMaterial",
			uniforms: ua(Io.background.uniforms),
			vertexShader: Io.background.vertexShader,
			fragmentShader: Io.background.fragmentShader,
			side: 0,
			depthTest: !1,
			depthWrite: !1,
			fog: !1,
			allowOverride: !1
		})), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", { get: function() {
			return this.uniforms.t2D.value;
		} }), r.update(c)), c.material.uniforms.t2D.value = i, c.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, c.material.toneMapped = J.getTransfer(i.colorSpace) !== ze, i.matrixAutoUpdate === !0 && i.updateMatrix(), c.material.uniforms.uvTransform.value.copy(i.matrix), (u !== i || d !== i.version || f !== e.toneMapping) && (c.material.needsUpdate = !0, u = i, d = i.version, f = e.toneMapping), c.layers.enableAll(), t.unshift(c, c.geometry, c.material, 0, 0, null));
	}
	function g(t, r) {
		t.getRGB(Lo, ma(e)), n.buffers.color.setClear(Lo.r, Lo.g, Lo.b, r, a);
	}
	function _() {
		l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0), c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0);
	}
	return {
		getClearColor: function() {
			return o;
		},
		setClearColor: function(e, t = 1) {
			o.set(e), s = t, g(o, s);
		},
		getClearAlpha: function() {
			return s;
		},
		setClearAlpha: function(e) {
			s = e, g(o, s);
		},
		render: m,
		addToRenderList: h,
		dispose: _
	};
}
function Vo(e, t) {
	let n = e.getParameter(e.MAX_VERTEX_ATTRIBS), r = {}, i = f(null), a = i, o = !1;
	function s(n, r, i, s, c) {
		let u = !1, f = d(n, s, i, r);
		a !== f && (a = f, l(a.object)), u = p(n, s, i, c), u && m(n, s, i, c), c !== null && t.update(c, e.ELEMENT_ARRAY_BUFFER), (u || o) && (o = !1, b(n, r, i, s), c !== null && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.get(c).buffer));
	}
	function c() {
		return e.createVertexArray();
	}
	function l(t) {
		return e.bindVertexArray(t);
	}
	function u(t) {
		return e.deleteVertexArray(t);
	}
	function d(e, t, n, i) {
		let a = i.wireframe === !0, o = r[t.id];
		o === void 0 && (o = {}, r[t.id] = o);
		let s = e.isInstancedMesh === !0 ? e.id : 0, l = o[s];
		l === void 0 && (l = {}, o[s] = l);
		let u = l[n.id];
		u === void 0 && (u = {}, l[n.id] = u);
		let d = u[a];
		return d === void 0 && (d = f(c()), u[a] = d), d;
	}
	function f(e) {
		let t = [], r = [], i = [];
		for (let e = 0; e < n; e++) t[e] = 0, r[e] = 0, i[e] = 0;
		return {
			geometry: null,
			program: null,
			wireframe: !1,
			newAttributes: t,
			enabledAttributes: r,
			attributeDivisors: i,
			object: e,
			attributes: {},
			index: null
		};
	}
	function p(e, t, n, r) {
		let i = a.attributes, o = t.attributes, s = 0, c = n.getAttributes();
		for (let t in c) if (c[t].location >= 0) {
			let n = i[t], r = o[t];
			if (r === void 0 && (t === "instanceMatrix" && e.instanceMatrix && (r = e.instanceMatrix), t === "instanceColor" && e.instanceColor && (r = e.instanceColor)), n === void 0 || n.attribute !== r || r && n.data !== r.data) return !0;
			s++;
		}
		return a.attributesNum !== s || a.index !== r;
	}
	function m(e, t, n, r) {
		let i = {}, o = t.attributes, s = 0, c = n.getAttributes();
		for (let t in c) if (c[t].location >= 0) {
			let n = o[t];
			n === void 0 && (t === "instanceMatrix" && e.instanceMatrix && (n = e.instanceMatrix), t === "instanceColor" && e.instanceColor && (n = e.instanceColor));
			let r = {};
			r.attribute = n, n && n.data && (r.data = n.data), i[t] = r, s++;
		}
		a.attributes = i, a.attributesNum = s, a.index = r;
	}
	function h() {
		let e = a.newAttributes;
		for (let t = 0, n = e.length; t < n; t++) e[t] = 0;
	}
	function g(e) {
		_(e, 0);
	}
	function _(t, n) {
		let r = a.newAttributes, i = a.enabledAttributes, o = a.attributeDivisors;
		r[t] = 1, i[t] === 0 && (e.enableVertexAttribArray(t), i[t] = 1), o[t] !== n && (e.vertexAttribDivisor(t, n), o[t] = n);
	}
	function v() {
		let t = a.newAttributes, n = a.enabledAttributes;
		for (let r = 0, i = n.length; r < i; r++) n[r] !== t[r] && (e.disableVertexAttribArray(r), n[r] = 0);
	}
	function y(t, n, r, i, a, o, s) {
		s === !0 ? e.vertexAttribIPointer(t, n, r, a, o) : e.vertexAttribPointer(t, n, r, i, a, o);
	}
	function b(n, r, i, a) {
		h();
		let o = a.attributes, s = i.getAttributes(), c = r.defaultAttributeValues;
		for (let r in s) {
			let i = s[r];
			if (i.location >= 0) {
				let s = o[r];
				if (s === void 0 && (r === "instanceMatrix" && n.instanceMatrix && (s = n.instanceMatrix), r === "instanceColor" && n.instanceColor && (s = n.instanceColor)), s !== void 0) {
					let r = s.normalized, o = s.itemSize, c = t.get(s);
					if (c === void 0) continue;
					let l = c.buffer, u = c.type, d = c.bytesPerElement, f = u === e.INT || u === e.UNSIGNED_INT || s.gpuType === 1013;
					if (s.isInterleavedBufferAttribute) {
						let t = s.data, c = t.isInterleavedBuffer === !0 ? t.stride : t.itemSize, p = s.offset;
						if (t.isInstancedInterleavedBuffer || t.isInstancedBufferAttribute) {
							for (let e = 0; e < i.locationSize; e++) _(i.location + e, t.meshPerAttribute);
							n.isInstancedMesh !== !0 && a._maxInstanceCount === void 0 && (a._maxInstanceCount = t.meshPerAttribute * t.count);
						} else for (let e = 0; e < i.locationSize; e++) g(i.location + e);
						e.bindBuffer(e.ARRAY_BUFFER, l);
						for (let e = 0; e < i.locationSize; e++) y(i.location + e, o / i.locationSize, u, r, c * d, (p + o / i.locationSize * e) * d, f);
					} else {
						if (s.isInstancedBufferAttribute) {
							for (let e = 0; e < i.locationSize; e++) _(i.location + e, s.meshPerAttribute);
							n.isInstancedMesh !== !0 && a._maxInstanceCount === void 0 && (a._maxInstanceCount = s.meshPerAttribute * s.count);
						} else for (let e = 0; e < i.locationSize; e++) g(i.location + e);
						e.bindBuffer(e.ARRAY_BUFFER, l);
						for (let e = 0; e < i.locationSize; e++) y(i.location + e, o / i.locationSize, u, r, o * d, o / i.locationSize * e * d, f);
					}
				} else if (c !== void 0) {
					let t = c[r];
					if (t !== void 0) switch (t.length) {
						case 2:
							e.vertexAttrib2fv(i.location, t);
							break;
						case 3:
							e.vertexAttrib3fv(i.location, t);
							break;
						case 4:
							e.vertexAttrib4fv(i.location, t);
							break;
						default: e.vertexAttrib1fv(i.location, t);
					}
				}
			}
		}
		v();
	}
	function x() {
		T();
		for (let e in r) {
			let t = r[e];
			for (let e in t) {
				let n = t[e];
				for (let e in n) {
					let t = n[e];
					for (let e in t) u(t[e].object), delete t[e];
					delete n[e];
				}
			}
			delete r[e];
		}
	}
	function S(e) {
		if (r[e.id] === void 0) return;
		let t = r[e.id];
		for (let e in t) {
			let n = t[e];
			for (let e in n) {
				let t = n[e];
				for (let e in t) u(t[e].object), delete t[e];
				delete n[e];
			}
		}
		delete r[e.id];
	}
	function C(e) {
		for (let t in r) {
			let n = r[t];
			for (let t in n) {
				let r = n[t];
				if (r[e.id] === void 0) continue;
				let i = r[e.id];
				for (let e in i) u(i[e].object), delete i[e];
				delete r[e.id];
			}
		}
	}
	function w(e) {
		for (let t in r) {
			let n = r[t], i = e.isInstancedMesh === !0 ? e.id : 0, a = n[i];
			if (a !== void 0) {
				for (let e in a) {
					let t = a[e];
					for (let e in t) u(t[e].object), delete t[e];
					delete a[e];
				}
				delete n[i], Object.keys(n).length === 0 && delete r[t];
			}
		}
	}
	function T() {
		E(), o = !0, a !== i && (a = i, l(a.object));
	}
	function E() {
		i.geometry = null, i.program = null, i.wireframe = !1;
	}
	return {
		setup: s,
		reset: T,
		resetDefaultState: E,
		dispose: x,
		releaseStatesOfGeometry: S,
		releaseStatesOfObject: w,
		releaseStatesOfProgram: C,
		initAttributes: h,
		enableAttribute: g,
		disableUnusedAttributes: v
	};
}
function Ho(e, t, n) {
	let r;
	function i(e) {
		r = e;
	}
	function a(t, i) {
		e.drawArrays(r, t, i), n.update(i, r, 1);
	}
	function o(t, i, a) {
		a !== 0 && (e.drawArraysInstanced(r, t, i, a), n.update(i, r, a));
	}
	function s(e, i, a) {
		if (a === 0) return;
		t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r, e, 0, i, 0, a);
		let o = 0;
		for (let e = 0; e < a; e++) o += i[e];
		n.update(o, r, 1);
	}
	this.setMode = i, this.render = a, this.renderInstances = o, this.renderMultiDraw = s;
}
function Uo(e, t, n, r) {
	let i;
	function a() {
		if (i !== void 0) return i;
		if (t.has("EXT_texture_filter_anisotropic") === !0) {
			let n = t.get("EXT_texture_filter_anisotropic");
			i = e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
		} else i = 0;
		return i;
	}
	function o(t) {
		return t === 1023 || r.convert(t) === e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT);
	}
	function s(n) {
		let i = n === 1016 && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
		return !(n !== 1009 && n !== 1015 && !i && r.convert(n) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE));
	}
	function c(t) {
		if (t === "highp") {
			if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return "highp";
			t = "mediump";
		}
		return t === "mediump" && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
	}
	let l = n.precision === void 0 ? "highp" : n.precision, u = c(l);
	u !== l && (H("WebGLRenderer:", l, "not supported, using", u, "instead."), l = u);
	let d = n.reversedDepthBuffer === !0 && t.has("EXT_clip_control"), f = n.logarithmicDepthBuffer === !0 && d === !1;
	n.reversedDepthBuffer === !0 && d === !1 && H("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."), n.logarithmicDepthBuffer === !0 && d === !0 && H("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");
	let p = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), m = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS), h = e.getParameter(e.MAX_TEXTURE_SIZE), g = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE), _ = e.getParameter(e.MAX_VERTEX_ATTRIBS), v = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS), y = e.getParameter(e.MAX_VARYING_VECTORS), b = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS), x = e.getParameter(e.MAX_SAMPLES), S = e.getParameter(e.SAMPLES);
	return {
		isWebGL2: !0,
		getMaxAnisotropy: a,
		getMaxPrecision: c,
		textureFormatReadable: o,
		textureTypeReadable: s,
		precision: l,
		logarithmicDepthBuffer: f,
		reversedDepthBuffer: d,
		maxTextures: p,
		maxVertexTextures: m,
		maxTextureSize: h,
		maxCubemapSize: g,
		maxAttributes: _,
		maxVertexUniforms: v,
		maxVaryings: y,
		maxFragmentUniforms: b,
		maxSamples: x,
		samples: S
	};
}
function Wo(e) {
	let t = this, n = null, r = 0, i = !1, a = !1, o = new Pr(), s = new q(), c = {
		value: null,
		needsUpdate: !1
	};
	this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function(e, t) {
		let n = e.length !== 0 || t || r !== 0 || i;
		return i = t, r = e.length, n;
	}, this.beginShadows = function() {
		a = !0, u(null);
	}, this.endShadows = function() {
		a = !1;
	}, this.setGlobalState = function(e, t) {
		n = u(e, t, 0);
	}, this.setState = function(t, o, s) {
		let d = t.clippingPlanes, f = t.clipIntersection, p = t.clipShadows, m = e.get(t);
		if (!i || d === null || d.length === 0 || a && !p) a ? u(null) : l();
		else {
			let e = a ? 0 : r, t = e * 4, i = m.clippingState || null;
			c.value = i, i = u(d, o, t, s);
			for (let e = 0; e !== t; ++e) i[e] = n[e];
			m.clippingState = i, this.numIntersection = f ? this.numPlanes : 0, this.numPlanes += e;
		}
	};
	function l() {
		c.value !== n && (c.value = n, c.needsUpdate = r > 0), t.numPlanes = r, t.numIntersection = 0;
	}
	function u(e, n, r, i) {
		let a = e === null ? 0 : e.length, l = null;
		if (a !== 0) {
			if (l = c.value, i !== !0 || l === null) {
				let t = r + a * 4, i = n.matrixWorldInverse;
				s.getNormalMatrix(i), (l === null || l.length < t) && (l = new Float32Array(t));
				for (let t = 0, n = r; t !== a; ++t, n += 4) o.copy(e[t]).applyMatrix4(i, s), o.normal.toArray(l, n), l[n + 3] = o.constant;
			}
			c.value = l, c.needsUpdate = !0;
		}
		return t.numPlanes = a, t.numIntersection = 0, l;
	}
}
var Go = class extends Kt {
	constructor(e = 1, t = {}) {
		super(e, e, t), this.isWebGLCubeRenderTarget = !0;
		let n = {
			width: e,
			height: e,
			depth: 1
		}, r = [
			n,
			n,
			n,
			n,
			n,
			n
		];
		this.texture = new Ji(r), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
	}
	fromEquirectangularTexture(e, t) {
		this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
		let n = {
			uniforms: { tEquirect: { value: null } },
			vertexShader: "\n\n				varying vec3 vWorldDirection;\n\n				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n				}\n\n				void main() {\n\n					vWorldDirection = transformDirection( position, modelMatrix );\n\n					#include <begin_vertex>\n					#include <project_vertex>\n\n				}\n			",
			fragmentShader: "\n\n				uniform sampler2D tEquirect;\n\n				varying vec3 vWorldDirection;\n\n				#include <common>\n\n				void main() {\n\n					vec3 direction = normalize( vWorldDirection );\n\n					vec2 sampleUV = equirectUv( direction );\n\n					gl_FragColor = texture2D( tEquirect, sampleUV );\n\n				}\n			"
		}, r = new $i(5, 5, 5), i = new va({
			name: "CubemapFromEquirect",
			uniforms: ua(n.uniforms),
			vertexShader: n.vertexShader,
			fragmentShader: n.fragmentShader,
			side: 1,
			blending: 0
		});
		i.uniforms.tEquirect.value = t;
		let a = new gi(r, i), o = t.minFilter;
		return t.minFilter === 1008 && (t.minFilter = c), new fo(1, 10, this).update(e, a), t.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
	}
	clear(e, t = !0, n = !0, r = !0) {
		let i = e.getRenderTarget();
		for (let i = 0; i < 6; i++) e.setRenderTarget(this, i), e.clear(t, n, r);
		e.setRenderTarget(i);
	}
}, Ko = 256, qo = 3, Jo = 20, Yo = 256, Xo = 16, Zo = 3, Qo = /*@__PURE__*/ new K(), $o = /*@__PURE__*/ new Y(), es = class e {
	constructor(e) {
		this._renderer = e, this._cubeSize = 0, this._sourceTarget = null, this._cubeCamera = new fo(1, 10, null), this._boxMesh = new gi(new $i(5, 5, 5), null), this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null, this._integrationMaterial = null;
	}
	fromScene(e, t = 0, n = .1, r = 100, i = {}) {
		let { size: a = 256, position: o = Qo } = i, s = this._renderer;
		this._setSize(a);
		let c = this._allocateTarget(), l = this._getSourceTarget(!0);
		t > 0 && (l.texture.mipmapsAutoUpdate = !1);
		let u = s.autoClear, d = s.autoClearColor, f = s.autoClearDepth, p = s.autoClearStencil, m = e.background;
		s.autoClear = !0, s.autoClearColor = !0, s.autoClearDepth = !0, s.autoClearStencil = !0, m === null && (e.background = s.getClearColor($o));
		let h = new fo(n, r, l);
		return h.position.copy(o), h.update(s, e), s.autoClear = u, s.autoClearColor = d, s.autoClearDepth = f, s.autoClearStencil = p, e.background = m, t > 0 && (l.texture.mipmapsAutoUpdate = !0, this._blur(c, t)), this._applyPMREM(c), c;
	}
	fromEquirectangular(e, t = null) {
		return this._fromTexture(e, t);
	}
	fromCubemap(e, t = null) {
		return this._fromTexture(e, t);
	}
	compileCubemapShader() {
		this._cubemapMaterial === null && (this._cubemapMaterial = ss(), this._compileMaterial(this._cubemapMaterial));
	}
	compileEquirectangularShader() {
		this._equirectMaterial === null && (this._equirectMaterial = os(), this._compileMaterial(this._equirectMaterial));
	}
	dispose() {
		this._sourceTarget !== null && this._sourceTarget.dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._integrationMaterial !== null && this._integrationMaterial.dispose(), this._boxMesh.geometry.dispose();
	}
	static lodToRoughness(e, t) {
		return t > 0 ? 1 - Math.sqrt(1 - e / t) : 0;
	}
	_setSize(e) {
		this._cubeSize = Math.max(Ko, xt(e));
	}
	_fromTexture(e, t) {
		e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? Ko : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4);
		let n = t || this._allocateTarget();
		return this._textureToCubemap(e), this._applyPMREM(n), n;
	}
	_allocateTarget() {
		let e = this._cubeSize, t = ts(e, !1, !1), n = Math.log2(e) - qo;
		for (let r = 0; r <= n; r++) t.texture.mipmaps.push({
			width: e >> r,
			height: e >> r
		});
		return t.texture.name = "PMREM", t.texture.isPMREMTexture = !0, t;
	}
	_getSourceTarget(e = !1) {
		let t = this._cubeSize, n = this._sourceTarget;
		return (n === null || n.width !== t || e && n.depthBuffer === !1) && (n !== null && n.dispose(), this._sourceTarget = ts(t, !0, e)), this._sourceTarget;
	}
	_compileMaterial(e) {
		this._boxMesh.material = e, this._renderer.compile(this._boxMesh, this._cubeCamera.children[0]);
	}
	_renderCube(e, t, n) {
		let r = this._boxMesh, i = this._cubeCamera;
		r.material = n, i.renderTarget = e, i.activeMipmapLevel = t;
		let a = e.width >> t;
		e.viewport.set(0, 0, a, a), i.update(this._renderer, r), e.viewport.set(0, 0, e.width, e.height);
	}
	_textureToCubemap(e) {
		let t;
		e.mapping === 301 || e.mapping === 302 ? (this._cubemapMaterial === null && (this._cubemapMaterial = ss()), t = this._cubemapMaterial, t.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : (this._equirectMaterial === null && (this._equirectMaterial = os()), t = this._equirectMaterial), t.uniforms.envMap.value = e, this._renderCube(this._getSourceTarget(), 0, t);
	}
	_applyPMREM(t) {
		this._ggxMaterial === null && (this._ggxMaterial = rs(), this._integrationMaterial = is());
		let n = this._cubeSize, r = t.texture.mipmaps.length - 1, i = this._ggxMaterial.uniforms;
		i.envMap.value = this._sourceTarget.texture;
		let a = this._integrationMaterial.uniforms;
		a.envMap.value = this._sourceTarget.texture, a.sourceLod.value = Math.log2(n / Xo);
		for (let o = 0; o <= r; o++) {
			let s = e.lodToRoughness(o, r);
			if (o > r - Zo) a.roughness.value = s, this._renderCube(t, o, this._integrationMaterial);
			else {
				let e = s > 0 ? Math.log2(n) + .5 * Math.log2(6 / (Yo * s ** 4)) + .5 : 0;
				i.roughness.value = s, i.lodBias.value = e, this._renderCube(t, o, this._ggxMaterial);
			}
		}
	}
	_blur(e, t) {
		this._blurMaterial === null && (this._blurMaterial = as());
		let n = this._blurMaterial, r = n.uniforms, i = this._sourceTarget;
		r.sigma.value = Math.min(t, Math.PI) / Math.SQRT2, r.envMap.value = i.texture, this._renderCube(e, 0, n), r.envMap.value = e.texture, this._renderCube(i, 0, n);
	}
};
function ts(e, t, n) {
	return new Go(e, {
		minFilter: u,
		generateMipmaps: t,
		type: v,
		colorSpace: Le,
		depthBuffer: n
	});
}
function ns(e, t, n) {
	return new va({
		name: e,
		uniforms: t,
		vertexShader: X.cube_vert,
		fragmentShader: n,
		side: 1,
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function rs() {
	return ns("PMREMGGXConvolution", {
		envMap: { value: null },
		roughness: { value: 0 },
		lodBias: { value: 0 }
	}, `

		#define GGX_SAMPLES ${Yo}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`);
}
function is() {
	return ns("PMREMGGXIntegration", {
		envMap: { value: null },
		roughness: { value: 0 },
		sourceLod: { value: 0 },
		sourceSize: { value: Xo }
	}, "\n\n		varying vec3 vWorldDirection;\n\n		uniform samplerCube envMap;\n		uniform float roughness;\n		uniform float sourceLod;\n		uniform int sourceSize;\n\n		void main() {\n\n			vec3 N = normalize( vWorldDirection );\n\n			float alpha = roughness * roughness;\n			float alpha2 = alpha * alpha;\n\n			float texelSize = 2.0 / float( sourceSize );\n\n			vec3 prefilteredColor = vec3( 0.0 );\n			float totalWeight = 0.0;\n\n			// Pair opposite texels: only the one in N's hemisphere contributes.\n			for ( int face = 0; face < 3; face ++ ) {\n\n				for ( int y = 0; y < sourceSize; y ++ ) {\n\n					for ( int x = 0; x < sourceSize; x ++ ) {\n\n						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;\n						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );\n\n						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );\n						float NdotL = dot( N, texelDirection );\n						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;\n						NdotL = abs( NdotL ) * invDistance;\n\n						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors\n						// in the GGX distribution and texel solid angle cancel when normalized.\n						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;\n						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );\n\n						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;\n						totalWeight += weight;\n\n					}\n\n				}\n\n			}\n\n			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );\n\n		}\n	");
}
function as() {
	return ns("PMREMSphericalGaussianBlur", {
		envMap: { value: null },
		sigma: { value: 0 }
	}, `

		#define SAMPLES ${Jo}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`);
}
function os() {
	return ns("PMREMEquirectangularToCubemap", { envMap: { value: null } }, "\n\n		varying vec3 vWorldDirection;\n\n		uniform sampler2D envMap;\n\n		#include <common>\n\n		void main() {\n\n			// Average four subpixel samples to preserve small, bright features.\n			vec3 direction = normalize( vWorldDirection );\n			vec3 dx = dFdx( direction ) * 0.25;\n			vec3 dy = dFdy( direction ) * 0.25;\n\n			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;\n			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;\n			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;\n			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;\n			gl_FragColor = vec4( color * 0.25, 1.0 );\n\n		}\n	");
}
function ss() {
	return ns("PMREMCubemapToCubemap", {
		envMap: { value: null },
		flipEnvMap: { value: -1 }
	}, "\n\n		varying vec3 vWorldDirection;\n\n		uniform samplerCube envMap;\n		uniform float flipEnvMap;\n\n		void main() {\n\n			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );\n\n		}\n	");
}
function cs(e) {
	let t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r = null;
	function i(e, t = !1) {
		return e == null ? null : t ? o(e) : a(e);
	}
	function a(n) {
		if (n && n.isTexture) {
			let r = n.mapping;
			if (r === 303 || r === 304) {
				if (t.has(n)) {
					let e = t.get(n).texture;
					return s(e, n.mapping);
				}
				{
					let r = n.image;
					if (r && r.height > 0) {
						let i = new Go(r.height);
						return i.fromEquirectangularTexture(e, n), t.set(n, i), n.addEventListener("dispose", l), s(i.texture, n.mapping);
					}
					return null;
				}
			}
		}
		return n;
	}
	function o(t) {
		if (t && t.isTexture && t.isPMREMTexture !== !0) {
			let i = t.mapping, a = i === 303 || i === 304, o = i === 301 || i === 302;
			if (a || o) {
				let i = n.get(t), s = i === void 0 ? 0 : i.texture.pmremVersion;
				if (t.isRenderTargetTexture && t.pmremVersion !== s) return r === null && (r = new es(e)), i = a ? r.fromEquirectangular(t, i) : r.fromCubemap(t, i), i.texture.pmremVersion = t.pmremVersion, n.set(t, i), i.texture;
				if (i !== void 0) return i.texture;
				{
					let s = t.image;
					return a && s && s.height > 0 || o && s && c(s) ? (r === null && (r = new es(e)), i = a ? r.fromEquirectangular(t) : r.fromCubemap(t), i.texture.pmremVersion = t.pmremVersion, n.set(t, i), t.addEventListener("dispose", u), i.texture) : null;
				}
			}
		}
		return t;
	}
	function s(e, t) {
		return t === 303 ? e.mapping = 301 : t === 304 && (e.mapping = 302), e;
	}
	function c(e) {
		let t = 0;
		for (let n = 0; n < 6; n++) e[n] !== void 0 && t++;
		return t === 6;
	}
	function l(e) {
		let n = e.target;
		n.removeEventListener("dispose", l);
		let r = t.get(n);
		r !== void 0 && (t.delete(n), r.dispose());
	}
	function u(e) {
		let t = e.target;
		t.removeEventListener("dispose", u);
		let r = n.get(t);
		r !== void 0 && (n.delete(t), r.dispose());
	}
	function d() {
		t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r !== null && (r.dispose(), r = null);
	}
	return {
		get: i,
		dispose: d
	};
}
function ls(e) {
	let t = {};
	function n(n) {
		if (t[n] !== void 0) return t[n];
		let r = e.getExtension(n);
		return t[n] = r, r;
	}
	return {
		has: function(e) {
			return n(e) !== null;
		},
		init: function() {
			n("EXT_color_buffer_float"), n("WEBGL_clip_cull_distance"), n("OES_texture_float_linear"), n("EXT_color_buffer_half_float"), n("WEBGL_multisampled_render_to_texture"), n("WEBGL_render_shared_exponent");
		},
		get: function(e) {
			let t = n(e);
			return t === null && Xe("WebGLRenderer: " + e + " extension not supported."), t;
		}
	};
}
function us(e, t, n, r) {
	let i = {}, a = /* @__PURE__ */ new WeakMap(), o = new FinalizationRegistry((e) => delete i[e]);
	function s(e) {
		c(e.target);
	}
	function c(e) {
		e.index !== null && t.remove(e.index);
		for (let n in e.attributes) t.remove(e.attributes[n]);
		e.removeEventListener("dispose", s), delete i[e.id], o.unregister(e);
		let c = a.get(e);
		c && (t.remove(c), a.delete(e)), r.releaseStatesOfGeometry(e), e.isInstancedBufferGeometry === !0 && delete e._maxInstanceCount, n.memory.geometries--;
	}
	function l(e, t) {
		return i[t.id] === void 0 && (t.addEventListener("dispose", s), i[t.id] = new WeakRef(t), o.register(t, t.id, t), n.memory.geometries++), t;
	}
	function u(n) {
		let r = n.attributes;
		for (let n in r) t.update(r[n], e.ARRAY_BUFFER);
	}
	function d(e) {
		let n = e.index, r = e.attributes.position, i = 0;
		if (r === void 0) return;
		let o = n === null ? r.array.length / 3 - 1 : n.array.length, s = new (r.count >= 65535 ? pr : fr)(Math.ceil(o / 3) * 6, 1), c = s.array;
		if (n !== null) {
			let e = n.array;
			i = n.version;
			for (let t = 0, n = 0; t < o; t += 3) {
				let r = e[t + 0], i = e[t + 1], a = e[t + 2];
				c[n++] = r, c[n++] = i, c[n++] = i, c[n++] = a, c[n++] = a, c[n++] = r;
			}
		} else {
			i = r.version;
			for (let e = 0, t = 0; e < o; e += 3) {
				let n = e + 0, r = e + 1, i = e + 2;
				c[t++] = n, c[t++] = r, c[t++] = r, c[t++] = i, c[t++] = i, c[t++] = n;
			}
		}
		s.version = i;
		let l = a.get(e);
		l && t.remove(l), a.set(e, s);
	}
	function f(e) {
		let t = a.get(e);
		if (t) {
			let n = e.index;
			n !== null && t.version < n.version && d(e);
		} else d(e);
		return a.get(e);
	}
	function p() {
		for (let e in i) {
			let t = i[e].deref();
			t !== void 0 && c(t);
		}
	}
	return {
		get: l,
		update: u,
		getWireframeAttribute: f,
		dispose: p
	};
}
function ds(e, t, n) {
	let r;
	function i(e) {
		r = e;
	}
	let a, o;
	function s(e) {
		a = e.type, o = e.bytesPerElement;
	}
	function c(t, i) {
		e.drawElements(r, i, a, t * o), n.update(i, r, 1);
	}
	function l(t, i, s) {
		s !== 0 && (e.drawElementsInstanced(r, i, a, t * o, s), n.update(i, r, s));
	}
	function u(e, i, o) {
		if (o === 0) return;
		t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r, i, 0, a, e, 0, o);
		let s = 0;
		for (let e = 0; e < o; e++) s += i[e];
		n.update(s, r, 1);
	}
	this.setMode = i, this.setIndex = s, this.render = c, this.renderInstances = l, this.renderMultiDraw = u;
}
function fs(e) {
	let t = {
		geometries: 0,
		textures: 0
	}, n = {
		frame: 0,
		calls: 0,
		triangles: 0,
		points: 0,
		lines: 0
	};
	function r(t, r, i) {
		switch (n.calls++, r) {
			case e.TRIANGLES:
				n.triangles += t / 3 * i;
				break;
			case e.LINES:
				n.lines += t / 2 * i;
				break;
			case e.LINE_STRIP:
				n.lines += i * (t - 1);
				break;
			case e.LINE_LOOP:
				n.lines += i * t;
				break;
			case e.POINTS:
				n.points += i * t;
				break;
			default: U("WebGLInfo: Unknown draw mode:", r);
		}
	}
	function i() {
		n.calls = 0, n.triangles = 0, n.points = 0, n.lines = 0;
	}
	return {
		memory: t,
		render: n,
		programs: null,
		autoReset: !0,
		reset: i,
		update: r
	};
}
function ps(e, t, n) {
	let r = /* @__PURE__ */ new WeakMap(), i = new Wt();
	function a(a, o, s) {
		let c = a.morphTargetInfluences, l = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, u = l === void 0 ? 0 : l.length, d = r.get(o);
		if (d === void 0 || d.count !== u) {
			d !== void 0 && d.texture.dispose();
			let e = o.morphAttributes.position !== void 0, n = o.morphAttributes.normal !== void 0, a = o.morphAttributes.color !== void 0, s = o.morphAttributes.position || [], c = o.morphAttributes.normal || [], l = o.morphAttributes.color || [], f = 0;
			e === !0 && (f = 1), n === !0 && (f = 2), a === !0 && (f = 3);
			let p = o.attributes.position.count * f, m = 1;
			p > t.maxTextureSize && (m = Math.ceil(p / t.maxTextureSize), p = t.maxTextureSize);
			let h = new Float32Array(p * m * 4 * u), g = new qt(h, p, m, u);
			g.type = _, g.needsUpdate = !0;
			let v = f * 4;
			for (let t = 0; t < u; t++) {
				let r = s[t], o = c[t], u = l[t], d = p * m * 4 * t;
				for (let t = 0; t < r.count; t++) {
					let s = t * v;
					e === !0 && (i.fromBufferAttribute(r, t), h[d + s + 0] = i.x, h[d + s + 1] = i.y, h[d + s + 2] = i.z, h[d + s + 3] = 0), n === !0 && (i.fromBufferAttribute(o, t), h[d + s + 4] = i.x, h[d + s + 5] = i.y, h[d + s + 6] = i.z, h[d + s + 7] = 0), a === !0 && (i.fromBufferAttribute(u, t), h[d + s + 8] = i.x, h[d + s + 9] = i.y, h[d + s + 10] = i.z, h[d + s + 11] = u.itemSize === 4 ? i.w : 1);
				}
			}
			d = {
				count: u,
				texture: g,
				size: new G(p, m)
			}, r.set(o, d);
			function y() {
				g.dispose(), r.delete(o), o.removeEventListener("dispose", y);
			}
			o.addEventListener("dispose", y);
		}
		if (a.isInstancedMesh === !0 && a.morphTexture !== null) s.getUniforms().setValue(e, "morphTexture", a.morphTexture, n);
		else {
			let t = 0;
			for (let e = 0; e < c.length; e++) t += c[e];
			let n = o.morphTargetsRelative ? 1 : 1 - t;
			s.getUniforms().setValue(e, "morphTargetBaseInfluence", n), s.getUniforms().setValue(e, "morphTargetInfluences", c);
		}
		s.getUniforms().setValue(e, "morphTargetsTexture", d.texture, n), s.getUniforms().setValue(e, "morphTargetsTextureSize", d.size);
	}
	return { update: a };
}
function ms(e, t, n, r, i) {
	let a = /* @__PURE__ */ new WeakMap();
	function o(r) {
		let o = i.render.frame, s = r.geometry, l = t.get(r, s);
		if (a.get(l) !== o && (t.update(l), a.set(l, o)), r.isInstancedMesh && (r.hasEventListener("dispose", c) === !1 && r.addEventListener("dispose", c), a.get(r) !== o && (n.update(r.instanceMatrix, e.ARRAY_BUFFER), r.instanceColor !== null && n.update(r.instanceColor, e.ARRAY_BUFFER), a.set(r, o))), r.isSkinnedMesh) {
			let e = r.skeleton;
			a.get(e) !== o && (e.update(), a.set(e, o));
		}
		return l;
	}
	function s() {
		a = /* @__PURE__ */ new WeakMap();
	}
	function c(e) {
		let t = e.target;
		t.removeEventListener("dispose", c), r.releaseStatesOfObject(t), n.remove(t.instanceMatrix), t.instanceColor !== null && n.remove(t.instanceColor);
	}
	return {
		update: o,
		dispose: s
	};
}
var hs = {
	1: "LINEAR_TONE_MAPPING",
	2: "REINHARD_TONE_MAPPING",
	3: "CINEON_TONE_MAPPING",
	4: "ACES_FILMIC_TONE_MAPPING",
	6: "AGX_TONE_MAPPING",
	7: "NEUTRAL_TONE_MAPPING",
	5: "CUSTOM_TONE_MAPPING"
};
function gs(e, t, n, r, i, a) {
	let o = new Kt(t, n, {
		type: e,
		depthBuffer: i,
		stencilBuffer: a,
		samples: r ? 4 : 0,
		storeMultisampledDepthBuffer: !1,
		storeMultisampledStencilBuffer: !1,
		resolveDepthBuffer: !1,
		resolveStencilBuffer: !1
	}), s = null, c = null, l = null, u = new Er();
	u.setAttribute("position", new mr([
		-1,
		3,
		0,
		-1,
		-1,
		0,
		3,
		-1,
		0
	], 3)), u.setAttribute("uv", new mr([
		0,
		2,
		0,
		0,
		2,
		0
	], 2));
	let d = new ya({
		uniforms: { tDiffuse: { value: null } },
		vertexShader: "\n			precision highp float;\n\n			uniform mat4 modelViewMatrix;\n			uniform mat4 projectionMatrix;\n\n			attribute vec3 position;\n			attribute vec2 uv;\n\n			varying vec2 vUv;\n\n			void main() {\n				vUv = uv;\n				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n			}",
		fragmentShader: "\n			precision highp float;\n\n			uniform sampler2D tDiffuse;\n\n			varying vec2 vUv;\n\n			#include <tonemapping_pars_fragment>\n			#include <colorspace_pars_fragment>\n\n			void main() {\n				gl_FragColor = texture2D( tDiffuse, vUv );\n\n				#ifdef LINEAR_TONE_MAPPING\n					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );\n				#elif defined( REINHARD_TONE_MAPPING )\n					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );\n				#elif defined( CINEON_TONE_MAPPING )\n					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );\n				#elif defined( ACES_FILMIC_TONE_MAPPING )\n					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );\n				#elif defined( AGX_TONE_MAPPING )\n					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );\n				#elif defined( NEUTRAL_TONE_MAPPING )\n					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );\n				#elif defined( CUSTOM_TONE_MAPPING )\n					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );\n				#endif\n\n				#ifdef SRGB_TRANSFER\n					gl_FragColor = sRGBTransferOETF( gl_FragColor );\n				#endif\n			}",
		depthTest: !1,
		depthWrite: !1
	}), f = new gi(u, d), p = new oo(-1, 1, 1, -1, 0, 1), m = null, h = null, g = !1, _, y = null, b = [], S = !1;
	this.setSize = function(e, t) {
		o.setSize(e, t), s !== null && s.setSize(e, t), c !== null && c.setSize(e, t);
		for (let n = 0; n < b.length; n++) {
			let r = b[n];
			r.setSize && r.setSize(e, t);
		}
	}, this.setEffects = function(e) {
		b = e, S = b.length > 0 && b[0].isRenderPass === !0;
		let t = o.width, n = o.height;
		b.length > 0 && s === null && (s = new Kt(t, n, {
			type: v,
			depthBuffer: !1,
			stencilBuffer: !1
		}), c = new Kt(t, n, {
			type: v,
			depthBuffer: !1,
			stencilBuffer: !1
		}));
		let r = i === !0 && b.some((e) => e.needsDepthTexture === !0);
		r !== (o.depthTexture !== null) && (r === !0 && l === null && (l = new Xi(t, n), a === !0 && (l.format = O, l.type = x)), o.dispose(), o.depthTexture = r ? l : null, o.resolveDepthBuffer = r, o.storeMultisampledDepthBuffer = r);
		for (let e = 0; e < b.length; e++) {
			let i = b[e];
			i.setSize && i.setSize(t, n), r && i.needsDepthTexture === !0 && i.setDepthTexture && i.setDepthTexture(l);
		}
	}, this.begin = function(e, t) {
		if (g || e.toneMapping === 0 && b.length === 0) return !1;
		if (y = t, t !== null) {
			let e = t.width, n = t.height;
			(o.width !== e || o.height !== n) && this.setSize(e, n);
		}
		return S === !1 && e.setRenderTarget(o), _ = e.toneMapping, e.toneMapping = 0, !0;
	}, this.hasRenderPass = function() {
		return S;
	}, this.end = function(e, t) {
		e.toneMapping = _, g = !0;
		let n = o, r = s;
		for (let i = 0; i < b.length; i++) {
			let a = b[i];
			a.enabled !== !1 && (a.render(e, r, n, t), a.needsSwap !== !1 && (n = r, r = r === s ? c : s));
		}
		if (m !== e.outputColorSpace || h !== e.toneMapping) {
			m = e.outputColorSpace, h = e.toneMapping, d.defines = {}, J.getTransfer(m) === "srgb" && (d.defines.SRGB_TRANSFER = "");
			let t = hs[h];
			t && (d.defines[t] = ""), d.needsUpdate = !0;
		}
		d.uniforms.tDiffuse.value = n.texture, e.setRenderTarget(y), e.render(f, p), y = null, g = !1;
	}, this.isCompositing = function() {
		return g;
	}, this.dispose = function() {
		o.dispose(), s !== null && s.dispose(), c !== null && c.dispose(), u.dispose(), d.dispose();
	};
}
var _s = /*@__PURE__*/ new Ut(), vs = /*@__PURE__*/ new Xi(1, 1), ys = /*@__PURE__*/ new Zi(1), bs = /*@__PURE__*/ new qt(), xs = /*@__PURE__*/ new Jt(), Ss = /*@__PURE__*/ new Ji(), Cs = [], ws = [], Ts = /* @__PURE__ */ new Float32Array(16), Es = /* @__PURE__ */ new Float32Array(9), Ds = /* @__PURE__ */ new Float32Array(4);
function Os(e, t, n) {
	let r = e[0];
	if (r <= 0 || r > 0) return e;
	let i = t * n, a = Cs[i];
	if (a === void 0 && (a = new Float32Array(i), Cs[i] = a), t !== 0) {
		r.toArray(a, 0);
		for (let r = 1, i = 0; r !== t; ++r) i += n, e[r].toArray(a, i);
	}
	return a;
}
function ks(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0, r = e.length; n < r; n++) if (e[n] !== t[n]) return !1;
	return !0;
}
function As(e, t) {
	for (let n = 0, r = t.length; n < r; n++) e[n] = t[n];
}
function js(e, t) {
	let n = ws[t];
	n === void 0 && (n = new Int32Array(t), ws[t] = n);
	for (let r = 0; r !== t; ++r) n[r] = e.allocateTextureUnit();
	return n;
}
function Ms(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1f(this.addr, t), n[0] = t);
}
function Ns(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (ks(n, t)) return;
		e.uniform2fv(this.addr, t), As(n, t);
	}
}
function Ps(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else if (t.r !== void 0) (n[0] !== t.r || n[1] !== t.g || n[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), n[0] = t.r, n[1] = t.g, n[2] = t.b);
	else {
		if (ks(n, t)) return;
		e.uniform3fv(this.addr, t), As(n, t);
	}
}
function Fs(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (ks(n, t)) return;
		e.uniform4fv(this.addr, t), As(n, t);
	}
}
function Is(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (ks(n, t)) return;
		e.uniformMatrix2fv(this.addr, !1, t), As(n, t);
	} else {
		if (ks(n, r)) return;
		Ds.set(r), e.uniformMatrix2fv(this.addr, !1, Ds), As(n, r);
	}
}
function Ls(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (ks(n, t)) return;
		e.uniformMatrix3fv(this.addr, !1, t), As(n, t);
	} else {
		if (ks(n, r)) return;
		Es.set(r), e.uniformMatrix3fv(this.addr, !1, Es), As(n, r);
	}
}
function Rs(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (ks(n, t)) return;
		e.uniformMatrix4fv(this.addr, !1, t), As(n, t);
	} else {
		if (ks(n, r)) return;
		Ts.set(r), e.uniformMatrix4fv(this.addr, !1, Ts), As(n, r);
	}
}
function zs(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1i(this.addr, t), n[0] = t);
}
function Bs(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2i(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (ks(n, t)) return;
		e.uniform2iv(this.addr, t), As(n, t);
	}
}
function Vs(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3i(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else {
		if (ks(n, t)) return;
		e.uniform3iv(this.addr, t), As(n, t);
	}
}
function Hs(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (ks(n, t)) return;
		e.uniform4iv(this.addr, t), As(n, t);
	}
}
function Us(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1ui(this.addr, t), n[0] = t);
}
function Ws(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2ui(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (ks(n, t)) return;
		e.uniform2uiv(this.addr, t), As(n, t);
	}
}
function Gs(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3ui(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else {
		if (ks(n, t)) return;
		e.uniform3uiv(this.addr, t), As(n, t);
	}
}
function Ks(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (ks(n, t)) return;
		e.uniform4uiv(this.addr, t), As(n, t);
	}
}
function qs(e) {
	return e.version === 0 && (e.compareFunction = 519, e.needsUpdate = !0), e;
}
function Js(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i);
	let a;
	a = this.type === e.SAMPLER_2D_SHADOW ? qs(vs) : _s, n.setTexture2D(t || a, i);
}
function Ys(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTexture3D(t || xs, i);
}
function Xs(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i);
	let a;
	a = this.type === e.SAMPLER_CUBE_SHADOW ? qs(ys) : Ss, n.setTextureCube(t || a, i);
}
function Zs(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTexture2DArray(t || bs, i);
}
function Qs(e) {
	switch (e) {
		case 5126: return Ms;
		case 35664: return Ns;
		case 35665: return Ps;
		case 35666: return Fs;
		case 35674: return Is;
		case 35675: return Ls;
		case 35676: return Rs;
		case 5124:
		case 35670: return zs;
		case 35667:
		case 35671: return Bs;
		case 35668:
		case 35672: return Vs;
		case 35669:
		case 35673: return Hs;
		case 5125: return Us;
		case 36294: return Ws;
		case 36295: return Gs;
		case 36296: return Ks;
		case 35678:
		case 36198:
		case 36298:
		case 36306:
		case 35682: return Js;
		case 35679:
		case 36299:
		case 36307: return Ys;
		case 35680:
		case 36300:
		case 36308:
		case 36293: return Xs;
		case 36289:
		case 36303:
		case 36311:
		case 36292: return Zs;
	}
}
function $s(e, t) {
	e.uniform1fv(this.addr, t);
}
function ec(e, t) {
	let n = Os(t, this.size, 2);
	e.uniform2fv(this.addr, n);
}
function tc(e, t) {
	let n = Os(t, this.size, 3);
	e.uniform3fv(this.addr, n);
}
function nc(e, t) {
	let n = Os(t, this.size, 4);
	e.uniform4fv(this.addr, n);
}
function rc(e, t) {
	let n = Os(t, this.size, 4);
	e.uniformMatrix2fv(this.addr, !1, n);
}
function ic(e, t) {
	let n = Os(t, this.size, 9);
	e.uniformMatrix3fv(this.addr, !1, n);
}
function ac(e, t) {
	let n = Os(t, this.size, 16);
	e.uniformMatrix4fv(this.addr, !1, n);
}
function oc(e, t) {
	e.uniform1iv(this.addr, t);
}
function sc(e, t) {
	e.uniform2iv(this.addr, t);
}
function cc(e, t) {
	e.uniform3iv(this.addr, t);
}
function lc(e, t) {
	e.uniform4iv(this.addr, t);
}
function uc(e, t) {
	e.uniform1uiv(this.addr, t);
}
function dc(e, t) {
	e.uniform2uiv(this.addr, t);
}
function fc(e, t) {
	e.uniform3uiv(this.addr, t);
}
function pc(e, t) {
	e.uniform4uiv(this.addr, t);
}
function mc(e, t, n) {
	let r = this.cache, i = t.length, a = js(n, i);
	ks(r, a) || (e.uniform1iv(this.addr, a), As(r, a));
	let o;
	o = this.type === e.SAMPLER_2D_SHADOW ? qs(vs) : _s;
	for (let e = 0; e !== i; ++e) n.setTexture2D(t[e] || o, a[e]);
}
function hc(e, t, n) {
	let r = this.cache, i = t.length, a = js(n, i);
	ks(r, a) || (e.uniform1iv(this.addr, a), As(r, a));
	for (let e = 0; e !== i; ++e) n.setTexture3D(t[e] || xs, a[e]);
}
function gc(e, t, n) {
	let r = this.cache, i = t.length, a = js(n, i);
	ks(r, a) || (e.uniform1iv(this.addr, a), As(r, a));
	let o;
	o = this.type === e.SAMPLER_CUBE_SHADOW ? qs(ys) : Ss;
	for (let e = 0; e !== i; ++e) n.setTextureCube(t[e] || o, a[e]);
}
function _c(e, t, n) {
	let r = this.cache, i = t.length, a = js(n, i);
	ks(r, a) || (e.uniform1iv(this.addr, a), As(r, a));
	for (let e = 0; e !== i; ++e) n.setTexture2DArray(t[e] || bs, a[e]);
}
function vc(e) {
	switch (e) {
		case 5126: return $s;
		case 35664: return ec;
		case 35665: return tc;
		case 35666: return nc;
		case 35674: return rc;
		case 35675: return ic;
		case 35676: return ac;
		case 5124:
		case 35670: return oc;
		case 35667:
		case 35671: return sc;
		case 35668:
		case 35672: return cc;
		case 35669:
		case 35673: return lc;
		case 5125: return uc;
		case 36294: return dc;
		case 36295: return fc;
		case 36296: return pc;
		case 35678:
		case 36198:
		case 36298:
		case 36306:
		case 35682: return mc;
		case 35679:
		case 36299:
		case 36307: return hc;
		case 35680:
		case 36300:
		case 36308:
		case 36293: return gc;
		case 36289:
		case 36303:
		case 36311:
		case 36292: return _c;
	}
}
var yc = class {
	constructor(e, t, n) {
		this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = Qs(t.type);
	}
}, bc = class {
	constructor(e, t, n) {
		this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = vc(t.type);
	}
}, xc = class {
	constructor(e) {
		this.id = e, this.seq = [], this.map = {};
	}
	setValue(e, t, n) {
		let r = this.seq;
		for (let i = 0, a = r.length; i !== a; ++i) {
			let a = r[i];
			a.setValue(e, t[a.id], n);
		}
	}
}, Sc = /(\w+)(\])?(\[|\.)?/g;
function Cc(e, t) {
	e.seq.push(t), e.map[t.id] = t;
}
function wc(e, t, n) {
	let r = e.name, i = r.length;
	for (Sc.lastIndex = 0;;) {
		let a = Sc.exec(r), o = Sc.lastIndex, s = a[1], c = a[2] === "]", l = a[3];
		if (c && (s |= 0), l === void 0 || l === "[" && o + 2 === i) {
			Cc(n, l === void 0 ? new yc(s, e, t) : new bc(s, e, t));
			break;
		}
		{
			let e = n.map[s];
			e === void 0 && (e = new xc(s), Cc(n, e)), n = e;
		}
	}
}
var Tc = class {
	constructor(e, t) {
		this.seq = [], this.map = {};
		let n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
		for (let r = 0; r < n; ++r) {
			let n = e.getActiveUniform(t, r);
			wc(n, e.getUniformLocation(t, n.name), this);
		}
		let r = [], i = [];
		for (let t of this.seq) t.type === e.SAMPLER_2D_SHADOW || t.type === e.SAMPLER_CUBE_SHADOW || t.type === e.SAMPLER_2D_ARRAY_SHADOW ? r.push(t) : i.push(t);
		r.length > 0 && (this.seq = r.concat(i));
	}
	setValue(e, t, n, r) {
		let i = this.map[t];
		i !== void 0 && i.setValue(e, n, r);
	}
	setOptional(e, t, n) {
		let r = t[n];
		r !== void 0 && this.setValue(e, n, r);
	}
	static upload(e, t, n, r) {
		for (let i = 0, a = t.length; i !== a; ++i) {
			let a = t[i], o = n[a.id];
			o.needsUpdate !== !1 && a.setValue(e, o.value, r);
		}
	}
	static seqWithValue(e, t) {
		let n = [];
		for (let r = 0, i = e.length; r !== i; ++r) {
			let i = e[r];
			i.id in t && n.push(i);
		}
		return n;
	}
};
function Ec(e, t, n) {
	let r = e.createShader(t);
	return e.shaderSource(r, n), e.compileShader(r), r;
}
var Dc = 37297, Oc = 0;
function kc(e, t) {
	let n = e.split("\n"), r = [], i = Math.max(t - 6, 0), a = Math.min(t + 6, n.length);
	for (let e = i; e < a; e++) {
		let i = e + 1;
		r.push(`${i === t ? ">" : " "} ${i}: ${n[e]}`);
	}
	return r.join("\n");
}
var Ac = /*@__PURE__*/ new q();
function jc(e) {
	J._getMatrix(Ac, J.workingColorSpace, e);
	let t = `mat3( ${Ac.elements.map((e) => e.toFixed(4))} )`;
	switch (J.getTransfer(e)) {
		case Re: return [t, "LinearTransferOETF"];
		case ze: return [t, "sRGBTransferOETF"];
		default: return H("WebGLProgram: Unsupported color space: ", e), [t, "LinearTransferOETF"];
	}
}
function Mc(e, t, n) {
	let r = e.getShaderParameter(t, e.COMPILE_STATUS), i = (e.getShaderInfoLog(t) || "").trim();
	if (r && i === "") return "";
	let a = /ERROR: 0:(\d+)/.exec(i);
	if (a) {
		let r = parseInt(a[1]);
		return n.toUpperCase() + "\n\n" + i + "\n\n" + kc(e.getShaderSource(t), r);
	}
	return i;
}
function Nc(e, t) {
	let n = jc(t);
	return [
		`vec4 ${e}( vec4 value ) {`,
		`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,
		"}"
	].join("\n");
}
var Pc = {
	1: "Linear",
	2: "Reinhard",
	3: "Cineon",
	4: "ACESFilmic",
	6: "AgX",
	7: "Neutral",
	5: "Custom"
};
function Fc(e, t) {
	let n = Pc[t];
	return n === void 0 ? (H("WebGLProgram: Unsupported toneMapping:", t), "vec3 " + e + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + e + "( vec3 color ) { return " + n + "ToneMapping( color ); }";
}
var Ic = /*@__PURE__*/ new K();
function Lc() {
	return J.getLuminanceCoefficients(Ic), [
		"float luminance( const in vec3 rgb ) {",
		`	const vec3 weights = vec3( ${Ic.x.toFixed(4)}, ${Ic.y.toFixed(4)}, ${Ic.z.toFixed(4)} );`,
		"	return dot( weights, rgb );",
		"}"
	].join("\n");
}
function Rc(e) {
	return [e.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", e.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(Vc).join("\n");
}
function zc(e) {
	let t = [];
	for (let n in e) {
		let r = e[n];
		r !== !1 && t.push("#define " + n + " " + r);
	}
	return t.join("\n");
}
function Bc(e, t) {
	let n = {}, r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
	for (let i = 0; i < r; i++) {
		let r = e.getActiveAttrib(t, i), a = r.name, o = 1;
		r.type === e.FLOAT_MAT2 && (o = 2), r.type === e.FLOAT_MAT3 && (o = 3), r.type === e.FLOAT_MAT4 && (o = 4), n[a] = {
			type: r.type,
			location: e.getAttribLocation(t, a),
			locationSize: o
		};
	}
	return n;
}
function Vc(e) {
	return e !== "";
}
function Hc(e, t) {
	let n = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
	return e.replace(/NUM_SUN_LIGHTS/g, t.numSunLights).replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g, t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g, t.numLightProbeGrids);
}
function Uc(e, t) {
	return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
var Wc = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Gc(e) {
	return e.replace(Wc, Kc);
}
function Kc(e, t) {
	let n = X[t];
	if (n === void 0) throw Error("THREE.WebGLProgram: Can not resolve #include <" + t + ">");
	return Gc(n);
}
var qc = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Jc(e) {
	return e.replace(qc, Yc);
}
function Yc(e, t, n, r) {
	let i = "";
	for (let e = parseInt(t); e < parseInt(n); e++) i += r.replace(/\[\s*i\s*\]/g, "[ " + e + " ]").replace(/UNROLLED_LOOP_INDEX/g, e);
	return i;
}
function Xc(e) {
	let t = `precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;
	return e.precision === "highp" ? t += "\n#define HIGH_PRECISION" : e.precision === "mediump" ? t += "\n#define MEDIUM_PRECISION" : e.precision === "lowp" && (t += "\n#define LOW_PRECISION"), t;
}
var Zc = {
	1: "SHADOWMAP_TYPE_PCF",
	3: "SHADOWMAP_TYPE_VSM"
};
function Qc(e) {
	return Zc[e.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
var $c = { 302: "ENVMAP_MODE_REFRACTION" };
function el(e) {
	return e.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : $c[e.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
var tl = {
	0: "ENVMAP_BLENDING_MULTIPLY",
	1: "ENVMAP_BLENDING_MIX",
	2: "ENVMAP_BLENDING_ADD"
};
function nl(e) {
	return e.envMap === !1 ? "ENVMAP_BLENDING_NONE" : tl[e.combine] || "ENVMAP_BLENDING_NONE";
}
function rl(e, t, n, r) {
	let i = e.getContext(), a = n.defines, o = n.vertexShader, s = n.fragmentShader, c = Qc(n), l = n.envMapPMREM === !0 ? "ENVMAP_TYPE_PMREM" : "ENVMAP_TYPE_CUBE", u = el(n), d = nl(n), f = Rc(n), p = zc(a), m = i.createProgram(), h, g, _ = n.glslVersion ? "#version " + n.glslVersion + "\n" : "";
	n.isRawShaderMaterial ? (h = [
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		p
	].filter(Vc).join("\n"), h.length > 0 && (h += "\n"), g = [
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		p
	].filter(Vc).join("\n"), g.length > 0 && (g += "\n")) : (h = [
		Xc(n),
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		p,
		n.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
		n.batching ? "#define USE_BATCHING" : "",
		n.batchingColor ? "#define USE_BATCHING_COLOR" : "",
		n.instancing ? "#define USE_INSTANCING" : "",
		n.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
		n.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
		n.useFog && n.fog ? "#define USE_FOG" : "",
		n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
		n.map ? "#define USE_MAP" : "",
		n.envMap ? "#define USE_ENVMAP" : "",
		n.envMap ? "#define " + u : "",
		n.lightMap ? "#define USE_LIGHTMAP" : "",
		n.aoMap ? "#define USE_AOMAP" : "",
		n.bumpMap ? "#define USE_BUMPMAP" : "",
		n.normalMap ? "#define USE_NORMALMAP" : "",
		n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
		n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
		n.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
		n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
		n.anisotropy ? "#define USE_ANISOTROPY" : "",
		n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
		n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
		n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
		n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
		n.diffuseRoughnessMap ? "#define USE_DIFFUSE_ROUGHNESSMAP" : "",
		n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
		n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
		n.specularMap ? "#define USE_SPECULARMAP" : "",
		n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
		n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
		n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
		n.metalnessMap ? "#define USE_METALNESSMAP" : "",
		n.alphaMap ? "#define USE_ALPHAMAP" : "",
		n.alphaHash ? "#define USE_ALPHAHASH" : "",
		n.transmission ? "#define USE_TRANSMISSION" : "",
		n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
		n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
		n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
		n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
		n.mapUv ? "#define MAP_UV " + n.mapUv : "",
		n.alphaMapUv ? "#define ALPHAMAP_UV " + n.alphaMapUv : "",
		n.lightMapUv ? "#define LIGHTMAP_UV " + n.lightMapUv : "",
		n.aoMapUv ? "#define AOMAP_UV " + n.aoMapUv : "",
		n.emissiveMapUv ? "#define EMISSIVEMAP_UV " + n.emissiveMapUv : "",
		n.bumpMapUv ? "#define BUMPMAP_UV " + n.bumpMapUv : "",
		n.normalMapUv ? "#define NORMALMAP_UV " + n.normalMapUv : "",
		n.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + n.displacementMapUv : "",
		n.metalnessMapUv ? "#define METALNESSMAP_UV " + n.metalnessMapUv : "",
		n.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + n.roughnessMapUv : "",
		n.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + n.anisotropyMapUv : "",
		n.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + n.clearcoatMapUv : "",
		n.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + n.clearcoatNormalMapUv : "",
		n.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + n.clearcoatRoughnessMapUv : "",
		n.diffuseRoughnessMapUv ? "#define DIFFUSE_ROUGHNESSMAP_UV " + n.diffuseRoughnessMapUv : "",
		n.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + n.iridescenceMapUv : "",
		n.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + n.iridescenceThicknessMapUv : "",
		n.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + n.sheenColorMapUv : "",
		n.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + n.sheenRoughnessMapUv : "",
		n.specularMapUv ? "#define SPECULARMAP_UV " + n.specularMapUv : "",
		n.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + n.specularColorMapUv : "",
		n.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + n.specularIntensityMapUv : "",
		n.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + n.transmissionMapUv : "",
		n.thicknessMapUv ? "#define THICKNESSMAP_UV " + n.thicknessMapUv : "",
		n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
		n.vertexNormals ? "#define HAS_NORMAL" : "",
		n.vertexColors ? "#define USE_COLOR" : "",
		n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
		n.vertexUv1s ? "#define USE_UV1" : "",
		n.vertexUv2s ? "#define USE_UV2" : "",
		n.vertexUv3s ? "#define USE_UV3" : "",
		n.pointsUvs ? "#define USE_POINTS_UV" : "",
		n.flatShading ? "#define FLAT_SHADED" : "",
		n.skinning ? "#define USE_SKINNING" : "",
		n.morphTargets ? "#define USE_MORPHTARGETS" : "",
		n.morphNormals && n.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
		n.morphColors ? "#define USE_MORPHCOLORS" : "",
		n.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + n.morphTextureStride : "",
		n.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + n.morphTargetsCount : "",
		n.doubleSided ? "#define DOUBLE_SIDED" : "",
		n.flipSided ? "#define FLIP_SIDED" : "",
		n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
		n.shadowMapEnabled ? "#define " + c : "",
		n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
		n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
		n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
		n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
		"uniform mat4 modelMatrix;",
		"uniform mat4 modelViewMatrix;",
		"uniform mat4 projectionMatrix;",
		"uniform mat4 viewMatrix;",
		"uniform mat3 normalMatrix;",
		"uniform vec3 cameraPosition;",
		"uniform bool isOrthographic;",
		"#ifdef USE_INSTANCING",
		"	attribute mat4 instanceMatrix;",
		"#endif",
		"#ifdef USE_INSTANCING_COLOR",
		"	attribute vec3 instanceColor;",
		"#endif",
		"#ifdef USE_INSTANCING_MORPH",
		"	uniform sampler2D morphTexture;",
		"#endif",
		"attribute vec3 position;",
		"attribute vec3 normal;",
		"attribute vec2 uv;",
		"#ifdef USE_UV1",
		"	attribute vec2 uv1;",
		"#endif",
		"#ifdef USE_UV2",
		"	attribute vec2 uv2;",
		"#endif",
		"#ifdef USE_UV3",
		"	attribute vec2 uv3;",
		"#endif",
		"#ifdef USE_TANGENT",
		"	attribute vec4 tangent;",
		"#endif",
		"#if defined( USE_COLOR_ALPHA )",
		"	attribute vec4 color;",
		"#elif defined( USE_COLOR )",
		"	attribute vec3 color;",
		"#endif",
		"#ifdef USE_SKINNING",
		"	attribute vec4 skinIndex;",
		"	attribute vec4 skinWeight;",
		"#endif",
		"\n"
	].filter(Vc).join("\n"), g = [
		Xc(n),
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		p,
		n.useFog && n.fog ? "#define USE_FOG" : "",
		n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
		n.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
		n.map ? "#define USE_MAP" : "",
		n.matcap ? "#define USE_MATCAP" : "",
		n.envMap ? "#define USE_ENVMAP" : "",
		n.envMap ? "#define " + l : "",
		n.envMap ? "#define " + u : "",
		n.envMap ? "#define " + d : "",
		n.envMapPMREM ? "#define ENVMAP_MAX_LOD " + n.envMapMaxLod + ".0" : "",
		n.envMapPMREM ? "#define ENVMAP_SIZE " + n.envMapSize + ".0" : "",
		n.lightMap ? "#define USE_LIGHTMAP" : "",
		n.aoMap ? "#define USE_AOMAP" : "",
		n.bumpMap ? "#define USE_BUMPMAP" : "",
		n.normalMap ? "#define USE_NORMALMAP" : "",
		n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
		n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
		n.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "",
		n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
		n.anisotropy ? "#define USE_ANISOTROPY" : "",
		n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
		n.clearcoat ? "#define USE_CLEARCOAT" : "",
		n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
		n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
		n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
		n.diffuseRoughness ? "#define USE_DIFFUSE_ROUGHNESS" : "",
		n.diffuseRoughnessMap ? "#define USE_DIFFUSE_ROUGHNESSMAP" : "",
		n.dispersion ? "#define USE_DISPERSION" : "",
		n.retroreflection ? "#define USE_RETROREFLECTION" : "",
		n.iridescence ? "#define USE_IRIDESCENCE" : "",
		n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
		n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
		n.specularMap ? "#define USE_SPECULARMAP" : "",
		n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
		n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
		n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
		n.metalnessMap ? "#define USE_METALNESSMAP" : "",
		n.alphaMap ? "#define USE_ALPHAMAP" : "",
		n.alphaTest ? "#define USE_ALPHATEST" : "",
		n.alphaHash ? "#define USE_ALPHAHASH" : "",
		n.sheen ? "#define USE_SHEEN" : "",
		n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
		n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
		n.transmission ? "#define USE_TRANSMISSION" : "",
		n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
		n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
		n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
		n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "",
		n.vertexAlphas || n.batchingColor ? "#define USE_COLOR_ALPHA" : "",
		n.vertexUv1s ? "#define USE_UV1" : "",
		n.vertexUv2s ? "#define USE_UV2" : "",
		n.vertexUv3s ? "#define USE_UV3" : "",
		n.pointsUvs ? "#define USE_POINTS_UV" : "",
		n.gradientMap ? "#define USE_GRADIENTMAP" : "",
		n.flatShading ? "#define FLAT_SHADED" : "",
		n.doubleSided ? "#define DOUBLE_SIDED" : "",
		n.flipSided ? "#define FLIP_SIDED" : "",
		n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
		n.shadowMapEnabled ? "#define " + c : "",
		n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
		n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
		n.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
		n.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
		n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
		n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
		"uniform mat4 viewMatrix;",
		"uniform vec3 cameraPosition;",
		"uniform bool isOrthographic;",
		n.toneMapping === 0 ? "" : "#define TONE_MAPPING",
		n.toneMapping === 0 ? "" : X.tonemapping_pars_fragment,
		n.toneMapping === 0 ? "" : Fc("toneMapping", n.toneMapping),
		n.dithering ? "#define DITHERING" : "",
		n.opaque ? "#define OPAQUE" : "",
		X.colorspace_pars_fragment,
		Nc("linearToOutputTexel", n.outputColorSpace),
		Lc(),
		n.useDepthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "",
		"\n"
	].filter(Vc).join("\n")), o = Gc(o), o = Hc(o, n), o = Uc(o, n), s = Gc(s), s = Hc(s, n), s = Uc(s, n), o = Jc(o), s = Jc(s), n.isRawShaderMaterial !== !0 && (_ = "#version 300 es\n", h = [
		f,
		"#define attribute in",
		"#define varying out",
		"#define texture2D texture"
	].join("\n") + "\n" + h, g = [
		"#define varying in",
		n.glslVersion === "300 es" ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
		n.glslVersion === "300 es" ? "" : "#define gl_FragColor pc_fragColor",
		"#define gl_FragDepthEXT gl_FragDepth",
		"#define texture2D texture",
		"#define textureCube texture",
		"#define texture2DProj textureProj",
		"#define texture2DLodEXT textureLod",
		"#define texture2DProjLodEXT textureProjLod",
		"#define textureCubeLodEXT textureLod",
		"#define texture2DGradEXT textureGrad",
		"#define texture2DProjGradEXT textureProjGrad",
		"#define textureCubeGradEXT textureGrad"
	].join("\n") + "\n" + g);
	let v = _ + h + o, y = _ + g + s, b = Ec(i, i.VERTEX_SHADER, v), x = Ec(i, i.FRAGMENT_SHADER, y);
	i.attachShader(m, b), i.attachShader(m, x), n.index0AttributeName === void 0 ? n.hasPositionAttribute === !0 && i.bindAttribLocation(m, 0, "position") : i.bindAttribLocation(m, 0, n.index0AttributeName), i.linkProgram(m);
	function S(t) {
		if (e.debug.checkShaderErrors) {
			let n = i.getProgramInfoLog(m) || "", r = i.getShaderInfoLog(b) || "", a = i.getShaderInfoLog(x) || "", o = n.trim(), s = r.trim(), c = a.trim(), l = !0, u = !0;
			if (i.getProgramParameter(m, i.LINK_STATUS) === !1) {
				if (l = !1, typeof e.debug.onShaderError == "function") e.debug.onShaderError(i, m, b, x);
				else {
					let e = Mc(i, b, "vertex"), n = Mc(i, x, "fragment");
					U("WebGLProgram: Shader Error " + i.getError() + " - VALIDATE_STATUS " + i.getProgramParameter(m, i.VALIDATE_STATUS) + "\n\nMaterial Name: " + t.name + "\nMaterial Type: " + t.type + "\n\nProgram Info Log: " + o + "\n" + e + "\n" + n);
				}
			} else o === "" ? (s === "" || c === "") && (u = !1) : H("WebGLProgram: Program Info Log:", o);
			u && (t.diagnostics = {
				runnable: l,
				programLog: o,
				vertexShader: {
					log: s,
					prefix: h
				},
				fragmentShader: {
					log: c,
					prefix: g
				}
			});
		}
		i.deleteShader(b), i.deleteShader(x), C = new Tc(i, m), w = Bc(i, m);
	}
	let C;
	this.getUniforms = function() {
		return C === void 0 && S(this), C;
	};
	let w;
	this.getAttributes = function() {
		return w === void 0 && S(this), w;
	};
	let T = n.rendererExtensionParallelShaderCompile === !1;
	return this.isReady = function() {
		return T === !1 && (T = i.getProgramParameter(m, Dc)), T;
	}, this.destroy = function() {
		r.releaseStatesOfProgram(this), i.deleteProgram(m), this.program = void 0;
	}, this.type = n.shaderType, this.name = n.shaderName, this.id = Oc++, this.cacheKey = t, this.usedTimes = 1, this.program = m, this.vertexShader = b, this.fragmentShader = x, this;
}
var il = 0, al = class {
	constructor() {
		this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
	}
	update(e, t, n) {
		let r = this._getShaderCacheForMaterial(e);
		return r.has(t) === !1 && (r.add(t), t.usedTimes++), r.has(n) === !1 && (r.add(n), n.usedTimes++), this;
	}
	remove(e) {
		let t = this.materialCache.get(e);
		for (let e of t) e.usedTimes--, e.usedTimes === 0 && this.shaderCache.delete(e.code);
		return this.materialCache.delete(e), this;
	}
	getVertexShaderStage(e) {
		return this._getShaderStage(e.vertexShader);
	}
	getFragmentShaderStage(e) {
		return this._getShaderStage(e.fragmentShader);
	}
	dispose() {
		this.shaderCache.clear(), this.materialCache.clear();
	}
	_getShaderCacheForMaterial(e) {
		let t = this.materialCache, n = t.get(e);
		return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
	}
	_getShaderStage(e) {
		let t = this.shaderCache, n = t.get(e);
		return n === void 0 && (n = new ol(e), t.set(e, n)), n;
	}
}, ol = class {
	constructor(e) {
		this.id = il++, this.code = e, this.usedTimes = 0;
	}
};
function sl(e) {
	return e === 1030 || e === 37490 || e === 36285;
}
function cl(e, t, n, r, i, a) {
	let o = new sn(), s = new al(), c = /* @__PURE__ */ new Set(), l = [], u = /* @__PURE__ */ new Map(), d = r.logarithmicDepthBuffer, f = {
		MeshDepthMaterial: "depth",
		MeshDistanceMaterial: "distance",
		MeshNormalMaterial: "normal",
		MeshBasicMaterial: "basic",
		MeshLambertMaterial: "lambert",
		MeshPhongMaterial: "phong",
		MeshToonMaterial: "toon",
		MeshStandardMaterial: "physical",
		MeshPhysicalMaterial: "physical",
		MeshMatcapMaterial: "matcap",
		LineBasicMaterial: "basic",
		LineDashedMaterial: "dashed",
		PointsMaterial: "points",
		ShadowMaterial: "shadow",
		SpriteMaterial: "sprite"
	};
	function p(e) {
		return c.add(e), e === 0 ? "uv" : `uv${e}`;
	}
	function m(i, o, l, u, m, h) {
		let g = u.fog, _ = m.geometry, v = i.isMeshStandardMaterial || i.isMeshLambertMaterial || i.isMeshPhongMaterial ? u.environment : null, y = i.isMeshStandardMaterial || i.isMeshLambertMaterial && !i.envMap || i.isMeshPhongMaterial && !i.envMap, b = t.get(i.envMap || v, y), x = f[i.type], S = r.precision;
		i.precision !== null && (S = r.getMaxPrecision(i.precision), S !== i.precision && H("WebGLProgram.getParameters:", i.precision, "not supported, using", S, "instead."));
		let C = _.morphAttributes.position || _.morphAttributes.normal || _.morphAttributes.color, w = C === void 0 ? 0 : C.length, T = 0;
		_.morphAttributes.position !== void 0 && (T = 1), _.morphAttributes.normal !== void 0 && (T = 2), _.morphAttributes.color !== void 0 && (T = 3);
		let E, D, O, k;
		if (x) {
			let e = Io[x];
			E = e.vertexShader, D = e.fragmentShader;
		} else {
			E = i.vertexShader, D = i.fragmentShader;
			let e = s.getVertexShaderStage(i), t = s.getFragmentShaderStage(i);
			s.update(i, e, t), O = e.id, k = t.id;
		}
		let A = e.getRenderTarget(), j = e.state.buffers.depth.getReversed(), ee = m.isInstancedMesh === !0, te = m.isBatchedMesh === !0, M = !!i.map, N = !!i.matcap, P = !!b, F = P && b.isPMREMTexture === !0, I = !!i.aoMap, ne = !!i.lightMap, re = !!i.bumpMap && i.wireframe === !1, ie = !!i.normalMap, ae = !!i.displacementMap, oe = !!i.emissiveMap, L = !!i.metalnessMap, se = !!i.roughnessMap, ce = i.anisotropy > 0, le = i.clearcoat > 0, ue = i.diffuseRoughness > 0, de = i.dispersion > 0, fe = i.retroreflectivity > 0, pe = i.iridescence > 0, me = i.sheen > 0, he = i.transmission > 0, ge = ce && !!i.anisotropyMap, _e = le && !!i.clearcoatMap, ve = le && !!i.clearcoatNormalMap, ye = le && !!i.clearcoatRoughnessMap, be = ue && !!i.diffuseRoughnessMap, xe = pe && !!i.iridescenceMap, Se = pe && !!i.iridescenceThicknessMap, Ce = me && !!i.sheenColorMap, we = me && !!i.sheenRoughnessMap, Te = !!i.specularMap, Ee = !!i.specularColorMap, De = !!i.specularIntensityMap, Oe = he && !!i.transmissionMap, ke = he && !!i.thicknessMap, Ae = !!i.gradientMap, je = !!i.alphaMap, R = i.alphaTest > 0, Me = !!i.alphaHash, Ne = !!i.extensions, Pe = 0;
		i.toneMapped && (A === null || A.isXRRenderTarget === !0) && (Pe = e.toneMapping);
		let z = F ? b.isCompressedCubeTexture ? b.image[0].mipmaps : b.mipmaps : null, Fe = {
			shaderID: x,
			shaderType: i.type,
			shaderName: i.name,
			vertexShader: E,
			fragmentShader: D,
			defines: i.defines,
			customVertexShaderID: O,
			customFragmentShaderID: k,
			isRawShaderMaterial: i.isRawShaderMaterial === !0,
			glslVersion: i.glslVersion,
			precision: S,
			batching: te,
			batchingColor: te && m._colorsTexture !== null,
			instancing: ee,
			instancingColor: ee && m.instanceColor !== null,
			instancingMorph: ee && m.morphTexture !== null,
			outputColorSpace: A === null ? e.outputColorSpace : A.isXRRenderTarget === !0 ? A.texture.colorSpace : J.workingColorSpace,
			alphaToCoverage: !!i.alphaToCoverage,
			map: M,
			matcap: N,
			envMap: P,
			envMapMode: P && b.mapping,
			envMapPMREM: F,
			envMapMaxLod: F ? z.length - 1 : null,
			envMapSize: F ? z[0].width : null,
			aoMap: I,
			lightMap: ne,
			bumpMap: re,
			normalMap: ie,
			displacementMap: ae,
			emissiveMap: oe,
			normalMapObjectSpace: ie && i.normalMapType === 1,
			normalMapTangentSpace: ie && i.normalMapType === 0,
			packedNormalMap: ie && i.normalMapType === 0 && sl(i.normalMap.format),
			metalnessMap: L,
			roughnessMap: se,
			anisotropy: ce,
			anisotropyMap: ge,
			clearcoat: le,
			clearcoatMap: _e,
			clearcoatNormalMap: ve,
			clearcoatRoughnessMap: ye,
			diffuseRoughness: ue,
			diffuseRoughnessMap: be,
			dispersion: de,
			retroreflection: fe,
			iridescence: pe,
			iridescenceMap: xe,
			iridescenceThicknessMap: Se,
			sheen: me,
			sheenColorMap: Ce,
			sheenRoughnessMap: we,
			specularMap: Te,
			specularColorMap: Ee,
			specularIntensityMap: De,
			transmission: he,
			transmissionMap: Oe,
			thicknessMap: ke,
			gradientMap: Ae,
			opaque: i.transparent === !1 && i.blending === 1 && i.alphaToCoverage === !1,
			alphaMap: je,
			alphaTest: R,
			alphaHash: Me,
			combine: i.combine,
			mapUv: M && p(i.map.channel),
			aoMapUv: I && p(i.aoMap.channel),
			lightMapUv: ne && p(i.lightMap.channel),
			bumpMapUv: re && p(i.bumpMap.channel),
			normalMapUv: ie && p(i.normalMap.channel),
			displacementMapUv: ae && p(i.displacementMap.channel),
			emissiveMapUv: oe && p(i.emissiveMap.channel),
			metalnessMapUv: L && p(i.metalnessMap.channel),
			roughnessMapUv: se && p(i.roughnessMap.channel),
			anisotropyMapUv: ge && p(i.anisotropyMap.channel),
			clearcoatMapUv: _e && p(i.clearcoatMap.channel),
			clearcoatNormalMapUv: ve && p(i.clearcoatNormalMap.channel),
			clearcoatRoughnessMapUv: ye && p(i.clearcoatRoughnessMap.channel),
			diffuseRoughnessMapUv: be && p(i.diffuseRoughnessMap.channel),
			iridescenceMapUv: xe && p(i.iridescenceMap.channel),
			iridescenceThicknessMapUv: Se && p(i.iridescenceThicknessMap.channel),
			sheenColorMapUv: Ce && p(i.sheenColorMap.channel),
			sheenRoughnessMapUv: we && p(i.sheenRoughnessMap.channel),
			specularMapUv: Te && p(i.specularMap.channel),
			specularColorMapUv: Ee && p(i.specularColorMap.channel),
			specularIntensityMapUv: De && p(i.specularIntensityMap.channel),
			transmissionMapUv: Oe && p(i.transmissionMap.channel),
			thicknessMapUv: ke && p(i.thicknessMap.channel),
			alphaMapUv: je && p(i.alphaMap.channel),
			vertexTangents: !!_.attributes.tangent && (ie || ce),
			vertexNormals: !!_.attributes.normal,
			vertexColors: i.vertexColors,
			vertexAlphas: i.vertexColors === !0 && !!_.attributes.color && _.attributes.color.itemSize === 4,
			pointsUvs: m.isPoints === !0 && !!_.attributes.uv && (M || je),
			fog: !!g,
			useFog: i.fog === !0,
			fogExp2: !!g && g.isFogExp2,
			flatShading: i.wireframe === !1 && (i.flatShading === !0 || _.attributes.normal === void 0 && ie === !1 && (i.isMeshLambertMaterial || i.isMeshPhongMaterial || i.isMeshStandardMaterial || i.isMeshPhysicalMaterial)),
			sizeAttenuation: i.sizeAttenuation === !0,
			logarithmicDepthBuffer: d,
			reversedDepthBuffer: j,
			skinning: m.isSkinnedMesh === !0,
			hasPositionAttribute: _.attributes.position !== void 0,
			morphTargets: _.morphAttributes.position !== void 0,
			morphNormals: _.morphAttributes.normal !== void 0,
			morphColors: _.morphAttributes.color !== void 0,
			morphTargetsCount: w,
			morphTextureStride: T,
			numSunLights: o.sun.length,
			numDirLights: o.directional.length,
			numPointLights: o.point.length,
			numSpotLights: o.spot.length,
			numSpotLightMaps: o.spotLightMap.length,
			numRectAreaLights: o.rectArea.length,
			numHemiLights: o.hemi.length,
			numSunLightShadows: o.sunShadowMap.length,
			numDirLightShadows: o.directionalShadowMap.length,
			numPointLightShadows: o.pointShadowMap.length,
			numSpotLightShadows: o.spotShadowMap.length,
			numSpotLightShadowsWithMaps: o.numSpotLightShadowsWithMaps,
			numLightProbes: o.numLightProbes,
			numLightProbeGrids: h.filter((e) => e.texture !== null).length,
			numClippingPlanes: a.numPlanes,
			numClipIntersection: a.numIntersection,
			dithering: i.dithering,
			shadowMapEnabled: e.shadowMap.enabled && l.length > 0,
			shadowMapType: e.shadowMap.type,
			toneMapping: Pe,
			decodeVideoTexture: M && i.map.isVideoTexture === !0 && J.getTransfer(i.map.colorSpace) === "srgb",
			decodeVideoTextureEmissive: oe && i.emissiveMap.isVideoTexture === !0 && J.getTransfer(i.emissiveMap.colorSpace) === "srgb",
			premultipliedAlpha: i.premultipliedAlpha,
			doubleSided: i.side === 2,
			flipSided: i.side === 1,
			useDepthPacking: i.depthPacking >= 0,
			depthPacking: i.depthPacking || 0,
			index0AttributeName: i.index0AttributeName,
			extensionClipCullDistance: Ne && i.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
			extensionMultiDraw: (Ne && i.extensions.multiDraw === !0 || te) && n.has("WEBGL_multi_draw"),
			rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
			customProgramCacheKey: i.customProgramCacheKey()
		};
		return Fe.vertexUv1s = c.has(1), Fe.vertexUv2s = c.has(2), Fe.vertexUv3s = c.has(3), c.clear(), Fe;
	}
	function h(t) {
		let n = [];
		if (t.shaderID ? n.push(t.shaderID) : (n.push(t.customVertexShaderID), n.push(t.customFragmentShaderID)), t.defines !== void 0) for (let e in t.defines) n.push(e), n.push(t.defines[e]);
		return t.isRawShaderMaterial === !1 && (g(n, t), _(n, t), n.push(e.outputColorSpace)), n.push(t.customProgramCacheKey), n.join();
	}
	function g(e, t) {
		e.push(t.precision), e.push(t.outputColorSpace), e.push(t.envMapMode), e.push(t.envMapPMREM), e.push(t.envMapMaxLod), e.push(t.envMapSize), e.push(t.mapUv), e.push(t.alphaMapUv), e.push(t.lightMapUv), e.push(t.aoMapUv), e.push(t.bumpMapUv), e.push(t.normalMapUv), e.push(t.displacementMapUv), e.push(t.emissiveMapUv), e.push(t.metalnessMapUv), e.push(t.roughnessMapUv), e.push(t.anisotropyMapUv), e.push(t.clearcoatMapUv), e.push(t.clearcoatNormalMapUv), e.push(t.clearcoatRoughnessMapUv), e.push(t.diffuseRoughnessMapUv), e.push(t.iridescenceMapUv), e.push(t.iridescenceThicknessMapUv), e.push(t.sheenColorMapUv), e.push(t.sheenRoughnessMapUv), e.push(t.specularMapUv), e.push(t.specularColorMapUv), e.push(t.specularIntensityMapUv), e.push(t.transmissionMapUv), e.push(t.thicknessMapUv), e.push(t.combine), e.push(t.fogExp2), e.push(t.sizeAttenuation), e.push(t.morphTargetsCount), e.push(t.numSunLights), e.push(t.numDirLights), e.push(t.numPointLights), e.push(t.numSpotLights), e.push(t.numSpotLightMaps), e.push(t.numHemiLights), e.push(t.numRectAreaLights), e.push(t.numSunLightShadows), e.push(t.numDirLightShadows), e.push(t.numPointLightShadows), e.push(t.numSpotLightShadows), e.push(t.numSpotLightShadowsWithMaps), e.push(t.numLightProbes), e.push(t.numLightProbeGrids), e.push(t.shadowMapType), e.push(t.toneMapping), e.push(t.numClippingPlanes), e.push(t.numClipIntersection), e.push(t.depthPacking);
	}
	function _(e, t) {
		o.disableAll(), t.instancing && o.enable(0), t.instancingColor && o.enable(1), t.instancingMorph && o.enable(2), t.matcap && o.enable(3), t.envMap && o.enable(4), t.normalMapObjectSpace && o.enable(5), t.normalMapTangentSpace && o.enable(6), t.clearcoat && o.enable(7), t.iridescence && o.enable(8), t.alphaTest && o.enable(9), t.vertexColors && o.enable(10), t.vertexAlphas && o.enable(11), t.vertexUv1s && o.enable(12), t.vertexUv2s && o.enable(13), t.vertexUv3s && o.enable(14), t.vertexTangents && o.enable(15), t.anisotropy && o.enable(16), t.alphaHash && o.enable(17), t.batching && o.enable(18), t.dispersion && o.enable(19), t.retroreflection && o.enable(24), t.diffuseRoughness && o.enable(25), t.batchingColor && o.enable(20), t.gradientMap && o.enable(21), t.packedNormalMap && o.enable(22), t.vertexNormals && o.enable(23), e.push(o.mask), o.disableAll(), t.fog && o.enable(0), t.useFog && o.enable(1), t.flatShading && o.enable(2), t.logarithmicDepthBuffer && o.enable(3), t.reversedDepthBuffer && o.enable(4), t.skinning && o.enable(5), t.morphTargets && o.enable(6), t.morphNormals && o.enable(7), t.morphColors && o.enable(8), t.premultipliedAlpha && o.enable(9), t.shadowMapEnabled && o.enable(10), t.doubleSided && o.enable(11), t.flipSided && o.enable(12), t.useDepthPacking && o.enable(13), t.dithering && o.enable(14), t.transmission && o.enable(15), t.sheen && o.enable(16), t.opaque && o.enable(17), t.pointsUvs && o.enable(18), t.decodeVideoTexture && o.enable(19), t.decodeVideoTextureEmissive && o.enable(20), t.alphaToCoverage && o.enable(21), t.numLightProbeGrids > 0 && o.enable(22), t.hasPositionAttribute && o.enable(23), e.push(o.mask);
	}
	function v(e) {
		let t = f[e.type], n;
		if (t) {
			let e = Io[t];
			n = ha.clone(e.uniforms);
		} else n = e.uniforms;
		return n;
	}
	function y(t, n) {
		let r = u.get(n);
		return r === void 0 ? (r = new rl(e, n, t, i), l.push(r), u.set(n, r)) : ++r.usedTimes, r;
	}
	function b(e) {
		if (--e.usedTimes === 0) {
			let t = l.indexOf(e);
			l[t] = l[l.length - 1], l.pop(), u.delete(e.cacheKey), e.destroy();
		}
	}
	function x(e) {
		s.remove(e);
	}
	function S() {
		s.dispose();
	}
	return {
		getParameters: m,
		getProgramCacheKey: h,
		getUniforms: v,
		acquireProgram: y,
		releaseProgram: b,
		releaseShaderCache: x,
		programs: l,
		dispose: S
	};
}
function ll() {
	let e = /* @__PURE__ */ new WeakMap();
	function t(t) {
		return e.has(t);
	}
	function n(t) {
		let n = e.get(t);
		return n === void 0 && (n = {}, e.set(t, n)), n;
	}
	function r(t) {
		e.delete(t);
	}
	function i(t, n, r) {
		e.get(t)[n] = r;
	}
	function a() {
		e = /* @__PURE__ */ new WeakMap();
	}
	return {
		has: t,
		get: n,
		remove: r,
		update: i,
		dispose: a
	};
}
function ul(e, t) {
	return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.material.id === t.material.id ? e.materialVariant === t.materialVariant ? e.z === t.z ? e.id - t.id : e.z - t.z : e.materialVariant - t.materialVariant : e.material.id - t.material.id : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder;
}
function dl(e, t) {
	return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.z === t.z ? e.id - t.id : t.z - e.z : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder;
}
function fl() {
	let e = [], t = 0, n = [], r = [], i = [];
	function a() {
		t = 0, n.length = 0, r.length = 0, i.length = 0;
	}
	function o(e) {
		let t = 0;
		return e.isInstancedMesh && (t += 2), e.isSkinnedMesh && (t += 1), t;
	}
	function s(n, r, i, a, s, c) {
		let l = e[t];
		return l === void 0 ? (l = {
			id: n.id,
			object: n,
			geometry: r,
			material: i,
			materialVariant: o(n),
			groupOrder: a,
			renderOrder: n.renderOrder,
			z: s,
			group: c
		}, e[t] = l) : (l.id = n.id, l.object = n, l.geometry = r, l.material = i, l.materialVariant = o(n), l.groupOrder = a, l.renderOrder = n.renderOrder, l.z = s, l.group = c), t++, l;
	}
	function c(e, t, a, o, c, l, u) {
		u.reversedDepth === !0 && (c = -c);
		let d = s(e, t, a, o, c, l);
		a.transmission > 0 ? r.push(d) : a.transparent === !0 ? i.push(d) : n.push(d);
	}
	function l(e, t, a, o, c, l) {
		let u = s(e, t, a, o, c, l);
		a.transmission > 0 ? r.unshift(u) : a.transparent === !0 ? i.unshift(u) : n.unshift(u);
	}
	function u(e, t) {
		n.length > 1 && n.sort(e || ul), r.length > 1 && r.sort(t || dl), i.length > 1 && i.sort(t || dl);
	}
	function d() {
		for (let n = t, r = e.length; n < r; n++) {
			let t = e[n];
			if (t.id === null) break;
			t.id = null, t.object = null, t.geometry = null, t.material = null, t.group = null;
		}
	}
	return {
		opaque: n,
		transmissive: r,
		transparent: i,
		init: a,
		push: c,
		unshift: l,
		finish: d,
		sort: u
	};
}
function pl() {
	let e = /* @__PURE__ */ new WeakMap();
	function t(t, n) {
		let r = e.get(t), i;
		return r === void 0 ? (i = new fl(), e.set(t, [i])) : n >= r.length ? (i = new fl(), r.push(i)) : i = r[n], i;
	}
	function n() {
		e = /* @__PURE__ */ new WeakMap();
	}
	return {
		get: t,
		dispose: n
	};
}
function ml() {
	let e = {};
	return { get: function(t) {
		if (e[t.id] !== void 0) return e[t.id];
		let n;
		switch (t.type) {
			case "SunLight":
			case "DirectionalLight":
				n = {
					direction: new K(),
					color: new Y()
				};
				break;
			case "SpotLight":
				n = {
					position: new K(),
					direction: new K(),
					color: new Y(),
					distance: 0,
					coneCos: 0,
					penumbraCos: 0,
					decay: 0
				};
				break;
			case "PointLight":
				n = {
					position: new K(),
					color: new Y(),
					distance: 0,
					decay: 0
				};
				break;
			case "HemisphereLight":
				n = {
					direction: new K(),
					skyColor: new Y(),
					groundColor: new Y()
				};
				break;
			case "RectAreaLight": n = {
				color: new Y(),
				position: new K(),
				halfWidth: new K(),
				halfHeight: new K()
			};
		}
		return e[t.id] = n, n;
	} };
}
function hl() {
	let e = {};
	return { get: function(t) {
		if (e[t.id] !== void 0) return e[t.id];
		let n;
		switch (t.type) {
			case "SunLight":
			case "DirectionalLight":
				n = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new G()
				};
				break;
			case "SpotLight":
				n = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new G()
				};
				break;
			case "PointLight": n = {
				shadowIntensity: 1,
				shadowBias: 0,
				shadowNormalBias: 0,
				shadowRadius: 1,
				shadowMapSize: new G(),
				shadowCameraNear: 1,
				shadowCameraFar: 1e3
			};
		}
		return e[t.id] = n, n;
	} };
}
var gl = 0;
function _l(e, t) {
	return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + +!!t.map - !!e.map;
}
function vl(e) {
	let t = new ml(), n = hl(), r = {
		version: 0,
		hash: {
			sunLength: -1,
			directionalLength: -1,
			pointLength: -1,
			spotLength: -1,
			rectAreaLength: -1,
			hemiLength: -1,
			numSunShadows: -1,
			numDirectionalShadows: -1,
			numPointShadows: -1,
			numSpotShadows: -1,
			numSpotMaps: -1,
			numLightProbes: -1
		},
		ambient: [
			0,
			0,
			0
		],
		probe: [],
		sun: [],
		sunShadow: [],
		sunShadowMap: [],
		sunShadowMatrix: [],
		sunShadowCascade: [],
		directional: [],
		directionalShadow: [],
		directionalShadowMap: [],
		directionalShadowMatrix: [],
		spot: [],
		spotLightMap: [],
		spotShadow: [],
		spotShadowMap: [],
		spotLightMatrix: [],
		rectArea: [],
		rectAreaLTC1: null,
		rectAreaLTC2: null,
		point: [],
		pointShadow: [],
		pointShadowMap: [],
		pointShadowMatrix: [],
		hemi: [],
		numSpotLightShadowsWithMaps: 0,
		numLightProbes: 0
	};
	for (let e = 0; e < 9; e++) r.probe.push(new K());
	let i = new K(), a = new Yt(), o = new Yt();
	function s(i) {
		let a = 0, o = 0, s = 0;
		for (let e = 0; e < 9; e++) r.probe[e].set(0, 0, 0);
		let c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = 0, h = 0, g = 0, _ = 0, v = 0, y = 0, b = 0, x = 0;
		i.sort(_l);
		for (let e = 0, S = i.length; e < S; e++) {
			let S = i[e], C = S.color, w = S.intensity, T = S.distance, E = null;
			if (S.shadow && S.shadow.map && (E = S.shadow.map.texture.format === 1030 ? S.shadow.map.texture : S.shadow.map.depthTexture || S.shadow.map.texture), S.isAmbientLight) a += C.r * w, o += C.g * w, s += C.b * w;
			else if (S.isLightProbe) {
				for (let e = 0; e < 9; e++) r.probe[e].addScaledVector(S.sh.coefficients[e], w);
				x++;
			} else if (S.isSunLight) {
				let e = t.get(S);
				if (e.color.copy(S.color).multiplyScalar(S.intensity), S.castShadow) {
					let e = S.shadow, t = n.get(S);
					t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()), r.sunShadow[l] = t, r.sunShadowMap[l] = E;
					let i = e.getViewportCount();
					for (let t = 0; t < i; t++) r.sunShadowMatrix[u + t] = e.getMatrix(t), r.sunShadowCascade[u + t] = e._cascadeData[t];
					u += i, l++;
				}
				r.sun[c] = e, c++;
			} else if (S.isDirectionalLight) {
				let e = t.get(S);
				if (e.color.copy(S.color).multiplyScalar(S.intensity), S.castShadow) {
					let e = S.shadow, t = n.get(S);
					t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize = e.mapSize, r.directionalShadow[d] = t, r.directionalShadowMap[d] = E, r.directionalShadowMatrix[d] = S.shadow.matrix, g++;
				}
				r.directional[d] = e, d++;
			} else if (S.isSpotLight) {
				let e = t.get(S);
				e.position.setFromMatrixPosition(S.matrixWorld), e.color.copy(C).multiplyScalar(w), e.distance = T, e.coneCos = Math.cos(S.angle), e.penumbraCos = Math.cos(S.angle * (1 - S.penumbra)), e.decay = S.decay, r.spot[p] = e;
				let i = S.shadow;
				if (S.map && (r.spotLightMap[y] = S.map, y++, i.updateMatrices(S), S.castShadow && b++), r.spotLightMatrix[p] = i.matrix, S.castShadow) {
					let e = n.get(S);
					e.shadowIntensity = i.intensity, e.shadowBias = i.bias, e.shadowNormalBias = i.normalBias, e.shadowRadius = i.radius, e.shadowMapSize = i.mapSize, r.spotShadow[p] = e, r.spotShadowMap[p] = E, v++;
				}
				p++;
			} else if (S.isRectAreaLight) {
				let e = t.get(S);
				e.color.copy(C).multiplyScalar(w), e.halfWidth.set(S.width * .5, 0, 0), e.halfHeight.set(0, S.height * .5, 0), r.rectArea[m] = e, m++;
			} else if (S.isPointLight) {
				let e = t.get(S);
				if (e.color.copy(S.color).multiplyScalar(S.intensity), e.distance = S.distance, e.decay = S.decay, S.castShadow) {
					let e = S.shadow, t = n.get(S);
					t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize = e.mapSize, t.shadowCameraNear = e.camera.near, t.shadowCameraFar = e.camera.far, r.pointShadow[f] = t, r.pointShadowMap[f] = E, r.pointShadowMatrix[f] = S.shadow.matrix, _++;
				}
				r.point[f] = e, f++;
			} else if (S.isHemisphereLight) {
				let e = t.get(S);
				e.skyColor.copy(S.color).multiplyScalar(w), e.groundColor.copy(S.groundColor).multiplyScalar(w), r.hemi[h] = e, h++;
			}
		}
		m > 0 && (e.has("OES_texture_float_linear") === !0 ? (r.rectAreaLTC1 = Z.LTC_FLOAT_1, r.rectAreaLTC2 = Z.LTC_FLOAT_2) : (r.rectAreaLTC1 = Z.LTC_HALF_1, r.rectAreaLTC2 = Z.LTC_HALF_2)), r.ambient[0] = a, r.ambient[1] = o, r.ambient[2] = s;
		let S = r.hash;
		(S.sunLength !== c || S.directionalLength !== d || S.pointLength !== f || S.spotLength !== p || S.rectAreaLength !== m || S.hemiLength !== h || S.numSunShadows !== l || S.numDirectionalShadows !== g || S.numPointShadows !== _ || S.numSpotShadows !== v || S.numSpotMaps !== y || S.numLightProbes !== x) && (r.sun.length = c, r.directional.length = d, r.spot.length = p, r.rectArea.length = m, r.point.length = f, r.hemi.length = h, r.sunShadow.length = l, r.sunShadowMap.length = l, r.sunShadowMatrix.length = u, r.sunShadowCascade.length = u, r.directionalShadow.length = g, r.directionalShadowMap.length = g, r.directionalShadowMatrix.length = g, r.pointShadow.length = _, r.pointShadowMap.length = _, r.pointShadowMatrix.length = _, r.spotShadow.length = v, r.spotShadowMap.length = v, r.spotLightMatrix.length = v + y - b, r.spotLightMap.length = y, r.numSpotLightShadowsWithMaps = b, r.numLightProbes = x, S.sunLength = c, S.directionalLength = d, S.pointLength = f, S.spotLength = p, S.rectAreaLength = m, S.hemiLength = h, S.numSunShadows = l, S.numDirectionalShadows = g, S.numPointShadows = _, S.numSpotShadows = v, S.numSpotMaps = y, S.numLightProbes = x, r.version = gl++);
	}
	function c(e, t) {
		let n = 0, s = 0, c = 0, l = 0, u = 0, d = 0, f = t.matrixWorldInverse;
		for (let t = 0, p = e.length; t < p; t++) {
			let p = e[t];
			if (p.isSunLight) {
				let e = r.sun[n];
				e.direction.setFromMatrixPosition(p.matrixWorld), e.direction.transformDirection(f), n++;
			} else if (p.isDirectionalLight) {
				let e = r.directional[s];
				e.direction.setFromMatrixPosition(p.matrixWorld), i.setFromMatrixPosition(p.target.matrixWorld), e.direction.sub(i), e.direction.transformDirection(f), s++;
			} else if (p.isSpotLight) {
				let e = r.spot[l];
				e.position.setFromMatrixPosition(p.matrixWorld), e.position.applyMatrix4(f), e.direction.setFromMatrixPosition(p.matrixWorld), i.setFromMatrixPosition(p.target.matrixWorld), e.direction.sub(i), e.direction.transformDirection(f), l++;
			} else if (p.isRectAreaLight) {
				let e = r.rectArea[u];
				e.position.setFromMatrixPosition(p.matrixWorld), e.position.applyMatrix4(f), o.identity(), a.copy(p.matrixWorld), a.premultiply(f), o.extractRotation(a), e.halfWidth.set(p.width * .5, 0, 0), e.halfHeight.set(0, p.height * .5, 0), e.halfWidth.applyMatrix4(o), e.halfHeight.applyMatrix4(o), u++;
			} else if (p.isPointLight) {
				let e = r.point[c];
				e.position.setFromMatrixPosition(p.matrixWorld), e.position.applyMatrix4(f), c++;
			} else if (p.isHemisphereLight) {
				let e = r.hemi[d];
				e.direction.setFromMatrixPosition(p.matrixWorld), e.direction.transformDirection(f), d++;
			}
		}
	}
	return {
		setup: s,
		setupView: c,
		state: r
	};
}
function yl(e) {
	let t = new vl(e), n = [], r = [], i = [];
	function a(e) {
		u.camera = e, n.length = 0, r.length = 0, i.length = 0;
	}
	function o(e) {
		e.isLightProbeGrid ? i.push(e) : n.push(e);
	}
	function s(e) {
		r.push(e);
	}
	function c() {
		t.setup(n), i.sort((e, t) => e.priority - t.priority || e.id - t.id);
	}
	function l(e) {
		t.setupView(n, e);
	}
	let u = {
		lightsArray: n,
		shadowsArray: r,
		lightProbeGridArray: i,
		camera: null,
		lights: t,
		transmissionRenderTarget: {},
		textureUnits: 0
	};
	return {
		init: a,
		state: u,
		setupLights: c,
		setupLightsView: l,
		pushLight: o,
		pushShadow: s
	};
}
function bl(e) {
	let t = /* @__PURE__ */ new WeakMap();
	function n(n, r = 0) {
		let i = t.get(n), a;
		return i === void 0 ? (a = new yl(e), t.set(n, [a])) : r >= i.length ? (a = new yl(e), i.push(a)) : a = i[r], a;
	}
	function r() {
		t = /* @__PURE__ */ new WeakMap();
	}
	return {
		get: n,
		dispose: r
	};
}
var xl = "void main() {\n	gl_Position = vec4( position, 1.0 );\n}", Sl = "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\nvoid main() {\n	const float samples = float( VSM_SAMPLES );\n	float mean = 0.0;\n	float squared_mean = 0.0;\n	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n	for ( float i = 0.0; i < samples; i ++ ) {\n		float uvOffset = uvStart + i * uvStride;\n		#ifdef HORIZONTAL_PASS\n			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;\n			mean += distribution.x;\n			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n		#else\n			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;\n			mean += depth;\n			squared_mean += depth * depth;\n		#endif\n	}\n	mean = mean / samples;\n	squared_mean = squared_mean / samples;\n	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );\n	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );\n}", Cl = [
	/*@__PURE__*/ new K(1, 0, 0),
	/*@__PURE__*/ new K(-1, 0, 0),
	/*@__PURE__*/ new K(0, 1, 0),
	/*@__PURE__*/ new K(0, -1, 0),
	/*@__PURE__*/ new K(0, 0, 1),
	/*@__PURE__*/ new K(0, 0, -1)
], wl = [
	/*@__PURE__*/ new K(0, -1, 0),
	/*@__PURE__*/ new K(0, -1, 0),
	/*@__PURE__*/ new K(0, 0, 1),
	/*@__PURE__*/ new K(0, 0, -1),
	/*@__PURE__*/ new K(0, -1, 0),
	/*@__PURE__*/ new K(0, -1, 0)
], Tl = /*@__PURE__*/ new Yt(), El = /*@__PURE__*/ new K(), Dl = /*@__PURE__*/ new K();
function Ol(e, t, n) {
	let r = new Mi(), i = new G(), o = new G(), s = new Wt(), l = new Sa(), u = new Ca(), d = {}, f = n.maxTextureSize, p = {
		0: 1,
		1: 0,
		2: 2
	}, m = new va({
		defines: { VSM_SAMPLES: 8 },
		uniforms: {
			shadow_pass: { value: null },
			resolution: { value: new G() },
			radius: { value: 4 }
		},
		vertexShader: xl,
		fragmentShader: Sl
	}), h = m.clone();
	h.defines.HORIZONTAL_PASS = 1;
	let y = new Er();
	y.setAttribute("position", new dr(new Float32Array([
		-1,
		-1,
		.5,
		3,
		-1,
		.5,
		-1,
		3,
		.5
	]), 3));
	let b = new gi(y, m), x = this;
	this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
	let S = this.type;
	this.render = function(t, n, l) {
		if (x.enabled === !1 || x.autoUpdate === !1 && x.needsUpdate === !1 || t.length === 0) return;
		this.type === 2 && (H("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."), this.type = 1);
		let u = e.getRenderTarget(), d = e.getActiveCubeFace(), p = e.getActiveMipmapLevel(), m = e.state;
		m.setBlending(0), m.buffers.depth.getReversed() === !0 ? m.buffers.color.setClear(0, 0, 0, 0) : m.buffers.color.setClear(1, 1, 1, 1), m.buffers.depth.setTest(!0), m.setScissorTest(!1);
		let h = S !== this.type;
		h && n.traverse(function(e) {
			e.material && (Array.isArray(e.material) ? e.material.forEach((e) => e.needsUpdate = !0) : e.material.needsUpdate = !0);
		});
		for (let u = 0, d = t.length; u < d; u++) {
			let d = t[u], p = d.shadow;
			if (p === void 0) {
				H("WebGLShadowMap:", d, "has no shadow.");
				continue;
			}
			if (p.autoUpdate === !1 && p.needsUpdate === !1) continue;
			i.copy(p.mapSize);
			let y = p.getFrameExtents();
			i.multiply(y), o.copy(p.mapSize), (i.x > f || i.y > f) && (i.x > f && (o.x = Math.floor(f / y.x), i.x = o.x * y.x, p.mapSize.x = o.x), i.y > f && (o.y = Math.floor(f / y.y), i.y = o.y * y.y, p.mapSize.y = o.y));
			let b = e.state.buffers.depth.getReversed();
			if (p.camera._reversedDepth = b, p.map === null || h === !0) {
				if (p.map !== null && (p.map.depthTexture !== null && (p.map.depthTexture.dispose(), p.map.depthTexture = null), p.map.dispose()), this.type === 3) {
					if (d.isPointLight) {
						H("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
						continue;
					}
					p.map = new Kt(i.x, i.y, {
						format: j,
						type: v,
						minFilter: c,
						magFilter: c,
						generateMipmaps: !1
					}), p.map.texture.name = d.name + ".shadowMap", p.map.depthTexture = new Xi(i.x, i.y, _), p.map.depthTexture.name = d.name + ".shadowMapDepth", p.map.depthTexture.format = D, p.map.depthTexture.compareFunction = null, p.map.depthTexture.minFilter = a, p.map.depthTexture.magFilter = a;
				} else d.isPointLight ? (p.map = new Go(i.x), p.map.depthTexture = new Zi(i.x, g)) : (p.map = new Kt(i.x, i.y), p.map.depthTexture = new Xi(i.x, i.y, g)), p.map.depthTexture.name = d.name + ".shadowMap", p.map.depthTexture.format = D, this.type === 1 ? (p.map.depthTexture.compareFunction = b ? 518 : 515, p.map.depthTexture.minFilter = c, p.map.depthTexture.magFilter = c) : (p.map.depthTexture.compareFunction = null, p.map.depthTexture.minFilter = a, p.map.depthTexture.magFilter = a);
				p.camera.updateProjectionMatrix();
			}
			p.map.isWebGLCubeRenderTarget !== !0 && (p.map.width !== i.x || p.map.height !== i.y) && p.map.setSize(i.x, i.y);
			let x = p.map.isWebGLCubeRenderTarget ? 6 : p.getViewportCount();
			d.isPointLight !== !0 && p.updateMatrices(d, l);
			let S = p.camera.layers.mask & 4294967294 ? p.camera.layers : l.layers;
			for (let t = 0; t < x; t++) {
				let i = p.getCamera(t);
				if (d.isPointLight) {
					let e = p.camera, n = p.matrix, r = d.distance || e.far;
					r !== e.far && (e.far = r, e.updateProjectionMatrix()), El.setFromMatrixPosition(d.matrixWorld), e.position.copy(El), Dl.copy(e.position), Dl.add(Cl[t]), e.up.copy(wl[t]), e.lookAt(Dl), e.updateMatrixWorld(), n.makeTranslation(-El.x, -El.y, -El.z), Tl.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), p._frustum.setFromProjectionMatrix(Tl, e.coordinateSystem, e.reversedDepth);
				}
				if (p.map.isWebGLCubeRenderTarget) e.setRenderTarget(p.map, t), e.clear();
				else {
					t === 0 && (e.setRenderTarget(p.map), e.clear());
					let n = p.getViewport(t);
					s.set(o.x * n.x, o.y * n.y, o.x * n.z, o.y * n.w), m.viewport(s);
				}
				r = p.getFrustum(t), T(n, l, i, d, S, this.type);
			}
			p.isPointLightShadow !== !0 && this.type === 3 && C(p, l), p.needsUpdate = !1;
		}
		S = this.type, x.needsUpdate = !1, e.setRenderTarget(u, d, p);
	};
	function C(n, r) {
		let a = t.update(b);
		m.defines.VSM_SAMPLES !== n.blurSamples && (m.defines.VSM_SAMPLES = n.blurSamples, h.defines.VSM_SAMPLES = n.blurSamples, m.needsUpdate = !0, h.needsUpdate = !0), n.mapPass === null ? n.mapPass = new Kt(i.x, i.y, {
			format: j,
			type: v
		}) : (n.mapPass.width !== n.map.width || n.mapPass.height !== n.map.height) && n.mapPass.setSize(n.map.width, n.map.height), m.uniforms.shadow_pass.value = n.map.depthTexture, m.uniforms.resolution.value.set(n.map.width, n.map.height), m.uniforms.radius.value = n.radius, e.setRenderTarget(n.mapPass), e.clear(), e.renderBufferDirect(r, null, a, m, b, null), h.uniforms.shadow_pass.value = n.mapPass.texture, h.uniforms.resolution.value.set(n.map.width, n.map.height), h.uniforms.radius.value = n.radius, e.setRenderTarget(n.map), e.clear(), e.renderBufferDirect(r, null, a, h, b, null);
	}
	function w(t, n, r, i) {
		let a = null, o = r.isPointLight === !0 ? t.customDistanceMaterial : t.customDepthMaterial;
		if (o !== void 0) a = o;
		else if (a = r.isPointLight === !0 ? u : l, e.localClippingEnabled && n.clipShadows === !0 && Array.isArray(n.clippingPlanes) && n.clippingPlanes.length !== 0 || n.displacementMap && n.displacementScale !== 0 || n.alphaMap && n.alphaTest > 0 || n.map && n.alphaTest > 0 || n.alphaToCoverage === !0) {
			let e = a.uuid, t = n.uuid, r = d[e];
			r === void 0 && (r = {}, d[e] = r);
			let i = r[t];
			i === void 0 && (i = a.clone(), r[t] = i, n.addEventListener("dispose", E)), a = i;
		}
		if (a.visible = n.visible, a.wireframe = n.wireframe, i === 3 ? a.side = n.shadowSide === null ? n.side : n.shadowSide : a.side = n.shadowSide === null ? p[n.side] : n.shadowSide, a.alphaMap = n.alphaMap, a.alphaTest = n.alphaToCoverage === !0 ? .5 : n.alphaTest, a.map = n.map, a.clipShadows = n.clipShadows, a.clippingPlanes = n.clippingPlanes, a.clipIntersection = n.clipIntersection, a.displacementMap = n.displacementMap, a.displacementScale = n.displacementScale, a.displacementBias = n.displacementBias, a.wireframeLinewidth = n.wireframeLinewidth, a.linewidth = n.linewidth, r.isPointLight === !0 && a.isMeshDistanceMaterial === !0) {
			let t = e.properties.get(a);
			t.light = r;
		}
		return a;
	}
	function T(n, i, a, o, s, c) {
		if (n.visible === !1) return;
		if (n.layers.test(s) && (n.isMesh || n.isLine || n.isPoints) && (n.castShadow || n.receiveShadow && c === 3) && (!n.frustumCulled || n.intersectsFrustum(r))) {
			n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, n.matrixWorld);
			let r = t.update(n), s = n.material;
			if (Array.isArray(s)) {
				let t = r.groups;
				for (let l = 0, u = t.length; l < u; l++) {
					let u = t[l], d = s[u.materialIndex];
					if (d && d.visible) {
						let t = w(n, d, o, c);
						n.onBeforeShadow(e, n, i, a, r, t, u), e.renderBufferDirect(a, null, r, t, n, u), n.onAfterShadow(e, n, i, a, r, t, u);
					}
				}
			} else if (s.visible) {
				let t = w(n, s, o, c);
				n.onBeforeShadow(e, n, i, a, r, t, null), e.renderBufferDirect(a, null, r, t, n, null), n.onAfterShadow(e, n, i, a, r, t, null);
			}
		}
		let l = n.children;
		for (let e = 0, t = l.length; e < t; e++) T(l[e], i, a, o, s, c);
	}
	function E(e) {
		e.target.removeEventListener("dispose", E);
		for (let t in d) {
			let n = d[t], r = e.target.uuid;
			r in n && (n[r].dispose(), delete n[r]);
		}
	}
}
function kl(e, t) {
	function n() {
		let t = !1, n = new Wt(), r = null, i = new Wt(0, 0, 0, 0);
		return {
			setMask: function(n) {
				r !== n && !t && (e.colorMask(n, n, n, n), r = n);
			},
			setLocked: function(e) {
				t = e;
			},
			setClear: function(t, r, a, o, s) {
				s === !0 && (t *= o, r *= o, a *= o), n.set(t, r, a, o), i.equals(n) === !1 && (e.clearColor(t, r, a, o), i.copy(n));
			},
			reset: function() {
				t = !1, r = null, i.set(-1, 0, 0, 0);
			}
		};
	}
	function r() {
		let n = !1, r = !1, i = null, a = null, o = null;
		return {
			setReversed: function(e) {
				if (r !== e) {
					let n = t.get("EXT_clip_control");
					e ? n.clipControlEXT(n.LOWER_LEFT_EXT, n.ZERO_TO_ONE_EXT) : n.clipControlEXT(n.LOWER_LEFT_EXT, n.NEGATIVE_ONE_TO_ONE_EXT), r = e;
					let i = o;
					o = null, this.setClear(i);
				}
			},
			getReversed: function() {
				return r;
			},
			setTest: function(t) {
				t ? L(e.DEPTH_TEST) : se(e.DEPTH_TEST);
			},
			setMask: function(t) {
				i !== t && !n && (e.depthMask(t), i = t);
			},
			setFunc: function(t) {
				if (r && (t = Qe[t]), a !== t) {
					switch (t) {
						case 0:
							e.depthFunc(e.NEVER);
							break;
						case 1:
							e.depthFunc(e.ALWAYS);
							break;
						case 2:
							e.depthFunc(e.LESS);
							break;
						case 3:
							e.depthFunc(e.LEQUAL);
							break;
						case 4:
							e.depthFunc(e.EQUAL);
							break;
						case 5:
							e.depthFunc(e.GEQUAL);
							break;
						case 6:
							e.depthFunc(e.GREATER);
							break;
						case 7:
							e.depthFunc(e.NOTEQUAL);
							break;
						default: e.depthFunc(e.LEQUAL);
					}
					a = t;
				}
			},
			setLocked: function(e) {
				n = e;
			},
			setClear: function(t) {
				o !== t && (o = t, r && (t = 1 - t), e.clearDepth(t));
			},
			reset: function() {
				n = !1, i = null, a = null, o = null, r = !1;
			}
		};
	}
	function i() {
		let t = !1, n = null, r = null, i = null, a = null, o = null, s = null, c = null, l = null;
		return {
			setTest: function(n) {
				t || (n ? L(e.STENCIL_TEST) : se(e.STENCIL_TEST));
			},
			setMask: function(r) {
				n !== r && !t && (e.stencilMask(r), n = r);
			},
			setFunc: function(t, n, o) {
				(r !== t || i !== n || a !== o) && (e.stencilFunc(t, n, o), r = t, i = n, a = o);
			},
			setOp: function(t, n, r) {
				(o !== t || s !== n || c !== r) && (e.stencilOp(t, n, r), o = t, s = n, c = r);
			},
			setLocked: function(e) {
				t = e;
			},
			setClear: function(t) {
				l !== t && (e.clearStencil(t), l = t);
			},
			reset: function() {
				t = !1, n = null, r = null, i = null, a = null, o = null, s = null, c = null, l = null;
			}
		};
	}
	let a = new n(), o = new r(), s = new i(), c = {}, l = /* @__PURE__ */ new WeakMap(), u = {}, d = {}, f = {}, p = /* @__PURE__ */ new WeakMap(), m = [], h = null, g = !1, _ = null, v = null, y = null, b = null, x = null, S = null, C = null, w = new Y(0, 0, 0), T = 0, E = !1, D = null, O = null, k = null, A = null, j = null, ee = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS), te = !1, M = 0, N = e.getParameter(e.VERSION);
	N.indexOf("WebGL") === -1 ? N.indexOf("OpenGL ES") !== -1 && (M = parseFloat(/^OpenGL ES (\d)/.exec(N)[1]), te = M >= 2) : (M = parseFloat(/^WebGL (\d)/.exec(N)[1]), te = M >= 1);
	let P = null, F = {}, I = e.getParameter(e.SCISSOR_BOX), ne = e.getParameter(e.VIEWPORT), re = new Wt().fromArray(I), ie = new Wt().fromArray(ne);
	function ae(t, n, r, i) {
		let a = /* @__PURE__ */ new Uint8Array(4), o = e.createTexture();
		e.bindTexture(t, o), e.texParameteri(t, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(t, e.TEXTURE_MAG_FILTER, e.NEAREST);
		for (let o = 0; o < r; o++) t === e.TEXTURE_3D || t === e.TEXTURE_2D_ARRAY ? e.texImage3D(n, 0, e.RGBA, 1, 1, i, 0, e.RGBA, e.UNSIGNED_BYTE, a) : e.texImage2D(n + o, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, a);
		return o;
	}
	let oe = {};
	oe[e.TEXTURE_2D] = ae(e.TEXTURE_2D, e.TEXTURE_2D, 1), oe[e.TEXTURE_CUBE_MAP] = ae(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), oe[e.TEXTURE_2D_ARRAY] = ae(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), oe[e.TEXTURE_3D] = ae(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), a.setClear(0, 0, 0, 1), o.setClear(1), s.setClear(0), L(e.DEPTH_TEST), o.setFunc(3), he(!1), ge(1), L(e.CULL_FACE), pe(0);
	function L(t) {
		u[t] !== !0 && (e.enable(t), u[t] = !0);
	}
	function se(t) {
		u[t] !== !1 && (e.disable(t), u[t] = !1);
	}
	function ce(t, n) {
		return f[t] !== n && (e.bindFramebuffer(t, n), f[t] = n, t === e.DRAW_FRAMEBUFFER && (f[e.FRAMEBUFFER] = n), t === e.FRAMEBUFFER && (f[e.DRAW_FRAMEBUFFER] = n), !0);
	}
	function le(t, n) {
		let r = m, i = !1;
		if (t) {
			r = p.get(n), r === void 0 && (r = [], p.set(n, r));
			let a = t.textures;
			if (r.length !== a.length || r[0] !== e.COLOR_ATTACHMENT0) {
				for (let t = 0, n = a.length; t < n; t++) r[t] = e.COLOR_ATTACHMENT0 + t;
				r.length = a.length, i = !0;
			}
		} else r[0] !== e.BACK && (r[0] = e.BACK, i = !0);
		i && e.drawBuffers(r);
	}
	function ue(t) {
		return h !== t && (e.useProgram(t), h = t, !0);
	}
	let de = {
		100: e.FUNC_ADD,
		101: e.FUNC_SUBTRACT,
		102: e.FUNC_REVERSE_SUBTRACT
	};
	de[103] = e.MIN, de[104] = e.MAX;
	let fe = {
		200: e.ZERO,
		201: e.ONE,
		202: e.SRC_COLOR,
		204: e.SRC_ALPHA,
		210: e.SRC_ALPHA_SATURATE,
		208: e.DST_COLOR,
		206: e.DST_ALPHA,
		203: e.ONE_MINUS_SRC_COLOR,
		205: e.ONE_MINUS_SRC_ALPHA,
		209: e.ONE_MINUS_DST_COLOR,
		207: e.ONE_MINUS_DST_ALPHA,
		211: e.CONSTANT_COLOR,
		212: e.ONE_MINUS_CONSTANT_COLOR,
		213: e.CONSTANT_ALPHA,
		214: e.ONE_MINUS_CONSTANT_ALPHA
	};
	function pe(t, n, r, i, a, o, s, c, l, u) {
		if (t === 0) g === !0 && (se(e.BLEND), g = !1);
		else if (g === !1 && (L(e.BLEND), g = !0), t !== 5) {
			if (t !== _ || u !== E) {
				if ((v !== 100 || x !== 100) && (e.blendEquation(e.FUNC_ADD), v = 100, x = 100), u) switch (t) {
					case 1:
						e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
						break;
					case 2:
						e.blendFunc(e.ONE, e.ONE);
						break;
					case 3:
						e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
						break;
					case 4:
						e.blendFuncSeparate(e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA, e.ZERO, e.ONE);
						break;
					default: U("WebGLState: Invalid blending: ", t);
				}
				else switch (t) {
					case 1:
						e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
						break;
					case 2:
						e.blendFuncSeparate(e.SRC_ALPHA, e.ONE, e.ONE, e.ONE);
						break;
					case 3:
						U("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
						break;
					case 4:
						U("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
						break;
					default: U("WebGLState: Invalid blending: ", t);
				}
				y = null, b = null, S = null, C = null, w.set(0, 0, 0), T = 0, _ = t, E = u;
			}
		} else a ||= n, o ||= r, s ||= i, (n !== v || a !== x) && (e.blendEquationSeparate(de[n], de[a]), v = n, x = a), (r !== y || i !== b || o !== S || s !== C) && (e.blendFuncSeparate(fe[r], fe[i], fe[o], fe[s]), y = r, b = i, S = o, C = s), (c.equals(w) === !1 || l !== T) && (e.blendColor(c.r, c.g, c.b, l), w.copy(c), T = l), _ = t, E = !1;
	}
	function me(t, n) {
		t.side === 2 ? se(e.CULL_FACE) : L(e.CULL_FACE);
		let r = t.side === 1;
		n && (r = !r), he(r), t.blending === 1 && t.transparent === !1 ? pe(0) : pe(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.blendColor, t.blendAlpha, t.premultipliedAlpha), o.setFunc(t.depthFunc), o.setTest(t.depthTest), o.setMask(t.depthWrite), a.setMask(t.colorWrite);
		let i = t.stencilWrite;
		s.setTest(i), i && (s.setMask(t.stencilWriteMask), s.setFunc(t.stencilFunc, t.stencilRef, t.stencilFuncMask), s.setOp(t.stencilFail, t.stencilZFail, t.stencilZPass)), ve(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits), t.alphaToCoverage === !0 ? L(e.SAMPLE_ALPHA_TO_COVERAGE) : se(e.SAMPLE_ALPHA_TO_COVERAGE);
	}
	function he(t) {
		D !== t && (t ? e.frontFace(e.CW) : e.frontFace(e.CCW), D = t);
	}
	function ge(t) {
		t === 0 ? se(e.CULL_FACE) : (L(e.CULL_FACE), t !== O && (t === 1 ? e.cullFace(e.BACK) : t === 2 ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))), O = t;
	}
	function _e(t) {
		t !== k && (te && e.lineWidth(t), k = t);
	}
	function ve(t, n, r) {
		t ? (L(e.POLYGON_OFFSET_FILL), (A !== n || j !== r) && (A = n, j = r, o.getReversed() && (n = -n, r = -r), e.polygonOffset(n, r))) : se(e.POLYGON_OFFSET_FILL);
	}
	function ye(t) {
		t ? L(e.SCISSOR_TEST) : se(e.SCISSOR_TEST);
	}
	function be(t) {
		t === void 0 && (t = e.TEXTURE0 + ee - 1), P !== t && (e.activeTexture(t), P = t);
	}
	function xe(t, n, r) {
		r === void 0 && (r = P === null ? e.TEXTURE0 + ee - 1 : P);
		let i = F[r];
		i === void 0 && (i = {
			type: void 0,
			texture: void 0
		}, F[r] = i), (i.type !== t || i.texture !== n) && (P !== r && (e.activeTexture(r), P = r), e.bindTexture(t, n || oe[t]), i.type = t, i.texture = n);
	}
	function Se() {
		let t = F[P];
		t !== void 0 && t.type !== void 0 && (e.bindTexture(t.type, null), t.type = void 0, t.texture = void 0);
	}
	function Ce() {
		try {
			e.compressedTexImage2D(...arguments);
		} catch (e) {
			U("WebGLState:", e);
		}
	}
	function we() {
		try {
			e.compressedTexImage3D(...arguments);
		} catch (e) {
			U("WebGLState:", e);
		}
	}
	function Te() {
		try {
			e.texSubImage2D(...arguments);
		} catch (e) {
			U("WebGLState:", e);
		}
	}
	function Ee() {
		try {
			e.texSubImage3D(...arguments);
		} catch (e) {
			U("WebGLState:", e);
		}
	}
	function De() {
		try {
			e.compressedTexSubImage2D(...arguments);
		} catch (e) {
			U("WebGLState:", e);
		}
	}
	function Oe() {
		try {
			e.compressedTexSubImage3D(...arguments);
		} catch (e) {
			U("WebGLState:", e);
		}
	}
	function ke() {
		try {
			e.texStorage2D(...arguments);
		} catch (e) {
			U("WebGLState:", e);
		}
	}
	function Ae() {
		try {
			e.texStorage3D(...arguments);
		} catch (e) {
			U("WebGLState:", e);
		}
	}
	function je() {
		try {
			e.texImage2D(...arguments);
		} catch (e) {
			U("WebGLState:", e);
		}
	}
	function R() {
		try {
			e.texImage3D(...arguments);
		} catch (e) {
			U("WebGLState:", e);
		}
	}
	function Me(t) {
		return d[t] === void 0 ? e.getParameter(t) : d[t];
	}
	function Ne(t, n) {
		d[t] !== n && (e.pixelStorei(t, n), d[t] = n);
	}
	function Pe(t) {
		re.equals(t) === !1 && (e.scissor(t.x, t.y, t.z, t.w), re.copy(t));
	}
	function z(t) {
		ie.equals(t) === !1 && (e.viewport(t.x, t.y, t.z, t.w), ie.copy(t));
	}
	function Fe(t, n) {
		let r = l.get(n);
		r === void 0 && (r = /* @__PURE__ */ new WeakMap(), l.set(n, r));
		let i = r.get(t);
		i === void 0 && (i = e.getUniformBlockIndex(n, t.name), e.uniformBlockBinding(n, i, i), r.set(t, i));
	}
	function B(t, n, r) {
		let i = l.get(n).get(t);
		c[i] !== r && (e.bindBufferBase(e.UNIFORM_BUFFER, i, r), c[i] = r);
	}
	function V() {
		e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(e.LESS), o.setReversed(!1), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.BROWSER_DEFAULT_WEBGL), e.pixelStorei(e.PACK_ROW_LENGTH, 0), e.pixelStorei(e.PACK_SKIP_PIXELS, 0), e.pixelStorei(e.PACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_ROW_LENGTH, 0), e.pixelStorei(e.UNPACK_IMAGE_HEIGHT, 0), e.pixelStorei(e.UNPACK_SKIP_PIXELS, 0), e.pixelStorei(e.UNPACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_SKIP_IMAGES, 0), u = {}, d = {}, P = null, F = {}, f = {}, c = {}, p = /* @__PURE__ */ new WeakMap(), m = [], h = null, g = !1, _ = null, v = null, y = null, b = null, x = null, S = null, C = null, w = new Y(0, 0, 0), T = 0, E = !1, D = null, O = null, k = null, A = null, j = null, re.set(0, 0, e.canvas.width, e.canvas.height), ie.set(0, 0, e.canvas.width, e.canvas.height), a.reset(), o.reset(), s.reset();
	}
	return {
		buffers: {
			color: a,
			depth: o,
			stencil: s
		},
		enable: L,
		disable: se,
		bindFramebuffer: ce,
		drawBuffers: le,
		useProgram: ue,
		setBlending: pe,
		setMaterial: me,
		setFlipSided: he,
		setCullFace: ge,
		setLineWidth: _e,
		setPolygonOffset: ve,
		setScissorTest: ye,
		activeTexture: be,
		bindTexture: xe,
		unbindTexture: Se,
		compressedTexImage2D: Ce,
		compressedTexImage3D: we,
		texImage2D: je,
		texImage3D: R,
		pixelStorei: Ne,
		getParameter: Me,
		updateUBOMapping: Fe,
		uniformBlockBinding: B,
		texStorage2D: ke,
		texStorage3D: Ae,
		texSubImage2D: Te,
		texSubImage3D: Ee,
		compressedTexSubImage2D: De,
		compressedTexSubImage3D: Oe,
		scissor: Pe,
		viewport: z,
		reset: V
	};
}
function Al(e, t, d, f, p, m, h) {
	let g = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, _ = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), v = new G(), y = /* @__PURE__ */ new WeakMap(), b = /* @__PURE__ */ new Set(), x, S = /* @__PURE__ */ new WeakMap(), C = /* @__PURE__ */ new Set(), w = new FinalizationRegistry((e) => C.delete(e)), T = !1;
	try {
		T = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
	} catch {}
	function E(e, t) {
		return T ? new OffscreenCanvas(e, t) : Ge("canvas");
	}
	function D(e, t, n) {
		let r = 1, i = V(e);
		if ((i.width > n || i.height > n) && (r = n / Math.max(i.width, i.height)), r < 1) {
			if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof VideoFrame < "u" && e instanceof VideoFrame) {
				let n = Math.floor(r * i.width), a = Math.floor(r * i.height);
				x === void 0 && (x = E(n, a));
				let o = t ? E(n, a) : x;
				return o.width = n, o.height = a, o.getContext("2d").drawImage(e, 0, 0, n, a), H("WebGLRenderer: Texture has been resized from (" + i.width + "x" + i.height + ") to (" + n + "x" + a + ")."), o;
			}
			return "data" in e && H("WebGLRenderer: Image in DataTexture is too big (" + i.width + "x" + i.height + ")."), e;
		}
		return e;
	}
	function k(e) {
		return e.generateMipmaps;
	}
	function A(t) {
		e.generateMipmap(t);
	}
	function j(t) {
		return t.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : t.isWebGL3DRenderTarget ? e.TEXTURE_3D : t.isWebGLArrayRenderTarget || t.isCompressedArrayTexture ? e.TEXTURE_2D_ARRAY : e.TEXTURE_2D;
	}
	function ee(n, r, i, a, o, s = !1) {
		if (n !== null) {
			if (e[n] !== void 0) return e[n];
			H("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + n + "'");
		}
		let c;
		a && (c = t.get("EXT_texture_norm16"), c || H("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
		let l = r;
		if (r === e.RED && (i === e.FLOAT && (l = e.R32F), i === e.HALF_FLOAT && (l = e.R16F), i === e.UNSIGNED_BYTE && (l = e.R8), i === e.UNSIGNED_SHORT && c && (l = c.R16_EXT), i === e.SHORT && c && (l = c.R16_SNORM_EXT)), r === e.RED_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.R8UI), i === e.UNSIGNED_SHORT && (l = e.R16UI), i === e.UNSIGNED_INT && (l = e.R32UI), i === e.BYTE && (l = e.R8I), i === e.SHORT && (l = e.R16I), i === e.INT && (l = e.R32I)), r === e.RG && (i === e.FLOAT && (l = e.RG32F), i === e.HALF_FLOAT && (l = e.RG16F), i === e.UNSIGNED_BYTE && (l = e.RG8), i === e.UNSIGNED_SHORT && c && (l = c.RG16_EXT), i === e.SHORT && c && (l = c.RG16_SNORM_EXT)), r === e.RG_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RG8UI), i === e.UNSIGNED_SHORT && (l = e.RG16UI), i === e.UNSIGNED_INT && (l = e.RG32UI), i === e.BYTE && (l = e.RG8I), i === e.SHORT && (l = e.RG16I), i === e.INT && (l = e.RG32I)), r === e.RGB_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RGB8UI), i === e.UNSIGNED_SHORT && (l = e.RGB16UI), i === e.UNSIGNED_INT && (l = e.RGB32UI), i === e.BYTE && (l = e.RGB8I), i === e.SHORT && (l = e.RGB16I), i === e.INT && (l = e.RGB32I)), r === e.RGBA_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RGBA8UI), i === e.UNSIGNED_SHORT && (l = e.RGBA16UI), i === e.UNSIGNED_INT && (l = e.RGBA32UI), i === e.BYTE && (l = e.RGBA8I), i === e.SHORT && (l = e.RGBA16I), i === e.INT && (l = e.RGBA32I)), r === e.RGB && (i === e.UNSIGNED_SHORT && c && (l = c.RGB16_EXT), i === e.SHORT && c && (l = c.RGB16_SNORM_EXT), i === e.UNSIGNED_INT_5_9_9_9_REV && (l = e.RGB9_E5), i === e.UNSIGNED_INT_10F_11F_11F_REV && (l = e.R11F_G11F_B10F)), r === e.RGBA) {
			let t = s ? Re : J.getTransfer(o);
			i === e.FLOAT && (l = e.RGBA32F), i === e.HALF_FLOAT && (l = e.RGBA16F), i === e.UNSIGNED_BYTE && (l = t === "srgb" ? e.SRGB8_ALPHA8 : e.RGBA8), i === e.UNSIGNED_SHORT && c && (l = c.RGBA16_EXT), i === e.SHORT && c && (l = c.RGBA16_SNORM_EXT), i === e.UNSIGNED_SHORT_4_4_4_4 && (l = e.RGBA4), i === e.UNSIGNED_SHORT_5_5_5_1 && (l = e.RGB5_A1);
		}
		return (l === e.R16F || l === e.R32F || l === e.RG16F || l === e.RG32F || l === e.RGBA16F || l === e.RGBA32F) && t.get("EXT_color_buffer_float"), l;
	}
	function te(t, n) {
		let r;
		return t ? n === null || n === 1014 || n === 1020 ? r = e.DEPTH24_STENCIL8 : n === 1015 ? r = e.DEPTH32F_STENCIL8 : n === 1012 && (r = e.DEPTH24_STENCIL8, H("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : n === null || n === 1014 || n === 1020 ? r = e.DEPTH_COMPONENT24 : n === 1015 ? r = e.DEPTH_COMPONENT32F : n === 1012 && (r = e.DEPTH_COMPONENT16), r;
	}
	function M(e, t) {
		return k(e) === !0 || e.isFramebufferTexture && e.minFilter !== 1003 && e.minFilter !== 1006 ? Math.log2(Math.max(t.width, t.height)) + 1 : e.mipmaps.length > 0 ? e.mipmaps.length : e.isCompressedTexture && Array.isArray(e.image) ? t.mipmaps.length : 1;
	}
	function N(e) {
		let t = new WeakRef(e);
		f.get(e).__ref = t, C.add(t), w.register(e, t, t);
	}
	function P(e) {
		let t = f.get(e).__ref;
		t !== void 0 && (C.delete(t), w.unregister(t));
	}
	function F(e) {
		ne(e.target);
	}
	function I(e) {
		re(e.target);
	}
	function ne(e) {
		e.removeEventListener("dispose", F), P(e), ae(e), e.isVideoTexture && y.delete(e), e.isHTMLTexture && b.delete(e);
	}
	function re(e) {
		e.removeEventListener("dispose", I), P(e), L(e);
	}
	function ie() {
		for (let e of C) {
			let t = e.deref();
			t !== void 0 && (t.isRenderTarget === !0 ? re(t) : ne(t));
		}
		C.clear(), b.clear();
	}
	function ae(e) {
		let t = f.get(e);
		if (t.__webglInit === void 0) return;
		let n = e.source, r = S.get(n);
		if (r) {
			let i = r[t.__cacheKey];
			i.usedTimes--, i.usedTimes === 0 && oe(e), Object.keys(r).length === 0 && S.delete(n);
		}
		f.remove(e);
	}
	function oe(t) {
		let n = f.get(t);
		e.deleteTexture(n.__webglTexture);
		let r = t.source, i = S.get(r);
		delete i[n.__cacheKey], h.memory.textures--;
	}
	function L(t) {
		let n = f.get(t);
		n.__depthDisposeCallback && n.__depthDisposeCallback();
		let r = t.depthTexture;
		if (r && r.renderTarget === t && ne(r), t.isWebGLCubeRenderTarget) for (let t = 0; t < 6; t++) {
			if (Array.isArray(n.__webglFramebuffer[t])) for (let r = 0; r < n.__webglFramebuffer[t].length; r++) e.deleteFramebuffer(n.__webglFramebuffer[t][r]);
			else e.deleteFramebuffer(n.__webglFramebuffer[t]);
			n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer[t]);
		}
		else {
			if (Array.isArray(n.__webglFramebuffer)) for (let t = 0; t < n.__webglFramebuffer.length; t++) e.deleteFramebuffer(n.__webglFramebuffer[t]);
			else e.deleteFramebuffer(n.__webglFramebuffer);
			if (n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer), n.__webglMultisampledFramebuffer && e.deleteFramebuffer(n.__webglMultisampledFramebuffer), n.__webglColorRenderbuffer) for (let t = 0; t < n.__webglColorRenderbuffer.length; t++) n.__webglColorRenderbuffer[t] && e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);
			n.__webglDepthRenderbuffer && e.deleteRenderbuffer(n.__webglDepthRenderbuffer);
		}
		let i = t.textures;
		for (let t = 0, n = i.length; t < n; t++) {
			let n = f.get(i[t]);
			n.__webglTexture && (e.deleteTexture(n.__webglTexture), h.memory.textures--), f.remove(i[t]);
		}
		f.remove(t);
	}
	let se = 0;
	function ce() {
		se = 0;
	}
	function le() {
		return se;
	}
	function ue(e) {
		se = e;
	}
	function de() {
		let e = se;
		return e >= p.maxTextures && H("WebGLTextures: Trying to use " + (e + 1) + " texture units while this GPU supports only " + p.maxTextures), se += 1, e;
	}
	function fe(e) {
		let t = [];
		return t.push(e.wrapS), t.push(e.wrapT), t.push(e.wrapR || 0), t.push(e.magFilter), t.push(e.minFilter), t.push(e.anisotropy), t.push(e.internalFormat), t.push(e.format), t.push(e.type), t.push(e.generateMipmaps), t.push(e.mipmapsAutoUpdate), t.push(e.premultiplyAlpha), t.push(e.flipY), t.push(e.unpackAlignment), t.push(e.colorSpace), t.join();
	}
	function pe(t, n) {
		let r = f.get(t);
		if (t.isVideoTexture && Fe(t), t.isRenderTargetTexture === !1 && t.isExternalTexture !== !0 && t.version > 0 && r.__version !== t.version) {
			let e = t.image;
			if (e === null) H("WebGLRenderer: Texture marked for update but no image data found.");
			else if (e.complete === !1) H("WebGLRenderer: Texture marked for update but image is incomplete");
			else {
				we(r, t, n);
				return;
			}
		} else t.isExternalTexture && (r.__webglTexture = t.sourceTexture ? t.sourceTexture : null);
		d.bindTexture(e.TEXTURE_2D, r.__webglTexture, e.TEXTURE0 + n);
	}
	function me(t, n) {
		let r = f.get(t);
		t.isRenderTargetTexture === !1 && t.version > 0 && r.__version !== t.version ? we(r, t, n) : (t.isExternalTexture && (r.__webglTexture = t.sourceTexture ? t.sourceTexture : null), d.bindTexture(e.TEXTURE_2D_ARRAY, r.__webglTexture, e.TEXTURE0 + n));
	}
	function he(t, n) {
		let r = f.get(t);
		t.isRenderTargetTexture === !1 && t.version > 0 && r.__version !== t.version ? we(r, t, n) : d.bindTexture(e.TEXTURE_3D, r.__webglTexture, e.TEXTURE0 + n);
	}
	function ge(t, n) {
		let r = f.get(t);
		t.version > 0 && r.__version !== t.version ? Te(r, t, n) : d.bindTexture(e.TEXTURE_CUBE_MAP, r.__webglTexture, e.TEXTURE0 + n);
	}
	let _e = {
		[n]: e.REPEAT,
		[r]: e.CLAMP_TO_EDGE,
		[i]: e.MIRRORED_REPEAT
	}, ve = {
		[a]: e.NEAREST,
		[o]: e.NEAREST_MIPMAP_NEAREST,
		[s]: e.NEAREST_MIPMAP_LINEAR,
		[c]: e.LINEAR,
		[l]: e.LINEAR_MIPMAP_NEAREST,
		[u]: e.LINEAR_MIPMAP_LINEAR
	}, ye = {
		512: e.NEVER,
		519: e.ALWAYS,
		513: e.LESS,
		515: e.LEQUAL,
		514: e.EQUAL,
		518: e.GEQUAL,
		516: e.GREATER,
		517: e.NOTEQUAL
	};
	function be(n, r) {
		if (r.type === 1015 && t.has("OES_texture_float_linear") === !1 && (r.magFilter === 1006 || r.magFilter === 1007 || r.magFilter === 1005 || r.magFilter === 1008 || r.minFilter === 1006 || r.minFilter === 1007 || r.minFilter === 1005 || r.minFilter === 1008) && H("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), e.texParameteri(n, e.TEXTURE_WRAP_S, _e[r.wrapS]), e.texParameteri(n, e.TEXTURE_WRAP_T, _e[r.wrapT]), (n === e.TEXTURE_3D || n === e.TEXTURE_2D_ARRAY) && e.texParameteri(n, e.TEXTURE_WRAP_R, _e[r.wrapR]), e.texParameteri(n, e.TEXTURE_MAG_FILTER, ve[r.magFilter]), e.texParameteri(n, e.TEXTURE_MIN_FILTER, ve[r.minFilter]), r.compareFunction && (e.texParameteri(n, e.TEXTURE_COMPARE_MODE, e.COMPARE_REF_TO_TEXTURE), e.texParameteri(n, e.TEXTURE_COMPARE_FUNC, ye[r.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
			if (r.magFilter === 1003 || r.minFilter !== 1005 && r.minFilter !== 1008 || r.type === 1015 && t.has("OES_texture_float_linear") === !1) return;
			if (r.anisotropy > 1 || f.get(r).__currentAnisotropy) {
				let i = t.get("EXT_texture_filter_anisotropic");
				e.texParameterf(n, i.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(r.anisotropy, p.getMaxAnisotropy())), f.get(r).__currentAnisotropy = r.anisotropy;
			}
		}
	}
	function xe(t, n) {
		let r = !1;
		t.__webglInit === void 0 && (t.__webglInit = !0, n.addEventListener("dispose", F), N(n));
		let i = n.source, a = S.get(i);
		a === void 0 && (a = {}, S.set(i, a));
		let o = fe(n);
		if (o !== t.__cacheKey) {
			a[o] === void 0 && (a[o] = {
				texture: e.createTexture(),
				usedTimes: 0
			}, h.memory.textures++, r = !0), a[o].usedTimes++;
			let i = a[t.__cacheKey];
			i !== void 0 && (a[t.__cacheKey].usedTimes--, i.usedTimes === 0 && oe(n)), t.__cacheKey = o, t.__webglTexture = a[o].texture;
		}
		return r;
	}
	function Se(e, t, n) {
		return Math.floor(Math.floor(e / n) / t);
	}
	function Ce(t, n, r, i) {
		let a = t.updateRanges;
		if (a.length === 0) d.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, n.width, n.height, r, i, n.data);
		else {
			a.sort((e, t) => e.start - t.start);
			let o = 0;
			for (let e = 1; e < a.length; e++) {
				let t = a[o], r = a[e], i = t.start + t.count, s = Se(r.start, n.width, 4), c = Se(t.start, n.width, 4);
				r.start <= i + 1 && s === c && Se(r.start + r.count - 1, n.width, 4) === s ? t.count = Math.max(t.count, r.start + r.count - t.start) : (++o, a[o] = r);
			}
			a.length = o + 1;
			let s = d.getParameter(e.UNPACK_ROW_LENGTH), c = d.getParameter(e.UNPACK_SKIP_PIXELS), l = d.getParameter(e.UNPACK_SKIP_ROWS);
			d.pixelStorei(e.UNPACK_ROW_LENGTH, n.width);
			for (let t = 0, o = a.length; t < o; t++) {
				let o = a[t], s = Math.floor(o.start / 4), c = Math.ceil(o.count / 4), l = s % n.width, u = Math.floor(s / n.width), f = c;
				d.pixelStorei(e.UNPACK_SKIP_PIXELS, l), d.pixelStorei(e.UNPACK_SKIP_ROWS, u), d.texSubImage2D(e.TEXTURE_2D, 0, l, u, f, 1, r, i, n.data);
			}
			t.clearUpdateRanges(), d.pixelStorei(e.UNPACK_ROW_LENGTH, s), d.pixelStorei(e.UNPACK_SKIP_PIXELS, c), d.pixelStorei(e.UNPACK_SKIP_ROWS, l);
		}
	}
	function we(t, n, r) {
		let i = e.TEXTURE_2D;
		(n.isDataArrayTexture || n.isCompressedArrayTexture) && (i = e.TEXTURE_2D_ARRAY), n.isData3DTexture && (i = e.TEXTURE_3D);
		let a = xe(t, n), o = n.source;
		d.bindTexture(i, t.__webglTexture, e.TEXTURE0 + r);
		let s = f.get(o);
		if (o.version !== s.__version || a === !0) {
			if (d.activeTexture(e.TEXTURE0 + r), !(typeof ImageBitmap < "u" && n.image instanceof ImageBitmap)) {
				let t = J.getPrimaries(J.workingColorSpace), r = n.colorSpace === "" ? null : J.getPrimaries(n.colorSpace), i = n.colorSpace === "" || t === r ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
				d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, n.flipY), d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, n.premultiplyAlpha), d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, i);
			}
			d.pixelStorei(e.UNPACK_ALIGNMENT, n.unpackAlignment);
			let t = D(n.image, !1, p.maxTextureSize);
			t = B(n, t);
			let c = m.convert(n.format, n.colorSpace), l = m.convert(n.type), u = ee(n.internalFormat, c, l, n.normalized, n.colorSpace, n.isVideoTexture);
			be(i, n);
			let f, h = n.mipmaps, g = n.isVideoTexture !== !0, _ = s.__version === void 0 || a === !0, v = o.dataReady, y = M(n, t);
			if (n.isDepthTexture) u = te(n.format === O, n.type), _ && (g ? d.texStorage2D(e.TEXTURE_2D, 1, u, t.width, t.height) : d.texImage2D(e.TEXTURE_2D, 0, u, t.width, t.height, 0, c, l, null));
			else if (n.isDataTexture) {
				if (h.length > 0) {
					g && _ && d.texStorage2D(e.TEXTURE_2D, y, u, h[0].width, h[0].height);
					for (let t = 0, n = h.length; t < n; t++) f = h[t], g ? v && d.texSubImage2D(e.TEXTURE_2D, t, 0, 0, f.width, f.height, c, l, f.data) : d.texImage2D(e.TEXTURE_2D, t, u, f.width, f.height, 0, c, l, f.data);
					n.generateMipmaps = !1;
				} else g ? (_ && d.texStorage2D(e.TEXTURE_2D, y, u, t.width, t.height), v && Ce(n, t, c, l)) : d.texImage2D(e.TEXTURE_2D, 0, u, t.width, t.height, 0, c, l, t.data);
			} else if (n.isCompressedTexture) {
				if (n.isCompressedArrayTexture) {
					g && _ && d.texStorage3D(e.TEXTURE_2D_ARRAY, y, u, h[0].width, h[0].height, t.depth);
					for (let r = 0, i = h.length; r < i; r++) if (f = h[r], n.format !== 1023) {
						if (c !== null) {
							if (g) {
								if (v) {
									if (n.layerUpdates.size > 0) {
										let t = Mo(f.width, f.height, n.format, n.type);
										for (let i of n.layerUpdates) {
											let n = f.data.subarray(i * t / f.data.BYTES_PER_ELEMENT, (i + 1) * t / f.data.BYTES_PER_ELEMENT);
											d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, r, 0, 0, i, f.width, f.height, 1, c, n);
										}
									} else d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, r, 0, 0, 0, f.width, f.height, t.depth, c, f.data);
								}
							} else d.compressedTexImage3D(e.TEXTURE_2D_ARRAY, r, u, f.width, f.height, t.depth, 0, f.data, 0, 0);
						} else H("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
					} else g ? v && d.texSubImage3D(e.TEXTURE_2D_ARRAY, r, 0, 0, 0, f.width, f.height, t.depth, c, l, f.data) : d.texImage3D(e.TEXTURE_2D_ARRAY, r, u, f.width, f.height, t.depth, 0, c, l, f.data);
					n.layerUpdates.size > 0 && n.clearLayerUpdates();
				} else {
					g && _ && d.texStorage2D(e.TEXTURE_2D, y, u, h[0].width, h[0].height);
					for (let t = 0, r = h.length; t < r; t++) f = h[t], n.format === 1023 ? g ? v && d.texSubImage2D(e.TEXTURE_2D, t, 0, 0, f.width, f.height, c, l, f.data) : d.texImage2D(e.TEXTURE_2D, t, u, f.width, f.height, 0, c, l, f.data) : c === null ? H("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : g ? v && d.compressedTexSubImage2D(e.TEXTURE_2D, t, 0, 0, f.width, f.height, c, f.data) : d.compressedTexImage2D(e.TEXTURE_2D, t, u, f.width, f.height, 0, f.data);
				}
			} else if (n.isDataArrayTexture) {
				if (g) {
					if (_ && d.texStorage3D(e.TEXTURE_2D_ARRAY, y, u, t.width, t.height, t.depth), v) {
						if (n.layerUpdates.size > 0) {
							let r = Mo(t.width, t.height, n.format, n.type);
							for (let i of n.layerUpdates) {
								let n = t.data.subarray(i * r / t.data.BYTES_PER_ELEMENT, (i + 1) * r / t.data.BYTES_PER_ELEMENT);
								d.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, i, t.width, t.height, 1, c, l, n);
							}
							n.clearLayerUpdates();
						} else d.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, 0, t.width, t.height, t.depth, c, l, t.data);
					}
				} else d.texImage3D(e.TEXTURE_2D_ARRAY, 0, u, t.width, t.height, t.depth, 0, c, l, t.data);
			} else if (n.isData3DTexture) g ? (_ && d.texStorage3D(e.TEXTURE_3D, y, u, t.width, t.height, t.depth), v && d.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, t.width, t.height, t.depth, c, l, t.data)) : d.texImage3D(e.TEXTURE_3D, 0, u, t.width, t.height, t.depth, 0, c, l, t.data);
			else if (n.isFramebufferTexture) {
				if (_) {
					if (g) d.texStorage2D(e.TEXTURE_2D, y, u, t.width, t.height);
					else {
						let n = t.width, r = t.height;
						for (let t = 0; t < y; t++) d.texImage2D(e.TEXTURE_2D, t, u, n, r, 0, c, l, null), n >>= 1, r >>= 1;
					}
				}
			} else if (n.isHTMLTexture) {
				if ("texElementImage2D" in e) {
					let r = e.canvas;
					if (r.hasAttribute("layoutsubtree") || r.setAttribute("layoutsubtree", "true"), t.parentNode !== r) {
						r.appendChild(t), b.add(n), r.onpaint = (e) => {
							let t = e.changedElements;
							for (let e of b) t.includes(e.image) && (e.needsUpdate = !0);
						}, r.requestPaint();
						return;
					}
					if (e.texElementImage2D.length === 3) e.texElementImage2D(e.TEXTURE_2D, e.RGBA8, t);
					else {
						let n = e.RGBA, r = e.RGBA, i = e.UNSIGNED_BYTE;
						e.texElementImage2D(e.TEXTURE_2D, 0, n, r, i, t);
					}
					e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
				}
			} else if (h.length > 0) {
				if (g && _) {
					let t = V(h[0]);
					d.texStorage2D(e.TEXTURE_2D, y, u, t.width, t.height);
				}
				for (let t = 0, n = h.length; t < n; t++) f = h[t], g ? v && d.texSubImage2D(e.TEXTURE_2D, t, 0, 0, c, l, f) : d.texImage2D(e.TEXTURE_2D, t, u, c, l, f);
				n.generateMipmaps = !1;
			} else if (g) {
				if (_) {
					let n = V(t);
					d.texStorage2D(e.TEXTURE_2D, y, u, n.width, n.height);
				}
				v && d.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, c, l, t);
			} else d.texImage2D(e.TEXTURE_2D, 0, u, c, l, t);
			k(n) && n.mipmapsAutoUpdate === !0 && A(i), s.__version = o.version, n.onUpdate && n.onUpdate(n);
		}
		t.__version = n.version;
	}
	function Te(t, n, r) {
		if (n.image.length !== 6) return;
		let i = xe(t, n), a = n.source;
		d.bindTexture(e.TEXTURE_CUBE_MAP, t.__webglTexture, e.TEXTURE0 + r);
		let o = f.get(a);
		if (a.version !== o.__version || i === !0) {
			d.activeTexture(e.TEXTURE0 + r);
			let t = J.getPrimaries(J.workingColorSpace), s = n.colorSpace === "" ? null : J.getPrimaries(n.colorSpace), c = n.colorSpace === "" || t === s ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
			d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, n.flipY), d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, n.premultiplyAlpha), d.pixelStorei(e.UNPACK_ALIGNMENT, n.unpackAlignment), d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, c);
			let l = n.isCompressedTexture || n.image[0].isCompressedTexture, u = n.image[0] && n.image[0].isDataTexture, f = [];
			for (let e = 0; e < 6; e++) !l && !u ? f[e] = D(n.image[e], !0, p.maxCubemapSize) : f[e] = u ? n.image[e].image : n.image[e], f[e] = B(n, f[e]);
			let h = f[0], g = m.convert(n.format, n.colorSpace), _ = m.convert(n.type), v = ee(n.internalFormat, g, _, n.normalized, n.colorSpace), y = n.isVideoTexture !== !0, b = o.__version === void 0 || i === !0, x = a.dataReady, S = M(n, h);
			be(e.TEXTURE_CUBE_MAP, n);
			let C;
			if (n.isDepthTexture) {
				if (v = te(n.format === O, n.type), b) {
					if (y) d.texStorage2D(e.TEXTURE_CUBE_MAP, 1, v, h.width, h.height);
					else for (let t = 0; t < 6; t++) d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, v, h.width, h.height, 0, g, _, null);
				}
			} else if (l) {
				y && b && d.texStorage2D(e.TEXTURE_CUBE_MAP, S, v, h.width, h.height);
				for (let t = 0; t < 6; t++) {
					C = f[t].mipmaps;
					for (let r = 0; r < C.length; r++) {
						let i = C[r];
						n.format === 1023 ? y ? x && d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, 0, 0, i.width, i.height, g, _, i.data) : d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, v, i.width, i.height, 0, g, _, i.data) : g === null ? H("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : y ? x && d.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, 0, 0, i.width, i.height, g, i.data) : d.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, v, i.width, i.height, 0, i.data);
					}
				}
			} else {
				if (C = n.mipmaps, y && b) {
					C.length > 0 && S++;
					let t = V(f[0]);
					d.texStorage2D(e.TEXTURE_CUBE_MAP, S, v, t.width, t.height);
				}
				for (let t = 0; t < 6; t++) if (u) {
					y ? x && d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, 0, 0, f[t].width, f[t].height, g, _, f[t].data) : d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, v, f[t].width, f[t].height, 0, g, _, f[t].data);
					for (let n = 0; n < C.length; n++) {
						let r = C[n].image[t].image;
						y ? x && d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, n + 1, 0, 0, r.width, r.height, g, _, r.data) : d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, n + 1, v, r.width, r.height, 0, g, _, r.data);
					}
				} else {
					y ? x && d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, 0, 0, g, _, f[t]) : d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, v, g, _, f[t]);
					for (let n = 0; n < C.length; n++) {
						let r = C[n];
						y ? x && d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, n + 1, 0, 0, g, _, r.image[t]) : d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, n + 1, v, g, _, r.image[t]);
					}
				}
			}
			k(n) && n.mipmapsAutoUpdate === !0 && A(e.TEXTURE_CUBE_MAP), o.__version = a.version, n.onUpdate && n.onUpdate(n);
		}
		t.__version = n.version;
	}
	function Ee(t, n, r, i, a, o) {
		let s = m.convert(r.format, r.colorSpace), c = m.convert(r.type), l = ee(r.internalFormat, s, c, r.normalized, r.colorSpace), u = f.get(n), p = f.get(r);
		if (p.__renderTarget = n, !u.__hasExternalTextures) {
			let t = Math.max(1, n.width >> o), r = Math.max(1, n.height >> o);
			a === e.TEXTURE_3D || a === e.TEXTURE_2D_ARRAY ? d.texImage3D(a, o, l, t, r, n.depth, 0, s, c, null) : d.texImage2D(a, o, l, t, r, 0, s, c, null);
		}
		d.bindFramebuffer(e.FRAMEBUFFER, t), z(n) ? g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, i, a, p.__webglTexture, 0, Pe(n)) : (a === e.TEXTURE_2D || a >= e.TEXTURE_CUBE_MAP_POSITIVE_X && a <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e.framebufferTexture2D(e.FRAMEBUFFER, i, a, p.__webglTexture, o), d.bindFramebuffer(e.FRAMEBUFFER, null);
	}
	function De(t, n, r) {
		if (e.bindRenderbuffer(e.RENDERBUFFER, t), n.depthBuffer) {
			let i = n.depthTexture, a = i && i.isDepthTexture ? i.type : null, o = te(n.stencilBuffer, a), s = n.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
			z(n) ? g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, Pe(n), o, n.width, n.height) : r ? e.renderbufferStorageMultisample(e.RENDERBUFFER, Pe(n), o, n.width, n.height) : e.renderbufferStorage(e.RENDERBUFFER, o, n.width, n.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, s, e.RENDERBUFFER, t);
		} else {
			let t = n.textures;
			for (let i = 0; i < t.length; i++) {
				let a = t[i], o = m.convert(a.format, a.colorSpace), s = m.convert(a.type), c = ee(a.internalFormat, o, s, a.normalized, a.colorSpace);
				z(n) ? g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, Pe(n), c, n.width, n.height) : r ? e.renderbufferStorageMultisample(e.RENDERBUFFER, Pe(n), c, n.width, n.height) : e.renderbufferStorage(e.RENDERBUFFER, c, n.width, n.height);
			}
		}
		e.bindRenderbuffer(e.RENDERBUFFER, null);
	}
	function Oe(t, n, r) {
		let i = n.isWebGLCubeRenderTarget === !0;
		if (d.bindFramebuffer(e.FRAMEBUFFER, t), !(n.depthTexture && n.depthTexture.isDepthTexture)) throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
		let a = f.get(n.depthTexture);
		a.__renderTarget = n;
		let o = i ? n.depthTexture.image[0] : n.depthTexture.image;
		a.__webglTexture && o.width === n.width && o.height === n.height || (o.width = n.width, o.height = n.height, n.depthTexture.needsUpdate = !0), i ? ge(n.depthTexture, 0) : pe(n.depthTexture, 0);
		let s = a.__webglTexture, c = Pe(n), l = i ? e.TEXTURE_CUBE_MAP_POSITIVE_X + r : e.TEXTURE_2D, u = n.depthTexture.format === 1027 ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
		if (n.depthTexture.format === 1026) z(n) ? g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, u, l, s, 0, c) : e.framebufferTexture2D(e.FRAMEBUFFER, u, l, s, 0);
		else if (n.depthTexture.format === 1027) z(n) ? g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, u, l, s, 0, c) : e.framebufferTexture2D(e.FRAMEBUFFER, u, l, s, 0);
		else throw Error("THREE.WebGLTextures: Unknown depthTexture format.");
	}
	function ke(t) {
		let n = f.get(t), r = t.isWebGLCubeRenderTarget === !0;
		if (n.__boundDepthTexture !== t.depthTexture) {
			let e = t.depthTexture;
			if (n.__depthDisposeCallback && n.__depthDisposeCallback(), e) {
				let t = () => {
					delete n.__boundDepthTexture, delete n.__depthDisposeCallback, e.removeEventListener("dispose", t);
				};
				e.addEventListener("dispose", t), n.__depthDisposeCallback = t;
			}
			n.__boundDepthTexture = e;
		}
		if (t.depthTexture && !n.__autoAllocateDepthBuffer) {
			if (r) for (let e = 0; e < 6; e++) Oe(n.__webglFramebuffer[e], t, e);
			else t.texture.mipmaps.length > 0 ? Oe(n.__webglFramebuffer[0], t, 0) : Oe(n.__webglFramebuffer, t, 0);
		} else if (r) {
			n.__webglDepthbuffer = [];
			for (let r = 0; r < 6; r++) if (d.bindFramebuffer(e.FRAMEBUFFER, n.__webglFramebuffer[r]), n.__webglDepthbuffer[r] === void 0) n.__webglDepthbuffer[r] = e.createRenderbuffer(), De(n.__webglDepthbuffer[r], t, !1);
			else {
				let i = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, a = n.__webglDepthbuffer[r];
				e.bindRenderbuffer(e.RENDERBUFFER, a), e.framebufferRenderbuffer(e.FRAMEBUFFER, i, e.RENDERBUFFER, a);
			}
		} else if (t.texture.mipmaps.length > 0 ? d.bindFramebuffer(e.FRAMEBUFFER, n.__webglFramebuffer[0]) : d.bindFramebuffer(e.FRAMEBUFFER, n.__webglFramebuffer), n.__webglDepthbuffer === void 0) n.__webglDepthbuffer = e.createRenderbuffer(), De(n.__webglDepthbuffer, t, !1);
		else {
			let r = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, i = n.__webglDepthbuffer;
			e.bindRenderbuffer(e.RENDERBUFFER, i), e.framebufferRenderbuffer(e.FRAMEBUFFER, r, e.RENDERBUFFER, i);
		}
		d.bindFramebuffer(e.FRAMEBUFFER, null);
	}
	function Ae(t, n, r) {
		let i = f.get(t);
		n !== void 0 && Ee(i.__webglFramebuffer, t, t.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, 0), r !== void 0 && ke(t);
	}
	function je(t) {
		let n = t.texture, r = f.get(t), i = f.get(n);
		t.addEventListener("dispose", I), N(t);
		let a = t.textures, o = t.isWebGLCubeRenderTarget === !0, s = a.length > 1;
		if (s || (i.__webglTexture === void 0 && (i.__webglTexture = e.createTexture()), i.__version = n.version, h.memory.textures++), o) {
			r.__webglFramebuffer = [];
			for (let t = 0; t < 6; t++) if (n.mipmaps.length > 0) {
				r.__webglFramebuffer[t] = [];
				for (let i = 0; i < n.mipmaps.length; i++) r.__webglFramebuffer[t][i] = e.createFramebuffer();
			} else r.__webglFramebuffer[t] = e.createFramebuffer();
		} else {
			if (n.mipmaps.length > 0) {
				r.__webglFramebuffer = [];
				for (let t = 0; t < n.mipmaps.length; t++) r.__webglFramebuffer[t] = e.createFramebuffer();
			} else r.__webglFramebuffer = e.createFramebuffer();
			if (s) for (let t = 0, n = a.length; t < n; t++) {
				let n = f.get(a[t]);
				n.__webglTexture === void 0 && (n.__webglTexture = e.createTexture(), h.memory.textures++);
			}
			if (t.samples > 0 && z(t) === !1) {
				r.__webglMultisampledFramebuffer = e.createFramebuffer(), r.__webglColorRenderbuffer = [], d.bindFramebuffer(e.FRAMEBUFFER, r.__webglMultisampledFramebuffer);
				for (let n = 0; n < a.length; n++) {
					let i = a[n];
					r.__webglColorRenderbuffer[n] = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, r.__webglColorRenderbuffer[n]);
					let o = m.convert(i.format, i.colorSpace), s = m.convert(i.type), c = ee(i.internalFormat, o, s, i.normalized, i.colorSpace, t.isXRRenderTarget === !0), l = Pe(t);
					e.renderbufferStorageMultisample(e.RENDERBUFFER, l, c, t.width, t.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + n, e.RENDERBUFFER, r.__webglColorRenderbuffer[n]);
				}
				e.bindRenderbuffer(e.RENDERBUFFER, null), t.depthBuffer && (r.__webglDepthRenderbuffer = e.createRenderbuffer(), De(r.__webglDepthRenderbuffer, t, !0)), d.bindFramebuffer(e.FRAMEBUFFER, null);
			}
		}
		if (o) {
			d.bindTexture(e.TEXTURE_CUBE_MAP, i.__webglTexture), be(e.TEXTURE_CUBE_MAP, n);
			for (let i = 0; i < 6; i++) if (n.mipmaps.length > 0) for (let a = 0; a < n.mipmaps.length; a++) Ee(r.__webglFramebuffer[i][a], t, n, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + i, a);
			else Ee(r.__webglFramebuffer[i], t, n, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0);
			k(n) ? A(e.TEXTURE_CUBE_MAP) : n.mipmaps.length > 0 && e.texParameteri(e.TEXTURE_CUBE_MAP, e.TEXTURE_MAX_LEVEL, n.mipmaps.length - 1), d.unbindTexture();
		} else if (s) {
			for (let n = 0, i = a.length; n < i; n++) {
				let i = a[n], o = f.get(i), s = e.TEXTURE_2D;
				(t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && (s = t.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), d.bindTexture(s, o.__webglTexture), be(s, i), Ee(r.__webglFramebuffer, t, i, e.COLOR_ATTACHMENT0 + n, s, 0), k(i) && A(s);
			}
			d.unbindTexture();
		} else {
			let a = e.TEXTURE_2D;
			if ((t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && (a = t.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), d.bindTexture(a, i.__webglTexture), be(a, n), n.mipmaps.length > 0) for (let i = 0; i < n.mipmaps.length; i++) Ee(r.__webglFramebuffer[i], t, n, e.COLOR_ATTACHMENT0, a, i);
			else Ee(r.__webglFramebuffer, t, n, e.COLOR_ATTACHMENT0, a, 0);
			k(n) ? A(a) : n.mipmaps.length > 0 && e.texParameteri(a, e.TEXTURE_MAX_LEVEL, n.mipmaps.length - 1), d.unbindTexture();
		}
		t.depthBuffer && ke(t);
	}
	function R(e) {
		let t = e.textures;
		for (let n = 0, r = t.length; n < r; n++) {
			let r = t[n];
			if (k(r) && r.mipmapsAutoUpdate === !0) {
				let t = j(e), n = f.get(r).__webglTexture;
				d.bindTexture(t, n), A(t), d.unbindTexture();
			}
		}
	}
	let Me = [];
	function Ne(t) {
		if (t.samples > 0) {
			if (z(t) === !1) {
				let n = t.textures, r = t.width, i = t.height, a = e.COLOR_BUFFER_BIT, o = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, s = f.get(t), c = n.length > 1;
				if (c) for (let t = 0; t < n.length; t++) d.bindFramebuffer(e.FRAMEBUFFER, s.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.RENDERBUFFER, null), d.bindFramebuffer(e.FRAMEBUFFER, s.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.TEXTURE_2D, null, 0);
				d.bindFramebuffer(e.READ_FRAMEBUFFER, s.__webglMultisampledFramebuffer), t.texture.mipmaps.length > 0 ? d.bindFramebuffer(e.DRAW_FRAMEBUFFER, s.__webglFramebuffer[0]) : d.bindFramebuffer(e.DRAW_FRAMEBUFFER, s.__webglFramebuffer);
				for (let l = 0; l < n.length; l++) {
					if (t.resolveDepthBuffer && (t.depthBuffer && (a |= e.DEPTH_BUFFER_BIT), t.stencilBuffer && t.resolveStencilBuffer && (a |= e.STENCIL_BUFFER_BIT)), c) {
						e.framebufferRenderbuffer(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, s.__webglColorRenderbuffer[l]);
						let t = f.get(n[l]).__webglTexture;
						e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t, 0);
					}
					e.blitFramebuffer(0, 0, r, i, 0, 0, r, i, a, e.NEAREST), _ === !0 && (Me.length = 0, Me.push(e.COLOR_ATTACHMENT0 + l), t.depthBuffer && t.storeMultisampledDepthBuffer === !1 && Me.push(o), e.invalidateFramebuffer(e.READ_FRAMEBUFFER, Me));
				}
				if (d.bindFramebuffer(e.READ_FRAMEBUFFER, null), d.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), c) for (let t = 0; t < n.length; t++) {
					d.bindFramebuffer(e.FRAMEBUFFER, s.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.RENDERBUFFER, s.__webglColorRenderbuffer[t]);
					let r = f.get(n[t]).__webglTexture;
					d.bindFramebuffer(e.FRAMEBUFFER, s.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.TEXTURE_2D, r, 0);
				}
				d.bindFramebuffer(e.DRAW_FRAMEBUFFER, s.__webglMultisampledFramebuffer);
			} else if (t.depthBuffer && t.storeMultisampledDepthBuffer === !1 && _) {
				let n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
				e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [n]);
			}
		}
	}
	function Pe(e) {
		return Math.min(p.maxSamples, e.samples);
	}
	function z(e) {
		let n = f.get(e);
		return e.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && n.__useRenderToTexture !== !1;
	}
	function Fe(e) {
		let t = h.render.frame;
		y.get(e) !== t && (y.set(e, t), e.update());
	}
	function B(e, t) {
		let n = e.colorSpace, r = e.format, i = e.type;
		return e.isCompressedTexture === !0 || e.isVideoTexture === !0 || n !== "srgb-linear" && n !== "" && (J.getTransfer(n) === "srgb" ? (r !== 1023 || i !== 1009) && H("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : U("WebGLTextures: Unsupported texture color space:", n)), t;
	}
	function V(e) {
		return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement ? (v.width = e.naturalWidth || e.width, v.height = e.naturalHeight || e.height) : typeof VideoFrame < "u" && e instanceof VideoFrame ? (v.width = e.displayWidth, v.height = e.displayHeight) : (v.width = e.width, v.height = e.height), v;
	}
	this.allocateTextureUnit = de, this.resetTextureUnits = ce, this.getTextureUnits = le, this.setTextureUnits = ue, this.setTexture2D = pe, this.setTexture2DArray = me, this.setTexture3D = he, this.setTextureCube = ge, this.rebindTextures = Ae, this.setupRenderTarget = je, this.updateRenderTargetMipmap = R, this.updateMultisampleRenderTarget = Ne, this.setupDepthRenderbuffer = ke, this.setupFrameBufferTexture = Ee, this.useMultisampledRTT = z, this.dispose = ie;
}
function jl(e, t) {
	function n(n, r = "") {
		let i, a = J.getTransfer(r);
		if (n === 1009) return e.UNSIGNED_BYTE;
		if (n === 1017) return e.UNSIGNED_SHORT_4_4_4_4;
		if (n === 1018) return e.UNSIGNED_SHORT_5_5_5_1;
		if (n === 35902) return e.UNSIGNED_INT_5_9_9_9_REV;
		if (n === 35899) return e.UNSIGNED_INT_10F_11F_11F_REV;
		if (n === 1010) return e.BYTE;
		if (n === 1011) return e.SHORT;
		if (n === 1012) return e.UNSIGNED_SHORT;
		if (n === 1013) return e.INT;
		if (n === 1014) return e.UNSIGNED_INT;
		if (n === 1015) return e.FLOAT;
		if (n === 1016) return e.HALF_FLOAT;
		if (n === 1021) return e.ALPHA;
		if (n === 1022) return e.RGB;
		if (n === 1023) return e.RGBA;
		if (n === 1026) return e.DEPTH_COMPONENT;
		if (n === 1027) return e.DEPTH_STENCIL;
		if (n === 1028) return e.RED;
		if (n === 1029) return e.RED_INTEGER;
		if (n === 1030) return e.RG;
		if (n === 1031) return e.RG_INTEGER;
		if (n === 1033) return e.RGBA_INTEGER;
		if (n === 33776 || n === 33777 || n === 33778 || n === 33779) {
			if (a === "srgb") {
				if (i = t.get("WEBGL_compressed_texture_s3tc_srgb"), i !== null) {
					if (n === 33776) return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;
					if (n === 33777) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
					if (n === 33778) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
					if (n === 33779) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
				} else return null;
			} else if (i = t.get("WEBGL_compressed_texture_s3tc"), i !== null) {
				if (n === 33776) return i.COMPRESSED_RGB_S3TC_DXT1_EXT;
				if (n === 33777) return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;
				if (n === 33778) return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;
				if (n === 33779) return i.COMPRESSED_RGBA_S3TC_DXT5_EXT;
			} else return null;
		}
		if (n === 35840 || n === 35841 || n === 35842 || n === 35843) {
			if (i = t.get("WEBGL_compressed_texture_pvrtc"), i !== null) {
				if (n === 35840) return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
				if (n === 35841) return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
				if (n === 35842) return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
				if (n === 35843) return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
			} else return null;
		}
		if (n === 36196 || n === 37492 || n === 37496 || n === 37488 || n === 37489 || n === 37490 || n === 37491) {
			if (i = t.get("WEBGL_compressed_texture_etc"), i !== null) {
				if (n === 36196 || n === 37492) return a === "srgb" ? i.COMPRESSED_SRGB8_ETC2 : i.COMPRESSED_RGB8_ETC2;
				if (n === 37496) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : i.COMPRESSED_RGBA8_ETC2_EAC;
				if (n === 37488) return i.COMPRESSED_R11_EAC;
				if (n === 37489) return i.COMPRESSED_SIGNED_R11_EAC;
				if (n === 37490) return i.COMPRESSED_RG11_EAC;
				if (n === 37491) return i.COMPRESSED_SIGNED_RG11_EAC;
			} else return null;
		}
		if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821) {
			if (i = t.get("WEBGL_compressed_texture_astc"), i !== null) {
				if (n === 37808) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : i.COMPRESSED_RGBA_ASTC_4x4_KHR;
				if (n === 37809) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : i.COMPRESSED_RGBA_ASTC_5x4_KHR;
				if (n === 37810) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : i.COMPRESSED_RGBA_ASTC_5x5_KHR;
				if (n === 37811) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : i.COMPRESSED_RGBA_ASTC_6x5_KHR;
				if (n === 37812) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : i.COMPRESSED_RGBA_ASTC_6x6_KHR;
				if (n === 37813) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : i.COMPRESSED_RGBA_ASTC_8x5_KHR;
				if (n === 37814) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : i.COMPRESSED_RGBA_ASTC_8x6_KHR;
				if (n === 37815) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : i.COMPRESSED_RGBA_ASTC_8x8_KHR;
				if (n === 37816) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : i.COMPRESSED_RGBA_ASTC_10x5_KHR;
				if (n === 37817) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : i.COMPRESSED_RGBA_ASTC_10x6_KHR;
				if (n === 37818) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : i.COMPRESSED_RGBA_ASTC_10x8_KHR;
				if (n === 37819) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : i.COMPRESSED_RGBA_ASTC_10x10_KHR;
				if (n === 37820) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : i.COMPRESSED_RGBA_ASTC_12x10_KHR;
				if (n === 37821) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : i.COMPRESSED_RGBA_ASTC_12x12_KHR;
			} else return null;
		}
		if (n === 36492 || n === 36494 || n === 36495) {
			if (i = t.get("EXT_texture_compression_bptc"), i !== null) {
				if (n === 36492) return a === "srgb" ? i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : i.COMPRESSED_RGBA_BPTC_UNORM_EXT;
				if (n === 36494) return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
				if (n === 36495) return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
			} else return null;
		}
		if (n === 36283 || n === 36284 || n === 36285 || n === 36286) {
			if (i = t.get("EXT_texture_compression_rgtc"), i !== null) {
				if (n === 36283) return i.COMPRESSED_RED_RGTC1_EXT;
				if (n === 36284) return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;
				if (n === 36285) return i.COMPRESSED_RED_GREEN_RGTC2_EXT;
				if (n === 36286) return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
			} else return null;
		}
		return n === 1020 ? e.UNSIGNED_INT_24_8 : e[n] === void 0 ? null : e[n];
	}
	return { convert: n };
}
var Ml = "\nvoid main() {\n\n	gl_Position = vec4( position, 1.0 );\n\n}", Nl = "\nuniform sampler2DArray depthColor;\nuniform float depthWidth;\nuniform float depthHeight;\n\nvoid main() {\n\n	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );\n\n	if ( coord.x >= 1.0 ) {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;\n\n	} else {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;\n\n	}\n\n}", Pl = class {
	constructor() {
		this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
	}
	init(e, t) {
		if (this.texture === null) {
			let n = new Qi(e.texture);
			(e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n;
		}
	}
	getMesh(e) {
		if (this.texture !== null && this.mesh === null) {
			let t = e.cameras[0].viewport, n = new va({
				vertexShader: Ml,
				fragmentShader: Nl,
				uniforms: {
					depthColor: { value: this.texture },
					depthWidth: { value: t.z },
					depthHeight: { value: t.w }
				}
			});
			this.mesh = new gi(new sa(20, 20), n);
		}
		return this.mesh;
	}
	reset() {
		this.texture = null, this.mesh = null;
	}
	getDepthTexture() {
		return this.texture;
	}
}, Fl = class extends $e {
	constructor(e, t) {
		super();
		let n = this, r = null, i = 1, a = null, o = "local-floor", s = 1, c = null, l = null, u = null, f = null, p = null, m = null, h = typeof XRWebGLBinding < "u", _ = new Pl(), v = {}, y = t.getContextAttributes(), b = null, S = null, C = [], w = [], T = new G(), k = null, A = null, j = new ro();
		j.viewport = new Wt();
		let ee = new ro();
		ee.viewport = new Wt();
		let te = [j, ee], M = new po(), N = null, P = null;
		this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(e) {
			let t = C[e];
			return t === void 0 && (t = new En(), C[e] = t), t.getTargetRaySpace();
		}, this.getControllerGrip = function(e) {
			let t = C[e];
			return t === void 0 && (t = new En(), C[e] = t), t.getGripSpace();
		}, this.getHand = function(e) {
			let t = C[e];
			return t === void 0 && (t = new En(), C[e] = t), t.getHandSpace();
		};
		function F(e) {
			let t = w.indexOf(e.inputSource);
			if (t === -1) return;
			let n = C[t];
			n !== void 0 && (n.update(e.inputSource, e.frame, c || a), n.dispatchEvent({
				type: e.type,
				data: e.inputSource
			}));
		}
		function I() {
			r.removeEventListener("select", F), r.removeEventListener("selectstart", F), r.removeEventListener("selectend", F), r.removeEventListener("squeeze", F), r.removeEventListener("squeezestart", F), r.removeEventListener("squeezeend", F), r.removeEventListener("end", I), r.removeEventListener("inputsourceschange", ne);
			for (let e = 0; e < C.length; e++) {
				let t = w[e];
				t !== null && (w[e] = null, C[e].disconnect(t));
			}
			N = null, P = null, _.reset();
			for (let e in v) delete v[e];
			if (e.setRenderTarget(b), p = null, f = null, u = null, r = null, S = null, L.stop(), n.isPresenting = !1, e.setPixelRatio(k), e.setSize(T.width, T.height, !1), A !== null) {
				let e = A.camera;
				e.fov = A.fov, e.zoom = A.zoom, e.updateProjectionMatrix(), A = null;
			}
			n.dispatchEvent({ type: "sessionend" });
		}
		this.setFramebufferScaleFactor = function(e) {
			i = e, n.isPresenting === !0 && H("WebXRManager: Cannot change framebuffer scale while presenting.");
		}, this.setReferenceSpaceType = function(e) {
			o = e, n.isPresenting === !0 && H("WebXRManager: Cannot change reference space type while presenting.");
		}, this.getReferenceSpace = function() {
			return c || a;
		}, this.setReferenceSpace = function(e) {
			c = e;
		}, this.getBaseLayer = function() {
			return f === null ? p : f;
		}, this.getBinding = function() {
			return u === null && h && (u = new XRWebGLBinding(r, t)), u;
		}, this.getFrame = function() {
			return m;
		}, this.getSession = function() {
			return r;
		}, this.setSession = async function(l) {
			if (r = l, r !== null) {
				if (b = e.getRenderTarget(), r.addEventListener("select", F), r.addEventListener("selectstart", F), r.addEventListener("selectend", F), r.addEventListener("squeeze", F), r.addEventListener("squeezestart", F), r.addEventListener("squeezeend", F), r.addEventListener("end", I), r.addEventListener("inputsourceschange", ne), y.xrCompatible !== !0 && await t.makeXRCompatible(), k = e.getPixelRatio(), e.getSize(T), h && "createProjectionLayer" in XRWebGLBinding.prototype) {
					let n = null, a = null, o = null;
					y.depth && (o = y.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, n = y.stencil ? O : D, a = y.stencil ? x : g);
					let s = {
						colorFormat: t.RGBA8,
						depthFormat: o,
						scaleFactor: i
					};
					u = this.getBinding(), f = u.createProjectionLayer(s), r.updateRenderState({ layers: [f] }), e.setPixelRatio(1), e.setSize(f.textureWidth, f.textureHeight, !1), S = new Kt(f.textureWidth, f.textureHeight, {
						format: E,
						type: d,
						depthTexture: new Xi(f.textureWidth, f.textureHeight, a, void 0, void 0, void 0, void 0, void 0, void 0, n),
						stencilBuffer: y.stencil,
						colorSpace: e.outputColorSpace,
						samples: y.antialias ? 4 : 0,
						resolveDepthBuffer: f.ignoreDepthValues === !1,
						resolveStencilBuffer: f.ignoreDepthValues === !1,
						storeMultisampledDepthBuffer: f.ignoreDepthValues === !1,
						storeMultisampledStencilBuffer: f.ignoreDepthValues === !1
					});
				} else {
					let n = {
						antialias: y.antialias,
						alpha: !0,
						depth: y.depth,
						stencil: y.stencil,
						framebufferScaleFactor: i
					};
					p = new XRWebGLLayer(r, t, n), r.updateRenderState({ baseLayer: p }), e.setPixelRatio(1), e.setSize(p.framebufferWidth, p.framebufferHeight, !1), S = new Kt(p.framebufferWidth, p.framebufferHeight, {
						format: E,
						type: d,
						colorSpace: e.outputColorSpace,
						stencilBuffer: y.stencil,
						resolveDepthBuffer: p.ignoreDepthValues === !1,
						resolveStencilBuffer: p.ignoreDepthValues === !1,
						storeMultisampledDepthBuffer: p.ignoreDepthValues === !1,
						storeMultisampledStencilBuffer: p.ignoreDepthValues === !1
					});
				}
				S.isXRRenderTarget = !0, this.setFoveation(s), c = null, a = await r.requestReferenceSpace(o), L.setContext(r), L.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
			}
		}, this.getEnvironmentBlendMode = function() {
			if (r !== null) return r.environmentBlendMode;
		}, this.getDepthTexture = function() {
			return _.getDepthTexture();
		};
		function ne(e) {
			for (let t = 0; t < e.removed.length; t++) {
				let n = e.removed[t], r = w.indexOf(n);
				r >= 0 && (w[r] = null, C[r].disconnect(n));
			}
			for (let t = 0; t < e.added.length; t++) {
				let n = e.added[t], r = w.indexOf(n);
				if (r === -1) {
					for (let e = 0; e < C.length; e++) if (e >= w.length) {
						w.push(n), r = e;
						break;
					} else if (w[e] === null) {
						w[e] = n, r = e;
						break;
					}
					if (r === -1) break;
				}
				let i = C[r];
				i && i.connect(n);
			}
		}
		function re(e, t) {
			t === null ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.copy(e.matrixWorld).invert();
		}
		this.updateCamera = function(e) {
			if (r === null) return;
			let t = e.near, n = e.far;
			_.texture !== null && (_.depthNear > 0 && (t = _.depthNear), _.depthFar > 0 && (n = _.depthFar)), M.near = ee.near = j.near = t, M.far = ee.far = j.far = n, (N !== M.near || P !== M.far) && (r.updateRenderState({
				depthNear: M.near,
				depthFar: M.far
			}), N = M.near, P = M.far), M.layers.mask = e.layers.mask | 6, j.layers.mask = M.layers.mask & -5, ee.layers.mask = M.layers.mask & -3;
			let i = e.parent, a = M.cameras;
			re(M, i);
			for (let e = 0; e < a.length; e++) re(a[e], i);
			M.projectionMatrix.copy(j.projectionMatrix), M.projectionMatrixInverse.copy(j.projectionMatrixInverse), A === null && e.isPerspectiveCamera && (A = {
				camera: e,
				fov: e.fov,
				zoom: e.zoom
			}), ie(e, M, i);
		};
		function ie(e, t, n) {
			n === null ? e.matrix.copy(t.matrixWorld) : (e.matrix.copy(n.matrixWorld), e.matrix.invert(), e.matrix.multiply(t.matrixWorld)), e.matrix.decompose(e.position, e.quaternion, e.scale), e.updateMatrixWorld(!0), e.projectionMatrix.copy(t.projectionMatrix), e.projectionMatrixInverse.copy(t.projectionMatrixInverse), e.isPerspectiveCamera && (e.fov = rt * 2 * Math.atan(1 / e.projectionMatrix.elements[5]), e.zoom = 1);
		}
		this.getCamera = function() {
			return M;
		}, this.getFoveation = function() {
			if (f !== null || p !== null) return s;
		}, this.setFoveation = function(e) {
			s = e, f !== null && (f.fixedFoveation = e), p !== null && p.fixedFoveation !== void 0 && (p.fixedFoveation = e);
		}, this.hasDepthSensing = function() {
			return _.texture !== null;
		}, this.getDepthSensingMesh = function() {
			return _.getMesh(M);
		}, this.getCameraTexture = function(e) {
			return v[e];
		};
		let ae = null;
		function oe(t, i) {
			if (l = i.getViewerPose(c || a), m = i, l !== null) {
				let t = l.views;
				p !== null && (e.setRenderTargetFramebuffer(S, p.framebuffer), e.setRenderTarget(S));
				let i = !1;
				t.length !== M.cameras.length && (M.cameras.length = 0, i = !0);
				for (let n = 0; n < t.length; n++) {
					let r = t[n], a = null;
					if (p !== null) a = p.getViewport(r);
					else {
						let t = u.getViewSubImage(f, r);
						a = t.viewport, n === 0 && (e.setRenderTargetTextures(S, t.colorTexture, t.depthStencilTexture), e.setRenderTarget(S));
					}
					let o = te[n];
					o === void 0 && (o = new ro(), o.layers.enable(n), o.viewport = new Wt(), te[n] = o), o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.quaternion, o.scale), o.projectionMatrix.fromArray(r.projectionMatrix), o.projectionMatrixInverse.copy(o.projectionMatrix).invert(), o.viewport.set(a.x, a.y, a.width, a.height), n === 0 && (M.matrix.copy(o.matrix), M.matrix.decompose(M.position, M.quaternion, M.scale)), i === !0 && M.cameras.push(o);
				}
				let a = r.enabledFeatures;
				if (a && a.includes("depth-sensing") && r.depthUsage == "gpu-optimized" && h) {
					u = n.getBinding();
					let e = u.getDepthInformation(t[0]);
					e && e.isValid && e.texture && _.init(e, r.renderState);
				}
				if (a && a.includes("camera-access") && h) {
					e.state.unbindTexture(), u = n.getBinding();
					for (let e = 0; e < t.length; e++) {
						let n = t[e].camera;
						if (n) {
							let e = v[n];
							e || (e = new Qi(), v[n] = e);
							let t = u.getCameraImage(n);
							e.sourceTexture = t;
						}
					}
				}
			}
			for (let e = 0; e < C.length; e++) {
				let t = w[e], n = C[e];
				t !== null && n !== void 0 && n.update(t, i, c || a);
			}
			ae && ae(t, i), i.detectedPlanes && n.dispatchEvent({
				type: "planesdetected",
				data: i
			}), m = null;
		}
		let L = new Po();
		L.setAnimationLoop(oe), this.setAnimationLoop = function(e) {
			ae = e;
		}, this.dispose = function() {};
	}
}, Il = /*@__PURE__*/ new Yt(), Ll = /*@__PURE__*/ new q();
Ll.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Rl(e, t) {
	function n(e, t) {
		e.matrixAutoUpdate === !0 && e.updateMatrix(), t.value.copy(e.matrix);
	}
	function r(t, n) {
		n.color.getRGB(t.fogColor.value, ma(e)), n.isFog ? (t.fogNear.value = n.near, t.fogFar.value = n.far) : n.isFogExp2 && (t.fogDensity.value = n.density);
	}
	function i(e, t, n, r, i) {
		t.isNodeMaterial ? t.uniformsNeedUpdate = !1 : t.isMeshBasicMaterial ? a(e, t) : t.isMeshLambertMaterial ? (a(e, t), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)) : t.isMeshToonMaterial ? (a(e, t), d(e, t)) : t.isMeshPhongMaterial ? (a(e, t), u(e, t), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)) : t.isMeshStandardMaterial ? (a(e, t), f(e, t), t.isMeshPhysicalMaterial && p(e, t, i)) : t.isMeshMatcapMaterial ? (a(e, t), m(e, t)) : t.isMeshDepthMaterial ? a(e, t) : t.isMeshDistanceMaterial ? (a(e, t), h(e, t)) : t.isMeshNormalMaterial ? a(e, t) : t.isLineBasicMaterial ? (o(e, t), t.isLineDashedMaterial && s(e, t)) : t.isPointsMaterial ? c(e, t, n, r) : t.isSpriteMaterial ? l(e, t) : t.isShadowMaterial ? (e.color.value.copy(t.color), e.opacity.value = t.opacity) : t.isShaderMaterial && (t.uniformsNeedUpdate = !1);
	}
	function a(e, r) {
		e.opacity.value = r.opacity, r.color && e.diffuse.value.copy(r.color), r.emissive && e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity), r.map && (e.map.value = r.map, n(r.map, e.mapTransform)), r.alphaMap && (e.alphaMap.value = r.alphaMap, n(r.alphaMap, e.alphaMapTransform)), r.bumpMap && (e.bumpMap.value = r.bumpMap, n(r.bumpMap, e.bumpMapTransform), e.bumpScale.value = r.bumpScale, r.side === 1 && (e.bumpScale.value *= -1)), r.normalMap && (e.normalMap.value = r.normalMap, n(r.normalMap, e.normalMapTransform), e.normalScale.value.copy(r.normalScale), r.side === 1 && e.normalScale.value.negate()), r.displacementMap && (e.displacementMap.value = r.displacementMap, n(r.displacementMap, e.displacementMapTransform), e.displacementScale.value = r.displacementScale, e.displacementBias.value = r.displacementBias), r.emissiveMap && (e.emissiveMap.value = r.emissiveMap, n(r.emissiveMap, e.emissiveMapTransform)), r.specularMap && (e.specularMap.value = r.specularMap, n(r.specularMap, e.specularMapTransform)), r.alphaTest > 0 && (e.alphaTest.value = r.alphaTest);
		let i = t.get(r), a = i.envMap, o = i.envMapRotation;
		a && (e.envMap.value = a, e.envMapRotation.value.setFromMatrix4(Il.makeRotationFromEuler(o)).transpose(), a.isCubeTexture && a.isRenderTargetTexture === !1 && e.envMapRotation.value.premultiply(Ll), e.reflectivity.value = r.reflectivity, e.ior.value = r.ior, e.refractionRatio.value = r.refractionRatio), r.lightMap && (e.lightMap.value = r.lightMap, e.lightMapIntensity.value = r.lightMapIntensity, n(r.lightMap, e.lightMapTransform)), r.aoMap && (e.aoMap.value = r.aoMap, e.aoMapIntensity.value = r.aoMapIntensity, n(r.aoMap, e.aoMapTransform));
	}
	function o(e, t) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, t.map && (e.map.value = t.map, n(t.map, e.mapTransform));
	}
	function s(e, t) {
		e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale;
	}
	function c(e, t, r, i) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.size.value = t.size * r, e.scale.value = i * .5, t.map && (e.map.value = t.map, n(t.map, e.uvTransform)), t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform)), t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
	}
	function l(e, t) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.rotation.value = t.rotation, t.map && (e.map.value = t.map, n(t.map, e.mapTransform)), t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform)), t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
	}
	function u(e, t) {
		e.specular.value.copy(t.specular), e.shininess.value = Math.max(t.shininess, 1e-4);
	}
	function d(e, t) {
		t.gradientMap && (e.gradientMap.value = t.gradientMap);
	}
	function f(e, t) {
		e.metalness.value = t.metalness, t.metalnessMap && (e.metalnessMap.value = t.metalnessMap, n(t.metalnessMap, e.metalnessMapTransform)), e.roughness.value = t.roughness, t.roughnessMap && (e.roughnessMap.value = t.roughnessMap, n(t.roughnessMap, e.roughnessMapTransform)), t.envMap && (e.envMapIntensity.value = t.envMapIntensity);
	}
	function p(e, t, r) {
		e.ior.value = t.ior, t.diffuseRoughness > 0 && (e.diffuseRoughness.value = t.diffuseRoughness, t.diffuseRoughnessMap && (e.diffuseRoughnessMap.value = t.diffuseRoughnessMap, n(t.diffuseRoughnessMap, e.diffuseRoughnessMapTransform))), t.sheen > 0 && (e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen), e.sheenRoughness.value = t.sheenRoughness, t.sheenColorMap && (e.sheenColorMap.value = t.sheenColorMap, n(t.sheenColorMap, e.sheenColorMapTransform)), t.sheenRoughnessMap && (e.sheenRoughnessMap.value = t.sheenRoughnessMap, n(t.sheenRoughnessMap, e.sheenRoughnessMapTransform))), t.clearcoat > 0 && (e.clearcoat.value = t.clearcoat, e.clearcoatRoughness.value = t.clearcoatRoughness, t.clearcoatMap && (e.clearcoatMap.value = t.clearcoatMap, n(t.clearcoatMap, e.clearcoatMapTransform)), t.clearcoatRoughnessMap && (e.clearcoatRoughnessMap.value = t.clearcoatRoughnessMap, n(t.clearcoatRoughnessMap, e.clearcoatRoughnessMapTransform)), t.clearcoatNormalMap && (e.clearcoatNormalMap.value = t.clearcoatNormalMap, n(t.clearcoatNormalMap, e.clearcoatNormalMapTransform), e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale), t.side === 1 && e.clearcoatNormalScale.value.negate())), t.dispersion > 0 && (e.dispersion.value = t.dispersion), t.retroreflectivity > 0 && (e.retroreflectivity.value = t.retroreflectivity), t.iridescence > 0 && (e.iridescence.value = t.iridescence, e.iridescenceIOR.value = t.iridescenceIOR, e.iridescenceThicknessMinimum.value = t.iridescenceThicknessMinimum, e.iridescenceThicknessMaximum.value = t.iridescenceThicknessMaximum, t.iridescenceMap && (e.iridescenceMap.value = t.iridescenceMap, n(t.iridescenceMap, e.iridescenceMapTransform)), t.iridescenceThicknessMap && (e.iridescenceThicknessMap.value = t.iridescenceThicknessMap, n(t.iridescenceThicknessMap, e.iridescenceThicknessMapTransform))), t.transmission > 0 && (e.transmission.value = t.transmission, e.transmissionSamplerMap.value = r.texture, e.transmissionSamplerSize.value.set(r.width, r.height), t.transmissionMap && (e.transmissionMap.value = t.transmissionMap, n(t.transmissionMap, e.transmissionMapTransform)), e.thickness.value = t.thickness, t.thicknessMap && (e.thicknessMap.value = t.thicknessMap, n(t.thicknessMap, e.thicknessMapTransform)), e.attenuationDistance.value = t.attenuationDistance, e.attenuationColor.value.copy(t.attenuationColor)), t.anisotropy > 0 && (e.anisotropyVector.value.set(t.anisotropy * Math.cos(t.anisotropyRotation), t.anisotropy * Math.sin(t.anisotropyRotation)), t.anisotropyMap && (e.anisotropyMap.value = t.anisotropyMap, n(t.anisotropyMap, e.anisotropyMapTransform))), e.specularIntensity.value = t.specularIntensity, e.specularColor.value.copy(t.specularColor), t.specularColorMap && (e.specularColorMap.value = t.specularColorMap, n(t.specularColorMap, e.specularColorMapTransform)), t.specularIntensityMap && (e.specularIntensityMap.value = t.specularIntensityMap, n(t.specularIntensityMap, e.specularIntensityMapTransform));
	}
	function m(e, t) {
		t.matcap && (e.matcap.value = t.matcap);
	}
	function h(e, n) {
		let r = t.get(n).light;
		e.referencePosition.value.setFromMatrixPosition(r.matrixWorld), e.nearDistance.value = r.shadow.camera.near, e.farDistance.value = r.shadow.camera.far;
	}
	return {
		refreshFogUniforms: r,
		refreshMaterialUniforms: i
	};
}
function zl(e, t, n, r) {
	let i = {}, a = {};
	function o(e, t) {
		let n = t.program;
		r.uniformBlockBinding(e, n, i[e.id]);
	}
	function s(e, n) {
		let o = i[e.id];
		o === void 0 && (m(e), o = c(e), i[e.id] = o, e.addEventListener("dispose", g));
		let s = n.program;
		r.updateUBOMapping(e, s);
		let u = t.render.frame;
		a[e.id] !== u && (l(e), a[e.id] = u);
	}
	function c(t) {
		let n = e.createBuffer(), r = t.__size, i = t.usage;
		return e.bindBuffer(e.UNIFORM_BUFFER, n), e.bufferData(e.UNIFORM_BUFFER, r, i), e.bindBuffer(e.UNIFORM_BUFFER, null), n;
	}
	function l(t) {
		let n = i[t.id], r = t.uniforms, a = t.__cache;
		e.bindBuffer(e.UNIFORM_BUFFER, n);
		for (let e = 0, t = r.length; e < t; e++) {
			let t = r[e];
			if (Array.isArray(t)) for (let n = 0, r = t.length; n < r; n++) u(t[n], e, n, a);
			else u(t, e, 0, a);
		}
		e.bindBuffer(e.UNIFORM_BUFFER, null);
	}
	function u(t, n, r, i) {
		if (f(t, n, r, i) === !0) {
			let n = t.__offset, r = t.value;
			if (Array.isArray(r)) {
				let e = 0;
				for (let n = 0; n < r.length; n++) {
					let i = r[n], a = h(i, !0);
					d(i, t.__data, e), e += a.storage / Float32Array.BYTES_PER_ELEMENT;
				}
			} else d(r, t.__data, 0);
			e.bufferSubData(e.UNIFORM_BUFFER, n, t.__data);
		}
	}
	function d(e, t, n) {
		typeof e == "number" || typeof e == "boolean" ? t[n] = e : e.isMatrix3 ? (t[n] = e.elements[0], t[n + 1] = e.elements[1], t[n + 2] = e.elements[2], t[n + 3] = 0, t[n + 4] = e.elements[3], t[n + 5] = e.elements[4], t[n + 6] = e.elements[5], t[n + 7] = 0, t[n + 8] = e.elements[6], t[n + 9] = e.elements[7], t[n + 10] = e.elements[8], t[n + 11] = 0) : ArrayBuffer.isView(e) ? t.set(e.subarray(0, t.length - n), n) : e.toArray(t, n);
	}
	function f(e, t, n, r) {
		let i = e.value, a = t + "_" + n;
		if (Array.isArray(i)) {
			r[a] === void 0 && (r[a] = []);
			let e = r[a], t = !1;
			for (let n = 0; n < i.length; n++) p(i[n], e, n) === !0 && (t = !0);
			return t;
		}
		return p(i, r, a);
	}
	function p(e, t, n) {
		if (t[n] === void 0) return t[n] = typeof e == "number" || typeof e == "boolean" ? e : ArrayBuffer.isView(e) ? e.slice() : e.clone(), !0;
		{
			let r = t[n];
			if (typeof e == "number" || typeof e == "boolean") {
				if (r !== e) return t[n] = e, !0;
			} else if (ArrayBuffer.isView(e)) return !0;
			else if (r.equals(e) === !1) return r.copy(e), !0;
		}
		return !1;
	}
	function m(e) {
		let t = e.uniforms, n = 0;
		for (let e = 0, r = t.length; e < r; e++) {
			let r = Array.isArray(t[e]) ? t[e] : [t[e]];
			for (let i = 0, a = r.length; i < a; i++) {
				let a = r[i], o = Array.isArray(a.value) ? a.value : [a.value], s = Array.isArray(t[e]) || Array.isArray(a.value), c = n;
				for (let e = 0, t = o.length; e < t; e++) {
					let t = o[e], r = h(t, s), i = n % 16, a = i % r.boundary, l = i + a;
					n += a, l !== 0 && 16 - l < r.storage && (n += 16 - l), e === 0 && (c = n), n += r.storage;
				}
				a.__data = new (a.type === "int" ? Int32Array : a.type === "uint" ? Uint32Array : Float32Array)((n - c) / Float32Array.BYTES_PER_ELEMENT), a.__offset = c;
			}
		}
		let r = n % 16;
		return r > 0 && (n += 16 - r), e.__size = n, e.__cache = {}, this;
	}
	function h(e, t) {
		let n = {
			boundary: 0,
			storage: 0
		};
		return typeof e == "number" || typeof e == "boolean" ? (n.boundary = 4, n.storage = 4) : e.isVector2 ? (n.boundary = 8, n.storage = 8) : e.isVector3 || e.isColor ? (n.boundary = 16, n.storage = 12) : e.isVector4 ? (n.boundary = 16, n.storage = 16) : e.isMatrix3 ? (n.boundary = 16, n.storage = 48) : e.isMatrix4 ? (n.boundary = 16, n.storage = 64) : e.isTexture ? H("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(e) ? (n.boundary = 16, n.storage = e.byteLength) : H("WebGLRenderer: Unsupported uniform value type.", e), t === !0 && (n.boundary = 16, n.storage = Math.ceil(n.storage / 16) * 16), n;
	}
	function g(t) {
		let n = t.target;
		n.removeEventListener("dispose", g), e.deleteBuffer(i[n.id]), delete i[n.id], delete a[n.id];
	}
	function _() {
		for (let t in i) e.deleteBuffer(i[t]);
		i = {}, a = {};
	}
	return {
		bind: o,
		update: s,
		dispose: _
	};
}
var Bl = new Uint16Array([
	12469,
	15057,
	12620,
	14925,
	13266,
	14620,
	13807,
	14376,
	14323,
	13990,
	14545,
	13625,
	14713,
	13328,
	14840,
	12882,
	14931,
	12528,
	14996,
	12233,
	15039,
	11829,
	15066,
	11525,
	15080,
	11295,
	15085,
	10976,
	15082,
	10705,
	15073,
	10495,
	13880,
	14564,
	13898,
	14542,
	13977,
	14430,
	14158,
	14124,
	14393,
	13732,
	14556,
	13410,
	14702,
	12996,
	14814,
	12596,
	14891,
	12291,
	14937,
	11834,
	14957,
	11489,
	14958,
	11194,
	14943,
	10803,
	14921,
	10506,
	14893,
	10278,
	14858,
	9960,
	14484,
	14039,
	14487,
	14025,
	14499,
	13941,
	14524,
	13740,
	14574,
	13468,
	14654,
	13106,
	14743,
	12678,
	14818,
	12344,
	14867,
	11893,
	14889,
	11509,
	14893,
	11180,
	14881,
	10751,
	14852,
	10428,
	14812,
	10128,
	14765,
	9754,
	14712,
	9466,
	14764,
	13480,
	14764,
	13475,
	14766,
	13440,
	14766,
	13347,
	14769,
	13070,
	14786,
	12713,
	14816,
	12387,
	14844,
	11957,
	14860,
	11549,
	14868,
	11215,
	14855,
	10751,
	14825,
	10403,
	14782,
	10044,
	14729,
	9651,
	14666,
	9352,
	14599,
	9029,
	14967,
	12835,
	14966,
	12831,
	14963,
	12804,
	14954,
	12723,
	14936,
	12564,
	14917,
	12347,
	14900,
	11958,
	14886,
	11569,
	14878,
	11247,
	14859,
	10765,
	14828,
	10401,
	14784,
	10011,
	14727,
	9600,
	14660,
	9289,
	14586,
	8893,
	14508,
	8533,
	15111,
	12234,
	15110,
	12234,
	15104,
	12216,
	15092,
	12156,
	15067,
	12010,
	15028,
	11776,
	14981,
	11500,
	14942,
	11205,
	14902,
	10752,
	14861,
	10393,
	14812,
	9991,
	14752,
	9570,
	14682,
	9252,
	14603,
	8808,
	14519,
	8445,
	14431,
	8145,
	15209,
	11449,
	15208,
	11451,
	15202,
	11451,
	15190,
	11438,
	15163,
	11384,
	15117,
	11274,
	15055,
	10979,
	14994,
	10648,
	14932,
	10343,
	14871,
	9936,
	14803,
	9532,
	14729,
	9218,
	14645,
	8742,
	14556,
	8381,
	14461,
	8020,
	14365,
	7603,
	15273,
	10603,
	15272,
	10607,
	15267,
	10619,
	15256,
	10631,
	15231,
	10614,
	15182,
	10535,
	15118,
	10389,
	15042,
	10167,
	14963,
	9787,
	14883,
	9447,
	14800,
	9115,
	14710,
	8665,
	14615,
	8318,
	14514,
	7911,
	14411,
	7507,
	14279,
	7198,
	15314,
	9675,
	15313,
	9683,
	15309,
	9712,
	15298,
	9759,
	15277,
	9797,
	15229,
	9773,
	15166,
	9668,
	15084,
	9487,
	14995,
	9274,
	14898,
	8910,
	14800,
	8539,
	14697,
	8234,
	14590,
	7790,
	14479,
	7409,
	14367,
	7067,
	14178,
	6621,
	15337,
	8619,
	15337,
	8631,
	15333,
	8677,
	15325,
	8769,
	15305,
	8871,
	15264,
	8940,
	15202,
	8909,
	15119,
	8775,
	15022,
	8565,
	14916,
	8328,
	14804,
	8009,
	14688,
	7614,
	14569,
	7287,
	14448,
	6888,
	14321,
	6483,
	14088,
	6171,
	15350,
	7402,
	15350,
	7419,
	15347,
	7480,
	15340,
	7613,
	15322,
	7804,
	15287,
	7973,
	15229,
	8057,
	15148,
	8012,
	15046,
	7846,
	14933,
	7611,
	14810,
	7357,
	14682,
	7069,
	14552,
	6656,
	14421,
	6316,
	14251,
	5948,
	14007,
	5528,
	15356,
	5942,
	15356,
	5977,
	15353,
	6119,
	15348,
	6294,
	15332,
	6551,
	15302,
	6824,
	15249,
	7044,
	15171,
	7122,
	15070,
	7050,
	14949,
	6861,
	14818,
	6611,
	14679,
	6349,
	14538,
	6067,
	14398,
	5651,
	14189,
	5311,
	13935,
	4958,
	15359,
	4123,
	15359,
	4153,
	15356,
	4296,
	15353,
	4646,
	15338,
	5160,
	15311,
	5508,
	15263,
	5829,
	15188,
	6042,
	15088,
	6094,
	14966,
	6001,
	14826,
	5796,
	14678,
	5543,
	14527,
	5287,
	14377,
	4985,
	14133,
	4586,
	13869,
	4257,
	15360,
	1563,
	15360,
	1642,
	15358,
	2076,
	15354,
	2636,
	15341,
	3350,
	15317,
	4019,
	15273,
	4429,
	15203,
	4732,
	15105,
	4911,
	14981,
	4932,
	14836,
	4818,
	14679,
	4621,
	14517,
	4386,
	14359,
	4156,
	14083,
	3795,
	13808,
	3437,
	15360,
	122,
	15360,
	137,
	15358,
	285,
	15355,
	636,
	15344,
	1274,
	15322,
	2177,
	15281,
	2765,
	15215,
	3223,
	15120,
	3451,
	14995,
	3569,
	14846,
	3567,
	14681,
	3466,
	14511,
	3305,
	14344,
	3121,
	14037,
	2800,
	13753,
	2467,
	15360,
	0,
	15360,
	1,
	15359,
	21,
	15355,
	89,
	15346,
	253,
	15325,
	479,
	15287,
	796,
	15225,
	1148,
	15133,
	1492,
	15008,
	1749,
	14856,
	1882,
	14685,
	1886,
	14506,
	1783,
	14324,
	1608,
	13996,
	1398,
	13702,
	1183
]), Vl = null;
function Hl() {
	return Vl === null && (Vl = new yi(Bl, 16, 16, j, v), Vl.name = "DFG_LUT", Vl.minFilter = c, Vl.magFilter = c, Vl.wrapS = r, Vl.wrapT = r, Vl.generateMipmaps = !1, Vl.needsUpdate = !0), Vl;
}
var Ul = class {
	constructor(e = {}) {
		let { canvas: t = Ke(), context: n = null, depth: r = !0, stencil: i = !1, alpha: a = !1, antialias: o = !1, premultipliedAlpha: s = !0, preserveDrawingBuffer: c = !1, powerPreference: l = "default", failIfMajorPerformanceCaveat: f = !1, reversedDepthBuffer: p = !1, outputBufferType: h = d } = e;
		this.isWebGLRenderer = !0;
		let _;
		if (n !== null) {
			if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext) throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
			_ = n.getContextAttributes().alpha;
		} else _ = a;
		let S = h, C = /* @__PURE__ */ new Set([
			te,
			ee,
			A
		]), w = /* @__PURE__ */ new Set([
			d,
			g,
			m,
			x,
			y,
			b
		]), T = /* @__PURE__ */ new Uint32Array(4), E = /* @__PURE__ */ new Int32Array(4), D = {
			textures: [],
			min: [],
			max: [],
			resolution: []
		}, O = null, k = null, j = [], M = [], N = null;
		this.domElement = t, this.debug = {
			checkShaderErrors: !0,
			diagnostics: { keywords: !1 },
			onShaderError: null
		}, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
		let P = this, F = !1, I = null, ne = null, re = null, ie = null;
		this._outputColorSpace = Ie;
		let ae = 0, oe = 0, L = null, se = -1, ce = null, le = new Wt(), ue = new Wt(), de = null, fe = new Y(0), pe = 0, me = t.width, he = t.height, ge = 1, _e = null, ve = null, ye = new Wt(0, 0, me, he), be = new Wt(0, 0, me, he), xe = !1, Se = new Mi(), Ce = new Pi(), we = !1, Te = !1, Ee = new Yt(), De = new K(), Oe = new Wt(), ke = {
			background: null,
			fog: null,
			environment: null,
			overrideMaterial: null,
			isScene: !0
		}, Ae = !1;
		function je() {
			return L === null ? ge : 1;
		}
		let R = n;
		function Me(e, n) {
			return t.getContext(e, n);
		}
		let Ne, Pe, z, Fe, B, V, Le, Re, ze, Be, Ve, Ue, We, Ge, qe, Ye, Xe, Qe, $e, et, tt, nt, rt;
		try {
			let e = {
				alpha: !0,
				depth: r,
				stencil: i,
				antialias: o,
				premultipliedAlpha: s,
				preserveDrawingBuffer: c,
				powerPreference: l,
				failIfMajorPerformanceCaveat: f
			};
			if ("setAttribute" in t && t.setAttribute("data-engine", "three.js r187"), t.addEventListener("webglcontextlost", at, !1), t.addEventListener("webglcontextrestored", ot, !1), t.addEventListener("webglcontextcreationerror", st, !1), R === null) {
				let t = "webgl2";
				if (R = Me(t, e), R === null) throw Me(t) ? Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.") : Error("THREE.WebGLRenderer: Error creating WebGL context.");
			}
			it();
		} catch (e) {
			throw t.removeEventListener("webglcontextlost", at, !1), t.removeEventListener("webglcontextrestored", ot, !1), t.removeEventListener("webglcontextcreationerror", st, !1), U("WebGLRenderer: " + e.message), e;
		}
		function it() {
			Ne = new ls(R), Ne.init(), tt = new jl(R, Ne), Pe = new Uo(R, Ne, e, tt), z = new kl(R, Ne), Pe.reversedDepthBuffer && p && z.buffers.depth.setReversed(!0), ne = R.createFramebuffer(), re = R.createFramebuffer(), ie = R.createFramebuffer(), Fe = new fs(R), B = new ll(), V = new Al(R, Ne, z, B, Pe, tt, Fe), Le = new cs(P), Re = new Fo(R), nt = new Vo(R, Re), ze = new us(R, Re, Fe, nt), Be = new ms(R, ze, Re, nt, Fe), Qe = new ps(R, Pe, V), qe = new Wo(B), Ve = new cl(P, Le, Ne, Pe, nt, qe), Ue = new Rl(P, B), We = new pl(), Ge = new bl(Ne), Xe = new Bo(P, Le, z, Be, _, s), Ye = new Ol(P, Be, Pe), rt = new zl(R, Fe, Pe, z), $e = new Ho(R, Ne, Fe), et = new ds(R, Ne, Fe), Fe.programs = Ve.programs, P.capabilities = Pe, P.extensions = Ne, P.properties = B, P.renderLists = We, P.shadowMap = Ye, P.state = z, P.info = Fe;
		}
		S !== 1009 && (N = new gs(S, t.width, t.height, o, r, i));
		let W = new Fl(P, R);
		this.xr = W, this.getContext = function() {
			return R;
		}, this.getContextAttributes = function() {
			return R.getContextAttributes();
		}, this.forceContextLoss = function() {
			let e = Ne.get("WEBGL_lose_context");
			e && e.loseContext();
		}, this.forceContextRestore = function() {
			let e = Ne.get("WEBGL_lose_context");
			e && e.restoreContext();
		}, this.getPixelRatio = function() {
			return ge;
		}, this.setPixelRatio = function(e) {
			e !== void 0 && (ge = e, this.setSize(me, he, !1));
		}, this.getSize = function(e) {
			return e.set(me, he);
		}, this.setSize = function(e, n, r = !0) {
			W.isPresenting ? H("WebGLRenderer: Can't change size while VR device is presenting.") : (me = e, he = n, t.width = Math.floor(e * ge), t.height = Math.floor(n * ge), r === !0 && (t.style.width = e + "px", t.style.height = n + "px"), N !== null && N.setSize(t.width, t.height), this.setViewport(0, 0, e, n));
		}, this.getDrawingBufferSize = function(e) {
			return e.set(me * ge, he * ge).floor();
		}, this.setDrawingBufferSize = function(e, n, r) {
			me = e, he = n, ge = r, t.width = Math.floor(e * r), t.height = Math.floor(n * r), this.setViewport(0, 0, e, n);
		}, this.setEffects = function(e) {
			if (S === 1009) U("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
			else {
				if (e) {
					for (let t = 0; t < e.length; t++) if (e[t].isOutputPass === !0) {
						H("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
						break;
					}
				}
				N.setEffects(e || []);
			}
		}, this.getCurrentViewport = function(e) {
			return e.copy(le);
		}, this.getViewport = function(e) {
			return e.copy(ye);
		}, this.setViewport = function(e, t, n, r) {
			e.isVector4 ? ye.set(e.x, e.y, e.z, e.w) : ye.set(e, t, n, r), z.viewport(le.copy(ye).multiplyScalar(je()).round());
		}, this.getScissor = function(e) {
			return e.copy(be);
		}, this.setScissor = function(e, t, n, r) {
			e.isVector4 ? be.set(e.x, e.y, e.z, e.w) : be.set(e, t, n, r), z.scissor(ue.copy(be).multiplyScalar(je()).round());
		}, this.getScissorTest = function() {
			return xe;
		}, this.setScissorTest = function(e) {
			z.setScissorTest(xe = e);
		}, this.setOpaqueSort = function(e) {
			_e = e;
		}, this.setTransparentSort = function(e) {
			ve = e;
		}, this.getClearColor = function(e) {
			return e.copy(Xe.getClearColor());
		}, this.setClearColor = function() {
			Xe.setClearColor(...arguments);
		}, this.getClearAlpha = function() {
			return Xe.getClearAlpha();
		}, this.setClearAlpha = function() {
			Xe.setClearAlpha(...arguments);
		}, this.clear = function(e = !0, t = !0, n = !0) {
			let r = 0;
			if (e) {
				let e = !1;
				if (L !== null) {
					let t = L.texture.format;
					e = C.has(t);
				}
				if (e) {
					let e = L.texture.type, t = w.has(e), n = Xe.getClearColor(), r = Xe.getClearAlpha(), i = n.r, a = n.g, o = n.b;
					t ? (T[0] = i, T[1] = a, T[2] = o, T[3] = r, R.clearBufferuiv(R.COLOR, 0, T)) : (E[0] = i, E[1] = a, E[2] = o, E[3] = r, R.clearBufferiv(R.COLOR, 0, E));
				} else r |= R.COLOR_BUFFER_BIT;
			}
			t && (r |= R.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), n && (r |= R.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), r !== 0 && R.clear(r);
		}, this.clearColor = function() {
			this.clear(!0, !1, !1);
		}, this.clearDepth = function() {
			this.clear(!1, !0, !1);
		}, this.clearStencil = function() {
			this.clear(!1, !1, !0);
		}, this.setNodesHandler = function(e) {
			e.setRenderer(this), I = e;
		}, this.dispose = function() {
			t.removeEventListener("webglcontextlost", at, !1), t.removeEventListener("webglcontextrestored", ot, !1), t.removeEventListener("webglcontextcreationerror", st, !1), Xe.dispose(), We.dispose(), Ge.dispose(), V.dispose(), B.dispose(), Le.dispose(), Be.dispose(), ze.dispose(), nt.dispose(), rt.dispose(), Ve.dispose(), W.dispose(), W.removeEventListener("sessionstart", mt), W.removeEventListener("sessionend", ht), gt.stop();
		};
		function at(e) {
			e.preventDefault(), Je("WebGLRenderer: Context Lost."), F = !0;
		}
		function ot() {
			Je("WebGLRenderer: Context Restored."), F = !1;
			let e = Fe.autoReset, t = Ye.enabled, n = Ye.autoUpdate, r = Ye.needsUpdate, i = Ye.type;
			it(), Fe.autoReset = e, Ye.enabled = t, Ye.autoUpdate = n, Ye.needsUpdate = r, Ye.type = i;
		}
		function st(e) {
			U("WebGLRenderer: A WebGL context could not be created. Reason: ", e.statusMessage);
		}
		function ct(e) {
			let t = e.target;
			t.removeEventListener("dispose", ct), lt(t);
		}
		function lt(e) {
			ut(e), B.remove(e);
		}
		function ut(e) {
			let t = B.get(e).programs;
			t !== void 0 && (t.forEach(function(e) {
				Ve.releaseProgram(e);
			}), e.isShaderMaterial && Ve.releaseShaderCache(e));
		}
		this.renderBufferDirect = function(e, t, n, r, i, a) {
			t === null && (t = ke);
			let o = i.isMesh && i.matrixWorld.determinantAffine() < 0, s = G(e, t, n, r, i);
			z.setMaterial(r, o);
			let c = n.index, l = 1;
			if (r.wireframe === !0) {
				if (c = ze.getWireframeAttribute(n), c === void 0) return;
				l = 2;
			}
			let u = n.drawRange, d = n.attributes.position, f = u.start * l, p = (u.start + u.count) * l;
			a !== null && (f = Math.max(f, a.start * l), p = Math.min(p, (a.start + a.count) * l)), c === null ? d != null && (f = Math.max(f, 0), p = Math.min(p, d.count)) : (f = Math.max(f, 0), p = Math.min(p, c.count));
			let m = p - f;
			if (m < 0 || m === Infinity) return;
			nt.setup(i, r, s, n, c);
			let h, g = $e;
			if (c !== null && (h = Re.get(c), g = et, g.setIndex(h)), i.isMesh) r.wireframe === !0 ? (z.setLineWidth(r.wireframeLinewidth * je()), g.setMode(R.LINES)) : g.setMode(R.TRIANGLES);
			else if (i.isLine) {
				let e = r.linewidth;
				e === void 0 && (e = 1), z.setLineWidth(e * je()), i.isLineSegments ? g.setMode(R.LINES) : i.isLineLoop ? g.setMode(R.LINE_LOOP) : g.setMode(R.LINE_STRIP);
			} else i.isPoints ? g.setMode(R.POINTS) : i.isSprite && g.setMode(R.TRIANGLES);
			if (i.isBatchedMesh) {
				if (Ne.get("WEBGL_multi_draw")) g.renderMultiDraw(i._multiDrawStarts, i._multiDrawCounts, i._multiDrawCount);
				else {
					let e = i._multiDrawStarts, t = i._multiDrawCounts, n = i._multiDrawCount, a = c ? Re.get(c).bytesPerElement : 1, o = B.get(r).currentProgram.getUniforms();
					for (let r = 0; r < n; r++) o.setValue(R, "_gl_DrawID", r), g.render(e[r] / a, t[r]);
				}
			} else if (i.isInstancedMesh) g.renderInstances(f, m, i.count);
			else if (n.isInstancedBufferGeometry) {
				let e = n._maxInstanceCount === void 0 ? Infinity : n._maxInstanceCount, t = Math.min(n.instanceCount, e);
				g.renderInstances(f, m, t);
			} else g.render(f, m);
		};
		function dt(e, t, n, r) {
			I !== null && e.isNodeMaterial && I.setObject(r, e), we === !0 && qe.setState(e, n, !1), e.transparent === !0 && e.side === 2 && e.forceSinglePass === !1 ? (e.side = 1, e.needsUpdate = !0, Ct(e, t, r), e.side = 0, e.needsUpdate = !0, Ct(e, t, r), e.side = 2) : Ct(e, t, r);
		}
		this.compile = function(e, t, n = null) {
			n === null && (n = e), I !== null && I.renderStart(e, t, n), k = Ge.get(n), k.init(t), M.push(k), n.traverseVisible(function(e) {
				e.isLight && e.layers.test(t.layers) && (k.pushLight(e), e.castShadow && k.pushShadow(e));
			}), e !== n && e.traverseVisible(function(e) {
				e.isLight && e.layers.test(t.layers) && (k.pushLight(e), e.castShadow && k.pushShadow(e));
			}), k.setupLights(), I !== null && I.updateLights(k.state.lightsArray), Te = this.localClippingEnabled, we = qe.init(this.clippingPlanes, Te), we === !0 && qe.setGlobalState(this.clippingPlanes, t), I !== null && Ye.render(k.state.shadowsArray, n, t);
			let r = /* @__PURE__ */ new Set();
			return e.traverse(function(e) {
				if (!(e.isMesh || e.isPoints || e.isLine || e.isSprite)) return;
				let i = e.material;
				if (i) {
					if (Array.isArray(i)) for (let a = 0; a < i.length; a++) {
						let o = i[a];
						dt(o, n, t, e), r.add(o);
					}
					else dt(i, n, t, e), r.add(i);
				}
			}), k = M.pop(), I !== null && I.renderEnd(), r;
		}, this.compileAsync = function(e, t, n = null) {
			let r = this.compile(e, t, n);
			return new Promise((t) => {
				function n() {
					r.forEach(function(e) {
						let t = B.get(e).currentProgram;
						(t === void 0 || t.isReady()) && r.delete(e);
					}), r.size === 0 ? t(e) : setTimeout(n, 10);
				}
				Ne.get("KHR_parallel_shader_compile") === null ? setTimeout(n, 10) : n();
			});
		};
		let ft = null;
		function pt(e) {
			ft && ft(e);
		}
		function mt() {
			gt.stop();
		}
		function ht() {
			gt.start();
		}
		let gt = new Po();
		gt.setAnimationLoop(pt), typeof self < "u" && gt.setContext(self), this.setAnimationLoop = function(e) {
			ft = e, W.setAnimationLoop(e), e === null ? gt.stop() : gt.start();
		}, W.addEventListener("sessionstart", mt), W.addEventListener("sessionend", ht), this.render = function(e, t) {
			if (t !== void 0 && t.isCamera !== !0) {
				U("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
				return;
			}
			if (F === !0) return;
			I !== null && I.renderStart(e, t);
			let n = W.enabled === !0 && W.isPresenting === !0, r = N !== null && (L === null || n) && N.begin(P, L);
			if (e.matrixWorldAutoUpdate === !0 && e.updateMatrixWorld(), t.parent === null && t.matrixWorldAutoUpdate === !0 && t.updateMatrixWorld(), W.enabled === !0 && W.isPresenting === !0 && (N === null || N.isCompositing() === !1) && (W.cameraAutoUpdate === !0 && W.updateCamera(t), t = W.getCamera()), e.isScene === !0 && e.onBeforeRender(P, e, t, L), k = Ge.get(e, M.length), k.init(t), k.state.textureUnits = V.getTextureUnits(), M.push(k), Ee.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), t.isArrayCamera ? Ce.setFromArrayCamera(t) : Se.setFromProjectionMatrix(Ee, He, t.reversedDepth), Te = this.localClippingEnabled, we = qe.init(this.clippingPlanes, Te), O = We.get(e, j.length), O.init(), j.push(O), this.info.render.frame++, W.enabled === !0 && W.isPresenting === !0) {
				let e = P.xr.getDepthSensingMesh();
				e !== null && _t(e, t, -Infinity, P.sortObjects);
			}
			_t(e, t, 0, P.sortObjects), O.finish(), I !== null && I.updateLights(k.state.lightsArray), P.sortObjects === !0 && O.sort(_e, ve), Ae = W.enabled === !1 || W.isPresenting === !1 || W.hasDepthSensing() === !1, Ae && Xe.addToRenderList(O, e), this.info.autoReset === !0 && this.info.reset(), we === !0 && qe.beginShadows();
			let i = k.state.shadowsArray;
			if (Ye.render(i, e, t), we === !0 && qe.endShadows(), (r && N.hasRenderPass()) === !1) {
				let n = O.opaque, r = O.transmissive;
				if (k.setupLights(), t.isArrayCamera) {
					let i = t.cameras;
					if (r.length > 0) for (let t = 0, a = i.length; t < a; t++) {
						let a = i[t];
						yt(n, r, e, a);
					}
					Ae && Xe.render(e);
					for (let t = 0, n = i.length; t < n; t++) {
						let n = i[t];
						vt(O, e, n, n.viewport);
					}
				} else r.length > 0 && yt(n, r, e, t), Ae && Xe.render(e), vt(O, e, t);
			}
			L !== null && oe === 0 && (V.updateMultisampleRenderTarget(L), V.updateRenderTargetMipmap(L)), r && N.end(P), e.isScene === !0 && e.onAfterRender(P, e, t), nt.resetDefaultState(), se = -1, ce = null, M.pop(), M.length > 0 ? (k = M[M.length - 1], V.setTextureUnits(k.state.textureUnits), we === !0 && qe.setGlobalState(P.clippingPlanes, k.state.camera)) : k = null, j.pop(), O = j.length > 0 ? j[j.length - 1] : null, I !== null && I.renderEnd();
		};
		function _t(e, t, n, r) {
			if (e.visible === !1) return;
			if (e.layers.test(t.layers)) {
				if (e.isGroup) n = e.renderOrder;
				else if (e.isLOD) e.autoUpdate === !0 && e.update(t);
				else if (e.isLight) k.pushLight(e), e.castShadow && k.pushShadow(e);
				else if (e.isSprite) {
					let i = t.isArrayCamera ? Ce : Se;
					if (!e.frustumCulled || e.intersectsFrustum(i)) {
						r && Oe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Ee);
						let i = Be.update(e), a = e.material;
						a.visible && O.push(e, i, a, n, Oe.z, null, t);
					}
				} else if (e.isMesh || e.isLine || e.isPoints) {
					let i = t.isArrayCamera ? Ce : Se;
					if (!e.frustumCulled || e.intersectsFrustum(i)) {
						let i = Be.update(e), a = e.material;
						if (r && (e.boundingSphere === void 0 ? (i.boundingSphere === null && i.computeBoundingSphere(), Oe.copy(i.boundingSphere.center)) : (e.boundingSphere === null && e.computeBoundingSphere(), Oe.copy(e.boundingSphere.center)), Oe.applyMatrix4(e.matrixWorld).applyMatrix4(Ee)), Array.isArray(a)) {
							let r = i.groups;
							for (let o = 0, s = r.length; o < s; o++) {
								let s = r[o], c = a[s.materialIndex];
								c && c.visible && O.push(e, i, c, n, Oe.z, s, t);
							}
						} else a.visible && O.push(e, i, a, n, Oe.z, null, t);
					}
				}
			}
			let i = e.children;
			for (let e = 0, a = i.length; e < a; e++) _t(i[e], t, n, r);
		}
		function vt(e, t, n, r) {
			let { opaque: i, transmissive: a, transparent: o } = e;
			k.setupLightsView(n), we === !0 && qe.setGlobalState(P.clippingPlanes, n), r && z.viewport(le.copy(r)), i.length > 0 && bt(i, t, n), a.length > 0 && bt(a, t, n), o.length > 0 && bt(o, t, n), z.buffers.depth.setTest(!0), z.buffers.depth.setMask(!0), z.buffers.color.setMask(!0), z.setPolygonOffset(!1);
		}
		function yt(e, t, n, r) {
			if ((n.isScene === !0 ? n.overrideMaterial : null) !== null) return;
			if (k.state.transmissionRenderTarget[r.id] === void 0) {
				let e = Ne.has("EXT_color_buffer_half_float") || Ne.has("EXT_color_buffer_float");
				k.state.transmissionRenderTarget[r.id] = new Kt(1, 1, {
					generateMipmaps: !0,
					type: e ? v : d,
					minFilter: u,
					samples: Math.max(4, Pe.samples),
					stencilBuffer: i,
					resolveDepthBuffer: !1,
					resolveStencilBuffer: !1,
					storeMultisampledDepthBuffer: !1,
					storeMultisampledStencilBuffer: !1,
					colorSpace: J.workingColorSpace
				});
			}
			let a = k.state.transmissionRenderTarget[r.id], o = r.viewport || le;
			a.setSize(o.z * P.transmissionResolutionScale, o.w * P.transmissionResolutionScale);
			let s = P.getRenderTarget(), c = P.getActiveCubeFace(), l = P.getActiveMipmapLevel();
			P.setRenderTarget(a), P.getClearColor(fe), pe = P.getClearAlpha(), pe < 1 && P.setClearColor(16777215, .5), P.clear(), Ae && Xe.render(n);
			let f = P.toneMapping;
			P.toneMapping = 0;
			let p = r.viewport;
			if (r.viewport !== void 0 && (r.viewport = void 0), k.setupLightsView(r), we === !0 && qe.setGlobalState(P.clippingPlanes, r), bt(e, n, r), V.updateMultisampleRenderTarget(a), V.updateRenderTargetMipmap(a), Ne.has("WEBGL_multisampled_render_to_texture") === !1) {
				let e = !1;
				for (let i = 0, a = t.length; i < a; i++) {
					let { object: a, geometry: o, material: s, group: c } = t[i];
					if (s.side === 2 && a.layers.test(r.layers)) {
						let t = s.side;
						s.side = 1, s.needsUpdate = !0, xt(a, n, r, o, s, c), s.side = t, s.needsUpdate = !0, e = !0;
					}
				}
				e === !0 && (V.updateMultisampleRenderTarget(a), V.updateRenderTargetMipmap(a));
			}
			P.setRenderTarget(s, c, l), P.setClearColor(fe, pe), p !== void 0 && (r.viewport = p), P.toneMapping = f;
		}
		function bt(e, t, n) {
			let r = t.isScene === !0 ? t.overrideMaterial : null;
			for (let i = 0, a = e.length; i < a; i++) {
				let a = e[i], { object: o, geometry: s, group: c } = a, l = a.material;
				l.allowOverride === !0 && r !== null && (l = r), o.layers.test(n.layers) && xt(o, t, n, s, l, c);
			}
		}
		function xt(e, t, n, r, i, a) {
			I !== null && i.isNodeMaterial && I.setObject(e, i), e.onBeforeRender(P, t, n, r, i, a), e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), i.onBeforeRender(P, t, n, r, e, a), i.transparent === !0 && i.side === 2 && i.forceSinglePass === !1 ? (i.side = 1, i.needsUpdate = !0, P.renderBufferDirect(n, t, r, i, e, a), i.side = 0, i.needsUpdate = !0, P.renderBufferDirect(n, t, r, i, e, a), i.side = 2) : P.renderBufferDirect(n, t, r, i, e, a), e.onAfterRender(P, t, n, r, i, a);
		}
		function St(e) {
			let t = 0;
			for (let n of e) n.texture !== null && t++;
			return t;
		}
		function Ct(e, t, n) {
			t.isScene !== !0 && (t = ke);
			let r = B.get(e), i = k.state.lights, a = k.state.shadowsArray, o = i.state.version, s = Ve.getParameters(e, i.state, a, t, n, k.state.lightProbeGridArray), c = Ve.getProgramCacheKey(s), l = r.programs;
			r.environment = e.isMeshStandardMaterial || e.isMeshLambertMaterial || e.isMeshPhongMaterial ? t.environment : null, r.fog = t.fog;
			let u = e.isMeshStandardMaterial || e.isMeshLambertMaterial && !e.envMap || e.isMeshPhongMaterial && !e.envMap;
			r.envMap = Le.get(e.envMap || r.environment, u), r.envMapRotation = r.environment !== null && e.envMap === null ? t.environmentRotation : e.envMapRotation, l === void 0 && (e.addEventListener("dispose", ct), l = /* @__PURE__ */ new Map(), r.programs = l, r.programVariants = /* @__PURE__ */ new Map());
			let d = l.get(c);
			if (d !== void 0) {
				if (r.currentProgram === d && r.lightsStateVersion === o) return Et(e, s), d;
			} else s.uniforms = Ve.getUniforms(e), I !== null && e.isNodeMaterial && I.build(e, n, s), e.onBeforeCompile(s, P), d = Ve.acquireProgram(s, c), l.set(c, d), r.uniforms = s.uniforms;
			let f = r.uniforms;
			return (!e.isShaderMaterial && !e.isRawShaderMaterial || e.clipping === !0) && (f.clippingPlanes = qe.uniform), Et(e, s), r.needsLights = Ot(e), r.lightsStateVersion = o, r.needsLights && (f.ambientLightColor.value = i.state.ambient, f.lightProbe.value = i.state.probe, f.sunLights.value = i.state.sun, f.sunLightShadows.value = i.state.sunShadow, f.directionalLights.value = i.state.directional, f.directionalLightShadows.value = i.state.directionalShadow, f.spotLights.value = i.state.spot, f.spotLightShadows.value = i.state.spotShadow, f.rectAreaLights.value = i.state.rectArea, f.ltc_1.value = i.state.rectAreaLTC1, f.ltc_2.value = i.state.rectAreaLTC2, f.pointLights.value = i.state.point, f.pointLightShadows.value = i.state.pointShadow, f.hemisphereLights.value = i.state.hemi, f.sunShadowMatrix.value = i.state.sunShadowMatrix, f.sunShadowCascade.value = i.state.sunShadowCascade, f.directionalShadowMatrix.value = i.state.directionalShadowMatrix, f.spotLightMatrix.value = i.state.spotLightMatrix, f.spotLightMap.value = i.state.spotLightMap, f.pointShadowMatrix.value = i.state.pointShadowMatrix), r.numLightProbeGrids = St(k.state.lightProbeGridArray), r.currentProgram = d, r.uniformsList = null, d;
		}
		function wt(e, t, n, r, i) {
			let a = B.get(e), o = a.currentProgram.id + "," + r + "," + i, s = a.programVariants.get(o);
			return s === void 0 ? (s = Ct(e, t, n), a.programVariants.set(o, s)) : (a.currentProgram = s, a.uniformsList = null, a.outputColorSpace = r, a.toneMapping = i), s;
		}
		function Tt(e) {
			if (e.uniformsList === null) {
				let t = e.currentProgram.getUniforms();
				e.uniformsList = Tc.seqWithValue(t.seq, e.uniforms);
			}
			return e.uniformsList;
		}
		function Et(e, t) {
			let n = B.get(e);
			n.outputColorSpace = t.outputColorSpace, n.batching = t.batching, n.batchingColor = t.batchingColor, n.instancing = t.instancing, n.instancingColor = t.instancingColor, n.instancingMorph = t.instancingMorph, n.skinning = t.skinning, n.morphTargets = t.morphTargets, n.morphNormals = t.morphNormals, n.morphColors = t.morphColors, n.morphTargetsCount = t.morphTargetsCount, n.numClippingPlanes = t.numClippingPlanes, n.numIntersection = t.numClipIntersection, n.vertexAlphas = t.vertexAlphas, n.vertexTangents = t.vertexTangents, n.toneMapping = t.toneMapping;
		}
		function G(e, t, n, r, i) {
			t.isScene !== !0 && (t = ke), V.resetTextureUnits();
			let a = t.fog, o = r.isMeshStandardMaterial || r.isMeshLambertMaterial || r.isMeshPhongMaterial ? t.environment : null, s = L === null ? P.outputColorSpace : L.isXRRenderTarget === !0 ? L.texture.colorSpace : J.workingColorSpace, c = r.isMeshStandardMaterial || r.isMeshLambertMaterial && !r.envMap || r.isMeshPhongMaterial && !r.envMap, l = Le.get(r.envMap || o, c), u = r.vertexColors === !0 && !!n.attributes.color && n.attributes.color.itemSize === 4, d = !!n.attributes.tangent && (!!r.normalMap || r.anisotropy > 0), f = !!n.morphAttributes.position, p = !!n.morphAttributes.normal, m = !!n.morphAttributes.color, h = 0;
			r.toneMapped && (L === null || L.isXRRenderTarget === !0) && (h = P.toneMapping);
			let g = n.morphAttributes.position || n.morphAttributes.normal || n.morphAttributes.color, _ = g === void 0 ? 0 : g.length, v = B.get(r), y = k.state.lights;
			if (we === !0 && (Te === !0 || e !== ce)) {
				let t = e === ce && r.id === se;
				qe.setState(r, e, t);
			}
			let b = !1, x = !1;
			r.version === v.__version ? v.needsLights && v.lightsStateVersion !== y.state.version || i.isBatchedMesh && v.batching === !1 || !i.isBatchedMesh && v.batching === !0 || i.isBatchedMesh && v.batchingColor === !0 && i._colorsTexture === null || i.isBatchedMesh && v.batchingColor === !1 && i._colorsTexture !== null || i.isInstancedMesh && v.instancing === !1 || !i.isInstancedMesh && v.instancing === !0 || i.isSkinnedMesh && v.skinning === !1 || !i.isSkinnedMesh && v.skinning === !0 || i.isInstancedMesh && v.instancingColor === !0 && i.instanceColor === null || i.isInstancedMesh && v.instancingColor === !1 && i.instanceColor !== null || i.isInstancedMesh && v.instancingMorph === !0 && i.morphTexture === null || i.isInstancedMesh && v.instancingMorph === !1 && i.morphTexture !== null ? b = !0 : v.envMap === l ? r.fog === !0 && v.fog !== a || v.numClippingPlanes !== void 0 && (v.numClippingPlanes !== qe.numPlanes || v.numIntersection !== qe.numIntersection) ? b = !0 : v.vertexAlphas === u && v.vertexTangents === d && v.morphTargets === f && v.morphNormals === p && v.morphColors === m && v.morphTargetsCount === _ && v.numLightProbeGrids === St(k.state.lightProbeGridArray) ? (v.outputColorSpace !== s || v.toneMapping !== h) && (x = !0) : b = !0 : b = !0 : (b = !0, v.__version = r.version);
			let S = v.currentProgram;
			(b === !0 || x === !0) && (S = x === !0 ? wt(r, t, i, s, h) : Ct(r, t, i), I && r.isNodeMaterial && I.onUpdateProgram(r, S, v));
			let C = !1, w = !1, T = !1, E = S.getUniforms(), O = v.uniforms;
			if (z.useProgram(S.program) && (C = !0, w = !0, T = !0), r.id !== se && (se = r.id, w = !0), C || ce !== e) {
				z.buffers.depth.getReversed() && e.reversedDepth !== !0 && (e._reversedDepth = !0, e.updateProjectionMatrix()), E.setValue(R, "projectionMatrix", e.projectionMatrix), E.setValue(R, "viewMatrix", e.matrixWorldInverse);
				let t = E.map.cameraPosition;
				t !== void 0 && t.setValue(R, De.setFromMatrixPosition(e.matrixWorld)), Pe.logarithmicDepthBuffer && E.setValue(R, "logDepthBufFC", 2 / (Math.log(e.far + 1) / Math.LN2)), (r.isMeshPhongMaterial || r.isMeshToonMaterial || r.isMeshLambertMaterial || r.isMeshBasicMaterial || r.isMeshStandardMaterial || r.isShaderMaterial) && E.setValue(R, "isOrthographic", e.isOrthographicCamera === !0), ce !== e && (ce = e, w = !0, T = !0);
			}
			if (v.needsLights && (y.state.sunShadowMap.length > 0 && E.setValue(R, "sunShadowMap", y.state.sunShadowMap, V), y.state.directionalShadowMap.length > 0 && E.setValue(R, "directionalShadowMap", y.state.directionalShadowMap, V), y.state.spotShadowMap.length > 0 && E.setValue(R, "spotShadowMap", y.state.spotShadowMap, V), y.state.pointShadowMap.length > 0 && E.setValue(R, "pointShadowMap", y.state.pointShadowMap, V)), i.isSkinnedMesh) {
				E.setOptional(R, i, "bindMatrix"), E.setOptional(R, i, "bindMatrixInverse");
				let e = i.skeleton;
				e && (e.boneTexture === null && e.computeBoneTexture(), E.setValue(R, "boneTexture", e.boneTexture, V));
			}
			i.isBatchedMesh && (E.setOptional(R, i, "batchingTexture"), E.setValue(R, "batchingTexture", i._matricesTexture, V), E.setOptional(R, i, "batchingIdTexture"), E.setValue(R, "batchingIdTexture", i._indirectTexture, V), E.setOptional(R, i, "batchingColorTexture"), i._colorsTexture !== null && E.setValue(R, "batchingColorTexture", i._colorsTexture, V));
			let A = n.morphAttributes;
			if ((A.position !== void 0 || A.normal !== void 0 || A.color !== void 0) && Qe.update(i, n, S), (w || v.receiveShadow !== i.receiveShadow) && (v.receiveShadow = i.receiveShadow, E.setValue(R, "receiveShadow", i.receiveShadow)), (r.isMeshStandardMaterial || r.isMeshLambertMaterial || r.isMeshPhongMaterial) && r.envMap === null && t.environment !== null && (O.envMapIntensity.value = t.environmentIntensity), O.dfgLUT !== void 0 && (O.dfgLUT.value = Hl()), w) {
				if (E.setValue(R, "toneMappingExposure", P.toneMappingExposure), v.needsLights && Dt(O, T), a && r.fog === !0 && Ue.refreshFogUniforms(O, a), Ue.refreshMaterialUniforms(O, r, ge, he, k.state.transmissionRenderTarget[e.id]), v.needsLights && v.numLightProbeGrids > 0) {
					let e = D, t = 0;
					for (let n of k.state.lightProbeGridArray) n.texture !== null && (e.textures[t] = n.texture, e.min[t] = n.boundingBox.min, e.max[t] = n.boundingBox.max, e.resolution[t] = n.resolution, t++);
					for (let n in e) e[n].length = t;
					O.probesSH.value = e.textures, O.probesMin.value = e.min, O.probesMax.value = e.max, O.probesResolution.value = e.resolution;
				}
				Tc.upload(R, Tt(v), O, V);
			}
			if (r.isShaderMaterial && r.uniformsNeedUpdate === !0 && (Tc.upload(R, Tt(v), O, V), r.uniformsNeedUpdate = !1), r.isSpriteMaterial && E.setValue(R, "center", i.center), E.setValue(R, "modelViewMatrix", i.modelViewMatrix), E.setValue(R, "normalMatrix", i.normalMatrix), E.setValue(R, "modelMatrix", i.matrixWorld), r.uniformsGroups !== void 0) {
				let e = r.uniformsGroups;
				for (let t = 0, n = e.length; t < n; t++) {
					let n = e[t];
					rt.update(n, S), rt.bind(n, S);
				}
			}
			return S;
		}
		function Dt(e, t) {
			e.ambientLightColor.needsUpdate = t, e.lightProbe.needsUpdate = t, e.sunLights.needsUpdate = t, e.sunLightShadows.needsUpdate = t, e.directionalLights.needsUpdate = t, e.directionalLightShadows.needsUpdate = t, e.pointLights.needsUpdate = t, e.pointLightShadows.needsUpdate = t, e.spotLights.needsUpdate = t, e.spotLightShadows.needsUpdate = t, e.rectAreaLights.needsUpdate = t, e.hemisphereLights.needsUpdate = t;
		}
		function Ot(e) {
			return e.isMeshLambertMaterial || e.isMeshToonMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isShadowMaterial || e.isShaderMaterial && e.lights === !0;
		}
		this.getActiveCubeFace = function() {
			return ae;
		}, this.getActiveMipmapLevel = function() {
			return oe;
		}, this.getRenderTarget = function() {
			return L;
		}, this.setRenderTargetTextures = function(e, t, n) {
			let r = B.get(e);
			r.__autoAllocateDepthBuffer = e.resolveDepthBuffer === !1, r.__autoAllocateDepthBuffer === !1 && (r.__useRenderToTexture = !1), B.get(e.texture).__webglTexture = t, B.get(e.depthTexture).__webglTexture = r.__autoAllocateDepthBuffer ? void 0 : n, r.__hasExternalTextures = !0;
		}, this.setRenderTargetFramebuffer = function(e, t) {
			let n = B.get(e);
			n.__webglFramebuffer = t, n.__useDefaultFramebuffer = t === void 0;
		}, this.setRenderTarget = function(e, t = 0, n = 0) {
			L = e, ae = t, oe = n;
			let r = null, i = !1, a = !1;
			if (e) {
				let o = B.get(e);
				if (o.__useDefaultFramebuffer !== void 0) {
					z.bindFramebuffer(R.FRAMEBUFFER, o.__webglFramebuffer), le.copy(e.viewport), ue.copy(e.scissor), de = e.scissorTest, z.viewport(le), z.scissor(ue), z.setScissorTest(de), se = -1;
					return;
				}
				if (o.__webglFramebuffer === void 0) V.setupRenderTarget(e);
				else if (o.__hasExternalTextures) V.rebindTextures(e, B.get(e.texture).__webglTexture, B.get(e.depthTexture).__webglTexture);
				else if (e.depthBuffer) {
					let t = e.depthTexture;
					if (o.__boundDepthTexture !== t) {
						if (t !== null && B.has(t) && (e.width !== t.image.width || e.height !== t.image.height)) throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
						V.setupDepthRenderbuffer(e);
					}
				}
				let s = e.texture;
				(s.isData3DTexture || s.isDataArrayTexture || s.isCompressedArrayTexture) && (a = !0);
				let c = B.get(e).__webglFramebuffer;
				e.isWebGLCubeRenderTarget ? (r = Array.isArray(c[t]) ? c[t][n] : c[t], i = !0) : r = e.samples > 0 && V.useMultisampledRTT(e) === !1 ? B.get(e).__webglMultisampledFramebuffer : Array.isArray(c) ? c[n] : c, le.copy(e.viewport), ue.copy(e.scissor), de = e.scissorTest;
			} else le.copy(ye).multiplyScalar(ge).floor(), ue.copy(be).multiplyScalar(ge).floor(), de = xe;
			if (n !== 0 && (r = ne), z.bindFramebuffer(R.FRAMEBUFFER, r) && z.drawBuffers(e, r), z.viewport(le), z.scissor(ue), z.setScissorTest(de), i) {
				let r = B.get(e.texture);
				R.framebufferTexture2D(R.FRAMEBUFFER, R.COLOR_ATTACHMENT0, R.TEXTURE_CUBE_MAP_POSITIVE_X + t, r.__webglTexture, n);
			} else if (a) {
				let r = t;
				for (let t = 0; t < e.textures.length; t++) {
					let i = B.get(e.textures[t]);
					R.framebufferTextureLayer(R.FRAMEBUFFER, R.COLOR_ATTACHMENT0 + t, i.__webglTexture, n, r);
				}
			} else if (e !== null && n !== 0) {
				let t = B.get(e.texture);
				R.framebufferTexture2D(R.FRAMEBUFFER, R.COLOR_ATTACHMENT0, R.TEXTURE_2D, t.__webglTexture, n);
			}
			se = -1;
		};
		function kt(e) {
			let t = B.get(e);
			return (t.__readFormat !== e.format || t.__readType !== e.type) && (t.__readFormat = e.format, t.__readType = e.type, t.__formatReadable = Pe.textureFormatReadable(e.format), t.__typeReadable = Pe.textureTypeReadable(e.type)), t;
		}
		this.readRenderTargetPixels = function(e, t, n, r, i, a, o, s = 0) {
			if (!(e && e.isWebGLRenderTarget)) {
				U("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
				return;
			}
			let c = B.get(e).__webglFramebuffer;
			if (e.isWebGLCubeRenderTarget && o !== void 0 && (c = c[o], Array.isArray(c) && (c = c[0])), c) {
				z.bindFramebuffer(R.FRAMEBUFFER, c);
				try {
					let o = e.textures[s], c = o.format, l = o.type;
					e.textures.length > 1 && R.readBuffer(R.COLOR_ATTACHMENT0 + s);
					let u = kt(o);
					if (u.__formatReadable === !1) {
						U("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
						return;
					}
					if (u.__typeReadable === !1) {
						U("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
						return;
					}
					t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i && R.readPixels(t, n, r, i, tt.convert(c), tt.convert(l), a);
				} finally {
					let e = L === null ? null : B.get(L).__webglFramebuffer;
					z.bindFramebuffer(R.FRAMEBUFFER, e);
				}
			}
		}, this.readRenderTargetPixelsAsync = async function(e, t, n, r, i, a, o, s = 0) {
			if (!(e && e.isWebGLRenderTarget)) throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
			let c = B.get(e).__webglFramebuffer;
			if (e.isWebGLCubeRenderTarget && o !== void 0 && (c = c[o], Array.isArray(c) && (c = c[0])), c) {
				if (t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i) {
					z.bindFramebuffer(R.FRAMEBUFFER, c);
					let o = e.textures[s], l = o.format, u = o.type;
					e.textures.length > 1 && R.readBuffer(R.COLOR_ATTACHMENT0 + s);
					let d = kt(o);
					if (d.__formatReadable === !1) throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
					if (d.__typeReadable === !1) throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
					let f = R.createBuffer();
					R.bindBuffer(R.PIXEL_PACK_BUFFER, f), R.bufferData(R.PIXEL_PACK_BUFFER, a.byteLength, R.STREAM_READ), R.readPixels(t, n, r, i, tt.convert(l), tt.convert(u), 0), R.bindBuffer(R.PIXEL_PACK_BUFFER, null);
					let p = L === null ? null : B.get(L).__webglFramebuffer;
					z.bindFramebuffer(R.FRAMEBUFFER, p);
					let m = R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE, 0);
					return R.flush(), await Ze(R, m, 4), R.bindBuffer(R.PIXEL_PACK_BUFFER, f), R.getBufferSubData(R.PIXEL_PACK_BUFFER, 0, a), R.bindBuffer(R.PIXEL_PACK_BUFFER, null), R.deleteBuffer(f), R.deleteSync(m), a;
				}
				throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
			}
		}, this.copyFramebufferToTexture = function(e, t = null, n = 0) {
			let r = 2 ** -n, i = Math.floor(e.image.width * r), a = Math.floor(e.image.height * r), o = t === null ? 0 : t.x, s = t === null ? 0 : t.y;
			V.setTexture2D(e, 0), R.copyTexSubImage2D(R.TEXTURE_2D, n, 0, 0, o, s, i, a), z.unbindTexture();
		}, this.copyTextureToTexture = function(e, t, n = null, r = null, i = 0, a = 0) {
			let o, s, c, l, u, d, f, p, m, h = e.isCompressedTexture ? e.mipmaps[a] : e.image;
			if (n !== null) o = n.max.x - n.min.x, s = n.max.y - n.min.y, c = n.isBox3 ? n.max.z - n.min.z : 1, l = n.min.x, u = n.min.y, d = n.isBox3 ? n.min.z : 0;
			else {
				let t = 2 ** -i;
				o = Math.floor(h.width * t), s = Math.floor(h.height * t), c = e.isDataArrayTexture ? h.depth : e.isData3DTexture ? Math.floor(h.depth * t) : 1, l = 0, u = 0, d = 0;
			}
			r === null ? (f = 0, p = 0, m = 0) : (f = r.x, p = r.y, m = r.z);
			let g = tt.convert(t.format), _ = tt.convert(t.type), v;
			t.isData3DTexture ? (V.setTexture3D(t, 0), v = R.TEXTURE_3D) : t.isDataArrayTexture || t.isCompressedArrayTexture ? (V.setTexture2DArray(t, 0), v = R.TEXTURE_2D_ARRAY) : (V.setTexture2D(t, 0), v = R.TEXTURE_2D), z.activeTexture(R.TEXTURE0), z.pixelStorei(R.UNPACK_FLIP_Y_WEBGL, t.flipY), z.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha), z.pixelStorei(R.UNPACK_ALIGNMENT, t.unpackAlignment);
			let y = z.getParameter(R.UNPACK_ROW_LENGTH), b = z.getParameter(R.UNPACK_IMAGE_HEIGHT), x = z.getParameter(R.UNPACK_SKIP_PIXELS), S = z.getParameter(R.UNPACK_SKIP_ROWS), C = z.getParameter(R.UNPACK_SKIP_IMAGES);
			z.pixelStorei(R.UNPACK_ROW_LENGTH, h.width), z.pixelStorei(R.UNPACK_IMAGE_HEIGHT, h.height), z.pixelStorei(R.UNPACK_SKIP_PIXELS, l), z.pixelStorei(R.UNPACK_SKIP_ROWS, u), z.pixelStorei(R.UNPACK_SKIP_IMAGES, d);
			let w = e.isDataArrayTexture || e.isData3DTexture, T = t.isDataArrayTexture || t.isData3DTexture;
			if (e.isDepthTexture) {
				let n = B.get(e), r = B.get(t), h = B.get(n.__renderTarget), g = B.get(r.__renderTarget);
				z.bindFramebuffer(R.READ_FRAMEBUFFER, h.__webglFramebuffer), z.bindFramebuffer(R.DRAW_FRAMEBUFFER, g.__webglFramebuffer);
				for (let n = 0; n < c; n++) w && (R.framebufferTextureLayer(R.READ_FRAMEBUFFER, R.COLOR_ATTACHMENT0, B.get(e).__webglTexture, i, d + n), R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER, R.COLOR_ATTACHMENT0, B.get(t).__webglTexture, a, m + n)), R.blitFramebuffer(l, u, l + o, u + s, f, p, f + o, p + s, R.DEPTH_BUFFER_BIT, R.NEAREST);
				z.bindFramebuffer(R.READ_FRAMEBUFFER, null), z.bindFramebuffer(R.DRAW_FRAMEBUFFER, null);
			} else if (i !== 0 || e.isRenderTargetTexture || B.has(e)) {
				let n = B.get(e), r = B.get(t);
				z.bindFramebuffer(R.READ_FRAMEBUFFER, re), z.bindFramebuffer(R.DRAW_FRAMEBUFFER, ie);
				for (let e = 0; e < c; e++) w ? R.framebufferTextureLayer(R.READ_FRAMEBUFFER, R.COLOR_ATTACHMENT0, n.__webglTexture, i, d + e) : R.framebufferTexture2D(R.READ_FRAMEBUFFER, R.COLOR_ATTACHMENT0, R.TEXTURE_2D, n.__webglTexture, i), T ? R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER, R.COLOR_ATTACHMENT0, r.__webglTexture, a, m + e) : R.framebufferTexture2D(R.DRAW_FRAMEBUFFER, R.COLOR_ATTACHMENT0, R.TEXTURE_2D, r.__webglTexture, a), i === 0 ? T ? R.copyTexSubImage3D(v, a, f, p, m + e, l, u, o, s) : R.copyTexSubImage2D(v, a, f, p, l, u, o, s) : R.blitFramebuffer(l, u, l + o, u + s, f, p, f + o, p + s, R.COLOR_BUFFER_BIT, R.NEAREST);
				z.bindFramebuffer(R.READ_FRAMEBUFFER, null), z.bindFramebuffer(R.DRAW_FRAMEBUFFER, null);
			} else T ? e.isDataTexture || e.isData3DTexture ? R.texSubImage3D(v, a, f, p, m, o, s, c, g, _, h.data) : t.isCompressedArrayTexture ? R.compressedTexSubImage3D(v, a, f, p, m, o, s, c, g, h.data) : R.texSubImage3D(v, a, f, p, m, o, s, c, g, _, h) : e.isDataTexture ? R.texSubImage2D(R.TEXTURE_2D, a, f, p, o, s, g, _, h.data) : e.isCompressedTexture ? R.compressedTexSubImage2D(R.TEXTURE_2D, a, f, p, h.width, h.height, g, h.data) : R.texSubImage2D(R.TEXTURE_2D, a, f, p, o, s, g, _, h);
			z.pixelStorei(R.UNPACK_ROW_LENGTH, y), z.pixelStorei(R.UNPACK_IMAGE_HEIGHT, b), z.pixelStorei(R.UNPACK_SKIP_PIXELS, x), z.pixelStorei(R.UNPACK_SKIP_ROWS, S), z.pixelStorei(R.UNPACK_SKIP_IMAGES, C), a === 0 && t.generateMipmaps === !0 && t.mipmapsAutoUpdate === !0 && R.generateMipmap(v), z.unbindTexture();
		}, this.initRenderTarget = function(e) {
			B.get(e).__webglFramebuffer === void 0 && V.setupRenderTarget(e);
		}, this.initTexture = function(e) {
			e.isCubeTexture ? V.setTextureCube(e, 0) : e.isData3DTexture ? V.setTexture3D(e, 0) : e.isDataArrayTexture || e.isCompressedArrayTexture ? V.setTexture2DArray(e, 0) : V.setTexture2D(e, 0), z.unbindTexture();
		}, this.resetState = function() {
			ae = 0, oe = 0, L = null, z.reset(), nt.reset();
		}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	get coordinateSystem() {
		return He;
	}
	get outputColorSpace() {
		return this._outputColorSpace;
	}
	set outputColorSpace(e) {
		this._outputColorSpace = e;
		let t = this.getContext();
		t.drawingBufferColorSpace = J._getDrawingBufferColorSpace(e), t.unpackColorSpace = J._getUnpackColorSpace();
	}
}, Wl = { type: "change" }, Gl = { type: "start" }, Kl = { type: "end" }, ql = new ri(), Jl = new Pr(), Yl = Math.cos(70 * Et.DEG2RAD), Xl = new K(), Zl = 2 * Math.PI, Q = {
	NONE: -1,
	ROTATE: 0,
	DOLLY: 1,
	PAN: 2,
	TOUCH_ROTATE: 3,
	TOUCH_PAN: 4,
	TOUCH_DOLLY_PAN: 5,
	TOUCH_DOLLY_ROTATE: 6
}, Ql = 1e-6, $l = class extends jo {
	constructor(n, r = null) {
		super(n, r), this.state = Q.NONE, this.target = new K(), this.cursor = new K(), this.minDistance = 0, this.maxDistance = Infinity, this.minZoom = 0, this.maxZoom = Infinity, this.minTargetRadius = 0, this.maxTargetRadius = Infinity, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -Infinity, this.maxAzimuthAngle = Infinity, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
			LEFT: "ArrowLeft",
			UP: "ArrowUp",
			RIGHT: "ArrowRight",
			BOTTOM: "ArrowDown"
		}, this.mouseButtons = {
			LEFT: e.ROTATE,
			MIDDLE: e.DOLLY,
			RIGHT: e.PAN
		}, this.touches = {
			ONE: t.ROTATE,
			TWO: t.DOLLY_PAN
		}, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._cursorStyle = "auto", this._domElementKeyEvents = null, this._lastPosition = new K(), this._lastQuaternion = new Dt(), this._lastTargetPosition = new K(), this._quat = new Dt().setFromUnitVectors(n.up, new K(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Ao(), this._sphericalDelta = new Ao(), this._scale = 1, this._panOffset = new K(), this._rotateStart = new G(), this._rotateEnd = new G(), this._rotateDelta = new G(), this._panStart = new G(), this._panEnd = new G(), this._panDelta = new G(), this._dollyStart = new G(), this._dollyEnd = new G(), this._dollyDelta = new G(), this._dollyDirection = new K(), this._mouse = new G(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = tu.bind(this), this._onPointerDown = eu.bind(this), this._onPointerUp = nu.bind(this), this._onContextMenu = lu.bind(this), this._onMouseWheel = au.bind(this), this._onKeyDown = ou.bind(this), this._onTouchStart = su.bind(this), this._onTouchMove = cu.bind(this), this._onMouseDown = ru.bind(this), this._onMouseMove = iu.bind(this), this._interceptControlDown = uu.bind(this), this._interceptControlUp = du.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
	}
	set cursorStyle(e) {
		this._cursorStyle = e, e === "grab" ? this.domElement.style.cursor = "grab" : this.domElement.style.cursor = "auto";
	}
	get cursorStyle() {
		return this._cursorStyle;
	}
	connect(e) {
		super.connect(e), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.ownerDocument.addEventListener("keydown", this._interceptControlDown, {
			passive: !0,
			capture: !0
		}), this.domElement.style.touchAction = "none";
	}
	disconnect() {
		this.state = Q.NONE, this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.ownerDocument.removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.ownerDocument.removeEventListener("keyup", this._interceptControlUp, { capture: !0 }), this._controlActive = !1, this._pointers.length = 0, this._pointerPositions = {}, this.domElement.style.touchAction = "", this.domElement.style.cursor = "auto";
	}
	dispose() {
		this.disconnect();
	}
	getPolarAngle() {
		return this._spherical.phi;
	}
	getAzimuthalAngle() {
		return this._spherical.theta;
	}
	getDistance() {
		return this.object.position.distanceTo(this.target);
	}
	listenToKeyEvents(e) {
		e.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = e;
	}
	stopListenToKeyEvents() {
		this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
	}
	saveState() {
		this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
	}
	reset() {
		this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Wl), this.update(), this.state = Q.NONE;
	}
	pan(e, t) {
		this._pan(e, t), this.update();
	}
	dollyIn(e) {
		this._dollyIn(e), this.update();
	}
	dollyOut(e) {
		this._dollyOut(e), this.update();
	}
	rotateLeft(e) {
		this._rotateLeft(e), this.update();
	}
	rotateUp(e) {
		this._rotateUp(e), this.update();
	}
	update(e = null) {
		let t = this.object.position;
		Xl.copy(t).sub(this.target), Xl.applyQuaternion(this._quat), this._spherical.setFromVector3(Xl), this.autoRotate && this.state === Q.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
		let n = this.minAzimuthAngle, r = this.maxAzimuthAngle;
		isFinite(n) && isFinite(r) && (n < -Math.PI ? n += Zl : n > Math.PI && (n -= Zl), r < -Math.PI ? r += Zl : r > Math.PI && (r -= Zl), n <= r ? this._spherical.theta = Math.max(n, Math.min(r, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + r) / 2 ? Math.max(n, this._spherical.theta) : Math.min(r, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
		let i = !1;
		if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
		else {
			let e = this._spherical.radius;
			this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), i = e != this._spherical.radius;
		}
		if (Xl.setFromSpherical(this._spherical), Xl.applyQuaternion(this._quatInverse), t.copy(this.target).add(Xl), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
			let e = null;
			if (this.object.isPerspectiveCamera) {
				let t = Xl.length();
				e = this._clampDistance(t * this._scale);
				let n = t - e;
				this.object.position.addScaledVector(this._dollyDirection, n), this.object.updateMatrixWorld(), i = !!n;
			} else if (this.object.isOrthographicCamera) {
				let t = new K(this._mouse.x, this._mouse.y, 0);
				t.unproject(this.object);
				let n = this.object.zoom;
				this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), i = n !== this.object.zoom;
				let r = new K(this._mouse.x, this._mouse.y, 0);
				r.unproject(this.object), this.object.position.sub(r).add(t), this.object.updateMatrixWorld(), e = Xl.length();
			} else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
			e !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position) : (ql.origin.copy(this.object.position), ql.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(ql.direction)) < Yl ? this.object.lookAt(this.target) : (Jl.setFromNormalAndCoplanarPoint(this.object.up, this.target), ql.intersectPlane(Jl, this.target))));
		} else if (this.object.isOrthographicCamera) {
			let e = this.object.zoom;
			this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), e !== this.object.zoom && (this.object.updateProjectionMatrix(), i = !0);
		}
		return this._scale = 1, this._performCursorZoom = !1, i || this._lastPosition.distanceToSquared(this.object.position) > Ql || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Ql || this._lastTargetPosition.distanceToSquared(this.target) > Ql ? (this.dispatchEvent(Wl), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
	}
	_getAutoRotationAngle(e) {
		return e === null ? Zl / 60 / 60 * this.autoRotateSpeed : Zl / 60 * this.autoRotateSpeed * e;
	}
	_getZoomScale(e) {
		let t = Math.abs(e * .01);
		return .95 ** (this.zoomSpeed * t);
	}
	_rotateLeft(e) {
		this._sphericalDelta.theta -= e;
	}
	_rotateUp(e) {
		this._sphericalDelta.phi -= e;
	}
	_panLeft(e, t) {
		Xl.setFromMatrixColumn(t, 0), Xl.multiplyScalar(-e), this._panOffset.add(Xl);
	}
	_panUp(e, t) {
		this.screenSpacePanning === !0 ? Xl.setFromMatrixColumn(t, 1) : (Xl.setFromMatrixColumn(t, 0), Xl.crossVectors(this.object.up, Xl)), Xl.multiplyScalar(e), this._panOffset.add(Xl);
	}
	_pan(e, t) {
		let n = this.domElement;
		if (this.object.isPerspectiveCamera) {
			let r = this.object.position;
			Xl.copy(r).sub(this.target);
			let i = Xl.length();
			i *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * i / n.clientHeight, this.object.matrix), this._panUp(2 * t * i / n.clientHeight, this.object.matrix);
		} else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / n.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / n.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
	}
	_dollyOut(e) {
		this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
	}
	_dollyIn(e) {
		this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
	}
	_updateZoomParameters(e, t) {
		if (!this.zoomToCursor) return;
		this._performCursorZoom = !0;
		let n = this.domElement.getBoundingClientRect(), r = e - n.left, i = t - n.top, a = n.width, o = n.height;
		this._mouse.x = r / a * 2 - 1, this._mouse.y = -(i / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
	}
	_clampDistance(e) {
		return Math.max(this.minDistance, Math.min(this.maxDistance, e));
	}
	_handleMouseDownRotate(e) {
		this._rotateStart.set(e.clientX, e.clientY);
	}
	_handleMouseDownDolly(e) {
		this._updateZoomParameters(e.clientX, e.clientY), this._dollyStart.set(e.clientX, e.clientY);
	}
	_handleMouseDownPan(e) {
		this._panStart.set(e.clientX, e.clientY);
	}
	_handleMouseMoveRotate(e) {
		this._rotateEnd.set(e.clientX, e.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
		let t = this.domElement;
		this._rotateLeft(Zl * this._rotateDelta.x / t.clientHeight), this._rotateUp(Zl * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
	}
	_handleMouseMoveDolly(e) {
		this._dollyEnd.set(e.clientX, e.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.zoomToCursor && (this._performCursorZoom = !0, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize()), this.update();
	}
	_handleMouseMovePan(e) {
		this._panEnd.set(e.clientX, e.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
	}
	_handleMouseWheel(e) {
		this._updateZoomParameters(e.clientX, e.clientY), e.deltaY < 0 ? this._dollyIn(this._getZoomScale(e.deltaY)) : e.deltaY > 0 && this._dollyOut(this._getZoomScale(e.deltaY)), this.update();
	}
	_handleKeyDown(e) {
		let t = !1;
		switch (e.code) {
			case this.keys.UP:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(Zl * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
				break;
			case this.keys.BOTTOM:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-Zl * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
				break;
			case this.keys.LEFT:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(Zl * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
				break;
			case this.keys.RIGHT: e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-Zl * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
		}
		t && (e.preventDefault(), this.update());
	}
	_handleTouchStartRotate(e) {
		if (this._pointers.length === 1) this._rotateStart.set(e.pageX, e.pageY);
		else {
			let t = this._getSecondPointerPosition(e), n = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
			this._rotateStart.set(n, r);
		}
	}
	_handleTouchStartPan(e) {
		if (this._pointers.length === 1) this._panStart.set(e.pageX, e.pageY);
		else {
			let t = this._getSecondPointerPosition(e), n = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
			this._panStart.set(n, r);
		}
	}
	_handleTouchStartDolly(e) {
		let t = this._getSecondPointerPosition(e), n = e.pageX - t.x, r = e.pageY - t.y, i = Math.sqrt(n * n + r * r);
		this._dollyStart.set(0, i);
	}
	_handleTouchStartDollyPan(e) {
		this.enableZoom && this._handleTouchStartDolly(e), this.enablePan && this._handleTouchStartPan(e);
	}
	_handleTouchStartDollyRotate(e) {
		this.enableZoom && this._handleTouchStartDolly(e), this.enableRotate && this._handleTouchStartRotate(e);
	}
	_handleTouchMoveRotate(e) {
		if (this._pointers.length == 1) this._rotateEnd.set(e.pageX, e.pageY);
		else {
			let t = this._getSecondPointerPosition(e), n = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
			this._rotateEnd.set(n, r);
		}
		this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
		let t = this.domElement;
		this._rotateLeft(Zl * this._rotateDelta.x / t.clientHeight), this._rotateUp(Zl * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
	}
	_handleTouchMovePan(e) {
		if (this._pointers.length === 1) this._panEnd.set(e.pageX, e.pageY);
		else {
			let t = this._getSecondPointerPosition(e), n = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
			this._panEnd.set(n, r);
		}
		this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
	}
	_handleTouchMoveDolly(e) {
		let t = this._getSecondPointerPosition(e), n = e.pageX - t.x, r = e.pageY - t.y, i = Math.sqrt(n * n + r * r);
		this._dollyEnd.set(0, i), this._dollyDelta.set(0, (this._dollyEnd.y / this._dollyStart.y) ** +this.zoomSpeed), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
		let a = (e.pageX + t.x) * .5, o = (e.pageY + t.y) * .5;
		this._updateZoomParameters(a, o);
	}
	_handleTouchMoveDollyPan(e) {
		this.enableZoom && this._handleTouchMoveDolly(e), this.enablePan && this._handleTouchMovePan(e);
	}
	_handleTouchMoveDollyRotate(e) {
		this.enableZoom && this._handleTouchMoveDolly(e), this.enableRotate && this._handleTouchMoveRotate(e);
	}
	_addPointer(e) {
		this._pointers.push(e.pointerId);
	}
	_removePointer(e) {
		delete this._pointerPositions[e.pointerId];
		for (let t = 0; t < this._pointers.length; t++) if (this._pointers[t] == e.pointerId) {
			this._pointers.splice(t, 1);
			return;
		}
	}
	_isTrackingPointer(e) {
		for (let t = 0; t < this._pointers.length; t++) if (this._pointers[t] == e.pointerId) return !0;
		return !1;
	}
	_trackPointer(e) {
		let t = this._pointerPositions[e.pointerId];
		t === void 0 && (t = new G(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
	}
	_getSecondPointerPosition(e) {
		let t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
		return this._pointerPositions[t];
	}
	_customWheelEvent(e) {
		let t = e.deltaMode, n = {
			clientX: e.clientX,
			clientY: e.clientY,
			deltaY: e.deltaY
		};
		switch (t) {
			case 1:
				n.deltaY *= 16;
				break;
			case 2: n.deltaY *= 100;
		}
		return e.ctrlKey && !this._controlActive && (n.deltaY *= 10), n;
	}
};
function eu(e) {
	this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.ownerDocument.addEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.addEventListener("pointerup", this._onPointerUp)), this._isTrackingPointer(e) || (this._addPointer(e), e.pointerType === "touch" ? this._onTouchStart(e) : this._onMouseDown(e), this._cursorStyle === "grab" && (this.domElement.style.cursor = "grabbing")));
}
function tu(e) {
	this.enabled !== !1 && (e.pointerType === "touch" ? this._onTouchMove(e) : this._onMouseMove(e));
}
function nu(e) {
	switch (this._removePointer(e), this._pointers.length) {
		case 0:
			this.domElement.releasePointerCapture(e.pointerId), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Kl), this.state = Q.NONE, this._cursorStyle === "grab" && (this.domElement.style.cursor = "grab");
			break;
		case 1:
			let t = this._pointers[0], n = this._pointerPositions[t];
			this._onTouchStart({
				pointerId: t,
				pageX: n.x,
				pageY: n.y
			});
	}
}
function ru(t) {
	let n;
	switch (t.button) {
		case 0:
			n = this.mouseButtons.LEFT;
			break;
		case 1:
			n = this.mouseButtons.MIDDLE;
			break;
		case 2:
			n = this.mouseButtons.RIGHT;
			break;
		default: n = -1;
	}
	switch (n) {
		case e.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseDownDolly(t), this.state = Q.DOLLY;
			break;
		case e.ROTATE:
			if (t.ctrlKey || t.metaKey || t.shiftKey) {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(t), this.state = Q.PAN;
			} else {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(t), this.state = Q.ROTATE;
			}
			break;
		case e.PAN:
			if (t.ctrlKey || t.metaKey || t.shiftKey) {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(t), this.state = Q.ROTATE;
			} else {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(t), this.state = Q.PAN;
			}
			break;
		default: this.state = Q.NONE;
	}
	this.state !== Q.NONE && this.dispatchEvent(Gl);
}
function iu(e) {
	switch (this.state) {
		case Q.ROTATE:
			if (this.enableRotate === !1) return;
			this._handleMouseMoveRotate(e);
			break;
		case Q.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseMoveDolly(e);
			break;
		case Q.PAN:
			if (this.enablePan === !1) return;
			this._handleMouseMovePan(e);
	}
}
function au(e) {
	this.enabled !== !1 && this.enableZoom !== !1 && this.state === Q.NONE && (e.preventDefault(), this.dispatchEvent(Gl), this._handleMouseWheel(this._customWheelEvent(e)), this.dispatchEvent(Kl));
}
function ou(e) {
	this.enabled !== !1 && this._handleKeyDown(e);
}
function su(e) {
	switch (this._trackPointer(e), this._pointers.length) {
		case 1:
			switch (this.touches.ONE) {
				case t.ROTATE:
					if (this.enableRotate === !1) {
						this.state = Q.NONE;
						break;
					}
					this._handleTouchStartRotate(e), this.state = Q.TOUCH_ROTATE;
					break;
				case t.PAN:
					if (this.enablePan === !1) {
						this.state = Q.NONE;
						break;
					}
					this._handleTouchStartPan(e), this.state = Q.TOUCH_PAN;
					break;
				default: this.state = Q.NONE;
			}
			break;
		case 2:
			switch (this.touches.TWO) {
				case t.DOLLY_PAN:
					if (this.enableZoom === !1 && this.enablePan === !1) return;
					this._handleTouchStartDollyPan(e), this.state = Q.TOUCH_DOLLY_PAN;
					break;
				case t.DOLLY_ROTATE:
					if (this.enableZoom === !1 && this.enableRotate === !1) return;
					this._handleTouchStartDollyRotate(e), this.state = Q.TOUCH_DOLLY_ROTATE;
					break;
				default: this.state = Q.NONE;
			}
			break;
		default: this.state = Q.NONE;
	}
	this.state !== Q.NONE && this.dispatchEvent(Gl);
}
function cu(e) {
	switch (this._trackPointer(e), this.state) {
		case Q.TOUCH_ROTATE:
			if (this.enableRotate === !1) return;
			this._handleTouchMoveRotate(e), this.update();
			break;
		case Q.TOUCH_PAN:
			if (this.enablePan === !1) return;
			this._handleTouchMovePan(e), this.update();
			break;
		case Q.TOUCH_DOLLY_PAN:
			if (this.enableZoom === !1 && this.enablePan === !1) return;
			this._handleTouchMoveDollyPan(e), this.update();
			break;
		case Q.TOUCH_DOLLY_ROTATE:
			if (this.enableZoom === !1 && this.enableRotate === !1) return;
			this._handleTouchMoveDollyRotate(e), this.update();
			break;
		default: this.state = Q.NONE;
	}
}
function lu(e) {
	this.enabled !== !1 && e.preventDefault();
}
function uu(e) {
	e.key === "Control" && (this._controlActive = !0, this.domElement.ownerDocument.addEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
function du(e) {
	e.key === "Control" && (this._controlActive = !1, this.domElement.ownerDocument.removeEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
// src/shared/theme.ts
var fu = "\n  :host {\n    color-scheme: dark;\n    display: block;\n    color: var(--gleam-text, #d8edff);\n    font-family: var(--ha-font-family-body, Inter, system-ui, sans-serif);\n  }\n  * { box-sizing: border-box; }\n  .experimental { position:absolute;top:8px;right:8px;z-index:2;pointer-events:none;\n    padding:2px 6px;border:1px solid #796340;border-radius:12px;background:#131c2c;\n    color:#ffd598;font:500 10px/1.2 var(--ha-font-family-body,system-ui,sans-serif) }\n  ha-card:has(>.experimental) {position:relative}\n  .badge-clearance {padding-right:78px}\n  [hidden] { display: none !important; }\n  ha-card {\n    display: block;\n    overflow: hidden;\n    color: inherit;\n    border: 1px solid var(--gleam-border, #1d3b60);\n    border-radius: var(--gleam-radius, 22px);\n    background: radial-gradient(ellipse at 16% 0%, #122c60 0%, var(--gleam-surface, #080e24) 50%, #050914 100%);\n    box-shadow: 0 12px 50px #02071680;\n  }\n  button, select {\n    font: inherit;\n    cursor: pointer;\n    border: 1px solid var(--gleam-control-border, #24405f);\n    border-radius: 30px;\n    background: var(--gleam-control-surface, #0b1830);\n    color: var(--gleam-control-text, #9fb4cb);\n  }\n  button { padding: 7px 10px; font-size: 11px; }\n  button[aria-pressed=true] { color: #f0faff; border-color: #406580; background: #102944; }\n  button, input, select, summary { -webkit-tap-highlight-color: transparent; }\n  :focus-visible {\n    outline: 2px solid var(--gleam-focus, #7eeaff);\n    outline-offset: 3px;\n  }\n", pu = `
  <style>
    ${fu}
    :host{container-type:inline-size}
    header{display:flex;flex-wrap:wrap;align-items:flex-start;gap:12px;padding:14px 22px 6px}
    .readouts,.controls{display:grid;gap:8px;max-width:100%}.controls{margin-left:auto}
    .eyebrow{font-size:10px;font-weight:700;letter-spacing:.24em;color:#67c7e3}
    h2{font-size:25px;letter-spacing:-.04em;margin:0;font-weight:600;overflow-wrap:anywhere}
    .sub{font-size:12px;color:var(--gleam-muted,#8ba8c6);line-height:1.6}.kpis{display:flex;gap:24px}
    .kpi span{display:block;font-size:10px;letter-spacing:.09em;color:var(--gleam-muted,#8ba8c6);text-transform:uppercase}
    .kpi strong{display:block;margin-top:6px;font-size:calc(var(--value-base,23px) * var(--value-scale,1));font-weight:500;white-space:nowrap}
    .live{color:var(--gleam-energy)}.price{color:var(--gleam-price)}
    nav{display:flex;justify-content:flex-end;gap:7px;flex-wrap:wrap}
    button{display:flex;align-items:center;gap:7px;white-space:nowrap}
    .dot{width:7px;height:7px;border-radius:50%;background:var(--color);box-shadow:0 0 10px var(--color)}
    .stage{position:relative;width:100%;aspect-ratio:2.2;min-height:220px;max-height:650px}
    .camera-controls{gap:6px}
    .camera-controls button{font-size:10px;padding:6px 9px}
    canvas{display:block;width:100%;height:100%;touch-action:none}
    .tip{position:absolute;pointer-events:none;z-index:2;display:none;white-space:pre-line;line-height:1.8;
      border:1px solid #408ca2;background:#071426ed;box-shadow:0 8px 28px #0008;
      padding:10px 14px;border-radius:10px;font-size:12px;color:#e5fbff;max-width:240px}
    .notice{padding:0 28px 12px;color:#f5ba83;font-size:12px;white-space:pre-line}
    .notice:empty{display:none}
    .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
    @container(max-width:780px){header{padding:14px 16px 4px}
      .kpis{gap:18px;--value-base:20px}.kpi span{font-size:9px}}
    @container(max-width:450px){header{gap:10px;padding:14px 12px 4px}
      .kpis{gap:12px}.kpi span{max-width:100px;line-height:1.5;font-size:8px}
      button{font-size:10px;padding:7px 9px}.stage{min-height:200px}
       .camera-controls{gap:4px}
      .camera-controls button{font-size:9px;padding:5px 7px}}
  </style>
  <ha-card>
    <header>
      <div class="readouts">
      <h2 class="card-title" hidden></h2>
      <div class="kpis">
        <div class="kpi"><span class="live-label"></span><strong class="live">—</strong></div>
        <div class="kpi"><span class="price-label">Current price</span><strong class="price">—</strong></div>
      </div>
      </div>
      <div class="controls">
      <nav class="series-controls" aria-label="Chart series">
        <button data-series="energy" aria-pressed="true"><i class="dot" style="--color:var(--gleam-energy)"></i>Energy</button>
        <button data-series="price" aria-pressed="true"><i class="dot" style="--color:var(--gleam-price)"></i>Price + forecast</button>
        <button data-series="power" aria-pressed="false"><i class="dot" style="--color:var(--gleam-power)"></i>Power</button>
        <button data-series="voltage" aria-pressed="false"><i class="dot" style="--color:var(--gleam-voltage)"></i>Voltage</button>
      </nav>
      <nav class="camera-controls" aria-label="Camera angles">
        <button data-camera="isometric" aria-pressed="true">Isometric</button>
        <button data-camera="front" aria-pressed="false">Front</button>
        <button data-camera="top" aria-pressed="false">Top</button>
      </nav>
      </div>
    </header>
    <div class="stage" role="group" aria-label="Interactive 3D energy and price chart.">
      <div class="tip"></div>
    </div>
    <div class="notice" role="status"></div>
  </ha-card>`, mu = new Y(16777215), hu = 1.5, gu = .062, _u = class {
	#e;
	pointLight;
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Map();
	#i = new $i(1, 1, 1);
	#a = new oa(this.#i);
	#o = new sa(1, 1);
	#s = new ea(1, 12);
	#c = new ta(1, 1, 1, 12, 1, !0);
	#l = new ca(1, 12, 8);
	#u = new Cn();
	#d = new K(0, 1, 0);
	#f = new K();
	constructor(e, t) {
		this.#e = e, e.add(new Ga(9626879, 527140, 1.4));
		let n = new co(11922175, 1.8);
		n.position.set(-4, 10, 8);
		let r = new co(9070335, 2);
		r.position.set(5, 8, -6);
		let i = this.pointLight = new ao(11990271, t);
		e.add(n, r, i);
	}
	#p = [];
	#m = new qn();
	#h = Array.from({ length: 8 }, () => new K());
	cachePlotBounds(e) {
		this.#m.makeEmpty();
		for (let t of e) this.#m.expandByObject(t);
	}
	begin() {
		this.#n.clear(), this.#p.length = 0;
	}
	stackUnits(e, t = !1) {
		e.updateMatrixWorld();
		let { min: n, max: r } = this.#m, i = !this.#m.isEmpty();
		i && this.#h.forEach((t, i) => t.set(i & 1 ? r.x : n.x, i & 2 ? r.y : n.y, i & 4 ? r.z : n.z).applyMatrix4(e.matrixWorldInverse));
		let a = -Infinity;
		for (let t of this.#p) {
			let { x: n, y: r } = t.getWorldPosition(this.#f).applyMatrix4(e.matrixWorldInverse), o = n - t.scale.x / 2, s = n + t.scale.x / 2;
			if (i) for (let e = 0; e < 8; e++) for (let t = 1; t <= 4; t *= 2) {
				if (e & t) continue;
				let n = this.#h[e], r = this.#h[e | t];
				if (n.x > r.x && ([n, r] = [r, n]), r.x < o || n.x > s) continue;
				let i = r.x - n.x, c = i ? Et.clamp(((r.y > n.y ? s : o) - n.x) / i, 0, 1) : 0;
				a = Math.max(a, (i ? n.y + c * (r.y - n.y) : Math.max(n.y, r.y)) + .08);
			}
			let c = t.scale.y, l = Math.max(r, a + c / 2);
			t.center.y = .5 + (r - l) / c, a = l + c / 2;
		}
		if (!t) {
			let t = a - ((e.top + e.bottom) / 2 + (e.top - e.bottom) / (2 * e.zoom) - .06);
			if (t > 0) for (let e of this.#p) e.center.y += t / e.scale.y;
		}
		return a;
	}
	followCamera(e, t) {
		let n = this.pointLight.position.set(0, 0, 5);
		n.applyQuaternion(e.quaternion).add(t), this.#e.worldToLocal(n);
	}
	sortTransparency(e, t) {
		e.setTransparentSort((e, n) => {
			let r = t.matrixWorld.elements[10] >= 0 ? 1 : -1;
			return (Number.isFinite(e.renderOrder) ? r * e.renderOrder : e.renderOrder) - (Number.isFinite(n.renderOrder) ? r * n.renderOrder : n.renderOrder) || (e.object.userData.blendOrder ?? 0) - (n.object.userData.blendOrder ?? 0) || n.z - e.z || e.id - n.id;
		});
	}
	#g(e, t) {
		let n = this.#t.get(e) ?? [];
		this.#t.set(e, n);
		let r = this.#n.get(e) ?? 0;
		return this.#n.set(e, r + 1), n[r] || (n[r] = t(), this.#e.add(n[r])), n[r];
	}
	#_(e, t) {
		return this.#r.has(e) || this.#r.set(e, t()), this.#r.get(e);
	}
	strokes(e, t, n, r, i, a = !1) {
		let o = 2 ** Math.ceil(Math.log2(Math.max(1, n))), s = `strokes:${e}`, c = this.#g(`${s}:${o}:${a}`, () => new Oi(a ? this.#l : this.#c, this.#_(s, () => new ii({ color: t })), o));
		return c.count = 0, c.material.color.setHex(t), c.material.opacity = r, c.material.transparent = r < 1, c.material.depthWrite = r === 1, c.renderOrder = i, c.boundingBox = c.boundingSphere = null, c.userData.tips ??= [], c.userData.tips.length = 0, c.instanceMatrix.needsUpdate = !0, c;
	}
	joint(e, t, n) {
		let r = this.#u.matrix.makeScale(n, n, n);
		r.setPosition(...t), e.setMatrixAt(e.count++, r);
	}
	stroke(e, t, n, r, i) {
		this.#f.set(n[0] - t[0], n[1] - t[1], n[2] - t[2]);
		let a = this.#f.length();
		if (!a) return;
		let o = this.#u;
		o.position.set(...t).addScaledVector(this.#f, .5), o.quaternion.setFromUnitVectors(this.#d, this.#f.divideScalar(a)), o.scale.set(r, a, r), o.updateMatrix(), e.setMatrixAt(e.count, o.matrix), e.userData.tips[e.count++] = i;
	}
	grid(e, t, n, r = -Infinity, i = "floor") {
		let a = `grid:${i}:${t}`, o = this.#g(`${a}:${n}`, () => {
			let r = new Er();
			return r.setAttribute("position", new mr(n * 6, 3)), new qi(r, this.#_(a, () => new Fi({
				color: e,
				opacity: t,
				transparent: !0,
				depthWrite: !1
			})));
		});
		o.renderOrder = r, o.material.color.setHex(e);
		let s = o.geometry;
		return s.setDrawRange(0, 0), (s.boundingBox ??= new qn()).makeEmpty(), s;
	}
	gridSegment(e, t, n) {
		let r = e.getAttribute("position"), i = e.drawRange.count;
		r.setXYZ(i, ...t), r.setXYZ(i + 1, ...n), r.needsUpdate = !0, e.setDrawRange(0, i + 2);
		for (let r of [t, n]) e.boundingBox.expandByPoint(this.#f.set(...r));
		e.boundingBox.getBoundingSphere(e.boundingSphere ??= new vr());
	}
	line(e, t, n, r, i = "marker") {
		let [a, o] = e;
		if (!a || !o) return;
		let s = `tube:${i}`, c = this.#g(s, () => new gi(this.#c, this.#_(s, () => new ii({
			color: t,
			opacity: n,
			transparent: n < 1,
			depthWrite: n >= 1
		}))));
		this.#f.set(o[0] - a[0], o[1] - a[1], o[2] - a[2]);
		let l = this.#f.length();
		return c.visible = l > 0, c.material.color.setHex(t), c.material.opacity = n, c.renderOrder = a[2] === o[2] ? a[2] : -Infinity, c.position.set(...a), r && c.position.addScaledVector(this.#f, .5), l && c.quaternion.setFromUnitVectors(this.#d, this.#f.divideScalar(l)), c.scale.set(r || 1, l, r || 1), c;
	}
	floorMarkerTip(e, t, n, r, i) {
		let a = this.#g("floorMarkerTip", () => new gi(this.#s, this.#_("floorMarkerTip", () => new ii({
			color: i,
			transparent: !0,
			opacity: .9,
			depthWrite: !1
		}))));
		a.position.set(e, t, n), a.material.color.setHex(i), a.scale.setScalar(r), a.renderOrder = n;
	}
	bar(e, t, n, r, i, a) {
		let o = this.#g("bar", () => {
			let e = new gi(this.#i, this.#_("bar", () => new xa({
				color: 2286831,
				emissive: 556433,
				emissiveIntensity: .5,
				metalness: .18,
				roughness: .5,
				clearcoat: .45,
				clearcoatRoughness: .5,
				transparent: !0,
				opacity: .65,
				depthWrite: !1,
				side: 2
			})));
			return e.add(new qi(this.#a, this.#_("outline", () => new Fi({
				color: 9175039,
				transparent: !0,
				opacity: .9,
				depthWrite: !1
			})))), e.renderOrder = e.children[0].renderOrder = hu, e.userData.blendOrder = 1, e.children[0].userData.blendOrder = 2, e;
		});
		o.position.set(e, n / 2, hu), o.material.color.setHex(i), o.material.emissive.copy(o.material.color).multiplyScalar(.28), o.material.opacity = a, o.material.transparent = a < 1, o.material.depthWrite = a === 1;
		let s = o.children[0].material;
		return s.color.copy(o.material.color).lerp(mu, .25), s.opacity = Math.min(1, a * .9 / .65), o.scale.set(t, n, r), o;
	}
	face(e, t, n, r, i, a, o, s) {
		let c = a ? "future" : "recorded", l = this.#g(c, () => new gi(this.#o, this.#_(c, () => new ii({
			color: 16746559,
			transparent: !0,
			opacity: a ? .16 : .3,
			depthWrite: !1,
			side: 2
		}))));
		return l.position.set((e + t) / 2, (n + r) / 2, i), l.renderOrder = i, l.userData.blendOrder = -1, l.material.color.setHex(o), l.material.opacity = (a ? .16 : .3) * s, l.scale.set(t - e, Math.abs(n - r), 1), l;
	}
	label(e, t, n = "#87b4ce", r = .24, i = !1) {
		let a = this.#g("label", () => {
			let e = new Yi(document.createElement("canvas"));
			return e.colorSpace = Ie, new Zr(new Lr({
				map: e,
				transparent: !0,
				depthTest: !1,
				depthWrite: !1
			}));
		}), o = a.material.map, s = o.image, c = `${e}:${n}`;
		if (a.userData.label !== c) {
			let t = s.getContext("2d");
			t.font = "500 32px system-ui";
			let r = Math.ceil(t.measureText(e).width) + 24;
			(s.width !== r || s.height !== 56) && (o.dispose(), s.width = r, s.height = 56, a.material.map = new Yi(s), a.material.map.colorSpace = Ie, a.material.needsUpdate = !0), t.clearRect(0, 0, s.width, s.height), t.font = "500 32px system-ui", t.textAlign = "center", t.textBaseline = "middle", t.fillStyle = n, t.fillText(e, s.width / 2, 28), a.material.map.needsUpdate = !0, a.userData.label = c;
		}
		a.position.set(...t), a.center.set(.5, .5), i && this.#p.push(a), a.renderOrder = Infinity, a.scale.set(r * s.width / 56, r, 1);
	}
	#v(e) {
		e.removeFromParent(), e instanceof Oi && e.dispose(), e instanceof qi && e.geometry.dispose(), e instanceof Zr && (e.material.map?.dispose(), e.material.dispose());
	}
	end() {
		for (let [e, t] of this.#t) {
			let n = this.#n.get(e) ?? 0;
			for (let e of t.splice(n)) this.#v(e);
		}
	}
	dispose() {
		for (let e of this.#t.values()) for (let t of e) this.#v(t);
		for (let e of this.#r.values()) e.dispose();
		for (let e of [
			this.#i,
			this.#a,
			this.#o,
			this.#c,
			this.#s,
			this.#l
		]) e.dispose();
		this.#t.clear(), this.#r.clear(), this.#e.clear();
	}
}, vu = {
	isometric: [
		10,
		10.3,
		23.2
	],
	front: [
		0,
		.3,
		28
	],
	top: [
		0,
		28,
		.3
	]
};
function yu(e, t, n) {
	e.left = -n * t / 2, e.right = n * t / 2, e.top = n / 2, e.bottom = -n / 2, e.updateProjectionMatrix();
}
function bu(e, t, n, r, i) {
	if (!(r > 0)) return;
	e.updateMatrixWorld(!0);
	let a = new qn().setFromObject(e);
	if (a.isEmpty()) return;
	t.updateMatrixWorld(!0);
	let o = new qn();
	for (let e of [a.min.x, a.max.x]) for (let n of [a.min.y, a.max.y]) for (let r of [a.min.z, a.max.z]) o.expandByPoint(new K(e, n, r).applyMatrix4(t.matrixWorldInverse));
	o.max.y = Math.max(o.max.y, i);
	let s = o.getCenter(new K()), c = new K().setFromMatrixColumn(t.matrixWorld, 0).multiplyScalar(s.x).addScaledVector(new K().setFromMatrixColumn(t.matrixWorld, 1), s.y);
	t.position.add(c), n.target.add(c);
	let l = o.getSize(new K()), u = Math.max(l.y * 1.08, l.x / r * 1.08, .1);
	return yu(t, r, u), n.update(), u;
}
// src/cards/energy-graph/recorder.ts
async function xu(e, t, n, r) {
	return (await e.callWS({
		type: "recorder/statistics_during_period",
		start_time: new Date(n).toISOString(),
		end_time: new Date(r).toISOString(),
		statistic_ids: [t],
		period: "hour",
		types: ["state"]
	}))[t] ?? [];
}
async function Su(e, t, n, r) {
	return e.callWS({
		type: "history/history_during_period",
		start_time: new Date(n).toISOString(),
		end_time: new Date(r).toISOString(),
		entity_ids: t,
		include_start_time_state: !0,
		significant_changes_only: !0,
		minimal_response: !0,
		no_attributes: !0
	});
}
// src/cards/energy-graph/config.ts
var Cu = {
	energy_entity: "sensor.total_energy",
	current_hour_entity: "",
	price_entity: "",
	power_entity: "sensor.power",
	voltage_entity: "sensor.voltage",
	hours_to_show: 33,
	future_hours: 16.8,
	refresh_interval: 10,
	dataset_spacing: 5,
	use_server_time: !1,
	now_marker_color: "#ff647c",
	title: "",
	starting_view: "isometric",
	show_current_hour_readout: !0,
	show_price_readout: !0,
	current_hour_label: "Current hour so far",
	price_label: "Current price",
	show_current_hour_label: !0,
	show_price_label: !0,
	separate_readout_sizes: !1,
	readout_value_size: 100,
	current_hour_value_size: 100,
	price_value_size: 100,
	show_dataset_buttons: !0,
	show_camera_buttons: !0,
	lock_navigation: !1,
	start_energy: !0,
	start_price: !0,
	start_power: !1,
	start_voltage: !1,
	point_light_intensity: 48,
	energy_color: "#22e4ef",
	price_color: "#ff883f",
	power_color: "#64f9a5",
	voltage_color: "#b48aff",
	energy_opacity: 65,
	price_opacity: 100,
	power_opacity: 100,
	voltage_opacity: 100,
	price_line_width: 100,
	power_line_width: 100,
	voltage_line_width: 100,
	energy_shift_minutes: 0,
	price_shift_minutes: 0,
	power_shift_minutes: 0,
	voltage_shift_minutes: 0
}, wu = [
	[
		"energy_entity",
		"Cumulative energy",
		"Lifetime meter reading · kWh"
	],
	[
		"current_hour_entity",
		"Current-hour energy",
		"Usage since the start of this hour · kWh"
	],
	[
		"price_entity",
		"Electricity price",
		"Current rate · currency per kWh"
	],
	[
		"power_entity",
		"Power",
		"Instantaneous power · W"
	],
	[
		"voltage_entity",
		"Voltage",
		"Supply voltage · V"
	]
];
function Tu(e, t, n) {
	return /^sensor\.[a-z0-9_]+$/.test(t) && (t !== Cu[e] || !!n?.[t]);
}
var Eu = [
	"energy",
	"price",
	"power",
	"voltage"
], Du = [
	["energy_shift_minutes", "Energy"],
	["price_shift_minutes", "Price"],
	["power_shift_minutes", "Power"],
	["voltage_shift_minutes", "Voltage"]
];
function Ou(e, t) {
	if (typeof t != "string") return !1;
	let n = t.trim();
	switch (e) {
		case "energy_entity":
		case "current_hour_entity": return n === "kWh";
		case "price_entity": return /^[\p{L}\p{Sc}][\p{L}\p{M}\p{Sc} .]*\/\s*kWh$/u.test(n);
		case "power_entity": return n === "W";
		case "voltage_entity": return n === "V";
	}
}
var ku = class extends Error {
	field;
	constructor(e, t) {
		super(t), this.field = e;
	}
};
function Au(e) {
	let t = {
		...Cu,
		...e
	};
	for (let e of [
		"price",
		"power",
		"voltage"
	]) {
		let n = `${e}_line_width`;
		if (!Number.isInteger(t[n]) || t[n] < 25 || t[n] > 300) throw new ku(n, `${e} line width must be a whole percentage from 25 to 300.`);
	}
	if (typeof t.now_marker_color != "string" || !/^#[0-9a-f]{6}$/i.test(t.now_marker_color)) throw new ku("now_marker_color", "Now marker colour must be a six-digit hex colour.");
	for (let e of [
		"readout_value_size",
		"current_hour_value_size",
		"price_value_size"
	]) if (!Number.isInteger(t[e]) || t[e] < 50 || t[e] > 200) throw new ku(e, "Readout value size must be a whole percentage from 50 to 200.");
	if (typeof t.title != "string") throw new ku("title", "Card title must be text.");
	for (let e of ["current_hour_label", "price_label"]) if (typeof t[e] != "string") throw new ku(e, "Readout label must be text.");
	if (![
		"isometric",
		"front",
		"top"
	].includes(t.starting_view)) throw new ku("starting_view", "Choose Isometric, Front, or Top as the starting view.");
	for (let e of Object.keys(Cu)) if (typeof Cu[e] == "boolean" && typeof t[e] != "boolean") throw new ku(e, `${e} must be true or false.`);
	if (!Number.isFinite(t.point_light_intensity) || t.point_light_intensity < 0 || t.point_light_intensity > 200) throw new ku("point_light_intensity", "Point light intensity must be between 0 and 200.");
	for (let e of Eu) {
		let n = `${e}_color`, r = `${e}_opacity`;
		if (typeof t[n] != "string" || !/^#[0-9a-f]{6}$/i.test(t[n])) throw new ku(n, `${e} colour must be a six-digit hex colour.`);
		if (!Number.isInteger(t[r]) || t[r] < 0 || t[r] > 100) throw new ku(r, `${e} opacity must be a whole percentage from 0 to 100.`);
	}
	for (let [e, n] of Du) if (!Number.isInteger(t[e]) || Math.abs(t[e]) > 30) throw new ku(e, `${n} time shift must be a whole number from -30 to 30 minutes.`);
	if (!Number.isFinite(t.hours_to_show) || !(t.hours_to_show > 0 && t.hours_to_show <= 168)) throw new ku("hours_to_show", "Total time span must be greater than 0 and at most 168 hours.");
	if (!Number.isFinite(t.future_hours) || !(t.future_hours >= 0 && t.future_hours < t.hours_to_show)) throw new ku("future_hours", "Future hours must be at least 0 and less than the total time span.");
	if (!Number.isFinite(t.refresh_interval) || !(t.refresh_interval >= 5)) throw new ku("refresh_interval", "Refresh interval must be at least 5 seconds.");
	if (!Number.isInteger(t.dataset_spacing) || t.dataset_spacing < 0 || t.dataset_spacing > 10) throw new ku("dataset_spacing", "Dataset spacing must be a whole number between 0 and 10.");
	for (let [e, n] of wu) if ((e === "energy_entity" || t[e] !== "") && (typeof t[e] != "string" || !/^sensor\.[a-z0-9_]+$/.test(t[e]))) throw new ku(e, `${n} must be a sensor entity ID.`);
	return t;
}
// src/cards/energy-graph/data.js
var ju = 36e5, Mu = 4.8, Nu = (e) => {
	if (e == null || e === "") return null;
	let t = Number(e);
	return Number.isFinite(t) ? t : null;
}, Pu = (e) => typeof e == "number" ? e < 1e11 ? e * 1e3 : e : Date.parse(e), Fu = (e) => Math.floor(e / ju) * ju;
function Iu(e, t, n) {
	let r = (e || []).map((e) => ({
		time: Pu(e.start),
		value: Nu(e.state)
	})).filter((e) => Number.isFinite(e.time)).sort((e, t) => e.time - t.time), i = [];
	for (let e = 1; e < r.length; e++) {
		let a = r[e - 1], o = r[e];
		if (a.value === null || o.value === null || o.time - a.time !== 36e5) continue;
		let s = o.value - a.value;
		s >= 0 && o.time >= t && o.time <= n && i.push({
			time: o.time,
			value: s,
			live: !1
		});
	}
	return i;
}
function Lu(e, t, n) {
	let r = Fu(n), i = Nu(t?.state), a = Pu(t?.last_updated);
	return e.some((e) => e.time >= r && e.time < r + 36e5) || i === null || i < 0 || !Number.isFinite(a) || a < r ? [...e] : [...e, {
		time: r,
		value: i,
		live: !0
	}];
}
function Ru(e) {
	return (e || []).map((e) => ({
		time: e.lu === void 0 ? Pu(e.last_updated || e.last_changed) : Pu(e.lu),
		value: Nu(e.s ?? e.state)
	})).filter((e) => Number.isFinite(e.time)).sort((e, t) => e.time - t.time);
}
function zu(e, t, n, r) {
	let i = e.filter((e) => e.time < n), a = t.findLast((e) => e.time <= n);
	if (a && i.at(-1)?.value !== a.value) {
		for (; i.length && i.at(-1).time >= a.time;) i.pop();
		i.push(a);
	} else !a && i.length && i.at(-1).value !== null && i.push({
		time: n,
		value: null
	});
	let o = Math.max(0, i.findLastIndex((e) => e.time <= r));
	return i.slice(o).concat(t.filter((e) => e.time > n));
}
function Bu(e, t, n, r, i) {
	let a = e.filter((e) => e.time <= i), o = Nu(t?.state), s = Pu(t?.last_updated);
	Number.isFinite(s) && s <= i && o !== null && (!a.length || s > a.at(-1).time) && a.push({
		time: s,
		value: o
	});
	let c = [];
	for (let e = 0; e < a.length; e++) {
		let t = Math.max(n, a[e].time), o = Math.min(i, r, a[e + 1]?.time ?? i);
		o > t && a[e].value !== null && c.push({
			from: t,
			to: o,
			value: a[e].value,
			future: !1
		});
	}
	let l = t?.attributes || {}, u = [...Array.isArray(l.raw_today) ? l.raw_today : [], ...Array.isArray(l.raw_tomorrow) ? l.raw_tomorrow : []].filter(Boolean).map((e) => ({
		from: Pu(e.start),
		to: Pu(e.end),
		value: Nu(e.value)
	})).filter((e) => Number.isFinite(e.from) && Number.isFinite(e.to) && e.to > e.from && e.to > i && e.from < r && e.value !== null).sort((e, t) => e.from - t.from);
	for (let e of u) {
		let t = Math.max(i, n, e.from), a = Math.min(r, e.to);
		a > t && c.push({
			from: t,
			to: a,
			value: e.from <= i && o !== null ? o : e.value,
			future: !0
		});
	}
	return c;
}
function Vu(e, t, n, r = ju / 3, i = 1) {
	let a = [], o = 0;
	for (let s = Math.ceil(t / r) * r; s <= n; s += r) {
		for (; o + 1 < e.length && e[o + 1].time <= s;) o++;
		e[o]?.time <= s && e[o].value !== null && a.push({
			time: s,
			value: e[o].value / i
		});
	}
	return a;
}
function Hu(e, t = 4) {
	let n = e.filter(Number.isFinite), r = Math.min(0, ...n), i = Math.max(0, ...n), a = Math.max(.001, (i - r) / t), o = 10 ** Math.floor(Math.log10(a)), s = [
		1,
		2,
		2.5,
		5,
		10
	].map((e) => e * o).find((e) => e >= a), c = Math.floor(r / s) * s, l = Math.max(c + s, Math.ceil(i / s) * s);
	return {
		min: c,
		max: l,
		height: (e) => (e - c) / (l - c) * Mu
	};
}
// src/cards/energy-graph/gleam-energy-graph.js
var Uu = [
	hu,
	-1.55,
	-3.9,
	-5.9
], Wu = 2.8, Gu = class extends HTMLElement {
	static getStubConfig() {
		return {
			type: "custom:gleam-energy-graph",
			...Cu
		};
	}
	static getConfigElement() {
		return document.createElement("gleam-energy-graph-editor");
	}
	constructor() {
		super(), this.attachShadow({ mode: "open" }), this._enabled = {
			energy: !0,
			price: !0,
			power: !1,
			voltage: !1
		}, this._history = {}, this._stats = [], this._lastFetch = {}, this._errors = {}, this._epoch = 0, this._visible = !1;
	}
	setConfig(e) {
		let t = Au(e), n = this._config;
		this._config = t, this._chart && n?.point_light_intensity !== t.point_light_intensity && (this._chart.pointLight.intensity = t.point_light_intensity, this._renderFrame());
		for (let e of Eu) this.style.setProperty(`--gleam-${e}`, t[`${e}_color`]);
		let r = !1;
		for (let e of Eu) {
			let i = this._enabled[e];
			n?.[`${e}_entity`] && n[`start_${e}`] === t[`start_${e}`] || (this._enabled[e] = t[`start_${e}`]), t[`${e}_entity`] || (this._enabled[e] = !1), r ||= i !== this._enabled[e];
			let a = this.shadowRoot?.querySelector(`[data-series="${e}"]`);
			a && (a.hidden = !t[`${e}_entity`], a.setAttribute("aria-pressed", String(this._enabled[e])));
		}
		this._applyLayout(), (!n || [
			"current_hour_label",
			"price_label",
			"show_current_hour_label",
			"show_price_label"
		].some((e) => t[e] !== n[e])) && this._updateReadings(), n?.starting_view !== t.starting_view && (this._cameraPreset = t.starting_view, this._renderer && this._setCameraPreset(t.starting_view)), n && Object.keys(Cu).every((e) => [
			"title",
			"starting_view",
			"lock_navigation",
			"dataset_spacing",
			"point_light_intensity",
			"separate_readout_sizes",
			"use_server_time"
		].includes(e) || /^(show_|start_)/.test(e) || /_(shift_minutes|color|opacity|label|value_size|line_width)$/.test(e) || n[e] === t[e]) ? (n.use_server_time !== t.use_server_time && this._scheduleBuild(), r && (this._scheduleBuild(), this._refresh()), (n.dataset_spacing !== t.dataset_spacing || n.now_marker_color !== t.now_marker_color || Du.some(([e]) => n[e] !== t[e]) || Eu.some((e) => n[`${e}_color`] !== t[`${e}_color`] || n[`${e}_opacity`] !== t[`${e}_opacity`] || n[`${e}_line_width`] !== t[`${e}_line_width`])) && this._scheduleBuild()) : (this._epoch++, this._stats = [], this._history = {}, this._lastFetch = {}, this._lastFull = {}, this._retryAfter = {}, this._errors = this._errors.webgl ? { webgl: this._errors.webgl } : {}, this.isConnected && (this._start(), this._scheduleBuild()));
	}
	set hass(e) {
		let t = this._hass;
		if (this._hass = e, !this._config) return;
		(!t || Eu.some((n) => !!t.states[this._config[`${n}_entity`]] != !!e.states[this._config[`${n}_entity`]])) && this._applyLayout();
		let n = this._config.price_entity, r = this._config.current_hour_entity, i = e.states[n], a = t?.states[n], o = e.states[r], s = t?.states[r], c = i?.state !== a?.state || i?.attributes.unit_of_measurement !== a?.attributes.unit_of_measurement;
		(!t || c || o?.state !== s?.state) && this._updateReadings(), this._scene && (this._enabled.price && (c || i?.last_updated !== a?.last_updated || i?.attributes.raw_today !== a?.attributes.raw_today || i?.attributes.raw_tomorrow !== a?.attributes.raw_tomorrow) || this._enabled.energy && (o?.state !== s?.state || o?.last_updated !== s?.last_updated) || t?.locale?.language !== e.locale?.language || t?.locale?.time_zone !== e.locale?.time_zone || t?.config?.time_zone !== e.config?.time_zone) && this._scheduleBuild(), !t && this.isConnected && this._refresh();
	}
	getCardSize() {
		return 13;
	}
	getGridOptions() {
		return {
			columns: "full",
			rows: "auto"
		};
	}
	connectedCallback() {
		this._config && this._start();
	}
	_start() {
		(!this._events || this._events.signal.aborted) && this._mount(), this._updateReadings(), this._applyLayout(), this._updateNotice(), this._startRefreshTimer(), this._intersection || (this._intersection = new IntersectionObserver((e) => {
			this._visible = e.at(-1).isIntersecting, this._visible && this._resume();
		}), this._intersection.observe(this)), this._refresh();
	}
	_resume() {
		this._visible && !document.hidden && this.isConnected && (!this._renderer && !this._errors.webgl && this._initGraphics(), this._scene && (this._renderFrame(), this._refresh()));
	}
	disconnectedCallback() {
		this._epoch++, clearInterval(this._timer), cancelAnimationFrame(this._buildFrame), this._buildFrame = 0, this._intersection?.disconnect(), this._intersection = null, this._visible = !1, this._refreshPending = !1, this._resize?.disconnect(), this._events?.abort(), this._controls?.dispose(), this._disposeScene(), this._renderer?.dispose(), this._renderer?.forceContextLoss(), this._renderer = null, this._scene = null, this._targets = [], delete this._errors.webgl;
	}
	_startRefreshTimer() {
		clearInterval(this._timer), this._timer = window.setInterval(() => {
			this._visible && !document.hidden && this._refresh();
		}, this._config.refresh_interval * 1e3);
	}
	_mount() {
		if (this._renderer) return;
		this.shadowRoot.innerHTML = pu, this._events?.abort(), this._events = new AbortController();
		let e = this._events.signal;
		document.addEventListener("visibilitychange", () => {
			document.hidden || this._resume();
		}, { signal: e }), this.shadowRoot.querySelectorAll("[data-series]").forEach((t) => {
			let n = t.dataset.series;
			t.hidden = !this._config[`${n}_entity`], t.setAttribute("aria-pressed", String(this._enabled[n])), t.addEventListener("click", () => {
				this._enabled[n] = !this._enabled[n], t.setAttribute("aria-pressed", String(this._enabled[n])), this._scheduleBuild(), this._refresh();
			}, { signal: e });
		}), this.shadowRoot.querySelectorAll("[data-camera]").forEach((t) => {
			t.addEventListener("click", () => this._setCameraPreset(t.dataset.camera), { signal: e });
		});
	}
	_initGraphics() {
		let e = this._events.signal, t = this.shadowRoot.querySelector(".stage");
		try {
			this._renderer = new Ul({
				antialias: !0,
				alpha: !0,
				powerPreference: "low-power"
			}), this._renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75)), this._renderer.setClearColor(330004, 0), this._renderer.toneMapping = 4, this._renderer.toneMappingExposure = 1.4, t.prepend(this._renderer.domElement), this._scene = new Mn(), this._needsBuild = !0, this._chart = new _u(this._scene, this._config.point_light_intensity), this._scene.scale.z = Math.max(1, this._config.dataset_spacing) / 10, this._camera = new oo(-12.5, 12.5, 5, -5, .1, 120), this._chart.sortTransparency(this._renderer, this._camera), this._controls = new $l(this._camera, this._renderer.domElement), this._applyLayout(), this._controls.minPolarAngle = .01, this._controls.maxPolarAngle = Math.PI / 2 - .01, this._controls.minDistance = 12, this._controls.maxDistance = 48, this._controls.minZoom = .55, this._controls.maxZoom = 4, this._controls.addEventListener("start", () => {
				this._defaultCamera = !1, this._cameraPreset = null, this._updateCameraButtons();
			}), this._controls.addEventListener("change", () => this._renderFrame()), this._raycaster = new Do(), this._renderer.domElement.addEventListener("pointermove", (e) => this._hover(e), { signal: e }), this._renderer.domElement.addEventListener("pointerleave", () => this._hideTip(), { signal: e }), this._renderer.domElement.addEventListener("webglcontextlost", (e) => {
				e.preventDefault(), this._errors.webgl = "WebGL context lost. Reload this view to restore the chart.", this._updateNotice();
			}, { signal: e }), this._resize = new ResizeObserver(() => this._size()), this._resize.observe(t), this._setCameraPreset(this._cameraPreset || this._config.starting_view), this._size();
		} catch (e) {
			this._errors.webgl = "3D rendering needs WebGL 2. " + e.message, this._updateNotice();
		}
	}
	_size() {
		if (!this._renderer || !this._camera) return;
		let e = this.shadowRoot.querySelector(".stage"), t = e.clientWidth, n = e.clientHeight;
		if (!(t > 0 && n > 0)) return;
		this._renderer.setSize(t, n, !1), this._camera.aspect = t / n;
		let r = this._framingSpan || Math.max(9.5, 25 / this._camera.aspect);
		yu(this._camera, this._camera.aspect, r), this._sized && t < 650 === this._narrow || (this._narrow = t < 650, this._sized = !0, this._setCameraPreset(this._cameraPreset || this._config.starting_view)), this._defaultCamera && this._fitCamera(), this._renderFrame();
	}
	_setCameraPreset(e) {
		if (!this._camera) return;
		let t = vu;
		t[e] && (this._cameraPreset = e, this._defaultCamera = !0, this._camera.zoom = 1, this._camera.updateProjectionMatrix(), this._controls.target.set(0, 1.7, -.2), this._camera.position.copy(this._controls.target).add(new K(...t[e])), this._controls.update(), this._fitCamera(), this._updateCameraButtons(), this._renderFrame());
	}
	_updateCameraButtons() {
		this.shadowRoot.querySelectorAll("[data-camera]").forEach((e) => {
			e.setAttribute("aria-pressed", String(e.dataset.camera === this._cameraPreset));
		});
	}
	_fitCamera() {
		if (!this._scene || !this._camera || !(this._camera.aspect > 0)) return;
		let e = bu(this._scene, this._camera, this._controls, this._camera.aspect, this._chart.stackUnits(this._camera, !0));
		e !== void 0 && (this._framingSpan = e);
	}
	_scheduleBuild() {
		this._needsBuild = !0, this._renderFrame();
	}
	async _refresh() {
		if (!this._scene || !this._hass || !this.isConnected || !this._visible || document.hidden) return;
		if (this._fetching) {
			this._refreshPending = !0;
			return;
		}
		let e = this._config, t = this._hass;
		this._fetching = !0;
		let n = this._epoch;
		try {
			let r = Date.now(), i = r - (e.hours_to_show - e.future_hours) * ju, a = [], o = (e) => r >= (this._retryAfter[e] ?? 0) && r - (this._lastFetch[e] ?? -Infinity) >= 6e4, s = (e) => !this._lastFull[e] || r - this._lastFull[e] >= 36e5, c = (e, t, i, o) => {
				a.push(Promise.resolve().then(t).then((t) => {
					if (n === this._epoch && this.isConnected) {
						i(t);
						for (let t of e) this._lastFetch[t] = r, o && (this._lastFull[t] = r), delete this._errors[t], delete this._retryAfter[t];
					}
				}).catch((t) => {
					if (n === this._epoch) for (let n of e) this._retryAfter[n] = r + 15e3, this._errors[n] = `${n}: data request failed (${t.message || t.code || "unknown error"}).`;
				}));
			}, l = "Energy statistics";
			if (this._enabled.energy && o(l)) {
				let n = s(l), a = i - 2 * ju, o = n ? a : Math.max(a, Math.floor(this._lastFetch[l] / ju) * ju - 2 * ju);
				c([l], () => xu(t, e.energy_entity, o, r), (e) => {
					this._stats = (n ? [] : this._stats.filter((e) => {
						let t = Pu(e.start);
						return t >= a && t < o;
					})).concat(e.filter((e) => Pu(e.start) >= o));
				}, n);
			}
			let u = new Set(this._enabled.price ? [e.price_entity] : []);
			this._enabled.power && u.add(e.power_entity), this._enabled.voltage && u.add(e.voltage_entity);
			for (let e of [!0, !1]) {
				let n = [...u].filter((t) => o(t) && s(t) === e);
				if (!n.length) continue;
				let a = i - ju, l = e ? a : Math.max(a, Math.min(...n.map((e) => this._lastFetch[e])) - 6e4);
				c(n, () => Su(t, n, l, r), (t) => {
					for (let r of n) {
						let n = Ru(t[r] ?? []);
						this._history[r] = e ? n : zu(this._history[r], n, l, a);
					}
				}, e);
			}
			await Promise.all(a), n === this._epoch && this.isConnected && (a.length || this._clockTick(r) !== this._builtTick) && this._scheduleBuild();
		} finally {
			this._fetching = !1, this._refreshPending && (this._refreshPending = !1, this._refresh());
		}
	}
	_clockTick(e) {
		let t = Math.min(6e4, this._config.hours_to_show * ju / (this._renderer?.domElement.clientWidth || 1));
		return `${Math.floor(e / 6e4)}:${Math.floor(e / t)}`;
	}
	_updateNotice() {
		let e = this.shadowRoot.querySelector(".notice");
		e && (e.textContent = Object.values(this._errors).join("\n"));
	}
	_priceUnit() {
		let e = this._hass?.states[this._config.price_entity]?.attributes.unit_of_measurement;
		return typeof e == "string" ? e.trim() : "";
	}
	_updateReadings() {
		if (!this.isConnected || !this._events) return;
		let e = (e) => Nu(this._hass?.states[this._config[e]]?.state);
		this.shadowRoot.querySelector(".live").textContent = e("current_hour_entity")?.toFixed(2) ?? "—", this.shadowRoot.querySelector(".price").textContent = e("price_entity")?.toFixed(3) ?? "—";
		for (let [e, t, n] of [[
			"current_hour",
			"kWh",
			".live-label"
		], [
			"price",
			this._priceUnit(),
			".price-label"
		]]) {
			let r = this._config[`show_${e}_label`] ? this._config[`${e}_label`].trim() : "", i = this.shadowRoot.querySelector(n);
			i.textContent = [r, t].filter(Boolean).join(" · "), i.hidden = !i.textContent;
		}
	}
	_applyLayout() {
		let e = this.shadowRoot, t = e.querySelector(".card-title");
		if (!t) return;
		let n = this._config;
		e.querySelector(".live").style.setProperty("--value-scale", (n.separate_readout_sizes ? n.current_hour_value_size : n.readout_value_size) / 100), e.querySelector(".price").style.setProperty("--value-scale", (n.separate_readout_sizes ? n.price_value_size : n.readout_value_size) / 100), t.textContent = n.title, t.hidden = !n.title.trim();
		let r = !!n.current_hour_entity && n.show_current_hour_readout, i = !!n.price_entity && n.show_price_readout;
		e.querySelector(".live").parentElement.hidden = !r, e.querySelector(".price").parentElement.hidden = !i, e.querySelector(".kpis").hidden = !r && !i;
		let a = 0;
		for (let t of Eu) {
			let r = `${t}_entity`, i = t === "energy" || Tu(r, n[r], this._hass?.states);
			e.querySelector(`[data-series="${t}"]`).hidden = !i, i && a++;
		}
		let o = n.show_dataset_buttons && a > 1;
		e.querySelector(".series-controls").hidden = !o;
		let s = t.hidden && !r && !i, c = !o && !n.show_camera_buttons;
		e.querySelector(".readouts").hidden = s, e.querySelector(".controls").hidden = c, e.querySelector("header").hidden = s && c, e.querySelector(".camera-controls").hidden = !n.show_camera_buttons, this._renderer && this._controls && (this._controls.enabled = !n.lock_navigation, this._renderer.domElement.style.touchAction = n.lock_navigation ? "auto" : "none");
	}
	_disposeScene() {
		this._chart?.dispose(), this._chart = null;
	}
	_line(e, t, n = 1, r = 0) {
		return this._chart.line(e, t, n, r);
	}
	_label(e, t, n = "#87b4ce", r = .24) {
		this._chart.label(e, t, n, r);
	}
	_axis(e, t, n, r) {
		let i = this._chart.grid(r, .45, 2, t, n.split(" ")[0]);
		this._chart.gridSegment(i, [
			-9.5,
			0,
			t
		], [
			-9.5,
			Mu,
			t
		]), this._chart.gridSegment(i, [
			-9.5,
			0,
			t
		], [
			9.2,
			0,
			t
		]);
		let a = this._chart.grid(r, .1, 4, t, n.split(" ")[0]);
		for (let n = 0; n <= 4; n++) {
			let r = Mu * n / 4, i = e.min + (e.max - e.min) * n / 4;
			n > 0 && this._chart.gridSegment(a, [
				-9.5,
				r,
				t
			], [
				9.2,
				r,
				t
			]), this._label(i.toLocaleString(void 0, { maximumFractionDigits: 2 }), [
				-10,
				r,
				t
			], void 0, .24);
		}
		this._chart.label(n, [
			-8.1,
			5.1,
			t
		], "#" + r.toString(16).padStart(6, "0"), .32, !0);
	}
	_build() {
		if (!this._scene || !this._hass) return;
		this._chart.begin(), this._targets = [], this._hideTip();
		let e = Date.now(), t = this._config;
		this._builtTick = this._clockTick(e);
		let n = t.dataset_spacing === 0;
		this._scene.scale.z = Math.max(1, t.dataset_spacing) / 10;
		let r = (e) => n ? hu : Uu[e], i = e - (t.hours_to_show - t.future_hours) * ju, a = e + t.future_hours * ju, o = t.use_server_time ? this._hass.config?.time_zone : void 0, s = `${this._hass.locale?.language}:${o}`;
		s !== this._formatKey && (this._timeFormat = o ? new Intl.DateTimeFormat(this._hass.locale?.language || "en-GB", {
			hour: "2-digit",
			minute: "2-digit",
			hourCycle: "h23",
			timeZone: o
		}).format : (e) => {
			let t = new Date(e);
			return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
		}), this._formatKey = s;
		let c = this._timeFormat, l = (e) => (e - i) / (a - i) * 18 - 9, u = this._hass.states[t.price_entity], d = (e) => parseInt(t[`${e}_color`].slice(1), 16), f = (e) => t[`${e}_opacity`] / 100, p = this._priceUnit(), m = this._hass.states[t.current_hour_entity], h = t.energy_shift_minutes * 6e4, g = t.price_shift_minutes * 6e4, _ = (e) => l(e + g), v = this._enabled.energy ? Lu(Iu(this._stats, i - h - .4 * ju, e), m, e) : [], y = this._enabled.price ? Bu(this._history[t.price_entity] || [], u, i - g, a - g, e) : [], b = Hu(v.map((e) => e.value)), x = Hu(y.map((e) => e.value)), S = Nu(u?.state), C = gu / this._scene.scale.z, w = hu + C / 2, T = this._enabled.energy ? hu - C / 2 : w;
		if (this._enabled.energy) {
			this._axis(b, 1, "ENERGY · kWh", d("energy"));
			let e = 18 / t.hours_to_show * .8;
			for (let t of v) {
				let n = l(t.time + h);
				if (n > 9 + e / 2 || n < -9 - e / 2) continue;
				let r = Math.max(.008, b.height(t.value)), i = this._chart.bar(n, e, r, C, d("energy"), f("energy"));
				i.userData.tip = `Energy${t.live ? " · current hour so far" : ""}\n${c(t.time)}–${c(t.time + ju)}\n${t.value.toFixed(3)} kWh`, this._targets.push(i);
			}
		}
		let E = +!!this._enabled.energy, D = this._enabled.price ? r(E++) : void 0;
		if (this._enabled.price) {
			T = D;
			let e = .035 * t.price_line_width / 100, n = this._chart.strokes("price", d("price"), y.length * 2, f("price"), D), r = this._chart.strokes("price", d("price"), y.length * 2, f("price"), D, !0);
			this._axis(x, D - .3, `PRICE${p ? ` · ${p}` : ""}`, d("price"));
			for (let t of y) {
				let r = _(t.from), i = _(t.to), a = x.height(t.value), o = x.height(0), s = this._chart.face(r, i, a, o, D, t.future, d("price"), f("price"));
				s.userData.tip = `${t.future ? "Future price" : "Recorded price"}\n${c(t.from)}–${c(t.to)}\n${t.value.toFixed(3)}${p ? ` ${p}` : ""}`, this._targets.push(s), this._chart.stroke(n, [
					r,
					a,
					D
				], [
					i,
					a,
					D
				], e, s.userData.tip);
			}
			for (let t = 1; t < y.length; t++) {
				let i = y[t - 1], a = y[t];
				if (Math.abs(i.to - a.from) >= 1e3 || i.value === a.value) continue;
				let o = [
					_(a.from),
					x.height(i.value),
					D
				], s = [
					o[0],
					x.height(a.value),
					D
				];
				this._chart.stroke(n, o, s, e), this._chart.joint(r, o, e), this._chart.joint(r, s, e);
			}
			n.count && this._targets.push(n);
		}
		for (let [n, o, s] of [[
			"power",
			"kW",
			1e3
		], [
			"voltage",
			"V",
			1
		]]) {
			if (!this._enabled[n]) continue;
			let u = r(E++);
			T = u;
			let p = t[`${n}_entity`], m = .025 * t[`${n}_line_width`] / 100, h = t[`${n}_shift_minutes`] * 6e4, g = Vu(this._history[p] || [], i - h, Math.min(e, a - h), ju / 3, s), _ = Hu(g.map((e) => e.value));
			this._axis(_, u - .3, `${n.toUpperCase()} · ${o}`, d(n));
			let v = this._chart.strokes(n, d(n), g.length, f(n), u), y = this._chart.strokes(n, d(n), g.length, f(n), u, !0);
			for (let e = 1; e < g.length; e++) {
				if (g[e].time - g[e - 1].time > 12e5) continue;
				let t = g[e - 1], r = g[e];
				e > 1 && t.time - g[e - 2].time <= 12e5 && this._chart.joint(y, [
					l(t.time + h),
					_.height(t.value),
					u
				], m), this._chart.stroke(v, [
					l(t.time + h),
					_.height(t.value),
					u
				], [
					l(r.time + h),
					_.height(r.value),
					u
				], m, `${n === "power" ? "Power" : "Voltage"}\n${c(r.time)}\n${r.value.toFixed(2)} ${o}`);
			}
			v.count && this._targets.push(v);
		}
		let O = this._chart.grid(2520760, .15, Math.ceil(t.hours_to_show));
		for (let e = Math.ceil(i / ju); e * ju < a; e++) {
			let t = l(e * ju);
			this._chart.gridSegment(O, [
				t,
				-.07,
				Wu
			], [
				t,
				-.07,
				T
			]), e % 3 == 0 && this._label(c(e * ju), [
				t,
				-.45,
				3
			], "#8daac7", .322);
		}
		if (T < w) {
			let t = l(e), n = .022, r = w + (this._enabled.energy ? n : 0), i = d("now_marker");
			this._line([[
				t,
				.01,
				r
			], [
				t,
				.01,
				T
			]], i, .9, n), this._enabled.energy && this._chart.floorMarkerTip(t, .01, r, n, i);
			let a = T === D && S !== null, o = a ? x.height(0) : 0, s = a ? x.height(S) : Mu;
			this._line([[
				t,
				o,
				T
			], [
				t,
				s,
				T
			]], i, .9, .022);
		}
		let k = v.filter((e) => !e.live).length;
		this._enabled.energy && !k && !this._errors["Energy statistics"] ? this._errors.emptyEnergy = "No completed hourly energy statistics in this window." : delete this._errors.emptyEnergy, this._enabled.price && !this._history[t.price_entity]?.length && !this._errors[t.price_entity] ? this._errors.emptyPrice = "No recorded price history returned; only available snapshots and forecast can be shown." : delete this._errors.emptyPrice, this._chart.end(), this._scene.updateMatrixWorld(!0), this._chart.cachePlotBounds(this._targets), this._updateNotice(), this._defaultCamera && this._fitCamera(), this._renderFrame();
	}
	_hover(e) {
		if (!this._renderer || !this._targets?.length) return;
		let t = this._renderer.domElement.getBoundingClientRect(), n = new G((e.clientX - t.left) / t.width * 2 - 1, -(e.clientY - t.top) / t.height * 2 + 1);
		this._scene.updateMatrixWorld(!0), this._raycaster.setFromCamera(n, this._camera);
		let r = this._raycaster.intersectObjects(this._targets, !1), i = this.shadowRoot.querySelector(".tip"), a;
		for (let { object: e, instanceId: t } of r) if (a = t === void 0 ? e.userData.tip : e.userData.tips[t], a) break;
		a ? (i.textContent = a, i.style.display = "block", i.style.left = Math.max(8, Math.min(t.width - 250, e.clientX - t.left + 14)) + "px", i.style.top = Math.max(8, Math.min(t.height - 110, e.clientY - t.top - 30)) + "px") : this._hideTip();
	}
	_hideTip() {
		let e = this.shadowRoot.querySelector(".tip");
		e && (e.style.display = "none");
	}
	_renderFrame() {
		this._drawing || this._buildFrame || !this._renderer || !this._visible || document.hidden || (this._buildFrame = requestAnimationFrame(() => {
			if (this._buildFrame = 0, this.isConnected && this._renderer && this._visible && !document.hidden) {
				this._drawing = !0;
				try {
					this._needsBuild && (this._needsBuild = !1, this._build()), this._chart.followCamera(this._camera, this._controls.target), this._chart.stackUnits(this._camera), this._renderer.render(this._scene, this._camera);
				} finally {
					this._drawing = !1;
				}
			}
		}));
	}
}, Ku = "\n  :host{display:block;color:var(--primary-text-color,#222);font-family:var(--ha-font-family-body,system-ui)}\n  form,.fields,label{display:grid;gap:12px}label{gap:6px;font-size:14px}\n  [hidden]{display:none!important}\n  fieldset,details{min-width:0;margin:0;border:1px solid var(--divider-color,#8886);\n    border-radius:12px;background:var(--ha-card-background,var(--card-background-color,transparent))}\n  fieldset{padding:8px 14px 14px}\n  legend,summary{font-weight:600}legend{padding:0 5px}\n  summary{padding:12px 14px;cursor:pointer;border-radius:inherit}\n  summary small{display:block;margin:4px 0 0 1.2em;font-weight:400}\n  details>.fields{border-top:1px solid var(--divider-color,#8886);padding:14px}\n", qu = [
	[
		"hours_to_show",
		"Time span (hours)",
		"Includes history and future hours.",
		"0",
		"168",
		"#time"
	],
	[
		"future_hours",
		"Future hours",
		"Must be less than the total time span. Use 0 for history only.",
		"0",
		"",
		"#time"
	],
	[
		"refresh_interval",
		"Refresh interval (seconds)",
		"Minimum 5 seconds. Recorder requests are cached for 60 seconds.",
		"5",
		"",
		"#time"
	],
	[
		"dataset_spacing",
		"Dataset spacing",
		"Choose 0–10. Use 0 to overlay datasets on one plane. The default is 5.",
		"0",
		"10",
		"#time"
	],
	[
		"point_light_intensity",
		"Point light intensity",
		"Brightness of the reflection on energy bars. 0 turns it off; 48 is the default.",
		"0",
		"200",
		"#time"
	],
	...Du.map(([e, t]) => [
		e,
		`${t} (min)`,
		"",
		"-30",
		"30",
		"#shifts"
	]),
	[
		"readout_value_size",
		"Shared size (%)",
		"",
		"50",
		"200",
		"#sizes"
	],
	[
		"current_hour_value_size",
		"Current hour (%)",
		"",
		"50",
		"200",
		"#sizes"
	],
	[
		"price_value_size",
		"Price (%)",
		"",
		"50",
		"200",
		"#sizes"
	]
], Ju = [
	["use_server_time", "Use Home Assistant server time"],
	["separate_readout_sizes", "Use separate sizes"],
	["show_current_hour_readout", "Show current-hour readout"],
	["show_current_hour_label", "Show current-hour label with unit"],
	["show_price_readout", "Show price readout"],
	["show_price_label", "Show price label with unit"],
	["show_dataset_buttons", "Show dataset buttons"],
	["show_camera_buttons", "Show camera preset buttons"],
	["lock_navigation", "Lock drag and zoom"],
	...Eu.map((e) => [`start_${e}`, e[0].toUpperCase() + e.slice(1)])
], Yu = {
	energy_shift_minutes: ["energy_entity", "current_hour_entity"],
	price_shift_minutes: ["price_entity"],
	power_shift_minutes: ["power_entity"],
	voltage_shift_minutes: ["voltage_entity"]
}, Xu = class extends HTMLElement {
	config = {};
	assistant;
	inputs = /* @__PURE__ */ new Map();
	suggestions = /* @__PURE__ */ new Map();
	error;
	missing;
	view;
	constructor() {
		super(), this.attachShadow({ mode: "open" });
	}
	setConfig(e) {
		this.config = { ...e }, this.render();
		let t = {
			...Cu,
			...e
		};
		for (let [e, n] of this.inputs) n.type === "checkbox" ? n.checked = t[e] === !0 : n.value = String(t[e]);
		this.view.value = t.starting_view, this.validate(e, !1), this.updateTimeSummary(), this.updateMissing();
	}
	set hass(e) {
		this.assistant = e, this.updateEntities();
	}
	connectedCallback() {
		this.render();
	}
	render() {
		if (this.inputs.size) return;
		this.shadowRoot.innerHTML = `<style>
      ${Ku}
      details>fieldset{margin:0 14px 14px}fieldset>p{margin-bottom:10px}
      .style-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      input[type=color]{height:40px;padding:4px}
      label:has(input[type=checkbox]){display:flex;align-items:center;justify-content:space-between}
      input[type=checkbox]{width:auto}
      select{font:inherit;color:inherit;background:var(--card-background-color,#fff);padding:8px}
      input{box-sizing:border-box;width:100%;min-width:0;padding:10px;border-radius:8px;
        border:1px solid var(--divider-color,#888);font:inherit;color:inherit;background:var(--card-background-color,#fff)}
      input:focus-visible{outline:2px solid var(--primary-color,#03a9f4);outline-offset:2px}
      p,small{margin:0;font-size:12px;line-height:1.5;color:var(--secondary-text-color,#666)}
      .error{color:var(--error-color,#db4437)}p:empty{display:none}
    </style><form>
      <fieldset><legend>Main energy</legend><div class="fields" id="sensors"></div></fieldset>
      <details><summary>Optional sensors<small id="optional-summary">Current-hour energy, price, power and voltage</small></summary>
        <div class="fields" id="optional"></div></details>
      <details><summary>Graph settings<small id="time-summary"></small></summary>
        <div class="fields" id="time"></div>
        <fieldset><legend>Time shifts</legend><p>Negative moves earlier; positive moves later. Range: −30 to +30 minutes.</p>
        <div class="fields" id="shifts"></div></fieldset></details>
      <details id="appearance"><summary>Dataset appearance</summary><div class="fields" id="styles"></div></details>
      <details><summary>Card appearance</summary><div class="fields" id="layout"></div>
        <fieldset id="size-group"><legend>Readout value size</legend><div class="fields" id="sizes"></div></fieldset>
        <fieldset><legend>Visible on startup</legend><div class="fields" id="startup"></div></fieldset></details>
      <p class="error" role="alert"></p><p class="missing" role="status"></p>
    </form>`;
		let e = this.shadowRoot, t = (t, n, r, i) => {
			let a = document.createElement("label"), o = document.createElement("span");
			o.id = `${t}-label`, o.textContent = n, a.append(o);
			let s = document.createElement("input");
			s.dataset.key = t, s.setAttribute("aria-labelledby", o.id), s.required = !0, s.value = String(this.config[t] ?? Cu[t]);
			let c = document.createElement("small");
			return c.id = `${t}-help`, c.textContent = r, a.append(s), r && (s.setAttribute("aria-describedby", c.id), a.append(c)), e.querySelector(i).append(a), this.inputs.set(t, s), s;
		};
		for (let [n, r, i] of wu) {
			let a = n === "energy_entity", o = t(n, a ? "Sensor" : r, i, a ? "#sensors" : "#optional");
			n !== "energy_entity" && (o.required = !1, o.placeholder = "No sensor selected");
			let s = document.createElement("datalist");
			s.id = `${n}-list`, e.append(s), this.suggestions.set(n, {
				list: s,
				key: ""
			}), o.setAttribute("list", s.id), o.autocomplete = "off", o.spellcheck = !1, o.pattern = "sensor\\.[a-z0-9_]+";
		}
		for (let [e, n, r, i, a, o] of qu) {
			let s = t(e, n, r, o);
			s.type = "number", s.min = i, a && (s.max = a), s.step = e === "dataset_spacing" || o === "#shifts" || o === "#sizes" ? "1" : "any";
		}
		this.error = e.querySelector(".error"), t("title", "Card title", "", "#layout").required = !1, t("now_marker_color", "Now marker colour", "", "#layout").type = "color";
		for (let [n, r] of Ju) {
			let i = t(n, r, "", n === "use_server_time" ? "#time" : n === "separate_readout_sizes" ? "#sizes" : n.startsWith("start_") ? "#startup" : "#layout");
			if (n === "separate_readout_sizes" && e.querySelector("#sizes").prepend(i.closest("label")), i.type = "checkbox", i.required = !1, i.checked = this.config[n] ?? Cu[n], n === "show_current_hour_label" || n === "show_price_label") {
				let e = n === "show_price_label";
				t(e ? "price_label" : "current_hour_label", e ? "Price label text" : "Current-hour label text", "", "#layout").required = !1;
			}
		}
		let n = document.createElement("label");
		n.textContent = "Starting view", this.view = document.createElement("select");
		for (let e of [
			"isometric",
			"front",
			"top"
		]) this.view.add(new Option(e[0].toUpperCase() + e.slice(1), e));
		n.append(this.view), e.querySelector("#layout").append(n);
		for (let n of Eu) {
			let r = document.createElement("div");
			r.className = "style-row", r.id = `${n}-style`, e.querySelector("#styles").append(r);
			let i = n[0].toUpperCase() + n.slice(1);
			t(`${n}_color`, `${i} base colour`, "", `#${r.id}`).type = "color";
			let a = t(`${n}_opacity`, `${i} opacity (%)`, "", `#${r.id}`);
			if (a.type = "number", a.min = "0", a.max = "100", a.step = "1", n !== "energy") {
				let e = t(`${n}_line_width`, `${i} line width (%)`, "", `#${r.id}`);
				e.type = "number", e.min = "25", e.max = "300", e.step = "1";
			}
		}
		this.missing = e.querySelector(".missing");
		let r = e.querySelector("form");
		r.addEventListener("submit", (e) => e.preventDefault()), r.addEventListener("change", () => this.change()), r.addEventListener("input", (e) => {
			e.target instanceof HTMLInputElement && e.target.dataset.key?.endsWith("_entity") && this.updateMissing();
		}), this.updateTimeSummary(), this.updateEntities();
	}
	change() {
		let e = {
			...this.config,
			type: "custom:gleam-energy-graph"
		};
		e.title = this.inputs.get("title").value, e.now_marker_color = this.inputs.get("now_marker_color").value;
		for (let t of ["current_hour_label", "price_label"]) e[t] = this.inputs.get(t).value;
		e.starting_view = this.view.value;
		for (let [t] of Ju) e[t] = this.inputs.get(t).checked;
		for (let [t] of wu) e[t] = this.inputs.get(t).value.trim();
		for (let [t] of qu) e[t] = this.inputs.get(t).valueAsNumber;
		for (let t of Eu) e[`${t}_color`] = this.inputs.get(`${t}_color`).value, e[`${t}_opacity`] = this.inputs.get(`${t}_opacity`).valueAsNumber, t !== "energy" && (e[`${t}_line_width`] = this.inputs.get(`${t}_line_width`).valueAsNumber);
		if (!this.validate(e)) return;
		let t = {
			...Cu,
			...this.config
		};
		e.starting_view === t.starting_view && [...this.inputs.keys()].every((n) => e[n] === t[n]) || (this.config = e, this.updateTimeSummary(), this.updateMissing(), this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: { ...e } },
			bubbles: !0,
			composed: !0
		})));
	}
	validate(e, t = !0) {
		this.view.removeAttribute("aria-invalid");
		for (let e of this.inputs.values()) e.removeAttribute("aria-invalid");
		try {
			return Au(e), this.error.textContent = "", !0;
		} catch (e) {
			if (e instanceof ku) {
				let n = e.field === "starting_view" ? this.view : this.inputs.get(e.field);
				n.setAttribute("aria-invalid", "true");
				let r = n.closest("details");
				r && t && (r.open = !0);
			}
			return this.error.textContent = e instanceof Error ? e.message : "Invalid configuration.", !1;
		}
	}
	updateTimeSummary() {
		let { hours_to_show: e, refresh_interval: t } = {
			...Cu,
			...this.config
		};
		this.shadowRoot.querySelector("#time-summary").textContent = `${e} hours · refresh every ${t} seconds`;
	}
	updateEntities() {
		if (!this.suggestions.size || !this.assistant) return;
		let e = Object.entries(this.assistant.states).filter(([e]) => e.startsWith("sensor.")).sort(([e], [t]) => e.localeCompare(t));
		for (let [t, n] of this.suggestions) {
			let r = e.filter(([, e]) => Ou(t, e.attributes.unit_of_measurement)).map(([e, t]) => [e, String(t.attributes.friendly_name ?? e)]), i = JSON.stringify(r);
			i !== n.key && (n.key = i, n.list.replaceChildren(...r.map(([e, t]) => {
				let n = document.createElement("option");
				return n.value = e, n.label = t, n;
			})));
		}
		this.updateMissing();
	}
	updateMissing() {
		if (!this.missing) return;
		let e = !1, t = !1, n = 0, r = (e) => Tu(e, this.inputs.get(e).value.trim(), this.assistant?.states), i = this.inputs.get("separate_readout_sizes"), a = 0;
		for (let e of ["current_hour", "price"]) {
			let t = this.inputs.get(`show_${e}_readout`), n = this.inputs.get(`show_${e}_label`), o = r(`${e}_entity`), s = o && t.checked;
			s && a++, this.inputs.get(`${e}_value_size`).closest("label").hidden = !s || !i.checked, t.closest("label").hidden = !o, n.closest("label").hidden = !o || !t.checked, this.inputs.get(`${e}_label`).closest("label").hidden = !o || !t.checked || !n.checked;
		}
		this.shadowRoot.querySelector("#size-group").hidden = !a, i.closest("label").hidden = a < 2 && !i.checked, this.inputs.get("readout_value_size").closest("label").hidden = i.checked;
		for (let i of Eu) {
			let a = `${i}_shift_minutes`, o = this.inputs.get(a), s = Yu[a].some(r);
			s && n++, this.inputs.get(`start_${i}`).closest("label").hidden = !s;
			let c = s || o.hasAttribute("aria-invalid"), l = this.shadowRoot.querySelector(`#${i}-style`);
			l.hidden = !s && !l.querySelector("[aria-invalid=true]"), t ||= !l.hidden, o.closest("label").hidden = !c, e ||= c;
		}
		if (this.shadowRoot.querySelector("#shifts").closest("fieldset").hidden = !e, this.inputs.get("show_dataset_buttons").closest("label").hidden = n < 2, this.shadowRoot.querySelector("#startup").closest("fieldset").hidden = n === 0, this.shadowRoot.querySelector("#appearance").hidden = !t, !this.assistant) return;
		let o = {
			...Cu,
			...this.config
		}, s = wu.filter(([e]) => e !== "energy_entity" && !!this.assistant.states[o[e]]).length;
		this.shadowRoot.querySelector("#optional-summary").textContent = s ? `${s} optional sensor${s === 1 ? "" : "s"} available` : "No optional sensors found";
		let c = wu.map(([e]) => o[e]).filter((e) => e && !this.assistant.states[e]);
		this.missing.textContent = c.length ? `Not currently found in Home Assistant: ${c.join(", ")}.` : "";
	}
}, Zu = 225, Qu = 270, $u = Qu * Math.PI / 180;
function ed(e) {
	return (Zu - Qu * e) * Math.PI / 180;
}
function td(e) {
	let t = ((Zu - e * 180 / Math.PI) % 360 + 360) % 360;
	return t <= Qu ? t / Qu : +(t < 315);
}
// src/cards/thermostat/arc.ts
var nd = 120, rd = 10, id = 1.72;
function ad(e) {
	let t = new la(id, e, rd, nd, $u);
	return t.boundingSphere = new vr(new K(), id + e), t;
}
function od(e, t, n) {
	let r = e.getAttribute("position"), i = e.getAttribute("normal");
	for (let e = 0; e <= rd; e++) {
		let a = e / rd * Math.PI * 2, o = Math.cos(a), s = Math.sin(a);
		for (let a = 0; a <= nd; a++) {
			let c = a / nd * $u * t, l = Math.cos(c), u = Math.sin(c), d = e * 121 + a;
			r.setXYZ(d, (id + n * o) * l, (id + n * o) * u, n * s), i.setXYZ(d, o * l, o * u, s);
		}
	}
	r.needsUpdate = i.needsUpdate = !0;
}
// src/cards/thermostat/dial-scene.ts
function sd(e, t = 1.72) {
	let n = ed(e);
	return new K(Math.cos(n) * t, Math.sin(n) * t, 0);
}
function cd(e) {
	return new ba({
		color: e,
		emissive: e,
		roughness: .2,
		metalness: .25
	});
}
var ld = class {
	scene = new Mn();
	disk = new gi(new ta(1.42, 1.48, .14, 96), new xa({
		color: 1059141,
		metalness: .45,
		roughness: .18,
		clearcoat: 1,
		transparent: !0
	}));
	track = new gi(ad(.07), cd(1522517));
	ring = new gi(ad(.08), cd(16777215));
	marker = new gi(new ca(.11, 16, 12), new ii());
	ticks = new qi(new Er(), new Fi({ vertexColors: !0 }));
	#e = new Y(3630207);
	fraction = NaN;
	#t = NaN;
	#n = "";
	constructor() {
		let e = new co(12971519, 2.5);
		e.position.set(-3, 4, 6), this.disk.rotation.x = Math.PI / 2, this.disk.position.z = -.16, this.track.rotation.z = ed(1), this.ticks.geometry.setFromPoints(Array.from({ length: 27 }, (e, t) => [sd(t / 26, 1.92), sd(t / 26, t % 2 ? 1.98 : 2.04)]).flat()), this.ticks.geometry.setAttribute("color", new mr(/* @__PURE__ */ new Float32Array(162), 3)), this.scene.add(new Ga(11922175, 463142, 2), e, this.disk, this.track, this.ring, this.ticks, this.marker);
	}
	update(e, t, n) {
		if (this.disk.material.opacity = e.glass_opacity, this.track.material.emissiveIntensity = this.ring.material.emissiveIntensity = e.glow_intensity, this.ticks.visible = e.show_dial_ticks, (t !== this.fraction || e.ring_thickness !== this.#t) && (od(this.ring.geometry, t, e.ring_thickness), this.ring.geometry.boundingSphere.radius = 1.72 + e.ring_thickness, this.ring.visible = t > 0, this.ring.rotation.z = ed(t), this.marker.position.copy(sd(t)), this.#t = e.ring_thickness), this.#n !== n || this.fraction !== t) {
			let e = this.ring.material.color.set(n);
			this.ring.material.emissive.copy(e), this.marker.material.color.copy(e);
			let r = this.ticks.geometry.getAttribute("color");
			for (let n = 0; n <= 26; n++) {
				let i = n / 26 <= t ? e : this.#e;
				r.setXYZ(n * 2, i.r, i.g, i.b), r.setXYZ(n * 2 + 1, i.r, i.g, i.b);
			}
			r.needsUpdate = !0;
		}
		this.fraction = t, this.#n = n;
	}
	dispose() {
		for (let e of [
			this.disk,
			this.track,
			this.ring,
			this.marker,
			this.ticks
		]) e.geometry.dispose(), e.material.dispose();
		this.scene.clear();
	}
}, ud = class {
	#e = {
		phase: "idle",
		message: ""
	};
	#t;
	get busy() {
		return this.#e.phase !== "idle";
	}
	get message() {
		switch (this.#e.phase) {
			case "idle": return this.#e.message;
			case "sending": return "Sending command…";
			case "awaiting_report": return "Command sent · awaiting reported state";
		}
	}
	reset(e = "") {
		window.clearTimeout(this.#t), this.#e = {
			phase: "idle",
			message: e
		};
	}
	confirm(e) {
		if (!e || ["unknown", "unavailable"].includes(e.state) || this.#e.phase === "idle") return !1;
		let { field: t, value: n } = this.#e.request;
		return (t === "hvac_mode" ? e.state : e.attributes[t]) === n && (this.reset(), !0);
	}
	async send(e, t, n, r) {
		if (this.busy) return;
		let i = {
			phase: "sending",
			request: e
		};
		this.#e = i, this.#t = window.setTimeout(() => {
			this.#e.phase !== "idle" && this.#e.request === e && (this.reset("Command outcome unknown: Home Assistant has not reported the requested state. No automatic retry was made."), r());
		}, t), r();
		try {
			await n();
		} catch (e) {
			if (this.#e !== i) return;
			this.reset(`Command failed: ${e instanceof Error ? e.message : String(e?.message ?? "unknown error")}`), r();
			return;
		}
		this.#e === i && (this.#e = {
			phase: "awaiting_report",
			request: e
		}, r());
	}
}, dd = "Thermostat", fd = [
	["Card size", [
		[
			"card_height",
			"Card height (px, 0 = automatic)",
			0,
			0,
			1600,
			1
		],
		[
			"card_max_width",
			"Maximum card width (px, 0 = fill available width)",
			0,
			0,
			1600,
			1
		],
		[
			"content_overflow",
			"Content inside a fixed-height card",
			"scale",
			["scale", "scroll"]
		]
	]],
	["Display", [
		[
			"show_name",
			"Show name",
			!0
		],
		[
			"show_mode",
			"Show current mode",
			!0
		],
		[
			"show_caption",
			"Show target-temperature caption",
			!0
		],
		[
			"show_room_temperature",
			"Show room-temperature status",
			!0
		],
		[
			"dial_height",
			"Dial height (px)",
			265,
			180,
			420,
			5
		],
		[
			"dial_padding",
			"Dial padding (%)",
			10,
			0,
			30,
			1
		],
		[
			"temperature_font_size",
			"Temperature text size (px)",
			58,
			32,
			88,
			1
		],
		[
			"card_padding",
			"Card padding (px)",
			20,
			8,
			32,
			1
		],
		[
			"corner_radius",
			"Corner radius (px)",
			22,
			0,
			40,
			1
		]
	]],
	["Controls", [
		[
			"interactive_dial",
			"Enable dial dragging and keyboard controls",
			!0
		],
		[
			"show_temperature_buttons",
			"Show temperature +/− buttons",
			!0
		],
		[
			"show_temperature_slider",
			"Show temperature slider",
			!0
		],
		[
			"show_hvac_modes",
			"Show heat-pump mode buttons",
			!0
		],
		[
			"show_fan",
			"Show fan speed selector",
			!0
		],
		[
			"show_presets",
			"Show preset selector",
			!0
		],
		[
			"show_swing",
			"Show swing selector",
			!0
		],
		[
			"advanced_open",
			"Open advanced controls by default",
			!1
		],
		[
			"confirmation_timeout",
			"Reported-state confirmation timeout (seconds)",
			12,
			5,
			60,
			1
		]
	]],
	["Appearance", [
		[
			"heat_color",
			"Heating accent",
			"#ffab70"
		],
		[
			"cool_color",
			"Cooling accent",
			"#65f0ff"
		],
		[
			"off_color",
			"Off / unavailable accent",
			"#8fa9c2"
		],
		[
			"background_color",
			"Background color",
			"#080e24"
		],
		[
			"show_dial_ticks",
			"Show dial tick marks",
			!0
		],
		[
			"glass_opacity",
			"Glass opacity",
			.7,
			.1,
			1,
			.05
		],
		[
			"ring_thickness",
			"Active ring thickness",
			.08,
			.03,
			.15,
			.01
		],
		[
			"glow_intensity",
			"Ring glow intensity",
			.45,
			0,
			1.5,
			.05
		]
	]]
], pd = Object.fromEntries(fd.flatMap(([, e]) => e.map(([e, , t]) => [e, t])));
function md(e) {
	if (!/^climate\.[a-z0-9_]+$/.test(e.entity || "")) throw Error("Gleam Thermostat needs a climate entity.");
	let t = {
		...pd,
		name: dd,
		...e
	};
	for (let [, e] of fd) for (let [n, r, i, a, o] of e) {
		let e = t[n];
		if (typeof a == "number" && !(typeof e == "number" && Number.isFinite(e) && e >= a && e <= o)) throw Error(`${r} must be between ${a} and ${o}.`);
		if (typeof i == "boolean" && typeof e != "boolean") throw Error(`${r} must be true or false.`);
		if (Array.isArray(a) && !a.some((t) => t === e)) throw Error(`${r} must be one of: ${a.join(", ")}.`);
		if (typeof i == "string" && !a && !(typeof e == "string" && /^#[0-9a-f]{6}$/i.test(e))) throw Error(`${r} must be a six-digit hex color.`);
	}
	if (t.card_height > 0 && t.card_height < 120) throw Error("Card height must be 0 (automatic) or at least 120 px.");
	if (t.card_max_width > 0 && t.card_max_width < 200) throw Error("Maximum card width must be 0 (available width) or at least 200 px.");
	if (typeof t.name != "string") throw Error("Display name must be text.");
	return t;
}
// src/cards/thermostat/commands.ts
var hd = {
	set_temperature: {
		field: "temperature",
		modes: null,
		feature: 1
	},
	set_hvac_mode: {
		field: "hvac_mode",
		modes: "hvac_modes",
		feature: 0
	},
	set_fan_mode: {
		field: "fan_mode",
		modes: "fan_modes",
		feature: 8
	},
	set_preset_mode: {
		field: "preset_mode",
		modes: "preset_modes",
		feature: 16
	},
	set_swing_mode: {
		field: "swing_mode",
		modes: "swing_modes",
		feature: 32
	}
}, gd = (e) => e == null || e === "" || !Number.isFinite(Number(e)) ? null : Number(e);
function _d(e) {
	let t = e?.attributes ?? {};
	return {
		min: gd(t.min_temp),
		max: gd(t.max_temp),
		step: gd(t.target_temp_step) || 1
	};
}
function vd(e, t) {
	let { min: n, max: r, step: i } = _d(t);
	return n === null || r === null || i <= 0 ? NaN : Number(Math.min(r, Math.max(n, n + Math.round((e - n) / i) * i)).toFixed(3));
}
function yd(e, t, n) {
	if (!e || ["unknown", "unavailable"].includes(e.state)) return null;
	let r = hd[t];
	if (!r) return null;
	let { field: i, modes: a, feature: o } = r, s = e.attributes, c = n[i];
	if (o && !(Number(s.supported_features) & o)) return null;
	if (t === "set_temperature") {
		let { min: t, max: n } = _d(e);
		if (t === null || n === null || n <= t || typeof c != "number" || !Number.isFinite(c) || vd(c, e) !== c) return null;
	} else {
		let e = a ? s[a] : void 0;
		if (!Array.isArray(e) || !e.includes(c)) return null;
	}
	return {
		field: i,
		value: c,
		unchanged: (i === "hvac_mode" ? e.state : s[i]) === c
	};
}
function bd(e, t, n, r) {
	return e.callService("climate", n, {
		...r,
		entity_id: t
	});
}
// src/cards/thermostat/gleam-thermostat.js
var xd = {
	off: "Off",
	heat_cool: "Heat / Cool",
	auto: "Auto",
	heat: "Heat",
	cool: "Cool",
	fan_only: "Fan",
	dry: "Dry"
}, Sd = [
	"temperature",
	"temperature_unit",
	"min_temp",
	"max_temp",
	"target_temp_step",
	"supported_features",
	"fan_mode",
	"preset_mode",
	"swing_mode"
], Cd = [
	"hvac_modes",
	"fan_modes",
	"preset_modes",
	"swing_modes"
], wd = (e, t) => e === t || Array.isArray(e) && Array.isArray(t) && e.length === t.length && e.every((e, n) => e === t[n]), Td = (e) => e == null || e === "" ? null : Number.isFinite(Number(e)) ? Number(e) : null, Ed = class extends HTMLElement {
	static getConfigElement() {
		return document.createElement("gleam-thermostat-editor");
	}
	static getStubConfig(e, t = [], n = []) {
		return {
			entity: [
				...t,
				...n,
				...Object.keys(e?.states || {})
			].find((e) => e.startsWith("climate.")) || "climate.heat_pump",
			name: dd
		};
	}
	constructor() {
		super(), this.attachShadow({ mode: "open" }), this._command = new ud(), this._draft = null;
	}
	setConfig(e) {
		let t = md(e);
		this._config && this._config.entity !== e.entity && (this._command.reset(), this._draft = null, this._drag = null), this._config = t, this.shadowRoot.querySelector("details") && (this.shadowRoot.querySelector("details").open = this._config.advanced_open), this.isConnected && (this._mount(), this._applyConfig(), this._update());
	}
	set hass(e) {
		let t = this._hass;
		this._hass = e;
		let n = e.states[this._config?.entity];
		if (t?.states[this._config?.entity] === n && t?.config?.unit_system?.temperature === e.config?.unit_system?.temperature) return;
		let r = this._command.confirm(n);
		r && (this._draft = null);
		let i = t?.states[this._config?.entity];
		!r && i && n && i.state === n.state && t.config?.unit_system?.temperature === e.config?.unit_system?.temperature && Sd.every((e) => i.attributes[e] === n.attributes[e]) && Cd.every((e) => wd(i.attributes[e], n.attributes[e])) ? this.isConnected && this._events && i.attributes.current_temperature !== n.attributes.current_temperature && this._renderAmbient() : this.isConnected && this._update();
	}
	connectedCallback() {
		this._config && (this._mount(), this._applyConfig(), this._update());
	}
	disconnectedCallback() {
		this._events?.abort(), this._resize?.disconnect(), this._layoutResize?.disconnect(), this._intersection?.disconnect(), cancelAnimationFrame(this._dialFrame), this._dialFrame = null, cancelAnimationFrame(this._layoutFrame), this._layoutFrame = null, this._command.reset(), this._draft = null, this._drag = null, this._dial?.dispose(), this._dial = null, this._dialRenderKey = null, this._renderer?.dispose(), this._renderer?.forceContextLoss(), this._renderer = null;
	}
	getCardSize() {
		return this._config?.card_height ? Math.ceil(this._config.card_height / 50) : 10;
	}
	getGridOptions() {
		return {
			columns: 12,
			rows: "auto"
		};
	}
	_state() {
		return this._hass?.states[this._config.entity];
	}
	_available() {
		return this._state() && !["unknown", "unavailable"].includes(this._state().state);
	}
	_bounds() {
		return _d(this._state());
	}
	_targetAllowed() {
		let { min: e, max: t } = this._bounds();
		return this._available() && !!((this._state().attributes.supported_features || 0) & 1) && e !== null && t !== null && t > e;
	}
	_round(e) {
		return vd(e, this._state());
	}
	_mount() {
		if (this._events && !this._events.signal.aborted) return;
		this._modeKey = null, this._advancedKey = null, this.shadowRoot.innerHTML = `
      <style>
        ${fu}
        :host{min-width:0}
        ha-card{width:100%;min-width:0;min-height:0;padding:0;margin-inline:auto;
          --gleam-radius:var(--radius,22px);--gleam-surface:var(--background,#080e24);--accent:#ffab70}
        .viewport{position:relative;width:100%;min-width:0}
        .content{display:flow-root;width:100%;padding:var(--padding,20px);transform-origin:top left}
        ha-card.fixed .viewport{height:100%;overflow:auto;overscroll-behavior:contain}
        ha-card.fixed.scale .viewport{overflow:hidden;overflow:clip}
        ha-card.fixed.scale .content{position:absolute}
        header{display:flex;align-items:center;justify-content:space-between;gap:12px}
        header>*{min-width:0;overflow-wrap:anywhere}
        h2{margin:0;font-size:19px;font-weight:500}.mode{font-size:11px;letter-spacing:.1em;color:var(--accent);text-transform:uppercase}
        .dial{height:var(--dial-height,265px);position:relative;touch-action:none;cursor:pointer;border-radius:20px}
        canvas{width:100%;height:100%;display:block}
        .reading{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;
          pointer-events:none;gap:6px}.caption{font-size:10px;text-transform:uppercase;letter-spacing:.14em;color:var(--gleam-muted,#8ba8c6)}
        .temperature{font-size:var(--temperature-size,58px);line-height:1.1;letter-spacing:-.06em;font-weight:400;color:var(--accent)}
        .unit{font-size:22px;letter-spacing:0}.ambient{font-size:11px;color:var(--gleam-muted,#8ba8c6);text-align:center}
        .adjust{display:flex;align-items:center;justify-content:center;gap:20px;margin-top:-8px}
        button{padding-inline:12px}
        .adjust button{font-size:24px;width:46px;height:42px;padding:0}
        .range-wrap{margin:14px 8px 12px}.range-wrap label{display:block;color:#8ba8c6;font-size:10px;margin-bottom:8px}
        input[type=range]{width:100%;accent-color:var(--accent);cursor:pointer}
        .modes{display:flex;justify-content:center;gap:6px;flex-wrap:wrap}
        button[aria-pressed=true]{border-color:var(--accent);color:var(--accent);background:#15243a}
        button:disabled,select:disabled,input:disabled{opacity:.35;cursor:not-allowed}
        details{margin-top:16px;border-top:1px solid #20324b;padding-top:12px}
        summary{cursor:pointer;font-size:12px;color:#9bb6cf}
        .advanced{display:grid;gap:12px;margin-top:14px}.advanced label{display:grid;gap:6px;color:#9bb6cf;font-size:11px}
        select{width:100%;padding:9px 12px;border-radius:12px}
        .message{margin-top:12px;color:#efbb85;font-size:11px;line-height:1.5;white-space:pre-line;overflow-wrap:anywhere}
        .message:empty{display:none}.unavailable .temperature{color:#718199}
      </style>
      <ha-card><span class="experimental">Experimental</span><div class="viewport"><div class="content"><header class="badge-clearance"><div><h2></h2></div><span class="mode"></span></header>
        <div class="dial" role="slider" tabindex="0" aria-label="Target temperature">
          <div class="reading"><span class="caption">Target temperature</span>
            <div class="temperature"><span class="value">—</span><span class="unit"> °C</span></div>
            <span class="ambient"></span></div></div>
        <div class="adjust"><button class="minus" aria-label="Decrease target temperature">−</button>
          <button class="plus" aria-label="Increase target temperature">+</button></div>
        <div class="range-wrap"><label for="target">Target temperature</label><input id="target" type="range"></div>
        <div class="modes" role="group" aria-label="Heat pump mode"></div>
        <details><summary>Fan, presets & swing</summary><div class="advanced"></div></details>
        <div class="message" role="status" aria-live="polite"></div></div></div></ha-card>`, this._events = new AbortController();
		let e = this._events.signal;
		this._visible = !1, this._graphicsError = "", this._intersection = new IntersectionObserver((e) => {
			this._visible = e.at(-1).isIntersecting, this._drawDial();
		}), this._intersection.observe(this), document.addEventListener("visibilitychange", () => {
			document.hidden || this._drawDial();
		}, { signal: e }), this.shadowRoot.querySelector("details").open = this._config.advanced_open;
		let t = (t, n, r) => this.shadowRoot.querySelector(t).addEventListener(n, r, { signal: e });
		t("details", "toggle", () => this._scheduleLayout()), this._layoutResize = new ResizeObserver(() => this._scheduleLayout()), this._layoutResize.observe(this.shadowRoot.querySelector(".viewport")), this._layoutResize.observe(this.shadowRoot.querySelector(".content")), t(".minus", "click", () => this._nudge(-1)), t(".plus", "click", () => this._nudge(1)), t("#target", "input", (e) => {
			!this._command.busy && this._targetAllowed() && this._preview(this._round(Number(e.target.value)));
		}), t("#target", "change", (e) => void this._send("set_temperature", { temperature: this._round(Number(e.target.value)) }));
		let n = this.shadowRoot.querySelector(".dial");
		n.addEventListener("keydown", (e) => {
			if ([
				"ArrowUp",
				"ArrowRight",
				"ArrowDown",
				"ArrowLeft",
				"Home",
				"End"
			].includes(e.key)) {
				if (e.preventDefault(), !this._config.interactive_dial || !this._targetAllowed() || this._command.busy) return;
				let { min: t, max: n } = this._bounds();
				e.key === "Home" || e.key === "End" ? this._send("set_temperature", { temperature: e.key === "Home" ? t : n }) : this._nudge(["ArrowUp", "ArrowRight"].includes(e.key) ? 1 : -1);
			}
		}, { signal: e }), n.addEventListener("pointerdown", (e) => {
			if (e.button !== 0 || !this._config.interactive_dial || !this._targetAllowed() || this._command.busy) return;
			let t = n.getBoundingClientRect(), r = e.clientX - t.left - t.width / 2, i = e.clientY - t.top - t.height / 2;
			Math.hypot(r, i) < Math.min(t.width, t.height) * .22 || (this._drag = e.pointerId, n.setPointerCapture(e.pointerId), this._previewPointer(e));
		}, { signal: e }), n.addEventListener("pointermove", (e) => {
			this._drag === e.pointerId && this._previewPointer(e);
		}, { signal: e }), n.addEventListener("pointerup", (e) => {
			this._drag === e.pointerId && (this._drag = null, n.releasePointerCapture(e.pointerId), this._draft !== null && this._send("set_temperature", { temperature: this._draft }));
		}, { signal: e }), n.addEventListener("pointercancel", () => {
			this._drag = null, this._draft = null, this._update();
		}, { signal: e });
	}
	_initGraphics() {
		let e = this.shadowRoot.querySelector(".dial");
		try {
			this._renderer = new Ul({
				antialias: !0,
				alpha: !0,
				powerPreference: "low-power"
			}), this._renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75)), this._renderer.setClearColor(330004, 0), e.prepend(this._renderer.domElement), this._dial = new ld(), this._camera = new oo(-3, 3, 2.6, -2.6, .1, 30), this._camera.position.set(0, .35, 10), this._camera.lookAt(0, 0, 0), this._resize = new ResizeObserver(() => this._drawDial()), this._resize.observe(e);
		} catch {
			this._graphicsError = "3D graphics unavailable. Temperature buttons, slider and mode controls still work.", this._update();
		}
	}
	_scheduleLayout() {
		this.isConnected && this._config.card_height && this._layoutFrame == null && (this._layoutFrame = requestAnimationFrame(() => {
			this._layoutFrame = null, this._layoutContent();
		}));
	}
	_layoutContent() {
		let e = this.shadowRoot.querySelector(".viewport"), t = this.shadowRoot.querySelector(".content");
		if (!e || !t) return;
		let n = this._config;
		if (!n.card_height) {
			t.style.width = "", t.style.transform = "", t.style.left = "", t.style.top = "";
			return;
		}
		let r = e.clientWidth, i = e.clientHeight;
		if (!(r && i)) return;
		let a = Math.max(r, Math.ceil(n.dial_height * .84 + n.card_padding * 2));
		t.style.width !== `${a}px` && (t.style.width = `${a}px`);
		let o = t.scrollWidth;
		o > a && (a = o, t.style.width = `${a}px`);
		let s = t.offsetHeight, c = n.content_overflow === "scale" ? Math.min(1, r / a, i / s) : 1;
		t.style.transform = n.content_overflow === "scale" ? `scale(${c})` : "", t.style.left = n.content_overflow === "scale" ? `${Math.max(0, (r - a * c) / 2)}px` : "", t.style.top = n.content_overflow === "scale" ? `${Math.max(0, (i - s * c) / 2)}px` : "", this._drawDial();
	}
	_previewPointer(e) {
		let t = this.shadowRoot.querySelector(".dial").getBoundingClientRect(), n = e.clientX - t.left - t.width / 2, r = t.height / 2 - (e.clientY - t.top), i = td(Math.atan2(r, n)), { min: a, max: o } = this._bounds();
		this._preview(this._round(a + i * (o - a)));
	}
	_preview(e) {
		e !== this._draft && (this._draft = e, this._renderReading(), this._drawDial());
	}
	_nudge(e) {
		if (!this._targetAllowed() || this._command.busy) return;
		let t = Td(this._state().attributes.temperature);
		t !== null && this._send("set_temperature", { temperature: this._round(t + e * this._bounds().step) });
	}
	async _send(e, t) {
		if (this._command.busy || !this._available()) return;
		let n = yd(this._state(), e, t);
		if (!n) return;
		let { field: r, value: i } = n;
		n.unchanged ? (this._draft = null, this._update()) : await this._command.send({
			field: r,
			value: i
		}, this._config.confirmation_timeout * 1e3, () => bd(this._hass, this._config.entity, e, t), () => {
			this._command.busy || (this._draft = null), this._update();
		});
	}
	_renderReading() {
		let e = this._state()?.attributes || {}, t = e.temperature_unit || this._hass?.config?.unit_system?.temperature || "°C", n = this._draft ?? Td(e.temperature);
		this.shadowRoot.querySelector(".value").textContent = n === null ? "—" : String(n), this.shadowRoot.querySelector(".unit").textContent = ` ${t}`;
		let r = this.shadowRoot.querySelector(".dial"), i = this._bounds();
		r.setAttribute("aria-valuemin", i.min ?? "0"), r.setAttribute("aria-valuemax", i.max ?? "0"), n === null ? r.removeAttribute("aria-valuenow") : r.setAttribute("aria-valuenow", String(n)), r.setAttribute("aria-valuetext", n === null ? "Target not reported" : `${n} ${t}${this._draft === null ? "" : " preview"}`), r.setAttribute("aria-disabled", String(!this._config.interactive_dial || !this._targetAllowed() || this._command.busy)), r.tabIndex = this._config.interactive_dial ? 0 : -1;
	}
	_renderAmbient() {
		let e = this._state()?.attributes || {};
		this.shadowRoot.querySelector(".ambient").textContent = Td(e.current_temperature) === null ? "Room temperature not reported" : `Room ${e.current_temperature} ${e.temperature_unit || this._hass?.config?.unit_system?.temperature || "°C"}`;
	}
	_applyConfig() {
		let e = this.shadowRoot.querySelector("ha-card"), t = this._config;
		e.classList.toggle("fixed", t.card_height > 0), e.classList.toggle("scale", t.content_overflow === "scale"), e.style.height = t.card_height ? `${t.card_height}px` : "auto", e.style.maxWidth = t.card_max_width ? `${t.card_max_width}px` : "100%";
		for (let [n, r] of Object.entries({
			"--padding": `${t.card_padding}px`,
			"--radius": `${t.corner_radius}px`,
			"--dial-height": `${t.dial_height}px`,
			"--temperature-size": `${t.temperature_font_size}px`,
			"--background": t.background_color
		})) e.style.setProperty(n, r);
		for (let [e, n] of [
			["h2", t.show_name],
			[".mode", t.show_mode],
			[".caption", t.show_caption],
			[".ambient", t.show_room_temperature],
			[".adjust", t.show_temperature_buttons],
			[".range-wrap", t.show_temperature_slider],
			[".modes", t.show_hvac_modes]
		]) this.shadowRoot.querySelector(e).hidden = !n;
		this.shadowRoot.querySelector("header").hidden = !t.show_name && !t.show_mode, this.shadowRoot.querySelector("h2").textContent = this._config.name, t.card_height ? this._scheduleLayout() : this._layoutContent();
	}
	_update() {
		let e = this.shadowRoot.querySelector("ha-card");
		if (!this._config || !e) return;
		let t = this._config, n = this._state(), r = n?.attributes || {}, i = this._command.busy, a = this._available();
		e.classList.toggle("unavailable", !a), e.style.setProperty("--accent", !a || n?.state === "off" ? t.off_color : n?.state === "cool" ? t.cool_color : t.heat_color), this.shadowRoot.querySelector(".mode").textContent = xd[n?.state] || n?.state || "Unavailable", this._renderReading(), this._renderAmbient();
		let o = this._bounds(), s = Td(r.temperature), c = this.shadowRoot.querySelector("#target");
		c.min = o.min ?? 0, c.max = o.max ?? 0, c.step = o.step, c.value = this._draft ?? s ?? o.min ?? 0, c.disabled = !this._targetAllowed() || i, this.shadowRoot.querySelector(".minus").disabled = c.disabled || s === null || s <= o.min, this.shadowRoot.querySelector(".plus").disabled = c.disabled || s === null || s >= o.max;
		let l = this.shadowRoot.querySelector(".modes"), u = JSON.stringify(r.hvac_modes || []);
		if (this._modeKey !== u) {
			this._modeKey = u, l.replaceChildren();
			for (let e of r.hvac_modes || []) {
				let t = document.createElement("button");
				t.textContent = xd[e] || e, t.dataset.mode = e, t.addEventListener("click", () => void this._send("set_hvac_mode", { hvac_mode: e }), { signal: this._events.signal }), l.append(t);
			}
		}
		for (let e of l.children) e.disabled = !a || i, e.setAttribute("aria-pressed", String(e.dataset.mode === n?.state));
		let d = [
			[
				"fan_mode",
				"Fan speed",
				r.fan_modes,
				8
			],
			[
				"preset_mode",
				"Preset",
				r.preset_modes,
				16
			],
			[
				"swing_mode",
				"Swing",
				r.swing_modes,
				32
			]
		].filter(([e, , n, i]) => ({
			fan_mode: t.show_fan,
			preset_mode: t.show_presets,
			swing_mode: t.show_swing
		})[e] && (r.supported_features || 0) & i && n?.length), f = JSON.stringify(d), p = this.shadowRoot.querySelector(".advanced");
		if (f !== this._advancedKey) {
			this._advancedKey = f, p.replaceChildren();
			for (let [e, t, n] of d) {
				let r = document.createElement("label");
				r.append(document.createTextNode(t));
				let i = document.createElement("select");
				i.dataset.field = e;
				for (let e of n) {
					let t = document.createElement("option");
					t.value = e, t.textContent = e, i.append(t);
				}
				i.addEventListener("change", () => void this._send(`set_${e}`, { [e]: i.value }), { signal: this._events.signal }), r.append(i), p.append(r);
			}
		}
		this.shadowRoot.querySelector("details").hidden = !d.length;
		for (let e of p.querySelectorAll("select")) e.disabled = !a || i, e.value = r[e.dataset.field] ?? "";
		this.shadowRoot.querySelector(".message").textContent = [
			a ? "" : "Heat pump is unavailable. Controls are disabled.",
			this._command.message,
			this._graphicsError || ""
		].filter(Boolean).join("\n"), this._drawDial();
	}
	_drawDial() {
		this.isConnected && this._visible && !document.hidden && !this._graphicsError && this._dialFrame == null && (this._dialFrame = requestAnimationFrame(() => {
			this._dialFrame = null, this.isConnected && this._visible && !document.hidden && this._renderDial();
		}));
	}
	_renderDial() {
		if (this._renderer || this._initGraphics(), !this._renderer || !this._dial) return;
		let { width: e, height: t } = this.shadowRoot.querySelector(".dial").getBoundingClientRect(), n = Math.round(e), r = Math.round(t);
		if (!(n && r)) return;
		let i = this._state(), a = i?.attributes || {}, o = this._bounds(), s = this._config, c = this._draft ?? Td(a.temperature), l = c !== null && o.max > o.min ? Math.max(0, Math.min(1, (c - o.min) / (o.max - o.min))) : 0, u = !this._available() || i.state === "off" ? s.off_color : i.state === "cool" ? s.cool_color : s.heat_color, d = JSON.stringify([
			u,
			s.glass_opacity,
			s.glow_intensity,
			s.ring_thickness,
			s.show_dial_ticks
		]), f = JSON.stringify([
			d,
			l,
			n,
			r,
			s.dial_padding
		]);
		if (f === this._dialRenderKey) return;
		n === this._bufferWidth && r === this._bufferHeight && this._dialRenderKey || (this._renderer.setSize(n, r, !1), this._bufferWidth = n, this._bufferHeight = r);
		let p = Math.max(2.08 / (1 - this._config.dial_padding / 50), 2.08 * r / n);
		this._camera.top = p, this._camera.bottom = -p, this._camera.left = -p * n / r, this._camera.right = p * n / r, this._camera.updateProjectionMatrix(), this._dial.update(s, l, u), this._dialRenderKey = f, this._renderer.render(this._dial.scene, this._camera);
	}
}, Dd = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" });
	}
	setConfig(e) {
		this._config = { ...e }, this._render();
	}
	set hass(e) {
		this._hass = e, this._entities();
	}
	connectedCallback() {
		this._render();
	}
	_entities() {
		let e = this.shadowRoot.querySelector("datalist");
		if (!e || !this._hass) return;
		let t = Object.keys(this._hass.states).filter((e) => e.startsWith("climate.")).sort();
		if (JSON.stringify(t) !== this._entityKey) {
			this._entityKey = JSON.stringify(t), e.replaceChildren();
			for (let n of t) {
				let t = document.createElement("option");
				t.value = n, t.label = this._hass.states[n].attributes.friendly_name || n, e.append(t);
			}
		}
	}
	_change(e, t) {
		let n = { ...this._config };
		t === void 0 ? delete n[e] : n[e] = t, md(n), this._config = n, this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: n },
			bubbles: !0,
			composed: !0
		}));
	}
	_render() {
		if (this._config) {
			if (!this.shadowRoot.querySelector("form")) {
				this.shadowRoot.innerHTML = "<style>\n        :host{display:block;color:var(--primary-text-color);font-family:var(--ha-font-family-body,system-ui)}\n        form{display:grid;gap:14px}fieldset{border:1px solid var(--divider-color,#8885);border-radius:12px;padding:14px;min-width:0}\n        legend{padding:0 6px;font-weight:500}.fields{display:grid;gap:14px}\n        label{display:grid;gap:6px;font-size:13px}label.toggle{display:flex;justify-content:space-between;align-items:center}\n        input,select{font:inherit;color:var(--primary-text-color);background:var(--card-background-color,#fff);\n          border:1px solid var(--divider-color,#888);border-radius:7px;padding:8px;width:100%;box-sizing:border-box}\n        input[type=checkbox]{width:22px;height:22px;accent-color:var(--primary-color)}\n        input[type=color]{height:38px;padding:3px}input:focus-visible,button:focus-visible{outline:2px solid var(--primary-color)}\n        p{font-size:12px;line-height:1.6;color:var(--secondary-text-color);margin:0}\n        button{font:inherit;padding:8px;border-radius:8px;border:1px solid var(--divider-color,#888);cursor:pointer;\n          color:var(--primary-text-color);background:var(--secondary-background-color,#eee)}\n        .error{color:var(--error-color,#c00)}\n      </style><form></form>";
				let e = this.shadowRoot.querySelector("form");
				e.addEventListener("submit", (e) => e.preventDefault());
				let t = document.createElement("fieldset");
				t.innerHTML = "<legend>Entity & name</legend><div class=\"fields\">\n        <label>Climate entity<input data-key=\"entity\" list=\"climates\" required placeholder=\"climate.livingroom_hvac\"></label>\n        <datalist id=\"climates\"></datalist><label>Display name<input data-key=\"name\" type=\"text\"></label>\n        <p>The selected real climate entity supplies temperature bounds, step size, units and supported modes.</p></div>", e.append(t);
				for (let [t, n] of fd) {
					let r = document.createElement("fieldset"), i = document.createElement("legend");
					i.textContent = t, r.append(i);
					let a = document.createElement("div");
					a.className = "fields";
					for (let [e, t, r, i, o, s] of n) {
						let n = document.createElement("label");
						n.append(document.createTextNode(t));
						let c = document.createElement(Array.isArray(i) ? "select" : "input");
						if (c.dataset.key = e, Array.isArray(i)) for (let e of i) {
							let t = document.createElement("option");
							t.value = e, t.textContent = e === "scale" ? "Scale content to fit" : "Scroll inside card", c.append(t);
						}
						else c.type = typeof r == "boolean" ? "checkbox" : typeof r == "number" ? "number" : "color";
						c.type === "checkbox" && (n.className = "toggle"), c.type === "number" && (c.min = i, c.max = o, c.step = s), n.append(c), a.append(n);
					}
					if (t === "Card size") {
						let e = document.createElement("p");
						e.textContent = "0 keeps automatic height / available width. Fixed height: 120–1600 px; maximum width: 200–1600 px. Only fixed-height cards scale or scroll. Scaling shrinks every control; scrolling keeps element sizes. Width never exceeds the dashboard column.", a.append(e);
					}
					if (t === "Display") {
						let e = document.createElement("p");
						e.textContent = "Dial padding controls empty space inside the 3D dial area: 10% keeps the original framing; 0% fits the ring closely. Dial height and card dimensions stay unchanged. Narrow columns may limit the ring size.", a.append(e);
					}
					r.append(a), e.append(r);
				}
				let n = document.createElement("p");
				n.className = "error", n.setAttribute("role", "status"), e.append(n);
				let r = document.createElement("p");
				r.textContent = "Changing card settings never sends heat-pump commands. Hidden controls do not change device capabilities. Unreported room temperature is never fabricated.", e.append(r);
				let i = document.createElement("button");
				i.type = "button", i.textContent = "Reset display & control options to defaults", i.addEventListener("click", () => {
					let e = { ...this._config };
					for (let t of Object.keys(pd)) delete e[t];
					this._config = e, this._render(), this.dispatchEvent(new CustomEvent("config-changed", {
						detail: { config: e },
						bubbles: !0,
						composed: !0
					}));
				}), e.append(i), e.addEventListener("change", (e) => {
					let t = e.target, r = t.dataset.key;
					if (r) {
						if (!t.checkValidity()) n.textContent = "Choose a valid climate entity or a value within the displayed limits.";
						else {
							n.textContent = "";
							try {
								this._change(r, t.type === "checkbox" ? t.checked : t.type === "number" ? t.value === "" ? void 0 : Number(t.value) : t.value);
							} catch (e) {
								n.textContent = e.message;
							}
						}
					}
				});
			}
			for (let e of this.shadowRoot.querySelectorAll("[data-key]")) {
				let t = this._config[e.dataset.key] ?? pd[e.dataset.key] ?? (e.dataset.key === "name" ? "Thermostat" : "");
				e.type === "checkbox" ? e.checked = t : e.value !== String(t) && (e.value = t);
			}
			this._entities();
		}
	}
}, Od = Array.from({ length: 16 }, (e, t) => (t + .5) * 30 / 16), kd = (e) => 78 - e * 1.4, Ad = (e) => 238 + e * .6, jd = kd(30), Md = Ad(30), Nd = 260, Pd = 188, Fd = 158;
function Id(e) {
	return e === "left" ? -8 : 64;
}
var Ld = (e) => `${(Fd - Id(e)) / Nd * 100}%`;
function Rd(e) {
	let t = e ? Pd : 0, n = t / 2, r = e ? Id(e) : 0;
	return `<svg viewBox="${e ? `${r} 0 ${Nd}` : "0 0 320"} 174" aria-hidden="true">
  <style>
    .flat-shell,:host([flat-roof]) .pitched-shell{display:none}
    :host([flat-roof]) .flat-shell{display:inline}
    :host([lamp-off]) :is(.interior,.spill,.air){opacity:0}
    .interior rect{fill:var(--lamp-color,#ffe1aa)}
    :host([tinted]) #interior stop:nth-child(1){stop-color:color-mix(in srgb,var(--lamp-color) 74%,#0d1011)}
    :host([tinted]) #interior stop:nth-child(2){stop-color:color-mix(in srgb,var(--lamp-color) 44%,#0d1011)}
    :host([tinted]) #interior stop:nth-child(3){stop-color:color-mix(in srgb,var(--lamp-color) 12%,#0d1011)}
    :host([tinted]) :is(#spill,#air-scatter) stop{stop-color:var(--lamp-color)}
  </style>
  <defs>
    <radialGradient id="interior" cx=".5" cy="0" r=".95"><stop stop-color="#be905d"/><stop offset=".35" stop-color="#785434"/><stop offset="1" stop-color="#292321"/></radialGradient>
    <linearGradient id="spill" gradientUnits="userSpaceOnUse" x1="0" y1="142" x2="0" y2="172"><stop stop-color="#ffc27c" stop-opacity=".58"/><stop offset=".72" stop-color="#efa155" stop-opacity=".16"/><stop offset="1" stop-color="#efa155" stop-opacity="0"/></linearGradient>
    ${e ? `<clipPath id="bay-shell"><rect x="${r}" width="260" height="174"/></clipPath>` : ""}
    <linearGradient id="metal" x2="1" y2=".3"><stop stop-color="#153249"/><stop offset=".6" stop-color="#225166"/><stop offset="1" stop-color="#10293f"/></linearGradient>
    <clipPath id="opening"><path d="M78 56H238V142H78Z"/></clipPath>
    <radialGradient id="air-scatter" r=".64"><stop stop-color="#ffdaa2" stop-opacity=".027"/><stop offset=".65" stop-color="#ffc788" stop-opacity=".019"/><stop offset="1" stop-color="#ffc078" stop-opacity="0"/></radialGradient>
  </defs>
  <g ${e ? "clip-path=\"url(#bay-shell)\"" : ""}><g transform="translate(${e === "right" ? -t : 0} 0)">
    <path class="pitched-shell" d="M48 142V48l${110 + n} -31 ${109 + n} 31v94H48Z" fill="#0c192b" stroke="#578ca3"/>
    <path class="flat-shell" d="M48 142V48H${267 + t}v94Z" fill="#0c192b" stroke="#578ca3"/>
    <path d="M${267 + t} 48l15-10v94l-15 10Z" fill="#132338" stroke="#395e78"/>
    <path class="pitched-shell" d="M40 49l${117 + n} -35 ${117 + n} 35 15-10L${172 + n} 4 55 39Z" fill="#142c40" stroke="#6dabbc"/>
    <g class="flat-shell" stroke="#6dabbc">
      <path d="M40 44l15-10h${234 + t}l-15 10Z" fill="#203950"/>
      <path d="M40 44h${234 + t}l15-10v5l-15 10H40Z" fill="#142c40"/>
    </g>
  </g></g>
  <path d="M74 142V52h168v90" fill="#08101d" stroke="#7caabc"/>
  <g class="interior" clip-path="url(#opening)">
    <path d="M78 56H238V142H78Z" fill="url(#interior)"/>
    <rect x="134" y="59" width="48" height="2.5" rx="1.25" fill="#ffe1aa"/>
  </g>
  <g class="spill"><clipPath id="cast"><rect class="lit-depth" x="${jd}" y="142" width="${Md - jd}" height="0"/></clipPath><g clip-path="url(#cast)"><path d="M78 142H238L${Md} 172H${jd}Z" fill="url(#spill)"/></g></g>
  <g clip-path="url(#opening)">
    <rect class="door-skin" x="78" y="56" width="160" height="86" fill="#18394d"/>
    ${Array.from({ length: 6 }, (e, t) => `<g class="panel" transform="translate(78 ${56 + t * 14.4})"><rect width="160" height="14.4" fill="url(#metal)"/><path d="M0 .6h160M41 4v6m39-6v6m39-6v6" fill="none" stroke="#67a4b4" stroke-width=".7" opacity=".48"/></g>`).join("")}
  </g>
  <g class="air" fill="url(#air-scatter)">${Od.map((e) => `<rect x="${kd(e)}" width="${Ad(e) - kd(e)}" height="0"/>`).join("")}</g>
</svg>`;
}
function zd(e) {
	let t = [...e.querySelectorAll(".panel")], n = e.querySelector(".door-skin"), r = e.querySelector(".lit-depth"), i = [...e.querySelectorAll(".air rect")], a = -1;
	return (e) => {
		if (e === a) return;
		a = e;
		let o = 14.4, s = 56;
		t.forEach((t, n) => {
			let r = (n - 6 * e) * o, i = Math.max(0, Math.min(1, -r / o)), a = 56 + Math.max(-14.4, r), c = 1 - .8 * i;
			t.setAttribute("transform", `translate(78 ${a}) scale(1 ${c})`), s = Math.max(s, a + o * c);
		});
		let c = Math.max(0, 142 - s);
		n.setAttribute("height", String(Math.min(86, s - 56)));
		let l = Math.min(30, 24 * c / (150 - c));
		r.setAttribute("height", String(l)), i.forEach((e, t) => {
			let n = Od[t], r = Math.max(0, c - (150 - c) * n / 24);
			e.setAttribute("y", String(142 + n - r)), e.setAttribute("height", String(r));
		});
	};
}
// src/cards/cover/window-scene.ts
var Bd = 194, Vd = 125, Hd = 160, Ud = (e) => `M${Hd} 23v${Vd}M${Hd - e / 2} 88h${e}`, Wd = "<rect class=\"shade-rail\" x=\"61\" y=\"146\" width=\"198\" height=\"5\" rx=\"2.5\" fill=\"url(#bottom-rail)\" stroke=\"#43585d\" stroke-width=\".7\"/>\n  <rect x=\"54\" y=\"13\" width=\"212\" height=\"13\" rx=\"5\" fill=\"#274656\" stroke=\"#a8d8df\"/>", Gd = (e, t = Wd) => `<svg viewBox="0 0 320 174" aria-hidden="true">
  <defs><linearGradient id="sky" x2=".7" y2="1"><stop stop-color="#285779"/><stop offset="1" stop-color="#9ac8df"/></linearGradient></defs>
  <g class="window-geometry"><rect x="56" y="16" width="208" height="140" rx="3" fill="#14293a" stroke="#79afbb"/>
  <rect x="63" y="23" width="${Bd}" height="${Vd}" fill="url(#sky)"/>
  </g><foreignObject x="63" y="23" width="${Bd}" height="${Vd}" overflow="hidden">
    <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;overflow:hidden">
      <img class="window-view" alt="" hidden style="width:100%;height:100%;object-fit:cover;object-position:var(--photo-x,50%) var(--photo-y,50%);transform-origin:var(--photo-x,50%) var(--photo-y,50%);transform:scale(var(--photo-scale,1))">
    </div>
  </foreignObject>
  <path class="glazing-bars" d="${Ud(Bd)}" stroke="var(--glazing-color,#30566a)" stroke-width="var(--glazing-width,3)"/>
  <g class="window-geometry"><path d="M51 157h218l-5 4H48Z" fill="#253e50" stroke="#628697"/>
</g></svg>
<div class="shade-layer"><svg viewBox="0 0 320 174" aria-hidden="true">
  <defs><linearGradient id="fabric" x2="0" y2="1"><stop stop-color="var(--cover-shadow,#607978)"/><stop offset=".12" stop-color="var(--cover-highlight,#b2c3b6)"/><stop offset="1" stop-color="var(--cover-base,#839d94)"/></linearGradient>
  <linearGradient id="bottom-rail" x2="0" y2="1"><stop stop-color="#637679"/><stop offset=".3" stop-color="#dbe4df"/><stop offset=".62" stop-color="#a5b7b4"/><stop offset="1" stop-color="#53666a"/></linearGradient></defs>
  <clipPath id="exterior-pane"><rect x="63" y="23" width="${Bd}" height="${Vd}"/></clipPath>
  <g class="window-geometry">${e}${t}</g></svg></div>`;
function Kd(e, t) {
	let n = e.querySelector(".shade-layer svg"), r = n.querySelector(".window-geometry"), i = e.querySelector(".glazing-bars");
	t ? (r.setAttribute("clip-path", "url(#exterior-pane)"), n.append(i)) : (r.removeAttribute("clip-path"), e.querySelector("foreignObject").after(i));
}
function qd(e, t) {
	let n = t === "square" ? Vd : t === "portrait" ? 250 / 3 : Bd;
	for (let t of e.querySelectorAll(".window-geometry")) t.setAttribute("transform", `translate(${Hd} 0) scale(${n / Bd} 1) translate(-160 0)`);
	let r = e.querySelector("foreignObject");
	r.setAttribute("x", String(Hd - n / 2)), r.setAttribute("width", String(n)), e.querySelector(".glazing-bars").setAttribute("d", Ud(n));
}
// src/cards/cover/shade.ts
var Jd = () => Gd("<g class=\"shade-cloth\" opacity=\"var(--shade-opacity,1)\"><rect x=\"62\" y=\"22\" width=\"196\" height=\"126\" fill=\"url(#fabric)\"/></g>");
function Yd(e) {
	let t = e.parentElement.querySelector(".shade-layer svg"), n = t.querySelector(".shade-cloth"), r = t.querySelector(".shade-rail"), i = -1;
	return (e) => {
		e !== i && (i = e, n.setAttribute("transform", `translate(0 22) scale(1 ${1 - e}) translate(0 -22)`), r.setAttribute("transform", `translate(0 ${-126 * e})`));
	};
}
// src/cards/cover/blind.ts
var Xd = 14, Zd = 126 / Xd, Qd = () => Gd(`<g class="slats">${Array.from({ length: Xd }, (e, t) => `<rect x="62" y="${22 + t * Zd}" width="196" height="${Zd}" rx="1" fill="url(#fabric)" stroke="var(--cover-shadow,#687f80)" stroke-width=".5"/>`).join("")}</g>`);
function $d(e) {
	let t = e.parentElement, n = [...t.querySelectorAll(".slats rect")], r = t.querySelector(".shade-rail"), i = -1, a = -1;
	return (e, t = .35) => {
		if (e === i && t === a) return;
		let o = 126 - e * (126 - Xd), s = (e) => Math.min(e * Zd, o - (Xd - e)), c = 1 + (Zd - 1) * Math.cos(t * Math.PI / 2);
		n.forEach((t, n) => {
			let r = s(n);
			e !== i && t.setAttribute("y", String(22 + r)), t.setAttribute("height", String(Math.min(c, s(n + 1) - r)));
		}), e !== i && r.setAttribute("transform", `translate(0 ${o - 126})`), i = e, a = t;
	};
}
// src/cards/cover/shutter.ts
var ef = () => Gd("<defs>\n  <clipPath id=\"shutter-opening\"><rect x=\"60\" y=\"22\" width=\"200\" height=\"126\"/></clipPath>\n  <pattern id=\"shutter-profile\" x=\"0\" y=\"22\" width=\"196\" height=\"9\" patternUnits=\"userSpaceOnUse\">\n    <rect width=\"196\" height=\"9\" fill=\"var(--cover-base,#637c8b)\"/>\n    <path d=\"M0 1h196\" stroke=\"var(--cover-highlight,#abc1c7)\"/><path d=\"M0 7.5h196\" stroke=\"var(--cover-shadow,#354b5b)\" stroke-width=\"2\"/>\n  </pattern></defs>\n  <path d=\"M60 23v127m200-127v127\" stroke=\"#445968\" stroke-width=\"4\"/>\n  <g clip-path=\"url(#shutter-opening)\"><rect class=\"shutter-curtain\" x=\"62\" y=\"22\" width=\"196\" height=\"126\" fill=\"url(#shutter-profile)\"/></g>");
function tf(e) {
	let t = e.parentElement, n = t.querySelector(".shutter-curtain"), r = t.querySelector(".shade-rail"), i = -1;
	return (e) => {
		if (e === i) return;
		i = e;
		let t = `translate(0 ${-126 * e})`;
		n.setAttribute("transform", t), r.setAttribute("transform", t);
	};
}
// src/cards/cover/curtain.ts
var nf = 98, rf = nf / 7, af = `q${-rf / 2} 3 ${-rf} 0 `.repeat(7), of = () => Gd(`<defs>
  <linearGradient id="pleat" gradientUnits="userSpaceOnUse" x2="${rf}" spreadMethod="repeat">
    <stop stop-color="var(--cover-shadow,#445364)"/><stop offset=".24" stop-color="var(--cover-base,#778696)"/>
    <stop offset=".52" stop-color="var(--cover-highlight,#a7b2bb)"/><stop offset=".76" stop-color="var(--cover-light,#8495a2)"/><stop offset="1" stop-color="var(--cover-shadow,#445364)"/>
  </linearGradient>
  <g id="drape"><path class="curtain-fabric" fill="url(#pleat)"
    d="M0 19h${nf}v130${af}Z"/></g>
  </defs>
  <g class="curtain-panels">
    <g transform="translate(62 0)"><use class="gather-left" href="#drape"/></g>
    <g transform="translate(258 0) scale(-1 1)"><use class="gather-right" href="#drape"/></g>
  </g>`, "<rect x=\"54\" y=\"15\" width=\"212\" height=\"6\" rx=\"3\" fill=\"#475f70\" stroke=\"#aac2cb\"/>");
function sf(e) {
	let t = e.parentElement.querySelector(".curtain-fabric"), n = -1;
	return (e) => {
		n !== e && (n = e, t.setAttribute("transform", `scale(${1 - .88 * e} 1)`));
	};
}
// src/cards/cover/garage-settings.ts
var cf = 2e3, lf = 6500;
function uf(e) {
	return e.light_temperature_kelvin ?? (e.variant === "double" ? e.right_light_temperature_kelvin : void 0);
}
function df(e) {
	if (e.roof_type !== void 0 && e.roof_type !== "pitched" && e.roof_type !== "flat") throw Error("Roof type must be pitched or flat.");
	let t = uf(e);
	if (t !== void 0 && (!Number.isInteger(t) || t < 2e3 || t > 6500)) throw Error(`Light temperature must be a whole number from ${cf} to ${lf} K.`);
	let n = e.variant === "double";
	for (let t of [e.light_entity, n ? e.right_light_entity : void 0]) if (t !== void 0 && !/^light\.[a-z0-9_]+$/.test(t)) throw Error("Select a light entity or leave it blank.");
	if (!n) return;
	if (!/^cover\.[a-z0-9_]+$/.test(e.right_entity ?? "") || e.right_entity === e.entity) throw Error("Select a different cover entity for the right door.");
	let r = e.right_travel_seconds ?? e.travel_seconds ?? 10;
	if (!Number.isFinite(r) || r < 1 || r > 300) throw Error("Right travel time must be 1–300 seconds.");
}
// src/cards/cover/kinds.ts
var ff = {
	curtain: {
		label: "Curtain",
		deviceClass: "curtain",
		sceneFamily: "window",
		motionPolicy: "interpolate",
		layouts: ["normal", "compact"],
		markup: of,
		mount: sf,
		validate(e) {
			if (mf(e), e.curtain_opening !== void 0 && ![
				"center",
				"left_to_right",
				"right_to_left"
			].includes(e.curtain_opening)) throw Error("Curtain opening must be center, left_to_right or right_to_left.");
		}
	},
	shutter: {
		label: "Roller shutter",
		deviceClass: "shutter",
		sceneFamily: "window",
		motionPolicy: "interpolate",
		layouts: ["normal", "compact"],
		markup: ef,
		mount: tf,
		validate: mf
	},
	garage: {
		label: "Garage",
		deviceClass: "garage",
		sceneFamily: "garage",
		motionPolicy: "hold",
		layouts: [
			"normal",
			"compact",
			"double"
		],
		markup: Rd,
		mount: zd,
		validate: df
	},
	shade: {
		label: "Roller shade",
		deviceClass: "shade",
		sceneFamily: "window",
		motionPolicy: "interpolate",
		layouts: ["normal", "compact"],
		markup: Jd,
		mount: Yd,
		validate(e) {
			mf(e);
			let t = e.shade_opacity;
			if (t !== void 0 && (!Number.isInteger(t) || t < 0 || t > 100)) throw Error("Shade opacity must be a whole percentage from 0 to 100.");
		}
	},
	blind: {
		label: "Slatted blind",
		deviceClass: "blind",
		sceneFamily: "window",
		motionPolicy: "interpolate",
		layouts: ["normal", "compact"],
		markup: Qd,
		mount: $d,
		validate(e) {
			mf(e);
			let t = e.tilt_seconds;
			if (t !== void 0 && (!Number.isFinite(t) || t < 0 || t > 300)) throw Error("Tilt time must be between 0 and 300 seconds.");
		}
	}
}, pf = (e) => ff[e].sceneFamily === "window";
function mf({ window_aspect_ratio: e, mounting_side: t, window_image: n, window_image_zoom: r, window_image_x: i, window_image_y: a, glazing_bar_width: o, glazing_bar_color: s, cover_color: c }) {
	if (t !== void 0 && t !== "inside" && t !== "outside") throw Error("Mounting side must be inside or outside.");
	if (e !== void 0 && ![
		"portrait",
		"square",
		"landscape"
	].includes(e)) throw Error("Window aspect ratio must be portrait, square or landscape.");
	if (o !== void 0 && (!Number.isInteger(o) || o < 0 || o > 10)) throw Error("Glazing bar width must be a whole number from 0 to 10.");
	if (s !== void 0 && (typeof s != "string" || !/^#[a-f\d]{6}$/i.test(s))) throw Error("Glazing bar color must be a six-digit hex color.");
	if (c !== void 0 && (typeof c != "string" || !/^#[a-f\d]{6}$/i.test(c))) throw Error("Cover base color must be a six-digit hex color.");
	for (let [e, t, n] of [
		[
			r,
			100,
			300
		],
		[
			i,
			0,
			100
		],
		[
			a,
			0,
			100
		]
	]) if (e !== void 0 && (!Number.isInteger(e) || e < t || e > n)) throw Error(`Photo framing must use whole percentages from ${t} to ${n}.`);
	if (n !== void 0 && typeof n != "string") throw Error("Window image must be an image URL or path.");
}
function hf(e) {
	return Object.keys(ff).find((t) => ff[t].deviceClass === e);
}
// src/cards/cover/model.ts
function gf(e) {
	if (!/^cover\.[a-z0-9_]+$/.test(e?.entity)) throw Error("Select a cover entity.");
	let t = e.travel_seconds ?? 10;
	if (!Number.isFinite(t) || t < 1 || t > 300) throw Error("Travel time must be 1–300 seconds.");
	let n = e.cover_type ?? "garage";
	if (!Object.hasOwn(ff, n)) throw Error("Unknown cover type.");
	if (!ff[n].layouts.includes(e.variant ?? "normal")) throw Error(`Unsupported layout for ${ff[n].label}.`);
	return ff[n].validate?.(e), {
		...e,
		travel_seconds: t
	};
}
function _f(e) {
	let t = e?.attributes.current_position;
	return typeof t == "number" && Number.isFinite(t) && t >= 0 && t <= 100 ? t / 100 : void 0;
}
function vf(e) {
	return !!e && [
		"closed",
		"open",
		"opening",
		"closing"
	].includes(e.state) && !!(Number(e.attributes.supported_features) & 4);
}
function yf(e) {
	return !!e && [
		"closed",
		"open",
		"opening",
		"closing"
	].includes(e.state) && !!(Number(e.attributes.supported_features) & 8);
}
function bf(e, t, n) {
	return e.callService("cover", "set_cover_position", {
		entity_id: t,
		position: n
	});
}
function xf(e, t) {
	if (!e || e.state !== "open" && e.state !== "closed") return !1;
	let n = Number(e?.attributes.supported_features), r = _f(e);
	return t === "open" ? !!(n & 1) && (r === void 0 ? e.state === "closed" : r < 1) : !!(n & 2) && (r === void 0 ? e.state === "open" : r > 0);
}
function Sf(e, t, n) {
	return e.callService("cover", `${n}_cover`, { entity_id: t });
}
function Cf(e, t) {
	let n = Math.min(1, Math.max(0, (t - e.start) / e.duration));
	return n === 1 ? e.to : e.from + (e.to - e.from) * n;
}
function wf(e) {
	let t = Math.floor((Date.now() - Date.parse(e ?? "")) / 6e4);
	return !Number.isFinite(t) || t < 0 ? "" : t < 1 ? "Under 1 min" : t < 60 ? `${t} min` : `${Math.floor(t / 60)} h ${t % 60} min`;
}
// src/cards/cover/tilt.ts
var Tf = [
	[
		"open_cover_tilt",
		16,
		"Open slats"
	],
	[
		"close_cover_tilt",
		32,
		"Close slats"
	],
	[
		"stop_cover_tilt",
		64,
		"Stop tilt"
	]
], Ef = 128;
function Df(e) {
	let t = e?.attributes.current_tilt_position;
	return typeof t == "number" && Number.isFinite(t) && t >= 0 && t <= 100 ? t / 100 : void 0;
}
var Of = `<div class="tilt" hidden><label hidden>Slat tilt · <span></span>
  <input type="range" min="0" max="100" step="1"></label>${Tf.map(([e, , t]) => `<button type="button" data-tilt="${e}" hidden>${t}</button>`).join("")}<small role="status"></small></div>`;
function kf(e) {
	let t = e.querySelector("input"), n = e.querySelector("label"), r = [...e.querySelectorAll("button")], i = e.querySelector("small"), a, o = "", s = 0, c = 0, l = !1, u;
	async function d(t, n, r = {}) {
		if (!a || !o || l || !(s & n) || !e.isConnected) return;
		let u = ++c;
		l = !0, i.textContent = "", p();
		try {
			await a.callService("cover", t, {
				entity_id: o,
				...r
			});
		} catch {
			u === c && (i.textContent = "Tilt command failed.");
		} finally {
			u === c && (l = !1, p());
		}
	}
	let f = n.querySelector("span");
	t.oninput = () => {
		f.textContent = `Target ${t.value}%`;
	}, t.onchange = () => void d("set_cover_tilt_position", Ef, { tilt_position: t.valueAsNumber }), r.forEach((e, t) => {
		let [n, r] = Tf[t];
		e.onclick = () => void d(n, r);
	});
	function p() {
		e.hidden = !(s & 240), n.hidden = !(s & Ef), t.disabled = l, t.value = String(u === void 0 ? 50 : Math.round(u * 100)), f.textContent = u === void 0 ? "Not reported" : `${t.value}%`, r.forEach((e, t) => {
			e.hidden = !(s & Tf[t][1]), e.disabled = l;
		});
	}
	return (e, t, n) => {
		a = e;
		let r = n && [
			"open",
			"closed",
			"opening",
			"closing"
		].includes(n.state) ? Number(n.attributes.supported_features) | 0 : 0, d = Df(n);
		(o !== t || s !== r || u !== d) && (o !== t && (c++, l = !1, i.textContent = ""), o = t, s = r, u = d, p());
	};
}
// src/cards/cover/cover.ts
function Af(e, t) {
	e && e.textContent !== t && (e.textContent = t);
}
function jf(e, t, n) {
	e.getAttribute(t) !== n && e.setAttribute(t, n);
}
var Mf = (e, t) => `<style>${fu}
:host{container-type:inline-size;min-width:0}ha-card{padding:12px 16px;display:grid;gap:4px;align-items:center}
h2{margin:0;font-size:18px;font-weight:550;overflow-wrap:anywhere}
.scene{border:0;background:none;border-radius:12px;padding:0;width:100%;display:block}
:host([window-cover]) .scene{position:relative;isolation:isolate}
.shade-layer{position:absolute;inset:0;pointer-events:none;transform:translateZ(0);
  --cover-highlight:color-mix(in srgb,var(--cover-base),white 36%);
  --cover-light:color-mix(in srgb,var(--cover-base),white 15%);
  --cover-shadow:color-mix(in srgb,var(--cover-base),black 35%)}
:host([curtain-opening="left_to_right"]) .gather-left,:host([curtain-opening="right_to_left"]) .gather-right{display:none}
:host([curtain-opening="left_to_right"]) .gather-right,:host([curtain-opening="right_to_left"]) .gather-left{transform:scaleX(2)}
svg{display:block;width:100%;height:clamp(100px,40cqi,180px)}
.detail{min-width:0}.row{display:flex;gap:8px;align-items:center;justify-content:space-between;min-height:40px}
.state{font-size:16px;color:#86ecf2}.age,.hint{color:var(--gleam-muted,#8ba8c6);font-size:12px}
ha-card[data-state=open] .state{color:#ffc27c}
ha-card[data-unknown] svg{opacity:.35}ha-card[data-unknown] :is(.door-skin,.panel,.interior,.spill,.air,.shade-cloth,.slats,.shutter-curtain,.curtain-panels,.shade-rail){visibility:hidden}
.tilt{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.tilt label,.tilt input,.lift-slider,.lift-slider input{display:block;width:100%}
:host{--action-width:76px;--action-height:36px}
:host([compact]),:host([bay]){--action-width:64px;--action-height:32px}
.action:disabled{cursor:default}.actions{display:flex;align-items:center;flex-wrap:wrap;gap:4px}
.actions button{flex:none;width:var(--action-width);height:var(--action-height);padding:0 1px;line-height:1.15}
.hint{margin:0}.hint:empty{display:none}
@container(min-width:590px){ha-card{grid-template-columns:1.15fr 1fr;column-gap:20px}.scene{grid-column:1;grid-row:1/3}header{align-self:end}.detail{align-self:start}}
:host([compact]) ha-card{display:block;padding:8px}.row{flex-wrap:wrap}
:host([compact]) svg{height:clamp(64px,44cqi,104px)}
:host([window-cover]) svg{height:clamp(125px,50cqi,225px)}
:host([window-cover][compact]) svg{height:clamp(72px,49cqi,116px)}
:host([window-cover]) .lift-slider{display:grid;grid-template-columns:1fr auto;align-items:baseline;font-size:12px;color:var(--gleam-muted,#8ba8c6)}
:host([window-cover]) .lift-slider input{grid-column:1/-1;margin-inline:0}
:host([window-cover]) .lift-slider .lift-value{font-variant-numeric:tabular-nums}
:host([compact]) h2,:host([bay]) h2{font-size:14px}
:host([compact]) .age,:host([bay]) .age{display:block}
:host([bay]) ha-card{display:flex;flex-direction:column;align-items:stretch;border:0;background:none;border-radius:0;box-shadow:none;padding:0}
:host([bay]) ha-card,:host([bay]) svg{overflow:visible}
:host([bay]) svg{width:100%;height:auto;pointer-events:none}
:host([bay]) .detail,:host([bay]) h2{padding-inline:6px}
/* A moving shade changes both its status and its action caption on arrival.
   Keep those changes out of the window's layout (and scroll anchoring). */
:host([window-cover]) .row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px}
:host([window-cover]) .actions{justify-self:end}
@container(max-width:290px){
  :host([window-cover]) .row{grid-template-columns:1fr}
  :host([window-cover]) .readout{min-height:3lh}
  :host([window-cover]) .actions{justify-self:start}
}
</style><ha-card>${t ? "" : "<header><h2></h2></header>"}<div class="scene">${ff[e].markup(t)}</div>
<div class="detail"><div class="row"><div class="readout"><strong class="state" role="status"></strong><span class="age"></span></div>
<div class="actions"><button class="extra-open" hidden>Open</button><button id="action" class="action" hidden></button><button class="stop" hidden>Stop</button></div></div><label class="lift-slider" hidden>${e === "curtain" ? "Opening position" : "Lift position"}${pf(e) ? "" : " · "} <span class="lift-value"></span>
<input type="range" aria-label="${t ? `${t} door lift position` : e === "curtain" ? "Opening position" : "Lift position"}" min="0" max="100" step="1"></label>${e === "blind" ? Of : ""}<p class="hint"></p></div></ha-card>`, Nf = class extends HTMLElement {
	root = this.attachShadow({ mode: "open" });
	variant;
	kind;
	bays = [];
	client;
	static getConfigElement() {
		return document.createElement("gleam-cover-editor");
	}
	static getStubConfig(e) {
		let t = Object.keys(e?.states ?? {}).filter((e) => e.startsWith("cover.")), n = t.find((t) => hf(e?.states[t].attributes.device_class)) ?? t[0] ?? "cover.garage_door";
		return {
			entity: n,
			cover_type: hf(e?.states[n]?.attributes.device_class) ?? "garage"
		};
	}
	getCardSize() {
		return this.variant === "compact" ? 2 : 4;
	}
	getGridOptions() {
		return {
			columns: this.variant === "compact" ? 6 : 12,
			rows: "auto",
			min_columns: this.variant === "double" ? 12 : 6
		};
	}
	setConfig(e) {
		let t = gf(e), n = t.variant ?? "normal", r = t.cover_type ?? "garage";
		if (n !== this.variant || r !== this.kind) {
			if (this.kind = r, this.variant = n, n === "double") {
				this.root.innerHTML = `<style>${fu}:host{min-width:0}ha-card{padding:12px}
          h2{font-size:18px;margin:0 0 8px;overflow-wrap:anywhere}.bays{position:relative;container-type:inline-size;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));max-width:560px;margin-inline:auto}
          .labels{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));position:absolute;inset-inline:0;top:1cqi;transform:translateY(-100%);z-index:1;pointer-events:none}
          .labels.flat{top:5cqi}
          .labels h3{position:relative;transform:translateX(-50%);width:62%;text-align:center;font-size:14px;line-height:1.15;margin:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
          </style>
          <ha-card><header><h2></h2></header><div class="bays"></div></ha-card>`, this.bays = [new Pf(r, "left"), new Pf(r, "right")], this.bays.forEach((e) => e.toggleAttribute("bay", !0));
				let e = document.createElement("div");
				e.className = "labels";
				for (let t of ["left", "right"]) {
					let n = document.createElement("h3");
					n.style.left = Ld(t), n.style.gridColumn = t === "left" ? "1" : "2", e.append(n);
				}
				this.root.querySelector(".bays").append(e, ...this.bays);
			} else {
				let e = new Pf(r);
				e.toggleAttribute("window-cover", pf(r)), e.toggleAttribute("compact", n === "compact");
				let t = document.createElement("style");
				t.textContent = ":host{display:block;min-width:0}", this.bays = [e], this.root.replaceChildren(t, e);
			}
		}
		if (n === "double") {
			this.root.querySelector("h2").textContent = t.name ?? "Garage";
			let e = this.root.querySelector(".labels"), n = [t.left_label?.trim(), t.right_label?.trim()];
			e.hidden = !n.some(Boolean), e.classList.toggle("flat", t.roof_type === "flat"), e.querySelectorAll("h3").forEach((e, t) => {
				e.textContent = n[t] ?? "", e.hidden = !n[t];
			}), this.bays[0].setConfig({
				entity: t.entity,
				name: t.left_label?.trim(),
				travel_seconds: t.travel_seconds,
				light_entity: t.light_entity,
				light_temperature_kelvin: uf(t)
			}), this.bays[1].setConfig({
				entity: t.right_entity,
				name: t.right_label?.trim(),
				travel_seconds: t.right_travel_seconds ?? t.travel_seconds,
				light_entity: t.right_light_entity,
				light_temperature_kelvin: uf(t)
			});
		} else this.bays[0].setConfig(t);
		for (let e of this.bays) e.toggleAttribute("flat-roof", t.roof_type === "flat");
		this.client && (this.hass = this.client);
	}
	set hass(e) {
		this.client = e, this.bays.forEach((t) => t.hass = e);
	}
}, Pf = class extends HTMLElement {
	kind;
	side;
	root = this.attachShadow({ mode: "open" });
	config;
	client;
	entity;
	renderDoor;
	updateTilt;
	lastTilt;
	tiltTarget;
	tiltTravel;
	button;
	extraOpen;
	stopButton;
	stopRequest;
	holdStoppedPosition = !1;
	slider;
	positionTarget;
	nodes;
	draft;
	observer;
	visible = !1;
	frame = 0;
	lastPainted = -1;
	timer = 0;
	p = 0;
	travel;
	target;
	confirmed = !1;
	confirmBy = 0;
	command = !1;
	acknowledged = !1;
	reportedState;
	reportedPosition;
	error = "";
	generation = 0;
	constructor(e = "garage", t) {
		super(), this.kind = e, this.side = t, this.root.innerHTML = Mf(e, t), this.nodes = {
			title: this.root.querySelector("h2"),
			state: this.root.querySelector(".state"),
			age: this.root.querySelector(".age"),
			hint: this.root.querySelector(".hint"),
			lift: this.root.querySelector(".lift-value"),
			surface: this.root.querySelector("ha-card")
		}, this.button = this.root.querySelector(".action"), this.slider = this.root.querySelector(".lift-slider input"), this.slider.oninput = () => {
			this.draft = this.slider.valueAsNumber, this.refresh();
		}, this.slider.onchange = () => void this.setPosition(), this.renderDoor = ff[e].mount(this.root.querySelector("svg")), e === "blind" && (this.updateTilt = kf(this.root.querySelector(".tilt"))), this.extraOpen = this.root.querySelector(".extra-open"), this.extraOpen.onclick = () => void this.act("open"), this.stopButton = this.root.querySelector(".stop"), this.stopButton.onclick = () => void this.stop(), this.button.onclick = () => void this.act(xf(this.entity, "close") ? "close" : "open");
	}
	connectedCallback() {
		this.observer = new IntersectionObserver(([e]) => {
			this.visible = e.isIntersecting, this.refresh();
		}), this.observer.observe(this), document.addEventListener("visibilitychange", this.refresh), this.sync(!0);
	}
	disconnectedCallback() {
		this.observer?.disconnect(), this.visible = !1, document.removeEventListener("visibilitychange", this.refresh), this.reset(), this.entity = void 0;
	}
	reset() {
		cancelAnimationFrame(this.frame), clearTimeout(this.timer), this.frame = this.timer = 0, this.generation++, this.travel = void 0, this.target = void 0, this.confirmed = !1, this.command = !1, this.stopRequest = void 0, this.holdStoppedPosition = !1, this.positionTarget = this.draft = void 0, this.tiltTarget = void 0, this.tiltTravel = void 0, this.error = "";
	}
	setConfig(e) {
		let t = gf(e);
		if (this.kind === "curtain" && jf(this, "curtain-opening", t.curtain_opening ?? "center"), this.kind === "shade" && t.shade_opacity !== this.config?.shade_opacity && this.style.setProperty("--shade-opacity", String((t.shade_opacity ?? 100) / 100)), pf(this.kind) && t.window_image !== this.config?.window_image) {
			let e = this.root.querySelector(".window-view");
			e.hidden = !t.window_image?.trim(), e.hidden ? e.removeAttribute("src") : e.src = t.window_image.trim();
		}
		if (pf(this.kind) && (t.mounting_side === "outside" != (this.config?.mounting_side === "outside") && Kd(this.root, t.mounting_side === "outside"), t.cover_color !== this.config?.cover_color && (t.cover_color ? this.style.setProperty("--cover-base", t.cover_color) : this.style.removeProperty("--cover-base")), t.window_aspect_ratio !== this.config?.window_aspect_ratio && qd(this.root, t.window_aspect_ratio ?? "landscape"), t.glazing_bar_width !== this.config?.glazing_bar_width && this.style.setProperty("--glazing-width", String(t.glazing_bar_width ?? 3)), t.glazing_bar_color !== this.config?.glazing_bar_color && this.style.setProperty("--glazing-color", t.glazing_bar_color ?? "#30566a"), t.window_image_zoom !== this.config?.window_image_zoom && this.style.setProperty("--photo-scale", String((t.window_image_zoom ?? 100) / 100)), t.window_image_x !== this.config?.window_image_x && this.style.setProperty("--photo-x", `${t.window_image_x ?? 50}%`), t.window_image_y !== this.config?.window_image_y && this.style.setProperty("--photo-y", `${t.window_image_y ?? 50}%`)), t.entity !== this.config?.entity && (this.reset(), this.entity = void 0), t.light_temperature_kelvin !== this.config?.light_temperature_kelvin) {
			let e = t.light_temperature_kelvin;
			if (this.toggleAttribute("tinted", e !== void 0), e === void 0) this.style.removeProperty("--lamp-color");
			else {
				let t = (e - 2e3) / 4500;
				this.style.setProperty("--lamp-color", `rgb(${Math.round(255 - 35 * t)} ${Math.round(168 + 68 * t)} ${Math.round(86 + 169 * t)})`);
			}
		}
		this.config = t, this.sync(!0);
	}
	set hass(e) {
		this.client = e, this.sync(!1);
	}
	begin(e) {
		let t = performance.now();
		this.travel && (this.p = Cf(this.travel, t));
		let n = +(e === "open");
		this.travel = {
			from: this.p,
			to: n,
			start: t,
			duration: Math.max(1, Math.abs(n - this.p) * this.config.travel_seconds * 1e3)
		}, this.target = e, this.confirmed = !1, this.error = "", this.confirmBy = t + this.travel.duration + 5e3;
	}
	sync(e) {
		if (!this.config || !this.isConnected) return;
		let t = this.kind === "garage" && this.config.light_entity, n = t ? this.client?.states[t] : void 0;
		this.toggleAttribute("lamp-off", !!t && n?.state !== "on");
		let r = this.client?.states[this.config.entity], i = this.entity;
		this.updateTilt?.(this.client, this.config.entity, r);
		let a = r?.state, o = _f(r), s = this.updateTilt ? Df(r) : void 0, c = s !== this.tiltTarget;
		if (!e && r === i && a === this.reportedState && o === this.reportedPosition && !c) return;
		if (c) {
			let e = performance.now(), t = this.tiltTravel ? Cf(this.tiltTravel, e) : this.tiltTarget, n = (this.config.tilt_seconds ?? 1) * 1e3;
			this.tiltTravel = s !== void 0 && t !== void 0 && t !== s && n > 0 ? {
				from: t,
				to: s,
				start: e,
				duration: n
			} : void 0, this.tiltTarget = s;
		}
		a !== this.reportedState && (this.error = "");
		let l = this.reportedState, u = this.reportedPosition;
		if (this.reportedState = a, this.reportedPosition = o, this.entity = r, yf(r) || (this.stopRequest = void 0), !this.stopRequest || a !== "open" && a !== "closed" || a === l && o === u && r?.last_changed === i?.last_changed || (this.p = o ?? (a === "closed" ? 0 : this.travel ? Cf(this.travel, performance.now()) : this.p), this.holdStoppedPosition = a === "open" && o === void 0, this.stopRequest = void 0, this.command = this.confirmed = !1, this.positionTarget = this.travel = this.target = void 0, this.generation++), (a !== "open" || o !== void 0) && (this.holdStoppedPosition = !1), this.positionTarget !== void 0) {
			if (!vf(r)) this.positionTarget = void 0, this.travel = void 0;
			else {
				o !== void 0 && o !== this.positionTarget && o !== u && (this.p = o, this.startPositionTravel(this.positionTarget)), this.refresh();
				return;
			}
		}
		this.command && (a === this.target || a === (this.target === "open" ? "opening" : "closing")) && (this.acknowledged = !0);
		let d = ff[this.kind].motionPolicy === "interpolate", f = o !== void 0 && o > 0 && o < 1 && (!d || o !== u || !this.command && a === this.target);
		if (a === "opening" || a === "closing") {
			let e = a === "opening" ? "open" : "closed";
			if (!i && o === void 0 && (this.p = e === "open" ? 0 : 1), this.command || this.target === e || i && a === l || this.begin(e), o !== void 0 && (!this.travel || f)) {
				this.p = o;
				let t = +(e === "open");
				this.travel = d && this.target === e && o !== t ? {
					from: o,
					to: t,
					start: performance.now(),
					duration: Math.max(1, Math.abs(t - o) * this.config.travel_seconds * 1e3)
				} : void 0;
			}
		} else a === "open" || a === "closed" ? (o !== void 0 && (!this.travel || f) && (this.travel = void 0, this.p = o), a === this.target ? (this.confirmed = !0, !this.travel && d && o === void 0 && (this.p = +(a === "open"))) : this.command || this.target && l === a || (this.travel = void 0, this.target = void 0, this.p = o ?? (a === "closed" ? 0 : this.holdStoppedPosition ? this.p : 1))) : this.command || (this.reset(), this.p = 0);
		this.refresh();
	}
	async act(e) {
		if (!this.client || !this.config || this.stopRequest || !xf(this.entity, e) || this.target || this.positionTarget !== void 0) return;
		this.holdStoppedPosition = !1;
		let t = ++this.generation;
		this.begin(e === "open" ? "open" : "closed"), this.command = !0, this.acknowledged = !1, this.confirmBy = performance.now() + this.config.travel_seconds * 1e3 + 5e3, this.refresh();
		try {
			await Sf(this.client, this.config.entity, e);
		} catch {
			if (t !== this.generation || !this.command || this.acknowledged) return;
			this.command = !1, this.target = void 0, this.travel = void 0, this.error = "Command failed. Check the door and try again.", this.sync(!0);
		}
	}
	startPositionTravel(e) {
		this.travel = {
			from: this.p,
			to: e,
			start: performance.now(),
			duration: Math.max(1, Math.abs(e - this.p) * this.config.travel_seconds * 1e3)
		};
	}
	get stopAvailable() {
		return yf(this.entity) && (!!this.target || this.positionTarget !== void 0 || this.entity?.state === "opening" || this.entity?.state === "closing");
	}
	async stop() {
		if (!this.client || !this.config || !this.stopAvailable || this.stopRequest) return;
		let e = this.stopRequest = { deadline: performance.now() + 5e3 };
		this.error = "", this.refresh();
		try {
			await Sf(this.client, this.config.entity, "stop");
		} catch {
			if (this.stopRequest !== e) return;
			this.stopRequest = void 0, this.error = "Stop command failed. Try again.", this.refresh();
		}
	}
	async setPosition() {
		let e = this.slider.valueAsNumber;
		if (this.draft = void 0, !this.client || !this.config || this.stopRequest || !vf(this.entity) || this.target || this.positionTarget !== void 0 || !Number.isInteger(e) || e < 0 || e > 100) {
			this.refresh();
			return;
		}
		let t = ++this.generation;
		this.holdStoppedPosition = !1, this.positionTarget = e / 100, this.error = "", this.startPositionTravel(this.positionTarget), this.confirmBy = performance.now() + this.config.travel_seconds * 1e3 + 5e3, this.refresh();
		try {
			await bf(this.client, this.config.entity, e);
		} catch {
			if (t !== this.generation || this.positionTarget === void 0) return;
			this.positionTarget = void 0, this.travel = void 0, this.error = "Position command failed.", this.sync(!0);
		}
	}
	paint = () => {
		this.frame = 0, this.travel && (this.p = Cf(this.travel, performance.now()), this.p === this.travel.to && (this.travel = void 0)), this.lastTilt = this.tiltTravel ? Cf(this.tiltTravel, performance.now()) : this.tiltTarget, this.lastTilt === this.tiltTarget && (this.tiltTravel = void 0), this.renderDoor(this.p, this.lastTilt), this.lastPainted = this.p, this.travel || this.tiltTravel ? this.frame = requestAnimationFrame(this.paint) : this.refresh();
	};
	refresh = () => {
		clearTimeout(this.timer), this.timer = 0;
		let e = this.isConnected && this.visible && !document.hidden;
		e || (cancelAnimationFrame(this.frame), this.frame = 0), this.travel && performance.now() >= this.travel.start + this.travel.duration && (this.p = this.travel.to, this.travel = void 0);
		let t = performance.now(), n = this.entity?.state ?? "unavailable";
		if (this.stopRequest && t >= this.stopRequest.deadline && (this.stopRequest = void 0, this.error = "Stop not confirmed by Home Assistant."), this.positionTarget !== void 0) {
			let e = _f(this.entity) ?? (n === "closed" ? 0 : void 0);
			!this.travel && e === this.positionTarget && (n === "open" || n === "closed") ? this.positionTarget = void 0 : t >= this.confirmBy && (this.travel = void 0, this.positionTarget = void 0, this.p = e ?? +(n === "open"), this.error = "Target position not confirmed.");
		}
		let r = this.confirmBy - 5e3;
		if (this.command) {
			let e = _f(this.entity);
			this.confirmed = n === this.target && (e === void 0 || e === +(this.target === "open"));
		}
		!this.travel && this.confirmed && (!this.command || t >= r) && (this.command = !1, this.target = void 0, this.confirmed = !1);
		let i = this.target && (this.command ? t >= r : !this.travel && (n === "open" || n === "closed"));
		i && performance.now() >= this.confirmBy && (this.command = !1, this.target = void 0, this.travel = void 0, this.p = _f(this.entity) ?? (n === "open" ? 1 : n === "closed" ? 0 : this.p), this.error = `Movement not confirmed. Home Assistant still reports ${n}.`);
		let a = [
			"closed",
			"open",
			"opening",
			"closing"
		].includes(n), o = a || n === "unknown" ? n : "unavailable", s = this.target ? i ? "Awaiting confirmation" : this.target === "open" ? "Opening…" : "Closing…" : "";
		this.side || Af(this.nodes.title, this.config?.name ?? String(this.entity?.attributes.friendly_name ?? ff[this.kind].label));
		let c = pf(this.kind), l = vf(this.entity), u = c && a && !l ? _f(this.entity) : void 0;
		Af(this.nodes.state, o[0].toUpperCase() + o.slice(1) + (u === void 0 ? "" : ` · ${Math.round(u * 100)}% open`));
		let d = n === "closed" || n === "open" ? wf(this.entity?.last_changed) : "";
		Af(this.nodes.age, d ? ` · ${d}` : "");
		let f = this.nodes.surface;
		jf(f, "data-state", n), f.toggleAttribute("data-unknown", !a);
		let p = xf(this.entity, "open"), m = xf(this.entity, "close"), h = m ? "close" : p ? "open" : void 0, g = !!this.stopRequest || this.stopAvailable;
		this.stopButton.toggleAttribute("hidden", !g), this.stopButton.toggleAttribute("disabled", !!this.stopRequest);
		let _ = this.stopRequest ? "Stopping…" : "Stop";
		Af(this.stopButton, _), jf(this.stopButton, "aria-label", this.side ? `${_} ${this.config?.name || `${this.side} door`}` : _), this.extraOpen.toggleAttribute("hidden", g || !(p && m) || !!this.target), this.extraOpen.toggleAttribute("disabled", this.positionTarget !== void 0), jf(this.extraOpen, "aria-label", this.side ? `Open ${this.config?.name || `${this.side} door`}` : "Open"), this.button.toggleAttribute("hidden", g || !s && !h), this.button.toggleAttribute("disabled", !!s || !h || this.positionTarget !== void 0), this.slider.parentElement.toggleAttribute("hidden", !l), this.slider.toggleAttribute("disabled", !l || !!this.stopRequest || !!this.target || this.positionTarget !== void 0);
		let v = _f(this.entity), y = this.draft ?? (this.positionTarget === void 0 ? void 0 : Math.round(this.positionTarget * 100)), b = y ?? (v === void 0 ? n === "closed" ? 0 : 50 : Math.round(v * 100));
		this.slider.valueAsNumber !== b && (this.slider.value = String(b));
		let x = y === void 0 ? v === void 0 ? "Not reported" : `${b}%${c ? "" : " open"}` : `Target ${y}%`;
		Af(this.nodes.lift, x), jf(this.slider, "aria-valuetext", x);
		let S = s || (h === "open" ? "Open" : "Close");
		if (Af(this.button, S), jf(this.button, "aria-label", this.side ? `${S} ${this.config?.name || `${this.side} door`}` : S), Af(this.nodes.hint, this.error), !e) return;
		(this.travel || this.tiltTravel || this.p !== this.lastPainted || this.lastTilt !== this.tiltTarget) && !this.frame && (this.frame = requestAnimationFrame(this.paint));
		let C = d ? 6e4 - (Date.now() - Date.parse(this.entity.last_changed)) % 6e4 : Infinity, w = this.positionTarget === void 0 ? this.command && t < r ? r : i && this.target ? this.confirmBy : Infinity : this.confirmBy, T = Math.min(C, Math.max(1, Math.min(w, this.stopRequest?.deadline ?? Infinity) - t));
		Number.isFinite(T) && (this.timer = window.setTimeout(this.refresh, T));
	};
};
customElements.get("gleam-cover-bay") || customElements.define("gleam-cover-bay", Pf);
// src/cards/cover/window-photo.ts
async function Ff(e, t) {
	if (!e?.fetchWithAuth) throw Error("Photo upload is unavailable here. Enter an image URL instead.");
	let n = new FormData();
	n.append("file", t);
	let r = await e.fetchWithAuth("/api/image/upload", {
		method: "POST",
		body: n
	});
	if (r.status === 413) throw Error("This photo is too large. Try a smaller image.");
	if (!r.ok) throw Error("Home Assistant could not upload the photo. Check your connection and permissions, then try again.");
	let i = await r.json();
	if (!i || typeof i != "object" || !("id" in i) || typeof i.id != "string" || !/^[\w-]+$/.test(i.id)) throw Error("Home Assistant did not return a usable photo.");
	return `/api/image/serve/${i.id}/original`;
}
// src/cards/cover/editor.ts
var If = [
	[
		"window_image_zoom",
		"Photo zoom",
		100,
		300,
		100
	],
	[
		"window_image_x",
		"Horizontal position (left to right)",
		0,
		100,
		50
	],
	[
		"window_image_y",
		"Vertical position (top to bottom)",
		0,
		100,
		50
	]
], Lf = class extends HTMLElement {
	uploadGeneration = 0;
	root = this.attachShadow({ mode: "open" });
	config;
	choices = "";
	assistant;
	constructor() {
		super(), this.root.innerHTML = `<style>${Ku}
      form{container-type:inline-size}input,select{font:inherit;color:inherit;background:var(--card-background-color,transparent);
        border:1px solid var(--divider-color,#888);border-radius:8px;padding:9px;width:100%;min-width:0;box-sizing:border-box}
      .toggle{display:flex;align-items:center;gap:8px}input[type=checkbox]{width:auto}input[type=range]{padding:0}
      :focus-visible{outline:2px solid var(--primary-color,#03a9f4);outline-offset:2px}
      small{font-size:12px;color:var(--secondary-text-color,#666)}
       @container(min-width:440px){.pair:has([data-double]:not([hidden])),.pair[data-double]{grid-template-columns:repeat(2,minmax(0,1fr))}}
      p{margin:0;color:var(--error-color,#c62828)}p:empty{display:none}</style>
      <form><fieldset><legend>Cover setup</legend><div class="fields">
      <label>Cover type<select id="kind">${Object.entries(ff).map(([e, t]) => `<option value="${e}">${t.label}</option>`).join("")}</select></label>
      <label>Layout<select id="layout"><option value="normal">Normal</option><option value="compact">Compact</option><option value="double">Double</option></select></label>
      <label data-curtain>Panels<select id="panels"><option value="center">Center split (two panels)</option><option value="single">Single panel</option></select></label>
      <label data-single>Opening direction<select id="opening"><option value="left_to_right">Left to right · gathers on right</option><option value="right_to_left">Right to left · gathers on left</option></select></label>
      <datalist id="covers"></datalist><div class="fields pair"><label><span id="entity-label"></span><input id="entity" list="covers" required pattern="cover\\.[a-z0-9_]+"></label>
      <label data-double>Right door entity<input id="right-entity" list="covers" required aria-describedby="duplicate" pattern="cover\\.[a-z0-9_]+"></label></div>
      <small id="suggestion" hidden></small><p id="duplicate" role="alert"></p></div></fieldset>
      <details><summary>Cover movement<small id="travel-summary"></small></summary><div class="fields">
      <small>Set the time the cover takes to travel in either direction (1–300 seconds).</small>
      <div class="fields pair"><label><span id="time-label"></span><input id="seconds" required type="number" min="1" max="300" step="any"></label>
      <label data-double>Right door travel time (seconds)<input id="right-seconds" type="number" min="1" max="300" step="any"></label></div>
      <label data-blind>Tilt transition (seconds)<input id="tilt-seconds" required type="number" min="0" max="300" step="any">
        <small>Time to animate a new reported slat angle. Default 1 second; 0 is immediate.</small></label></div></details>
      <details><summary>Card appearance<small>Display name<span data-garage>, roof style and door labels</span></small></summary><div class="fields">
      <label>Display name<input id="name" placeholder="Entity name"></label>
      <div data-window class="fields">
        <label class="toggle"><input id="custom-cover-color" type="checkbox">Customize cover base color</label>
        <label>Cover base color<input id="cover-color" type="color"></label></div>
      <label data-window>Window aspect ratio<select id="window-ratio"><option value="landscape">Landscape (default)</option><option value="portrait">Portrait</option><option value="square">Square</option></select></label>
      <label data-window>Mounting side<select id="mounting-side"><option value="inside">Inside (room side)</option><option value="outside">Outside (behind the glass)</option></select></label>
      <fieldset data-window><legend>Glazing bars</legend><div class="fields">
        <label>Width · <span id="bar-reading"></span><input id="bar-width" type="range" min="0" max="10" step="1"></label>
        <label>Bar color<input id="bar-color" type="color"></label></div></fieldset>
      <div data-window class="fields"><label>Add window photo
        <input id="window-photo" type="file" accept="image/*">
        <small>Choose a picture from this device to upload to Home Assistant.</small></label>
        <small id="photo-status" role="status"></small></div>
      <label data-window>Window view image · optional
        <input id="window-image" placeholder="/local/garden.jpg" spellcheck="false">
        <small>Enter an image URL or a /local/ path. Leave blank for the default sky.</small></label>
      <fieldset data-window><legend>Photo framing</legend><div class="fields">
      ${If.map(([e, t, n, r]) => `<label>${t} · <span id="${e}-value"></span><input id="${e}" type="range" min="${n}" max="${r}" step="1"></label>`).join("")}
      <small>At 100% the photo fills the window. Zoom in to pan farther.</small></div></fieldset>
      <label data-shade>Fabric opacity · <span id="opacity-reading"></span>
        <input id="shade-opacity" type="range" min="0" max="100" step="1">
        <small>0% is transparent; 100% is opaque.</small></label>
      <label data-garage>Roof type<select id="roof"><option value="pitched">Pitched (default)</option><option value="flat">Flat</option></select></label>
      <div class="fields pair" data-double>
      <label>Left door label<input id="left-label" placeholder="Hidden when blank"></label>
      <label>Right door label<input id="right-label" placeholder="Hidden when blank"></label></div></div></details>
      <details data-garage><summary>Garage lighting<small>Optional light entities and illustrated color temperature</small></summary><div class="fields">
      <datalist id="lights"></datalist><div class="fields pair">
      <label><span id="light-label"></span><input id="light" list="lights" pattern="light\\.[a-z0-9_]+"></label>
      <label data-double>Right door light · optional<input id="right-light" list="lights" pattern="light\\.[a-z0-9_]+"></label></div>
      <label class="toggle"><input id="custom" type="checkbox"> Customize garage light temperature</label>
      <label for="kelvin">Garage light temperature · <span id="reading"></span></label>
      <input id="kelvin" type="range" min="${cf}" max="${lf}" step="1"></div></details>
      <p id="invalid" role="status"></p></form>`, this.root.querySelector("form").addEventListener("submit", (e) => e.preventDefault()), this.root.addEventListener("input", (e) => {
			e.target === this.input("window-image") && this.cancelPhoto(), e.target instanceof HTMLInputElement && ["entity", "right-entity"].includes(e.target.id) && this.layout(), e.target === this.input("kelvin") && this.showTemperature(), e.target === this.input("shade-opacity") && this.showOpacity(), e.target === this.input("bar-width") && this.showBarWidth();
			for (let [t] of If) e.target === this.input(t) && this.showFraming(t);
		}), this.root.addEventListener("change", (e) => {
			if (e.target === this.input("window-photo")) {
				this.choosePhoto();
				return;
			}
			(e.target === this.root.querySelector("#kind") || e.target === this.input("entity")) && this.cancelPhoto();
			let t = this.layout();
			if (!this.config) return;
			let n = this.invalidField();
			if (n) {
				let e = n.closest("details");
				e && (e.open = !0), n.reportValidity();
				return;
			}
			let r = {
				...this.config,
				entity: this.input("entity").value.trim(),
				travel_seconds: this.input("seconds").valueAsNumber
			};
			(e.target === this.root.querySelector("#kind") || this.kind !== "garage" || r.cover_type) && (r.cover_type = this.kind), this.input("name").value.trim() ? r.name = this.input("name").value.trim() : delete r.name, t === "normal" ? delete r.variant : r.variant = t;
			let i = this.select("opening").value;
			this.kind === "curtain" && this.select("panels").value === "single" && (i === "left_to_right" || i === "right_to_left") ? r.curtain_opening = i : delete r.curtain_opening, this.kind === "blind" && this.input("tilt-seconds").valueAsNumber !== 1 ? r.tilt_seconds = this.input("tilt-seconds").valueAsNumber : delete r.tilt_seconds;
			let a = this.input("shade-opacity").valueAsNumber, o = this.root.querySelector("#window-ratio").value;
			pf(this.kind) && this.select("mounting-side").value === "outside" ? r.mounting_side = "outside" : delete r.mounting_side, pf(this.kind) && this.input("custom-cover-color").checked ? r.cover_color = this.input("cover-color").value : delete r.cover_color, pf(this.kind) && (o === "square" || o === "portrait") ? r.window_aspect_ratio = o : delete r.window_aspect_ratio, this.kind === "shade" && a !== 100 ? r.shade_opacity = a : delete r.shade_opacity;
			let s = this.input("bar-width").valueAsNumber, c = this.input("bar-color").value;
			pf(this.kind) && s !== 3 ? r.glazing_bar_width = s : delete r.glazing_bar_width, pf(this.kind) && c !== "#30566a" ? r.glazing_bar_color = c : delete r.glazing_bar_color;
			let l = this.input("window-image").value.trim();
			pf(this.kind) && l ? r.window_image = l : delete r.window_image;
			for (let [e, , , , t] of If) {
				let n = this.input(e).valueAsNumber;
				pf(this.kind) && n !== t ? r[e] = n : delete r[e];
			}
			this.kind === "garage" && this.root.querySelector("#roof").value === "flat" ? r.roof_type = "flat" : delete r.roof_type, t === "double" ? (r.right_entity = this.input("right-entity").value, this.input("right-seconds").value ? r.right_travel_seconds = this.input("right-seconds").valueAsNumber : delete r.right_travel_seconds) : (delete r.right_entity, delete r.right_travel_seconds);
			for (let e of ["left", "right"]) {
				let n = this.input(`${e}-label`).value.trim();
				t === "double" && n ? r[`${e}_label`] = n : delete r[`${e}_label`];
			}
			for (let e of ["", "right"]) {
				let n = e ? "right-" : "", i = this.kind === "garage" && (!e || t === "double"), a = e ? "right_light_entity" : "light_entity";
				i && this.input(n + "light").value ? r[a] = this.input(n + "light").value : delete r[a];
			}
			delete r.right_light_temperature_kelvin, this.kind === "garage" && this.input("custom").checked ? r.light_temperature_kelvin = this.input("kelvin").valueAsNumber : delete r.light_temperature_kelvin, this.config = gf(r), this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: r },
				bubbles: !0,
				composed: !0
			}));
		});
	}
	input(e) {
		return this.root.querySelector(`#${e}`);
	}
	select(e) {
		return this.root.querySelector(`#${e}`);
	}
	cancelPhoto() {
		this.uploadGeneration++, this.root.querySelector("#photo-status").textContent = "";
	}
	disconnectedCallback() {
		this.cancelPhoto();
	}
	async choosePhoto() {
		let e = this.input("window-photo"), t = e.files?.[0];
		if (!t || !pf(this.kind)) return;
		e.value = "";
		let n = ++this.uploadGeneration, r = this.root.querySelector("#photo-status");
		r.textContent = "Uploading photo…";
		try {
			let e = await Ff(this.assistant, t);
			if (n !== this.uploadGeneration) return;
			let i = this.input("window-image");
			i.value = e, i.dispatchEvent(new Event("change", { bubbles: !0 })), r.textContent = "Photo uploaded to Home Assistant.";
		} catch (e) {
			n === this.uploadGeneration && (r.textContent = e instanceof Error ? e.message : "Photo upload failed. Try again.");
		}
	}
	get kind() {
		return this.root.querySelector("#kind").value;
	}
	invalidField() {
		return [...this.root.querySelectorAll("input:not(:disabled)")].find((e) => !e.validity.valid);
	}
	showTemperature() {
		let e = this.input("kelvin"), t = this.input("custom");
		e.disabled = t.disabled || !t.checked;
		let n = t.checked ? `${e.value} K` : "Default warm amber";
		this.root.querySelector("#reading").textContent = n, e.setAttribute("aria-valuetext", n);
	}
	showOpacity() {
		let e = this.input("shade-opacity"), t = `${e.value}%`;
		this.root.querySelector("#opacity-reading").textContent = t, e.setAttribute("aria-valuetext", t);
	}
	showFraming(e) {
		let t = this.input(e), n = `${t.value}%`;
		this.root.querySelector(`#${e}-value`).textContent = n, t.setAttribute("aria-valuetext", n);
	}
	showBarWidth() {
		let e = this.input("bar-width"), t = e.value === "0" ? "0 (hidden)" : e.value;
		this.root.querySelector("#bar-reading").textContent = t, e.setAttribute("aria-valuetext", t);
	}
	layout() {
		this.updateSuggestion();
		let e = this.root.querySelector("#layout"), t = ff[this.kind].layouts;
		for (let n of e.options) n.disabled = n.hidden = !t.some((e) => e === n.value);
		e.selectedOptions[0]?.disabled && (e.value = "normal");
		let n = e.value, r = this.kind === "garage";
		this.root.querySelector("[data-curtain]").hidden = this.select("panels").disabled = this.kind !== "curtain", this.root.querySelector("[data-single]").hidden = this.select("opening").disabled = this.kind !== "curtain" || this.select("panels").value !== "single", this.root.querySelector("[data-blind]").hidden = this.input("tilt-seconds").disabled = this.kind !== "blind";
		for (let e of this.root.querySelectorAll("[data-shade]")) e.hidden = this.kind !== "shade";
		for (let e of this.root.querySelectorAll("[data-window]")) e.hidden = !pf(this.kind);
		this.input("window-image").disabled = !pf(this.kind), this.select("mounting-side").disabled = !pf(this.kind), this.input("custom-cover-color").disabled = !pf(this.kind), this.input("cover-color").disabled = !pf(this.kind) || !this.input("custom-cover-color").checked, this.input("shade-opacity").disabled = this.kind !== "shade";
		for (let e of this.root.querySelectorAll("[data-garage]")) e.hidden = !r;
		this.input("light").disabled = this.input("custom").disabled = !r;
		let i = n === "double";
		for (let e of this.root.querySelectorAll("[data-double]")) e.hidden = !i;
		this.input("right-entity").disabled = this.input("right-seconds").disabled = !i, this.input("right-light").disabled = !i, this.showTemperature();
		let a = this.input("right-entity"), o = this.input("entity").value.trim(), s = i && o && a.value.trim() === o ? "Both doors use the same cover entity. Choose a different entity for one door." : "";
		a.setCustomValidity(s), a.setAttribute("aria-invalid", String(!!s));
		let c = this.root.querySelector("#duplicate");
		c.textContent !== s && (c.textContent = s), this.root.querySelector("#entity-label").textContent = i ? "Left door entity" : `${ff[this.kind].label} entity`, this.root.querySelector("#light-label").textContent = i ? "Left door light · optional" : "Garage light · optional", this.root.querySelector("#time-label").textContent = i ? "Left door travel time (seconds)" : "Travel time (seconds)";
		let l = this.input("seconds").value || "—";
		this.root.querySelector("#travel-summary").textContent = i ? `Left: ${l} s · Right: ${this.input("right-seconds").value || l} s` : `${l} seconds to open or close`;
		let u = this.invalidField();
		return this.root.querySelector("#invalid").textContent = u?.closest("details") ? `${u.labels?.[0]?.textContent?.trim()}: ${u.validationMessage}` : "", n;
	}
	setConfig(e) {
		(this.config?.entity !== e.entity || this.config?.cover_type !== e.cover_type || this.config?.window_image !== e.window_image) && this.cancelPhoto(), this.config = e, this.root.querySelector("#kind").value = e.cover_type ?? "garage", this.input("entity").value = e.entity ?? "";
		let t = e.curtain_opening === "right_to_left" || e.curtain_opening === "left_to_right";
		this.select("panels").value = t ? "single" : "center", this.select("opening").value = t ? e.curtain_opening : "left_to_right", this.input("name").value = e.name ?? "", this.input("seconds").value = String(e.travel_seconds ?? 10), this.input("tilt-seconds").value = String(e.tilt_seconds ?? 1), this.input("shade-opacity").value = String(e.shade_opacity ?? 100), this.input("window-image").value = e.window_image ?? "", this.root.querySelector("#window-ratio").value = e.window_aspect_ratio ?? "landscape", this.select("mounting-side").value = e.mounting_side ?? "inside", this.input("bar-width").value = String(e.glazing_bar_width ?? 3), this.input("bar-color").value = e.glazing_bar_color ?? "#30566a", this.input("custom-cover-color").checked = e.cover_color !== void 0, this.input("cover-color").value = e.cover_color ?? "#839d94", this.showBarWidth();
		for (let [t, , , , n] of If) this.input(t).value = String(e[t] ?? n), this.showFraming(t);
		this.showOpacity(), this.root.querySelector("#layout").value = e.variant ?? "normal", this.root.querySelector("#roof").value = e.roof_type ?? "pitched", this.input("right-entity").value = e.right_entity ?? "", this.input("left-label").value = e.left_label ?? "", this.input("right-label").value = e.right_label ?? "", this.input("right-seconds").value = String(e.right_travel_seconds ?? e.travel_seconds ?? 10), this.input("light").value = e.light_entity ?? "";
		let n = uf(e);
		this.input("custom").checked = n !== void 0, this.input("kelvin").value = String(n ?? 2700), this.input("right-light").value = e.right_light_entity ?? "", this.layout();
	}
	set hass(e) {
		this.assistant = e, this.updateSuggestion();
		let t = Object.keys(e.states).filter((e) => /^(cover|light)\./.test(e)).sort(), n = t.join("|");
		if (n !== this.choices) {
			this.choices = n;
			for (let e of ["cover", "light"]) this.root.querySelector(`#${e}s`).replaceChildren(...t.filter((t) => t.startsWith(e + ".")).map((e) => new Option(e, e)));
		}
	}
	updateSuggestion() {
		let e = hf(this.assistant?.states[this.input("entity").value]?.attributes.device_class), t = this.root.querySelector("#suggestion");
		t.hidden = !e || e === this.kind, !t.hidden && e && (t.textContent = `This entity reports device class ${e}. Suggested cover type: ${ff[e].label}.`);
	}
}, Rf = 4.8, zf = 4, Bf = 2.5, Vf = 6.362, Hf = 280 / Rf, Uf = 191, Wf = 92, Gf = .45, Kf = (e) => 1 / (1 + e / Vf), qf = (e, t, n) => Math.min(n, Math.max(t, e)), Jf = (e, t, n) => e === 1 ? [t / 2] : Array.from({ length: e }, (r, i) => n + i * (t - 2 * n) / (e - 1));
function Yf(e, t, n) {
	return n ? Jf(e, t, Gf) : Array.from({ length: e }, (n, r) => (r + .5) * t / e);
}
var Xf = (e, t, n, r) => e === 0 || t === 0 || e === n - 1 || t === r - 1, Zf = (e, t, n) => Math.min(n - 1, Math.floor(e * n / t));
function Qf(e, t, n) {
	return Array.from({ length: e }, () => Array.from({ length: t }, (e, r) => String(Zf(r, t, n) + 1)).join(""));
}
function $f(e, t, n, r, i) {
	let a = Yf(t, Rf, n), o = Yf(e, zf, n), s = [];
	for (let c = 0; c < e; c++) for (let l = 0; l < t; l++) {
		if (n && !Xf(c, l, e, t)) continue;
		let u = r[c]?.charAt(l) ?? "";
		if (u === ".") continue;
		let d = Number.parseInt(u, 10), f = Math.min(i - 1, d >= 1 ? d - 1 : Zf(l, t, i));
		s.push({
			row: c,
			column: l,
			zone: f,
			x: a[l] - Rf / 2,
			z: o[e - 1 - c]
		});
	}
	return s;
}
function ep(e, t, n, r, i) {
	return {
		x: Yf(r, Rf, i)[t] / Rf,
		y: (zf - Yf(n, zf, i)[n - 1 - e]) / zf
	};
}
function tp(e) {
	let t = e / 100;
	return [
		t <= 66 ? 255 : 329.698727446 * (t - 60) ** -.1332047592,
		t <= 66 ? 99.4708025861 * Math.log(t) - 161.1195681661 : 288.1221695283 * (t - 60) ** -.0755148492,
		t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307
	].map((e) => Math.round(qf(e, 0, 255)));
}
var np = (e) => `rgb(${e[0]},${e[1]},${e[2]})`, rp = (e, t) => np(e.map((e, n) => Math.round(e * t + [
	13,
	16,
	17
][n] * (1 - t))));
function ip(e, t, n) {
	let r = qf(n.beamAngle, 10, 120), i = Bf * Math.tan(r * Math.PI / 360), a = qf(i / .91, .45, 1.6), o = qf(Math.sqrt(40 / r), .55, 1.35), s = qf(Math.sqrt(40 / r), .55, 1), c = (e) => qf((1.3 - e) / .9, 0, 1), l = t.map((e) => e.on ? .3 + .7 * e.brightness / 100 : 0), u = t.map(() => ({
		n: 0,
		left: 0,
		right: 0
	})), d = qf(Math.sqrt(12 / Math.max(1, e.length)), .42, 1), f = qf(4.5 / Math.max(n.rows, n.columns), .5, 1), p = e.map((e) => {
		let r = t[e.zone], p = l[e.zone], m = Kf(e.z), h = 20 + (e.x + Rf / 2) * Hf, g = Uf + (h - Uf) * m, _ = Wf + -78 * m, v = Wf + 52 * m, y = Uf + (h - Uf) * Kf(zf), b = Math.min(46, i * Hf * m * .46), x = zf - e.z, S = Rf / 2 - Math.abs(e.x), C = u[e.zone];
		C.n++, S < 1.3 && (C[e.x < 0 ? "left" : "right"] += c(S));
		let w = (e) => Math.round(e * 10) / 10;
		return {
			zone: e.zone,
			x: w(g),
			floorY: w(v),
			trimY: w(_ + .6),
			trimRx: 6.4 * m * f,
			trimRy: 2 * m * f,
			lensY: w(_ + .8),
			lensRx: 4 * m * f,
			lensRy: 1.15 * m * f,
			haloY: w(_ + 1),
			haloRx: 13 * m * f,
			haloRy: 4 * m * f,
			poolRx: w(Math.min(64, 1.15 * i * Hf * m)),
			poolRy: 1.15 * i * (52 / Vf) * m * m,
			poolOpacity: r.on ? Math.min(1, Math.min(1, (.4 + .6 * p) * o) * Math.sqrt(d)) : 0,
			cone: [
				[g - 2.6 * m, _ + 1.2],
				[g + 2.6 * m, _ + 1.2],
				[g + b, v],
				[g - b, v]
			].map(([e, t]) => `${e.toFixed(1)},${t.toFixed(1)}`).join(" "),
			beamOpacity: p * s * d,
			glowX: w(y),
			glowRx: w(24 + 12 * x + 10 * a),
			glowOpacity: p * .6 / (1 + (x / 1.2) ** 2) * d,
			lens: r.on ? np(r.color) : "#1b2c3d",
			dim: r.unavailable ? .4 : 1,
			highlighted: n.highlight === e.zone,
			hitX: g,
			hitY: (_ + v) / 2
		};
	}), m = (e) => {
		let t = 0;
		return u.forEach((n, r) => {
			n[e] * l[r] > u[t][e] * l[t] && (t = r);
		}), {
			zone: t,
			opacity: l[t] * (.5 + .25 * Math.min(1, u[t][e]))
		};
	}, h = qf((40 - r) / 30, 0, 1);
	return {
		spots: p,
		zones: t.map((e, t) => ({
			lamp: np(e.color),
			mixA: rp(e.color, .74),
			mixB: rp(e.color, .44),
			mixC: rp(e.color, .12),
			washOpacity: .9 * l[t],
			tint: u[t].n ? .3 * Math.min(1, u[t].n / 4) : 0
		})),
		left: m("left"),
		right: m("right"),
		beamMid: .095 + .06 * h,
		beamEnd: .015 + .06 * h,
		sceneOpacity: t.every((e) => e.unavailable) ? .35 : 1
	};
}
function ap(e, t, n) {
	for (let r = e.spots.length - 1; r >= 0; r--) {
		let i = e.spots[r], a = (t - i.x) / i.trimRx, o = (n - i.trimY) / i.trimRy;
		if (a * a + o * o <= 1) return i.zone;
	}
	let r = -1, i = Infinity;
	for (let a of e.spots) {
		let e = a.hitX - t, o = (a.hitY - n) * .35, s = e * e + o * o;
		s < i && (i = s, r = a.zone);
	}
	return r;
}
var op = /^light\.[a-z0-9_]+$/, sp = (e, t, n) => typeof e == "number" && Number.isInteger(e) && e >= t && e <= n;
function cp(e) {
	if ((e?.light_type ?? "in_roof_spots") !== "in_roof_spots") throw Error("Unknown light type.");
	let t = e.zones;
	if (!Array.isArray(t) || t.length < 1) throw Error("Add at least one zone with a light entity.");
	if (t.length > 3) throw Error("Use at most 3 zones.");
	if (t.forEach((e, t) => {
		if (!op.test(e?.entity ?? "")) throw Error(`Select a light entity for zone ${t + 1}.`);
	}), new Set(t.map((e) => e.entity)).size !== t.length) throw Error("Each zone needs its own light entity.");
	let n = e.rows ?? 3, r = e.columns ?? 4, i = e.beam_angle ?? 40;
	if (!sp(n, 1, 8) || !sp(r, 1, 8)) throw Error("Rows and columns must be whole numbers from 1 to 8.");
	if (!sp(i, 10, 120)) throw Error("Beam angle must be a whole number of degrees from 10 to 120.");
	if (e.variant !== void 0 && e.variant !== "normal" && e.variant !== "compact") throw Error("Layout must be normal or compact.");
	if (e.walls_only !== void 0 && typeof e.walls_only != "boolean") throw Error("walls_only must be true or false.");
	let a = e.zone_map ?? Qf(n, r, t.length);
	if (!Array.isArray(a) || a.some((e) => typeof e != "string" || !/^[1-9.]*$/.test(e))) throw Error("Zone map rows may contain only zone numbers and “.” for no spot.");
	let o = Math.max(0, ...a.flatMap((e) => [...e].map(Number).filter(Number.isFinite)));
	if (o > t.length) throw Error(`Zone map uses zone ${o}, but only ${t.length} zone${t.length === 1 ? " is" : "s are"} configured.`);
	return {
		...e,
		zones: t,
		rows: n,
		columns: r,
		beam_angle: i,
		walls_only: e.walls_only ?? !1,
		variant: e.variant ?? "normal",
		zone_map: a
	};
}
function lp(e) {
	let t = e?.attributes ?? {}, n = !!e && (e.state === "on" || e.state === "off"), r = Array.isArray(t.supported_color_modes) ? t.supported_color_modes : void 0, i = Number(t.supported_features) || 0, a = r ? r.some((e) => e !== "onoff") : !!(i & 1), o = r ? r.includes("color_temp") : !!(i & 2), s = Number(t.brightness), c = Number.isFinite(s) && s > 0 ? Math.max(1, Math.round(s / 255 * 100)) : void 0, l = Number(t.color_temp_kelvin), u = t.rgb_color, d = t.color_mode !== "color_temp" && Array.isArray(u) && u.length === 3 && u.every(Number.isFinite) ? u : void 0;
	return {
		available: n,
		on: e?.state === "on",
		dimmable: a,
		tunable: o,
		brightness: c,
		colour: d,
		kelvin: Number.isFinite(l) && l > 0 ? Math.round(l) : void 0,
		minKelvin: Number(t.min_color_temp_kelvin) || 2e3,
		maxKelvin: Number(t.max_color_temp_kelvin) || 6500
	};
}
var up = (e, t, n) => e.callService("light", n ? "turn_on" : "turn_off", { entity_id: t }), dp = (e, t, n) => e.callService("light", "turn_on", {
	entity_id: t,
	brightness_pct: n
}), fp = (e, t, n) => e.callService("light", "turn_on", {
	entity_id: t,
	color_temp_kelvin: n
}), pp = "M86 124H258L320 153.6V174H0V150.2Z", mp = "M0 14H20L86 44V124L0 150.2Z", hp = "M320 14H300L258 44V124L320 153.6Z", gp = "M107.5 124L-23.0 174 M129.0 124L32.1 174 M150.5 124L87.2 174 M172.0 124L142.3 174 M193.5 124L197.4 174 M215.0 124L252.5 174 M236.5 124L307.6 174", _p = Array.from({ length: 12 }, (e, t) => `M${18 + t * 26} 6l-8 8`).join(" "), vp = `<svg class="room" viewBox="0 0 320 174" aria-hidden="true">
  <defs>
    <linearGradient id="fade-h" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".11" stop-color="#fff"/><stop offset=".89" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="fade-v" x1="0" y1="0" x2="0" y2="1"><stop offset=".8" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <mask id="mask-h" maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="174"><rect width="320" height="174" fill="url(#fade-h)"/></mask>
    <mask id="mask-v" maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="174"><rect width="320" height="174" fill="url(#fade-v)"/></mask>
    <clipPath id="back-clip"><rect x="86" y="44" width="172" height="80"/></clipPath>
    <filter id="soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.6"/></filter>
    <filter id="cone-blur" filterUnits="userSpaceOnUse" x="0" y="0" width="320" height="174"><feGaussianBlur stdDeviation="1.8"/></filter>
    <linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#0d2346"/><stop offset="1" stop-color="#16345c"/></linearGradient>
    ${[
	0,
	1,
	2
].map((e) => `
  <linearGradient id="beam-${e}" x1="0" y1="0" x2="0" y2="1"><stop style="stop-color:var(--lamp-${e})" stop-opacity=".34"/><stop class="beam-mid" offset=".5" style="stop-color:var(--lamp-${e})"/><stop class="beam-end" offset="1" style="stop-color:var(--lamp-${e})"/></linearGradient>
  <radialGradient id="pool-${e}"><stop style="stop-color:var(--lamp-${e})" stop-opacity=".3"/><stop offset=".35" style="stop-color:var(--lamp-${e})" stop-opacity=".2"/><stop offset=".7" style="stop-color:var(--lamp-${e})" stop-opacity=".07"/><stop offset="1" style="stop-color:var(--lamp-${e})" stop-opacity="0"/></radialGradient>
  <radialGradient id="halo-${e}"><stop style="stop-color:var(--lamp-${e})" stop-opacity=".75"/><stop offset="1" style="stop-color:var(--lamp-${e})" stop-opacity="0"/></radialGradient>
  <radialGradient id="wash-${e}" cx=".5" cy=".5" r=".5"><stop style="stop-color:var(--mix-a-${e})"/><stop offset=".45" style="stop-color:var(--mix-b-${e})" stop-opacity=".7"/><stop offset="1" style="stop-color:var(--mix-c-${e})" stop-opacity="0"/></radialGradient>
  <linearGradient id="floortint-${e}" x1="0" y1="0" x2="0" y2="1"><stop style="stop-color:var(--mix-b-${e})"/><stop offset="1" style="stop-color:var(--mix-c-${e})" stop-opacity="0"/></linearGradient>
  <linearGradient id="side-${e}" x1="0" y1="0" x2="0" y2="1"><stop style="stop-color:var(--mix-c-${e})" stop-opacity=".15"/><stop offset="1" style="stop-color:var(--mix-b-${e})"/></linearGradient>`).join("")}
  </defs>
  <g mask="url(#mask-h)"><g mask="url(#mask-v)">
    <path d="M20 14H300L258 44H86Z" fill="#0a1524"/>
    <path d="M86 44H258V124H86Z" fill="#0c192b"/>
    <path d="${mp}" fill="#0f1e31"/><path class="side-left" d="${mp}"/>
    <path d="${hp}" fill="#0f1e31"/><path class="side-right" d="${hp}"/>
    <path d="${pp}" fill="#0b1727"/>
    ${[
	0,
	1,
	2
].map((e) => `<g class="wash"><path d="${pp}" fill="url(#floortint-${e})"/></g>`).join("")}
    <g class="glows"></g>
    <path d="${gp}" stroke="#2c4c68" stroke-width=".6" opacity=".45"/>
    <polygon points="287.4,49.6 268.4,57.9 268.4,100.5 287.4,102.6" fill="url(#night)" stroke="#6dabbc" stroke-width=".8"/>
    <path d="M277.9 53.7L277.9 101.6" stroke="#4f8aa0" stroke-width=".8"/>
    <path d="M288.2 104.0L267.6 101.5" stroke="#6dabbc" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M86 44V124M258 44V124M86 44H258" fill="none" stroke="#02060d" stroke-width="2.4" opacity=".4" filter="url(#soft)"/>
    <path d="M86 44H258" stroke="#2f5670" stroke-width=".6" opacity=".7"/>
    <g class="pools"></g>
    <g class="cones" filter="url(#cone-blur)"></g>
    <g class="fixtures"></g>
    <path d="M0 6H320V14H0Z" fill="#142c40"/>
    <path d="M0 6.5H320M0 14H320" stroke="#6dabbc" stroke-width=".9"/>
    <path d="${_p}" stroke="#3d6c84" stroke-width=".6" opacity=".6"/>
  </g></g>
</svg>`, yp = "http://www.w3.org/2000/svg";
function $(e, t, n) {
	let r = typeof n == "number" ? String(Math.round(n * 1e3) / 1e3) : n;
	e.getAttribute(t) !== r && e.setAttribute(t, r);
}
function bp(e, t, n) {
	let r = document.createElementNS(yp, t);
	for (let [e, t] of Object.entries(n)) $(r, e, t);
	return e.append(r), r;
}
function xp(e) {
	let t = (t) => e.querySelector(`.${t}`), n = [...e.querySelectorAll(".wash")], r = n.map((e) => e.firstElementChild), i = [t("side-left"), t("side-right")], a = [...e.querySelectorAll(".beam-mid")], o = [...e.querySelectorAll(".beam-end")], s = [], c = /* @__PURE__ */ new Map();
	function l(e) {
		if (e !== s.length) {
			for (let e of [
				"glows",
				"pools",
				"cones",
				"fixtures"
			]) t(e).replaceChildren();
			s = Array.from({ length: e }, () => {
				let e = bp(t("fixtures"), "g", {}), n = bp(e, "ellipse", {}), r = bp(e, "g", {});
				return {
					glow: bp(t("glows"), "ellipse", {
						cy: 124,
						ry: 60,
						"clip-path": "url(#back-clip)"
					}),
					pool: bp(t("pools"), "ellipse", {}),
					cone: bp(t("cones"), "polygon", {}),
					fixture: e,
					halo: n,
					trim: bp(r, "ellipse", { fill: "#0a1422" }),
					lens: bp(r, "ellipse", {})
				};
			});
		}
	}
	function u(t) {
		t.zones.forEach((t, i) => {
			for (let [n, r] of [
				[`--lamp-${i}`, t.lamp],
				[`--mix-a-${i}`, t.mixA],
				[`--mix-b-${i}`, t.mixB],
				[`--mix-c-${i}`, t.mixC]
			]) c.get(n) !== r && (c.set(n, r), e.style.setProperty(n, r));
			$(n[i], "opacity", t.washOpacity), $(r[i], "opacity", t.tint);
		});
		for (let e = t.zones.length; e < n.length; e++) $(n[e], "opacity", 0);
		for (let [e, n] of [[i[0], t.left], [i[1], t.right]]) $(e, "fill", `url(#side-${n.zone})`), $(e, "opacity", n.opacity);
		for (let e of a) $(e, "stop-opacity", t.beamMid);
		for (let e of o) $(e, "stop-opacity", t.beamEnd);
		$(e, "opacity", t.sceneOpacity), t.spots.forEach((e, t) => {
			let n = s[t];
			n && ($(n.glow, "cx", e.glowX), $(n.glow, "rx", e.glowRx), $(n.glow, "fill", `url(#wash-${e.zone})`), $(n.glow, "opacity", e.glowOpacity), $(n.pool, "cx", e.x), $(n.pool, "cy", e.floorY), $(n.pool, "rx", e.poolRx), $(n.pool, "ry", e.poolRy), $(n.pool, "fill", `url(#pool-${e.zone})`), $(n.pool, "opacity", e.poolOpacity), $(n.cone, "points", e.cone), $(n.cone, "fill", `url(#beam-${e.zone})`), $(n.cone, "opacity", e.beamOpacity), $(n.halo, "cx", e.x), $(n.halo, "cy", e.haloY), $(n.halo, "rx", e.haloRx), $(n.halo, "ry", e.haloRy), $(n.halo, "fill", `url(#halo-${e.zone})`), $(n.halo, "opacity", e.beamOpacity), $(n.trim, "cx", e.x), $(n.trim, "cy", e.trimY), $(n.trim, "rx", e.trimRx), $(n.trim, "ry", e.trimRy), $(n.trim, "stroke", e.highlighted ? "#a6dbe8" : "#6dabbc"), $(n.trim, "stroke-width", e.highlighted ? 1 : .7), $(n.lens, "cx", e.x), $(n.lens, "cy", e.lensY), $(n.lens, "rx", e.lensRx), $(n.lens, "ry", e.lensRy), $(n.lens, "fill", e.lens), $(n.trim.parentElement, "opacity", e.dim));
		});
	}
	return {
		layout: l,
		draw: u
	};
}
// src/cards/light/light.ts
var Sp = 5e3, Cp = `<style>${fu}
:host{container-type:inline-size;min-width:0}
ha-card{padding:12px 16px;display:grid;gap:4px;align-items:center}
h2{margin:0;font-size:18px;font-weight:550;line-height:1.3;overflow-wrap:anywhere}
.room{display:block;width:100%;height:clamp(100px,40cqi,180px);cursor:pointer;touch-action:manipulation}
.detail{min-width:0}
.zones{display:grid;grid-template-columns:repeat(var(--zones,1),minmax(0,1fr));gap:8px 14px}
.zone{min-width:0}
.row{display:flex;flex-wrap:wrap;gap:6px 8px;align-items:center;justify-content:space-between;min-height:40px}
.readout{min-width:0}
.name{display:block;font-size:13px;font-weight:550;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.state{font-size:16px;font-weight:600;color:#86ecf2}
.zone[data-state=on] .state{color:#ffc27c}.zone[data-state=unavailable] .state{color:var(--gleam-muted,#8ba8c6)}
.age{color:var(--gleam-muted,#8ba8c6);font-size:12px;margin-left:4px}
.action{flex:none;width:76px;height:36px;padding:0 1px;line-height:1.15}
.action:disabled{cursor:default;opacity:.45}
.level{display:grid;grid-template-columns:1fr auto;align-items:baseline;margin-top:4px;font-size:12px;color:var(--gleam-muted,#8ba8c6);min-width:0}
.level input{grid-column:1/-1;width:100%;margin:6px 0 0}
.brightness input{accent-color:#9cc4f5}
.temperatures .level{margin-top:0}
.label{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.value{font-variant-numeric:tabular-nums}
.scale{grid-column:1/-1;height:3px;margin:2px 2px 0;border-radius:2px;opacity:.75;background:linear-gradient(90deg,${[
	2e3,
	2700,
	3500,
	4500,
	5500,
	6500
].map((e) => np(tp(e))).join(",")})}
details{margin-top:10px;border-top:1px solid var(--gleam-border,#1d3b60);padding-top:4px}
summary{min-height:36px;display:flex;align-items:center;gap:8px;padding:4px 2px;font-size:13px;color:#9fb4cb;cursor:pointer;list-style:none}
summary::-webkit-details-marker{display:none}
summary::before{content:"";border-left:6px solid #9fb4cb;border-block:4px solid transparent}
details[open] summary::before{transform:rotate(90deg)}
.hint{margin:4px 0 0;color:var(--gleam-muted,#8ba8c6);font-size:12px}.hint:empty{display:none}
@container(min-width:590px){
  ha-card{grid-template-columns:1.15fr 1fr;column-gap:20px;align-items:start}
  header{grid-column:2;grid-row:1}.room{grid-column:1;grid-row:1/3;align-self:center}.detail{grid-column:2;grid-row:2}
  .zones{grid-template-columns:minmax(0,1fr);gap:10px}
}
:host([compact]) ha-card{padding:8px}
:host([compact]) h2{font-size:14px}
:host([compact]) .room{height:clamp(64px,44cqi,104px)}
:host([compact]) .zones{grid-template-columns:minmax(0,1fr);gap:4px}
:host([compact]) .state{font-size:15px}
:host([compact]) .action{height:32px}
:host([compact]) :is(.brightness,details){display:none}
</style>
<ha-card><header><h2></h2></header>${vp}
<div class="detail"><div class="zones controls"></div>
<details><summary>Colour temperature</summary><div class="zones temperatures"></div></details>
<p class="hint" role="status"></p></div></ha-card>`, wp = "<div class=\"row\"><div class=\"readout\"><span class=\"name\"></span><strong class=\"state\" role=\"status\"></strong><span class=\"age\"></span></div>\n<button type=\"button\" class=\"action\"></button></div>\n<label class=\"level brightness\"><span>Brightness</span><span class=\"value\"></span><input type=\"range\" min=\"1\" max=\"100\" step=\"1\"></label>", Tp = "<span class=\"label\"></span><span class=\"value\"></span><input type=\"range\" step=\"50\"><span class=\"scale\" aria-hidden=\"true\"></span>";
function Ep(e, t) {
	e.textContent !== t && (e.textContent = t);
}
function Dp(e, t, n) {
	e.getAttribute(t) !== n && e.setAttribute(t, n);
}
var Op = class extends HTMLElement {
	root = this.attachShadow({ mode: "open" });
	config;
	client;
	zones = [];
	spots = [];
	scene;
	highlight;
	renderer;
	svg;
	observer;
	visible = !1;
	frame = 0;
	timer = 0;
	static getConfigElement() {
		return document.createElement("gleam-light-editor");
	}
	static getStubConfig(e) {
		let t = Object.keys(e?.states ?? {}).filter((e) => e.startsWith("light.")).slice(0, 2);
		return {
			light_type: "in_roof_spots",
			zones: (t.length ? t : ["light.ceiling_spots"]).map((e) => ({ entity: e }))
		};
	}
	getCardSize() {
		return this.config?.variant === "compact" ? 3 : 5;
	}
	getGridOptions() {
		return {
			columns: this.config?.variant === "compact" ? 6 : 12,
			rows: "auto",
			min_columns: 6
		};
	}
	constructor() {
		super(), this.root.innerHTML = Cp, this.svg = this.root.querySelector("svg.room"), this.renderer = xp(this.svg), this.svg.addEventListener("click", (e) => {
			let t = this.zoneAt(e);
			t >= 0 && this.toggle(t);
		}), this.svg.addEventListener("pointermove", (e) => {
			e.pointerType === "mouse" && this.setHighlight(this.zoneAt(e));
		}), this.svg.addEventListener("pointerleave", () => this.setHighlight(void 0));
		let e = this.root.querySelector(".detail"), t = (e) => {
			let t = e.target.closest?.("[data-zone]");
			return t ? Number(t.getAttribute("data-zone")) : void 0;
		};
		e.addEventListener("pointerover", (e) => this.setHighlight(t(e))), e.addEventListener("pointerleave", () => this.setHighlight(void 0)), e.addEventListener("focusin", (e) => this.setHighlight(t(e))), e.addEventListener("focusout", (t) => {
			this.root.activeElement && e.contains(t.relatedTarget) || this.setHighlight(void 0);
		});
	}
	setConfig(e) {
		let t = cp(e), n = !this.config || t.zones.length !== this.zones.length || t.zones.some((e, t) => e.entity !== this.zones[t].id);
		this.config = t, this.toggleAttribute("compact", t.variant === "compact"), n && this.buildZones(), t.zones.forEach((e, t) => {
			this.zones[t].name = this.zoneName(t);
		}), this.spots = $f(t.rows, t.columns, t.walls_only, t.zone_map, t.zones.length), this.renderer.layout(this.spots.length), this.sync(!0);
	}
	set hass(e) {
		this.client = e, this.sync(!1);
	}
	connectedCallback() {
		this.observer = new IntersectionObserver(([e]) => {
			this.visible = e.isIntersecting, this.schedule();
		}), this.observer.observe(this), document.addEventListener("visibilitychange", this.schedule), this.refresh();
	}
	disconnectedCallback() {
		this.observer?.disconnect(), this.observer = void 0, this.visible = !1, document.removeEventListener("visibilitychange", this.schedule), cancelAnimationFrame(this.frame), clearTimeout(this.timer), this.frame = this.timer = 0;
	}
	zoneName(e) {
		return this.config.zones[e].name?.trim() || String(this.zones[e]?.entity?.attributes.friendly_name ?? `Zone ${e + 1}`);
	}
	buildZones() {
		let e = this.root.querySelector(".controls"), t = this.root.querySelector(".temperatures");
		this.zones = this.config.zones.map((e, t) => {
			let n = document.createElement("div");
			n.className = "zone", n.dataset.zone = String(t), n.innerHTML = wp, n.querySelector("button").addEventListener("click", () => this.toggle(t));
			let r = n.querySelector("input");
			r.addEventListener("input", () => {
				this.zones[t].draftBrightness = r.valueAsNumber, this.refresh();
			}), r.addEventListener("change", () => this.setLevel(t, "brightness", r.valueAsNumber));
			let i = document.createElement("label");
			i.className = "level kelvin", i.dataset.zone = String(t), i.innerHTML = Tp;
			let a = i.querySelector("input");
			return a.addEventListener("input", () => {
				this.zones[t].draftKelvin = a.valueAsNumber, this.refresh();
			}), a.addEventListener("change", () => this.setLevel(t, "kelvin", a.valueAsNumber)), {
				id: e.entity,
				name: "",
				error: "",
				remembered: {},
				el: n,
				temperature: i
			};
		}), e.replaceChildren(...this.zones.map((e) => e.el)), t.replaceChildren(...this.zones.map((e) => e.temperature)), this.style.setProperty("--zones", String(this.zones.length));
	}
	sync(e) {
		if (!this.config) return;
		let t = e;
		this.zones.forEach((e, n) => {
			let r = this.client?.states[e.id];
			if (r === e.entity) return;
			e.entity = r, t = !0;
			let i = lp(r);
			i.brightness !== void 0 && (e.remembered.brightness = i.brightness), i.kelvin !== void 0 && (e.remembered.kelvin = i.kelvin), e.name = this.zoneName(n);
			let a = e.request;
			a && i.available && (a.on === void 0 || i.on === a.on) && (a.brightness === void 0 || i.brightness !== void 0 && Math.abs(i.brightness - a.brightness) <= 1) && (a.kelvin === void 0 || i.kelvin !== void 0 && Math.abs(i.kelvin - a.kelvin) <= 60) && (e.request = void 0);
		}), t && this.refresh();
	}
	view(e) {
		let t = lp(e.entity), n = e.request, r = t.available && (n?.on ?? t.on), i = e.draftBrightness ?? n?.brightness ?? t.brightness ?? e.remembered.brightness ?? 100, a = e.draftKelvin ?? n?.kelvin, o = a ?? t.kelvin ?? e.remembered.kelvin ?? 2700;
		return {
			light: t,
			on: r,
			brightness: i,
			kelvin: o,
			color: a === void 0 && t.colour ? t.colour : tp(o)
		};
	}
	async send(e, t, n, r) {
		let i = {
			...n ? e.request : void 0,
			...t,
			deadline: performance.now() + Sp
		};
		e.request = i, e.error = "", this.refresh();
		try {
			await r();
		} catch {
			if (e.request !== i) return;
			e.request = void 0, e.error = `${e.name}: command failed. Try again.`, this.refresh();
		}
	}
	toggle(e) {
		let t = this.zones[e], n = this.client;
		if (!t || !n) return;
		let { light: r, on: i } = this.view(t);
		r.available && this.send(t, { on: !i }, !1, () => up(n, t.id, !i));
	}
	setLevel(e, t, n) {
		let r = this.zones[e], i = this.client;
		r.draftBrightness = r.draftKelvin = void 0, !i || !lp(r.entity).available || !Number.isFinite(n) ? this.refresh() : this.send(r, {
			on: !0,
			[t]: n
		}, !0, () => t === "brightness" ? dp(i, r.id, n) : fp(i, r.id, n));
	}
	zoneAt(e) {
		let t = this.svg.getScreenCTM();
		if (!t || !this.scene) return -1;
		let n = new DOMPoint(e.clientX, e.clientY).matrixTransform(t.inverse());
		return ap(this.scene, n.x, n.y);
	}
	setHighlight(e) {
		let t = e !== void 0 && e >= 0 ? e : void 0;
		t !== this.highlight && (this.highlight = t, this.schedule());
	}
	refresh = () => {
		if (clearTimeout(this.timer), this.timer = 0, !this.config) return;
		let e = performance.now();
		Ep(this.root.querySelector("h2"), this.config.name ?? "Spots");
		let t = !1, n = Infinity;
		this.zones.forEach((r) => {
			r.request && e >= r.request.deadline && (r.request = void 0, r.error = `${r.name}: change not confirmed within five seconds.`);
			let { light: i, on: a, brightness: o, kelvin: s } = this.view(r), c = r.el, l = i.available, u = r.name;
			Dp(c, "data-state", l ? a ? "on" : "off" : "unavailable"), Ep(c.querySelector(".name"), u), Ep(c.querySelector(".state"), l ? a ? "On" : "Off" : "Unavailable");
			let d = r.request, f = d ? d.on === !1 ? "Turning off…" : !i.on || d.brightness === void 0 && d.kelvin === void 0 ? "Turning on…" : "Adjusting…" : "", p = l ? f || wf(r.entity?.last_changed) : "";
			Ep(c.querySelector(".age"), p ? `· ${p}` : "");
			let m = c.querySelector("button"), h = a ? "Turn off" : "Turn on";
			Ep(m, h), Dp(m, "aria-label", `${h} ${u}`), m.disabled = !l;
			let g = c.querySelector(".brightness"), _ = g.querySelector("input");
			g.hidden = l && !i.dimmable, _.disabled = !l, r.draftBrightness === void 0 && _.valueAsNumber !== o && (_.value = String(o));
			let v = l ? a ? `${o}%` : "Off" : "—";
			Ep(g.querySelector(".value"), v), Dp(_, "aria-label", `${u} brightness`), Dp(_, "aria-valuetext", v);
			let y = r.temperature, b = y.querySelector("input");
			y.hidden = l && !i.tunable, t ||= !y.hidden, b.min = String(i.minKelvin), b.max = String(i.maxKelvin), b.disabled = !l, r.draftKelvin === void 0 && b.valueAsNumber !== s && (b.value = String(s)), Ep(y.querySelector(".label"), u);
			let x = l ? `${s} K` : "—";
			Ep(y.querySelector(".value"), x), Dp(b, "aria-label", `${u} colour temperature`), Dp(b, "aria-valuetext", x), b.style.accentColor = l ? np(tp(s)) : "#6b7d90", r.request ? n = Math.min(n, r.request.deadline - e) : p && r.entity?.last_changed && (n = Math.min(n, 6e4 - (Date.now() - Date.parse(r.entity.last_changed)) % 6e4));
		}), this.root.querySelector("details").hidden = !t, Ep(this.root.querySelector(".hint"), this.zones.map((e) => e.error).filter(Boolean).join(" ")), Number.isFinite(n) && this.isConnected && (this.timer = window.setTimeout(this.refresh, Math.max(1, n))), this.schedule();
	};
	schedule = () => {
		!this.frame && this.config && this.isConnected && this.visible && !document.hidden && (this.frame = requestAnimationFrame(this.draw));
	};
	draw = () => {
		this.frame = 0;
		let e = this.config;
		this.scene = ip(this.spots, this.zones.map((e) => {
			let { light: t, on: n, brightness: r, color: i } = this.view(e);
			return {
				on: n,
				brightness: t.dimmable ? r : 100,
				color: i,
				unavailable: !t.available
			};
		}), {
			rows: e.rows,
			columns: e.columns,
			beamAngle: e.beam_angle,
			highlight: this.highlight
		}), this.renderer.draw(this.scene);
	};
}, kp = [
	"#4fc3f7",
	"#ffb74d",
	"#ce93d8"
], Ap = class extends HTMLElement {
	root = this.attachShadow({ mode: "open" });
	config;
	choices = "";
	constructor() {
		super(), this.root.innerHTML = `<style>${Ku}
      form{container-type:inline-size}
      input,select{font:inherit;color:inherit;background:var(--card-background-color,transparent);border:1px solid var(--divider-color,#888);
        border-radius:8px;padding:9px;width:100%;min-width:0;box-sizing:border-box}
      input[type=checkbox]{width:auto}input[type=range]{padding:0}
      button{font:inherit;color:var(--primary-color,#03a9f4);background:none;border:1px solid var(--divider-color,#8888);border-radius:18px;min-height:36px;padding:0 14px;cursor:pointer}
      button:disabled{color:var(--disabled-text-color,#888);cursor:default}
      :focus-visible{outline:2px solid var(--primary-color,#03a9f4);outline-offset:2px}
      small{font-size:12px;color:var(--secondary-text-color,#666)}
      .toggle{display:flex;align-items:center;gap:8px}
      .zone{display:grid;grid-template-columns:auto minmax(0,1.3fr) minmax(0,1fr) auto;gap:8px;align-items:end}
      .badge{display:grid;place-items:center;width:26px;height:26px;margin-bottom:8px;border-radius:50%;font-size:13px;font-weight:600;color:#10202e}
      .remove{width:40px;height:40px;min-height:0;padding:0;border:0;border-radius:50%;color:var(--secondary-text-color,#666)}
      .steppers{display:flex;flex-wrap:wrap;gap:12px 28px}
      .stepper{display:flex;align-items:center;gap:10px}.stepper span{min-width:64px}
      .stepper button{width:36px;height:36px;min-height:0;padding:0;border-radius:50%;color:inherit;font-size:18px;line-height:1}
      .stepper output{min-width:20px;text-align:center;font-variant-numeric:tabular-nums}
      .presets{display:flex;flex-wrap:wrap;gap:8px}
      .plan-wrap{display:grid;justify-items:center;gap:8px}
      .plan-wrap>span{font-size:12px;letter-spacing:.04em;color:var(--secondary-text-color,#666)}
      .plan{position:relative;width:min(100%,480px);aspect-ratio:4.8/4;box-sizing:border-box;border:1px solid var(--divider-color,#888);border-top-width:3px;border-radius:2px}
      .plan button{position:absolute;transform:translate(-50%,-50%);padding:0;min-height:0;border-radius:50%;font-weight:600;color:#10202e}
      .plan button.none{border:1.5px dashed var(--secondary-text-color,#888);background:none;color:inherit}
      .plan .unused{position:absolute;transform:translate(-50%,-50%);width:5px;height:5px;border-radius:50%;background:var(--divider-color,#888)}
      .legend{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:13px}
      .legend span{display:inline-flex;align-items:center;gap:6px}
      .legend i{width:12px;height:12px;border-radius:50%;box-sizing:border-box}
      p{margin:0;color:var(--error-color,#c62828)}p:empty{display:none}</style>
      <form><fieldset><legend>Light setup</legend><div class="fields">
        <label>Light type<select id="light-type"><option value="in_roof_spots">In-roof spots</option></select></label>
        <label>Layout<select id="layout"><option value="normal">Normal</option><option value="compact">Compact</option></select></label>
        <label>Display name<input id="name" placeholder="Spots"></label>
      </div></fieldset>
      <fieldset><legend>Zones</legend><div class="fields">
        <small>Each zone is one light entity, or a light group, that switches its spots together.</small>
        <datalist id="lights"></datalist><div id="zones" class="fields"></div>
        <div><button type="button" id="add-zone">+ Add zone</button></div>
      </div></fieldset>
      <details open><summary>Spot layout<small id="layout-summary"></small></summary><div class="fields">
        <div class="steppers">
          <div class="stepper" role="group" aria-label="Rows"><span>Rows</span><button type="button" data-step="rows:-1" aria-label="Fewer rows">−</button><output id="rows"></output><button type="button" data-step="rows:1" aria-label="More rows">+</button></div>
          <div class="stepper" role="group" aria-label="Columns"><span>Columns</span><button type="button" data-step="columns:-1" aria-label="Fewer columns">−</button><output id="columns"></output><button type="button" data-step="columns:1" aria-label="More columns">+</button></div>
        </div>
        <label class="toggle"><input id="walls" type="checkbox">Only along the walls</label>
        <small>Keeps the outer ring of the grid and moves it 45 cm from the walls.</small>
        <label><span>Beam angle · <span id="beam-reading"></span></span><input id="beam" type="range" min="10" max="120" step="5"></label>
        <small>From the spot’s datasheet. Typical downlights are 36–60°; narrow beams give smaller, brighter pools.</small>
      </div></details>
      <details open><summary>Assign spots to zones<small>Seen from above. Tap a spot to move it to the next zone; after the last zone it becomes “no spot”.</small></summary><div class="fields">
        <div class="presets" role="group" aria-label="Quick split">
          <button type="button" data-split="columns">Left | right</button>
          <button type="button" data-split="rows">Back | front</button>
          <button type="button" data-split="ring" id="ring-split">Walls | centre</button>
        </div>
        <div class="plan-wrap"><span>BACK WALL</span><div class="plan" role="group" aria-label="Spot plan"></div><span>FRONT · VIEWER SIDE</span></div>
        <div class="legend"></div>
      </div></details>
      <p id="invalid" role="status"></p></form>`, this.root.querySelector("form").addEventListener("submit", (e) => e.preventDefault()), this.root.addEventListener("change", (e) => {
			let t = e.target;
			if (this.config) {
				if (t.dataset.field) {
					let e = Number(t.dataset.index), n = this.config.zones.map((e) => ({ ...e })), r = t.value.trim();
					t.dataset.field === "name" ? r ? n[e].name = r : delete n[e].name : n[e].entity = r, this.update({ zones: n });
				} else t.id === "name" ? this.update({ name: t.value.trim() || void 0 }) : t.id === "layout" ? this.update({ variant: t.value === "compact" ? "compact" : void 0 }) : t.id === "walls" ? this.update({ walls_only: t.checked || void 0 }) : t.id === "beam" && this.update({ beam_angle: t.valueAsNumber === 40 ? void 0 : t.valueAsNumber });
			}
		}), this.root.addEventListener("input", (e) => {
			e.target.id === "beam" && this.showBeam();
		}), this.root.addEventListener("click", (e) => {
			let t = e.target.closest("button");
			if (t && this.config) {
				if (t.id === "add-zone") this.addZone();
				else if (t.dataset.remove) this.removeZone(Number(t.dataset.remove));
				else if (t.dataset.step) {
					let [e, n] = t.dataset.step.split(":");
					this.resize(e, this.grid[e] + Number(n));
				} else if (t.dataset.split) this.split(t.dataset.split);
				else if (t.dataset.cell) {
					let [e, n] = t.dataset.cell.split(",").map(Number);
					this.cycle(e, n);
				}
			}
		});
	}
	setConfig(e) {
		this.config = e, this.validate(e), this.render();
	}
	set hass(e) {
		let t = Object.keys(e.states).filter((e) => e.startsWith("light.")).sort(), n = t.join("|");
		n !== this.choices && (this.choices = n, this.root.querySelector("#lights").replaceChildren(...t.map((e) => new Option(e, e))));
	}
	get grid() {
		let e = this.config;
		return {
			rows: e.rows ?? 3,
			columns: e.columns ?? 4,
			walls: !!e.walls_only,
			zones: Math.max(1, e.zones?.length ?? 1)
		};
	}
	cells(e = this.grid.rows, t = this.grid.columns, n = this.grid.zones) {
		let r = this.config.zone_map;
		return Array.from({ length: e }, (e, i) => {
			let a = Array.isArray(r) ? r[i] : void 0, o = typeof a == "string" || typeof a == "number" && Number.isSafeInteger(a) && a > 0 ? String(a) : "";
			return Array.from({ length: t }, (e, r) => {
				if (o[r] === ".") return 0;
				let i = Number(o[r]);
				return i >= 1 ? Math.min(n, i) : Zf(r, t, n) + 1;
			});
		});
	}
	mapOf(e) {
		return e.map((e) => e.map((e) => e ? String(e) : ".").join(""));
	}
	validate(e) {
		let t = this.root.querySelector("#invalid");
		try {
			let n = e.zone_map;
			if (n != null && (!Array.isArray(n) || n.some((e) => typeof e != "string"))) throw Error("Quote each zone_map row in YAML, for example [\"1111\", \"2222\"]. To repair it here, edit the spot plan or choose a quick split.");
			return cp(e), t.textContent = "", !0;
		} catch (e) {
			return t.textContent = e instanceof Error ? e.message : "Invalid configuration.", !1;
		}
	}
	update(e) {
		let t = {
			...this.config,
			...e
		};
		for (let n of Object.keys(e)) e[n] === void 0 && delete t[n];
		this.config = t;
		let n = this.validate(t);
		this.render(), n && this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: t },
			bubbles: !0,
			composed: !0
		}));
	}
	addZone() {
		let e = this.config.zones ?? [];
		e.length >= 3 || this.update({
			zones: [...e, { entity: "" }],
			zone_map: this.mapOf(this.cells())
		});
	}
	removeZone(e) {
		let t = this.config.zones;
		if (t.length <= 1) return;
		let n = e + 1, r = this.cells().map((e) => e.map((e) => e === n ? Math.max(1, n - 1) : e > n ? e - 1 : e));
		this.update({
			zones: t.filter((t, n) => n !== e),
			zone_map: this.mapOf(r)
		});
	}
	resize(e, t) {
		if (t < 1 || t > 8) return;
		let { rows: n, columns: r } = this.grid, i = {
			rows: n,
			columns: r,
			[e]: t
		};
		this.update({
			[e]: t,
			zone_map: this.mapOf(this.cells(i.rows, i.columns))
		});
	}
	split(e) {
		let { rows: t, columns: n, walls: r } = this.grid;
		if (e === "ring" && (r || t < 3 || n < 3)) return;
		let i = this.config.zones.length >= 2 ? this.config.zones : [...this.config.zones, { entity: "" }], a = Array.from({ length: t }, (r, i) => Array.from({ length: n }, (r, a) => e === "columns" ? a < Math.ceil(n / 2) ? 1 : 2 : e === "rows" ? i < Math.ceil(t / 2) ? 1 : 2 : Xf(i, a, t, n) ? 1 : 2));
		this.update({
			zones: i,
			zone_map: this.mapOf(a)
		});
	}
	cycle(e, t) {
		let n = this.cells(), r = n[e][t];
		n[e][t] = r >= this.grid.zones ? 0 : r + 1, this.update({ zone_map: this.mapOf(n) });
	}
	showBeam() {
		let e = this.root.querySelector("#beam");
		this.root.querySelector("#beam-reading").textContent = `${e.value}°`, e.setAttribute("aria-valuetext", `${e.value} degrees`);
	}
	render() {
		let e = this.config, { rows: t, columns: n, walls: r, zones: i } = this.grid, a = (e) => this.root.querySelector(`#${e}`);
		a("layout").value = e.variant ?? "normal";
		let o = a("name");
		this.root.activeElement !== o && (o.value = e.name ?? ""), a("rows").textContent = String(t), a("columns").textContent = String(n), a("walls").checked = r, a("beam").value = String(e.beam_angle ?? 40), this.showBeam(), a("layout-summary").textContent = `${t} × ${n}${r ? " · along the walls" : ""} · ${e.beam_angle ?? 40}° beam`;
		for (let [e, r] of [
			["rows:-1", t <= 1],
			["rows:1", t >= 8],
			["columns:-1", n <= 1],
			["columns:1", n >= 8]
		]) this.root.querySelector(`[data-step="${e}"]`).disabled = r;
		a("ring-split").disabled = r || t < 3 || n < 3, a("add-zone").disabled = i >= 3;
		let s = e.zones ?? [], c = a("zones");
		(c.childElementCount !== s.length || this.root.activeElement?.closest?.(".zone") == null) && c.replaceChildren(...s.map((e, t) => {
			let n = document.createElement("div");
			return n.className = "zone", n.innerHTML = `<span class="badge" aria-hidden="true" style="background:${kp[t]}">${t + 1}</span>
          <label>Zone ${t + 1} entity<input list="lights" data-field="entity" data-index="${t}" required pattern="light\\.[a-z0-9_]+" placeholder="light.example"></label>
          <label>Zone ${t + 1} name<input data-field="name" data-index="${t}" placeholder="Entity name"></label>
          <button type="button" class="remove" data-remove="${t}" aria-label="Remove zone ${t + 1}" ${s.length === 1 ? "disabled" : ""}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 7h12M9 7V5h6v2M8 7l1 12h6l1-12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`, n.querySelector("[data-field=\"entity\"]").value = e.entity ?? "", n.querySelector("[data-field=\"name\"]").value = e.name ?? "", n;
		}));
		let l = this.cells(), u = s.map(() => 0), d = Math.max(30, Math.min(40, Math.floor(Math.min(480 / n, 400 / t)) - 8)), f = this.root.querySelector(".plan"), p = [];
		l.forEach((e, i) => e.forEach((e, a) => {
			let o = ep(i, a, t, n, r), c = `left:${(o.x * 100).toFixed(2)}%;top:${(o.y * 100).toFixed(2)}%`;
			if (r && !Xf(i, a, t, n)) {
				let e = document.createElement("span");
				e.className = "unused", e.setAttribute("style", c), p.push(e);
				return;
			}
			e && u[e - 1]++;
			let l = document.createElement("button");
			l.type = "button", l.dataset.cell = `${i},${a}`, l.className = e ? "" : "none", l.textContent = e ? String(e) : "", l.setAttribute("style", `${c};width:${d}px;height:${d}px${e ? `;background:${kp[e - 1]};border:2px solid var(--card-background-color,#1c1c1c);box-shadow:0 0 0 1px ${kp[e - 1]}` : ""}`);
			let f = e ? `${s[e - 1]?.name || `Zone ${e}`} (zone ${e})` : "no spot";
			l.setAttribute("aria-label", `Row ${i + 1} from the back wall, column ${a + 1}: ${f}. Activate to change.`), p.push(l);
		}));
		let m = this.root.activeElement instanceof HTMLButtonElement ? this.root.activeElement.dataset.cell : void 0;
		f.replaceChildren(...p), m && f.querySelector(`[data-cell="${m}"]`)?.focus({ preventScroll: !0 }), this.root.querySelector(".legend").replaceChildren(...s.map((e, t) => {
			let n = document.createElement("span");
			return n.innerHTML = `<i style="background:${kp[t]}"></i>`, n.append(`${t + 1} · ${e.name || e.entity || `Zone ${t + 1}`} (${u[t]})`), n;
		}), Object.assign(document.createElement("span"), { innerHTML: "<i style=\"border:1px dashed currentColor\"></i>No spot" }));
	}
}, jp = [
	{
		type: "gleam-energy-graph",
		name: "Gleam Energy Graph",
		element: Gu,
		description: "Interactive energy and price timeline with power and voltage lanes."
	},
	{
		type: "gleam-thermostat",
		name: "Gleam Thermostat (Experimental)",
		element: Ed,
		description: "Experimental climate controls with limited real-device testing."
	},
	{
		type: "gleam-cover",
		name: "Gleam Cover",
		element: Nf,
		description: "Garage doors, roller shades, slatted blinds, roller shutters and curtains with live status and controls."
	},
	{
		type: "gleam-light",
		name: "Gleam Light",
		element: Op,
		description: "In-roof spots in rows and columns, split into zones with brightness and colour temperature."
	}
];
for (let { type: e, element: t, ...n } of jp) customElements.get(e) || customElements.define(e, t), window.customCards ??= [], window.customCards.some((t) => t.type === e) || window.customCards.push({
	type: e,
	...n,
	preview: !1
});
customElements.get("gleam-thermostat-editor") || customElements.define("gleam-thermostat-editor", Dd), customElements.get("gleam-energy-graph-editor") || customElements.define("gleam-energy-graph-editor", Xu), customElements.get("gleam-cover-editor") || customElements.define("gleam-cover-editor", Lf), customElements.get("gleam-light-editor") || customElements.define("gleam-light-editor", Ap);
