import { MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { UnicolFixture } from "../types";
import { TEAM_MAP } from "../utils/constants";
import ShortResult from "./short-result";
import TeamName from "./team-name";

function getFixtureURL(fixture: UnicolFixture) {
  const team = TEAM_MAP.find(
    (t) =>
      t.key === fixture.HomeTeamNameAbbr || t.key === fixture.AwayTeamNameAbbr
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
                {showUnicolWinner && fixture.result?.result && (
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
                <div
                  className={`flex items-center justify-between ${
                    showUnicolWinner && "mt-2"
                  }`}
                >
                  <p className="truncate text-sm font-normal text-black flex items-center justify-between w-full">
                    <span className="truncate">
                      <TeamName name={fixture.HomeTeamNameAbbr} />
                    </span>
                    <span>{fixture.HomeScore}</span>
                  </p>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <p className="truncate text-sm font-normal text-black flex items-center justify-between w-full">
                    <span className="truncate">
                      <TeamName name={fixture.AwayTeamNameAbbr} />
                    </span>
                    <span>{fixture.AwayScore}</span>
                  </p>
                </div>
                <div className="mt-3 sm:mt-2 flex-col flex sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 sm:flex sm:items-center mb-2 sm:mb-0">
                    <MapPinIcon
                      className="mr-1.5 h-4 w-4 inline-flex sm:flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    {fixture.VenueName}
                    {!fixture.isHome && (
                      <span
                        className={`ml-2 inline-flex rounded-full px-2 text-xs font-semibold leading-5 whitespace-nowrap ${
                          fixture.isFar
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        } `}
                      >
                        {fixture.isFar && "Far "}
                        Away
                      </span>
                    )}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-gray-500 flex items-center">
                    {fixture.dateString} {fixture.timeString}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
