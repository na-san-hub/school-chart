"use server";

import { prisma } from "@/lib/prisma";
import { ReviewWithUser } from "@/types/review";
import { Gender, AgeGroup } from "@prisma/client";

// フィルター状態の型
export type FilterState = {
  gender: string;
  ageGroup: string;
  keyword: string;
  reviews: ReviewWithUser[];
  totalCount: number;
  currentPage: number;
};

export async function filterReviewsWithForm(
  prevState: FilterState,
  formData: FormData
): Promise<FilterState> {
  const gender = formData.get("gender")?.toString() || "all";
  const ageGroup = formData.get("ageGroup")?.toString() || "all";
  const keyword = formData.get("keyword")?.toString() || "";
  const schoolId = formData.get("schoolId")?.toString();

  // ページ番号の処理を改善（無効な値の場合は1を使用）
  let page = 1;
  const pageValue = formData.get("page")?.toString();
  if (pageValue) {
    const parsedPage = parseInt(pageValue);
    if (!isNaN(parsedPage) && parsedPage > 0) {
      page = parsedPage;
    }
  }

  const perPage = 10; // 1ページあたり10件表示

  if (!schoolId) {
    return {
      ...prevState,
      reviews: [],
      totalCount: 0,
      currentPage: 1,
    };
  }

  // 検索条件を作成
  const whereCondition = {
    course: {
      schoolId,
    },
    ...(gender !== "all" && {
      user: {
        gender: {
          equals: gender as Gender,
        },
      },
    }),
    ...(ageGroup !== "all" && {
      user: {
        ageGroup: {
          equals: ageGroup as AgeGroup,
        },
      },
    }),
    ...(keyword && {
      OR: [
        { comment: { contains: keyword } },
        { commentCurriculum: { contains: keyword } },
        { commentInstructor: { contains: keyword } },
        { commentCost: { contains: keyword } },
        { commentSupport: { contains: keyword } },
        { commentCommunity: { contains: keyword } },
      ],
    }),
  };

  // 総件数を取得
  const totalCount = await prisma.review.count({
    where: whereCondition,
  });

  // レビューを取得（ページネーション付き）
  const reviews = await prisma.review.findMany({
    where: whereCondition,
    select: {
      id: true,
      createdAt: true,
      comment: true,
      commentCurriculum: true,
      commentInstructor: true,
      commentCost: true,
      commentSupport: true,
      commentCommunity: true,
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
    skip: (page - 1) * perPage,
    take: perPage,
  });

  return {
    gender,
    ageGroup,
    keyword,
    reviews,
    totalCount,
    currentPage: page,
  };
}
