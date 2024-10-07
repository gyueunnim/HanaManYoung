function Slides1() {
  return (
    <div className="w-full h-full mx-auto rounded-xl bg-blue-50 flex justify-center items-center">
      <div className="w-[50%] px-16 font-basic">
        <p className="text-base text-gray-500">경제 상식을 키워보세요</p>
        <h1 className="mt-2 text-4xl text-blue-900 font-bold">오늘의 퀴즈</h1>
      </div>
      <div className="w-[50%]">
        <img
          src={process.env.PUBLIC_URL + "/images/main/quiz.png"}
          alt=""
          className="drop-shadow-xl"
        />
      </div>
    </div>
  );
}

function Slides2() {
  return (
    <div className="w-full h-full mx-auto rounded-xl bg-yellow-50 flex justify-center items-center">
      <div className="w-[50%] px-16 font-basic">
        <p className="text-base text-gray-500">사고 싶은 물건이 있다면?</p>
        <h1 className="mt-2 text-4xl text-blue-900 font-bold">챌린지 적금</h1>
      </div>
      <div className="w-[50%]">
        <img
          src={process.env.PUBLIC_URL + "/images/main/account.png"}
          alt=""
          className="drop-shadow-xl"
        />
      </div>
    </div>
  );
}

function Slides3() {
  return (
    <div className="w-full h-full mx-auto rounded-xl bg-red-50 flex justify-center items-center">
      <div className="w-[50%] px-16 font-basic">
        <p className="text-base text-gray-500">계획적인 소비습관을 길러요</p>
        <h1 className="mt-2 text-4xl text-blue-900 font-bold">
          소비계획 / 가계부
        </h1>
      </div>
      <div className="w-[50%]">
        <img
          src={process.env.PUBLIC_URL + "/images/main/planner.png"}
          alt=""
          className="drop-shadow-xl"
        />
      </div>
    </div>
  );
}

function Slides4() {
  return (
    <div className="w-full h-full mx-auto rounded-xl bg-purple-50 flex justify-center items-center">
      <div className="w-full px-16 font-basic">
        <p className="text-base text-gray-500">
          당신의 금전운을 책임져드려요✨
        </p>
        <h1 className="mt-2 text-4xl text-blue-900 font-bold">하나타로</h1>
      </div>
      <div className="relative w-full h-full">
        <img
          src={process.env.PUBLIC_URL + "/images/main/cardBack.jpg"}
          className="absolute w-48 right-12 -bottom-12 rounded-xl z-10 shadow-2xl drop-shadow-lg"
          alt=""
        />
        <img
          src={process.env.PUBLIC_URL + "/images/main/cardBack.jpg"}
          className="absolute w-32 -right-3 -bottom-12 rounded-xl rotate-45 shadow-lg opacity-85"
          alt=""
        />
        <img
          src={process.env.PUBLIC_URL + "/images/main/cardBack.jpg"}
          className="absolute w-32 rounded-xl right-52 -bottom-10 -rotate-12 shadow-lg opacity-85"
          alt=""
        />
      </div>
    </div>
  );
}

function Slides5() {
  return (
    <div className="w-full h-full mx-auto rounded-xl bg-stone-100 flex justify-center items-center">
      <div className="w-[50%] px-16 font-basic">
        <p className="text-base text-gray-500">
          부모님께 챌린지를 받아보는건 어떨까요?
        </p>
        <h1 className="mt-2 text-4xl text-blue-900 font-bold">용돈 조르기</h1>
      </div>
      <div className="w-[50%]">
        <img
          src={process.env.PUBLIC_URL + "/images/main/pocket.png"}
          alt=""
          className="drop-shadow-xl"
        />
      </div>
    </div>
  );
}

export { Slides1, Slides2, Slides3, Slides4, Slides5 };
