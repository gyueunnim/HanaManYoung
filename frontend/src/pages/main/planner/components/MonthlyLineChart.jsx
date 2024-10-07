import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function MonthlyLineChart({ data }) {
  const inComeColor = "#4cb67b";
  const expenseColor = "#fea841";
  return (
    <AreaChart width={450} height={230} data={data}>
      <defs>
        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={inComeColor} stopOpacity={2} />
          <stop offset="70%" stopColor={inComeColor} stopOpacity={0.2} />
        </linearGradient>
        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={expenseColor} stopOpacity={2} />
          <stop offset="70%" stopColor={expenseColor} stopOpacity={0.2} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <Legend
        width={500}
        wrapperStyle={{ fontSize: "1rem", left: "-10px", bottom: "00px" }}
      />
      <Tooltip />
      <CartesianGrid strokeDasharray="3 3" />
      <Area
        type="temperature"
        dataKey="지출"
        stroke={expenseColor}
        fill="url(#colorExpense)" // 그라데이션 ID를 fill에 적용
        strokeWidth={2}
      />
      <Area
        type="temperature"
        dataKey="수입"
        stroke={inComeColor}
        fill="url(#colorIncome)" // 그라데이션 ID를 fill에 적용
        strokeWidth={2}
      />
    </AreaChart>
  );
}
