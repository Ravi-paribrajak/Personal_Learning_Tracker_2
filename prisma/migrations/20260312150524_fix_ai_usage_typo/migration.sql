/*
  Warnings:

  - You are about to drop the column `ai_usagage_level` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "ai_usagage_level",
ADD COLUMN     "ai_usage_level" TEXT;
