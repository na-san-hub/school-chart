import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// 特定のスクールのピックアップレビュー（最新4件）取得
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
    take: 4, // 最新の4件だけ
  });

  return reviews;
};

// 特定のスクールのすべてのレビューを取得（フィルタリング機能付き）
export const getAllReviewsForSchool = async (
  schoolId: string,
  filters?: {
    gender?: string;
    ageGroup?: string;
    keyword?: string;
    sort?: "latest" | "rating_high" | "rating_low";
  }
) => {
  // フィルタリング条件の構築
  const whereCondition: Prisma.ReviewWhereInput = {
    course: {
      schoolId,
    },
  };

  // 性別フィルター
  if (filters?.gender && filters.gender !== "all") {
    whereCondition.user = {
      ...whereCondition.user,
      gender: filters.gender as any,
    };
  }

  // 年代フィルター
  if (filters?.ageGroup && filters.ageGroup !== "all") {
    whereCondition.user = {
      ...whereCondition.user,
      ageGroup: filters.ageGroup as any,
    };
  }

  // キーワード検索
  if (filters?.keyword) {
    whereCondition.comment = {
      contains: filters.keyword,
      mode: "insensitive",
    };
  }

  // ソート条件
  let orderBy: Prisma.ReviewOrderByWithRelationInput = {
    createdAt: "desc", // デフォルトは新着順
  };

  if (filters?.sort === "rating_high") {
    // 評価の高い順（カリキュラム、講師、料金、サポート、コミュニティの平均）
    // Prismaでは直接平均計算ができないため、フロントエンドでソートするか、
    // 複雑なクエリが必要になります。ここではシンプルに実装します。
    orderBy = {
      ratingCurriculum: "desc",
    };
  } else if (filters?.sort === "rating_low") {
    orderBy = {
      ratingCurriculum: "asc",
    };
  }

  const reviews = await prisma.review.findMany({
    where: whereCondition,
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
    orderBy,
  });

  return reviews;
};
