import { Briefcase, Code, Video, BarChart } from "lucide-react";
import { oneClickSSearchAction } from "@/actions/oneClickSSearchAction";

const EngineerList = [
  "セキュリティエンジニア",
  "AIエンジニア",
  "フロントエンドエンジニア",
  "バックエンドエンジニア",
];

const webDesignerList = ["Webデザイナー", "UI/UXデザイナー", ,];
const videoCreatorList = ["動画/映像編集", "クリエイティブディレクター"];
const webMarketerList = [
  "SNSマーケター",
  "Webマーケター",
  "SEOコンサルタント",
  "Web広告運用",
];

const CareerSearch = () => {
  return (
    <section className="w-full max-w-screen-lg mx-auto text-center py-8 px-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-5">
        「なりたい」から探す
      </h2>

      {/* ボタンリスト */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {/* WEBデザイナー */}
        <form action={oneClickSSearchAction}>
          {webDesignerList.map((profession) => (
            <input
              key={profession}
              type="hidden"
              name="professions"
              value={profession}
            />
          ))}
          <button className="w-full flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
            <Briefcase className="w-7 h-7 text-gray-700" />
            <span className="mt-2 text-gray-700 text-sm font-semibold">
              WEBデザイナー
            </span>
          </button>
        </form>

        {/* エンジニア */}
        <form action={oneClickSSearchAction}>
          {EngineerList.map((profession) => (
            <input
              key={profession}
              type="hidden"
              name="professions"
              value={profession}
            />
          ))}
          <button
            type="submit"
            className="w-full flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition"
          >
            <Code className="w-7 h-7 text-gray-700" />
            <span className="mt-2 text-gray-700 text-sm font-semibold">
              エンジニア
            </span>
          </button>
        </form>

        {/* 動画クリエイター */}
        <form action={oneClickSSearchAction}>
          {videoCreatorList.map((profession) => (
            <input
              key={profession}
              type="hidden"
              name="professions"
              value={profession}
            />
          ))}
          <button className="w-full flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
            <Video className="w-7 h-7 text-gray-700" />
            <span className="mt-2 text-gray-700 text-sm font-semibold">
              動画クリエイター
            </span>
          </button>
        </form>

        {/* WEBマーケター */}
        <form action={oneClickSSearchAction}>
          {webMarketerList.map((profession) => (
            <input
              key={profession}
              type="hidden"
              name="professions"
              value={profession}
            />
          ))}
          <button className="w-full flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
            <BarChart className="w-7 h-7 text-gray-700" />
            <span className="mt-2 text-gray-700 text-sm font-semibold">
              WEBマーケター
            </span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default CareerSearch;
