import {
  Cell,
  Label,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
} from "recharts";
import { getCategoryBg } from "../../../../js/getCategoryKor";

export default function ConsumeRadarChart({ consumeChartData, maxValue }) {
  function transformConsumeChartData(data) {
    const transformedData = [];
    const excludeCategories = ["기타/예비/용돈", "식비/간식"];
    const categories = Object.keys(data[0]);

    categories.forEach((category) => {
      if (category !== "name" && !excludeCategories.includes(category)) {
        transformedData.push({
          subject: category,
          A: data[0][category],
          fullMark: 100, // 제외된 항목을 제외하고 모든 fullMark는 100으로 설정
        });
      }
    });

    return transformedData;
  }
  const convertedData = transformConsumeChartData(consumeChartData);
  function transformData(data) {
    const excludeCategories = ["name", "기타/예비/용돈", "식비/간식"];

    const transformedData = [];

    const categories = Object.keys(data[0]);

    categories.forEach((category) => {
      if (!excludeCategories.includes(category)) {
        transformedData.push({
          name: category,
          value: data[0][category],
          fill: getCategoryBg(category),
        });
      }
    });

    return transformedData;
  }

  const pieChartData = transformData(consumeChartData);

  return (
    <div className="flex">
      <PieChart width={275} height={325}>
        <Pie
          data={pieChartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={75}
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
          <Label
            value={"1위는 " + maxValue}
            position="center"
            fill="#000"
            style={{ fontSize: "12px" }}
          />
        </Pie>
        <Tooltip />
      </PieChart>
      <RadarChart width={270} height={325} data={convertedData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={50} />
        <Tooltip
          position={{ x: 75, y: 265 }}
          wrapperStyle={{ fontSize: "0.9rem", color: "black" }}
        />
        <Radar
          name="소비 유형"
          dataKey="A"
          stroke="#b488d3"
          fill="#b488d3"
          fillOpacity={0.6}
        />
      </RadarChart>
    </div>
  );
}
