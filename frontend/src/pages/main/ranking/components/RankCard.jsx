export default function RankCard({ bgColor, rank, name, score, age }) {
  return (
    <div
      className={
        "px-10 py-5 rounded-xl shadow-md flex justify-between " + bgColor
      }
    >
      <div className="w-[70%] flex">
        <p className="w-[15%]">{rank}</p>
        {age === undefined ? <></> : <p className="w-[50%]">( {age} )</p>}
        <p className={age === undefined ? "w-[85%]" : "w-[30%]"}>{name}</p>
      </div>
      <div>{score}점</div>
    </div>
  );
}
