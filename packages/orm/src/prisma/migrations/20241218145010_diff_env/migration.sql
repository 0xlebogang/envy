/*
  Warnings:

  - You are about to drop the column `environmentId` on the `EnvVariable` table. All the data in the column will be lost.
  - You are about to drop the `Environment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[key,projectId]` on the table `EnvVariable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `envType` to the `EnvVariable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `EnvVariable` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EnvVariable" DROP CONSTRAINT "EnvVariable_environmentId_fkey";

-- DropForeignKey
ALTER TABLE "Environment" DROP CONSTRAINT "Environment_projectId_fkey";

-- DropIndex
DROP INDEX "EnvVariable_key_environmentId_key";

-- AlterTable
ALTER TABLE "EnvVariable" DROP COLUMN "environmentId",
ADD COLUMN     "envType" "EnvType" NOT NULL,
ADD COLUMN     "projectId" BIGINT NOT NULL;

-- DropTable
DROP TABLE "Environment";

-- CreateIndex
CREATE UNIQUE INDEX "EnvVariable_key_projectId_key" ON "EnvVariable"("key", "projectId");

-- AddForeignKey
ALTER TABLE "EnvVariable" ADD CONSTRAINT "EnvVariable_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
