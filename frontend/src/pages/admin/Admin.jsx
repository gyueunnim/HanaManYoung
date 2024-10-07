import { useState } from "react";
import BottomNav from "../common/BottomNav";
import Footer from "../common/Footer";
import SubHeader from "../common/SubHeader";
import InputComponent from "./components/InputComponent";

export default function Admin() {
  const [selectedMenu, setSelectedMenu] = useState(0);

  return (
    <>
      <SubHeader type="관리자용" color="text-rose-600" />
      <div className="relative h-full min-h-[calc(100vh-78px)] pt-[78px] bg-hana">
        <div className="w-full max-w-[1440px] min-h-[calc(100vh-78px)] mx-auto pt-6 pb-10 flex flex-col">
          <div className="text-3xl text-hana font-bold">관리자 페이지</div>
          <div className="min-h-[calc(100vh-200px)] mt-6 flex gap-5">
            <div className="w-[20%] text-xl bg-slate-100 p-10 rounded-xl">
              <p className="text-2xl font-bold">검색 메뉴</p>
              <div className="mt-10">
                <p
                  className={`text-center py-5 cursor-pointer ${
                    selectedMenu === 0 ? "btn-hana-green text-white" : ""
                  } hover:bg-emerald-600 hover:text-white duration-300 rounded-xl my-5`}
                  onClick={() => {
                    setSelectedMenu(0);
                  }}
                >
                  회원 조회
                </p>
                <p
                  className={`text-center py-5 cursor-pointer ${
                    selectedMenu === 1 ? "btn-hana-green text-white" : ""
                  } hover:bg-emerald-600 hover:text-white duration-300 rounded-xl my-5`}
                  onClick={() => {
                    setSelectedMenu(1);
                  }}
                >
                  랭킹 조회
                </p>
                <p
                  className={`text-center py-5 cursor-pointer ${
                    selectedMenu === 2 ? "btn-hana-green text-white" : ""
                  } hover:bg-emerald-600 hover:text-white duration-300 rounded-xl my-5`}
                  onClick={() => {
                    setSelectedMenu(2);
                  }}
                >
                  챌린지 조회
                </p>
                <p
                  className={`text-center py-5 cursor-pointer ${
                    selectedMenu === 3 ? "btn-hana-green text-white" : ""
                  } hover:bg-emerald-600 hover:text-white duration-300 rounded-xl my-5`}
                  onClick={() => {
                    setSelectedMenu(3);
                  }}
                >
                  퀴즈 관리
                </p>
                <p
                  className={`text-center py-5 cursor-pointer ${
                    selectedMenu === 4 ? "btn-hana-green text-white" : ""
                  } hover:bg-emerald-600 hover:text-white duration-300 rounded-xl my-5`}
                  onClick={() => {
                    setSelectedMenu(4);
                  }}
                >
                  뉴스 관리
                </p>
              </div>
            </div>
            <div className="w-[80%]">
              <InputComponent selectedMenu={selectedMenu} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t">
        <div className="max-w-[1440px] mx-auto mb-12">
          <BottomNav />
        </div>
      </div>
      <Footer color={"text-black"} bgColor={"bg-white"} />
    </>
  );
}
