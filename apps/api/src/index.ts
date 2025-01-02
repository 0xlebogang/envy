import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { clerkMiddleware } from "@hono/clerk-auth";

import projects from "./routes/projects";
import envVars from "./routes/envVars";
import webhooks from "./routes/webhooks";
import tokens from "./routes/tokens";

const isProd = process.env.NODE_ENV === "production";

const app = new Hono().basePath("/api");

app.use(etag(), logger());
app.use("*", clerkMiddleware());
app.use(
  "*",
  cors({
    origin: process.env.CORS_ALLOWED_ORIGINS?.split(",") as Array<string>,
    allowMethods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

app.route("/projects", projects);
app.route("/variables", envVars);
app.route("/webhooks", webhooks);
app.route("/tokens", tokens);

const server = Bun.serve({
  fetch: app.fetch,
});

if (!isProd) {
  console.log("Listening at", server.url.href);
}
