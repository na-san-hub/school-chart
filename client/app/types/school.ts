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

// コース情報の型（変更点あり）
export interface CourseData {
  id: string;
  name: string;
  description: string;
  price?: number | null;
  duration?: string | null;
  deliveryMethod: "IN_PERSON" | "ONLINE" | "HYBRID";
  locationPrefecture: string;
  locationAddress?: string | null;
  category: { id: string; name: string }[]; // 🔹 オブジェクトの配列に変更
  features: { id: string; name: string }[];
  skills: { id: string; name: string }[];
}

// `SchoolWithCourses` の型（`categories` などを変更）
export interface SchoolWithCourses extends SchoolData {
  courses: CourseData[];
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
