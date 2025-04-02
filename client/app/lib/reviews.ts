import { prisma } from "@/lib/prisma";
import { Prisma, Gender, AgeGroup } from "@prisma/client";
import { ReviewWithUser } from "@/types/review";

// 安全な型定義を追加
type FilterParams = {
  gender?: Gender | "all";
  ageGroup?: AgeGroup | "all";
  keyword?: string;
  sort?: "latest" | "rating_high" | "rating_low";
};

// 特定のスクールのピックアップレビュー（最新4件）取得
export const getReviewsForSchool = async (
  schoolId: string
): Promise<ReviewWithUser[]> => {
  const reviews = await prisma.review.findMany({
    where: {
      course: {
        schoolId,
      },
    },
    select: {
      id: true,
      comment: true,
      createdAt: true,
      ratingCurriculum: true,
      ratingInstructor: true,
      ratingCost: true,
      ratingSupport: true,
      ratingCommunity: true,
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
    take: 4,
  });

  return reviews;
};

// 特定のスクールのすべてのレビューを取得（フィルタリング機能付き）
export const getAllReviewsForSchool = async (
  schoolId: string
): Promise<ReviewWithUser[]> => {
  const reviews = await prisma.review.findMany({
    where: {
      course: {
        schoolId,
      },
    },
    select: {
      id: true,
      comment: true,
      createdAt: true,
      ratingCurriculum: true,
      ratingInstructor: true,
      ratingCost: true,
      ratingSupport: true,
      ratingCommunity: true,
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
  });

  return reviews as ReviewWithUser[];
};
