import { md5 } from "./md5.js";

async function digestHex(algorithm, text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function computeAllHashes(text) {
  const [sha1, sha256, sha512] = await Promise.all([
    digestHex("SHA-1", text),
    digestHex("SHA-256", text),
    digestHex("SHA-512", text),
  ]);
  return { MD5: md5(text), "SHA-1": sha1, "SHA-256": sha256, "SHA-512": sha512 };
}
