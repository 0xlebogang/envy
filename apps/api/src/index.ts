import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());

app.get("/", (c) => c.json({ message: "Hello, World!" }));

const server = Bun.serve({
  fetch: app.fetch,
});

console.log(`Server listening @ ${server.url.href}`);
