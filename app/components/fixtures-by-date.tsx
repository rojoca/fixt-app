import { sub } from "date-fns";

import { UnicolFixture } from "../types";
import {
  dateSort,
  dateSortReverse,
  getDateString,
  getEndOfNZWeek,
  getStartOfNZWeek,
  isBye,
  TEAM_MAP,
} from "../utils/constants";
import StackedFixtures from "./stacked-fixtures";

function NoFixtures({ type }: { type: string }) {
  return <p>No {type} fixtures this week</p>;
}

const invert =
  (fn: (item: UnicolFixture) => boolean) => (item: UnicolFixture) =>
    !fn(item);

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
    .filter(invert(isBye))
    .sort(dateSort);

  const awayFixtures = fixtures
    .filter((f) => f.Date >= start && f.Date <= end && !f.isHome && f.isUnicol)
    .filter(invert(isBye))
    .sort(dateSort);

  const byes = fixtures
    .filter((f) => f.Date >= start && f.Date <= end && f.isUnicol)
    .filter(isBye)
    .sort(dateSort);

  let lastResults: UnicolFixture[] = [];

  if (fullWeekend) {
    const prevStart = getStartOfNZWeek(lastWeek);
    const prevEnd = getEndOfNZWeek(lastWeek);
    lastResults = fixtures
      .filter(
        (f) =>
          f.Date >= prevStart && f.Date <= prevEnd && f.isUnicol && !isBye(f)
      )
      .sort(dateSortReverse);
  }

  return (
    <div className="p-4 sm:p-6 flex-col gap-8">
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
      {byes.length > 0 && (
        <div className="my-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Byes</h3>
          <StackedFixtures fixtures={byes} showUnicolWinner={!!date} />
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
