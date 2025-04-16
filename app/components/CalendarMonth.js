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
import CalendarMonthDay from "@/app/components/CalendarMonthDay";

import emojiMap from "@/data/emoji.json";
import rcb from "@/data/rcb.json";
import f1 from "@/data/f1.json";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // format rcb schedule
  let rcbMatches = {};
  rcb.map((m) => {
    const day = new Date(m.time_utc);

    const year = format(day, "yyyy");
    const month = format(day, "MMMM"); // e.g., "April"
    const date = format(day, "d"); // no leading zero
    const time = format(day, "h.mm a");

    if (!rcbMatches[year]) {
      rcbMatches[year] = {};
    }

    if (!rcbMatches[year][month]) {
      rcbMatches[year][month] = {};
    }

    rcbMatches[year][month][date] = {
      match: m?.match || null,
      time: time || null
    };
  });

  // Add F1 races
  let f1Races = {};
  f1.map((r) => {
    const day = new Date(r.race_time_utc);
    const year = format(day, "yyyy");
    const month = format(day, "MMMM");

    const addF1Event = (f1event, time_utc) => {
      const currday = new Date(time_utc);
      const date = format(currday, "d");
      const time = format(currday, "h.mm a");

      if (!f1Races[year]) {
        f1Races[year] = {};
      }

      if (!f1Races[year][month]) {
        f1Races[year][month] = {};
      }

      if (!f1Races[year][month][date]) {
        f1Races[year][month][date] = [];
      }

      f1Races[year][month][date].push({
        event: `F1 ${f1event}` || null,
        time: time || null
      });
    };
    // add sprint qualifying
    if (r.sprint_qualifying) {
      const qsprint = `SPRINT Q ${r.grand_prix}`;
      addF1Event(qsprint, r.sprint_qualifying.time_utc);
    }

    // add sprint race
    if (r.sprint_race) {
      const sprint = `SPRINT ${r.grand_prix}`;
      addF1Event(sprint, r.sprint_race.time_utc);
    }

    // add qualifying
    const qualifying = `QUALI ${r.grand_prix}`;
    addF1Event(qualifying, r.qualifying.time_utc);

    // add race
    addF1Event(r.grand_prix, r.race_time_utc);
  });

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
  const currentMonth = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="p-4">
      <div className="flex justify-around">
        <div className="w-24"></div>
        <div className="flex justify-center items-center gap-10 h-12">
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
        <button
          onClick={currentMonth}
          className="font-bold cursor-pointer text-rose-500"
        >
          TODAY
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
          const rcbMatch = rcbMatches[year]?.[month]?.[date] || null;
          const f1Events = f1Races[year]?.[month]?.[date] || null;

          return (
            <CalendarMonthDay
              key={idx}
              currentDate={currentDate}
              day={day}
              emojiOfTheDay={emojiOfTheDay}
              rcbMatch={rcbMatch}
              f1Events={f1Events}
            ></CalendarMonthDay>
          );
        })}
      </div>
    </div>
  );
}
