import { Link } from "react-router-dom";
import { HeaderLogo } from "./Logo";
import { deleteJWT } from "../../js/deleteJWT";
import { useDispatch, useSelector } from "react-redux";
import { init } from "../../redux/user";

export default function SubHeader({ type, color }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    deleteJWT();
    localStorage.removeItem("JWT"); // JWT 삭제
    dispatch(init({}));
    window.location.href = "/";
  };
  return (
    <div className="w-full py-4 bg-white border-b fixed z-10">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <div className="w-[35%]">
          <HeaderLogo type={type} color={color} />
        </div>
        <div className="w-[25%] flex justify-end items-center gap-5">
          <p className="text-right">{user.user_name}님</p>
          <button
            className="flex justify-right items-center"
            onClick={() => handleLogout()}
          >
            <p className="text-right">로그아웃</p>
          </button>
        </div>
      </div>
    </div>
  );
}
