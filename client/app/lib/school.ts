import {
  SchoolWithCourses,
  SchoolHeaderData,
  RadarChartData,
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

    return {
      ...school,
      courses: school.courses.map((course) => ({
        id: course.id,
        deliveryMethod: course.deliveryMethod,
        locationPrefecture: course.locationPrefecture,
        category: course.courseCategories.map((cc) => cc.category), // そのまま取得
        features: course.courseFeatures.map((cf) => cf.feature), // そのまま取得
        skills: course.courseSkills.map((cs) => cs.skill), // そのまま取得
      })),

      // 🔹 受講エリアの重複を排除
      locations: Array.from(
        new Set(school.courses.map((c) => c.locationPrefecture))
      ),

      // 🔹 カテゴリの重複を排除（スクール全体）
      categories: Array.from(
        new Map(
          school.courses.flatMap((c) =>
            c.courseCategories.map((cc) => [cc.category.id, cc.category.name])
          )
        ).values()
      ),

      // 🔹 特徴の重複を排除（スクール全体）
      features: Array.from(
        new Map(
          school.courses.flatMap((c) =>
            c.courseFeatures.map((cf) => [cf.feature.id, cf.feature.name])
          )
        ).values()
      ),

      // 🔹 スキルの重複を排除（スクール全体）
      skills: Array.from(
        new Map(
          school.courses.flatMap((c) =>
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
      },
    });

    if (!school) {
      throw new Error(`スクールが見つかりません`);
    }

    return school;
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

    const radarChartData: RadarChartData = {
      schoolRating: school.rating,
      categories: rating.map((rating) => ({
        category: rating.category,
        score: rating.score,
      })),
    };

    return radarChartData;
  } catch {
    throw new Error("スクールの情報の取得に失敗しました");
  }
}
