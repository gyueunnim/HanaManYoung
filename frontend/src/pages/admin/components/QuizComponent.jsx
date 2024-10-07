import { useState } from "react";
import { MAN_YOUNG_URL } from "../../../etc/url";
import axios from "axios";
import LoadingSpinner from "../../common/LoadingSpinner";

export default function QuizComponent() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [detailMenu, setDetailMenu] = useState(0);
  const getQuiz = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${MAN_YOUNG_URL}/challenge/get/quiz/all`
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="p-10">
        <h1 className="text-3xl font-bold">퀴즈 관리</h1>
        <div className="mt-10 flex text-xl">
          <div
            className="w-[10%] text-center text-white btn-hana-green py-3 cursor-pointer hover:opacity-80 duration-300 rounded-xl"
            onClick={() => {
              getQuiz();
            }}
          >
            전체 조회
          </div>
        </div>
      </div>
      <div className="min-h-[500px] flex justify-center items-center">
        {isLoading && <LoadingSpinner />}
        {result.length === 0 ? (
          "검색 항목이 없습니다."
        ) : (
          <Result data={result} />
        )}
      </div>
    </>
  );
}

function Result({ data }) {
  if (data === undefined) return <div>검색 목록이 없습니다.</div>;
  return (
    <div className="w-full">
      <div className="mt-2 py-4 flex text-center bg-slate-100">
        <p className="w-[5%]">번호</p>
        <p className="w-[40%]">제목</p>
        <p className="w-[12.5%]">답안1</p>
        <p className="w-[12.5%]">답안2</p>
        <p className="w-[12.5%]">답안3</p>
        <p className="w-[12.5%]">답안4</p>
        <p className="w-[5%]">답</p>
      </div>
      <div className="text-xs">
        {data.map((d, index) => {
          return (
            <div className="flex">
              <p className="w-[5%] text-center border p-1 font-bold">{index}</p>
              <p className="w-[40%] border p-1">{d.quiz_title}</p>
              <p className="w-[12.5%] border p-1">{d.quiz_answer_1}</p>
              <p className="w-[12.5%] border p-1">{d.quiz_answer_2}</p>
              <p className="w-[12.5%] border p-1">{d.quiz_answer_3}</p>
              <p className="w-[12.5%] border p-1">{d.quiz_answer_4}</p>
              <p className="w-[5%] border p-1 text-center">{d.quiz_answer}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
