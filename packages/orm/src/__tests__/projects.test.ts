import { describe, it, expect, beforeAll, afterAll } from 'bun:test'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

import {
getProjects,
getProjectById,
createProject,
updateProject,
deleteProject,
} from '../projects'
import type { CreateProject, Project, User } from '@envyper/zod'

const prisma = new PrismaClient()

describe('Projects', () => {
  let testUserId: bigint, projectId: bigint;

  const testProject: CreateProject = {
    name: 'Test Project',
    description: 'Test Description',
    creatorId: BigInt(1)
  }
  
  beforeAll(async () => {
    // get test user
    const testUser: User | null = await prisma.user.findUnique({
      where: {
        userId: 'test-user'
      }
    })

    testUserId = testUser?.id as bigint
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should create a project', async () => {
    const newProject = await createProject(testProject)

    if (newProject) {
      projectId = newProject.id
    }
    
    const projectRecord = await prisma.project.findFirst()

    expect(projectRecord).toBeTruthy()
    expect(projectRecord?.name).toBe(testProject.name)
  })

  it('should get a project by id', async () => {
    const existingProject = await getProjectById(BigInt(1))
    expect(existingProject).toMatchObject(testProject)
  })

  it('should get all projects', async () => {
    const projects = await getProjects(testUserId)
    expect(projects?.length).toBe(1)
  })

  it('should update a project', async () => {
    const data: Partial<Project> = {
      name: 'Updated Project',
      description: 'Updated Description',
    }

    const updatedProject = await updateProject(projectId, data)

    const record = await prisma.project.findUnique({
      where: {
        id: projectId
      }
    })

    expect(updatedProject?.name).toBe(record?.name as string)
    expect(updatedProject?.description).toBe(record?.description as string)
  })

  it('should delete a project', async () => {
    await deleteProject(projectId)

    const record = await prisma.project.findUnique({
      where: {
        id: projectId
      }
    })

    expect(record).toBeNull()
  })
})