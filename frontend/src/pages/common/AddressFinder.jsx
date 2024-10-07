import { openPostcode } from "../../js/openPostcode";

export default function AddressFinder({
  setPostcode,
  setRoadAddress,
  setJibunAddress,
  setExtraAddress,
  setDetailAddress,
  postcode,
  roadAddress,
  jibunAddress,
  detailAddress,
  extraAddress,
}) {
  return (
    <div className="w-full">
      <div className="mt-2">
        <div className="ml-2">주소를 입력해주세요</div>
        <input
          type="text"
          value={postcode}
          className="w-[50%] h-16 mt-2 pl-5 text-xl border-2 rounded-2xl border-gray-400"
          placeholder="우편번호"
          readOnly
        />
        <button
          className="ml-5 text-lg border-b border-black hover:opacity-80 transition-all duration-300"
          onClick={() =>
            openPostcode(
              setPostcode,
              setRoadAddress,
              setJibunAddress,
              setExtraAddress
            )
          }
        >
          우편번호 찾기
        </button>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="w-[50%] mr-1">
          <div className="ml-2">도로명주소</div>
          <input
            type="text"
            value={roadAddress}
            className="w-full h-16 mt-2 pl-5 text-xl border-2 rounded-2xl border-gray-400"
            placeholder="도로명주소"
            readOnly
          />
        </div>
        <div className="w-[50%] ml-1">
          <div className="ml-2">지번주소</div>
          <input
            type="text"
            value={jibunAddress}
            className="w-full h-16 mt-2 pl-5 text-xl border-2 rounded-2xl border-gray-400"
            placeholder="지번주소"
            readOnly
          />
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="w-[50%] mr-1">
          <div className="ml-2">상세주소</div>
          <input
            type="text"
            value={detailAddress}
            className="w-full h-16 mt-2 pl-5 text-xl border-2 rounded-2xl border-gray-400"
            placeholder="상세주소"
            onChange={(e) => setDetailAddress(e.target.value)}
          />
        </div>
        <div className="w-[50%] ml-1">
          <div className="ml-2">침고항목</div>
          <input
            type="text"
            value={extraAddress}
            className="w-full h-16 mt-2 pl-5 text-xl border-2 rounded-2xl border-gray-400"
            placeholder="참고항목"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
