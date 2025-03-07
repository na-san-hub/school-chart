import { prisma } from "@/lib/prisma";
import { Prisma, DeliveryMethod } from "@prisma/client";

// スキルリストを取得
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
  location_prefectures?: string[];
  delivery_method?: string;
  keyword?: string;
  price_min?: string;
  price_max?: string;
}) {
  try {
    // 既存の条件：スキル・職種・特徴（DBからID取得）
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

    const skillIdList = skillIds.map((s) => s.id);
    const professionIdList = professionIds.map((p) => p.id);
    const featureIdList = featureIds.map((f) => f.id);

    // Course 関連の条件（すべて Course モデル内のフィールドに対する検索条件）
    const courseConditions: Prisma.CourseWhereInput[] = [];

    if (skillIdList.length > 0) {
      courseConditions.push({
        courseSkills: { some: { skillId: { in: skillIdList } } },
      });
    }
    if (professionIdList.length > 0) {
      courseConditions.push({
        courseCategories: {
          some: {
            category: {
              categoryProfessions: {
                some: { professionId: { in: professionIdList } },
              },
            },
          },
        },
      });
    }
    if (featureIdList.length > 0) {
      courseConditions.push({
        courseFeatures: { some: { featureId: { in: featureIdList } } },
      });
    }
    if (
      filters.location_prefectures &&
      filters.location_prefectures.length > 0
    ) {
      // Course モデルの locationPrefecture フィールドに対する条件
      courseConditions.push({
        locationPrefecture: { in: filters.location_prefectures },
      });
    }
    if (filters.delivery_method) {
      courseConditions.push({
        deliveryMethod: filters.delivery_method as DeliveryMethod,
      });
    }
    if (filters.price_min) {
      const min = parseInt(filters.price_min, 10);
      if (!isNaN(min)) {
        courseConditions.push({ price: { gte: min } });
      }
    }
    if (filters.price_max) {
      const max = parseInt(filters.price_max, 10);
      if (!isNaN(max)) {
        courseConditions.push({ price: { lte: max } });
      }
    }

    // School（＝スクール）の条件（フリーワード検索）
    const schoolConditions: Prisma.SchoolWhereInput[] = [];
    if (filters.keyword) {
      schoolConditions.push({
        OR: [
          { name: { contains: filters.keyword, mode: "insensitive" } },
          { description: { contains: filters.keyword, mode: "insensitive" } },
        ],
      });
    }

    // それぞれの条件をまとめる
    const whereClause: Prisma.SchoolWhereInput = {};

    // Course 関連の条件は、少なくとも1つの Course が条件を満たす必要がある
    if (courseConditions.length > 0) {
      whereClause.courses = { some: { AND: courseConditions } };
    }
    // School 自体の条件（フリーワード検索）がある場合
    if (schoolConditions.length > 0) {
      Object.assign(whereClause, { AND: schoolConditions });
    }

    // 検索実行（条件がなければ全件取得）
    const schools = await prisma.school.findMany({
      where: Object.keys(whereClause).length > 0 ? whereClause : {},
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
