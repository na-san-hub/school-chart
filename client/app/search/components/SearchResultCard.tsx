import SchoolCover from "@/components/schoolData/SchoolCover";
import Link from "next/link";
import { SchoolCoverData } from "@/types/school";
import FavoriteButton from "@/components/userData/FavoriteButton";
import { checkIsFavorite } from "@/actions/userPage";

interface SearchResultCardProps {
  school: SchoolCoverData;
}

const SearchResultCard = async ({ school }: SearchResultCardProps) => {
  const isFavorite = await checkIsFavorite(school.id);
  return (
    <section className="w-full max-w-4xl mx-auto border border-gray-300 rounded-md overflow-hidden">
      <Link href={`/schools/${school.id}`} className="block">
        <SchoolCover school={school} />
      </Link>
      <div className="flex justify-center items-center gap-4 bg-gray-100">
        <FavoriteButton
          schoolId={school.id}
          isInitiallyFavorite={isFavorite}
          className=""
        />
        <button className="py-3 px-6 my-4 rounded-md  bg-cyan-600 hover:opacity-75 text-white text-sm">
          コース一覧を見る
        </button>
      </div>
    </section>
  );
};

export default SearchResultCard;
