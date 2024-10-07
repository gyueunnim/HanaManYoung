import { Cell, Legend, Pie, PieChart } from "recharts";

export default function HalfDoughnutChart({ savingChallenge, savingAccount }) {
  const data = [
    { name: "현재 금액", value: savingAccount.acc_balance, color: "#9a9ef7" },
    {
      name: "남은 금액",
      value:
        savingChallenge.challenge_saving_target_amount -
        savingAccount.acc_balance,
      color: "#acadc6",
    },
  ];

  return (
    <div className="flex justify-center">
      <PieChart width={300} height={200}>
        <Pie
          data={data}
          cy={125}
          innerRadius={60}
          outerRadius={100}
          startAngle={180}
          endAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend
          cy={100}
          wrapperStyle={{
            bottom: 20,
          }}
        />
      </PieChart>
    </div>
  );
}
