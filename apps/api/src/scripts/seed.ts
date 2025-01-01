import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await createTestUser();
  await createTestProject();
};

const createTestUser = async () => {
  await prisma.user.create({
    data: {
      userId: "test-user",
    },
  });
};

const createTestProject = async () => {
  await prisma.project.create({
    data: {
      name: "Test Project",
      description: "Test description",
      creatorId: 1,
    },
  });
};

await main();
