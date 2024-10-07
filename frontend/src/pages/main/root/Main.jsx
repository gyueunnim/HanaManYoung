import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../css/swiper-custom.css";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

import BottomNav from "../../common/BottomNav";
import Section1 from "./sections/Section1";
import { Slides1, Slides2, Slides3, Slides4, Slides5 } from "./sections/Slides";

export default function Main() {
  const navigate = useNavigate();
  const swiperStyle = {
    width: "100%",
    height: "350px",
  };

  return (
    <>
      <div className="w-[90%] mx-auto animate__animated animate__fadeIn">
        <Section1 />
        <div className="mt-10 text-2xl">
          <h1 className="flex items-center">
            오늘의 <strong className="ml-2 text-3xl">챌린지</strong>가 기다리고
            있어요{" "}
            <img
              src={process.env.PUBLIC_URL + "/images/icons/flame.png"}
              width="30px"
              className="ml-1"
              alt=""
            />
          </h1>
        </div>
        <div className="w-[95%] mt-6 mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            allowTouchMove={false}
            spaceBetween={25}
            speed={1000}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            onClick={() => navigate(process.env.PUBLIC_URL + "/challenge")}
            className="cursor-pointer"
          >
            <SwiperSlide style={swiperStyle}>
              <Slides1 />
            </SwiperSlide>
            <SwiperSlide style={swiperStyle}>
              <Slides2 />
            </SwiperSlide>
            <SwiperSlide style={swiperStyle}>
              <Slides3 />
            </SwiperSlide>
            <SwiperSlide style={swiperStyle}>
              <Slides4 />
            </SwiperSlide>
            <SwiperSlide style={swiperStyle}>
              <Slides5 />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="mt-12 border-t">
        <BottomNav />
      </div>
    </>
  );
}
