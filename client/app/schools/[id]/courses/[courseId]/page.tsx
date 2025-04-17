import { notFound } from "next/navigation";
import { getCourseDetails } from "@/lib/courses";
import { getSchoolWithCourses } from "@/lib/school";
import SchoolSidebar from "../../components/SchoolSidebar";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CourseDetail from "./components/CourseDetail";

type PageProps = {
  params: {
    id: string;
    courseId: string;
  };
};

export default async function CourseDetailPage({ params }: PageProps) {
  try {
    const schoolId = params.id;

    // コース詳細情報を取得
    const course = await getCourseDetails(params.courseId, schoolId);

    // スクール情報を取得
    const school = await getSchoolWithCourses(schoolId);

    if (!course) {
      return notFound();
    }

    return (
      <div className="border-t border-t-gray-400 w-full">
        <div className="max-w-5xl mx-auto px-4 py-6">
          {/* 戻るボタン */}
          <div className="mb-4">
            <Link
              href={`/schools/${schoolId}/courses`}
              className="inline-flex text-base items-center text-gray-700 hover:text-gray-500"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              コース一覧に戻る
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-3/4">
              <CourseDetail course={course} />
            </div>

            {/* スクールサイドバー */}
            <div className="w-full md:w-1/4">
              <SchoolSidebar school={school} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("ページ表示エラー:", error);
    return notFound();
  }
}
