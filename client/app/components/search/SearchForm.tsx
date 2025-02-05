import CareerSearch from "@/components/search/CareerSearch";

const SearchForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full max-w-4xl mx-auto text-center py-12">
      <div className="bg-whites border border-gray-300 rounded-lg shadow-lg backdrop-blur-sm overflow-hidden">
        <div className="bg-cyan-600/80 text-white py-4 px-6 text-sm font-semibold ">
          あなたに合ったスクールを見つけよう
        </div>
        {children}
      </div>
    </section>
  );
};

export default SearchForm;
