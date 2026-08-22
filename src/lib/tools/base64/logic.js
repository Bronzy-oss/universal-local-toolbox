// Proper UTF-8-safe Base64 encode/decode. Plain btoa/atob only handle
// Latin1 correctly — encoding through TextEncoder/TextDecoder first
// means emoji, accented characters, etc. round-trip correctly too.
export function encodeBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

export function decodeBase64(b64) {
  const binary = atob(b64); // throws on invalid input — let caller catch
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}
