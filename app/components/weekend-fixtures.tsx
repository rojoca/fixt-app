import { sub } from "date-fns";

import { Fixture, Team, UnicolFixture } from "../types";
import {
  getDateString,
  getEndOfNZWeek,
  getStartOfNZWeek,
} from "../utils/constants";
import StackedFixtures from "./stacked-fixtures";

function NoFixtures({ type }: { type: string }) {
  return <p>No {type} fixtures this week</p>;
}

function dateSort(f1: Fixture, f2: Fixture, reverse = false) {
  const first = reverse ? 1 : -1;
  const last = reverse ? -1 : 1;
  return f1.Date < f2.Date ? first : f1.Date > f2.Date ? last : 0;
}

function dateSortReverse(f1: Fixture, f2: Fixture, reverse = false) {
  return dateSort(f1, f2, true);
}

export default function WeekendFixtures({
  teams,
  date,
  fullWeekend = true,
}: {
  teams: { team: Team; fixtures: UnicolFixture[] }[];
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

  const homeFixtures = teams
    .reduce((acc: UnicolFixture[], { team, fixtures }) => {
      return [
        ...acc,
        ...fixtures.filter(
          (f) =>
            f.Date >= start && f.Date <= end && f.HomeTeamNameAbbr === team.key
        ),
      ] as UnicolFixture[];
    }, [])
    .sort(dateSort);

  const awayFixtures = teams
    .reduce((acc: UnicolFixture[], { team, fixtures }) => {
      return [
        ...acc,
        ...fixtures.filter(
          (f) =>
            f.Date >= start && f.Date <= end && f.AwayTeamNameAbbr === team.key
        ),
      ] as UnicolFixture[];
    }, [])
    .filter((f) => !teams.find((t) => t.team.key === f.HomeTeamNameAbbr)) // filter out Unicol v Unicol for away games
    .sort(dateSort);

  let lastResults: UnicolFixture[] = [];

  if (fullWeekend) {
    const prevStart = getStartOfNZWeek(lastWeek);
    const prevEnd = getEndOfNZWeek(lastWeek);
    lastResults = teams
      .reduce((acc: UnicolFixture[], { team, fixtures }) => {
        return [
          ...acc,
          ...fixtures.filter(
            (f) =>
              f.Date >= prevStart &&
              f.Date <= prevEnd &&
              (f.AwayTeamNameAbbr === team.key ||
                f.HomeTeamNameAbbr === team.key) &&
              !acc.find(
                (a) => a.Id === f.Id && a.competitionId === f.competitionId
              ) // filter out Unicol v Unicol dups
          ),
        ] as UnicolFixture[];
      }, [])
      .sort(dateSortReverse);
  }

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
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Latest Results
          </h3>
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
