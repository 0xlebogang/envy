import { getAuth } from "@hono/clerk-auth";
import type { Context } from "hono";

export function getUser(c: Context): string | null {
  const auth = getAuth(c);
  return auth?.userId || null;
}
