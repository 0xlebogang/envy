import { describe, it, expect, beforeAll } from "bun:test";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";

import envVars from "../routes/envVars";
import { CreateEnvVariable } from "@envyper/zod";
import { testClient } from "hono/testing";

const app = new Hono().route("/variables", envVars);
const prisma = new PrismaClient();

describe("Environment Variable Endpoints", () => {
  let testProjectId: number;
  let testVariableId: number;

  const testData: Omit<CreateEnvVariable, "projectId"> = {
    key: "DUMMY_TEST_KEY",
    value: "DUMMY_TEST_VALUE",
    envType: "DEV",
  };

  beforeAll(async () => {
    const testUser = await prisma.user.findFirst({
      where: {
        clerkUserId: "test-user",
      },
    });

    const testProject = await prisma.project.create({
      data: {
        name: "Test project",
        description: "Test description",
        creatorId: testUser?.id as number,
      },
    });

    testProjectId = testProject.id;
  });

  it("should create a new environment variable", async () => {
    const res = await testClient(app).variables.$post({
      json: { ...testData, projectId: testProjectId },
    });

    const record = await prisma.envVariable.findFirst({
      where: { key: testData.key },
    });

    expect(record).toMatchObject(testData);
    expect(res.status).toBe(201);

    testVariableId = record?.id as number;
  });

  it("should return all environment variables belonging to project", async () => {
    const res = await testClient(app).variables.$get({
      query: { projectId: String(testProjectId) },
    });
    const variables = await res.json();

    if ("data" in variables) {
      expect(variables.data).toHaveLength(1);
      expect(res.status).toBe(200);
    } else {
      expect(res.status).toBe(500);
    }
  });

  it("should return a specific environment variable", async () => {
    const res = await testClient(app).variables[":id{[0-9]+}"].$get({
      param: { id: String(testVariableId) },
    });

    const variable = await res.json();

    if ("data" in variable) {
      expect(variable.data).toMatchObject(testData);
      expect(res.status).toBe(200);
    } else {
      expect(res.status).toBe(404);
    }
  });

  it("should update an environment variable", async () => {
    const res = await testClient(app).variables[":id{[0-9]+}"].$patch({
      param: { id: String(testVariableId) },
      json: { value: "UPDATED_VALUE" },
    });

    const updatedVariable = await prisma.envVariable.findFirst({
      where: { id: testVariableId },
    });

    expect(updatedVariable?.value).toBe("UPDATED_VALUE");
    expect(res.status).toBe(200);
  });

  it("should delete an environment variable", async () => {
    const res = await testClient(app).variables[":id{[0-9]+}"].$delete({
      param: { id: String(testVariableId) },
    });

    const deletedVariable = await prisma.envVariable.findFirst({
      where: { id: testVariableId },
    });

    expect(deletedVariable).toBeNull();
    expect(res.status).toBe(200);
  });
});
