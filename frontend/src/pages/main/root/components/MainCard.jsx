import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import LoginModal from "../../../common/LoginModal";

export default function MainCard({ name, id, target }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure(); // 모달 제어 훅

  const bgColor = [
    "bg-gradient-to-r from-blue-950 to-slate-600",
    "bg-gradient-to-r from-teal-600 to-slate-500",
    "bg-gradient-to-r from-blue-950 to-slate-600",
    "bg-gradient-to-r from-teal-600 to-slate-500",
  ];

  const handleClick = () => {
    if (!user.user_name) {
      onOpen(); // 로그인 모달 열기
    } else {
      navigate(process.env.PUBLIC_URL + target); // 로그인 상태일 때 페이지 네비게이션
    }
  };

  return (
    <>
      <div
        className={`md:w-[40%] h-32 mx-4 px-4 py-4 text-2xl text-white bg-slate-400 rounded-xl flex items-end cursor-pointer shadow-md shadow-gray-400 hover:opacity-85 transition-all duration-300 ease-in-out group ${
          bgColor[id - 1]
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center">
          <p>{name}</p>
          <IoIosArrowForward
            size="25"
            className="ml-1 invisible duration-500 group-hover:visible group-hover:translate-x-2"
          />
        </div>
      </div>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
