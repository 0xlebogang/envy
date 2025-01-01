import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  CreateProject,
  CreateProjectSchema,
  Project,
  User,
} from "@envyper/zod";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "@envyper/orm/projects";
import { getUser } from "@envyper/orm/utils";

const projects = new Hono()
  .post(
    "/",
    zValidator("json", CreateProjectSchema.omit({ creatorId: true })),
    async (c) => {
      const data = c.req.valid("json");

      const user: User | null = await getUser("test-user");
      if (!user) {
        return c.json({ error: "User not found" }, 401);
      }

      const project: Project = await createProject({
        ...data,
        creatorId: user.id,
      });

      if (!project) {
        return c.json({ message: "Failed to create project" }, 500);
      }

      return c.json({ data: project }, 201);
    },
  )

  .get("/", async (c) => {
    const user = await getUser("test-user");
    if (!user) {
      return c.json({ message: "User not found" }, 401);
    }

    try {
      const projects = await getProjects(user?.id);
      return c.json({ data: projects }, 200);
    } catch (e) {
      console.log(e);
      return c.json({ error: "Failed to fetch projects" }, 500);
    }
  })

  .get("/:id{[0-9]+}", async (c) => {
    const user = await getUser("test-user");
    if (!user) {
      return c.json({ error: "User not found" }, 401);
    }

    const projectId = parseInt(c.req.param("id"));
    try {
      const project = await getProjectById(projectId);
      if (!project) {
        return c.json({ message: "Project not found" }, 404);
      }

      return c.json({ data: project }, 200);
    } catch (e) {
      console.log(e);
      return c.json({ error: "Failed to fetch project" }, 500);
    }
  })

  .patch(
    "/:id{[0-9]+}",
    zValidator("json", CreateProjectSchema.partial().omit({ creatorId: true })),
    async (c) => {
      const user = await getUser("test-user");
      if (!user) {
        return c.json({ message: "User not found" }, 401);
      }

      const projectId = parseInt(c.req.param("id"));
      try {
        const project = await getProjectById(projectId);
        if (!project) {
          return c.json({ message: "Project not found" }, 404);
        }

        const data: Partial<CreateProject> = c.req.valid("json");
        const updatedProject = await updateProject(projectId, data);
        return c.json({ data: updatedProject }, 200);
      } catch (e) {
        console.log(e);
        return c.json({ error: "Failed to update project" }, 500);
      }
    },
  )

  .delete("/:id{[0-9]+}", async (c) => {
    const user = await getUser("test-user");
    if (!user) {
      return c.json({ message: "User not found" }, 401);
    }

    const projectId = parseInt(c.req.param("id"));
    try {
      const project = await getProjectById(projectId);
      if (!project) {
        return c.json({ message: "Project not found" }, 404);
      }

      await deleteProject(projectId);
      return c.json({ data: project }, 200);
    } catch (e) {
      console.log(e);
      return c.json({ error: "Failed to delete project" }, 500);
    }
  });

export default projects;
