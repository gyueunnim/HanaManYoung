import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function Loading() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const random = Math.floor(Math.random() * 2) + 1;
    setImageSrc(
      `${process.env.PUBLIC_URL}/images/hana/webp/loading${random}.webp`
    );
  }, []);

  return (
    <div className="text-xl h-[calc(100vh-48px-78px)] mx-auto flex flex-col justify-center items-center animate__animated animate__pulse">
      <div>잠시만 기다려주세요</div>
      {!isLoaded && (
        <div className="h-44 flex items-center">
          <LoadingSpinner />
        </div>
      )}
      <img
        src={imageSrc}
        className="my-4 w-64"
        alt="로딩 중"
        onLoad={() => setIsLoaded(true)}
      />
      <div className="flex">
        <div>로딩중</div>
        <div className="animate-dots"></div>
      </div>
    </div>
  );
}
