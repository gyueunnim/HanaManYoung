export default function LoadingModal() {
  return (
    <div className="text-2xl h-[550px] mx-auto flex flex-col justify-center items-center animate__animated animate__bounceIn">
      <div>잠시만 기다려주세요</div>
      <img
        src={process.env.PUBLIC_URL + "/images/hana/webp/loading3.webp"}
        className="w-56 my-5"
        alt=""
      />
      <div className="flex">
        <div>불러오고 있어요</div>
        <div className="animate-dots"></div>
      </div>
    </div>
  );
}
