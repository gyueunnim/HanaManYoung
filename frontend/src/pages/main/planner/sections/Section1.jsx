import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import ConsumeChart from "../components/ConsumeChart";
import { FaRegChartBar } from "react-icons/fa";
import { LiaDrawPolygonSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MAN_YOUNG_URL } from "../../../../etc/url";
import axios from "axios";
import { getCategoryKor } from "../../../../js/getCategoryKor";
import { getCategoryIndex } from "../../../../js/getCategoryIndex";
import ConsumeRadarChart from "../components/ConsumeRadarChart";

export default function Section1() {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.user);
  const [consumeChartData, setConsumeChartData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);
  const [option, setOption] = useState(0);
  useEffect(() => {
    const getConsumeChartData = async () => {
      try {
        const result = await axios.get(
          `${MAN_YOUNG_URL}/user/getConsumeData/${user.user_login_id}`
        );
        const transformedData = transformData(result.data);
        setConsumeChartData(transformedData);
        setMaxValue(getMaxValue(transformedData[0]));
      } catch (error) {
        console.error(error);
      }
    };

    getConsumeChartData();
  }, []);

  const transformData = (data) => {
    // 카테고리와 기본 값으로 초기화
    const transformed = {
      name: "내 소비 동향",
      "식비/간식": 0,
      "미용/패션": 0,
      교통비: 0,
      "문화/취미": 0,
      "교육/학습": 0,
      "디지털 콘텐츠/쇼핑": 0,
      "기타/예비/용돈": 0,
    };

    // 데이터 집계
    data.forEach((item) => {
      const categoryName = getCategoryKor(item.diary_item_category);
      if (categoryName) {
        // 금액이 0 이하일 경우 0으로 설정
        const amount = Math.max(0, -item.diary_item_amount);
        transformed[categoryName] += amount;
      }
    });

    // "기타/예비/용돈"과 "식비/간식"을 제외한 항목들의 총합 계산
    const total = Object.entries(transformed).reduce((acc, [key, value]) => {
      value = parseInt(value);
      if (key !== "기타/예비/용돈" && key !== "식비/간식" && key !== "name") {
        return acc + value;
      }
      return acc;
    }, 0);

    // "기타/예비/용돈"과 "식비/간식"을 제외한 항목들만 백분율로 변환
    Object.keys(transformed).forEach((key) => {
      if (key !== "name" && key !== "기타/예비/용돈" && key !== "식비/간식") {
        transformed[key] = parseFloat(
          ((transformed[key] / total) * 100).toFixed(2)
        ); // 소수점 2자리까지 표시
      }
    });

    return [transformed];
  };

  const getMaxValue = (transformed) => {
    // 제외할 항목들
    const excludedKeys = ["name", "교통비", "식비/간식", "기타/예비/용돈"];

    // 최댓값과 그에 대응하는 key를 저장하는 객체
    const maxEntry = Object.entries(transformed)
      .filter(([key, value]) => !excludedKeys.includes(key)) // 제외할 항목 걸러내기
      .reduce(
        (max, [key, value]) => {
          const numericValue = parseFloat(value);
          if (!isNaN(numericValue) && numericValue > max.value) {
            return { key, value: numericValue }; // 더 큰 값이 있을 경우 업데이트
          }
          return max; // 현재 max 유지
        },
        { key: null, value: -Infinity }
      ); // 초기값 설정
    return maxEntry.key; // 최댓값의 key를 반환
  };

  return (
    <div className="w-full px-8 py-6 text-gray-500 bg-gradient-to-t from-indigo-100 to-fuchsia-100 rounded-xl shadow-md animate__animated animate__fadeIn">
      <h1 className="text-2xl text-gray-600 font-bold">내 소비 동향</h1>
      <div className="w-full flex items-center gap-5">
        <div className="w-[30%] text-center font-basic">
          <img
            src={
              process.env.PUBLIC_URL +
              `/images/ayj/${getCategoryIndex(maxValue)}.png`
            }
            width="100%"
            alt=""
          />
          <p className="mt-2 mr-2 text-lg">
            <span className="text-sm text-gray-800">내 소비 유형은?</span>
            <span className="mx-1 text-gray-700 text-4xl font-bold">
              {getCategoryIndex(maxValue)}
            </span>
            <span className="text-xs text-gray-800">유형</span>
          </p>
        </div>
        <div className="w-[70%]">
          <div className="mx-2 mb-1 font-basic flex justify-between">
            <p
              className="text-xs text-gray-600 border-b border-gray-600 cursor-pointer hover:opacity-80 duration-300"
              onClick={() => {
                onOpen();
              }}
            >
              소비 유형이 뭔가요?
            </p>
            <Tooltip
              label={
                <span
                  style={{
                    fontFamily: "Noto Sans KR",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  식비/간식을 제외한 이유는 해당 항목이 소비 비율에서 큰 부분을
                  차지하여 다른 소비 항목을 더 잘 분석하기 위해 제외했습니다
                </span>
              }
              aria-label="A tooltip"
              placement="top"
            >
              <span className="text-xs text-gray-500">
                식비/간식을 제외한 동향입니다
              </span>
            </Tooltip>
          </div>
          <div className="relative px-5 font-basic text-base bg-white flex justify-center items-center rounded-xl">
            <div className="absolute top-3 right-4 z-30 flex gap-3">
              <FaRegChartBar
                size="25"
                className={`hover:text-black duration-200 cursor-pointer ${
                  option === 0 ? "text-black" : "text-gray-300"
                }`}
                onClick={() => setOption(0)}
              />
              <LiaDrawPolygonSolid
                size="25"
                className={`hover:text-black duration-200 cursor-pointer ${
                  option === 1 ? "text-black" : "text-gray-300"
                }`}
                onClick={() => setOption(1)}
              />
            </div>
            {option === 0 ? (
              <ConsumeChart consumeChartData={consumeChartData} />
            ) : (
              <ConsumeRadarChart
                consumeChartData={consumeChartData}
                maxValue={maxValue}
              />
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered="true">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>소비 유형</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="ml-2 pb-4 font-basic flex flex-col items-center">
              <div className="w-[90%] text-lg font-bold py-4 flex items-center gap-4">
                <img
                  src={process.env.PUBLIC_URL + "/images/type/A.png"}
                  alt=""
                  className="w-[15%]"
                />
                <p className="w-[15%]">A유형</p>
                <p>관리를 열심히 하고 있어요</p>
              </div>
              <div className="w-[90%] text-lg font-bold py-4 flex items-center gap-4">
                <img
                  src={process.env.PUBLIC_URL + "/images/type/B.png"}
                  alt=""
                  className="w-[15%]"
                />
                <p className="w-[15%]">B유형</p>
                <p>취미활동에 진심이에요</p>
              </div>
              <div className="w-[90%] text-lg font-bold py-4 flex items-center gap-4">
                <img
                  src={process.env.PUBLIC_URL + "/images/type/C.png"}
                  alt=""
                  className="w-[15%]"
                />
                <p className="w-[15%]">C유형</p>
                <p>새로운 탐구를 즐기고 있어요</p>
              </div>
              <div className="w-[90%] text-lg font-bold py-4 flex items-center gap-4">
                <img
                  src={process.env.PUBLIC_URL + "/images/type/D.png"}
                  alt=""
                  className="w-[15%]"
                />
                <p className="w-[15%]">D유형</p>
                <p>집에서 하는게 편해요</p>
              </div>
              <p className="mt-4 text-center text-xs text-gray-600">
                가계부에서 작성한 카테고리를 바탕으로 분석한 유형입니다
              </p>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
