// すべての都道府県（日本）のリスト
export const locations = [
  { name: "リモート" },
  { name: "北海道" },
  { name: "青森県" },
  { name: "岩手県" },
  { name: "宮城県" },
  { name: "秋田県" },
  { name: "山形県" },
  { name: "福島県" },
  { name: "茨城県" },
  { name: "栃木県" },
  { name: "群馬県" },
  { name: "埼玉県" },
  { name: "千葉県" },
  { name: "東京都" },
  { name: "神奈川県" },
  { name: "新潟県" },
  { name: "富山県" },
  { name: "石川県" },
  { name: "福井県" },
  { name: "山梨県" },
  { name: "長野県" },
  { name: "岐阜県" },
  { name: "静岡県" },
  { name: "愛知県" },
  { name: "三重県" },
  { name: "滋賀県" },
  { name: "京都府" },
  { name: "大阪府" },
  { name: "兵庫県" },
  { name: "奈良県" },
  { name: "和歌山県" },
  { name: "鳥取県" },
  { name: "島根県" },
  { name: "岡山県" },
  { name: "広島県" },
  { name: "山口県" },
  { name: "徳島県" },
  { name: "香川県" },
  { name: "愛媛県" },
  { name: "高知県" },
  { name: "福岡県" },
  { name: "佐賀県" },
  { name: "長崎県" },
  { name: "熊本県" },
  { name: "大分県" },
  { name: "宮崎県" },
  { name: "鹿児島県" },
  { name: "沖縄県" },
];

// 受講形式の選択肢
export const deliveryMethods = [
  { label: "オンライン", value: "ONLINE" },
  { label: "対面", value: "IN_PERSON" },
  { label: "ハイブリッド", value: "HYBRID" },
];

// 価格帯の選択肢（下限／上限共通）
export const priceRanges = [
  { label: "10万円", value: "100000" },
  { label: "20万円", value: "200000" },
  { label: "30万円", value: "300000" },
  { label: "50万円", value: "500000" },
];

import { AgeGroup, Gender } from "@prisma/client";
// 年齢グループの選択肢
export const ageGroupOptions = [
  { value: AgeGroup.TEENS, label: "10代" },
  { value: AgeGroup.TWENTIES, label: "20代" },
  { value: AgeGroup.THIRTIES, label: "30代" },
  { value: AgeGroup.FORTIES, label: "40代" },
  { value: AgeGroup.FIFTIES, label: "50代" },
  { value: AgeGroup.SIXTIES, label: "60代以上" },
];

// 性別の選択肢
export const genderOptions = [
  { value: Gender.MALE, label: "男性" },
  { value: Gender.FEMALE, label: "女性" },
  { value: Gender.OTHER, label: "その他" },
];
