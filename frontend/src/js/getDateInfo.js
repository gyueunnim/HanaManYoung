function getWeekOfMonth(date) {
  // 전달된 날짜의 년, 월을 기반으로 해당 월의 첫 번째 날을 구함
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  // 첫 번째 날의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const firstDayWeekday = firstDayOfMonth.getDay();

  // 오늘의 날짜
  const today = date.getDate();

  // 첫 번째 주차는 첫 주에 걸쳐진 일수를 보정하여 계산
  const adjustedDate = today + firstDayWeekday - 1;

  // 주차 계산 (7일씩 나눔)
  return Math.ceil(adjustedDate / 7);
}

let today = new Date();

let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
let day = today.getDay();
let week = getWeekOfMonth(today);
let hours = today.getHours();

const koreanDays = ["일", "월", "화", "수", "목", "금", "토"];

let koreanDay = koreanDays[day];

let zeroMonth = String(today.getMonth() + 1).padStart(2, "0"); // 1자리 숫자일 때 앞에 0 추가

export { year, month, date, koreanDay, week, hours, zeroMonth };
