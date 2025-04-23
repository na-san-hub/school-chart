export default function StarRating({
  rating,
  size = "md",
}: {
  rating: number;
  size?: string;
}) {
  const widthPercent = Math.min(100, (rating / 5) * 100); // 上限100%

  return (
    <div className="relative inline-block w-fit">
      {/* 背景のグレー星 */}
      <div className={`flex text-gray-300 text-${size}`}>
        {[...Array(5)].map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>

      {/* 前面の黄色星：塗りつぶす */}
      <div
        className={`absolute top-0 left-0 overflow-hidden flex text-yellow-500 text-${size}`}
        style={{ width: `${widthPercent}%` }}
      >
        {[...Array(5)].map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
    </div>
  );
}
