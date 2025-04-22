import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // セッション取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 認証保護ルート
  const protectedRoutes = ["/mypage"];
  const currentPath = req.nextUrl.pathname;

  // 認証が必要なページで未ログインの場合はログインページへリダイレクト
  if (
    protectedRoutes.some((route) => currentPath.startsWith(route)) &&
    !session
  ) {
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set(
      "callbackUrl",
      encodeURIComponent(req.nextUrl.pathname)
    );
    return NextResponse.redirect(redirectUrl);
  }

  // ログイン済みでログインページやユーザー登録ページにアクセスした場合はマイページへリダイレクト
  if ((currentPath === "/login" || currentPath === "/register") && session) {
    return NextResponse.redirect(new URL("/mypage", req.url));
  }

  return res;
}

// ミドルウェアを適用するパス
export const config = {
  matcher: [
    /*
     * マッチするパス:
     * - /mypage, /mypage/favorites, etc.
     * - /login
     * - /register
     */
    "/mypage/:path*",
    "/login",
    "/register",
  ],
};
