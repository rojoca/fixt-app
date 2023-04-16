import { MapPinIcon, TrophyIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { UnicolFixture } from "../types";
import { COMPETITIONS, TEAM_MAP } from "../utils/constants";
import FixtureMeta from "./fixture-meta";
import ShortResult from "./short-result";
import TeamName from "./team-name";
import Venue from "./venue";

function getFixtureURL(fixture: UnicolFixture) {
  const team = TEAM_MAP.find(
    (t) =>
      t.key === fixture.HomeTeamNameAbbr ||
      t.key === fixture.AwayTeamNameAbbr ||
      t.competitions.includes(fixture.competitionId)
  );
  if (team)
    return `/div/${team.slug}/${fixture.competitionId}-${fixture.matchDay}`;

  return "";
}

export default function StackedFixtures({
  fixtures,
  showUnicolWinner = false,
}: {
  fixtures: UnicolFixture[];
  showUnicolWinner?: boolean;
}) {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {fixtures.map((fixture) => (
          <li key={fixture.Id}>
            <Link
              href={getFixtureURL(fixture)}
              className="block hover:bg-gray-50"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  {fixture.result?.result && (
                    <ShortResult
                      result={fixture.result.result}
                      isDefault={fixture.result.isDefault}
                      isLong={true}
                    />
                  )}
                  {showUnicolWinner && !fixture.result?.result && (
                    <span className="text-gray-500 text-xs font-medium">
                      {fixture.VenueName.toLowerCase().startsWith("postponed")
                        ? "POSTPONED"
                        : "PENDING"}
                    </span>
                  )}

                  {fixture.isCup && (
                    <div className="flex items-center gap-x-2 text-yellow-700/50 text-xs font-semibold uppercase">
                      <TrophyIcon className="w-4 h-4" />
                      <span>
                        {
                          COMPETITIONS.find(
                            (c) => c.id === fixture.competitionId
                          )?.name
                        }
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className={`flex items-center justify-between ${
                    showUnicolWinner || fixture.result?.result || fixture.isCup
                      ? "mt-2"
                      : ""
                  } text-black`}
                >
                  <p className="truncate text-sm font-normal flex items-center justify-between w-full">
                    <span className="truncate">
                      <TeamName name={fixture.HomeTeamNameAbbr} />
                    </span>
                    <span>{fixture.HomeScore}</span>
                  </p>
                </div>
                <div className="mt-1 sm:flex sm:justify-between">
                  <p className="truncate text-sm font-normal  flex items-center justify-between w-full">
                    <span className="truncate">
                      <TeamName name={fixture.AwayTeamNameAbbr} />
                    </span>
                    <span>{fixture.AwayScore}</span>
                  </p>
                </div>
                <FixtureMeta fixture={fixture} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
