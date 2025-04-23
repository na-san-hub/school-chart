import Link from "next/link";
import { FavoriteSchoolItem } from "@/types/mypage";
import FavoriteSchoolCard from "./FavoriteCard";

export default function FavoriteList({
  favorites,
}: {
  favorites: FavoriteSchoolItem[];
}) {
  if (favorites.length === 0) {
    return (
      <div className="text-sm text-gray-500 text-center">
        まだ気になるスクールがありません。
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {favorites.map((school) => (
        <li key={school.id}>
          <Link href={`/schools/${school.id}`}>
            <FavoriteSchoolCard school={school} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
