export default function BottomNav() {
  return (
    <div className="w-full mt-10">
      <h2 className="w-[70%] mt-10 text-lg font-bold mx-auto animate__animated animate__headShake">
        하나금융 패밀리
      </h2>
      <div className="w-[70%] mx-auto flex items-center">
        <div className="w-full py-3 flex justify-between ">
          <a href="https://www.kebhana.com/cont/smartapp/smartapp14/smartapp1401/index.jsp">
            <img
              src={process.env.PUBLIC_URL + "/images/footer/hana1.png"}
              alt=""
              className="w-16 cursor-pointer hover:opacity-60 transition-all duration-300 ease-in-out"
            />
          </a>
          <a href="https://www.kebhana.com/cont/smartapp/smartapp03/index.jsp?_menuNo=98911">
            <img
              src={process.env.PUBLIC_URL + "/images/footer/hana2.png"}
              alt=""
              className="w-16 cursor-pointer hover:opacity-60 transition-all duration-300 ease-in-out"
            />
          </a>
          <a href="https://www.hanacard.co.kr/">
            <img
              src={process.env.PUBLIC_URL + "/images/footer/hana3.png"}
              alt=""
              className="w-16 cursor-pointer hover:opacity-60 transition-all duration-300 ease-in-out"
            />
          </a>
          <a href="https://image.kebhana.com/cont/download/documents/manual/0000002019085_20200413_m.pdf">
            <img
              src={process.env.PUBLIC_URL + "/images/footer/hana4.png"}
              alt=""
              className="w-16 cursor-pointer hover:opacity-60 transition-all duration-300 ease-in-out"
            />
          </a>
          <a href="https://www.hanamembership.com/mai/mAIM9100.do">
            <img
              src={process.env.PUBLIC_URL + "/images/footer/hana5.png"}
              alt=""
              className="w-16 cursor-pointer hover:opacity-60 transition-all duration-300 ease-in-out"
            />
          </a>
          <a href="https://www.kebhana.com/cont/news/news01/1480865_115430.jsp">
            <img
              src={process.env.PUBLIC_URL + "/images/footer/hana6.png"}
              alt=""
              className="w-16 cursor-pointer hover:opacity-60 transition-all duration-300 ease-in-out"
            />
          </a>
        </div>
        <div></div>
      </div>
    </div>
  );
}
