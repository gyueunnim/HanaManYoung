import { Skeleton } from "@chakra-ui/react";
import Calendar from "../components/Calendar";

export default function Section3({ calendarData }) {
  const events = calendarData.map((item) => ({
    start: item.challenge_record_date,
    color: "rgb(107 114 128)",
  }));

  const groupedEvents = events.reduce((acc, event) => {
    const existingEvent = acc.find((e) => e.start === event.start);

    if (existingEvent) {
      existingEvent.count += 1;
    } else {
      acc.push({ ...event, count: 1 });
    }

    return acc;
  }, []);

  groupedEvents.forEach((event) => {
    if (event.count === 1) {
      event.color = "rgb(156 163 175)";
    } else if (event.count === 2) {
      event.color = "rgb(165 180 252)";
    } else if (event.count === 3) {
      event.color = "rgb(167 139 250)";
    } else if (event.count === 4) {
      event.color = "rgb(240 171 252)";
    } else {
      event.color = "rgb(251 113 133)";
    }
    delete event.count; // count 속성 삭제
  });

  if (Object.keys(calendarData).length === 0)
    return <Skeleton height="375px" width="90%" className="mx-auto my-3" />;

  return (
    <div className="mt-8 w-full flex">
      <div className="relative w-full">
        <h2 className="text-2xl font-bold">챌린지 참여 현황</h2>
        <img
          src={process.env.PUBLIC_URL + "/images/challenge/star_soon1.png"}
          className="absolute w-32 z-10 -top-[4.5rem] right-8"
          alt=""
        />
        <img
          src={process.env.PUBLIC_URL + "/images/challenge/star_soon2.png"}
          className="absolute w-24 z-10 -top-[4.25rem] right-40"
          alt=""
        />
        <Calendar events={groupedEvents} />
      </div>
    </div>
  );
}
