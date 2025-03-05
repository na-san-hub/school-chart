import SearchForm from "./search/SearchForm";
import { getSkills, getProfessions, getFeatures } from "@/lib/search";
import SearchMenuTabs from "./SearchMenuTabs";

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
        />
        <SearchMenuTabs />
      </div>
      <nav></nav>
    </header>
  );
};

export default SearchHeader;
