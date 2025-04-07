import { getSchoolWithCourses } from "@/lib/school";
import { getAllReviewsForSchool } from "@/lib/reviews";
import ReviewsPageClient from "./client";

export const dynamic = "force-dynamic";

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // params を await して id を取得
  const resolvedParams = await params;
  const schoolId = resolvedParams.id;

  const [school, initialReviews] = await Promise.all([
    getSchoolWithCourses(schoolId),
    getAllReviewsForSchool(schoolId),
  ]);

  return (
    <ReviewsPageClient
      schoolId={schoolId}
      school={school}
      initialReviews={initialReviews}
    />
  );
}
