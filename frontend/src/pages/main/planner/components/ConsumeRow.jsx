import { extractTime } from "../../../../js/extractTime";

export default function ConsumeRow({ data }) {
  let amountColor = data.acc_t_amount > 0 ? "text-hana" : "text-orange-500";
  return (
    <div className="h-[84px] py-3 font-basic border-b flex flex-col">
      <div className="text-[0.7rem] py-1 text-gray-400 flex-1 flex justify-between">
        <div className="">{extractTime(data.acc_t_date)}</div>
        <div className="">{data.code_name}</div>
      </div>
      <div className="flex-1 flex justify-between">
        <div className="text-sm font-bold">{data.acc_t_target}</div>
        <div className="text-right">
          <div className={"text-sm font-bold " + amountColor}>
            {parseInt(data.acc_t_amount) > 0 ? "+" : ""}
            {parseInt(data.acc_t_amount).toLocaleString("ko-KR")}원
          </div>
          <div className="text-[0.7rem] text-gray-500">
            {parseInt(data.acc_t_balance).toLocaleString("ko-KR")}원
          </div>
        </div>
      </div>
    </div>
  );
}
