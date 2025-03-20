export default function Loading() {
  return (
    <div className="w-full mx-auto">
      {/* スクールヘッダー部分のスケルトン */}
      <div className="w-full bg-gray-100"></div>

      {/* コンテンツ部分 */}
      <div className="border-t border-t-gray-400 w-full">
        <div className="mt-5 flex flex-wrap max-w-5xl mx-auto justify-between items-center">
          {/* レーダーチャート部分 */}
          <div className="my-5 ml-5 py-3 flex justify-center items-center rounded-md border border-gray-200 w-[470px] h-[350px]">
            <div className="w-64 h-64 bg-gray-200 animate-pulse rounded-full"></div>
          </div>

          {/* スクール詳細情報部分 */}
          <div className="py-3 px-1 mr-5 max-w-[470px] w-full">
            <div className="h-6 bg-gray-300 animate-pulse rounded-md w-full mb-4"></div>

            {/* 公式サイト */}
            <div className="items-center py-2 flex gap-2 border-b border-b-gray-300">
              <div className="min-w-20 h-5 bg-gray-300 animate-pulse rounded-md"></div>
              <div className="h-5 bg-gray-300 animate-pulse rounded-md w-3/4"></div>
            </div>

            {/* 受講形式 */}
            <div className="items-center py-2 flex gap-2 border-b border-b-gray-300 min-h-[60px]">
              <div className="min-w-20 h-5 bg-gray-300 animate-pulse rounded-md"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-300 animate-pulse rounded-md w-20"
                  ></div>
                ))}
              </div>
            </div>

            {/* 特徴一覧 */}
            <div className="items-center py-2 flex gap-2 border-b border-b-gray-300 min-h-[80px]">
              <div className="min-w-20 h-5 bg-gray-300 animate-pulse rounded-md"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-300 animate-pulse rounded-md w-24"
                  ></div>
                ))}
              </div>
            </div>

            {/* 学べるスキル */}
            <div className="items-center py-2 flex gap-2 border-b border-b-gray-300 min-h-[80px]">
              <div className="min-w-20 h-5 bg-gray-300 animate-pulse rounded-md"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-300 animate-pulse rounded-md w-20"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
