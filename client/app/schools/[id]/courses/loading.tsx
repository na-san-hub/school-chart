export default function Loading() {
  return (
    <div className="border-t border-t-gray-400 w-full">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="h-7 bg-gray-300 w-48 rounded-md mb-5 animate-pulse"></div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* 左側: コースリストのスケルトン */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-4"></div>

            {/* コースカードスケルトン */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-6 mb-4 animate-pulse"
              >
                <div className="flex justify-between mb-3">
                  <div className="h-5 bg-gray-200 w-48 rounded-md"></div>
                  <div className="h-4 bg-gray-200 w-24 rounded-md"></div>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="h-6 bg-gray-200 w-24 rounded-md"></div>
                  <div className="h-6 bg-gray-200 w-32 rounded-md"></div>
                </div>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((j) => (
                      <div
                        key={j}
                        className="h-6 bg-gray-200 w-20 rounded-md"
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="h-4 bg-gray-200 w-20 rounded-md mb-1"></div>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((j) => (
                      <div
                        key={j}
                        className="h-5 bg-gray-200 w-16 rounded-full"
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-3 mt-4 bg-gray-50 border-t border-gray-200">
                  <div className="h-5 bg-gray-200 w-full rounded-md"></div>
                </div>
              </div>
            ))}
          </div>

          {/* 右側: サイドバーのスケルトン */}
          <div className="w-full md:w-1/4 space-y-4">
            {/* アクションボタンスケルトン */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm animate-pulse">
              <div className="space-y-3">
                <div className="h-10 bg-gray-200 w-full rounded"></div>
              </div>
            </div>

            {/* スクール情報スケルトン */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm animate-pulse">
              <div className="h-5 bg-gray-200 w-32 mb-3 rounded"></div>

              {/* 公式サイトスケルトン */}
              <div className="py-2 flex gap-2 border-b border-gray-200">
                <div className="h-4 bg-gray-200 w-24 rounded"></div>
                <div className="h-4 bg-gray-200 w-48 rounded"></div>
              </div>

              {/* 受講形式スケルトン */}
              <div className="py-2 flex gap-2 border-b border-gray-200">
                <div className="h-4 bg-gray-200 w-24 rounded"></div>
                <div className="flex flex-wrap gap-1">
                  <div className="h-6 bg-gray-200 w-20 rounded"></div>
                  <div className="h-6 bg-gray-200 w-20 rounded"></div>
                </div>
              </div>

              {/* 特徴スケルトン */}
              <div className="py-2 flex gap-2 border-b border-gray-200">
                <div className="h-4 bg-gray-200 w-24 rounded"></div>
                <div className="flex flex-wrap gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 bg-gray-200 w-16 rounded"></div>
                  ))}
                </div>
              </div>

              {/* カテゴリースケルトン */}
              <div className="py-2 flex gap-2">
                <div className="h-8 bg-gray-200 w-24 rounded"></div>
                <div className="flex flex-wrap gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 bg-gray-200 w-16 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
