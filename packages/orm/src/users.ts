import { PrismaClient } from "@prisma/client";
import { CreateUser, User } from "@envyper/zod";

const prisma = new PrismaClient();

/**
 * Creates a new user in the database
 * @param data - The user data required for creation
 * @returns A Promise that resolves to the newly created User object
 */
export async function createUser(data: CreateUser): Promise<User> {
  return await prisma.user.create({ data });
}

/**
 * Retrieves a user from the database by their Clerk user ID
 * @param userId - The Clerk user ID to search for
 * @returns A Promise that resolves to the User object if found, or null if not found
 */
export async function getUser(userId: string): Promise<User | null> {
  return await prisma.user.findUnique({ where: { clerkUserId: userId } });
}
