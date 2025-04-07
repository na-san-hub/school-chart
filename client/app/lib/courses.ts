import { prisma } from "@/lib/prisma";
import { CourseDetail } from "@/types/school";
import { CourseAllData } from "@/types/school";

/**
 * スクールIDからピックアップコース（最大2件）を取得する
 * 新しい順に並び替える
 */
export async function getPickupCoursesForSchool(
  schoolId: string
): Promise<CourseDetail[]> {
  try {
    return await prisma.course.findMany({
      where: { schoolId },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        duration: true,
        deliveryMethod: true,
        locationPrefecture: true,
      },
      take: 2,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("ピックアップコース取得エラー:", error);
    return [];
  }
}

/**
 * スクールIDからすべてのコース情報を取得する
 * カテゴリー・特徴・スキル情報も含む
 */
export async function getAllCoursesForSchool(
  schoolId: string
): Promise<CourseAllData[]> {
  try {
    return await prisma.course.findMany({
      where: { schoolId },
      include: {
        courseCategories: { include: { category: true } },
        courseFeatures: { include: { feature: true } },
        courseSkills: { include: { skill: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("コース一覧取得エラー:", error);
    return [];
  }
}
