import {
  createEnvVariable,
  deleteEnvVariable,
  getEnvVariableById,
  getEnvVariables,
  updateEnvVariable,
} from "@envyper/orm/envVars";
import { CreateEnvVariableSchema } from "@envyper/zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const envVars = new Hono()
  .post("/", zValidator("json", CreateEnvVariableSchema), async (c) => {
    const data = c.req.valid("json");

    const variable = await createEnvVariable({ ...data });

    return c.json({ data: variable }, 201);
  })

  .patch(
    "/:id{[0-9]+}",
    zValidator("json", CreateEnvVariableSchema.partial()),
    async (c) => {
      const data = c.req.valid("json");

      const variableId = parseInt(c.req.param("id"));
      try {
        const variable = await getEnvVariableById(variableId);
        if (!variable) {
          return c.json({ message: "Variable not found" }, 404);
        }

        const updatedVariable = await updateEnvVariable(variableId, data);
        return c.json({ data: updatedVariable }, 200);
      } catch (e) {
        console.log(e);
        return c.json({ error: "Failed to update variable." }, 500);
      }
    },
  )

  .get("/", async (c) => {
    try {
      const projectId = parseInt(c.req.query("projectId") || "");
      if (isNaN(projectId)) {
        return c.json({ error: "Invalid projectId" }, 400);
      }
      const variables = await getEnvVariables(projectId);
      return c.json({ data: variables }, 200);
    } catch (e) {
      console.log(e);
      return c.json({ error: "Failed to fetch variables." }, 500);
    }
  })

  .get("/:id{[0-9]+}", async (c) => {
    const variableId = parseInt(c.req.param("id"));
    const variable = await getEnvVariableById(variableId);
    if (!variable) {
      return c.json({ message: "Variable not found" }, 404);
    }

    return c.json({ data: variable }, 200);
  })

  .delete("/:id{[0-9]+}", async (c) => {
    const variableId = parseInt(c.req.param("id"));

    try {
      const variable = await getEnvVariableById(variableId);
      if (!variable) {
        return c.json({ error: "Variable not found" }, 404);
      }

      await deleteEnvVariable(variableId);
      return c.json({ data: variable }, 200);
    } catch (e) {
      console.log(e);
      return c.json({ error: "Failed to delete variable." }, 500);
    }
  });

export default envVars;
