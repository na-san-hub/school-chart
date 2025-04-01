import { prisma } from "@/lib/prisma";

//pickupレビュー取得関数
export const getReviewsForSchool = async (schoolId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      course: {
        schoolId,
      },
    },
    include: {
      user: {
        select: {
          gender: true,
          ageGroup: true,
        },
      },
      course: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4, // 直近の4件だけ
  });

  return reviews;
};
