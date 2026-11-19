import type { HomeAssistant } from "../../types";

export async function uploadWindowPhoto(hass: HomeAssistant | undefined, file: File) {
  if (!hass?.fetchWithAuth) throw Error("Photo upload is unavailable here. Enter an image URL instead.");
  const body = new FormData();
  body.append("file", file);
  const response = await hass.fetchWithAuth("/api/image/upload", {method:"POST", body});
  if (response.status === 413) throw Error("This photo is too large. Try a smaller image.");
  if (!response.ok) throw Error("Home Assistant could not upload the photo. Check your connection and permissions, then try again.");
  const result: unknown = await response.json();
  if (!result || typeof result !== "object" || !("id" in result) || typeof result.id !== "string" || !/^[\w-]+$/.test(result.id))
    throw Error("Home Assistant did not return a usable photo.");
  return `/api/image/serve/${result.id}/original`;
}
