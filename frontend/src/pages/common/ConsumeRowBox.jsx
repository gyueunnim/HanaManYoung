import ConsumeRow from "../main/planner/components/ConsumeRow";

export default function ConsumeRowBox({ accountTransactions }) {
  return (
    <div className="pr-2">
      {!accountTransactions.length && (
        <div className="h-44 text-lg flex justify-center items-center">
          이용 내역이 없어요
        </div>
      )}
      {accountTransactions.map((data, index) => (
        <ConsumeRow key={index} data={data} />
      ))}
    </div>
  );
}
