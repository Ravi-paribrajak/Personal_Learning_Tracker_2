/*
  Warnings:

  - Added the required column `date` to the `Daily_Logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Daily_Logs" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
