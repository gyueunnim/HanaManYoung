import { useEffect, useState } from "react";
import { MAN_YOUNG_URL } from "../../../etc/url";
import axios from "axios";
import LoadingSpinner from "../../common/LoadingSpinner";

export default function UserComponent() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("id");
  const [searchText, setSearchText] = useState("");

  const getUserById = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${MAN_YOUNG_URL}/user/get/id/${searchText}`
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserBySchool = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${MAN_YOUNG_URL}/user/get/school/${searchText}`
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserByName = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${MAN_YOUNG_URL}/user/get/name/${searchText}`
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserByAddress = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${MAN_YOUNG_URL}/user/get/addr/${searchText}`
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${MAN_YOUNG_URL}/user/get/all`);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserByCategory = async () => {
    if (category === "id") {
      getUserById();
    } else if (category === "school") {
      getUserBySchool();
    } else if (category === "name") {
      getUserByName();
    } else {
      getUserByAddress();
    }
  };
  return (
    <>
      <div className="p-10">
        <h1 className="text-3xl font-bold">회원 조회</h1>
        <div className="mt-10 flex items-center text-xl gap-2">
          <select
            className="w-[20%] h-14 text-center border border-gray-400 rounded-xl"
            name=""
            id=""
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="id">아이디</option>
            <option value="school">학교</option>
            <option value="name">이름</option>
            <option value="address">주소</option>
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
              getUserByCategory();
            }}
          >
            검색
          </div>
          <div
            className="w-[10%] btn-hana-green text-white text-center py-3 cursor-pointer hover:opacity-80 duration-300 rounded-xl"
            onClick={() => {
              getAllUsers();
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
        <p className="w-[5%]">번호</p>
        <p className="w-[10%]">아이디</p>
        <p className="w-[10%]">이름</p>
        <p className="w-[20%]">주소</p>
        <p className="w-[15%]">이메일</p>
        <p className="w-[10%]">전화번호</p>
        <p className="w-[10%]">학교</p>
        <p className="w-[10%]">가입일</p>
        <p className="w-[10%]">회원상태</p>
      </div>
      <div className="text-xs">
        {data.map((d, index) => {
          return (
            <div className="flex font-basic" key={index}>
              <p className="w-[5%] border p-1 font-bold text-center">{index}</p>
              <p className="w-[10%] border p-1">{d.user_login_id}</p>
              <p className="w-[10%] border p-1">{d.user_name}</p>
              <p className="w-[20%] border p-1">{d.user_address}</p>
              <p className="w-[15%] border p-1">{d.user_email}</p>
              <p className="w-[10%] border p-1 text-center">{d.user_phone}</p>
              <p className="w-[10%] border p-1">{d.user_school}</p>
              <p className="w-[10%] border p-1 text-center">{d.user_date}</p>
              <p className="w-[10%] border p-1 text-center">{d.code_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
