/*
  Warnings:

  - Made the column `ageGroup` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "ageGroup" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL;
