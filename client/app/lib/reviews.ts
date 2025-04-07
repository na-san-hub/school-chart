import { prisma } from "@/lib/prisma";
import { ReviewWithUser } from "@/types/review";

// 特定のスクールのピックアップレビュー（最新4件）取得
export const getReviewsForSchool = async (
  schoolId: string
): Promise<ReviewWithUser[]> => {
  try {
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
        commentCurriculum: true,
        commentInstructor: true,
        commentCost: true,
        commentSupport: true,
        commentCommunity: true,
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

    return reviews as ReviewWithUser[];
  } catch (error) {
    console.error("ピックアップレビュー取得エラー:", error);
    return [];
  }
};

// 特定のスクールのすべてのレビューを取得（フィルタリング機能付き）
export const getAllReviewsForSchool = async (
  schoolId: string
): Promise<ReviewWithUser[]> => {
  try {
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
        // カテゴリごとのコメントフィールド (スキーマでは必須)
        commentCurriculum: true,
        commentInstructor: true,
        commentCost: true,
        commentSupport: true,
        commentCommunity: true,
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
  } catch (error) {
    console.error("レビュー一覧取得エラー:", error);
    return [];
  }
};
