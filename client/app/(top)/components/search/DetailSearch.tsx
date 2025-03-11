import { Banknote, UserCog, Laptop, Clock } from "lucide-react";
import { oneClickSSearchAction } from "@/actions/oneClickSSearchAction";

const DetailSearch = () => {
  return (
    <section className="w-full max-w-screen-lg mx-auto text-center py-8 px-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-5">
        「こだわり」から探す
      </h2>

      {/* ボタンリスト */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {/* 給付金対象コースあり */}
        <form action={oneClickSSearchAction}>
          <input
            key="給付金対象"
            type="hidden"
            name="features"
            value="給付金対象"
          />
          <button className="w-full flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition ">
            <Banknote className="w-7 h-7 text-gray-700" />
            <span className="mt-2 text-gray-700 text-sm font-semibold">
              給付金対象あり
            </span>
          </button>
        </form>

        {/* フリーランスを目指せる */}
        <form action={oneClickSSearchAction}>
          <input
            key="フリーランスを目指せる"
            type="hidden"
            name="features"
            value="フリーランスを目指せる"
          />
          <button className="w-full flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
            <UserCog className="w-7 h-7 text-gray-700" />
            <span className="mt-2 text-gray-700 text-sm font-semibold">
              フリーを目指せる
            </span>
          </button>{" "}
        </form>

        {/* リモート受講可能 */}
        <form action={oneClickSSearchAction}>
          <input
            key="完全リモート"
            type="hidden"
            name="features"
            value="完全リモート"
          />
          <button className="w-full flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
            <Laptop className="w-7 h-7 text-gray-700" />
            <span className="mt-2 text-gray-700 text-sm font-semibold">
              完全リモート
            </span>
          </button>{" "}
        </form>

        {/* 働きながら学べる */}
        <form action={oneClickSSearchAction}>
          <input
            key="働きながら学べる"
            type="hidden"
            name="features"
            value="働きながら学べる"
          />
          <button className="w-full flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
            <Clock className="w-7 h-7 text-gray-700" />
            <span className="mt-2 text-gray-700 text-sm font-semibold">
              働きながら学べる
            </span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default DetailSearch;
