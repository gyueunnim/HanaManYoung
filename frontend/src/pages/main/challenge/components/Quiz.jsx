import { useEffect, useState } from "react";

import { FaCircleDot, FaRegCircleDot } from "react-icons/fa6";
import { BANK_CARD_URL, MAN_YOUNG_URL, SERVER_URL } from "../../../../etc/url";

import axios from "axios";
import LoadingModal from "../../../common/LoadingModal";
import { ModalBody } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function Quiz() {
  const [selected, setSelected] = useState(0);
  const [quizData, setQuizData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [modalContent, setModalContent] = useState(0);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    setTimeout(() => {
      const getQuiz = async () => {
        try {
          const result = await axios.get(`${MAN_YOUNG_URL}/challenge/get/quiz`);
          setQuizData(result.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      getQuiz();
    }, 1500);
  }, []);

  const handleSubmit = () => {
    if (selected + 1 === quizData.quiz_answer) {
      setModalContent(1);
    } else {
      setModalContent(2);
    }
  };

  const handleAddPoint = () => {
    try {
      axios.post(
        `${MAN_YOUNG_URL}/challenge/register/quiz/${user.user_login_id}`
      );
      axios.post(
        `${BANK_CARD_URL}/api/challenge/reward/${user.user_login_id}`,
        {
          acc_t_target: "오늘의 퀴즈",
          acc_t_amount: 50,
        }
      );
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  const handleRetry = () => {
    setModalContent(0);
    setSelected();
  };

  if (isLoading) return <LoadingModal />;
  return (
    <ModalBody>
      {modalContent === 0 ? (
        <QuizData
          quizData={quizData}
          setSelected={setSelected}
          selected={selected}
          handleSubmit={handleSubmit}
        />
      ) : modalContent === 1 ? (
        <Correct handleAddPoint={handleAddPoint} />
      ) : (
        <Wrong handleRetry={handleRetry} />
      )}
    </ModalBody>
  );
}

function QuizData({ quizData, setSelected, selected, handleSubmit }) {
  return (
    <>
      <div className="text-xl font-basic">
        <div className="font-bold flex">
          <div className="mr-2 text-emerald-600">Q. </div>
          <div className="leading-8">{quizData.quiz_title}</div>
        </div>
        <div className="my-8">
          <div
            className={
              "my-3 px-4 py-5 border-2 rounded-xl cursor-pointer transition-all duration-300 flex items-center " +
              (selected === 0 ? "border-emerald-600" : "hover:opacity-60")
            }
            onClick={() => setSelected(0)}
          >
            {selected === 0 ? (
              <FaCircleDot className="mr-4 text-emerald-600" size="25" />
            ) : (
              <FaRegCircleDot className="mr-4 text-gray-400" size="25" />
            )}
            <p>① {quizData.quiz_answer_1}</p>
          </div>
          <div
            className={
              "my-3 px-4 py-5 border-2 rounded-xl cursor-pointer transition-all duration-300 flex items-center " +
              (selected === 1 ? "border-emerald-600" : "hover:opacity-60")
            }
            onClick={() => setSelected(1)}
          >
            {selected === 1 ? (
              <FaCircleDot className="mr-4 text-emerald-600" size="25" />
            ) : (
              <FaRegCircleDot className="mr-4 text-gray-400" size="25" />
            )}
            <p>② {quizData.quiz_answer_2}</p>
          </div>
          <div
            className={
              "my-3 px-4 py-5 border-2 rounded-xl cursor-pointer transition-all duration-300 flex items-center " +
              (selected === 2 ? "border-emerald-600" : "hover:opacity-60")
            }
            onClick={() => setSelected(2)}
          >
            {selected === 2 ? (
              <FaCircleDot className="mr-4 text-emerald-600" size="25" />
            ) : (
              <FaRegCircleDot className="mr-4 text-gray-400" size="25" />
            )}
            <p>③ {quizData.quiz_answer_3}</p>
          </div>
          <div
            className={
              "my-3 px-4 py-5 border-2 rounded-xl cursor-pointer transition-all duration-300 flex items-center " +
              (selected === 3 ? "border-emerald-600" : "hover:opacity-60")
            }
            onClick={() => setSelected(3)}
          >
            {selected === 3 ? (
              <FaCircleDot className="mr-4 text-emerald-600" size="25" />
            ) : (
              <FaRegCircleDot className="mr-4 text-gray-400" size="25" />
            )}
            <p>④ {quizData.quiz_answer_4}</p>
          </div>
        </div>
      </div>
      <div
        className="mb-4 py-3 text-white text-xl text-center rounded-lg btn-hana-green cursor-pointer hover:opacity-85 transition-all duration-300"
        onClick={() => handleSubmit()}
      >
        제출하기
      </div>
    </>
  );
}

function Correct({ handleAddPoint }) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full h-56 flex flex-col justify-center items-center animate__animated animate__jackInTheBox">
        <div className="mt-4 mb-2 text-xl">정답입니다!</div>
        <img
          src={process.env.PUBLIC_URL + "/images/hana/webp/correct.webp"}
          alt=""
          className="w-[40%]"
        />
        <p className="my-2 text-sm text-gray-600">내일도 도전해요!</p>
      </div>
      <div
        className="w-full my-4 px-2 py-3 text-lg text-center rounded-xl bg-gradient-to-r from-indigo-200 to-fuchsia-200 transform hover:opacity-85 duration-300 cursor-pointer flex justify-center"
        onClick={() => {
          handleAddPoint();
        }}
      >
        <div className="flex items-center">
          <img
            src={process.env.PUBLIC_URL + "/images/hana/hana_money_rounded.png"}
            alt=""
            className="w-8 mr-2"
          />
          <p>하나머니 챌린지 포인트 적립</p>
        </div>
      </div>
    </div>
  );
}

function Wrong({ handleRetry }) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full h-56 flex flex-col justify-center items-center animate__animated animate__jackInTheBox">
        <div className="mt-4 mb-2 text-xl">오답입니다</div>
        <img
          src={process.env.PUBLIC_URL + "/images/hana/webp/wrong.webp"}
          alt=""
          className="w-[35%]"
        />
        <p className="my-2 text-sm text-gray-600">한번 더...?</p>
      </div>
      <div
        className="w-full my-4 px-2 py-3 text-lg text-center text-white rounded-xl btn-hana-blue  transform hover:opacity-85 duration-300 cursor-pointer flex justify-center"
        onClick={() => {
          handleRetry();
        }}
      >
        <div className="flex items-center font-bold">
          <p>다시 도전하기</p>
        </div>
      </div>
    </div>
  );
}
