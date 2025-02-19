import {
  SchoolData,
  CourseData,
  SchoolWithCourses,
  SchoolHeaderData,
} from "@/types/school";

// ダミーデータ（スクール情報）
const dummySchools: SchoolData[] = [
  {
    id: "1",
    name: "DMMプログラミングスクール",
    website: "https://dmm-programming.com",
    description:
      "未経験からITエンジニアへ。目指すキャリアによってコースが選べる。転職成功率は98.8％",
    logo: "/defaultLogo.png",
    rating: 4,
  },
  {
    id: "2",
    name: "テックキャンプ",
    website: "https://tech-camp.in",
    description: "短期集中でエンジニア転職。未経験でも最短で実務レベルに。",
    logo: "/defaultLogo.png",
    rating: 3,
  },
];

// ダミーデータ（コース情報）
const dummyCourses: CourseData[] = [
  {
    id: "101",
    school_id: "1",
    name: "Web開発コース",
    delivery_method: "オンライン",
    location_prefecture: "リモート",
    category: "Web開発",
    features: ["給付金対象", "転職保証"],
    skills: ["JavaScript", "React"],
  },
  {
    id: "102",
    school_id: "1",
    name: "AIエンジニアコース",
    delivery_method: "対面",
    location_prefecture: "東京都",
    category: "AI",
    features: ["AI専門", "Python特化"],
    skills: ["Python", "機械学習"],
  },
  {
    id: "201",
    school_id: "1",
    name: "エンジニア転職コース",
    delivery_method: "オンライン",
    location_prefecture: "リモート",
    category: "エンジニア転職",
    features: ["転職保証", "無料カウンセリング"],
    skills: ["Ruby", "Rails", "JavaScript"],
  },
];

// スクール情報を取得（`courses` なし）
export async function getSchoolData(id: string): Promise<SchoolData> {
  const school = dummySchools.find((s) => s.id === id);
  if (!school) throw new Error(`スクールID ${id} が見つかりません`);
  return school;
}

// スクール詳細情報を取得（`courses` あり）
export async function getSchoolWithCourses(
  id: string
): Promise<SchoolWithCourses> {
  const school = dummySchools.find((s) => s.id === id);
  if (!school) throw new Error(`スクールID ${id} が見つかりません`);

  const schoolCourses = dummyCourses.filter((c) => c.school_id === id);

  return {
    ...school,
    courses: schoolCourses,
    locations: Array.from(
      new Set(schoolCourses.map((c) => c.location_prefecture))
    ),
    categories: Array.from(new Set(schoolCourses.map((c) => c.category))),
    features: Array.from(new Set(schoolCourses.flatMap((c) => c.features))),
    skills: Array.from(new Set(schoolCourses.flatMap((c) => c.skills))),
  };
}

// ヘッダー用のデータを取得（名前・ロゴ・評価・説明のみ）
export async function getSchoolHeader(id: string): Promise<SchoolHeaderData> {
  const school = dummySchools.find((school) => school.id === id);

  if (!school) {
    throw new Error(`スクールID ${id} が見つかりません`);
  }

  return {
    id: school.id,
    name: school.name,
    logo: school.logo,
    rating: school.rating,
    description: school.description,
  };
}
