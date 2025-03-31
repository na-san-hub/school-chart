import { prisma } from "@/lib/prisma";
import { CourseDetail } from "@/types/school";

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
    return [];
  }
}
