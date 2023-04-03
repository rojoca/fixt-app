"use client";
import Link from "next/link";
import { Result, Team, UnicolFixture } from "../types";
import ShortResult from "./short-result";
import TeamName from "./team-name";

const SHORT_DATE_FORMAT = Intl.DateTimeFormat("sv-SE");

function decorateResult(fixture: UnicolFixture, teamKey: string) {
  if (!teamKey) return fixture;

  const isHome = fixture.HomeTeamNameAbbr === teamKey;
  let result = null;
  if (fixture.result) {
    const goalsFor = Number(isHome ? fixture.HomeScore : fixture.AwayScore);
    const goalsAgainst = Number(isHome ? fixture.AwayScore : fixture.HomeScore);
    result = {
      goalsFor,
      goalsAgainst,
      result:
        goalsFor > goalsAgainst ? "W" : goalsFor < goalsAgainst ? "L" : "D",
      isHome,
      isDefault: fixture.VenueName.toLowerCase().startsWith("default"),
      fixtureId: fixture.Id,
    } as Result;
  }

  return {
    ...fixture,
    opponent: isHome ? fixture.AwayTeamNameAbbr : fixture.HomeTeamNameAbbr,
    result,
  };
}

export default function Results({
  fixtures,
  unicolTeam,
  teamKey,
  title = "Results",
}: {
  fixtures: UnicolFixture[];
  unicolTeam: Team;
  teamKey?: string;
  title?: string;
}) {
  const today = SHORT_DATE_FORMAT.format(new Date());

  // use the fixture list so we capture games that have been played but are still waiting for the result
  const completedFixtures = fixtures
    .filter(
      (f) =>
        (f.Date.split("T")[0].localeCompare(today) <= 0 || f.result) &&
        !(
          f.HomeTeamNameAbbr.startsWith("BYE") ||
          f.AwayTeamNameAbbr.startsWith("BYE") ||
          f.VenueName.toLowerCase().startsWith("postponed")
        )
    )
    .map((f) => (teamKey ? decorateResult(f, teamKey) : f))
    .reverse();

  if (completedFixtures.length === 0) return null;

  return (
    <div className="mt-4 flow-root">
      <h3 className="font-semibold text-gray-900 text-sm mb-4">{title}</h3>
      <ul role="list" className="-my-5 mb-4">
        {completedFixtures.map((fixture) => {
          return (
            <li key={fixture.Id} className="pt-2">
              <Link
                href={`/div/${unicolTeam.slug}/${unicolTeam.competitionId}-${fixture.matchDay}`}
              >
                <div className="flex items-center space-x-4">
                  {fixture.result ? (
                    <div className="flex-shrink-0 flex items-center">
                      <ShortResult
                        result={fixture.result.result}
                        isDefault={fixture.result.isDefault}
                      />
                      <p className="ml-2 text-sm flex-shrink-0 font-medium text-gray-900 whitespace-nowrap">
                        {fixture.result.goalsFor} -{" "}
                        {fixture.result.goalsAgainst}
                      </p>
                    </div>
                  ) : (
                    <div className="min-w-0 flex-shrink-0 flex items-center">
                      <p className="text-xs text-gray-500">PENDING</p>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-normal text-gray-700">
                      <TeamName name={fixture.opponent} />
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
