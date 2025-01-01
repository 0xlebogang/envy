import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  runMigration();
  await createTestUser("test-user");
};

const runMigration = () => {
  execSync('bun --filter "@envyper/orm" migrate:reset --force', {
    stdio: "inherit",
  });
};

const createTestUser = async (userId: string) => {
  await prisma.user.create({
    data: {
      clerkUserId: userId,
      email: "testuser@email.com",
    },
  });

  console.log(`User: ${userId} created successfully`);
};

await main();
