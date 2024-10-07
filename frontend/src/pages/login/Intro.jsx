import { useEffect, useRef } from "react";
import "animate.css";
import Login from "./Login";
import Footer from "../common/Footer";
import { IoIosArrowDown } from "react-icons/io";

export default function Intro() {
  const section1Ref = useRef(null);
  const section2Ex1Ref = useRef(null);
  const section2Ex2Ref = useRef(null);
  const section2Text1Ref = useRef(null);
  const section2Text2Ref = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  const btn3Ref = useRef(null);

  useEffect(() => {
    let currentHeight = window.innerHeight;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY <= 0) {
        section2Ex1Ref.current.classList.remove("animate__fadeInLeft");
        section2Ex2Ref.current.classList.remove("animate__fadeInRight");
        section2Text1Ref.current.classList.remove(
          "animate__fadeIn",
          "animate__slower"
        );
        section2Text2Ref.current.classList.remove(
          "animate__fadeIn",
          "animate__slower"
        );
      } else {
        section2Ex1Ref.current.classList.add("animate__fadeInLeft");
        section2Ex2Ref.current.classList.add("animate__fadeInRight");
        section2Text1Ref.current.classList.add(
          "animate__fadeIn",
          "animate__slower"
        );
        section2Text2Ref.current.classList.add(
          "animate__fadeIn",
          "animate__slower"
        );
      }
    };

    const handleResize = () => {
      currentHeight = window.innerHeight;
    };

    const handleBtn1Click = () => {
      window.scrollTo({
        top: currentHeight,
        behavior: "smooth",
      });
    };

    const handleBtn2Click = () => {
      window.scrollTo({
        top: currentHeight * 2,
        behavior: "smooth",
      });
    };

    const handleBtn3Click = () => {
      // window.location.href = "http://localhost:3000/";
      window.location.href = process.env.PUBLIC_URL + "/";
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    btn1Ref.current.addEventListener("click", handleBtn1Click);
    btn2Ref.current.addEventListener("click", handleBtn2Click);
    btn3Ref.current.addEventListener("click", handleBtn3Click);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      btn1Ref.current.removeEventListener("click", handleBtn1Click);
      btn2Ref.current.removeEventListener("click", handleBtn2Click);
      btn3Ref.current.removeEventListener("click", handleBtn3Click);
    };
  }, []);

  return (
    <div>
      <Section1 ref={section1Ref} btn1Ref={btn1Ref} />
      <Section2
        section2Ex1Ref={section2Ex1Ref}
        section2Ex2Ref={section2Ex2Ref}
        section2Text1Ref={section2Text1Ref}
        section2Text2Ref={section2Text2Ref}
        btn2Ref={btn2Ref}
      />
      <Section3 btn3Ref={btn3Ref} />
      {/* <Footer /> */}
    </div>
  );
}

function Section1({ btn1Ref }) {
  return (
    <div className="relative  h-screen object-cover overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute w-full h-full top-[50%] left-[50%] object-cover"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <source
          src={process.env.PUBLIC_URL + "/images/ayj/hana_young.mp4"}
          type="video/mp4"
        />
      </video>
      <div className="absolute w-full h-screen top-0 bg-black opacity-30"></div>
      <div className="absolute w-full h-screen text-center text-[4rem] text-white font-hana font-bold top-0 flex flex-col justify-center items-center">
        <div>건강한 금융 습관을 원해?</div>
        <div className="text-emerald-400">하나에서 만나 Young</div>
        <div
          ref={btn1Ref}
          className="w-12 h-12 cursor-pointer animate__animated animate__fadeOutDown animate__infinite animate__slow"
        >
          <IoIosArrowDown size="75" />
        </div>
      </div>
    </div>
  );
}

function Section2({
  section2Ex1Ref,
  section2Ex2Ref,
  section2Text1Ref,
  section2Text2Ref,
  btn2Ref,
}) {
  return (
    <div className="h-screen bg-stone-300 relative">
      <div className="w-[90%] h-full mx-auto flex flex-col">
        <div className="flex-1 flex">
          <div
            ref={section2Ex1Ref}
            className="flex-1 flex justify-start items-end animate__animated"
          >
            <div className="bg-white w-[90%] h-[90%] rounded-xl shadow-md flex justify-center items-center">
              <img
                src={process.env.PUBLIC_URL + "/images/intro/1.png"}
                alt=""
                className="w-[450px]"
              />
            </div>
          </div>
          <div
            ref={section2Text1Ref}
            className="flex-1 flex flex-col justify-center text-right font-hana text-[3.5rem] p-14 animate__animated"
          >
            <p>챌린지를 통한</p>
            <p>재미있는 금융 습관 형성</p>
          </div>
        </div>
        <div className="flex-1 flex">
          <div
            ref={section2Text2Ref}
            className="flex-1 flex flex-col justify-center font-hana text-[3.5rem] p-14 animate__animated"
          >
            <p>가계부와</p>
            <p>소비계획 작성까지</p>
          </div>
          <div
            ref={section2Ex2Ref}
            className="flex-1 flex justify-end items-start animate__animated"
          >
            <div className="bg-white w-[90%] h-[90%] rounded-xl shadow-md flex justify-center items-center">
              <img
                src={process.env.PUBLIC_URL + "/images/intro/2.png"}
                alt=""
                className="w-[450px]"
              />
            </div>
          </div>
        </div>
        <div
          ref={btn2Ref}
          className="absolute bottom-20 left-[50%] right-[50%] w-12 h-12 cursor-pointer animate__animated animate__fadeOutDown animate__infinite animate__slow"
        >
          <IoIosArrowDown size="75" />
        </div>
      </div>
    </div>
  );
}

function Section3({ btn3Ref }) {
  return (
    <div className="h-screen bg-stone-400">
      <div className="relative h-[calc(100vh-125px)] text-right">
        <div
          id="content-text"
          className="absolute w-full h-full flex flex-col justify-center items-center text-black font-hana text-[3.5rem]"
        >
          <div>청소년을 위한 금융 서비스</div>
          <div>지금 시작하세요</div>
          <div
            ref={btn3Ref}
            className="mt-20 text-3xl border-2 border-black px-36 py-3 hover:bg-gray-500 hover:border-gray-500 hover:text-white transition-all duration-300 cursor-pointer"
          >
            시작하기
          </div>
        </div>
        <div className="w-full h-full flex justify-end">
          <img
            src={process.env.PUBLIC_URL + "/images/ayj/2.png"}
            className="h-full"
            alt=""
          />
        </div>
        <Footer bgColor={"bg-black"} color={"text-white"} />
      </div>
    </div>
  );
}
