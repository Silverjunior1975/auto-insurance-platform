import crypto from "crypto";
import { cookies } from "next/headers";

const cookieName = "admin_session";

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET environment variable");
  }
  return secret;
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export async function createAdminSession(): Promise<void> {
  const payload = `${Date.now()}`;
  const token = `${payload}.${sign(payload)}`;
  const store = await cookies();

  store.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 12
  });
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(cookieName);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const raw = store.get(cookieName)?.value;
  if (!raw) {
    return false;
  }

  const [payload, signature] = raw.split(".");
  if (!payload || !signature) {
    return false;
  }

  const expected = sign(payload);
  const sigBuf = Buffer.from(signature, "utf8");
  const expBuf = Buffer.from(expected, "utf8");
  if (sigBuf.length !== expBuf.length) {
    return false;
  }
  return crypto.timingSafeEqual(sigBuf, expBuf);
}

export function isValidAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();
  if (!adminPassword) {
    throw new Error("Missing ADMIN_PASSWORD environment variable");
  }
  return password.trim() === adminPassword;
}
