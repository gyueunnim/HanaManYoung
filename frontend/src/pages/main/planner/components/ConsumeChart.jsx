import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

export default function ConsumeChart({ consumeChartData }) {
  return (
    <BarChart width={525} height={325} data={consumeChartData} className="pt-5">
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip
        position={{ x: 515, y: 50 }}
        wrapperStyle={{ fontSize: "0.9rem" }}
      />
      <Legend
        width={500}
        wrapperStyle={{ fontSize: "0.8rem", left: "47.5px", bottom: "10px" }}
        iconType="square"
      />
      <Bar dataKey="미용/패션" fill="#d1a6f9" />
      <Bar dataKey="교통비" fill="#a2f59a" />
      <Bar dataKey="문화/취미" fill="#ede49a" />
      <Bar dataKey="교육/학습" fill="#c3ab82" />
      <Bar dataKey="디지털 콘텐츠/쇼핑" fill="#fcb2ee" />
    </BarChart>
  );
}
