import {
  SchoolWithCourses,
  SchoolHeaderData,
  RadarChartData,
  CourseSummary,
  CourseAllData,
  RatingData,
} from "@/types/school";

import { prisma } from "./prisma";

// スクール詳細情報を取得（`courses` の一部あり）
export async function getSchoolWithCourses(
  id: string
): Promise<SchoolWithCourses> {
  try {
    const school = await prisma.school.findUnique({
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
    });

    if (!school) {
      throw new Error("スクールが見つかりません");
    }

    const courses: CourseAllData[] = school.courses as CourseAllData[];

    return {
      ...school,
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

      // 受講エリアの重複を排除
      locations: Array.from(
        new Set(school.courses.map((c: CourseAllData) => c.locationPrefecture))
      ),

      // カテゴリの重複を排除（スクール全体）
      categories: Array.from(
        new Map(
          school.courses.flatMap((c: CourseAllData) =>
            c.courseCategories.map((cc) => [cc.category.id, cc.category.name])
          )
        ).values()
      ),

      // 特徴の重複を排除（スクール全体）
      features: Array.from(
        new Map(
          school.courses.flatMap((c: CourseAllData) =>
            c.courseFeatures.map((cf) => [cf.feature.id, cf.feature.name])
          )
        ).values()
      ),

      // スキルの重複を排除（スクール全体）
      skills: Array.from(
        new Map(
          school.courses.flatMap((c: CourseAllData) =>
            c.courseSkills.map((cs) => [cs.skill.id, cs.skill.name])
          )
        ).values()
      ),
    };
  } catch {
    throw new Error("スクール情報の取得に失敗しました");
  }
}

// ヘッダー用のデータを取得（名前・ロゴ・評価・説明のみ）
export async function getSchoolHeader(id: string): Promise<SchoolHeaderData> {
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
              select: { reviews: true },
            },
          },
        },
      },
    });

    if (!school) {
      throw new Error(`スクールが見つかりません`);
    }

    const reviewsCount = school.courses.reduce(
      (total, course) => total + course._count.reviews,
      0
    );

    return { ...school, reviewsCount };
  } catch {
    throw new Error("スクールの情報の取得に失敗しました");
  }
}

//チャートセクション用データの取得
export async function getRadarChartData(
  schoolId: string
): Promise<RadarChartData> {
  try {
    const school = await prisma.school.findUnique({
      where: { id: schoolId },
      select: {
        rating: true,
      },
    });
    if (!school) {
      throw new Error(`スクールが見つかりません`);
    }

    const rating = await prisma.rating.findMany({
      where: { schoolId },
      select: {
        category: true,
        score: true,
      },
    });

    const sortedRating = rating.sort((a, b) =>
      a.category.localeCompare(b.category, "ja")
    );

    const radarChartData: RadarChartData = {
      schoolRating: school.rating,
      categories: sortedRating.map((rating: RatingData) => ({
        category: rating.category,
        score: rating.score,
      })),
    };

    return radarChartData;
  } catch {
    throw new Error("スクールの情報の取得に失敗しました");
  }
}
