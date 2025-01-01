import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { PrismaClient } from "@prisma/client";
import type { CreateEnvVariable, EnvVariable, Project } from "@envyper/zod";

import {
  getEnvVariables,
  getEnvVariableById,
  createEnvVariable,
  updateEnvVariable,
  deleteEnvVariable,
} from "../envVars";

const prisma = new PrismaClient();

describe("Environment Variables", () => {
  let projectId: number, envVarId: number;

  const testEnvVar: CreateEnvVariable = {
    envType: "DEV",
    key: "TEST_KEY",
    value: "test_value",
    projectId: 1,
  };

  beforeAll(async () => {
    const testUser = await prisma.user.findUnique({
      where: {
        clerkUserId: "test-user",
      },
    });

    // create test project
    const testProject: Project = await prisma.project.create({
      data: {
        name: "Test Project",
        description: "Test Description",
        creatorId: 1,
      },
    });

    projectId = testProject?.id as number;
    testEnvVar.projectId = projectId;
  });

  afterAll(async () => {
    // remove all tables & their data & reset the auto-increment
    await prisma.$executeRaw`TRUNCATE TABLE "EnvVariable" CASCADE`;
    await prisma.$disconnect();
  });

  it("should create an environment variable", async () => {
    const newEnvVar = await createEnvVariable(testEnvVar);

    if (newEnvVar) {
      envVarId = newEnvVar.id;
    }

    const envVarRecord = await prisma.envVariable.findFirst();

    expect(envVarRecord).toBeTruthy();
    expect(envVarRecord?.key).toBe(testEnvVar.key);
  });

  it("should get an environment variable by id", async () => {
    const existingEnvVar = await getEnvVariableById(envVarId);
    expect(existingEnvVar).toMatchObject(testEnvVar);
  });

  it("should get all environment variables for a project", async () => {
    const envVars = await getEnvVariables(projectId);
    expect(envVars?.length).toBe(1);
  });

  it("should update an environment variable", async () => {
    const data: Partial<CreateEnvVariable> = {
      key: "UPDATED_KEY",
      value: "updated_value",
    };

    const updatedEnvVar = await updateEnvVariable(envVarId, data);

    const record = await prisma.envVariable.findUnique({
      where: {
        id: envVarId,
      },
    });

    expect(updatedEnvVar).toMatchObject(record as EnvVariable);
  });

  it("should delete an environment variable", async () => {
    await deleteEnvVariable(envVarId);

    const record = await prisma.envVariable.findUnique({
      where: {
        id: envVarId,
      },
    });

    expect(record).toBeNull();
  });
});
