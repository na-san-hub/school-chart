import SearchForm from "./search/SearchForm";
import { getSkills, getProfessions, getFeatures } from "@/lib/search";
import SearchMenuTabs from "./SearchMenuTabs";
import { locations, deliveryMethods, priceRanges } from "@/lib/staticLists";

const SearchHeader = async () => {
  // スキル・職種・特徴のリストを取得
  const skills: { name: string }[] = await getSkills();
  const professions: { name: string }[] = await getProfessions();
  const features: { name: string }[] = await getFeatures();

  return (
    <header className="w-full bg-gray-100">
      <div>
        <SearchForm
          skills={skills}
          professions={professions}
          features={features}
          locations={locations}
          deliveryMethods={deliveryMethods}
          priceRanges={priceRanges}
        />
        <SearchMenuTabs />
      </div>
      <nav></nav>
    </header>
  );
};

export default SearchHeader;
