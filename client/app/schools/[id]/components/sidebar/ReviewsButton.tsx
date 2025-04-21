"use client";

import { PenSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext/useAuth";

interface ReviewsButtonProps {
  schoolId: string;
}

const ReviewsButton = ({ schoolId }: ReviewsButtonProps) => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const handleClick = () => {
    if (!user && !isLoading) {
      // 未ログインの場合はログインページへリダイレクト
      const currentPath = window.location.pathname;
      router.push(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
    } else {
      // ログイン済みの場合はレビュー投稿ページへ
      router.push(`/schools/${schoolId}/reviews/post`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full py-3 bg-cyan-600 border border-cyan-600 text-white text-sm rounded-md flex items-center justify-center hover:opacity-90"
    >
      <PenSquare className="w-4 h-4 mr-2" />
      口コミを投稿する
    </button>
  );
};

export default ReviewsButton;
