"use client";

import { MapPinIcon } from "@heroicons/react/24/solid";
import { add, sub } from "date-fns";
import { Allocation, UnicolFixture } from "../types";
import { DATE_FORMAT, TIME_FORMAT } from "../utils/constants";

function getRequiredVans(date: string, fixtures: UnicolFixture[]) {
  const vans = fixtures
    .map((f) => {
      const date = new Date(f.Date);
      const t1 = sub(date, { hours: 3 });
      const start = TIME_FORMAT.format(t1);
      const start1 = TIME_FORMAT.format(date);

      return {
        timeString: new Date().toISOString(),
        start,
        start1,
        homeRooms: [f.AwayTeamNameAbbr],
        awayRooms: [f.VenueName],
      };
    })
    .sort((a, b) =>
      a.timeString < b.timeString ? -1 : a.timeString > b.timeString ? 1 : 0
    );

  return vans;
}

export default function VanAllocation({
  date,
  fixtures,
}: {
  date: string;
  fixtures: UnicolFixture[];
}) {
  const vans = getRequiredVans(date, fixtures);

  if (vans.length === 0) return null;

  return (
    <li className="py-4 sm:flex">
      <time dateTime={date} className="w-28 flex-none">
        {DATE_FORMAT.format(new Date(date))}
      </time>
      <div className="flex flex-col flex-grow gap-4 divide-y divide-gray-300 divide-dashed">
        {vans.map((cr, idx) => (
          <div
            key={`${idx}-${cr.start}`}
            className="flex items-start justify-between w-full pt-4 first:pt-0"
          >
            <p className="mt-2 flex-auto font-normal text-gray-900 sm:mt-0 flex flex-col gap-2">
              {cr.homeRooms?.map((team) => (
                <span key={team}>{team}</span>
              ))}
              {cr.awayRooms?.map((venue) => (
                <span key={venue} className="flex items-center">
                  <MapPinIcon
                    className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-300"
                    aria-hidden="true"
                  />
                  {venue}
                  <time
                    className="inline-block ml-2 text-gray-500"
                    dateTime={date}
                  >
                    {cr.start1}
                  </time>
                </span>
              ))}
            </p>
            <p className="mt-2 sm:ml-6 text-right whitespace-nowrap">
              <time dateTime={date}>{cr.start}</time>
            </p>
          </div>
        ))}
      </div>
    </li>
  );
}
