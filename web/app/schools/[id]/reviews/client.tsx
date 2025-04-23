"use client";

import { getSchoolWithCourses } from "@/lib/school";
import { ReviewWithUser } from "@/types/review";
import ReviewFilterForm from "./components/ReviewFilter";
import ReviewList from "./components/ReviewList";

export default function ReviewsPageClient({
  reviews,
  totalCount,
}: {
  school: Awaited<ReturnType<typeof getSchoolWithCourses>>;
  reviews: ReviewWithUser[];
  totalCount: number;
}) {
  return (
    <div className="w-full md:w-3/4">
      <ReviewFilterForm />
      <ReviewList reviews={reviews} totalCount={totalCount} />
    </div>
  );
}
