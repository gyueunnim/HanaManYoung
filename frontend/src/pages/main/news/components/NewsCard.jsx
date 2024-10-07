import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
export default function NewsCard({ news }) {
  const transformDate = (dateStr) => {
    const date = new Date(dateStr);

    // 시와 분 추출
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // 시와 분을 '시'와 '분' 형식으로 포맷
    return `${hours}시 ${minutes}분`;
  };

  const parseWordDescription = (wordDescription) => {
    const [word, description] = wordDescription
      .split(":")
      .map((part) => part.trim());
    return { word, description };
  };

  const parsedWords1 = parseWordDescription(news.news_words_1);
  const parsedWords2 = parseWordDescription(news.news_words_2);
  const parsedWords3 = parseWordDescription(news.news_words_3);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="w-[30%] h-36 px-5 bg-gradient-to-t from-slate-100 to-lime-50  rounded-xl shadow-lg flex flex-col justify-between">
      <p className="pt-5 font-bold text-gray-700">{news.news_title}</p>
      <div className="pb-3 flex justify-between items-end">
        <p className="text-sm text-gray-500">{transformDate(news.pubDate)}</p>
        <p
          className="border-b border-black text-sm cursor-pointer hover:opacity-75 duration-300"
          onClick={() => onOpen()}
        >
          자세히보기
        </p>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered="true">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="flex items-end">
              <h1 className="text-lg">{news.news_title}</h1>
              <p className="ml-2 mb-1 text-gray-400 text-xs">
                {transformDate(news.pubDate)}
              </p>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="font-basic">
              <div className="text-lg font-bold flex items-center gap-1">
                <p>쉬운 요약</p>
                <img
                  src={process.env.PUBLIC_URL + "/images/hana/bot2.png"}
                  alt=""
                  className="w-10"
                />
              </div>
              <p className="mt-2 text-lg leading-8">{news.news_summary}</p>
              <div className="mt-5 text-sm">
                <h2 className="text-base font-bold">어려운 금융 단어</h2>
                <div className="mt-1">
                  <p className="py-1">
                    <span className="font-bold">{parsedWords1.word}: </span>
                    {parsedWords1.description}
                  </p>
                  <p className="py-1">
                    <span className="font-bold">{parsedWords2.word}: </span>
                    {parsedWords2.description}
                  </p>
                  <p className="py-1">
                    <span className="font-bold">{parsedWords3.word}: </span>
                    {parsedWords3.description}
                  </p>
                </div>
              </div>
              <div className="relative mt-8 pb-6 text-center">
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-16 py-2 btn-hana-blue text-lg text-white rounded-lg hover:opacity-70 duration-300"
                >
                  본문 보러가기
                </a>
                <img
                  src={process.env.PUBLIC_URL + "/images/hana/naver.png"}
                  alt=""
                  className="absolute w-12 right-0"
                />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
