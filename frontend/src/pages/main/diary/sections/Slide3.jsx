import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  getCategoryBgColor,
  getCategoryKor,
} from "../../../../js/getCategoryKor";
import { IoMdSquare } from "react-icons/io";
import ConsumePieChart from "../components/ConsumePieChart";
import { getKoreanNumber } from "../../../../js/getKoreanNumber";

export default function Slide3({ plannerItems, setPlannerItems }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [transformedItems, setTransformedItems] = useState([]);
  const [transformedItemsForChart, setTransformedItemsForChart] = useState([]);

  const [isPlannerEmpty, setIsPlannerEmpty] = useState(true);

  useEffect(() => {
    // 모든 plannerItems 값이 0인지 확인하여 isPlannerEmpty 상태를 업데이트
    const allZero = Object.values(plannerItems).every((value) => value === 0);
    setIsPlannerEmpty(allZero);

    // plannerItems를 변환하여 transformedItems에 저장 (음수 그대로 유지)
    const transformed = Object.entries(plannerItems).map(([key, value]) => ({
      name: key,
      value: value,
    }));

    // 음수 값을 0으로 변환한 배열 (차트용)
    const transformedForChart = Object.entries(plannerItems).map(
      ([key, value]) => ({
        name: key,
        value: -value < 0 ? 0 : -value, // 음수 값은 0으로
      })
    );

    setTransformedItems(transformed); // 원래 값
    setTransformedItemsForChart(transformedForChart); // 차트용 값
  }, [plannerItems]);

  // 모달 내 입력 필드를 관리하는 상태
  const [selectedCategory, setSelectedCategory] = useState("none");
  const [amount, setAmount] = useState("");

  const handleAddItem = () => {
    if (selectedCategory === "none" || amount === "") {
      alert("카테고리와 금액을 모두 입력해주세요.");
      return;
    }

    // amount가 '+'로 시작하면 그대로 사용하고, 그렇지 않으면 부호를 반전
    const reversedAmount = amount.startsWith("+")
      ? parseInt(amount)
      : -parseInt(amount);

    setPlannerItems((prevItems) => ({
      ...prevItems,
      [selectedCategory]: prevItems[selectedCategory] + reversedAmount,
    }));

    // 입력 필드 초기화
    setSelectedCategory("none");
    setAmount("");

    onClose();
  };

  return (
    <div>
      {isPlannerEmpty ? (
        <div className="mt-20 h-96 flex flex-col justify-center items-center">
          <img
            src={process.env.PUBLIC_URL + "/images/hana/byeoldol1.png"}
            alt=""
            className="w-48"
          />
          <div className="my-2 text-2xl">소비계획이 비었어요</div>
          <div className="text-base text-gray-500">
            <div className="my-1">포인트를 지급받기 위해선</div>
            <div className="my-1">소비계획을 추가해야해요</div>
          </div>
        </div>
      ) : (
        <div className="mt-6 w-[70%] mx-auto">
          <div className="w-full py-2 font-bold border-y-2 flex">
            <div className="w-[50%] text-center">카테고리</div>
            <div className="w-[50%] text-center">금액</div>
          </div>
          {transformedItems.map((item, index) => (
            <div
              key={index}
              className="py-2 border-b border-t-0 font-basic flex"
            >
              <div className="w-[50%] px-10 border-r flex">
                <IoMdSquare
                  size="25"
                  color={getCategoryBgColor(item.name)}
                  className="mr-1 w-[10%]"
                />
                <p>{getCategoryKor(item.name)}</p>
              </div>
              <div className="w-[50%] px-10 text-right">
                {item.value === 0
                  ? 0
                  : item.value > 0
                  ? `+${item.value.toLocaleString("ko-KR")}`
                  : item.value.toLocaleString("ko-KR")}
                원
              </div>
            </div>
          ))}
        </div>
      )}
      {!isPlannerEmpty && (
        <div className="w-[70%] mx-auto my-2 flex justify-center items-center">
          <div className="w-[55%]">
            <ConsumePieChart data={transformedItemsForChart} />
          </div>
          <div className="w-[45%] text-xs font-basic flex flex-wrap flex-col">
            {Object.keys(transformedItems).map(
              (key, index) =>
                transformedItems[key] !== 0 && (
                  <div
                    key={index}
                    className="py-1 flex items-center animate__animated animate__fadeInDown"
                  >
                    <IoMdSquare
                      size="25"
                      color={getCategoryBgColor(transformedItems[key].name)}
                      className="mr-1 w-[10%]"
                    />
                    <p className="mr-2 w-[50%]">
                      {getCategoryKor(transformedItems[key].name)}
                    </p>
                    <p className="w-[40%] text-right">
                      {transformedItems[key].value === 0
                        ? 0
                        : transformedItems[key].value > 0
                        ? `+${transformedItems[key].value.toLocaleString(
                            "ko-KR"
                          )}`
                        : transformedItems[key].value.toLocaleString("ko-KR")}
                    </p>
                  </div>
                )
            )}
          </div>
        </div>
      )}
      <div
        className="my-3 px-2 py-4 text-2xl text-center text-white rounded-2xl btn-hana-blue transform hover:opacity-85 duration-300 cursor-pointer flex justify-center"
        onClick={onOpen}
      >
        추가하기
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>소비계획 추가하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="mb-4 font-basic">
              <p className="mb-2 font-hana font-bold">카테고리</p>
              <select
                name="category"
                id="category"
                className="w-full py-2 border rounded-md text-lg text-center cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="none">카테고리 선택</option>
                <option value="CT_FOOD">식비/간식</option>
                <option value="CT_BEAUTY">미용/패션</option>
                <option value="CT_TRAFFIC">교통비</option>
                <option value="CT_HOBBY">문화/취미</option>
                <option value="CT_EDU">교육/학습</option>
                <option value="CT_SHOP">디지털 콘텐츠/쇼핑</option>
                <option value="CT_ETC">기타/예비/용돈</option>
              </select>
            </div>
            <div className="mb-4 font-basic">
              <p className="mb-2 font-hana font-bold">금액</p>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-2 py-2 border rounded-md text-lg border-gray-300"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="absolute top-2 right-2 text-right text-gray-400">
                  {getKoreanNumber(amount)}
                </div>
              </div>
            </div>
            <div
              className="mb-3 px-4 py-3 text-xl text-center text-white rounded-lg btn-hana-green cursor-pointer hover:opacity-80 duration-300"
              onClick={handleAddItem}
            >
              추가하기
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
