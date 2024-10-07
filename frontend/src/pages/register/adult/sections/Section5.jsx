export default function Section5({ setAccountNumber }) {
  return (
    <div className="w-full">
      <div className="text-xl flex justify-between items-center">
        <h1>
          계좌 등록
          <span className="text-sm text-gray-500">
            {" "}
            (하나은행 계좌만 가능해요)
          </span>
        </h1>
        <div>
          <div className="text-sm border-b border-black">
            <a
              href="https://www.kebhana.com/cont/mall/mall08/mall0801/mall080103/1455932_115188.jsp"
              target="blank"
            >
              하나은행 계좌 개설하기
            </a>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="my-2 flex items-center">
          <img
            src={process.env.PUBLIC_URL + "/images/hana/logo.png"}
            alt="bank_logo"
            className="w-8"
          />
          <p className="text-hana font-bold">하나은행</p>
        </div>
        <div className="ml-2">계좌 번호를 입력해주세요</div>

        <div className="flex items-center">
          <input
            type="number"
            className="w-full h-16 mt-2 pl-5 text-xl border-2 rounded-2xl border-gray-400"
            placeholder="계좌 번호 입력"
            onChange={(e) => setAccountNumber(e.target.value)}
            // onInput={(e) => {
            //   if (e.target.value.length > 4) {
            //     e.target.value = e.target.value.slice(0, 4);
            //   }
            // }}
          />
        </div>
      </div>
    </div>
  );
}
