import { getSchoolWithCourses } from "@/lib/school";
import { getAllReviewsForSchool } from "@/lib/reviews";
import ReviewsPageClient from "./client";

export const dynamic = "force-dynamic";

interface ReviewsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  // params を await してから利用する
  const resolvedParams = await params;
  const schoolId = resolvedParams.id;

  const [school, initialReviews] = await Promise.all([
    getSchoolWithCourses(schoolId),
    getAllReviewsForSchool(schoolId), // ← 最初はすべてのレビューを取得
  ]);

  return (
    <ReviewsPageClient
      schoolId={schoolId}
      school={school}
      initialReviews={initialReviews}
    />
  );
}
