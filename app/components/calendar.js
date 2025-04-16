"use client";

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  subMonths,
  addMonths
} from "date-fns";
import emojiMap from "@/data/emoji.json";
import CalendarDay from "@/components/calendar-day";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startDate = startOfWeek(startOfMonth(currentDate));
  const endDate = endOfWeek(endOfMonth(currentDate));

  const days = [];
  let date = startDate;

  while (date <= endDate) {
    days.push(date);
    date = addDays(date, 1);
  }

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-10 h-12 mb-4">
        <button onClick={prevMonth} className="cursor-pointer text-rose-500">
          Prev
        </button>
        <h1 className="text-2xl font-bold text-white">
          {format(currentDate, "MMMM yyyy")}
        </h1>
        <button onClick={nextMonth} className="cursor-pointer text-rose-500">
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-300 mb-2 bg-rose-800">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          const year = format(day, "yyyy");
          const month = format(day, "MMMM"); // e.g., "April"
          const date = format(day, "d"); // no leading zero

          const emojiOfTheDay = emojiMap[year]?.[month]?.[date] || "";

          return (
            <CalendarDay
              key={idx}
              currentDate={currentDate}
              day={day}
              emojiOfTheDay={emojiOfTheDay}
            ></CalendarDay>
          );
        })}
      </div>
    </div>
  );
}
