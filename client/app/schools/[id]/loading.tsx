export default function Loading() {
  return (
    <div className="w-full mx-auto">
      {/* スクールヘッダー部分のスケルトン */}
      <div className="w-full bg-gray-100">
        <div className="flex max-w-4xl mx-auto items-center space-x-6 px-6 py-11">
          {/* ロゴ部分 */}
          <div className="w-24 h-24 bg-gray-300 animate-pulse rounded-md"></div>

          {/* スクール情報部分 */}
          <div className="flex flex-col w-full">
            <div className="h-8 bg-gray-300 animate-pulse rounded-md w-2/3 mb-3"></div>
            <div className="h-5 bg-gray-300 animate-pulse rounded-md w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 animate-pulse rounded-md w-full mb-2"></div>
            <div className="h-4 bg-gray-300 animate-pulse rounded-md w-5/6"></div>
          </div>
        </div>

        {/* メニュータブ部分 */}
        <div className="flex max-w-5xl mx-auto bg-gray-100 px-16">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className={`text-sm px-5 py-3 mx-1 rounded-t-lg w-36 text-center ${
                i === 0
                  ? "border border-gray-400 bg-white border-b-0"
                  : "bg-gray-200"
              }`}
            >
              <div className="h-4 bg-gray-300 animate-pulse rounded-md w-full"></div>
            </div>
          ))}
        </div>
      </div>

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
