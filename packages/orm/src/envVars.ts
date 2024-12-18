import type {
EnvVariable,
CreateEnvVariable,
} from "@envyper/zod";

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getEnvVariables = async (projectId: bigint): Promise<EnvVariable[]> => {
  return await prisma.envVariable.findMany({
    where: {
      projectId: projectId
    },
  })
}

export const getEnvVariableById = async (envVariableId: bigint): Promise<EnvVariable|null> => {
  return await prisma.envVariable.findUnique({
    where: {
      id: envVariableId
    }
  })
}

export const createEnvVariable = async (data: CreateEnvVariable): Promise<EnvVariable> => {
  return await prisma.envVariable.create({
    data: {
      envType: data.envType,
      key: data.key,
      value: data.value,
      projectId: data.projectId
    }
  })
}

export const updateEnvVariable = async (envVariableId: bigint, data: Partial<CreateEnvVariable>): Promise<EnvVariable> => {
  return await prisma.envVariable.update({
    where: {
      id: envVariableId
    },
    data
  })
}

export const deleteEnvVariable = async (envVariableId: bigint): Promise<void> => {
  await prisma.envVariable.delete({
    where: {
      id: envVariableId
    }
  })
}