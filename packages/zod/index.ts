import { z } from "zod";

// Enum schema
export const EnvTypeSchema = z.enum(["DEV", "TEST", "STAGING", "PRODUCTION"]);
export type EnvType = z.infer<typeof EnvTypeSchema>;

// Base schemas
export const UserSchema = z.object({
  id: z.bigint(),
  userId: z.string(),
  createdAt: z.date(),
});

export const ProjectSchema = z.object({
  id: z.bigint(),
  name: z.string().max(150),
  description: z.string(),
  createdAt: z.date(),
  creatorId: z.bigint(),
  users: z.optional(z.array(z.bigint())),
});

export const EnvVariableSchema = z.object({
  id: z.bigint(),
  key: z.string(),
  value: z.string(),
  envType: EnvTypeSchema.default("DEV"),
  projectId: z.bigint(),
});


// Create input schemas
export const CreateUserSchema = UserSchema.omit({ id: true, createdAt: true });
export const CreateProjectSchema = ProjectSchema.omit({ id: true, createdAt: true, users: true });
export const CreateEnvVariableSchema = EnvVariableSchema.omit({ id: true });

// Types
export type User = z.infer<typeof UserSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type EnvVariable = z.infer<typeof EnvVariableSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type CreateProject = z.infer<typeof CreateProjectSchema>;
export type CreateEnvVariable = z.infer<typeof CreateEnvVariableSchema>;
