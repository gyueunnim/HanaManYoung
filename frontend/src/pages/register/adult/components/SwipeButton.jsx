import { useNavigate } from "react-router-dom";

export default function SwipeButton({
  currentSlide,
  swiperRef,
  btnActive,
  handleRegist,
}) {
  const navigate = useNavigate();
  return (
    <div className="flex gap-4 mt-8">
      {currentSlide === 0 ? null : currentSlide === 5 ? null : (
        <button
          onClick={() => swiperRef.current && swiperRef.current.slidePrev()}
          className="w-full my-5 py-4 text-center text-2xl text-white btn-hana-blue rounded-2xl cursor-pointer hover:opacity-85 transition-all duration-300 ease-in-out"
        >
          이전
        </button>
      )}
      <button
        className={
          "w-full my-5 py-4 text-center text-2xl text-white btn-hana-green rounded-2xl cursor-pointer " +
          (btnActive
            ? "opacity-100 hover:opacity-85 transition-all duration-300 ease-in-out"
            : "opacity-50 cursor-not-allowed")
        }
        onClick={
          currentSlide === 5
            ? () => {
                navigate(process.env.PUBLIC_URL + "/");
              }
            : currentSlide === 4
            ? () => handleRegist()
            : () =>
                btnActive && swiperRef.current && swiperRef.current.slideNext()
        }
        disabled={!btnActive}
      >
        {currentSlide === 5
          ? "로그인 하러가기"
          : currentSlide === 4
          ? "계좌 등록 및 회원가입"
          : "다음"}
      </button>
    </div>
  );
}
