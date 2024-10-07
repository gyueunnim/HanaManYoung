import React, { useState } from "react";
import {
  Button,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  VStack,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";

const generateRandomNumbers = () => {
  const numbers = Array.from({ length: 10 }, (_, i) => i);
  return numbers.sort(() => Math.random() - 0.5); // 랜덤으로 숫자 배열 생성
};

const fixedImagePath = "/images/hana/pw.jpg"; // 고정된 이미지 경로

export default function PwModal({ onClose, pw, setPw }) {
  const password = pw;
  const [numbers] = useState(generateRandomNumbers());

  const handleButtonClick = (value) => {
    if (password.length < 4 && typeof value === "number") {
      setPw(password + value);
    }
  };

  const handleClear = () => {
    setPw("");
  };

  // 12개의 버튼 중 2개를 이미지로 대체
  const displayItems = Array(12)
    .fill(null)
    .map((_, index) => {
      const imageIndexes = [9, 11]; // 이미지가 들어갈 인덱스
      if (imageIndexes.includes(index)) {
        return fixedImagePath; // 이미지 경로
      } else {
        // 숫자 배열의 인덱스
        return numbers[
          index - imageIndexes.filter((idx) => idx < index).length
        ];
      }
    });

  return (
    <>
      <ModalHeader>비밀번호</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Input
          value={password.replace(/./g, "*")} // 비밀번호를 *로 표시
          readOnly
          placeholder="비밀번호를 입력하세요"
          mb={4}
          textAlign="center"
          fontSize="xl"
        />
        <div className="relative">
          <div
            className="absolute right-0 w-[20%] py-1 mx-auto rounded-lg text-white text-center text-sm cursor-pointer btn-hana-green hover:opacity-85 duration-300"
            onClick={handleClear}
          >
            초기화
          </div>
        </div>
        <VStack spacing={4} align="center">
          <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={4}>
            {displayItems.map((item, index) => (
              <GridItem
                key={index}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {item === fixedImagePath ? (
                  <Box
                    as="img"
                    src={process.env.PUBLIC_URL + item}
                    alt={`image-${index}`}
                    width="60px" // 이미지 크기 조정
                    height="60px" // 이미지 크기 조정
                    objectFit="cover"
                    cursor="pointer"
                  />
                ) : (
                  <Button
                    onClick={() => handleButtonClick(item)}
                    width="60px" // 버튼 크기 조정
                    height="60px" // 버튼 크기 조정
                    fontSize="lg"
                  >
                    {item}
                  </Button>
                )}
              </GridItem>
            ))}
          </Grid>
        </VStack>
        <div
          className="mx-auto py-2 mb-2 text-lg rounded-lg w-[55%] bg-slate-100 text-center hover:bg-slate-200 duration-300 cursor-pointer"
          onClick={() => onClose()}
        >
          확인
        </div>
      </ModalBody>
    </>
  );
}
