import HeroSection from "./components/HeroSection";
import TopSearchForm from "./components/search/TopSearchForm";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <div className="-mt-20 relative z-10">
        <TopSearchForm />
      </div>
    </main>
  );
}
