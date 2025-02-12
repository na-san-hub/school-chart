import { School } from "@/types/school";

const dummySchools: School[] = [
  {
    id: "1",
    name: "DMMプログラミングスクール",
    description:
      "未経験からITエンジニアへ。目指すキャリアによってコースが選べる。転職成功率は98.8％",
    logo: "/defaultLogo.png",
    rating: 5,
  },
  {
    id: "2",
    name: "テックキャンプ",
    description: "短期集中でエンジニア転職。未経験でも最短で実務レベルに。",
    logo: "/defaultLogo.png",
    rating: 4,
  },
];

export async function getSchoolById(id: string): Promise<School> {
  const school = dummySchools.find((school) => school.id === id);

  if (!school) {
    throw new Error(`スクールID ${id} が見つかりません`);
  }

  return school;
}
