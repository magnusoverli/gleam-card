import type { CoverConfig } from "../../types";
import { garage, renderer, type Side } from "./garage";
import { shade, renderShade } from "./shade";
import { blind, renderBlind } from "./blind";
import { shutter, renderShutter } from "./shutter";
import { curtain, renderCurtain } from "./curtain";
import { validateGarage } from "./garage-settings";

export type CoverKind = NonNullable<CoverConfig["cover_type"]>;
type Layout = NonNullable<CoverConfig["variant"]>;
interface Definition {
  sceneFamily: "window" | "garage";
  // After a measured sample during motion, continue estimating or hold it.
  motionPolicy: "interpolate" | "hold";
  label: string;
  deviceClass: string;
  layouts: readonly Layout[];
  markup: (side?: Side) => string;
  mount: (svg: SVGSVGElement) => (openness:number, tilt?:number) => void;
  validate?: (config: CoverConfig) => void;
}
export const kinds: Record<CoverKind, Definition> = {
  curtain: {label:"Curtain", deviceClass:"curtain", sceneFamily:"window", motionPolicy:"interpolate", layouts:["normal","compact"], markup:curtain, mount:renderCurtain,
    validate(config) {
      validateWindow(config);
      if (config.curtain_opening !== undefined && !["center","left_to_right","right_to_left"].includes(config.curtain_opening))
        throw Error("Curtain opening must be center, left_to_right or right_to_left.");
    }},
  shutter: {label:"Roller shutter", deviceClass:"shutter", sceneFamily:"window", motionPolicy:"interpolate", layouts:["normal","compact"], markup:shutter, mount:renderShutter, validate:validateWindow},
  garage: {label:"Garage", deviceClass:"garage", sceneFamily:"garage", motionPolicy:"hold", layouts:["normal","compact","double"], markup:garage, mount:renderer, validate:validateGarage},
  shade: {label:"Roller shade", deviceClass:"shade", sceneFamily:"window", motionPolicy:"interpolate", layouts:["normal","compact"], markup:shade, mount:renderShade,
    validate(config) {
      validateWindow(config);
      const value = config.shade_opacity;
      if (value !== undefined && (!Number.isInteger(value) || value < 0 || value > 100))
        throw Error("Shade opacity must be a whole percentage from 0 to 100.");
    }},
  blind: {label:"Slatted blind", deviceClass:"blind", sceneFamily:"window", motionPolicy:"interpolate", layouts:["normal","compact"], markup:blind, mount:renderBlind,
    validate(config) {
      validateWindow(config);
      const time = config.tilt_seconds;
      if (time !== undefined && (!Number.isFinite(time) || time < 0 || time > 300))
        throw Error("Tilt time must be between 0 and 300 seconds.");
    }},
};
export const isWindowCover = (kind: CoverKind) => kinds[kind].sceneFamily === "window";
function validateWindow({window_aspect_ratio, mounting_side, window_image, window_image_zoom, window_image_x, window_image_y, glazing_bar_width, glazing_bar_color, cover_color}:CoverConfig) {
      if (mounting_side !== undefined && mounting_side !== "inside" && mounting_side !== "outside")
        throw Error("Mounting side must be inside or outside.");
      if (window_aspect_ratio !== undefined && !["portrait","square","landscape"].includes(window_aspect_ratio))
        throw Error("Window aspect ratio must be portrait, square or landscape.");
      if (glazing_bar_width !== undefined && (!Number.isInteger(glazing_bar_width) || glazing_bar_width < 0 || glazing_bar_width > 10))
        throw Error("Glazing bar width must be a whole number from 0 to 10.");
      if (glazing_bar_color !== undefined && (typeof glazing_bar_color !== "string" || !/^#[a-f\d]{6}$/i.test(glazing_bar_color)))
        throw Error("Glazing bar color must be a six-digit hex color.");
      if (cover_color !== undefined && (typeof cover_color !== "string" || !/^#[a-f\d]{6}$/i.test(cover_color)))
        throw Error("Cover base color must be a six-digit hex color.");
      for (const [n,min,max] of [[window_image_zoom,100,300],[window_image_x,0,100],[window_image_y,0,100]] as const)
        if (n !== undefined && (!Number.isInteger(n) || n < min || n > max)) throw Error(`Photo framing must use whole percentages from ${min} to ${max}.`);
      if (window_image !== undefined && typeof window_image !== "string") throw Error("Window image must be an image URL or path.");
}
export function suggestedKind(deviceClass: unknown) {
  return (Object.keys(kinds) as CoverKind[]).find(key => kinds[key].deviceClass === deviceClass);
}
