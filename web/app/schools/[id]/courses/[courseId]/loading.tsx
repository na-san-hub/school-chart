export default function Loading() {
  return (
    <div className="border-t border-t-gray-400 w-full">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* 戻るボタンのローディング状態 */}
        <div className="mb-4">
          <div className="inline-flex text-base items-center text-gray-300">
            <div className="w-4 h-4 mr-1 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-36 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/4">
            {/* CourseDetailのローディング状態 */}
            <div className="border border-gray-200 rounded-lg w-full">
              <div className="max-w-5xl mx-auto px-6 py-6">
                {/* CourseDetailHeaderのローディング状態 */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex mx-auto items-center space-x-6 px-2 pb-4">
                    {/* スクールロゴローディング */}
                    <div className="w-26 h-26 bg-gray-200 animate-pulse rounded"></div>

                    <div className="flex flex-col w-full">
                      {/* カテゴリーローディング */}
                      <div className="flex gap-2">
                        <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-md"></div>
                        <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-md"></div>
                      </div>

                      {/* コース名ローディング */}
                      <div className="w-3/4 h-8 my-2 bg-gray-200 animate-pulse rounded"></div>

                      {/* スクール名と場所のローディング */}
                      <div className="flex items-center">
                        <div className="w-36 h-4 mr-2 bg-gray-200 animate-pulse rounded"></div>
                        <div className="w-4 h-4 bg-gray-200 animate-pulse rounded-full"></div>
                        <div className="w-24 h-4 ml-1 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CourseDetailContentのローディング状態 */}
                <div className="bg-white border border-gray-200 rounded-md p-6 mt-4">
                  {/* コース情報セクション */}
                  <div className="mb-4">
                    <div className="w-36 h-5 mb-3 bg-gray-200 animate-pulse rounded"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="w-20 h-4 mb-2 bg-gray-200 animate-pulse rounded"></div>
                        <div className="w-32 h-6 bg-gray-200 animate-pulse rounded"></div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="w-20 h-4 mb-2 bg-gray-200 animate-pulse rounded"></div>
                        <div className="w-32 h-6 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    </div>

                    <div className="w-full h-12 mt-4 bg-gray-100 animate-pulse rounded"></div>
                  </div>

                  {/* 受講形式セクション */}
                  <div className="mb-4">
                    <div className="w-36 h-5 mb-3 bg-gray-200 animate-pulse rounded"></div>
                    <div className="w-24 h-8 bg-gray-200 animate-pulse rounded-full"></div>
                  </div>

                  {/* 特徴タグセクション */}
                  <div className="mb-4">
                    <div className="w-36 h-5 mb-3 bg-gray-200 animate-pulse rounded"></div>
                    <div className="flex flex-wrap gap-2">
                      <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-full"></div>
                      <div className="w-24 h-8 bg-gray-200 animate-pulse rounded-full"></div>
                      <div className="w-28 h-8 bg-gray-200 animate-pulse rounded-full"></div>
                    </div>
                  </div>

                  {/* 習得スキルセクション */}
                  <div className="mb-4">
                    <div className="w-40 h-5 mb-3 bg-gray-200 animate-pulse rounded"></div>
                    <div className="flex flex-wrap gap-2">
                      <div className="w-24 h-8 bg-gray-200 animate-pulse rounded-full"></div>
                      <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-full"></div>
                      <div className="w-28 h-8 bg-gray-200 animate-pulse rounded-full"></div>
                    </div>
                  </div>

                  {/* コース概要セクション */}
                  <div>
                    <div className="w-36 h-5 mb-3 bg-gray-200 animate-pulse rounded"></div>
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="w-3/4 h-4 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 右側: サイドバーのスケルトン */}
          <div className="w-full md:w-1/4 space-y-4">
            {/* アクションボタンスケルトン */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm animate-pulse">
              <div className="space-y-3">
                <div className="h-10 bg-gray-200 w-full rounded"></div>
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
