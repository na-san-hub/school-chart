import SchoolActionButtons from "./SchoolActionButtons";
// RelatedSchools は後で実装

interface MainSidebarProps {
  schoolId: string;
}

const MainSidebar = async ({ schoolId }: MainSidebarProps) => {
  return (
    <div className="space-y-4">
      {/* アクションボタン */}
      <SchoolActionButtons schoolId={schoolId} />

      {/* 関連スクール紹介は後で実装 */}
      {/* <RelatedSchools schoolId={schoolId} /> */}
    </div>
  );
};

export default MainSidebar;
