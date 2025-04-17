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

// コースのサマリー型（不要なフィールドは除外）
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
export interface SchoolCoverData {
  id: string;
  name: string;
  logo: string | null;
  rating: number;
  description: string | null;
  reviewsCount: number;
}

// レーダーチャート用データの型
export interface RadarChartData {
  schoolRating: number;
  categories: { category: string; score: number }[];
}

// Rating 型を明示
export interface RatingData {
  category: string;
  score: number;
}

// ピックアップコース表示用の詳細型
export interface CourseDetail {
  id: string;
  name: string;
  description: string;
  price: number | null;
  duration: string | null;
  deliveryMethod: "IN_PERSON" | "ONLINE" | "HYBRID";
  locationPrefecture: string;
}

// コース一覧表示用の簡略化された型
export interface CourseListData {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  price?: number | null;
  duration?: string | null;
  locationPrefecture: string;
  deliveryMethod: "IN_PERSON" | "ONLINE" | "HYBRID";
  courseCategories: { category: { id: string; name: string } }[];
}

// getCourseDetails関数の戻り値の型(コース詳細ページ用)
export interface CourseWithSchool extends Omit<CourseAllData, "school"> {
  school: {
    id: string;
    name: string;
    logo: string | null;
  };

  courseCategories: {
    category: {
      id: string;
      name: string;
    };
  }[];
  courseFeatures: {
    feature: {
      id: string;
      name: string;
    };
  }[];
  courseSkills: {
    skill: {
      id: string;
      name: string;
    };
  }[];
}
