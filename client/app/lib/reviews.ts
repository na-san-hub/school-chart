import { prisma } from "@/lib/prisma";
import { ReviewWithUser, Gender, AgeGroup } from "@/types/review";

// 特定のスクールのピックアップレビュー（最新2件）取得
export const getPickupReviewsForSchool = async (
  schoolId: string
): Promise<ReviewWithUser[]> => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        course: {
          schoolId,
        },
        isApproved: true, // 承認済みのレビューのみ
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
      take: 2,
    });
    return reviews as ReviewWithUser[];
  } catch (error) {
    console.error("ピックアップレビュー取得エラー:", error);
    return [];
  }
};

// 特定のスクールのすべてのレビューを取得（ページネーション機能付き）
export const getAllReviewsForSchool = async (
  schoolId: string,
  page = 1,
  perPage = 10,
  filters?: {
    gender?: string;
    ageGroup?: string;
    keyword?: string;
  }
): Promise<{ reviews: ReviewWithUser[]; totalCount: number }> => {
  try {
    // 検索条件
    const whereCondition: any = {
      course: {
        schoolId,
      },
      isApproved: true, // 承認済みのレビューのみ
    };

    // フィルター条件を追加
    if (filters) {
      if (filters.gender) {
        whereCondition.user = {
          ...whereCondition.user,
          gender: {
            equals: filters.gender as Gender,
          },
        };
      }

      if (filters.ageGroup) {
        whereCondition.user = {
          ...whereCondition.user,
          ageGroup: {
            equals: filters.ageGroup as AgeGroup,
          },
        };
      }

      if (filters.keyword) {
        whereCondition.OR = [
          { comment: { contains: filters.keyword } },
          { commentCurriculum: { contains: filters.keyword } },
          { commentInstructor: { contains: filters.keyword } },
          { commentCost: { contains: filters.keyword } },
          { commentSupport: { contains: filters.keyword } },
          { commentCommunity: { contains: filters.keyword } },
        ];
      }
    }

    // 総件数を取得
    const totalCount = await prisma.review.count({
      where: whereCondition,
    });

    // レビューを取得（ページネーション付き）
    const reviews = await prisma.review.findMany({
      where: whereCondition,
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
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return {
      reviews: reviews as ReviewWithUser[],
      totalCount,
    };
  } catch (error) {
    console.error("レビュー一覧取得エラー:", error);
    return {
      reviews: [],
      totalCount: 0,
    };
  }
};
