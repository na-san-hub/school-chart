import SchoolCover from "@/components/schoolData/SchoolCover";
import Link from "next/link";
import { SchoolCoverData } from "@/types/school";
import { Heart } from "lucide-react";

interface SearchResultCardProps {
  school: SchoolCoverData;
}

const SearchResultCard = ({ school }: SearchResultCardProps) => {
  return (
    <section className="w-full max-w-4xl mx-auto border border-gray-300 rounded-md overflow-hidden">
      <Link href={`/schools/${school.id}`} className="block">
        <SchoolCover school={school} />
      </Link>
      <div className="flex justify-center gap-4 bg-gray-100">
        <button className="flex items-center py-3 px-6 my-4 border text-gray-700 border-gray-300 rounded-md text-sm bg-white">
          <Heart className="text-gray-600 mr-1" size={14} />
          気になるに追加
        </button>
        <button className="py-3 px-6 my-4 border rounded-md bg-cyan-600 text-white text-sm">
          コース一覧を見る
        </button>
      </div>
    </section>
  );
};

export default SearchResultCard;
