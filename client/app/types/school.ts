// スクール情報の型
export interface SchoolData {
  id: string;
  name: string;
  address?: string | null;
  website?: string | null;
  logo?: string | null;
  description?: string | null;
  rating: number;
}

// データベースから取得したコースの生データの型
export interface CourseAllData {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  deliveryMethod: "IN_PERSON" | "ONLINE" | "HYBRID";
  locationPrefecture: string;
  locationAddress?: string | null;
  price?: number | null;
  duration?: string | null;
  createdAt: Date;

  // リレーション情報
  courseCategories: { category: { id: string; name: string } }[];
  courseFeatures: { feature: { id: string; name: string } }[];
  courseSkills: { skill: { id: string; name: string } }[];
}

// 使いたいコースのサマリー型（不要なフィールドは除外）
export interface CourseSummary {
  id: string;
  deliveryMethod: "IN_PERSON" | "ONLINE" | "HYBRID";
  locationPrefecture: string;
  category: { id: string; name: string }[];
  features: { id: string; name: string }[];
  skills: { id: string; name: string }[];
}

// `SchoolWithCourses` の型（`categories` などを変更）
export interface SchoolWithCourses extends SchoolData {
  courses: CourseSummary[];
  locations: string[];
  categories: string[];
  features: string[];
  skills: string[];
}
// スクールページヘッダー用データの型
export interface SchoolHeaderData {
  id: string;
  name: string;
  logo: string | null;
  rating: number;
  description: string | null;
}

// レーダーチャート用データの型
export interface RadarChartData {
  schoolRating: number;
  categories: { category: string; score: number }[];
}
