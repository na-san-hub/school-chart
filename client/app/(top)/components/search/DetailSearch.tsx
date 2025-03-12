import { Banknote, UserCog, Laptop, Clock } from "lucide-react";
import { oneClickSSearchAction } from "@/actions/oneClickSSearchAction";

// ボタンデータのリスト
const featureButtons = [
  { label: "給付金対象あり", value: "給付金対象", icon: Banknote },
  { label: "フリーを目指せる", value: "フリーランスを目指せる", icon: UserCog },
  { label: "完全リモート", value: "完全リモート", icon: Laptop },
  { label: "働きながら学べる", value: "働きながら学べる", icon: Clock },
];

const DetailSearch = () => {
  return (
    <section className="w-full max-w-screen-lg mx-auto text-center py-8 px-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-5">
        「こだわり」から探す
      </h2>

      {/* ボタンリスト */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {featureButtons.map(({ label, value, icon: Icon }) => (
          <form key={value} action={oneClickSSearchAction}>
            <input type="hidden" name="features" value={value} />
            <button
              className="w-full flex flex-col items-center justify-center p-4
            bg-white border border-gray-300 rounded-lg text-gray-700 hover:opacity-70 hover:bg-gray-50 transition"
            >
              <Icon className="w-7 h-7" />
              <span className="mt-2 text-sm font-semibold ">{label}</span>
            </button>
          </form>
        ))}
      </div>
    </section>
  );
};

export default DetailSearch;
