import { useState, useRef } from "react";
import { readBase64, readURL } from "../../../../js/readURL";

export default function Section5({ school, setSchool }) {
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef(null); // 이미지 요소에 대한 참조

  const handleFileChange = (e) => {
    setIsLoading(true); // 파일 선택 시 로딩 상태로 전환
    readURL(e.target, imgRef); // imgRef를 전달
    readBase64(e.target, setSchool, setIsLoading); // setIsLoading을 readBase64에 전달
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="absolute w-full min-h-screen flex items-center justify-center text-xl text-white bg-black opacity-60 z-10"></div>
          <div className="absolute w-full min-h-screen flex flex-col items-center justify-center text-xl text-white z-20">
            <img
              src={process.env.PUBLIC_URL + "/images/hana/bot2.png"}
              alt=""
              className="animate__animated animate__shakeY animate__infinite animate__slower mb-4"
            />
            <p>AI가 학생증을 분석하고 있어요</p>
          </div>
        </>
      ) : null}
      <div className="relative w-full">
        <div className="min-h-32 text-sm flex flex-col items-center">
          <img ref={imgRef} alt="" className="w-36" />{" "}
          {/* useRef로 이미지 참조 */}
          <span className="text-lg mr-2">학생증 사진을 등록해보세요!</span>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="mt-8 ml-2">
          학교 이름
          <span className="text-xs ml-2 text-gray-500">
            (AI가 인식한 이름과 다르다면 직접 추가해주세요)
          </span>
        </div>
        <input
          type="text"
          className="w-full mt-2 pl-5 h-16 text-xl border-2 rounded-2xl border-gray-400"
          placeholder="학교 입력"
          onChange={(e) => setSchool(e.target.value)}
          value={school}
        />
      </div>
    </>
  );
}
