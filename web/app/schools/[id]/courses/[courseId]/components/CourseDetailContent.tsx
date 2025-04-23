import { formatPrice } from "@/lib/utils";
import { CourseWithSchool } from "@/types/school";

interface CourseDetailContentProps {
  course: CourseWithSchool;
}

export default function CourseDetailContent({
  course,
}: CourseDetailContentProps) {
  // 受講形式の表示名
  const deliveryMethodLabels: { [key: string]: string } = {
    ONLINE: "オンライン",
    HYBRID: "ハイブリッド",
    IN_PERSON: "対面",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-6">
      {/* セクション: コース情報 */}
      <section className="mb-4">
        <h2 className="text-base font-bold text-gray-700 mb-3">コース情報</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 価格 */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">受講料</h3>
            <p className="text-lg font-bold text-gray-800">
              {course.price ? `${formatPrice(course.price)}円` : "要問合せ"}
            </p>
          </div>

          {/* 期間 */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">期間</h3>
            <p className="text-lg font-bold text-gray-800">
              {course.duration || "要問合せ"}
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500 p-4">
          ※価格変更やキャンペーンにより、実際の情報と異なる場合がございます。
          <br />
          詳細は各スクールの公式サイトにてご確認ください。
        </p>
      </section>

      {/* 受講形式 */}
      <section className="mb-4">
        <h2 className="text-base font-bold text-gray-700 mb-3">受講形式</h2>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-gray-600 bg-gray-100 text-sm">
            {deliveryMethodLabels[course.deliveryMethod]}
          </span>
        </div>
      </section>

      {/* 特徴タグ */}
      <section className="mb-4">
        <h2 className="text-base font-bold text-gray-700 mb-3">コースの特徴</h2>
        <div className="flex flex-wrap gap-2 mb-2">
          {course.courseFeatures?.map((item) => (
            <span
              key={item.feature.id}
              className="px-3 py-1 rounded-full text-gray-600 bg-gray-100 text-sm"
            >
              {item.feature.name}
            </span>
          ))}
        </div>
      </section>

      {/* セクション: 習得スキル */}
      {course.courseSkills?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-base font-bold text-gray-700 mb-3">
            習得できるスキル
          </h2>
          <div className="flex flex-wrap gap-2">
            {course.courseSkills.map((item) => (
              <span
                key={item.skill.id}
                className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm"
              >
                {item.skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* セクション: コース概要 */}
      <section className="mb-3">
        <h2 className="text-base font-bold text-gray-700 mb-3">コース概要</h2>
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {course.description}
        </p>
      </section>
    </div>
  );
}
