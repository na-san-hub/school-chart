// client/app/schools/[id]/components/sidebar/RelatedSchools.tsx
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/schoolData/StarRating";
import { getRelatedSchools } from "@/lib/school";

interface RelatedSchoolsProps {
  schoolId: string;
  categories: string[];
}

export default async function RelatedSchools({
  schoolId,
  categories,
}: RelatedSchoolsProps) {
  // 関連スクールを取得
  const relatedSchools = await getRelatedSchools(schoolId, categories);

  // 関連スクールがない場合は何も表示しない
  if (relatedSchools.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h2 className="text-sm font-bold text-gray-700 border-b border-gray-200 pb-2 mb-3">
        関連スクール
      </h2>
      <div className="space-y-3">
        {relatedSchools.map((school) => (
          <Link
            href={`/schools/${school.id}`}
            key={school.id}
            className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded-md"
          >
            <div className="w-10 h-10 relative flex-shrink-0">
              <Image
                src={school.logo || "/defaultLogo.png"}
                alt={school.name}
                width={40}
                height={40}
                className="object-cover rounded-md"
              />
            </div>
            <div className="overflow-hidden">
              <h3 className="text-sm font-medium text-gray-700 truncate">
                {school.name}
              </h3>
              <div className="flex items-center">
                <StarRating rating={school.rating} size="xs" />
                <span className="ml-1 text-xs text-gray-500">
                  {school.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
