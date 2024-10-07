export default function Footer({ bgColor, color }) {
  return (
    <div
      className={`w-full py-10 font-basic shadow-lg bg-black border-t flex justify-center items-center ${color} ${bgColor} z-10`}
    >
      <div className="max-w-[1280px] w-full">
        <div className="w-full flex">
          <div className="w-[80%] text-sm">
            <div className="w-full flex gap-3">
              <div>사고 신고</div>
              <div>·</div>
              <div>상품 공시실</div>
              <div>·</div>
              <div>보호금융상품등록부</div>
              <div>·</div>
              <div>경영공시</div>
              <div>·</div>
              <div>퇴직연금공시</div>
              <div>·</div>
              <div>인증센터</div>
              <div>·</div>
              <div>원격지원상담</div>
              <div>·</div>
              <div>손님의소리</div>
              <div>·</div>
              <div>상담샌터</div>
            </div>
            <div className="mt-2 w-full flex gap-3">
              <div>개인정보처리방침</div>
              <div>·</div>
              <div>본인정보이용 제공현황</div>
              <div>·</div>
              <div>그룹사간 고객정보 제공내역조회</div>
              <div>·</div>
              <div>영업점 찾기</div>
              <div>·</div>
              <div>원큐 금융 상담서비스</div>
            </div>
          </div>
          <div className="w-[30%]">
            <div className="w-full text-right flex flex-col gap-1 items-end">
              <div className="text-lg">고객센터</div>
              <div className="text-2xl font-bold">1588-1111 / 1599-1111</div>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full flex items-end">
          <div className="w-[80%] text-base flex">
            <div className="font-hana flex items-center">
              <img
                src={process.env.PUBLIC_URL + "/images/hana/logo.png"}
                alt=""
                className={
                  "w-10 " + (color === "text-black" ? "" : "filter-white")
                }
              />
              <p className="ml-1 text-xl font-bold">하나에서 만나 Young</p>
              <div className="ml-5 font-basic text-left">
                ⓒ Hana Man Young. All rights reserved.
              </div>
            </div>
          </div>
          <div className="w-[30%]">
            <div className="w-full flex flex-col text-right gap-1">
              <div className="text-sm">고객센터(해외)</div>
              <div className="text-2xl font-bold">+82-42-520-2500</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
