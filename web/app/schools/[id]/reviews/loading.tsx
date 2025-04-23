export default function Loading() {
  return (
    <div className="border-t border-t-gray-400 w-full">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-gray-700 mb-5">口コミ一覧</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* 左側: フィルターと口コミリスト */}
          <div className="w-full md:w-3/4">
            {/* フィルタリングセクションのスケルトン */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 mb-8 animate-pulse">
              <div className="h-5 bg-gray-200 w-32 mb-4 rounded"></div>

              <div className="flex flex-wrap gap-7 mb-3">
                {/* 性別フィルタースケルトン */}
                <div className="flex items-center">
                  <div className="h-4 bg-gray-200 w-12 mr-2 rounded"></div>
                  <div className="flex gap-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-5 bg-gray-200 w-16 rounded"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* 年代フィルタースケルトン */}
                <div className="flex items-center">
                  <div className="h-4 bg-gray-200 w-12 mr-2 rounded"></div>
                  <div className="h-8 bg-gray-200 w-28 rounded"></div>
                </div>
              </div>

              {/* キーワード検索スケルトン */}
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <div className="h-9 bg-gray-200 w-full rounded"></div>
                </div>
                <div className="h-9 bg-gray-200 w-20 rounded"></div>
              </div>
            </div>

            {/* レビューリストのスケルトン */}
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-200 w-32 rounded"></div>
                <div className="h-8 bg-gray-200 w-32 rounded"></div>
              </div>

              {/* レビューカードスケルトン */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-4 animate-pulse"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="h-5 bg-gray-200 w-36 mb-2 rounded"></div>
                      <div className="h-4 bg-gray-200 w-48 rounded"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-4 bg-gray-200 w-24 mb-2 rounded"></div>
                      <div className="h-4 bg-gray-200 w-20 rounded"></div>
                    </div>
                  </div>

                  {/* 口コミ内容スケルトン - カテゴリ評価 */}
                  <div className="border-t border-gray-100 pt-4 mt-2">
                    {/* 各カテゴリのスケルトン */}
                    {[1, 2, 3, 4, 5].map((j) => (
                      <div key={j} className="mb-4">
                        <div className="flex items-center mb-1">
                          <div className="h-4 bg-gray-200 w-32 mr-2 rounded"></div>
                          <div className="h-4 bg-gray-200 w-20 rounded"></div>
                        </div>
                        <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                        <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
                      </div>
                    ))}

                    {/* 総合感想スケルトン */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="h-4 bg-gray-200 w-24 mb-2 rounded"></div>
                      <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                      <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                      <div className="h-4 bg-gray-200 w-2/3 rounded"></div>
                    </div>
                  </div>

                  {/* フッタースケルトン */}
                  <div className="flex justify-end mt-4">
                    <div className="h-5 bg-gray-200 w-24 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右側: サイドバーのスケルトン*/}
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
