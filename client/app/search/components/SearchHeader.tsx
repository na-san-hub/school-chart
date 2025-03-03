import SearchForm from "./search/SearchForm";
import { getSkills, getProfessions, getFeatures } from "@/actions/search";
import SearchMenuTabs from "./SearchMenuTabs";

const SearchHeader = async () => {
  const skills = await getSkills();
  const professions = await getProfessions();
  const features = await getFeatures();
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
