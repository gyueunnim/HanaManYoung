export const getKoreanNumber = (price) => {
  let number = price;
  let result = "";
  const koreanUnits = [
    {
      kor: "조",
      num: 10000 * 10000 * 10000,
    },
    {
      kor: "억",
      num: 10000 * 10000,
    },
    {
      kor: "만",
      num: 1 * 10000,
    },
    {
      kor: "",
      num: 1,
    },
  ];

  for (let i = 0; i < koreanUnits.length; i++) {
    if (number / koreanUnits[i].num >= 1) {
      result += Math.floor(number / koreanUnits[i].num) + koreanUnits[i].kor;
      number = Math.floor(number % koreanUnits[i].num);
    }
  }

  return result + "원";
};
