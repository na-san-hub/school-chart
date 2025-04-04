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
      take: 4,
    });

    // prisma enumとカスタムenumの型変換
    return reviews.map((review) => ({
      ...review,
      user: {
        gender: review.user
          .gender as unknown as import("@/types/review").Gender,
        ageGroup: review.user
          .ageGroup as unknown as import("@/types/review").AgeGroup,
      },
    })) as unknown as ReviewWithUser[];
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

    // prisma enumとカスタムenumの型変換
    return reviews.map((review) => ({
      ...review,
      user: {
        gender: review.user
          .gender as unknown as import("@/types/review").Gender,
        ageGroup: review.user
          .ageGroup as unknown as import("@/types/review").AgeGroup,
      },
    })) as unknown as ReviewWithUser[];
  } catch (error) {
    console.error("レビュー一覧取得エラー:", error);
    return [];
  }
};
