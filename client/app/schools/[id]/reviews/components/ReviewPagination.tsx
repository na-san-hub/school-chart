"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface ReviewPaginationProps {
  totalCount: number;
  perPage: number;
}

const ReviewPagination = ({ totalCount, perPage }: ReviewPaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") || "1");
  const totalPages = Math.ceil(totalCount / perPage);

  // 表示するページボタンの数を制限（5ページ分）
  const getPageNumbers = useCallback(() => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // 全ページ数が表示上限以下なら全ページを表示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // ページ数が多い場合は、現在のページを中心に表示
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = startPage + maxPagesToShow - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());

      // 現在のURLを取得し、クエリパラメータを更新
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-1 my-8">
      {/* ページ番号ボタン */}
      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          className={`px-3 py-1 border rounded-sm ${
            pageNum === currentPage
              ? "bg-cyan-600 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
};

export default ReviewPagination;
