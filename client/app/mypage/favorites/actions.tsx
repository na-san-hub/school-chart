"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

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
