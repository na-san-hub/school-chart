import { formatPrice } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface PickupCourseCardProps {
  course: {
    id: string;
    name: string;
    description: string;
    price: number | null;
    duration: string | null;
    locationPrefecture: string;
  };
}

const PickupCourseCard = ({ course }: PickupCourseCardProps) => {
  // 説明文は最大100文字に抑える
  const truncatedDescription =
    course.description.length > 100
      ? `${course.description.substring(0, 100)}...`
      : course.description;

  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden hover:bg-gray-50 hover:opacity-75 transition-shadow">
      <div className="p-5">
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

      <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
        <button className="w-full text-cyan-600 text-sm font-medium hover:underline">
          コース詳細を見る
        </button>
      </div>
    </div>
  );
};

export default PickupCourseCard;
