import { sub } from "date-fns";

import { UnicolFixture } from "../types";
import {
  dateSort,
  dateSortReverse,
  getDateString,
  getEndOfNZWeek,
  getStartOfNZWeek,
} from "../utils/constants";
import StackedFixtures from "./stacked-fixtures";

function NoFixtures({ type }: { type: string }) {
  return <p>No {type} fixtures this week</p>;
}

export default function FixturesByDate({
  fixtures,
  date,
  fullWeekend = true,
}: {
  fixtures: UnicolFixture[];
  date?: Date;
  fullWeekend?: boolean;
}) {
  // Doesn't matter if date is in UTC because we are comparing against a date with no TZ

  const day = date || new Date();
  const lastWeek = sub(day, { weeks: 1 });

  const start = fullWeekend
    ? getStartOfNZWeek(day)
    : getDateString(day, { hour: "00", minute: "00", second: "00" });
  const end = fullWeekend
    ? getEndOfNZWeek(day)
    : getDateString(day, { hour: "59", minute: "59", second: "59" });

  const homeFixtures = fixtures
    .filter((f) => f.Date >= start && f.Date <= end && f.isHome && f.isUnicol)
    .sort(dateSort);

  const awayFixtures = fixtures
    .filter((f) => f.Date >= start && f.Date <= end && !f.isHome && f.isUnicol)
    .sort(dateSort);

  let lastResults: UnicolFixture[] = [];

  if (fullWeekend) {
    const prevStart = getStartOfNZWeek(lastWeek);
    const prevEnd = getEndOfNZWeek(lastWeek);
    lastResults = fixtures
      .filter((f) => f.Date >= prevStart && f.Date <= prevEnd && f.isUnicol)
      .sort(dateSortReverse);
  }

  console.log(homeFixtures);

  return (
    <div className="p-4 flex-col gap-8">
      <div className="hidden">
        Start: {start} end: {end}
      </div>
      {homeFixtures.length > 0 ? (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">At Home</h3>
          <StackedFixtures fixtures={homeFixtures} showUnicolWinner={!!date} />
        </div>
      ) : (
        <div className="my-8 text-center text-sm">
          {fullWeekend && <NoFixtures type="home" />}
        </div>
      )}
      {awayFixtures.length > 0 ? (
        <div className="my-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Away</h3>
          <StackedFixtures fixtures={awayFixtures} showUnicolWinner={!!date} />
        </div>
      ) : (
        <div className="my-8 text-center text-sm">
          {fullWeekend && <NoFixtures type="away" />}
        </div>
      )}
      {fullWeekend && lastResults.length > 0 ? (
        <div className="my-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Last Week</h3>
          <StackedFixtures fixtures={lastResults} showUnicolWinner={true} />
        </div>
      ) : (
        <div className="my-8 text-center text-sm">
          {fullWeekend && <NoFixtures type="results" />}
        </div>
      )}
    </div>
  );
}
