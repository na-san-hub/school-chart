import {
  SchoolWithCourses,
  SchoolCoverData,
  RadarChartData,
  CourseSummary,
  CourseAllData,
  RatingData,
} from "@/types/school";

import { prisma } from "@/lib/prisma";

// スクール詳細情報を取得（`courses` の一部あり）
export async function getSchoolWithCourses(
  id: string
): Promise<SchoolWithCourses> {
  try {
    // `$transaction()` を使用して 1 回の DB リクエストでデータを取得
    const [school] = await prisma.$transaction([
      prisma.school.findUnique({
        where: { id },
        include: {
          courses: {
            include: {
              courseCategories: { include: { category: true } },
              courseFeatures: { include: { feature: true } },
              courseSkills: { include: { skill: true } },
            },
          },
        },
      }),
    ]);

    if (!school) {
      throw new Error("スクールが見つかりません");
    }

    const courses: CourseAllData[] = school.courses as CourseAllData[];

    return {
      id: school.id,
      name: school.name,
      logo: school.logo,
      website: school.website,
      rating: school.rating,
      description: school.description,
      courses: courses.map(
        (course): CourseSummary => ({
          id: course.id,
          deliveryMethod: course.deliveryMethod,
          locationPrefecture: course.locationPrefecture,
          category: course.courseCategories.map((cc) => cc.category),
          features: course.courseFeatures.map((cf) => cf.feature),
          skills: course.courseSkills.map((cs) => cs.skill),
        })
      ),
      locations: [...new Set(school.courses.map((c) => c.locationPrefecture))],
      categories: [
        ...new Set(
          school.courses.flatMap((c) =>
            c.courseCategories.map((cc) => cc.category.name)
          )
        ),
      ],
      features: [
        ...new Set(
          school.courses.flatMap((c) =>
            c.courseFeatures.map((cf) => cf.feature.name)
          )
        ),
      ],
      skills: [
        ...new Set(
          school.courses.flatMap((c) =>
            c.courseSkills.map((cs) => cs.skill.name)
          )
        ),
      ],
    };
  } catch {
    throw new Error("スクール情報の取得に失敗しました");
  }
}

// ヘッダー用のデータを取得（名前・ロゴ・評価・説明のみ）
export async function getSchoolHeader(id: string): Promise<SchoolCoverData> {
  try {
    const school = await prisma.school.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        logo: true,
        rating: true,
        description: true,
        courses: {
          select: {
            _count: {
              select: {
                reviews: {
                  where: {
                    isApproved: true, // 承認済みのレビューのみカウント
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!school) {
      throw new Error(`スクールが見つかりません`);
    }

    return {
      id: school.id,
      name: school.name,
      logo: school.logo,
      rating: school.rating,
      description: school.description,
      reviewsCount: school.courses.reduce(
        (total, course) => total + course._count.reviews,
        0
      ),
    };
  } catch {
    throw new Error("スクールの情報の取得に失敗しました");
  }
}

// チャートセクション用データの取得
export async function getRadarChartData(
  schoolId: string
): Promise<RadarChartData> {
  try {
    const [school, ratings] = await prisma.$transaction([
      prisma.school.findUnique({
        where: { id: schoolId },
        select: {
          rating: true,
        },
      }),
      prisma.rating.findMany({
        where: { schoolId },
        select: {
          category: true,
          score: true,
        },
      }),
    ]);

    if (!school) {
      throw new Error(`スクールが見つかりません`);
    }

    return {
      schoolRating: school.rating,
      categories: ratings
        .sort((a, b) => a.category.localeCompare(b.category, "ja"))
        .map((rating: RatingData) => ({
          category: rating.category,
          score: Number(rating.score), // 明示的に `number` に変換
        })),
    };
  } catch {
    throw new Error("スクールの情報の取得に失敗しました");
  }
}

/**
 * 関連スクールを取得する（同じカテゴリのスクール最大5件）
 * 現在のスクールは除外する
 */
export async function getRelatedSchools(
  schoolId: string,
  categories: string[],
  limit: number = 5
): Promise<
  Array<{ id: string; name: string; logo: string | null; rating: number }>
> {
  if (!categories || categories.length === 0) {
    return [];
  }

  try {
    // 同じカテゴリを持つコースがあるスクールを検索
    const schools = await prisma.school.findMany({
      where: {
        id: {
          not: schoolId, // 現在のスクールは除外
        },
        courses: {
          some: {
            courseCategories: {
              some: {
                category: {
                  name: {
                    in: categories,
                  },
                },
              },
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        logo: true,
        rating: true,
      },
      orderBy: {
        rating: "desc",
      },
      take: limit,
    });

    return schools;
  } catch (error) {
    console.error("関連スクール取得エラー:", error);
    return [];
  }
}
