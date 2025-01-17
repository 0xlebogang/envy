import { PrismaClient } from "@prisma/client";
import type { Project, CreateProject } from "@envyper/zod/projects";

const prisma = new PrismaClient();

export async function getProjects(userId: string): Promise<Project[]> {
  return prisma.project.findMany({
    where: {
      creatorId: userId,
    },
  });
}

export async function createProject(
  userId: string,
  data: CreateProject,
): Promise<Project> {
  return prisma.project.create({
    data: {
      ...data,
      creatorId: userId,
    },
  });
}

export async function getProjectById(
  userId: string,
  projectId: string,
): Promise<Project | null> {
  return prisma.project.findFirst({
    where: {
      id: projectId,
      creatorId: userId,
    },
  });
}

export async function updateProject(
  userId: string,
  projectId: string,
  data: Partial<CreateProject>,
): Promise<Project | null> {
  return prisma.project.update({
    where: {
      id: projectId,
      creatorId: userId,
    },
    data,
  });
}

export async function deleteProject(
  userId: string,
  projectId: string,
): Promise<Project | null> {
  return prisma.project.delete({
    where: {
      id: projectId,
      creatorId: userId,
    },
  });
}
