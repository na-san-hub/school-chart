"use server";

import { prisma } from "@/lib/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Gender, AgeGroup } from "@prisma/client";

// 認証イベント処理のサーバーアクション
// Supabaseからの新規ユーザー情報をDBに保存する
export async function handleAuthEvent(formData: FormData) {
  const eventType = formData.get("type") as string;
  const authId = formData.get("authId") as string;

  if (!eventType || !authId) {
    return { success: false, error: "必要なデータがありません" };
  }

  try {
    if (eventType === "SIGNED_UP") {
      // フォームから直接ユーザー情報を取得
      const name = (formData.get("name") as string) || "ユーザー";
      const gender = (formData.get("gender") as Gender) || Gender.OTHER;
      const ageGroup =
        (formData.get("ageGroup") as AgeGroup) || AgeGroup.TWENTIES;

      // すでに存在するか確認
      const existingUser = await prisma.user.findUnique({
        where: { authId },
      });

      if (existingUser) {
        return { success: true }; // すでに存在する場合は成功とみなす
      }

      // データベースにユーザー情報を保存
      await prisma.user.create({
        data: {
          authId,
          name,
          gender,
          ageGroup,
        },
      });

      return { success: true };
    }

    return { success: true };
  } catch (error) {
    console.error("認証イベント処理エラー:", error);
    return { success: false, error: "ユーザー情報の保存に失敗しました" };
  }
}

// プロフィール更新用のサーバーアクション
export async function updateUserProfile(formData: FormData) {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });

    // セッション取得
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return { success: false, error: "認証セッションがありません" };
    }

    const name = formData.get("name") as string;
    const gender = formData.get("gender") as Gender;
    const ageGroup = formData.get("ageGroup") as AgeGroup;

    if (!name || !gender || !ageGroup) {
      return { success: false, error: "必須フィールドがありません" };
    }

    // ユーザー情報をデータベースで更新
    await prisma.user.update({
      where: { authId: session.user.id },
      data: { name, gender, ageGroup },
    });

    // Supabaseのメタデータも更新
    await supabase.auth.updateUser({
      data: { name, gender, ageGroup },
    });

    return { success: true };
  } catch (error) {
    console.error("プロフィール更新エラー:", error);
    return { success: false, error: "プロフィールの更新に失敗しました" };
  }
}

// ユーザーアカウント削除（DBからの削除のみ）
export async function deleteUserAccount() {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });

    // セッション取得
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return { success: false, error: "認証セッションがありません" };
    }

    // データベースからユーザー情報を削除（エラーハンドリング付き）
    try {
      await prisma.user.delete({
        where: { authId: session.user.id },
      });
    } catch (error) {
      console.error("ユーザー削除エラー:", error);
      return { success: false, error: "ユーザー情報の削除に失敗しました" };
    }

    return { success: true };
  } catch (error) {
    console.error("アカウント削除エラー:", error);
    return { success: false, error: "アカウントの削除に失敗しました" };
  }
}
