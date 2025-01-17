import { Hono } from "hono";
import { logger } from "hono/logger";
import { clerkMiddleware } from "@hono/clerk-auth";

const app = new Hono();

app.use("*", clerkMiddleware());
app.use(logger());

app.get("/", (c) => c.json({ message: "Hello, World!" }));

const server = Bun.serve({
  fetch: app.fetch,
});

console.log(`Server listening @ ${server.url.href}`);
