"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { ReviewFormInput } from "@/types/review";

/**
 * レビュー投稿用のサーバーアクション
 */
export async function submitReview(formData: ReviewFormInput) {
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
      return { success: false, error: "認証が必要です" };
    }

    // ユーザーのDBレコードを取得
    const user = await prisma.user.findUnique({
      where: { authId: session.user.id },
      select: { id: true },
    });

    if (!user) {
      return { success: false, error: "ユーザー情報が見つかりません" };
    }

    // 必須フィールドの検証
    const requiredFields = [
      "courseId",
      "ratingCurriculum",
      "commentCurriculum",
      "ratingInstructor",
      "commentInstructor",
      "ratingCost",
      "commentCost",
      "ratingSupport",
      "commentSupport",
      "ratingCommunity",
      "commentCommunity",
    ];

    const missingFields = requiredFields.filter((field) => {
      const value = formData[field as keyof typeof formData];
      return value === undefined || value === null || value === "";
    });

    if (missingFields.length > 0) {
      return {
        success: false,
        error: `必須フィールドが不足しています: ${missingFields.join(", ")}`,
      };
    }

    // コース情報の取得または作成
    let courseId = formData.courseId;
    let schoolId: string;

    if (formData.courseId === "other") {
      // 「その他」が選択された場合は新しいコースを作成
      const school = await prisma.school.findFirst({
        select: { id: true },
      });

      if (!school) {
        return { success: false, error: "スクール情報が見つかりません" };
      }

      schoolId = school.id;

      // 新しいコースを作成
      const newCourse = await prisma.course.create({
        data: {
          schoolId: schoolId,
          name: "その他",
          description: "その他のコース",
          deliveryMethod: "ONLINE", // デフォルト値
          locationPrefecture: "リモート", // デフォルト値
        },
      });

      courseId = newCourse.id;
    } else {
      // 既存のコースの場合はスクールIDを取得
      const course = await prisma.course.findUnique({
        where: { id: formData.courseId },
        select: { schoolId: true },
      });

      if (!course) {
        return { success: false, error: "コースが見つかりません" };
      }

      schoolId = course.schoolId;
    }

    // レビューを保存するデータを作成
    const reviewData = {
      userId: user.id,
      courseId: courseId,
      ratingCurriculum: Number(formData.ratingCurriculum),
      commentCurriculum: formData.commentCurriculum,
      ratingInstructor: Number(formData.ratingInstructor),
      commentInstructor: formData.commentInstructor,
      ratingCost: Number(formData.ratingCost),
      commentCost: formData.commentCost,
      ratingSupport: Number(formData.ratingSupport),
      commentSupport: formData.commentSupport,
      ratingCommunity: Number(formData.ratingCommunity),
      commentCommunity: formData.commentCommunity,
      comment: formData.comment || null,
      isApproved: false, // 初期値はfalse
    };

    // レビューの重複チェック
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    });

    if (existingReview) {
      return {
        success: false,
        error: "すでにこのコースのレビューを投稿しています",
      };
    }

    // レビューを保存
    const review = await prisma.review.create({
      data: reviewData,
    });

    // スクールの全レビューを取得して平均評価を計算
    const allReviews = await prisma.review.findMany({
      where: {
        course: {
          schoolId: schoolId,
        },
        isApproved: true, // 承認済みのレビューのみ評価に反映
      },
      select: {
        ratingCurriculum: true,
        ratingInstructor: true,
        ratingCost: true,
        ratingSupport: true,
        ratingCommunity: true,
      },
    });

    if (allReviews.length > 0) {
      const avgRating =
        allReviews.reduce((sum, r) => {
          return (
            sum +
            (r.ratingCurriculum +
              r.ratingInstructor +
              r.ratingCost +
              r.ratingSupport +
              r.ratingCommunity) /
              5
          );
        }, 0) / allReviews.length;

      // スクールの評価を更新
      await prisma.school.update({
        where: { id: schoolId },
        data: { rating: avgRating },
      });
    }

    // キャッシュの再検証
    revalidatePath(`/schools/${schoolId}`);
    revalidatePath(`/schools/${schoolId}/reviews`);

    return { success: true, reviewId: review.id };
  } catch (error) {
    console.error("レビュー投稿エラー:", error);
    return {
      success: false,
      error: "レビューの投稿に失敗しました",
    };
  }
}
