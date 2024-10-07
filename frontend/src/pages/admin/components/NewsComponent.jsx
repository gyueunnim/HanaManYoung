import { useState } from "react";
import { MAN_YOUNG_URL } from "../../../etc/url";
import axios from "axios";
import LoadingSpinner from "../../common/LoadingSpinner";

export default function NewsComponent() {
  const [result, setResult] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [detailMenu, setDetailMenu] = useState(0);
  const getNews = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${MAN_YOUNG_URL}/news/get`);
      if (
        response.data.financeList.length === 0 &&
        response.data.economyList.length === 0 &&
        response.data.stockList.length === 0
      )
        setResult(0);
      else setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="p-10">
        <h1 className="text-3xl font-bold">뉴스 관리</h1>
        <div className="mt-10 flex text-xl">
          <div
            className="w-[10%] text-center text-white btn-hana-green py-3 cursor-pointer hover:opacity-80 duration-300 rounded-xl"
            onClick={() => {
              getNews();
            }}
          >
            전체 조회
          </div>
        </div>
      </div>
      {result === 0 ? (
        <div className="h-[500px] flex justify-center items-center">
          검색 목록이 없습니다.
        </div>
      ) : (
        <div className="flex gap-3">
          <p
            className={`cursor-pointer px-5 py-2 border-blue-900 text-blue-900 border-2 rounded-xl hover:bg-blue-900 hover:text-white duration-300 ${
              detailMenu === 0 ? "btn-hana-blue text-white" : ""
            }`}
            onClick={() => {
              setDetailMenu(0);
            }}
          >
            금융
          </p>
          <p
            className={`cursor-pointer px-5 py-2 border-blue-900 text-blue-900 border-2 rounded-xl hover:bg-blue-900 hover:text-white duration-300 ${
              detailMenu === 1 ? "btn-hana-blue text-white" : ""
            }`}
            onClick={() => {
              setDetailMenu(1);
            }}
          >
            경제
          </p>
          <p
            className={`cursor-pointer px-5 py-2 border-blue-900 text-blue-900 border-2 rounded-xl hover:bg-blue-900 hover:text-white duration-300 ${
              detailMenu === 2 ? "btn-hana-blue text-white" : ""
            }`}
            onClick={() => {
              setDetailMenu(2);
            }}
          >
            증권
          </p>
        </div>
      )}
      <div className="min-h-[500px] flex justify-center items-center">
        {isLoading && <LoadingSpinner />}
        {detailMenu === 0 ? (
          <Result data={result.financeList} />
        ) : detailMenu === 1 ? (
          <Result data={result.economyList} />
        ) : (
          <Result data={result.stockList} />
        )}
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
        <p className="w-[12%]">제목</p>
        <p className="w-[33%]">내용</p>
        <p className="w-[12%]">단어1</p>
        <p className="w-[12%]">단어2</p>
        <p className="w-[12%]">단어3</p>
        <p className="w-[8%]">링크</p>
        <p className="w-[6%]">시간</p>
      </div>
      <div className="text-xs">
        {data.map((d, index) => {
          return (
            <div className="flex font-basic">
              <p className="w-[5%] border p-1 font-bold text-center">{index}</p>
              <p className="w-[12%] border p-1">{d.news_title}</p>
              <p className="w-[33%] border p-1">{d.news_summary}</p>
              <p className="w-[12%] border p-1">{d.news_words_1}</p>
              <p className="w-[12%] border p-1">{d.news_words_2}</p>
              <p className="w-[12%] border p-1">{d.news_words_3}</p>
              <p className="w-[8%] border p-1">{d.link}</p>
              <p className="w-[6%] border p-1">{d.pubDate}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
