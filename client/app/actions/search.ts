"use server";

import { prisma } from "@/lib/prisma";

//条件に合うスクールを取得
export async function searchSchools(filters: {
  skills: string[];
  professions: string[];
  features: string[];
}) {
  return prisma.school.findMany({
    where: {
      courses: {
        some: {
          AND: [
            // ✅ `skills` が選択されている場合のみ条件に適用
            filters.skills.length > 0
              ? { courseSkills: { some: { skillId: { in: filters.skills } } } }
              : {},

            // ✅ `professions`（職種）は `CourseCategory -> CategoryProfession` を経由して検索
            filters.professions.length > 0
              ? {
                  courseCategories: {
                    some: {
                      category: {
                        categoryProfessions: {
                          some: { professionId: { in: filters.professions } },
                        },
                      },
                    },
                  },
                }
              : {},

            // ✅ `features` が選択されている場合のみ条件に適用
            filters.features.length > 0
              ? {
                  courseFeatures: {
                    some: { featureId: { in: filters.features } },
                  },
                }
              : {},
          ],
        },
      },
    },
    select: {
      id: true,
      name: true,
      logo: true,
      rating: true,
      description: true,
    },
  });
}

// 学べるスキルを取得
export async function getSkills() {
  return prisma.skill.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

// 目指せる職種を取得
export async function getProfessions() {
  return prisma.profession.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

//  こだわり検索を取得
export async function getFeatures() {
  return prisma.feature.findMany({
    select: {
      id: true, // ✅ UUID
      name: true,
    },
  });
}
