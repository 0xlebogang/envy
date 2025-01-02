import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await createTestUser();
  const project = await createTestProject();
  await createTestVariable(project.id);
};

const createTestUser = async () => {
  await prisma.user.create({
    data: {
      clerkUserId: "test-user",
      email: "test@example.com",
    },
  });
};

const createTestProject = async () => {
  return await prisma.project.create({
    data: {
      name: "Test Project",
      description: "Test description",
      creatorId: 1,
    },
  });
};

const createTestVariable = async (projectId: number) => {
  await prisma.envVariable.create({
    data: {
      envType: "DEV",
      key: "TEST_VARIABLE",
      value: "TEST_VARIABLE_VALUE",
      projectId,
    },
  });
};

await main();
