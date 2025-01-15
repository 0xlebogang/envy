import { z } from "zod";

export const envTypeEnum = z.enum(["DEV", "TEST", "STAGE", "PROD"]);

export const secretSchema = z.object({
  id: z.string().cuid(),
  key: z.string(),
  value: z.string(),
  envType: envTypeEnum,
  projectId: z.string(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createSecretSchema = secretSchema.pick({
  key: true,
  value: true,
  envType: true,
  projectId: true,
  authorId: true,
});

export type Secret = z.infer<typeof secretSchema>;
export type CreateSecret = z.infer<typeof createSecretSchema>;
