-- CreateEnum
CREATE TYPE "DeliveryMethod" AS ENUM ('IN_PERSON', 'ONLINE', 'HYBRID');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "description" TEXT,
    "rating" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "score" SMALLINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deliveryMethod" "DeliveryMethod" NOT NULL DEFAULT 'ONLINE',
    "locationPrefecture" TEXT NOT NULL,
    "locationAddress" TEXT,
    "price" INTEGER,
    "duration" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "ratingCurriculum" INTEGER NOT NULL,
    "ratingInstructor" INTEGER NOT NULL,
    "ratingCost" INTEGER NOT NULL,
    "ratingSupport" INTEGER NOT NULL,
    "ratingCommunity" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profession" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Profession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseSkill" (
    "courseId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "CourseSkill_pkey" PRIMARY KEY ("courseId","skillId")
);

-- CreateTable
CREATE TABLE "CourseFeature" (
    "courseId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,

    CONSTRAINT "CourseFeature_pkey" PRIMARY KEY ("courseId","featureId")
);

-- CreateTable
CREATE TABLE "CourseCategory" (
    "courseId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "CourseCategory_pkey" PRIMARY KEY ("courseId","categoryId")
);

-- CreateTable
CREATE TABLE "CategoryProfession" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "professionId" TEXT NOT NULL,

    CONSTRAINT "CategoryProfession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_courseId_key" ON "Review"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Profession_name_key" ON "Profession"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_name_key" ON "Feature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSkill" ADD CONSTRAINT "CourseSkill_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSkill" ADD CONSTRAINT "CourseSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseFeature" ADD CONSTRAINT "CourseFeature_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseFeature" ADD CONSTRAINT "CourseFeature_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseCategory" ADD CONSTRAINT "CourseCategory_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseCategory" ADD CONSTRAINT "CourseCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryProfession" ADD CONSTRAINT "CategoryProfession_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryProfession" ADD CONSTRAINT "CategoryProfession_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
