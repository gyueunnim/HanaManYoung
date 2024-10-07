import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { IoIosArrowForward } from "react-icons/io";
import Loading from "../../common/Loading";
import Slide1 from "./sections/Slide1";
import { year, date, month } from "../../../js/getDateInfo";
import { useSelector } from "react-redux";
import Slide2 from "./sections/Slide2";
import Slide3 from "./sections/Slide3";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { BANK_CARD_URL, MAN_YOUNG_URL } from "../../../etc/url";
import PointSuccess from "../../common/PointSuccess";

const swiperStyle = {
  width: "100%",
  height: "auto",
};

const INITIAL_CATEGORY_SUMS = {
  CT_FOOD: 0,
  CT_BEAUTY: 0,
  CT_TRAFFIC: 0,
  CT_HOBBY: 0,
  CT_EDU: 0,
  CT_SHOP: 0,
  CT_ETC: 0,
};

export default function Diary() {
  const swiperRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [consumeChartData, setConsumeChartData] = useState([]);
  const [categorySums, setCategorySums] = useState(INITIAL_CATEGORY_SUMS);

  const user = useSelector((state) => state.user);
  const [accountTransactions, setAccountTransactions] = useState([]);
  const [diaryItems, setDiaryItems] = useState([]);
  const [account, setAccount] = useState({});

  const [plannerItems, setPlannerItems] = useState({
    CT_FOOD: 0,
    CT_BEAUTY: 0,
    CT_TRAFFIC: 0,
    CT_HOBBY: 0,
    CT_EDU: 0,
    CT_SHOP: 0,
    CT_ETC: 0,
  });

  useEffect(() => {
    const getProfileInfo = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(`
        ${BANK_CARD_URL}/api/profile/${user.user_login_id}`);
        setAccountTransactions(result.data.accountTransactions);
        setAccount(result.data.accountList[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProfileInfo();
  }, [user.user_login_id]);

  useEffect(() => {
    const calculateCategorySums = () => {
      const newCategorySums = { ...INITIAL_CATEGORY_SUMS };

      diaryItems.forEach((item) => {
        if (
          item.consume_type &&
          newCategorySums[item.consume_type] !== undefined
        ) {
          newCategorySums[item.consume_type] += parseInt(item.acc_t_amount);
        }
      });

      setCategorySums(newCategorySums);
    };

    calculateCategorySums();
  }, [diaryItems]);

  useEffect(() => {
    setDiaryItems(accountTransactions);
  }, [accountTransactions]);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.activeIndex;
      setCurrentSlide(currentIndex);
    }
  };

  const handleSelectChange = (index, newCategory) => {
    const updatedTransactions = [...accountTransactions];
    updatedTransactions[index].consume_type = newCategory;
    setAccountTransactions(updatedTransactions); // Update the original transactions array
  };

  const areAllCategoriesAssigned = () => {
    return accountTransactions.every(
      (transaction) =>
        transaction.consume_type && transaction.consume_type !== "none"
    );
  };

  const handleAddPoint = () => {
    try {
      axios.post(
        `${MAN_YOUNG_URL}/diary/registerPlanner/${user.user_login_id}`,
        {
          plannerItems, // 소비계획
          categorySums, // 가계부
        }
      );
    } catch (error) {
      console.error(error);
    }
    try {
      axios.post(
        `${BANK_CARD_URL}/api/challenge/reward/${user.user_login_id}`,
        {
          acc_t_target: "소비계획/가계부",
          acc_t_amount: 50,
        }
      );
    } catch (error) {
      console.error(error);
    }
    onOpen();
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-[90%] mx-auto flex flex-col animate__animated animate__fadeIn">
      <h1 className="mt-4 text-2xl font-bold">
        소비계획 / 가계부
        <span className="ml-3 text-sm text-gray-400">
          {year + "년 " + month + "월 " + date + "일"}
        </span>
      </h1>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          handleSlideChange();
        }}
        onSlideChange={handleSlideChange}
        modules={[Pagination, Navigation]}
        className="w-full"
        allowTouchMove={false}
        spaceBetween={150}
        speed={1000}
      >
        <SwiperSlide style={swiperStyle}>
          <Slide1
            consumeChartData={consumeChartData}
            categorySums={categorySums}
            handleSelectChange={handleSelectChange}
            accountTransactions={accountTransactions}
            account={account}
          />
        </SwiperSlide>
        <SwiperSlide style={swiperStyle}>
          <Slide2
            categorySums={categorySums}
            accountTransactions={accountTransactions}
          />
        </SwiperSlide>
        <SwiperSlide style={swiperStyle}>
          <Slide3
            plannerItems={plannerItems}
            setPlannerItems={setPlannerItems}
          />
        </SwiperSlide>
      </Swiper>
      {currentSlide === 2 ? (
        <div
          className="my-3 px-2 py-4 text-2xl text-center rounded-2xl bg-gradient-to-r from-indigo-200 to-fuchsia-200 transform hover:opacity-85 duration-300 cursor-pointer flex justify-center"
          onClick={() => {
            handleAddPoint();
          }}
        >
          <div className="flex items-center">
            <img
              src={
                process.env.PUBLIC_URL + "/images/hana/hana_money_rounded.png"
              }
              alt=""
              className="w-8 mr-2"
            />
            <p>하나머니 챌린지 포인트 적립</p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => swiperRef.current && swiperRef.current.slideNext()}
          disabled={!areAllCategoriesAssigned()}
          className={`w-full my-5 py-4 text-center text-2xl rounded-2xl cursor-pointer transition-all duration-300 ease-in-out text-white btn-hana-blue ${
            areAllCategoriesAssigned()
              ? "hover:opacity-85"
              : "opacity-85 cursor-default"
          }`}
        >
          <div className="relative flex justify-center items-center group">
            <p>
              {currentSlide === 0 ? "소비계획 비교하기" : "소비계획 작성하기"}
            </p>
            <IoIosArrowForward
              size="30"
              className={`absolute right-16 text-white duration-300 ${
                areAllCategoriesAssigned() ? "group-hover:translate-x-4" : ""
              }`}
            />
          </div>
        </button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>하나머니 챌린지 포인트 적립</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PointSuccess onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
