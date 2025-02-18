import Image from "next/image";
import { SchoolHeaderData } from "@/types/school";
import MenuTabs from "./MenuTabs";
import StarRating from "./StarRating";

export default function SchoolHeader({ school }: { school: SchoolHeaderData }) {
  return (
    <section className="relative w-full h-[210px] bg-gray-100">
      <div className="flex max-w-4xl mx-auto items-center space-x-6 px-6 py-9 ">
        {/* 左側: ロゴ */}
        <div className="flex items-center justify-center w-24 h-24">
          <Image
            src={school.logo || "/defaultLogo.png"}
            alt={school.name}
            width={96}
            height={96}
            className="object-cover"
          />
        </div>

        {/* 右側: スクール情報 */}
        <div className="flex flex-col">
          {/* スクール名 */}
          <h1 className="text-2xl font-bold text-gray-700">{school.name}</h1>

          {/* 星評価 */}
          <StarRating rating={school.rating} size={"md"} />

          {/* 説明 */}
          <p className="mt-2 text-gray-600 text-sm">{school.description}</p>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <MenuTabs schoolID={school.id} />
      </div>
    </section>
  );
}
