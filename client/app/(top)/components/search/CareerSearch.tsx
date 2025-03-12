import { Briefcase, Code, Video, BarChart } from "lucide-react";
import { oneClickSSearchAction } from "@/actions/oneClickSSearchAction";

// 各職種カテゴリのリスト
const careerOptions = [
  {
    category: "WEBデザイナー",
    professions: ["Webデザイナー", "UI/UXデザイナー"],
    icon: Briefcase,
  },
  {
    category: "エンジニア",
    professions: [
      "セキュリティエンジニア",
      "AIエンジニア",
      "フロントエンドエンジニア",
      "バックエンドエンジニア",
    ],
    icon: Code,
  },
  {
    category: "動画クリエイター",
    professions: ["動画/映像編集", "クリエイティブディレクター"],
    icon: Video,
  },
  {
    category: "WEBマーケター",
    professions: [
      "SNSマーケター",
      "Webマーケター",
      "SEOコンサルタント",
      "Web広告運用",
    ],
    icon: BarChart,
  },
];

const CareerSearch = () => {
  return (
    <section className="w-full max-w-screen-lg mx-auto text-center py-8 px-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-5">
        「なりたい」から探す
      </h2>

      {/* ボタンリスト */}
      <div className="grid grid-cols-2 md:grid-cols-2 text-gray-700 gap-4">
        {careerOptions.map(({ category, professions, icon: Icon }) => (
          <form key={category} action={oneClickSSearchAction}>
            {professions.map((profession) => (
              <input
                key={profession}
                type="hidden"
                name="professions"
                value={profession}
              />
            ))}
            <button
              type="submit"
              className="w-full flex flex-col items-center justify-center p-4 
              bg-white border border-gray-300 rounded-lg hover:opacity-70 hover:bg-gray-50 transition"
            >
              <Icon className="w-7 h-7" />
              <span className="mt-2 text-sm font-semibold">{category}</span>
            </button>
          </form>
        ))}
      </div>
    </section>
  );
};

export default CareerSearch;
