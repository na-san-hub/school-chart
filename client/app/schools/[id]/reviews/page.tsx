import { getSchoolWithCourses } from "@/lib/school";
import { prisma } from "@/lib/prisma";
import { ReviewWithUser, Gender, AgeGroup } from "@/types/review";
import ReviewsPageClient from "./client";
import SchoolSidebar from "../components/sidebar/DetailSidebar";

export const dynamic = "force-dynamic";

interface ReviewsPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    page?: string;
    gender?: string;
    ageGroup?: string;
    keyword?: string;
  }>;
}

export default async function ReviewsPage({
  params,
  searchParams,
}: ReviewsPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const schoolId = resolvedParams.id;
  const page = parseInt(resolvedSearchParams.page || "1");
  const gender = resolvedSearchParams.gender;
  const ageGroup = resolvedSearchParams.ageGroup;
  const keyword = resolvedSearchParams.keyword || "";
  const perPage = 10;

  // サーバー側でクエリを構築
  const whereCondition = {
    course: {
      schoolId,
    },
    ...(gender && {
      user: {
        gender: {
          equals: gender as Gender,
        },
      },
    }),
    ...(ageGroup && {
      user: {
        ageGroup: {
          equals: ageGroup as AgeGroup,
        },
      },
    }),
    ...(keyword && {
      OR: [
        { comment: { contains: keyword } },
        { commentCurriculum: { contains: keyword } },
        { commentInstructor: { contains: keyword } },
        { commentCost: { contains: keyword } },
        { commentSupport: { contains: keyword } },
        { commentCommunity: { contains: keyword } },
      ],
    }),
  };

  // 総件数を取得
  const totalCount = await prisma.review.count({
    where: whereCondition,
  });

  // レビューを取得（ページネーション付き）
  const reviews = await prisma.review.findMany({
    where: whereCondition,
    select: {
      id: true,
      createdAt: true,
      comment: true,
      commentCurriculum: true,
      commentInstructor: true,
      commentCost: true,
      commentSupport: true,
      commentCommunity: true,
      ratingCurriculum: true,
      ratingInstructor: true,
      ratingCost: true,
      ratingSupport: true,
      ratingCommunity: true,
      user: {
        select: {
          gender: true,
          ageGroup: true,
        },
      },
      course: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  const school = await getSchoolWithCourses(schoolId);

  return (
    <div className="border-t border-t-gray-400 w-full">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-gray-700 mb-5">口コミ一覧</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/*  クライアントコンポーネント（左） */}
          <ReviewsPageClient
            school={school}
            reviews={reviews as ReviewWithUser[]}
            totalCount={totalCount}
          />
          {/*  サーバーコンポーネント（右） */}
          <div className="w-full md:w-1/4">
            <SchoolSidebar school={school} />
          </div>
        </div>
      </div>
    </div>
  );
}
