import HeroSection from "./components/layout/HeroSection";
import CareerSearch from "./components/search/CareerSearch";
import SearchForm from "./components/search/SearchForm";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <div className="-mt-20 relative z-10">
        <SearchForm>
          <CareerSearch />
        </SearchForm>
      </div>
    </main>
  );
}
