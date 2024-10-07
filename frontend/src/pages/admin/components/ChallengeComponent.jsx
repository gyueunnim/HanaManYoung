import { useEffect, useState } from "react";
import { MAN_YOUNG_URL } from "../../../etc/url";
import axios from "axios";
import LoadingSpinner from "../../common/LoadingSpinner";

export default function ChallengeComponent() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("user_id");
  const [searchText, setSearchText] = useState("");

  const getChallenge = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${MAN_YOUNG_URL}/challenge/get/all`);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getChallengeByName = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${MAN_YOUNG_URL}/challenge/get/name/${searchText}`
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getChallengeById = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${MAN_YOUNG_URL}/challenge/get/id/${searchText}`
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getChallengeByCategory = async () => {
    if (category === "user_id") {
      getChallengeById();
    } else {
      getChallengeByName();
    }
  };
  return (
    <>
      <div className="p-10">
        <h1 className="text-3xl font-bold">챌린지 조회</h1>
        <div className="mt-10 flex items-center text-xl gap-2">
          <select
            className="w-[20%] h-14 text-center border border-gray-400 rounded-xl"
            name=""
            id=""
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="user_id">아이디</option>
            <option value="challenge_name">챌린지 이름</option>
          </select>
          <input
            className="w-[60%] px-10 h-14 border border-gray-400 rounded-xl"
            placeholder="검색할 항목을 입력해주세요"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <div
            className="w-[10%] btn-hana-blue text-white text-center py-3 cursor-pointer hover:opacity-80 duration-300 rounded-xl"
            onClick={() => {
              getChallengeByCategory();
            }}
          >
            검색
          </div>
          <div
            className="w-[10%] btn-hana-green text-white text-center py-3 cursor-pointer hover:opacity-80 duration-300 rounded-xl"
            onClick={() => {
              getChallenge();
            }}
          >
            전체 조회
          </div>
        </div>
      </div>
      {result.length === 0 ? (
        <div className="h-[500px] flex justify-center items-center">
          검색 목록이 없습니다.
        </div>
      ) : (
        <Result data={result} />
      )}
      <div className="min-h-[500px] flex justify-center items-center">
        {isLoading && <LoadingSpinner />}
      </div>
    </>
  );
}

function Result({ data }) {
  if (data === undefined) return <div>검색 목록이 없습니다.</div>;
  return (
    <div>
      <div className="mt-6 py-4 flex text-center bg-slate-100">
        <p className="w-[10%]">번호</p>
        <p className="w-[20%]">챌린지명</p>
        <p className="w-[30%]">챌린지 요약</p>
        <p className="w-[20%]">아이디</p>
        <p className="w-[20%]">일자</p>
      </div>
      <div className="text-xs">
        {data.map((d, index) => {
          return (
            <div className="flex font-basic" key={index}>
              <p className="w-[10%] border p-1 font-bold text-center">
                {index}
              </p>
              <p className="w-[20%] border p-1">{d.code_name}</p>
              <p className="w-[30%] border p-1">{d.code_description}</p>
              <p className="w-[20%] border p-1">{d.user_id}</p>
              <p className="w-[20%] border p-1 text-center">
                {d.challenge_record_date}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
