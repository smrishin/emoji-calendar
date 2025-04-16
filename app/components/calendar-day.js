"use client";

import { format, isSameMonth, isSameDay } from "date-fns";

export default function CalendarDay({ currentDate, day, emojiOfTheDay }) {
  return (
    <div
      className={`p-2 h-24 border rounded-sm text-sm ${
        !isSameMonth(day, currentDate) ? "text-gray-400" : ""
      } ${isSameDay(day, new Date()) ? "border-rose-500 font-bold" : ""}`}
    >
      <div className="grid">
        <span> {format(day, "d")}</span>
        <span className="text-center text-3xl">{emojiOfTheDay}</span>
      </div>
    </div>
  );
}
