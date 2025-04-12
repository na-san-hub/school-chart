"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ExtendedReviewWithUser } from "@/types/review";

/**
 * 認証済みユーザーのレビュー一覧を取得する
 */
export async function getUserReviews(): Promise<{
  reviews: ExtendedReviewWithUser[];
  totalCount: number;
  userId: string | null;
}> {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return { reviews: [], totalCount: 0, userId: null };
    }

    const user = await prisma.user.findUnique({
      where: { authId: session.user.id },
      select: { id: true },
    });

    if (!user) {
      return { reviews: [], totalCount: 0, userId: null };
    }

    const totalCount = await prisma.review.count({
      where: { userId: user.id },
    });

    const reviews = await prisma.review.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        createdAt: true,
        ratingCurriculum: true,
        ratingInstructor: true,
        ratingCost: true,
        ratingSupport: true,
        ratingCommunity: true,
        comment: true,
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
            school: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      reviews: reviews as unknown as ExtendedReviewWithUser[],
      totalCount,
      userId: user.id,
    };
  } catch (error) {
    console.error("ユーザーレビュー取得エラー:", error);
    return { reviews: [], totalCount: 0, userId: null };
  }
}

/**
 * お気に入りスクールを取得する
 */
export const getFavoriteSchools = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const userData = await prisma.user.findUnique({
    where: { authId: user.id },
    select: { id: true },
  });

  if (!userData) return [];

  const favorites = await prisma.favoriteSchool.findMany({
    where: { userId: userData.id },
    include: {
      school: {
        select: {
          id: true,
          name: true,
          logo: true,
          description: true,
          rating: true,
        },
      },
    },
  });

  return favorites
    .filter((fav) => fav.school !== null)
    .map((fav) => ({
      id: fav.school.id,
      name: fav.school.name,
      logo: fav.school.logo,
      description: fav.school.description,
      rating: fav.school.rating,
    }));
};

// export const getFavoriteSchools = async () => {
//   const supabase = createServerComponentClient({ cookies });

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   console.log("✅ Supabase user:", user); // 🔍 ここで auth ID を確認

//   if (!user) return [];

//   const userData = await prisma.user.findUnique({
//     where: { authId: user.id },
//     select: { id: true },
//   });

//   console.log("✅ Matched user in DB:", userData); // 🔍 内部ユーザーIDが取得できているか

//   if (!userData) return [];

//   const favorites = await prisma.favoriteSchool.findMany({
//     where: { userId: userData.id },
//     include: {
//       school: {
//         select: {
//           id: true,
//           name: true,
//           logo: true,
//           description: true,
//           rating: true,
//         },
//       },
//     },
//   });

//   console.log("✅ Favorites from DB:", favorites); // 🔍 school が null になっていないか見る！

//   const mapped = favorites
//     .filter((fav) => fav.school !== null)
//     .map((fav) => ({
//       id: fav.school.id,
//       name: fav.school.name,
//       logo: fav.school.logo,
//       description: fav.school.description,
//       rating: fav.school.rating,
//     }));

//   console.log("✅ Final mapped favorites to return:", mapped);

//   return mapped;
// };
