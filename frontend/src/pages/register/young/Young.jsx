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
  Section7,
  Section8,
} from "./sections/Sections";

import SwipeButton from "./components/SwipeButton";
import AddressFinder from "../../common/AddressFinder";
import axios from "axios";
import { date, month, year } from "../../../js/getDateInfo";
import { MAN_YOUNG_URL } from "../../../etc/url";

export default function Young() {
  const swiperRef = useRef(0);

  const [selectCard, setSelectCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [jsConfetti, setJsConfetti] = useState(false);

  const [userName, setUserName] = useState("");
  const [ssnFront, setFrontSsn] = useState("");
  const [ssnBack, setBackSsn] = useState("");
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");

  const [postcode, setPostcode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [jibunAddress, setJibunAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");

  const [email, setEmail] = useState("");
  const [emailDomain, setEmailDomain] = useState("naver.com");
  const [school, setSchool] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(0);
  const [accountCheck, setAccountCheck] = useState(false);
  const [cardCheck, setCardCheck] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const [accPw, setAccPw] = useState("");
  const [cardPw, setCardPw] = useState("");

  const [btnActive, setBtnActive] = useState(false);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.activeIndex;
      setCurrentSlide(currentIndex);
      if (currentIndex === 7 && jsConfetti) {
        jsConfetti.addConfetti({
          confettiColors: ["#FDBB37"],
          confettiNumber: 500,
        });
      }
    }
  };

  const handleRegist = () => {
    try {
      axios.post(`${MAN_YOUNG_URL}/user/register/young`, userInfo);
    } catch (error) {
      console.error(error);
    } finally {
      swiperRef.current.slideNext();
    }
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
          return school.length > 0;
        case 5:
          return accountCheck && accPw.length === 4;
        case 6:
          return cardCheck && selectCard !== null && cardPw.length === 4;
        case 7:
          return true;
        default:
          return false;
      }
    };

    setBtnActive(isSlideValid());

    setUserInfo({
      user_id: "",
      user_login_id: id,
      user_pw: password,
      user_name: userName,
      user_rrn: ssnFront + "-" + ssnBack,
      user_school: school,
      user_email: email + "@" + emailDomain,
      user_phone: "010" + phoneNumber1 + phoneNumber2,
      user_address: roadAddress + " " + detailAddress,
      user_type: "UT_01",
      user_st: "UST_02",
      user_date: year + "-" + month + "-" + date,
    });
  }, [
    currentSlide,
    userName,
    ssnFront,
    ssnBack,
    phoneNumber1,
    phoneNumber2,
    email,
    school,
    id,
    password,
    passwordCheck,
    accountCheck,
    selectCard,
    isValidPassword,
    cardCheck,
    emailDomain,
    roadAddress,
    detailAddress,
    cardPw,
    accPw,
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
      <h1 className="text-2xl">
        회원가입 <span className="text-base text-gray-500">(청소년용)</span>
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
          <Section5 school={school} setSchool={setSchool} />
        </SwiperSlide>
        <SwiperSlide style={swiperStyle}>
          <Section6
            accountCheck={accountCheck}
            setAccountCheck={setAccountCheck}
            accPw={accPw}
            setAccPw={setAccPw}
          />
        </SwiperSlide>
        <SwiperSlide style={swiperStyle}>
          <Section7
            selectCard={selectCard}
            setSelectCard={setSelectCard}
            cardCheck={cardCheck}
            setCardCheck={setCardCheck}
            cardPw={cardPw}
            setCardPw={setCardPw}
          />
        </SwiperSlide>
        <SwiperSlide style={swiperStyle}>
          <Section8 />
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
