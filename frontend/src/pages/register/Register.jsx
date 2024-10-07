import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  return (
    <div className="w-[80%] mt-8 animate__animated animate__fadeIn">
      <h1 className="text-2xl">회원가입</h1>
      <div className="mt-8 flex">
        <div className="w-[50%] flex flex-col justify-center items-center">
          <div
            className="btn-hana-blue px-14 py-10 cursor-pointer rounded-xl shadow-xl hover:opacity-85 transition-all duration-300"
            onClick={() => {
              navigate("/register/young");
            }}
          >
            <div className="w-40">
              <img
                src={process.env.PUBLIC_URL + "/images/hana/children.png"}
                alt="children"
                className="w-full"
              />
            </div>
            <p className="mt-4 text-xl text-white text-center">청소년용</p>
          </div>
        </div>
        <div className="w-[50%] flex flex-col justify-center items-center">
          <div
            className="btn-hana-green px-14 py-10 cursor-pointer rounded-xl shadow-xl hover:opacity-85 transition-all duration-300"
            onClick={() => {
              navigate("/register/adult");
            }}
          >
            <div className="w-40">
              <img
                src={process.env.PUBLIC_URL + "/images/hana/adult.png"}
                alt="children"
                className="w-full"
              />
            </div>
            <p className="mt-4 text-xl text-white text-center">부모용</p>
          </div>
        </div>
      </div>
    </div>
  );
}
