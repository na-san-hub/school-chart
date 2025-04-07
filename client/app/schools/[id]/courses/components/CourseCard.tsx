import { formatPrice } from "@/lib/utils";
import { CourseAllData } from "@/types/school";
import { MapPin } from "lucide-react";

interface CourseCardProps {
  course: CourseAllData;
}

const CourseCard = ({ course }: CourseCardProps) => {
  // 受講形式の表示名
  const deliveryMethodLabels: { [key: string]: string } = {
    ONLINE: "オンライン",
    HYBRID: "ハイブリッド",
    IN_PERSON: "対面",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:bg-gray-50 transition-shadow">
      <div className="p-6">
        {/* ヘッダー部分 */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-700">
            {course.name || "コース名なし"}
          </h3>
        </div>

        {/* 受講形式と場所 */}
        <div className="flex items-center gap-4 mb-3 text-sm">
          <div className="px-2 py-1 rounded-md text-gray-600 border border-gray-300">
            {deliveryMethodLabels[course.deliveryMethod]}
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin size={14} className="mr-1" />
            <span>{course.locationPrefecture}</span>
          </div>
        </div>

        {/* 価格と期間 */}
        <div className="flex flex-wrap gap-4 mb-3 text-sm">
          {course.price !== null && course.price !== undefined && (
            <div className="text-gray-700">
              <span className="font-medium">受講料:</span>{" "}
              {formatPrice(course.price)}円
            </div>
          )}

          {course.duration && (
            <div className="text-gray-700">
              <span className="font-medium">期間:</span> {course.duration}
            </div>
          )}
        </div>

        {/* カテゴリー */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-2 text-sm">
            {course.courseCategories?.map((cat, index) => (
              <button
                key={index}
                className="px-2 py-1 rounded-md text-gray-500 border border-gray-300 cursor-default"
              >
                {cat.category.name}
              </button>
            ))}
          </div>
        </div>

        {/* スキル */}
        {course.courseSkills?.length > 0 && (
          <div className="mb-3">
            <div className="text-sm font-medium text-gray-600 mb-1">
              習得スキル:
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {course.courseSkills.map((skillItem, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-full text-gray-500 bg-gray-100"
                >
                  {skillItem.skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 特徴 */}
        {course.courseFeatures?.length > 0 && (
          <div className="mb-3">
            <div className="text-sm font-medium text-gray-600 mb-1">特徴:</div>
            <div className="flex flex-wrap gap-2 text-xs">
              {course.courseFeatures.map((featureItem, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-full text-cyan-600 bg-cyan-50"
                >
                  {featureItem.feature.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ボタン部分 */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <button className="w-full text-cyan-600 text-sm font-medium hover:underline">
          詳細を見る
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
