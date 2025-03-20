export default function SearchLoading() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start pt-12">
      <div className="max-w-4xl w-full">
        {/* ヘッダー部分のスケルトン */}
        <div className="w-full h-12 bg-gray-200 animate-pulse rounded-md mb-8"></div>

        {/* 検索結果のスケルトン */}
        <div className="space-y-7">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-md p-6 w-full"
            >
              <div className="flex">
                <div className="w-20 h-20 bg-gray-200 animate-pulse rounded-md"></div>
                <div className="flex-1 ml-6">
                  <div className="h-6 bg-gray-200 animate-pulse rounded-md w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded-md w-1/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded-md w-full mb-1"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded-md w-5/6"></div>
                </div>
              </div>
              <div className="flex justify-center gap-4 bg-gray-100 mt-4 p-4">
                <div className="h-10 bg-gray-200 animate-pulse rounded-md w-1/3"></div>
                <div className="h-10 bg-gray-200 animate-pulse rounded-md w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
