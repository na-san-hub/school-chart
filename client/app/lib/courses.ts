import { prisma } from "@/lib/prisma";
import { CourseListData } from "@/types/school";

/**
 * スクールIDからピックアップコース（最大2件）を取得する
 * 新しい順に並び替える
 */
export async function getPickupCoursesForSchool(
  schoolId: string
): Promise<CourseListData[]> {
  try {
    return await prisma.course.findMany({
      where: { schoolId },
      select: {
        id: true,
        schoolId: true,
        name: true,
        description: true,
        price: true,
        duration: true,
        deliveryMethod: true,
        locationPrefecture: true,
        courseCategories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
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
 * カテゴリーも含む
 */
export async function getAllCoursesForList(
  schoolId: string
): Promise<CourseListData[]> {
  try {
    return (await prisma.course.findMany({
      where: { schoolId },
      select: {
        id: true,
        schoolId: true,
        name: true,
        description: true,
        price: true,
        duration: true,
        locationPrefecture: true,
        deliveryMethod: true,
        courseCategories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })) as unknown as CourseListData[];
  } catch (error) {
    console.error("コース一覧取得エラー:", error);
    return [];
  }
}

/**
 * 特定のコースの詳細情報を取得する
 */
export async function getCourseDetails(courseId: string, schoolId: string) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        schoolId: schoolId, // スクールIDも確認
      },
      include: {
        school: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
        courseCategories: { include: { category: true } },
        courseFeatures: { include: { feature: true } },
        courseSkills: { include: { skill: true } },
      },
    });

    return course;
  } catch (error) {
    console.error("コース詳細取得エラー:", error);
    throw new Error("コース詳細の取得に失敗しました");
  }
}
