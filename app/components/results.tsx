"use client";
import Link from "next/link";
import { Result, Team, UnicolFixture } from "../types";
import ShortResult from "./short-result";
import TeamName from "./team-name";
import { isBye } from "../utils/constants";
import PlateIcon from "./plate-icon";
import { TrophyIcon } from "@heroicons/react/24/outline";

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
  includeByes = true,
}: {
  fixtures: UnicolFixture[];
  unicolTeam: Team;
  teamKey?: string;
  title?: string;
  includeByes?: boolean;
}) {
  const today = SHORT_DATE_FORMAT.format(new Date());

  // use the fixture list so we capture games that have been played but are still waiting for the result
  const completedFixtures = fixtures
    .filter(
      (f) =>
        (f.Date.split("T")[0].localeCompare(today) <= 0 || f.result) &&
        !f.VenueName.toLowerCase().startsWith("postponed") &&
        (!isBye(f) || includeByes)
    )
    .map((f) => (teamKey ? decorateResult(f, teamKey) : f));

  if (completedFixtures.length === 0) return null;

  return (
    <div className="mt-4 flow-root">
      <h3 className="font-semibold text-gray-900 text-sm mb-4">{title}</h3>
      <table className="table mb-2">
        <tbody>
          {completedFixtures.map((fixture) => {
            if (isBye(fixture)) {
              return (
                <tr key={`result-${fixture.Id}`}>
                  <td colSpan={4} className="text-gray-500 text-sm py-0.5">
                    BYE
                  </td>
                  <td className="text-sm text-gray-500 py-0.5">
                    <Link
                      href={`/div/${unicolTeam.slug}/${fixture.competitionId}-${fixture.matchDay}`}
                      className="inline-flex items-center gap-x-2"
                    >
                      {fixture.isPlate && <PlateIcon className="w-3 h-3" />}
                      {fixture.isCup && !fixture.isPlate && (
                        <TrophyIcon className="w-3 h-3 text-yellow-600" />
                      )}
                      {fixture.dateString}
                    </Link>
                  </td>
                </tr>
              );
            }
            if (fixture.result) {
              return (
                <tr key={`result-${fixture.Id}`}>
                  <td className="w-4 text-center py-0.5">
                    <ShortResult
                      result={fixture.result.result}
                      isDefault={fixture.result.isDefault}
                    />
                  </td>
                  <td className="w-5 text-right text-sm font-medium text-gray-900 whitespace-nowrap py-0.5">
                    {fixture.result.goalsFor}
                  </td>
                  <td className="w-4 text-center text-sm font-medium text-gray-900 whitespace-nowrap py-0.5">
                    -
                  </td>
                  <td className="w-5 text-left text-sm font-medium text-gray-900 whitespace-nowrap py-0.5">
                    {fixture.result.goalsAgainst}
                  </td>
                  <td className="truncate text-sm font-normal text-gray-700 py-0.5">
                    <Link
                      href={`/div/${unicolTeam.slug}/${fixture.competitionId}-${fixture.matchDay}`}
                      className="inline-flex items-center gap-x-2"
                    >
                      {fixture.isPlate && <PlateIcon className="w-3 h-3" />}
                      {fixture.isCup && !fixture.isPlate && (
                        <TrophyIcon className="w-3 h-3 text-yellow-600" />
                      )}
                      <TeamName name={fixture.opponent} />
                    </Link>
                  </td>
                </tr>
              );
            }
            return (
              <tr key={`result-${fixture.Id}`}>
                <td colSpan={4} className="py-0.5">
                  <p className="text-xs text-gray-500">PENDING</p>
                </td>
                <td className="truncate text-sm font-normal text-gray-700 py-0.5">
                  <Link
                    href={`/div/${unicolTeam.slug}/${fixture.competitionId}-${fixture.matchDay}`}
                    className="inline-flex items-center gap-x-2"
                  >
                    {fixture.isPlate && <PlateIcon className="w-3 h-3" />}
                    {fixture.isCup && !fixture.isPlate && (
                      <TrophyIcon className="w-3 h-3 text-yellow-600" />
                    )}
                    <TeamName name={fixture.opponent} />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
