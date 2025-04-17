import { SchoolWithCourses } from "@/types/school";
import SchoolActionButtons from "./SchoolActionButtons";

interface ReviewSidebarSectionProps {
  school: SchoolWithCourses;
}

const SchoolSidebar = async ({ school }: ReviewSidebarSectionProps) => {
  const uniqueDeliveryMethods = school.courses
    ? Array.from(new Set(school.courses.map((course) => course.deliveryMethod)))
    : [];

  const deliveryMethodLabels: { [key: string]: string } = {
    ONLINE: "オンライン",
    HYBRID: "ハイブリッド",
    IN_PERSON: "対面",
  };

  return (
    <div className="space-y-4">
      {/* アクションボタン */}
      <SchoolActionButtons schoolId={school.id} />

      {/* スクール情報 */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-sm font-bold text-gray-700 border-b border-gray-200 pb-2 mb-3">
          スクール情報
        </h2>

        {/* 公式サイトURL */}
        <div className="py-2 flex gap-2 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-500 w-24">
            公式サイト
          </h3>
          <p className="text-xs">
            {school.website ? (
              <a
                href={school.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 underline hover:opacity-75"
              >
                {school.website}
              </a>
            ) : (
              <span className="text-gray-400">情報なし</span>
            )}
          </p>
        </div>

        {/* 受講形式 */}
        <div className="py-2 flex gap-2 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-500 w-24">受講形式</h3>
          <div className="flex flex-wrap gap-1">
            {uniqueDeliveryMethods.length > 0 ? (
              uniqueDeliveryMethods.map((method, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs rounded-md text-gray-500 border border-gray-300"
                >
                  {deliveryMethodLabels[method] ?? method}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">情報なし</span>
            )}
          </div>
        </div>

        {/* 特徴一覧 */}
        <div className="py-2 flex gap-2 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-500 w-24">特徴</h3>
          <div className="flex flex-wrap gap-1">
            {school.features?.length ? (
              school.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs rounded-md text-gray-500 border border-gray-300"
                >
                  {feature}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">情報なし</span>
            )}
          </div>
        </div>

        {/* カテゴリー一覧 */}
        <div className="py-2 flex gap-2">
          <h3 className="text-xs font-semibold text-gray-500 w-24">
            学べる<span className="block">ジャンル</span>
          </h3>
          <div className="flex flex-wrap gap-1">
            {school.categories?.length ? (
              school.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs rounded-md text-gray-500 border border-gray-300"
                >
                  {category}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">情報なし</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolSidebar;
