"use client";

import { startOfWeek, endOfWeek, sub, formatISO } from "date-fns";

import { Team, UnicolFixture } from "../types";
import StackedFixtures from "./stacked-fixtures";

function NoFixtures({ type }: { type: string }) {
  return <p>No {type} fixtures this week</p>;
}

export default function WeekendFixtures({
  teams,
}: {
  teams: { team: Team; fixtures: UnicolFixture[] }[];
}) {
  const today = new Date();
  const lastWeek = sub(today, { weeks: 1 });
  const start = formatISO(startOfWeek(today, { weekStartsOn: 1 }));
  const end = formatISO(endOfWeek(today, { weekStartsOn: 1 }));

  const prevStart = formatISO(startOfWeek(lastWeek, { weekStartsOn: 1 }));
  const prevEnd = formatISO(endOfWeek(lastWeek, { weekStartsOn: 1 }));

  const homeFixtures = teams.reduce(
    (acc: UnicolFixture[], { team, fixtures }) => {
      return [
        ...acc,
        ...fixtures.filter(
          (f) =>
            f.Date >= start && f.Date <= end && f.HomeTeamNameAbbr === team.key
        ),
      ] as UnicolFixture[];
    },
    []
  );

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
    .filter((f) => teams.find((t) => t.team.key === f.HomeTeamNameAbbr)); // filter out Unicol v Unicol for away games

  const lastResults = teams
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
    .sort((f1, f2) => (f1.Date < f2.Date ? 1 : f1.Date > f2.Date ? -1 : 0));

  return (
    <div className="p-4 flex-col gap-8">
      {homeFixtures.length > 0 ? (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">At Home</h3>
          <StackedFixtures fixtures={homeFixtures} />
        </div>
      ) : (
        <div className="my-8 text-center text-sm">
          <NoFixtures type="home" />
        </div>
      )}
      {awayFixtures.length > 0 ? (
        <div className="my-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Away</h3>
          <StackedFixtures fixtures={awayFixtures} />
        </div>
      ) : (
        <div className="my-8 text-center text-sm">
          <NoFixtures type="away" />
        </div>
      )}
      {lastResults.length > 0 ? (
        <div className="my-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Latest Results
          </h3>
          <StackedFixtures fixtures={lastResults} showUnicolWinner={true} />
        </div>
      ) : (
        <div className="my-8 text-center text-sm">
          <NoFixtures type="results" />
        </div>
      )}
    </div>
  );
}
