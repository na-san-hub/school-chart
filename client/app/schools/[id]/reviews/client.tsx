"use client";

import { getSchoolWithCourses } from "@/lib/school";
import { ReviewWithUser } from "@/types/review";
import ReviewFilterForm from "./components/ReviewFilter";
import ReviewList from "./components/ReviewList";
import SchoolSidebar from "../components/SchoolSidebar";

export default function ReviewsPageClient({
  school,
  reviews,
  totalCount,
}: {
  school: Awaited<ReturnType<typeof getSchoolWithCourses>>;
  reviews: ReviewWithUser[];
  totalCount: number;
}) {
  return (
    <div className="border-t border-t-gray-400 w-full">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-gray-700 mb-5">口コミ一覧</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/4">
            <ReviewFilterForm />
            <ReviewList reviews={reviews} totalCount={totalCount} />
          </div>
          <div className="w-full md:w-1/4">
            <SchoolSidebar school={school} />
          </div>
        </div>
      </div>
    </div>
  );
}
