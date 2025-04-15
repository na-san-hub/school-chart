import { getFavoriteSchools } from "./actions";
import FavoriteList from "./components/FavoriteList";
import { FavoriteSchoolItem } from "@/types/mypage";

export default async function FavoritesPage() {
  const favorites: FavoriteSchoolItem[] = await getFavoriteSchools();

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-700 mb-5">気になるスクール</h1>
      <FavoriteList favorites={favorites} />
    </div>
  );
}
