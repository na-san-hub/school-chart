import { Banknote, UserCog, Laptop, Clock } from "lucide-react";

const DetailSearch = () => {
  return (
    <section className="w-full max-w-screen-lg mx-auto text-center py-8 px-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-5">
        「こだわり」から探す
      </h2>

      {/* ボタンリスト */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {/* 給付金対象コースあり */}
        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition ">
          <Banknote className="w-7 h-7 text-gray-700" />
          <span className="mt-2 text-gray-700 text-sm font-semibold">
            給付金対象あり
          </span>
        </button>

        {/* フリーランスを目指せる */}
        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
          <UserCog className="w-7 h-7 text-gray-700" />
          <span className="mt-2 text-gray-700 text-sm font-semibold">
            フリーを目指せる
          </span>
        </button>

        {/* リモート受講可能 */}
        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
          <Laptop className="w-7 h-7 text-gray-700" />
          <span className="mt-2 text-gray-700 text-sm font-semibold">
            リモート受講可能
          </span>
        </button>

        {/* 働きながら学べる */}
        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
          <Clock className="w-7 h-7 text-gray-700" />
          <span className="mt-2 text-gray-700 text-sm font-semibold">
            働きながら学べる
          </span>
        </button>
      </div>
      <div className="text-gray-700"></div>
    </section>
  );
};

export default DetailSearch;
