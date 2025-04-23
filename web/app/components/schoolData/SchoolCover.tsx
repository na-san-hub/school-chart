import Image from "next/image";
import { SchoolCoverData } from "@/types/school";
import StarRating from "./StarRating";

const SchoolCover = ({ school }: { school: SchoolCoverData }) => {
  return (
    <div className="flex max-w-4xl mx-auto items-center space-x-6 px-6 py-9 text-gray-700 hover:opacity-75">
      {/* 左側: ロゴ */}
      <div className="flex items-center justify-center w-26 h-26">
        <Image
          src={school.logo || "/defaultLogo.png"}
          alt={school.name}
          width={120}
          height={120}
          className="object-cover"
        />
      </div>

      {/* 右側: スクール情報 */}
      <div className="w-11/12 flex flex-col">
        {/* スクール名 */}
        <h1 className={`text-xl font-bold`}>{school.name}</h1>
        {/* 星評価 */}
        <div className="flex items-center py-2">
          <StarRating rating={school.rating} size={"sm"} />{" "}
          <span className="ml-2 text-sm font-semibold">
            {school.rating.toFixed(1)}
          </span>
          {/* 口コミ件数 */}
          <span className="ml-4 text-sm">
            口コミ件数：{school.reviewsCount}件
          </span>
        </div>
        <div className="w-full border-t border-gray-200"></div>
        {/* 説明 */}
        <p className="mt-2 text-gray-600 text-xs">{school.description}</p>
      </div>
    </div>
  );
};

export default SchoolCover;
