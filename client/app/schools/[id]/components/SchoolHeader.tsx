import Image from "next/image";
import { SchoolHeaderData } from "@/types/school";
import MenuTabs from "../../components/MenuTabs";
import StarRating from "../../components/StarRating";

export default function SchoolHeader({ school }: { school: SchoolHeaderData }) {
  return (
    <section className="relative w-full h-[230px] bg-gray-100">
      <div className="flex max-w-4xl mx-auto items-center space-x-6 px-6 py-11 ">
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
        <div className="flex flex-col">
          {/* スクール名 */}
          <h1 className="text-3xl font-bold text-gray-700">{school.name}</h1>

          {/* 星評価 */}
          <StarRating rating={school.rating} size={"base"} />

          {/* 説明 */}
          <p className="mt-2 text-gray-600 text-sm">{school.description}</p>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <MenuTabs schoolID={school.id} reviewsCount={school.reviewsCount} />
      </div>
    </section>
  );
}
