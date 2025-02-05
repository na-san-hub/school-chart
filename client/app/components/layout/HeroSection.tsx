import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[350px] bg-gray-100 flex items-center px-16">
      {/* 背景画像 */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: "url('/pc.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "70% center",
        }}
      ></div>

      {/* キャッチコピー */}
      <div className="relative max-w-4xl w-full mx-auto text-left">
        <h1 className="text-4xl font-semibold leading-snug tracking-wide text-gray-800">
          私らしい働き方叶える、
          <br />
          ITスクールのリアルな口コミ
        </h1>
        <p className="text-sm mt-4 text-gray-500">
          実際の受講生の声をもとに、最適なスクール選びをサポートします。
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
