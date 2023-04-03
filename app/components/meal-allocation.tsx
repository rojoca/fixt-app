"use client";

import { add, sub } from "date-fns";
import { Allocation, UnicolFixture } from "../types";
import { DATE_FORMAT, TIME_FORMAT } from "../utils/constants";

function getRequiredMeals(date: string, fixtures: UnicolFixture[]) {
  const rooms = fixtures
    .reduce((acc: Allocation[], f: UnicolFixture) => {
      const date = new Date(f.Date);
      const t1 = f.VenueName.includes("Jansen Park")
        ? add(date, { hours: 2, minutes: 30 })
        : add(date, { hours: 2 });
      const start = TIME_FORMAT.format(t1);
      const existingIdx = acc.findIndex(
        (c: Allocation) => c.timeString === start
      );
      if (existingIdx >= 0) {
        acc[existingIdx].homeRooms = [
          ...(acc[existingIdx].homeRooms || []),
          f.HomeTeamNameAbbr,
        ];
        acc[existingIdx].awayRooms = [
          ...(acc[existingIdx].awayRooms || []),
          f.HomeTeamNameAbbr,
        ];
        return acc;
      } else {
        const t2 = add(date, { hours: 1, minutes: 30 });
        const endTime = add(date, { hours: 2, minutes: 30 });
        return [
          ...acc,
          {
            timeString: start,
            start,
            end: TIME_FORMAT.format(endTime),
            start1: TIME_FORMAT.format(t1),
            end1: TIME_FORMAT.format(date),
            start2: TIME_FORMAT.format(t2),
            end2: TIME_FORMAT.format(endTime),
            homeRooms: [f.HomeTeamNameAbbr],
            awayRooms: [f.AwayTeamNameAbbr],
          } as Allocation,
        ] as Allocation[];
      }
    }, [] as Allocation[])
    .sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));

  return rooms;
}

export default function MealAllocation({
  date,
  fixtures,
}: {
  date: string;
  fixtures: UnicolFixture[];
}) {
  const meals = getRequiredMeals(date, fixtures);

  if (meals.length === 0) return null;

  return (
    <li className="py-4 sm:flex">
      <time dateTime={date} className="w-28 flex-none">
        {DATE_FORMAT.format(new Date(date))}
      </time>
      <div className="flex flex-col flex-grow gap-4 divide-y divide-gray-300 divide-dashed">
        {meals.map((cr, idx) => (
          <div
            key={`${idx}-${cr.start}`}
            className="flex items-start justify-between w-full pt-4 first:pt-0"
          >
            <p className="mt-2 flex-auto font-normal text-gray-900 sm:mt-0 flex flex-col gap-2">
              {cr.homeRooms?.map((team) => (
                <span key={team}>{team}</span>
              ))}
              {cr.awayRooms?.map((team) => (
                <span key={team}>{team}</span>
              ))}
            </p>
            <p className="flex-none sm:ml-6">
              <time dateTime={date}>{cr.start}</time>
            </p>
          </div>
        ))}
      </div>
    </li>
  );
}
