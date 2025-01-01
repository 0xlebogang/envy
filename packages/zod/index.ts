import { z } from "zod";

// Enum schema
export const EnvTypeSchema = z.enum(["DEV", "TEST", "STAGING", "PRODUCTION"]);
export type EnvType = z.infer<typeof EnvTypeSchema>;

// Base schemas
export const UserSchema = z.object({
  id: z.number(),
  clerkUserId: z.string(),
  email: z.string().email(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  createdAt: z.date(),
});

export const TokenSchema = z.object({
  id: z.number(),
  token: z.string(),
  userId: z.number(),
  createdAt: z.date(),
});

export const ProjectSchema = z.object({
  id: z.number(),
  name: z.string().max(150),
  description: z.string(),
  createdAt: z.date(),
  creatorId: z.number(),
  users: z.optional(z.array(z.number())),
});

export const EnvVariableSchema = z.object({
  id: z.number(),
  key: z.string(),
  value: z.string(),
  envType: EnvTypeSchema.default("DEV"),
  projectId: z.number(),
});

// Create input schemas
export const CreateUserSchema = UserSchema.omit({ id: true, createdAt: true });
export const CreateProjectSchema = ProjectSchema.omit({
  id: true,
  createdAt: true,
  users: true,
});
export const CreateEnvVariableSchema = EnvVariableSchema.omit({ id: true });
export const CreateTokenSchema = TokenSchema.omit({
  id: true,
  createdAt: true,
});

// Types
export type User = z.infer<typeof UserSchema>;
export type Token = z.infer<typeof TokenSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type EnvVariable = z.infer<typeof EnvVariableSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type CreateProject = z.infer<typeof CreateProjectSchema>;
export type CreateEnvVariable = z.infer<typeof CreateEnvVariableSchema>;
export type CreateToken = z.infer<typeof CreateTokenSchema>;
