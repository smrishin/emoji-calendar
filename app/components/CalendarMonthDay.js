"use client";

import { format, isSameMonth, isSameDay } from "date-fns";

export default function CalendarDay({
  currentDate,
  day,
  emojiOfTheDay,
  rcbMatch,
  f1Events
}) {
  return (
    <div
      className={`p-2 h-auto min-h-28  border  text-sm ${
        !isSameMonth(day, currentDate) ? "text-gray-400" : ""
      } ${
        isSameDay(day, new Date())
          ? "border-rose-500 font-bold border-3 rounded-sm"
          : ""
      }`}
    >
      <div className="grid">
        <div className="flex justify-between">
          <span className="text-2xl"> {format(day, "d")}</span>
          <span className="text-3xl">{emojiOfTheDay}</span>
        </div>
        <div className="grid gap-1">
          {rcbMatch?.match ? (
            <a
              href="https://www.cricbuzz.com/"
              target="_blank"
              className="bg-red-500 rounded-md p-1"
            >
              🏏 {rcbMatch.time} - {rcbMatch.match}
            </a>
          ) : null}
          {Array.isArray(f1Events) && f1Events.length > 0
            ? f1Events.map((f1Event, idx) => {
                return (
                  <a
                    href="https://methstreams.ac/f1streams/formula1-live-stream/"
                    target="_blank"
                    key={idx}
                    className="bg-gray-800 rounded-md p-1"
                  >
                    🏎️ {f1Event.time} - {f1Event.event}
                  </a>
                );
              })
            : null}
        </div>
        {/* add fixtures here */}
      </div>
    </div>
  );
}
