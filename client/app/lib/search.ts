import { prisma } from "@/lib/prisma";
import { SchoolCoverData } from "@/types/school";
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
  sort?: string;
}) {
  try {
    // 既存の条件：スキル・職種・特徴（DBからID取得）
    const [skillResults, professionResults, featureResults] =
      await prisma.$transaction([
        prisma.skill.findMany({
          where: { name: { in: filters.skills } },
          select: { id: true },
        }),
        prisma.profession.findMany({
          where: { name: { in: filters.professions } },
          select: { id: true },
        }),
        prisma.feature.findMany({
          where: { name: { in: filters.features } },
          select: { id: true },
        }),
      ]);

    const skillIdList = skillResults.map((s) => s.id);
    const professionIdList = professionResults.map((p) => p.id);
    const featureIdList = featureResults.map((f) => f.id);

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
          {
            courses: {
              some: {
                name: { contains: filters.keyword, mode: "insensitive" },
              },
            },
          },
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

    // ソート条件の設定
    let orderBy: Prisma.SchoolOrderByWithRelationInput = {};

    switch (filters.sort) {
      case "rating":
        orderBy = { rating: "desc" }; // 評価順（高い順）
        break;
      case "newest":
        orderBy = { createdAt: "desc" }; // 新着順
        break;
      default:
        // デフォルトはおすすめ順（ここではratingをデフォルトとしています）
        orderBy = { rating: "desc" };
        break;
    }

    // 検索実行（条件がなければ全件取得）
    const schools = await prisma.school.findMany({
      where: Object.keys(whereClause).length > 0 ? whereClause : {},
      orderBy, // ソート条件を適用
      take: 20,
      select: {
        id: true,
        name: true,
        logo: true,
        rating: true,
        description: true,
        courses: {
          select: {
            _count: {
              select: { reviews: true },
            },
          },
        },
      },
    });

    // 各学校ごとに、紐づくコースのレビュー数の合計を計算して SchoolCoverData に変換
    const schoolsWithReviewCount: SchoolCoverData[] = schools.map((school) => {
      const reviewsCount = school.courses.reduce(
        (sum, course) => sum + course._count.reviews,
        0
      );
      return {
        id: school.id,
        name: school.name,
        logo: school.logo,
        rating: school.rating,
        description: school.description,
        reviewsCount,
      };
    });

    return schoolsWithReviewCount;
  } catch (error) {
    console.error("検索エラー:", error);
    return [];
  }
}
