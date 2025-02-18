export interface CourseData {
  id: string;
  school_id: string; // どのスクールのコースかを識別
  name: string;
  delivery_method: string;
  location_prefecture: string;
  category: string;
  features: string[];
  skills: string[];
}

export interface SchoolData {
  id: string;
  name: string;
  website: string;
  description: string;
  logo: string;
  rating: number;
}

export interface SchoolWithCourses extends SchoolData {
  courses: CourseData[];
  locations: string[]; // スクールに紐づく location_prefecture の一覧
  categories: string[]; // スクールに紐づく categories の一覧
  features: string[]; // スクール全体の特徴（全コースから重複削除して統合）
  skills: string[]; // スクール全体で学べるスキル（全コースから重複削除して統合）
}

export interface SchoolHeaderData {
  id: string;
  name: string;
  logo: string;
  rating: number;
  description: string;
}
