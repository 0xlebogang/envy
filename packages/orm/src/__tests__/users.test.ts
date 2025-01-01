import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { PrismaClient } from "@prisma/client";
import type { CreateUser } from "@envyper/zod";
import { createUser, getUser } from "../users";

const prisma = new PrismaClient();

describe("Users database operations", () => {
  const testUser: CreateUser = {
    clerkUserId: "test-clerk-user",
    email: "test@clerk.com",
    firstName: "Test",
    lastName: "User",
  };

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a user", async () => {
    const newUser = await createUser(testUser);

    const userRecord = await prisma.user.findUnique({
      where: {
        clerkUserId: testUser.clerkUserId,
      },
    });

    expect(newUser).toBeDefined();
    expect(userRecord).toMatchObject(testUser);
  });

  it("should get a user by clerk user id", async () => {
    const existingUser = await getUser(testUser.clerkUserId);
    expect(existingUser).toMatchObject(testUser);
  });

  it("should return null for non-existent user", async () => {
    const nonExistentUser = await getUser("non-existent-id");
    expect(nonExistentUser).toBeNull();
  });
});
