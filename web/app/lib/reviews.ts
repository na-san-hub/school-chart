import { prisma } from "@/lib/prisma";
import { ReviewWithUser, Gender, AgeGroup } from "@/types/review";
import { Prisma } from "@prisma/client";

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
    sort?: string;
  }
): Promise<{ reviews: ReviewWithUser[]; totalCount: number }> => {
  try {
    // 検索条件
    const whereCondition: Prisma.ReviewWhereInput = {
      course: {
        schoolId,
      },
      isApproved: true, // 承認済みのレビューのみ
    };

    // フィルター条件を追加
    if (filters) {
      // gender または ageGroup がある場合、userオブジェクトを初期化
      if (filters.gender || filters.ageGroup) {
        // userオブジェクトを初期化
        whereCondition.user = {};

        // gender条件を追加
        if (filters.gender) {
          whereCondition.user.gender = filters.gender as Gender;
        }

        // ageGroup条件を追加
        if (filters.ageGroup) {
          whereCondition.user.ageGroup = filters.ageGroup as AgeGroup;
        }
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

    // ソート条件の設定
    let orderBy: Prisma.ReviewOrderByWithRelationInput[] = [];

    if (filters?.sort) {
      switch (filters.sort) {
        case "rating_high":
          // 評価の高い順（5つの評価の平均値が高いもの優先）
          orderBy = [
            { ratingCurriculum: "desc" },
            { ratingInstructor: "desc" },
            { ratingCost: "desc" },
            { ratingSupport: "desc" },
            { ratingCommunity: "desc" },
            { createdAt: "desc" }, // 同点の場合は新しい順
          ];
          break;
        case "rating_low":
          // 評価の低い順（5つの評価の平均値が低いもの優先）
          orderBy = [
            { ratingCurriculum: "asc" },
            { ratingInstructor: "asc" },
            { ratingCost: "asc" },
            { ratingSupport: "asc" },
            { ratingCommunity: "asc" },
            { createdAt: "desc" }, // 同点の場合は新しい順
          ];
          break;
        case "latest":
        default:
          // デフォルトは新着順
          orderBy = [{ createdAt: "desc" }];
          break;
      }
    } else {
      // ソート条件がない場合のデフォルト（新着順）
      orderBy = [{ createdAt: "desc" }];
    }

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
      orderBy: orderBy,
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
