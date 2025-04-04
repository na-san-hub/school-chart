export default function Loading() {
  return (
    <div className="w-full mx-auto">
      {/* コンテンツ部分 */}
      <div className="border-t border-t-gray-400 w-full">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="mt-5 flex flex-wrap max-w-5xl mx-auto justify-between items-start">
            {/* レーダーチャート部分 */}
            <div className="my-5 ml-5 py-3 flex justify-center items-center rounded-md border border-gray-200 bg-white animate-pulse">
              <div className="w-64 h-64 bg-gray-200 rounded-full"></div>

              {/* スコア部分 */}
              <div className="mr-5 flex flex-col items-center">
                <div className="h-5 bg-gray-200 w-32 mb-2 rounded-md"></div>
                <div className="flex items-center mb-3">
                  <div className="h-6 bg-gray-200 w-24 rounded-md"></div>
                </div>
                <div className="h-8 bg-gray-200 w-20 rounded-md"></div>
              </div>
            </div>

            {/* スクール詳細情報部分 */}
            <div className="py-3 px-1 mr-5 max-w-[470px] w-full animate-pulse">
              <div className="h-6 bg-gray-300 rounded-md w-full mb-4"></div>

              {/* 公式サイト */}
              <div className="items-center py-2 flex gap-2 border-b border-b-gray-300">
                <div className="min-w-20 h-5 bg-gray-300 rounded-md"></div>
                <div className="h-5 bg-gray-300 rounded-md w-3/4"></div>
              </div>

              {/* 受講形式 */}
              <div className="items-center py-2 flex gap-2 border-b border-b-gray-300 min-h-[60px]">
                <div className="min-w-20 h-5 bg-gray-300 rounded-md"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-300 rounded-md w-20"
                    ></div>
                  ))}
                </div>
              </div>

              {/* 特徴一覧 */}
              <div className="items-center py-2 flex gap-2 border-b border-b-gray-300 min-h-[80px]">
                <div className="min-w-20 h-5 bg-gray-300 rounded-md"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-300 rounded-md w-24"
                    ></div>
                  ))}
                </div>
              </div>

              {/* 学べるスキル */}
              <div className="items-center py-2 flex gap-2 border-b border-b-gray-300 min-h-[80px]">
                <div className="min-w-20 h-5 bg-gray-300 rounded-md"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-300 rounded-md w-20"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ピックアップレビュー部分 */}
          <section className="mt-10 w-full animate-pulse">
            <div className="h-7 bg-gray-300 w-48 rounded-md mb-4"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border rounded-md p-4 bg-white">
                  <div className="h-5 bg-gray-200 w-48 rounded-md mb-3"></div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-4 bg-gray-200 w-20 rounded-md"></div>
                    <div className="h-4 bg-gray-200 w-8 rounded-md"></div>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div className="h-4 bg-gray-200 w-32 rounded-md"></div>
                    <div className="h-4 bg-gray-200 w-24 rounded-md"></div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="h-4 bg-gray-200 w-full rounded-md mb-2"></div>
                    <div className="h-4 bg-gray-200 w-3/4 rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-10 bg-gray-200 w-full rounded-sm mt-5"></div>
          </section>

          {/* ピックアップコース部分 */}
          <section className="mt-10 w-full animate-pulse">
            <div className="h-7 bg-gray-300 w-48 rounded-md mb-4"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-md overflow-hidden"
                >
                  <div className="p-5">
                    <div className="h-5 bg-gray-200 w-64 rounded-md mb-3"></div>

                    <div className="flex flex-wrap gap-3 mb-3">
                      <div className="h-4 bg-gray-200 w-24 rounded-md"></div>
                      <div className="h-4 bg-gray-200 w-32 rounded-md"></div>
                      <div className="h-4 bg-gray-200 w-28 rounded-md"></div>
                    </div>

                    <div className="h-4 bg-gray-200 w-full rounded-md mb-2"></div>
                    <div className="h-4 bg-gray-200 w-full rounded-md mb-2"></div>
                    <div className="h-4 bg-gray-200 w-2/3 rounded-md"></div>
                  </div>

                  <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
                    <div className="h-5 bg-gray-200 w-full rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-10 bg-gray-200 w-full rounded-sm mt-5"></div>
          </section>
        </div>
      </div>
    </div>
  );
}
