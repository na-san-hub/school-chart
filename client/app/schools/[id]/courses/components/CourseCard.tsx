import { formatPrice } from "@/lib/utils";
import { CourseListData } from "@/types/school";
import { MapPin } from "lucide-react";
import { Span } from "next/dist/trace";
import Link from "next/link";

interface CourseCardProps {
  course: CourseListData;
}

const CourseCard = ({ course }: CourseCardProps) => {
  // 受講形式の表示名
  const deliveryMethodLabels: { [key: string]: string } = {
    ONLINE: "オンライン",
    HYBRID: "ハイブリッド",
    IN_PERSON: "対面",
  };

  // 説明文は最大100文字に抑える
  const truncatedDescription =
    course.description.length > 100
      ? `${course.description.substring(0, 100)}...`
      : course.description;

  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden flex flex-col h-full">
      <div className="p-5 flex-grow">
        {/* カテゴリー */}
        {course.courseCategories?.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2 text-sm">
              {course.courseCategories.map((cat, index) => (
                <button
                  key={index}
                  className="px-2 py-1 rounded-md text-gray-500 border border-gray-300 cursor-default"
                >
                  {cat.category.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <h3 className="text-base font-semibold text-gray-700 mb-2">
          {course.name || "コース名なし"}
        </h3>

        <div className="mb-3 flex flex-wrap gap-3 text-sm">
          {/* 受講形式 */}
          <div className="py-1 text-gray-700">
            受講形式:
            {deliveryMethodLabels[course.deliveryMethod]}
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin size={14} className="mr-1" />
            <span>{course.locationPrefecture}</span>
          </div>
        </div>
        {/* 説明 */}
        <p className="text-gray-500 text-sm line-clamp-3">
          {truncatedDescription}
        </p>
        {/* 期間と受講料 */}
        <div className="my-3 flex flex-wrap gap-3 text-sm">
          {course.duration && (
            <div className="text-gray-600">
              <span className="font-medium">期間:</span> {course.duration}
            </div>
          )}

          {course.price !== null && course.price !== undefined && (
            <div className="text-gray-600">
              <span className="font-medium">受講料:</span>{" "}
              {formatPrice(course.price)}円
            </div>
          )}
        </div>
      </div>

      {/* ボタン部分 */}
      <div className="px-5 py-3 bg-gray-50 mt-auto">
        <Link href={`/schools/${course.schoolId}/courses/${course.id}`}>
          <button className="w-full text-cyan-600 text-sm font-medium hover:underline">
            詳細を見る
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
