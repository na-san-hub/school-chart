import React from "react";
import SchoolHeader from "../components/SchoolHeader";

const SchoolPage = ({ params }: { params?: { id?: string } }) => {
  const schoolId = params?.id || "1"; // IDが取得できなかったら "1" をデフォルトにする 開発用
  return (
    <SchoolHeader
      school={{
        id: schoolId,
        name: "DMMプログラミングスクール",
        description:
          "未経験からITエンジニアへ。目指すキャリアによってコースが選べる。転職成功率は98.8％",
        logo: "",
        rating: 5,
      }}
    />
  );
};

export default SchoolPage;
