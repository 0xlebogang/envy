import { describe, it, expect } from "bun:test";
import { CreateProject } from "@envyper/zod";
import { PrismaClient } from "@prisma/client";
import { testClient } from "hono/testing";
import { Hono } from "hono";

import projects from "../routes/projects";

const app = new Hono().route("/projects", projects);
const prisma = new PrismaClient();

describe("Projects Enpoints", () => {
  const testData: Omit<CreateProject, "creatorId"> = {
    name: "Test project",
    description: "Test description",
  };

  let projectId: number;

  it("should create a new project", async () => {
    const res = await testClient(app).projects.$post({ json: testData });

    const record = await prisma.project.findFirst({
      where: { name: testData.name },
    });

    expect(record).toMatchObject(testData);
    expect(res.status).toBe(201);

    projectId = record?.id as number;
  });

  it("should return all projects belonging to user", async () => {
    const res = await testClient(app).projects.$get();
    const projects = await res.json();

    if ("data" in projects) {
      expect(projects.data?.length).toBeGreaterThanOrEqual(1);
      expect(res.status).toBe(200);
    } else {
      expect(res.status).toBe(500);
    }
  });

  it("should return a single project", async () => {
    const res = await testClient(app).projects[":id{[0-9]+}"].$get({
      param: { id: String(projectId) },
    });

    const project = await res.json();
    if ("data" in project) {
      expect(project.data).toMatchObject(testData);
      expect(res.status).toBe(200);
    } else {
      expect(res.status).toBe(500);
    }
  });

  it("should update a project", async () => {
    const res = await testClient(app).projects[":id{[0-9]+}"].$patch({
      param: { id: String(projectId) },
      json: { description: "Updated description" },
    });

    const record = await prisma.project.findFirst({
      where: { id: projectId },
    });

    expect(record?.description).toBe("Updated description");
    expect(res.status).toBe(200);
  });

  it("should delete a project", async () => {
    await testClient(app).projects[":id{[0-9]+}"].$delete({
      param: { id: String(projectId) },
    });

    const record = await prisma.project.findFirst({
      where: { id: projectId },
    });

    expect(record).toBeNull();
  });
});
