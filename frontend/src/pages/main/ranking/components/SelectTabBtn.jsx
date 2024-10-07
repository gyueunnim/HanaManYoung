export default function SelectTabBtn({ selectedRank, setSelectedRank }) {
  return (
    <div className="mt-4 text-gray-300 text-center text-xl font-basic flex justify-center gap-5">
      <div
        className={
          "w-[15%] py-2 rounded-md cursor-pointer hover:bg-cyan-500 hover:text-white transition-all duration-300 " +
          (selectedRank === 0 ? " text-black" : "")
        }
        onClick={() => setSelectedRank(0)}
      >
        학교
      </div>
      <div
        className={
          "w-[15%] py-2 rounded-md cursor-pointer hover:bg-green-400 hover:text-white transition-all duration-300 " +
          (selectedRank === 1 ? "text-black" : "")
        }
        onClick={() => setSelectedRank(1)}
      >
        지역
      </div>
      <div
        className={
          "w-[15%] py-2 rounded-md cursor-pointer hover:bg-indigo-300 hover:text-white transition-all duration-300 " +
          (selectedRank === 2 ? "text-black" : "")
        }
        onClick={() => setSelectedRank(2)}
      >
        나이
      </div>
    </div>
  );
}
