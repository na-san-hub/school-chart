import { getSchoolWithCourses } from "@/lib/school";
import { getAllCoursesForList } from "@/lib/courses";
import CourseList from "./components/CourseList";
import SchoolSidebar from "../components/SchoolSidebar";

export const dynamic = "force-dynamic";

interface CoursesPageProps {
  params: Promise<{ id: string }>;
}

export default async function CoursesPage({ params }: CoursesPageProps) {
  // パラメータを解決
  const resolvedParams = await params;
  const schoolId = resolvedParams.id;

  // スクール情報と全コースデータを並行して取得
  const [school, courses] = await Promise.all([
    getSchoolWithCourses(schoolId),
    getAllCoursesForList(schoolId),
  ]);

  return (
    <div className="border-t border-t-gray-400 w-full">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-gray-700 mb-5">コース一覧</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* 左側: コースリスト */}
          <div className="w-full md:w-3/4">
            <CourseList courses={courses} />
          </div>

          {/* 右側: スクール情報と操作ボタン */}
          <div className="w-full md:w-1/4">
            <SchoolSidebar school={school} />
          </div>
        </div>
      </div>
    </div>
  );
}
