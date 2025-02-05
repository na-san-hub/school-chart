import HeroSection from "./components/layout/HeroSection";
import CareerSearch from "./components/search/CareerSearch";
import SearchForm from "./components/search/SearchForm";
import DetailSearch from "@/components/search/DetailSearch";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <div className="-mt-20 relative z-10">
        <SearchForm>
          <CareerSearch />
          <DetailSearch />
        </SearchForm>
      </div>
    </main>
  );
}
