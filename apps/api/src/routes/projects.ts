import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createProjectSchema } from "@envyper/zod/projects";
import { getUser } from "@/utils/auth";
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "@/db/projects";

const app = new Hono()
  .get("/", (c) => {
    const userId = getUser(c);
    if (!userId) return c.json({ message: "Unauthorized" }, 401);

    const projects = getProjects(userId);

    return c.json({ data: projects }, 200);
  })

  .post("/create", zValidator("json", createProjectSchema), (c) => {
    const userId = getUser(c);
    if (!userId) return c.json({ message: "Unauthorized" }, 401);

    const data = c.req.valid("json");
    const project = createProject(userId, data);

    return c.json({ data: project }, 201);
  })

  .get("/:id", (c) => {
    const userId = getUser(c);
    if (!userId) return c.json({ message: "Unauthorized" }, 401);

    const projectId = c.req.param("id");
    const project = getProjectById(userId, projectId);

    return c.json({ data: project }, 200);
  })

  .patch(
    "/update/:id",
    zValidator("json", createProjectSchema.partial()),
    (c) => {
      const userId = getUser(c);
      if (!userId) return c.json({ message: "Unauthorized" }, 401);

      const projectId = c.req.param("id");
      const data = c.req.valid("json");
      const project = updateProject(userId, projectId, data);

      return c.json({ data: project }, 200);
    },
  )

  .delete("/delete/:id", (c) => {
    const userId = getUser(c);
    if (!userId) return c.json({ message: "Unauthorized" }, 401);

    const projectId = c.req.param("id");
    deleteProject(userId, projectId);

    return c.json({ message: "Project deleted" }, 200);
  });

export default app;
