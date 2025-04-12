"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function LogoutPage() {
  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      // ブラウザのリダイレクトを使ってトップページへ移動（フルリロード）
      window.location.href = "/";
    };
    logout();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <p className="text-xl font-semibold text-gray-700">ログアウト中...</p>
    </div>
  );
}
