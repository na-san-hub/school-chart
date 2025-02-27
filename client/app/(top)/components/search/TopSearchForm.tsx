import KeywordSearch from "./KeywordSearch";
import CareerSearch from "./CareerSearch";
import DetailSearch from "./DetailSearch";
const TopSearchForm = () => {
  return (
    <section className="w-full max-w-4xl mx-auto text-center py-12">
      <div className="border border-gray-300 rounded-lg shadow-sm backdrop-blur-sm overflow-hidden">
        <div className="bg-cyan-600/80 text-white py-4 px-6 text-sm font-semibold tracking-wide">
          あなたに合ったスクールを見つけよう
        </div>
        <div className="flex">
          <CareerSearch />
          <DetailSearch />
        </div>
        <KeywordSearch />
      </div>
    </section>
  );
};

export default TopSearchForm;
