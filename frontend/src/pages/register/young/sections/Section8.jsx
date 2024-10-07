export default function Section8() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="py-4 text-3xl">회원가입이 완료되었어요!</div>
      <img
        src={process.env.PUBLIC_URL + "/images/hana/byeoldol1.png"}
        alt=""
        className="w-44"
      />
      <div className="py-4 text-lg">
        다양한 챌린지와 컨텐츠가 기다리고 있어요
      </div>
    </div>
  );
}
