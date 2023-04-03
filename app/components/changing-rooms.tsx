"use client";

import { sub } from "date-fns";
import { FixturesByDate } from "../types";
import ChangingRoomAllocation from "./changing-room-allocation";

export default function ChangingRooms({
  uniFixtures,
}: {
  uniFixtures: FixturesByDate;
}) {
  const today = sub(new Date(), { days: 1 }).toISOString();

  const dates = Object.keys(uniFixtures).sort((d1, d2) =>
    d1 < d2 ? -1 : d2 < d1 ? 1 : 0
  );

  return (
    <ol className="mt-2 divide-y divide-gray-200 text-sm leading-6 text-gray-500">
      {dates
        .filter((d) => d >= today)
        .map((date) => {
          const fixtures = uniFixtures[date];
          return (
            <ChangingRoomAllocation
              key={date}
              date={date}
              fixtures={fixtures}
            />
          );
        })}
    </ol>
  );
}
