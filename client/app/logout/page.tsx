"use client";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LogoutPage() {
  useEffect(() => {
    const logout = async () => {
      const supabase = createClientComponentClient();
      await supabase.auth.signOut();
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
