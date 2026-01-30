import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { auth } from "@/lib/auth";

const hono = new Hono();

hono.use(logger());

hono.get("/health", (c) => {
	return c.json({
		status: "ok",
		timestamp: Date.now(),
	});
});

hono.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

serve({
	fetch: hono.fetch,
	port: Number.parseInt(process.env.PORT || "5000", 10),
});
