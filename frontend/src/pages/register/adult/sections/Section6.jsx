export default function Section6() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="py-4 text-3xl">회원가입이 완료되었어요!</div>
      <img
        src={process.env.PUBLIC_URL + "/images/hana/byeoldol1.png"}
        alt=""
        className="w-44"
      />
      <div className="py-4 text-lg">
        자녀를 등록하고 함께 즐거운 하나만영을 시작해보세요!
      </div>
    </div>
  );
}
