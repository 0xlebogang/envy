import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";
import type { Token } from "@envyper/zod";
import { getUser } from "./utils";

const prisma = new PrismaClient();

export async function generateAccessToken(
  userId: string,
  length: number = 32,
): Promise<Token> {
  const token = randomBytes(length).toString("base64");

  return await prisma.token.create({
    data: {
      token,
      user: {
        connect: {
          clerkUserId: userId,
        },
      },
    },
  });
}

export async function getAccessToken(
  clerkUserId: string,
): Promise<Token | null> {
  const user = await getUser(clerkUserId);
  if (!user) {
    return null;
  }

  return await prisma.token.findFirst({
    where: {
      userId: user.id,
    },
  });
}
