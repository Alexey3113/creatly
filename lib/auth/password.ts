import { createHash, randomBytes } from "crypto";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = createHash("sha256").update(salt + password).digest("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  const check = createHash("sha256").update(salt + password).digest("hex");
  return hash === check;
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return "Минимум 8 символов";
  if (!/[A-Za-z]/.test(password)) return "Нужна хотя бы одна буква";
  if (!/\d/.test(password)) return "Нужна хотя бы одна цифра";
  return null;
}
