import React from "react";
import SchoolHeader from "../components/SchoolHeader";

const SchoolPage = () => {
  return (
    <SchoolHeader
      school={{
        id: "1",
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
