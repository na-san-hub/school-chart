-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "AgeGroup" AS ENUM ('TEENS', 'TWENTIES', 'THIRTIES', 'FORTIES', 'FIFTIES', 'SIXTIES');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "ageGroup" "AgeGroup",
ADD COLUMN     "gender" "Gender";
