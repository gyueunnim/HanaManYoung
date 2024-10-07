import { useState, useEffect } from "react";
import { Cell, Label, Pie, PieChart, Tooltip } from "recharts";
import {
  getCategoryBgColor,
  getCategoryKor,
} from "../../../../js/getCategoryKor";

export default function ConsumePieChart({ data }) {
  const [dataWithColors, setDataWithColors] = useState([]);

  useEffect(() => {
    const updatedData = data.map((entry) => ({
      ...entry,
      name: getCategoryKor(entry.name), // 카테고리 이름을 한국어로 변환
      fill: getCategoryBgColor(entry.name), // 변환된 카테고리 이름에 맞는 색상 추가
    }));
    setDataWithColors(updatedData);
  }, [data]);

  return (
    <div className="font-basic">
      <PieChart width={275} height={275}>
        <Pie
          data={dataWithColors}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={75}
        >
          {dataWithColors.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
          <Tooltip />
          <Label
            value={"지출 분류"}
            position="center"
            fill="#000"
            style={{ fontSize: "15px" }}
          />
        </Pie>
      </PieChart>
    </div>
  );
}
