import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 環境変数から認証情報を取得（.env に設定する）
const USERNAME = process.env.BASIC_AUTH_USER || "admin";
const PASSWORD = process.env.BASIC_AUTH_PASS || "password";

// Basic 認証の処理
export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  // 認証情報がない場合、401 を返す
  if (!authHeader) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
    });
  }

  // `Basic ユーザー名:パスワード` の形式で認証情報を取得
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = atob(base64Credentials).split(":");

  const username = credentials[0];
  const password = credentials[1];

  // ユーザー名とパスワードのチェック
  if (username !== USERNAME || password !== PASSWORD) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
    });
  }

  // 認証成功ならリクエストを通過
  return NextResponse.next();
}

// すべてのページで適用
export const config = {
  matcher: ["/(.*)"], // すべてのページを認証対象にする
};
