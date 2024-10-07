export function monthsRemaining(endDate) {
  const today = new Date(); // 현재 날짜
  const end = new Date(endDate); // 종료 날짜

  // 년도와 월 차이 계산
  let yearsDiff = end.getFullYear() - today.getFullYear();
  let monthsDiff = end.getMonth() - today.getMonth();

  // 전체 개월 수 계산
  let totalMonths = yearsDiff * 12 + monthsDiff;

  // 종료 날짜가 현재 날짜의 일보다 이전인 경우 한 달 차감
  if (end.getDate() < today.getDate()) {
    totalMonths--;
  }

  return totalMonths;
}
