"use client";

import { useRouter } from "next/navigation";
import { Banknote, UserCog, Laptop, Clock } from "lucide-react";

const featureButtons = [
  { label: "給付金対象あり", value: "給付金対象", icon: Banknote },
  { label: "フリーを目指せる", value: "フリーランスを目指せる", icon: UserCog },
  { label: "完全リモート", value: "完全リモート", icon: Laptop },
  { label: "働きながら学べる", value: "働きながら学べる", icon: Clock },
];

const DetailSearch = () => {
  const router = useRouter();

  const handleSearch = (value: string) => {
    router.push(`/search?features=${encodeURIComponent(value)}`);
  };

  return (
    <section className="w-full max-w-screen-lg mx-auto text-center py-8 px-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-5">
        「こだわり」から探す
      </h2>

      {/* ボタンリスト */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {featureButtons.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => handleSearch(value)}
            className="w-full flex flex-col items-center justify-center p-4
              bg-white border border-gray-300 rounded-lg text-gray-700 hover:opacity-70 hover:bg-gray-50 transition"
          >
            <Icon className="w-7 h-7" />
            <span className="mt-2 text-sm font-semibold ">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default DetailSearch;
