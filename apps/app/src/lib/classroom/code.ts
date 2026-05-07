const SAFE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const AMBIGUOUS = /[01OIL]/;

export function normalizeClassCode(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function isSafeClassCode(value: string): boolean {
  const code = normalizeClassCode(value);
  return code.length >= 6 && code.length <= 8 && !AMBIGUOUS.test(code) && /^[A-Z0-9]+$/.test(code);
}

export function generateClassCode(seed = "class", length = 6): string {
  const bytes = new Uint32Array(length);
  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * SAFE_ALPHABET.length);
  }

  let code = "";
  for (const byte of bytes) code += SAFE_ALPHABET[byte % SAFE_ALPHABET.length];

  if (!isSafeClassCode(code)) {
    return normalizeClassCode(seed).replace(AMBIGUOUS, "").slice(0, length).padEnd(length, "7");
  }
  return code;
}
