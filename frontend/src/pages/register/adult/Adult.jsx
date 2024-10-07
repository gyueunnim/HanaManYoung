import { useEffect, useRef, useState } from "react";
import { swiperStyle } from "../../../css/swiperStyle";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import JSConfetti from "js-confetti";

import {
  Section1,
  Section2,
  Section4,
  Section5,
  Section6,
} from "./sections/Sections";

import SwipeButton from "./components/SwipeButton";
import AddressFinder from "../../common/AddressFinder";

export default function Adult() {
  const swiperRef = useRef(0);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [jsConfetti, setJsConfetti] = useState(false);

  const [userName, setUserName] = useState("");
  const [ssnFront, setFrontSsn] = useState("");
  const [ssnBack, setBackSsn] = useState("");

  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [postcode, setPostcode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [jibunAddress, setJibunAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");

  const [email, setEmail] = useState("");
  const [emailDomain, setEmailDomain] = useState("naver.com");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(0);
  const [userInfo, setUserInfo] = useState({
    userType: "m_par",
    userName: "",
    ssn: "",
    phoneNumber: "",
    address: roadAddress + " " + detailAddress,
    email: "",
    school: "",
    id: "",
    password: "",
  });

  const [btnActive, setBtnActive] = useState(false);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.activeIndex;
      setCurrentSlide(currentIndex);
      if (currentIndex === 5 && jsConfetti) {
        jsConfetti.addConfetti({
          confettiColors: ["#FDBB37"],
          confettiNumber: 500,
        });
      }
    }
  };

  const handleRegist = () => {
    swiperRef.current.slideNext();
  };

  useEffect(() => {
    const isSlideValid = () => {
      switch (currentSlide) {
        case 0:
          return (
            userName.length > 0 && ssnFront.length === 6 && ssnBack.length === 7
          );
        case 1:
          return (
            id.length > 0 && isValidPassword === 1 && password === passwordCheck
          );
        case 2:
          return roadAddress.length > 0 && detailAddress.length > 0;
        case 3:
          return (
            email.length > 0 &&
            phoneNumber1.length === 4 &&
            phoneNumber2.length === 4
          );
        case 4:
          // return school.length > 0;
          return true;
        case 5:
          // return school.length > 0;
          return true;
        default:
          return false;
      }
    };

    setBtnActive(isSlideValid());

    setUserInfo({
      userType: "m_stu",
      userName: userName,
      ssn: ssnFront + "-" + ssnBack,
      phoneNumber: "010" + phoneNumber1 + phoneNumber2,
      address: roadAddress + " " + detailAddress,
      email: email + "@" + emailDomain,
      school: "",
      id: id,
      password: password,
      accountNumber: accountNumber,
    });
  }, [
    currentSlide,
    userName,
    ssnFront,
    ssnBack,
    phoneNumber1,
    phoneNumber2,
    email,
    id,
    password,
    passwordCheck,
    isValidPassword,
    emailDomain,
    roadAddress,
    detailAddress,
    accountNumber,
  ]);

  useEffect(() => {
    setJsConfetti(new JSConfetti());
  }, []);

  useEffect(() => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (password) {
      passwordRegex.test(password)
        ? setIsValidPassword(1)
        : setIsValidPassword(2);
    } else {
      setIsValidPassword(0);
    }
  }, [password]);

  return (
    <div className="w-[80%] mt-8 animate__animated animate__fadeIn">
      {currentSlide === 4 ? (
        <div className="absolute right-3 bottom-52 py-2 px-3 w-0 md:w-36 lg:w-56 bg-slate-50 text-center text-sm rounded-lg shadow-md">
          <div>직장인을 위한 특별한 혜택</div>
          <div>「 달달 하나 통장 」</div>
          <div>
            급여 통장은 <span className="text-emerald-600 font-bold">하나</span>
            에서!
          </div>
        </div>
      ) : null}

      <h1 className="text-2xl">
        회원가입 <span className="text-base text-gray-500">(부모용)</span>
      </h1>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        modules={[Pagination, Navigation]}
        className="w-full"
        allowTouchMove={false}
        spaceBetween={150}
        speed={1000}
      >
        <SwiperSlide style={swiperStyle}>
          <Section1
            setUserName={setUserName}
            setFrontSsn={setFrontSsn}
            setBackSsn={setBackSsn}
          />
        </SwiperSlide>
        <SwiperSlide style={swiperStyle}>
          <Section2
            setId={setId}
            setPassword={setPassword}
            setPasswordCheck={setPasswordCheck}
            isValidPassword={isValidPassword}
            password={password}
            passwordCheck={passwordCheck}
          />
        </SwiperSlide>
        <SwiperSlide style={swiperStyle}>
          <AddressFinder
            setPostcode={setPostcode}
            setRoadAddress={setRoadAddress}
            setJibunAddress={setJibunAddress}
            setExtraAddress={setExtraAddress}
            setDetailAddress={setDetailAddress}
            postcode={postcode}
            roadAddress={roadAddress}
            jibunAddress={jibunAddress}
            detailAddress={detailAddress}
            extraAddress={extraAddress}
          />
        </SwiperSlide>
        <SwiperSlide style={swiperStyle}>
          <Section4
            setEmail={setEmail}
            setEmailDomain={setEmailDomain}
            setPhoneNumber1={setPhoneNumber1}
            setPhoneNumber2={setPhoneNumber2}
          />
        </SwiperSlide>
        <SwiperSlide style={swiperStyle}>
          <Section5 setAccountNumber={setAccountNumber} />
        </SwiperSlide>
        <SwiperSlide style={swiperStyle}>
          <Section6 />
        </SwiperSlide>
      </Swiper>

      <SwipeButton
        currentSlide={currentSlide}
        swiperRef={swiperRef}
        btnActive={btnActive}
        handleRegist={handleRegist}
      />
    </div>
  );
}
