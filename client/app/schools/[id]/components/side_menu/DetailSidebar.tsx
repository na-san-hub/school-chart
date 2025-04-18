import { SchoolWithCourses } from "@/types/school";
import SchoolActionButtons from "./SchoolActionButtons";
import SchoolInfoSection from "./SchoolInfoSection";

interface DetailSidebarProps {
  school: SchoolWithCourses;
}

const DetailSidebar = async ({ school }: DetailSidebarProps) => {
  return (
    <div className="space-y-4">
      {/* アクションボタン */}
      <SchoolActionButtons schoolId={school.id} />

      {/* スクール情報 */}
      <SchoolInfoSection school={school} />
    </div>
  );
};

export default DetailSidebar;
