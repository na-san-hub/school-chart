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
};

export async function filterReviewsWithForm(
  prevState: FilterState,
  formData: FormData
): Promise<FilterState> {
  const gender = formData.get("gender")?.toString() || "all";
  const ageGroup = formData.get("ageGroup")?.toString() || "all";
  const keyword = formData.get("keyword")?.toString() || "";
  const schoolId = formData.get("schoolId")?.toString();

  if (!schoolId) {
    return {
      ...prevState,
      reviews: [],
    };
  }

  const reviews = await prisma.review.findMany({
    where: {
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
    },
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
  });

  return {
    gender,
    ageGroup,
    keyword,
    reviews,
  };
}
