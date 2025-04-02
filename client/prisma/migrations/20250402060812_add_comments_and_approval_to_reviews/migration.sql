/*
  Warnings:

  - Added the required column `comment_community` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_cost` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_curriculum` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_instructor` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_support` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "review" ADD COLUMN     "comment_community" TEXT NOT NULL,
ADD COLUMN     "comment_cost" TEXT NOT NULL,
ADD COLUMN     "comment_curriculum" TEXT NOT NULL,
ADD COLUMN     "comment_instructor" TEXT NOT NULL,
ADD COLUMN     "comment_support" TEXT NOT NULL,
ADD COLUMN     "is_approved" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "comment" DROP NOT NULL;
