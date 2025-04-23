import RelatedSchools from "./RelatedSchools";
import SchoolActionButtons from "./SchoolActionButtons";
import { SchoolWithCourses } from "@/types/school";

interface MainSidebarProps {
  schoolId: string;
  school: SchoolWithCourses;
}

const MainSidebar = async ({ schoolId, school }: MainSidebarProps) => {
  return (
    <div className="space-y-4">
      {/* アクションボタン */}
      <SchoolActionButtons schoolId={schoolId} />

      {/* 関連スクール紹介 */}
      <RelatedSchools schoolId={schoolId} categories={school.categories} />
    </div>
  );
};

export default MainSidebar;
