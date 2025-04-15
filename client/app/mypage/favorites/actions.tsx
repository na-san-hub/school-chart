"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export const getFavoriteSchools = async () => {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      console.log("認証情報がありません");
      return [];
    }

    const userData = await prisma.user.findUnique({
      where: { authId: session.user.id },
      select: { id: true },
    });

    if (!userData) {
      console.log("ユーザーデータが見つかりません");
      return [];
    }

    console.log("ユーザーID:", userData.id);

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
  } catch (error) {
    console.error("お気に入り取得エラー:", error);
    return [];
  }
};

/**
 * お気に入りスクールを削除する
 */
export async function removeFavoriteSchool(formData: FormData): Promise<void> {
  "use server";
  const schoolId = formData.get("schoolId") as string;

  if (!schoolId) {
    return;
  }

  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return;
    }

    const userData = await prisma.user.findUnique({
      where: { authId: session.user.id },
      select: { id: true },
    });

    if (!userData) {
      return;
    }

    // お気に入りを削除
    await prisma.favoriteSchool.delete({
      where: {
        userId_schoolId: {
          userId: userData.id,
          schoolId,
        },
      },
    });

    redirect("/mypage/favorites?reload=1");
  } catch (error) {
    console.error("お気に入り削除エラー:", error);
    return;
  }
}
