import PickupCourseCard from "./PickupCourseCard";
import { CourseDetail, SchoolWithCourses } from "@/types/school";

interface PickupCoursesProps {
  school: SchoolWithCourses & {
    pickupCourses: CourseDetail[];
  };
}

const PickupCourses = ({ school }: PickupCoursesProps) => {
  // pickupCoursesが存在しないか空なら何も表示しない
  if (!school.pickupCourses?.length) return null;

  return (
    <section className="mt-5 max-w-5xl w-full mx-auto px-4">
      <h2 className="text-lg font-bold mb-4 text-gray-700">おすすめコース</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {school.pickupCourses.map((course) => (
          <PickupCourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default PickupCourses;
