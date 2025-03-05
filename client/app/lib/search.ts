import { prisma } from "@/lib/prisma";

// 学べるスキルを取得
export async function getSkills() {
  return prisma.skill.findMany({
    select: {
      name: true,
    },
  });
}

// 目指せる職種を取得
export async function getProfessions() {
  return prisma.profession.findMany({
    select: {
      name: true,
    },
  });
}

//  こだわり検索を取得
export async function getFeatures() {
  return prisma.feature.findMany({
    select: {
      name: true,
    },
  });
}

//条件に合ったスクールを検索
export async function searchSchools(filters: {
  skills: string[];
  professions: string[];
  features: string[];
}) {
  try {
    // name から id を取得
    const skillIds = await prisma.skill.findMany({
      where: { name: { in: filters.skills } },
      select: { id: true },
    });
    const professionIds = await prisma.profession.findMany({
      where: { name: { in: filters.professions } },
      select: { id: true },
    });
    const featureIds = await prisma.feature.findMany({
      where: { name: { in: filters.features } },
      select: { id: true },
    });

    // 各配列に変換
    const skillIdList = skillIds.map((s) => s.id);
    const professionIdList = professionIds.map((p) => p.id);
    const featureIdList = featureIds.map((f) => f.id);

    // 条件を組み立て（条件がない場合は undefined とし、後でフィルタリング）
    const conditions = [
      skillIdList.length > 0
        ? { courseSkills: { some: { skillId: { in: skillIdList } } } }
        : undefined,
      professionIdList.length > 0
        ? {
            courseCategories: {
              some: {
                category: {
                  categoryProfessions: {
                    some: { professionId: { in: professionIdList } },
                  },
                },
              },
            },
          }
        : undefined,
      featureIdList.length > 0
        ? { courseFeatures: { some: { featureId: { in: featureIdList } } } }
        : undefined,
    ].filter((cond) => cond !== undefined);

    // 検索実行（条件がなければ全件取得）
    const schools = await prisma.school.findMany({
      where:
        conditions.length > 0 ? { courses: { some: { AND: conditions } } } : {},
      select: {
        id: true,
        name: true,
        logo: true,
        rating: true,
        description: true,
      },
    });

    return schools;
  } catch (error) {
    console.error("検索エラー:", error);
    return [];
  }
}
