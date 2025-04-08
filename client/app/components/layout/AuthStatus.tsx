"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { UserCircle } from "lucide-react";

const AuthStatus = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // ローディング中は何も表示しない
  }

  if (user) {
    // ログイン済みの場合
    return (
      <>
        <div className="flex items-center text-gray-500">
          <UserCircle className="w-6 h-6 mr-1" />
          <span>{user.email?.split("@")[0] || "ユーザー"}さん</span>
        </div>
      </>
    );
  }

  // 未ログインの場合
  return (
    <>
      <Link href="/register" className="text-gray-500 hover:text-gray-700">
        ユーザー登録
      </Link>
      <Link href="/login" className="text-gray-500 hover:text-gray-700">
        ログイン
      </Link>
    </>
  );
};

export default AuthStatus;
