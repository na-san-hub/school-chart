export async function getRadarChartData(id: string) {
  // `id` に応じたデータをオブジェクトで管理
  const radarDataMap: Record<
    string,
    { subject: string; value: number; fullMark: number }[]
  > = {
    "1": [
      { subject: "カリキュラム", value: 4.5, fullMark: 5 },
      { subject: "講師", value: 4.0, fullMark: 5 },
      { subject: "費用対効果", value: 3.8, fullMark: 5 },
      { subject: "転職サポート", value: 4.2, fullMark: 5 },
      { subject: "コミュニティ", value: 3.5, fullMark: 5 },
    ],
    "2": [
      { subject: "カリキュラム", value: 3.8, fullMark: 5 },
      { subject: "講師", value: 4.1, fullMark: 5 },
      { subject: "費用対効果", value: 4.2, fullMark: 5 },
      { subject: "転職サポート", value: 4.0, fullMark: 5 },
      { subject: "コミュニティ", value: 3.9, fullMark: 5 },
    ],
  };

  // `id` に対応するデータを取得（存在しない場合は空配列を返す）
  return radarDataMap[id] || [];
}
