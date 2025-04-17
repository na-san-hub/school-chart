import { formatPrice } from "@/lib/utils";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface PickupCourseCardProps {
  course: {
    id: string;
    name: string;
    description: string;
    price: number | null;
    duration: string | null;
    locationPrefecture: string;
  };
  schoolId: string;
}

const PickupCourseCard = ({ course, schoolId }: PickupCourseCardProps) => {
  // 説明文は最大100文字に抑える
  const truncatedDescription =
    course.description.length > 100
      ? `${course.description.substring(0, 100)}...`
      : course.description;

  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden flex flex-col h-full">
      {/* コンテンツ部分 - flex-growを使用して空きスペースを埋める */}
      <div className="p-6 flex-grow">
        <h3 className="text-base font-semibold text-gray-700 mb-2">
          {course.name}
        </h3>

        <div className="mb-3 flex flex-wrap gap-3 text-sm">
          {course.duration && (
            <div className="text-gray-600">
              <span className="font-medium">期間:</span> {course.duration}
            </div>
          )}

          {course.price !== null && (
            <div className="text-gray-600">
              <span className="font-medium">受講料:</span>{" "}
              {formatPrice(course.price)}円
            </div>
          )}

          <div className="flex items-center text-gray-600">
            <MapPin size={14} className="mr-1" />
            <span>{course.locationPrefecture}</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm line-clamp-3">
          {truncatedDescription}
        </p>
      </div>

      {/* ボタン部分 - 常に下部に固定 */}
      <div className="px-5 py-3 bg-gray-50  mt-auto">
        <Link
          href={`/schools/${schoolId}/courses/${course.id}`}
          className="block"
        >
          <button className="w-full text-cyan-600 text-sm font-medium hover:underline">
            コース詳細を見る
          </button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default PickupCourseCard;
