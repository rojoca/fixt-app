import { BoltIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { Result, Team, UnicolFixture } from "../types";
import Link from "next/link";
import TeamName from "./team-name";
import Trend from "./trend";
import FixtureMeta from "./fixture-meta";
import PlateIcon from "./plate-icon";
import { COMPETITIONS, isDerby } from "../utils/constants";
import CompName from "./comp-namte";

export default function Fixtures({
  team,
  fixtures,
  results,
}: {
  fixtures: UnicolFixture[];
  team: Team;
  results: { [key: string]: Result[] };
}) {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <input type="checkbox" id="show-all" className="hidden peer" />
      <ul
        role="list"
        className="divide-y divide-gray-200 [&>*:nth-child(n+4)]:hidden peer-checked:[&>*:nth-child(n+4)]:block lg:[&>*:nth-child(n+4)]:block"
      >
        {fixtures.map((fixture, idx) => (
          <li key={fixture.Id}>
            <Link
              href={`/div/${team.slug}/${fixture.competitionId}-${fixture.matchDay}`}
              className={`block   ${
                fixture.isCup ? "hover:bg-yellow-50" : "hover:bg-gray-50"
              }`}
            >
              {fixture.opponent.toUpperCase().startsWith("BYE") ? (
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="text-gray-400">BYE</span>
                      <span className="inline-flex ml-2 items-center">
                        {team.competitionId === fixture.competitionId ? (
                          team.division
                        ) : (
                          <span className="text-yellow-700 inline-flex items-center gap-x-2">
                            <TrophyIcon className="w-3 h-3 " />
                            <span>
                              {
                                COMPETITIONS.find(
                                  (c) => c.id === fixture.competitionId
                                )?.name
                              }
                            </span>
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="text-sm">{fixture.dateString}</div>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-4 sm:px-6">
                  {fixture.isCup && (
                    <div className="flex items-center gap-x-2 text-yellow-700 text-xs font-semibold uppercase mb-2">
                      <CompName fixture={fixture} />
                    </div>
                  )}
                  <div className="flex flex-row sm:items-start justify-between gap-y-2">
                    <div
                      className={`text-sm font-medium text-black flex flex-wrap gap-x-2`}
                    >
                      <TeamName name={fixture.opponent} />
                      {!fixture.isHome && (
                        <span className="text-xs font-normal text-yellow-700 bg-yellow-100 inline-flex items-center px-2 rounded-md">
                          Away
                        </span>
                      )}
                    </div>
                    <div className="pl-2 flex items-center self-start h-5">
                      {!fixture.isCup && (
                        <Trend
                          opponent={fixture.opponent}
                          results={results[fixture.opponent]}
                        />
                      )}
                    </div>
                  </div>
                  <FixtureMeta fixture={fixture} />
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
      <label
        htmlFor="show-all"
        className="block hover:bg-gray-50 py-2 text-xs text-gray-500 text-center w-full lg:hidden peer-checked:hidden"
      >
        Show All
      </label>
    </div>
  );
}
