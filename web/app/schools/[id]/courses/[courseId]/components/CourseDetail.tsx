import CourseDetailHeader from "./CourseDetailHeader";
import CourseDetailContent from "./CourseDetailContent";
import { CourseWithSchool } from "@/types/school";

interface CourseDetailContentProps {
  course: CourseWithSchool;
}

const CourseDetail = ({ course }: CourseDetailContentProps) => {
  return (
    <div className="border border-gray-200 rounded-lg w-full">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="md:flex-row gap-6">
          {/* コースヘッダー */}
          <CourseDetailHeader course={course} />
          {/* メインコンテンツ */}
          <CourseDetailContent course={course} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
