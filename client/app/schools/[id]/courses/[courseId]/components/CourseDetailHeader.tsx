import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { CourseWithSchool } from "@/types/school";
interface CourseDetailHeaderProps {
  course: CourseWithSchool;
}

export default function CourseDetailHeader({
  course,
}: CourseDetailHeaderProps) {
  return (
    <div className=" bg-white rounded-lg p-4">
      {/* スクール情報 */}
      <div className="flex mx-auto items-center space-x-6 px-2 pb-4">
        <div className="flex items-center justify-center w-26 h-26">
          <Image
            src={course.school.logo || "/defaultLogo.png"}
            alt={course.school.name}
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        {/* カテゴリー */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            {course.courseCategories?.map((item) => (
              <span
                key={item.category.id}
                className="text-sm px-2 py-1 mb-1 rounded-md text-yellow-600 border border-yellow-600"
              >
                {item.category.name}
              </span>
            ))}
          </div>

          {/* コース名 */}
          <h1 className="text-2xl my-2 font-bold text-gray-700">
            {course.name}
          </h1>
          {/* スクール名 */}
          <div className="text-sm font-medium flex items-center text-gray-700">
            <Link href={`/schools/${course.schoolId}`} className="block">
              <span className=" mr-2 font-medium hover:underline">
                {course.school.name}
              </span>
            </Link>
            {/* 場所 */}
            <MapPin size={16} />
            <span>{course.locationPrefecture}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
