import Image from "next/image";
import { FavoriteSchoolItem } from "@/types/mypage";
import StarRating from "@/components/schoolData/StarRating";

export default function FavoriteSchoolCard({
  school,
}: {
  school: FavoriteSchoolItem;
}) {
  return (
    <div className="flex max-w-4xl items-center space-x-6 px-6 py-6 text-gray-700 hover:opacity-80 border rounded-md bg-white">
      {/* ロゴ */}
      <div className="flex items-center justify-center w-24 h-24 rounded-md overflow-hidden">
        <Image
          src={school.logo || "/defaultLogo.png"}
          alt={school.name}
          width={96}
          height={96}
          className="object-cover"
        />
      </div>

      {/* 情報 */}
      <div className="flex flex-col w-full">
        <h2 className="text-lg font-bold text-gray-800">{school.name}</h2>
        <div className="flex items-center py-2">
          <StarRating rating={school.rating} size="sm" />
          <span className="ml-2 text-sm font-semibold text-gray-700">
            {school.rating.toFixed(1)}
          </span>
        </div>
        <p className="text-xs text-gray-500">{school.description}</p>
      </div>
    </div>
  );
}
