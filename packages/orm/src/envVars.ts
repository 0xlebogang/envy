import type { EnvVariable, CreateEnvVariable } from "@envyper/zod";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Retrieves all environment variables for a given project
 * @param projectId - The ID of the project to get variables for
 * @returns Promise that resolves to an array of environment variables
 */
export const getEnvVariables = async (
  projectId: number,
): Promise<EnvVariable[]> => {
  return await prisma.envVariable.findMany({
    where: {
      projectId: projectId,
    },
  });
};

/**
 * Retrieves a single environment variable by its ID
 * @param envVariableId - The ID of the environment variable to retrieve
 * @returns Promise that resolves to the environment variable if found, null otherwise
 */
export const getEnvVariableById = async (
  envVariableId: number,
): Promise<EnvVariable | null> => {
  return await prisma.envVariable.findUnique({
    where: {
      id: envVariableId,
    },
  });
};

/**
 * Creates a new environment variable in the database
 * @param data - Object containing environment variable data
 * @param data.envType - The type of environment
 * @param data.key - The key of the environment variable
 * @param data.value - The value of the environment variable
 * @param data.projectId - The ID of the project this variable belongs to
 * @returns Promise that resolves to the created environment variable
 */
export const createEnvVariable = async (
  data: CreateEnvVariable,
): Promise<EnvVariable> => {
  return await prisma.envVariable.create({
    data: {
      envType: data.envType,
      key: data.key,
      value: data.value,
      projectId: data.projectId,
    },
  });
};

/**
 * Updates an existing environment variable
 * @param envVariableId - The ID of the environment variable to update
 * @param data - Partial object containing fields to update
 * @returns Promise that resolves to the updated environment variable
 */
export const updateEnvVariable = async (
  envVariableId: number,
  data: Partial<CreateEnvVariable>,
): Promise<EnvVariable> => {
  return await prisma.envVariable.update({
    where: {
      id: envVariableId,
    },
    data,
  });
};

/**
 * Deletes an environment variable from the database
 * @param envVariableId - The ID of the environment variable to delete
 * @returns Promise that resolves when deletion is complete
 */
export const deleteEnvVariable = async (
  envVariableId: number,
): Promise<void> => {
  await prisma.envVariable.delete({
    where: {
      id: envVariableId,
    },
  });
};
