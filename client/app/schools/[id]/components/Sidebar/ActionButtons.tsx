import FavoriteButton from "@/components/userData/FavoriteButton";
import { checkIsFavorite } from "@/actions/userPage";
import ReviewsButton from "./reviewsButton";

interface SchoolActionButtonsProps {
  schoolId: string;
}

const SchoolActionButtons = async ({ schoolId }: SchoolActionButtonsProps) => {
  // お気に入り済みか確認
  const isFavorite = await checkIsFavorite(schoolId);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="space-y-3">
        <FavoriteButton
          schoolId={schoolId}
          isInitiallyFavorite={isFavorite}
          className="w-full"
        />
        <ReviewsButton />
      </div>
    </div>
  );
};

export default SchoolActionButtons;
