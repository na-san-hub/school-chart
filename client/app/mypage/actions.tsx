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
    // Supabaseクライアントを作成して認証ユーザーのIDを取得
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      // 未認証の場合は空の結果を返す
      return { reviews: [], totalCount: 0, userId: null };
    }

    // 認証されたユーザーのauthIdを使って、関連するuserレコードを検索
    const user = await prisma.user.findUnique({
      where: { authId: session.user.id },
      select: { id: true },
    });

    if (!user) {
      return { reviews: [], totalCount: 0, userId: null };
    }

    // ユーザーIDに紐づくレビュー数を取得
    const totalCount = await prisma.review.count({
      where: { userId: user.id },
    });

    // ユーザーIDに紐づくレビュー一覧を取得
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

    // 型変換して返す
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
 * お気に入り追加済みか確認
 */
export async function checkIsFavorite(schoolId: string): Promise<boolean> {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) return false;

  const user = await prisma.user.findUnique({
    where: { authId: session.user.id },
    select: { id: true },
  });

  if (!user) return false;

  const favorite = await prisma.favoriteSchool.findUnique({
    where: {
      userId_schoolId: {
        userId: user.id,
        schoolId,
      },
    },
  });

  return !!favorite;
}

/**
 * お気に入りスクールを追加する
 */
export async function addFavoriteSchool(schoolId: string): Promise<void> {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      console.log("未ログインユーザーです");
      return;
    }

    const userData = await prisma.user.findUnique({
      where: { authId: session.user.id },
      select: { id: true },
    });

    if (!userData) {
      console.log("ユーザーが見つかりません");
      return;
    }

    await prisma.favoriteSchool.upsert({
      where: {
        userId_schoolId: {
          userId: userData.id,
          schoolId,
        },
      },
      update: {},
      create: {
        userId: userData.id,
        schoolId,
      },
    });

    console.log("お気に入り追加完了");
  } catch (error) {
    console.error("お気に入り追加エラー:", error);
  }
}
