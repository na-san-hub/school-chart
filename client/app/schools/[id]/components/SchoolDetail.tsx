import { SchoolWithCourses } from "@/types/school";

export default function SchoolDetail({
  school,
}: {
  school: SchoolWithCourses;
}) {
  // 受講形式を一意に取得（`courses` が存在しない可能性に対応）
  const uniqueDeliveryMethods = school.courses
    ? Array.from(new Set(school.courses.map((course) => course.deliveryMethod)))
    : [];

  return (
    <div className="py-3 px-1 mr-5 max-w-[470px] w-full">
      <h1 className="py-2 text-base font-bold text-gray-700 border-b border-b-gray-300">
        スクール情報
      </h1>

      {/* 公式サイトURL */}
      <div className="items-center py-2 flex gap-2 border-b border-b-gray-300">
        <h2 className="min-w-20 text-sm font-semibold text-gray-500">
          公式サイト
        </h2>
        <p>
          <a
            href={school.website ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 underline text-sm hover:opacity-75"
          >
            {school.website}
          </a>
        </p>
      </div>

      {/* 受講形式 */}
      <div className="items-center py-2 flex gap-2 border-b border-b-gray-300 min-h-[60px]">
        <h2 className="min-w-20 text-sm font-semibold text-gray-500">
          受講形式
        </h2>
        <div className="flex flex-wrap gap-2 text-sm">
          {uniqueDeliveryMethods.length > 0 ? (
            uniqueDeliveryMethods.map((method, index) => (
              <button
                key={index}
                className="px-2 py-1 rounded-md text-gray-500 border border-gray-500 cursor-default"
              >
                {method}
              </button>
            ))
          ) : (
            <p className="text-gray-500">受講形式情報なし</p>
          )}
        </div>
      </div>

      {/* 特徴一覧 */}
      <div className="items-center py-2 flex gap-2 border-b border-b-gray-300 min-h-[80px]">
        <h2 className="min-w-20 text-sm font-semibold text-gray-500">特徴</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          {school.features?.length ? (
            school.features.map((feature, index) => (
              <button
                key={index}
                className="px-2 py-1 rounded-md text-gray-500 border border-gray-500 cursor-default"
              >
                {feature}
              </button>
            ))
          ) : (
            <p className="text-gray-500">特徴情報なし</p>
          )}
        </div>
      </div>

      {/* カテゴリー一覧 */}
      <div className="items-center py-2 flex gap-2 border-b border-b-gray-300 min-h-[80px]">
        <h2 className="min-w-20 text-sm font-semibold text-gray-500">
          学べる <span className="block">ジャンル</span>
        </h2>
        <div className="flex flex-wrap gap-2 text-sm">
          {school.categories?.length ? (
            school.categories.map((category, index) => (
              <button
                key={index}
                className="px-2 py-1 rounded-md text-gray-500 border border-gray-500 cursor-default"
              >
                {category}
              </button>
            ))
          ) : (
            <p className="text-gray-500">スキル情報なし</p>
          )}
        </div>
      </div>
    </div>
  );
}
