import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

const prisma = new PrismaClient()

export const main = async (): Promise<void> => {
  console.log('Setting up test environment...')
  await createTestUser();
}

export const createTestUser = async () => {
  execSync('bunx prisma migrate reset --schema src/prisma/schema.prisma --force')
  await prisma.$connect()

  // create test user
  const testUser = await prisma.user.create({
    data: {
      userId: 'test-user'
    }
  })

  return testUser.id
}

main();