import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Section2() {
  const swiperStyle = {
    width: "100%",
    height: "auto",
  };
  return (
    <div className="mt-10">
      <div className="flex justify-between items-end">
        <h2 className="text-xl">
          <span className="text-2xl text-hana font-bold">고객님</span>, 이런
          이벤트 어떠세요?
        </h2>
        <p className="ml-4 text-sm text-gray-600 font-basic">
          현재 하나은행에서 진행 중인 이벤트입니다.
        </p>
      </div>
      <div className="w-[70%] mx-auto font-basic">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          allowTouchMove={false}
          spaceBetween={25}
          speed={1000}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          className="cursor-pointer"
        >
          <SwiperSlide style={swiperStyle}>
            <div className="relative">
              <div className="absolute pl-16 mt-[110px] top-0 left-0">
                <div className="w-20 py-1 border text-center text-gray-500">
                  이벤트
                </div>
                <h2 className="mt-5 py-1 text-4xl font-bold">
                  하나플레이리스트 콘서트
                </h2>
                <h2 className="py-1 text-4xl font-bold">티켓 응모 이벤트</h2>
                <div className="mt-4 text-gray-500">
                  <p>하플콘이 돌아왔다!</p>
                  <p>지금 바로 티켓 응모하세요!</p>
                </div>
                <div className="mt-12 w-28 py-3 text-center text-white bottom-10 bg-black rounded-3xl">
                  자세히보기
                </div>
              </div>
              <img
                src={process.env.PUBLIC_URL + "/images/parent/p1.png"}
                className="w-full "
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide style={swiperStyle}>
            <div className="relative">
              <div className="absolute pl-16 mt-[105px] top-0 left-0">
                <div className="w-20 py-1 border text-center text-gray-500">
                  이벤트
                </div>
                <h2 className="mt-5 py-1 text-4xl font-bold">가맹점도</h2>
                <h2 className="py-1 text-4xl font-bold">하나로하세요!</h2>
                <div className="mt-4 text-gray-500">
                  <p>#가맹점 카드대금 입금계좌 이벤트</p>
                  <p>#최대 5만 하나머니</p>
                </div>
                <div className="mt-12 w-28 py-3 text-center text-white bottom-10 bg-black rounded-3xl">
                  자세히보기
                </div>
              </div>
              <img
                src={process.env.PUBLIC_URL + "/images/parent/p2.png"}
                className="w-full "
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide style={swiperStyle}>
            <div className="relative">
              <div className="absolute pl-16 mt-[105px] top-0 left-0">
                <div className="w-20 py-1 border text-center text-gray-500">
                  이벤트
                </div>
                <h2 className="mt-5 py-1 text-4xl font-bold">알고도 당하는</h2>
                <h2 className="py-1 text-4xl font-bold">무서운 보이스피싱</h2>
                <div className="mt-5 text-gray-500">
                  <p>하나은행이 지켜드릴게요!</p>
                </div>
                <div className="mt-12 w-28 py-3 text-center text-white bottom-10 bg-black rounded-3xl">
                  자세히보기
                </div>
              </div>
              <img
                src={process.env.PUBLIC_URL + "/images/parent/p3.png"}
                className="w-full "
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide style={swiperStyle}>
            <div className="relative">
              <div className="absolute pl-16 mt-[110px] top-0 left-0">
                <div className="w-20 py-1 border text-center text-gray-500">
                  이벤트
                </div>
                <h2 className="mt-5 py-1 text-4xl font-bold">
                  8월 1일은 하나데이
                </h2>
                <div className="mt-5 text-gray-500">
                  <p>아이스크림 케이크 111명</p>
                  <p>하나머니 랜덤 100% 당첨!</p>
                  <p>8월 21일은 한번 더 기회!</p>
                </div>
                <div className="mt-12 w-28 py-3 text-center text-white bottom-10 bg-black rounded-3xl">
                  자세히보기
                </div>
              </div>
              <img
                src={process.env.PUBLIC_URL + "/images/parent/p4.png"}
                className="w-full "
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide style={swiperStyle}>
            <div className="relative">
              <div className="absolute pl-16 mt-[120px] top-0 left-0">
                <div className="w-20 py-1 border text-center text-gray-500">
                  이벤트
                </div>
                <h2 className="mt-5 py-1 text-4xl font-bold">아이부자카드</h2>
                <h2 className="py-1 text-4xl font-bold">즉시 혜택 이벤트</h2>
                <div className="mt-5 text-gray-500">
                  <p>첫 결제 시 3천원 증정!</p>
                  <p>결제만 하면 쿠폰 추첨!</p>
                </div>
                <div className="mt-12 w-28 py-3 text-center text-white bottom-10 bg-black rounded-3xl">
                  자세히보기
                </div>
              </div>
              <img
                src={process.env.PUBLIC_URL + "/images/parent/p5.png"}
                className="w-full "
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide style={swiperStyle}>
            <div className="relative">
              <div className="absolute pl-16 mt-[120px] top-0 left-0">
                <div className="w-20 py-1 border text-center text-gray-500">
                  이벤트
                </div>
                <h2 className="mt-5 py-1 text-4xl font-bold">
                  다(多)통화 환전하고
                </h2>
                <h2 className="py-1 text-4xl font-bold">1+1 선물 받자</h2>
                <div className="mt-5 text-gray-500">
                  <p>#신라호텔 파크뷰 1+1</p>
                </div>
                <div className="mt-12 w-28 py-3 text-center text-white bottom-10 bg-black rounded-3xl">
                  자세히보기
                </div>
              </div>
              <img
                src={process.env.PUBLIC_URL + "/images/parent/p6.png"}
                className="w-full "
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
