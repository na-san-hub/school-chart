import StarRating from "../../../components/schoolData/StarRating";

interface ScoreProps {
  rating: number;
}

export default function Score({ rating }: ScoreProps) {
  return (
    <section className="mr-5">
      <div className="text-gray-600 text-sm">口コミ評価チャート</div>
      <div className="flex items-center">
        <StarRating rating={rating} size={"2xl"} />
        <span className="ml-2 text-gray-700 text-lg font-semibold">
          {rating.toFixed(1)}
        </span>
      </div>
    </section>
  );
}
