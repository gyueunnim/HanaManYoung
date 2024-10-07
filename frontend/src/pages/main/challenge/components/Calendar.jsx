import React from "react";
import { IoMdSquare } from "react-icons/io";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/locales/ko";
import "../../../../css/calendar.css";

export default function Calendar({ events }) {
  return (
    <div className="relative mt-4 h-[26rem] px-6 pt-4 pb-6 font-basic bg-emerald-50 rounded-xl shadow-md shadow-gray-200">
      <div className="absolute text-xs text-gray-500 bottom-1 right-7 z-10 flex">
        <div className="mr-1 flex items-center">
          <IoMdSquare className="text-gray-400 mr-1" /> <p>챌린지 참여 1회</p>
        </div>
        <div className="ml-1 flex items-center">
          <IoMdSquare className="text-indigo-300 mr-1" /> <p>챌린지 참여 2회</p>
        </div>
        <div className="ml-1 flex items-center">
          <IoMdSquare className="text-violet-400 mr-1" /> <p>챌린지 참여 3회</p>
        </div>
        <div className="ml-1 flex items-center">
          <IoMdSquare className="text-fuchsia-300 mr-1" />{" "}
          <p>챌린지 참여 4회</p>
        </div>
        <div className="ml-1 flex items-center">
          <IoMdSquare className="text-rose-400 mr-1" /> <p>챌린지 참여 5회</p>
        </div>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        events={events}
      />
    </div>
  );
}
