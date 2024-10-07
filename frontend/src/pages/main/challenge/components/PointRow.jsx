export default function PointRow({ data }) {
  let amountColor = data.acc_t_amount > 0 ? "text-hana" : "text-orange-500";
  return (
    <div className="py-3 border-t font-basic flex flex-col">
      <div className="text-xs py-1 text-gray-400 flex-1 flex justify-between">
        <div className="">{data.acc_t_date}</div>
        <div className="">{data.code_name}</div>
      </div>
      <div className="flex-1 flex justify-between">
        <div className="text-sm font-bold">
          <div>포인트 적립</div>
          <div className="text-[0.6rem] font-thin text-gray-400">
            {data.acc_t_target}
          </div>
        </div>
        <div className="text-right">
          <div className={amountColor}>+{data.acc_t_amount}</div>
          <div className="text-xs bg-gradient-to-l from-indigo-500 to-fuchsia-500 text-transparent bg-clip-text">
            {data.acc_t_balance}P
          </div>
        </div>
      </div>
    </div>
  );
}
