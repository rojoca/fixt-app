"use client";

import { add, sub } from "date-fns";
import { Allocation, UnicolFixture } from "../types";
import { DATE_FORMAT, TIME_FORMAT } from "../utils/constants";

function getRequiredChangingRooms(
  date: string,
  fixtures: UnicolFixture[],
  location: string
) {
  const rooms = fixtures
    .filter((f) => f.VenueName.includes(location))
    .reduce((acc: Allocation[], f: UnicolFixture) => {
      const existingIdx = acc.findIndex(
        (c: Allocation) => c.timeString === f.timeString
      );
      if (existingIdx >= 0) {
        console.log("HOME ROOMS", acc[existingIdx]);
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
        const date = new Date(f.Date);
        const t1 = sub(date, { hours: 1 });
        const t2 = add(date, { hours: 1, minutes: 30 });
        const endTime = add(date, { hours: 2, minutes: 30 });
        return [
          ...acc,
          {
            timeString: f.timeString,
            start: TIME_FORMAT.format(t1),
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
    }, [] as Allocation[]);

  return rooms;
}

export default function ChangingRoomAllocation({
  date,
  fixtures,
}: {
  date: string;
  fixtures: UnicolFixture[];
}) {
  const changingRooms = getRequiredChangingRooms(
    date,
    fixtures,
    "Waikato University"
  );

  if (changingRooms.length === 0) return null;

  return (
    <li className="py-4 sm:flex">
      <time dateTime={date} className="w-28 flex-none">
        {DATE_FORMAT.format(new Date(date))}
      </time>
      <div className="flex flex-col flex-grow gap-4 divide-y divide-gray-300 divide-dashed">
        {changingRooms.map((cr, idx) => (
          <div
            key={`${idx}-${cr.timeString}`}
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
            <p className="mt-2 flex-none sm:ml-6">
              <time dateTime={date}>{cr.start}</time> -{" "}
              <time dateTime={date}>{cr.end}</time>
            </p>
          </div>
        ))}
      </div>
    </li>
  );
}
