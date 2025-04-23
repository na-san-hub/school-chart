import { CourseListData } from "@/types/school";
import CourseCard from "../../components/courses/CourseCard";

interface CourseListProps {
  courses: CourseListData[];
}

const CourseList = ({ courses }: CourseListProps) => {
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-500">
          現在、このスクールのコース情報はありません。
        </p>
      </div>
    );
  }

  return (
    //コースカードリスト
    <div className="space-y-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
