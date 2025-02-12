export async function getRadarChartData(schoolId: string) {
  // 仮のデータ（APIやDBから取得する処理に置き換え可能）
  return [
    { subject: "カリキュラム", value: 4.5, fullMark: 5 },
    { subject: "講師", value: 4.0, fullMark: 5 },
    { subject: "費用対効果", value: 3.8, fullMark: 5 },
    { subject: "転職サポート", value: 4.2, fullMark: 5 },
    { subject: "コミュニティ", value: 3.5, fullMark: 5 },
  ];
}
