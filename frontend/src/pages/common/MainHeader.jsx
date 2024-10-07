import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { HeaderLogo } from "./Logo";
import MenuBtn from "./MenuBtn";
import { useDispatch, useSelector } from "react-redux";
import { deleteJWT } from "../../js/deleteJWT";
import { init } from "../../redux/user";
import LoginModal from "./LoginModal";
import { useDisclosure } from "@chakra-ui/react";

export default function MainHeader() {
  const location = useLocation();
  const currentPath = location.pathname;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteJWT();
    localStorage.removeItem("JWT"); // JWT 삭제
    dispatch(init({}));
    window.location.href = "/";
  };

  const handleMenuBtnClick = (e) => {
    e.preventDefault(); // 기본 링크 동작 방지
    if (!user.user_name) {
      onOpen(); // 로그인 모달 열기
    } else {
      navigate(e.currentTarget.getAttribute("href")); // 로그인 상태일 때 페이지 네비게이션
    }
  };

  return (
    <div className="w-full py-5 bg-hana shadow-lg border-b">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        <div className="w-[35%]">
          <HeaderLogo />
        </div>
        <div className="w-[45%] text-xl flex gap-5">
          <MenuBtn
            name={"레포트"}
            target={"/planner"}
            currentPath={currentPath}
            onClick={handleMenuBtnClick}
          />
          <MenuBtn
            name={"챌린지"}
            target={"/challenge"}
            currentPath={currentPath}
            onClick={handleMenuBtnClick}
          />
          <MenuBtn
            name={"랭킹"}
            target={"/rank"}
            currentPath={currentPath}
            onClick={handleMenuBtnClick}
          />
          <MenuBtn
            name={"채팅"}
            target={"/chat"}
            currentPath={currentPath}
            onClick={handleMenuBtnClick}
          />
          <MenuBtn
            name={"뉴스"}
            target={"/news"}
            currentPath={currentPath}
            onClick={handleMenuBtnClick}
          />
        </div>

        {user.user_name === undefined ? (
          <p>로그인이 필요합니다</p>
        ) : (
          <>
            <Link
              to="/profile"
              className="w-[15%] flex justify-center items-center"
            >
              <p className="mr-1 font-bold">{user.user_name}님</p>
              <IoPersonCircleOutline size={30} />
            </Link>
            <button className="font-bold" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        )}
      </div>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
