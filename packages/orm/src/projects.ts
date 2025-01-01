import type { Project, CreateProject } from "@envyper/zod";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Retrieves all projects created by a specific user
 * @param userId - The unique identifier of the user (bigint)
 * @returns Promise that resolves to an array of Project objects
 */
export const getProjects = async (userId: number): Promise<Project[]> => {
  return await prisma.project.findMany({
    where: {
      creatorId: userId,
    },
  });
};

/**
 * Retrieves a project from the database by its unique identifier.
 *
 * @param projectId - The unique identifier of the project to retrieve.
 * @returns A Promise that resolves to either the found Project object or null if no project was found.
 */
export const getProjectById = async (
  projectId: number,
): Promise<Project | null> => {
  return await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });
};

/**
 * Creates a new project in the database
 * @param data - The data required to create a new project
 * @param data.name - The name of the project
 * @param data.description - The description of the project
 * @param data.creatorId - The ID of the user creating the project
 * @returns A Promise that resolves to the created Project object
 */
export const createProject = async (data: CreateProject): Promise<Project> => {
  return await prisma.project.create({
    data: {
      name: data.name,
      description: data.description,
      creatorId: data.creatorId,
    },
  });
};

/**
 * Updates an existing project in the database with the provided data.
 *
 * @param projectId - The unique identifier of the project to update
 * @param data - Partial project data containing the fields to be updated
 * @returns Promise that resolves to the updated Project object
 * @throws Will throw an error if project with given ID is not found
 */
export const updateProject = async (
  projectId: number,
  data: Partial<CreateProject>,
): Promise<Project> => {
  return await prisma.project.update({
    where: {
      id: projectId,
    },
    data,
  });
};

/**
 * Deletes a project from the database based on its ID
 * @param projectId - The unique identifier of the project to delete
 * @returns A Promise that resolves when the project is successfully deleted
 * @throws Will throw an error if the project doesn't exist or if the deletion fails
 */
export const deleteProject = async (projectId: number): Promise<void> => {
  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });
};
