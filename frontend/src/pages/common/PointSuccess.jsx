export default function PointSuccess({ onClose }) {
  return (
    <>
      <div className="h-44 flex flex-col justify-center items-center animate__animated animate__bounce">
        <img
          src={process.env.PUBLIC_URL + "/images/hana/point.gif"}
          alt=""
          className="w-[45%]"
        />
        <div className="my-2 text-lg font-bold">
          포인트 적립이 완료되었어요!
        </div>
      </div>
      <div
        className="text-center my-3 py-2 btn-hana-blue text-white text-lg rounded-lg cursor-pointer hover:opacity-80 duration-300"
        onClick={() => {
          onClose();
          window.location.href = process.env.PUBLIC_URL + "/challenge";
        }}
      >
        확인
      </div>
    </>
  );
}
