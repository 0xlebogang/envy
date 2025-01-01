import { PrismaClient } from "@prisma/client";
import type { User } from "@envyper/zod";

const prisma = new PrismaClient();

export const getUser = async (userId: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
};
