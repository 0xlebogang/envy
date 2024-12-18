import { describe, it, expect, beforeAll, afterAll } from 'bun:test'
import { PrismaClient } from '@prisma/client'
import type { CreateEnvVariable, EnvVariable, Project } from '@envyper/zod'

import {
  getEnvVariables,
  getEnvVariableById,
  createEnvVariable,
  updateEnvVariable,
  deleteEnvVariable,
} from '../envVars'

const prisma = new PrismaClient()

describe('Environment Variables', () => {
  let projectId: bigint, envVarId: bigint;

  const testEnvVar: CreateEnvVariable = {
    envType: 'DEV',
    key: 'TEST_KEY',
    value: 'test_value',
    projectId: BigInt(1)
  }

  beforeAll(async () => {
    // create test project
    const testProject: Project = await prisma.project.create({
      data: {
        name: 'Test Project',
        description: 'Test Description',
        creatorId: BigInt(1)
      }
    })
    
    projectId = testProject?.id as bigint
    testEnvVar.projectId = projectId
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should create an environment variable', async () => {
    const newEnvVar = await createEnvVariable(testEnvVar)

    if (newEnvVar) {
      envVarId = newEnvVar.id
    }
    
    const envVarRecord = await prisma.envVariable.findFirst()

    expect(envVarRecord).toBeTruthy()
    expect(envVarRecord?.key).toBe(testEnvVar.key)
  })

  it('should get an environment variable by id', async () => {
    const existingEnvVar = await getEnvVariableById(envVarId)
    expect(existingEnvVar).toMatchObject(testEnvVar)
  })

  it('should get all environment variables for a project', async () => {
    const envVars = await getEnvVariables(projectId)
    expect(envVars?.length).toBe(1)
  })

  it('should update an environment variable', async () => {
    const data: Partial<CreateEnvVariable> = {
      key: 'UPDATED_KEY',
      value: 'updated_value',
    }

    const updatedEnvVar = await updateEnvVariable(envVarId, data)

    const record = await prisma.envVariable.findUnique({
      where: {
        id: envVarId
      }
    })

    expect(updatedEnvVar?.key).toBe(record?.key as string)
    expect(updatedEnvVar?.value).toBe(record?.value as string)
  })

  it('should delete an environment variable', async () => {
    await deleteEnvVariable(envVarId)

    const record = await prisma.envVariable.findUnique({
      where: {
        id: envVarId
      }
    })

    expect(record).toBeNull()
  })
})