"use client";

import { useSearchParams, useRouter } from "next/navigation";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") || "1");

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex justify-center gap-1 my-8">
      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        return (
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
        );
      })}
    </div>
  );
};

export default Pagination;
