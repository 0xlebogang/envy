import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  creatorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createProjectSchema = projectSchema.pick({
  name: true,
  description: true,
  creatorId: true,
});

export type Project = z.infer<typeof projectSchema>;
export type CreateProject = z.infer<typeof createProjectSchema>;
