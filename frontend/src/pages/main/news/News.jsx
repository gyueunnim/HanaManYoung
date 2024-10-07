import axios from "axios";
import { useEffect, useState } from "react";
import { MAN_YOUNG_URL } from "../../../etc/url";
import Loading from "../../common/Loading";
import NewsList from "./components/NewsList";
import { date, koreanDay, month } from "../../../js/getDateInfo";
import SelectTabNewsBtn from "./components/SelectTabNewsBtn";

export default function News() {
  const [selectNews, setSelectNews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [financialNews, setFinancialNews] = useState([]);
  const [ecomonicNews, setEcomonicNews] = useState([]);
  const [stockNews, setStockNews] = useState([]);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await axios.get(`${MAN_YOUNG_URL}/news/get`);
        setFinancialNews(response.data.financeList);
        setEcomonicNews(response.data.economyList);
        setStockNews(response.data.stockList);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    getNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate((prev) => !prev);
    }, 1250);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="w-[90%] mx-auto animate__animated animate__fadeIn">
      <div className="mt-2 flex items-center gap-2">
        <h1 className="text-2xl font-bold">별벗이와 함께 읽는 뉴스 요약</h1>
        <img
          src={process.env.PUBLIC_URL + "/images/hana/bot1.png"}
          alt=""
          className={`w-16 ${
            animate ? "animate__animated animate__swing" : ""
          }`}
        />
        <p className="text-gray-400 text-xs">
          ( {month}월 {date}일 {koreanDay}요일 )
        </p>
      </div>
      <SelectTabNewsBtn selectNews={selectNews} setSelectNews={setSelectNews} />
      <NewsList
        newsList={
          selectNews === 0
            ? financialNews
            : selectNews === 1
            ? ecomonicNews
            : stockNews
        }
      />
      <div className="mt-4 flex justify-end items-center gap-1">
        <img
          src={process.env.PUBLIC_URL + "/images/hana/bot2.png"}
          alt=""
          className="w-9"
        />
        <p className="text-base font-basic text-gray-500">
          뉴스는 정각에 최신화됩니다. 출처
        </p>
        <img
          src={process.env.PUBLIC_URL + "/images/hana/naver.png"}
          alt=""
          className="mt-1 w-16"
        />
      </div>
    </div>
  );
}
