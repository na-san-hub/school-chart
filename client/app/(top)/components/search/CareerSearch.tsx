import { Briefcase, Code, Video, BarChart } from "lucide-react";

const CareerSearch = () => {
  return (
    <section className="w-full max-w-screen-lg mx-auto text-center py-8 px-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-5">
        「なりたい」から探す
      </h2>

      {/* ボタンリスト */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {/* WEBデザイナー */}
        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
          <Briefcase className="w-7 h-7 text-gray-700" />
          <span className="mt-2 text-gray-700 text-sm font-semibold">
            WEBデザイナー
          </span>
        </button>

        {/* ソフトウェアエンジニア */}
        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
          <Code className="w-7 h-7 text-gray-700" />
          <span className="mt-2 text-gray-700 text-sm font-semibold">
            エンジニア
          </span>
        </button>

        {/* 動画クリエイター */}
        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
          <Video className="w-7 h-7 text-gray-700" />
          <span className="mt-2 text-gray-700 text-sm font-semibold">
            動画クリエイター
          </span>
        </button>

        {/* WEBマーケター */}
        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
          <BarChart className="w-7 h-7 text-gray-700" />
          <span className="mt-2 text-gray-700 text-sm font-semibold">
            WEBマーケター
          </span>
        </button>
      </div>
      <div className="text-gray-700"></div>
    </section>
  );
};

export default CareerSearch;
