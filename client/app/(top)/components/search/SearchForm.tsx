import KeywordSearch from "./KeywordSearch";

const SearchForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full max-w-4xl mx-auto text-center py-12">
      <div className="border border-gray-300 rounded-lg shadow-lg backdrop-blur-sm overflow-hidden">
        <div className="bg-cyan-600/80 text-white py-4 px-6 text-sm font-semibold tracking-wide">
          あなたに合ったスクールを見つけよう
        </div>
        <div className="flex">{children}</div>
        <KeywordSearch />
      </div>
    </section>
  );
};

export default SearchForm;
