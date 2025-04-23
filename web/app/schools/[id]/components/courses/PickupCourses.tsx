import CourseCard from "./CourseCard";
import { CourseListData, SchoolWithCourses } from "@/types/school";
import Link from "next/link";

interface PickupCoursesProps {
  school: SchoolWithCourses & {
    pickupCourses: CourseListData[];
  };
}

const PickupCourses = ({ school }: PickupCoursesProps) => {
  // pickupCoursesが存在しないか空なら何も表示しない
  if (!school.pickupCourses?.length) return null;

  return (
    <section className="my-5 max-w-5xl w-full mx-auto px-4">
      <h2 className="text-xl font-bold mb-4 text-gray-700">おすすめコース</h2>

      <div className="space-y-4">
        {school.pickupCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <Link href={`/schools/${school.id}/courses`} className="block">
        <button className="my-5 max-w-5xl text-sm w-full px-3 py-3 bg-gray-100 text-gray-700 rounded-sm hover:bg-gray-200">
          コース一覧を見る
        </button>
      </Link>
    </section>
  );
};

export default PickupCourses;
