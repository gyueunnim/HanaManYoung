import { setLimitLeng } from "../../../../js/setLimitLeng";

export default function Section1({ setUserName, setFrontSsn, setBackSsn }) {
  return (
    <div className="w-full">
      <h1 className="text-xl">기본정보 입력</h1>
      <div className="mt-8">
        <div className="ml-2">이름을 입력해주세요</div>
        <input
          type="text"
          className="w-full h-16 mt-2 pl-5 text-xl border-2 rounded-2xl border-gray-400"
          placeholder="이름 입력"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="mt-8">
        <div className="ml-2">주민번호를 입력해주세요</div>
        <div className="flex items-center">
          <input
            type="number"
            className="w-[48%] h-16 mt-2 pl-5 text-xl border-2 rounded-2 rounded-2xl border-gray-400"
            placeholder="주민번호 앞자리 입력"
            onChange={(e) => setLimitLeng(e, setFrontSsn, 6)}
            onInput={(e) => {
              if (e.target.value.length > 6) {
                e.target.value = e.target.value.slice(0, 6);
              }
            }}
          />
          <div className="w-[4%] text-xl text-center font-bold">-</div>
          <input
            type="password"
            className="w-[48%] h-16 mt-2 pl-5 text-xl border-2 rounded-2xl border-gray-400"
            placeholder="주민번호 뒷자리 입력"
            maxLength={7}
            onChange={(e) => setLimitLeng(e, setBackSsn, 7)}
            onInput={(e) => {
              if (e.target.value.length > 7) {
                e.target.value = e.target.value.slice(0, 7);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
