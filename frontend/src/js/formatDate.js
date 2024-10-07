export const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");

  const formattedMonth = month.padStart(2, "0");
  const formattedDay = day.padStart(2, "0");

  return `${year}년 ${formattedMonth}월 ${formattedDay}일`;
};
