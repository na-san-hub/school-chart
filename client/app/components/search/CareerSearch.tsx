import { Briefcase, Code, Video, BarChart } from "lucide-react";

const CareerSearch = () => {
  return (
    <section className="w-full max-w-screen-lg mx-auto text-center py-12 px-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        「なりたい」から探す
      </h2>

      {/* ボタンリスト */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* WEBデザイナー */}
        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
          <Briefcase className="w-8 h-8 text-gray-700" />
          <span className="mt-2 text-gray-700 font-medium">WEBデザイナー</span>
        </button>

        {/* ソフトウェアエンジニア */}
        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
          <Code className="w-8 h-8 text-gray-700" />
          <span className="mt-2 text-gray-700 font-medium">
            ソフトウェアエンジニア
          </span>
        </button>

        {/* 動画クリエイター */}
        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
          <Video className="w-8 h-8 text-gray-700" />
          <span className="mt-2 text-gray-700 font-medium">
            動画クリエイター
          </span>
        </button>

        {/* WEBマーケター */}
        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
          <BarChart className="w-8 h-8 text-gray-700" />
          <span className="mt-2 text-gray-700 font-medium">WEBマーケター</span>
        </button>
      </div>
    </section>
  );
};

export default CareerSearch;
