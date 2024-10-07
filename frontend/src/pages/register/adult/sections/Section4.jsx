import { setLimitLeng } from "../../../../js/setLimitLeng";

export default function Section4({
  setEmail,
  setEmailDomain,
  setPhoneNumber1,
  setPhoneNumber2,
}) {
  return (
    <div className="w-full">
      <div className="mt-8">
        <div className="ml-2">이메일을 입력해주세요</div>
        <div className="flex items-center">
          <input
            type="text"
            className="w-[55%] h-16 mt-2 pl-5 text-xl border-2 rounded-2xl border-gray-400"
            placeholder="이메일 입력"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="w-[5%] text-2xl text-center font-bold">@</div>
          <select
            className="w-[40%] h-16 mt-2 pl-5 text-xl font-bold border-2 rounded-2xl border-gray-400"
            onChange={(e) => setEmailDomain(e.target.value)}
          >
            <option name="">naver.com</option>
            <option name="">daum.net</option>
            <option name="">kakao.com</option>
            <option name="">gmail.com</option>
          </select>
        </div>
      </div>
      <div className="mt-8">
        <div className="ml-2">전화번호를 입력해주세요</div>
        <div className="flex items-center">
          <div className="w-[31%] h-16 mt-2 pl-5 text-xl font-bold border-2 rounded-2xl border-gray-400 flex items-center">
            010
          </div>
          <div className="w-[3.5%] text-center text-2xl font-bold"> -</div>
          <input
            type="number"
            className="w-[31%] h-16 mt-2 pl-5 text-xl border-2 rounded-2xl border-gray-400"
            placeholder="1234"
            onChange={(e) => setLimitLeng(e, setPhoneNumber1, 4)}
            onInput={(e) => {
              if (e.target.value.length > 4) {
                e.target.value = e.target.value.slice(0, 4);
              }
            }}
          />
          <div className="w-[3.5%] text-center text-2xl font-bold">-</div>
          <input
            type="number"
            className="w-[31%] h-16 mt-2 pl-5 text-xl border-2 rounded-2xl border-gray-400"
            placeholder="5678"
            onChange={(e) => setLimitLeng(e, setPhoneNumber2, 4)}
            onInput={(e) => {
              if (e.target.value.length > 4) {
                e.target.value = e.target.value.slice(0, 4);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
