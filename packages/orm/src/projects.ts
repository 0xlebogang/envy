import type {
Project,
CreateProject,
} from "@envyper/zod";

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getProjects = async (userId: bigint): Promise<Project[]> => {
  return await prisma.project.findMany({
    where: {
      creatorId: userId
    },
  })
}

export const getProjectById = async (projectId: bigint): Promise<Project|null> => {
  return await prisma.project.findUnique({
    where: {
      id: projectId
    }
  })
}

export const createProject = async (data: CreateProject): Promise<Project> => {
  return await prisma.project.create({
    data: {
      name: data.name,
      description: data.description,
      creatorId: data.creatorId
    }
  })
}

export const updateProject = async (projectId: bigint, data: Partial<CreateProject>): Promise<Project> => {
  return await prisma.project.update({
    where: {
      id: projectId
    },
    data
  })
}

export const deleteProject = async (projectId: bigint): Promise<void> => {
  await prisma.project.delete({
    where: {
      id: projectId
    }
  })
}