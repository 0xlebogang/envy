import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { PrismaClient } from "@prisma/client";
import type { Token, User } from "@envyper/zod";

import { generateAccessToken, getAccessToken } from "../accessTokens";

const prisma = new PrismaClient();

describe("accessTokens", () => {
  let user: User, token: Token;

  beforeAll(async () => {
    await prisma.$connect();

    const foundUser = await prisma.user.findUnique({
      where: {
        clerkUserId: "test-user",
      },
    });
    if (!foundUser) throw new Error("Test user not found");
    user = foundUser;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should generate a new access token", async () => {
    const newToken = await generateAccessToken(user.clerkUserId);
    expect(newToken?.token).toBeDefined();
  });

  it("should get the access token", async () => {
    const foundToken = await getAccessToken(user.clerkUserId);
    expect(foundToken).toMatchObject({
      token: expect.any(String),
      userId: user.id,
    });
  });
});
