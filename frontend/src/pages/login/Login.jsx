import { useNavigate } from "react-router-dom";
import Logo from "../common/Logo";
import AyjImg from "../common/AyjImg";

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    // TODO: axios 추가
    navigate(process.env.PUBLIC_URL + "/");
  };
  return (
    <>
      <div className="relative w-screen h-full min-h-screen bg-hana animate__animated animate__fadeIn">
        <div className="w-full max-w-[1024px] min-h-screen mx-auto bg-white shadow-xl flex flex-col justify-center items-center">
          <Logo />
          <div className="w-[80%]">
            <h1 className="my-7 text-2xl font-bold">로그인</h1>
            <div className="w-full">
              <form onSubmit={() => handleSubmit()}>
                <div className="my-5">
                  <h2 className="ml-2">아이디</h2>
                  <input
                    type="text"
                    className="w-full h-16 mt-2 pl-5 text-xl border-2 rounded-2xl border-gray-400"
                    placeholder="아이디 입력"
                  />
                </div>
                <div className="my-5">
                  <h2 className="ml-2">비밀번호</h2>
                  <input
                    type="text"
                    className="w-full h-16 mt-2 pl-5 text-xl border-2 rounded-2xl border-gray-400"
                    placeholder="비밀번호 입력"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full my-5 py-4 text-center text-2xl text-white btn-hana-green rounded-2xl cursor-pointer hover:opacity-85 transition-all duration-300 ease-in-out"
                >
                  로그인
                </button>
              </form>
            </div>
            <div>
              <h2 className="ml-2">아직 회원이 아니라면?</h2>
              <button
                type="submit"
                className="w-full mt-2 py-4 text-center text-2xl text-white btn-hana-blue rounded-2xl cursor-pointer hover:opacity-85 transition-all duration-300 ease-in-out"
                onClick={() => navigate("/register")}
              >
                회원가입
              </button>
            </div>
          </div>
          <AyjImg />
        </div>
      </div>
    </>
  );
}
