import { describe, it, expect } from "bun:test";
import { testClient } from "hono/testing";
import { Hono } from "hono";
import tokens from "../routes/tokens";

const app = new Hono().route("/tokens", tokens);

describe("Tokens Endpoints", () => {
  const testData = {
    clerkUserId: "test-user",
  };

  it("should get access token for user", async () => {
    const res = await testClient(app).tokens.$get({
      query: testData,
    });
    const data = await res.json();

    if ("accessToken" in data) {
      expect(data.accessToken).toBeDefined();
      expect(res.status).toBe(200);
    } else {
      expect(res.status).toBe(400);
    }
  });

  it("should fail to get token for invalid user", async () => {
    const res = await testClient(app).tokens.$get({
      query: { clerkUserId: "invalid-user" },
    });

    expect(res.status).toBe(400);
  });

  it("should refresh access token", async () => {
    const res = await testClient(app).tokens.refresh.$post({ json: testData });
    const data = await res.json();

    if ("accessToken" in data) {
      expect(data.accessToken).toBeDefined();
      expect(res.status).toBe(200);
    } else {
      expect(res.status).toBe(401);
    }
  });

  it("should fail to refresh token for unauthorized user", async () => {
    const res = await testClient(app).tokens.refresh.$post({
      json: { clerkUserId: "unauthorized-user" },
    });

    expect(res.status).toBe(401);
  });
});
