"use client";

import { MapPinIcon } from "@heroicons/react/20/solid";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { Result, Team, UnicolFixture } from "../types";
import ShortResult from "./short-result";
import Link from "next/link";
import TeamName from "./team-name";
import { useState } from "react";

export default function Fixtures({
  team,
  fixtures,
  results,
}: {
  fixtures: UnicolFixture[];
  team: Team;
  results: { [key: string]: Result[] };
}) {
  const [showAll, setShowAll] = useState(false);

  // needs to have use client because we want browser "today"
  const [today] = new Date().toISOString().split("T", 1);
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {fixtures
          .filter(
            (f) => f.Date.split("T")[0].localeCompare(today) > 0 && !f.result
          )
          .map((fixture, idx) => (
            <li
              key={fixture.Id}
              className={`${!showAll && idx > 2 && "hidden"} lg:block`}
            >
              <Link
                href={`/div/${team.slug}/${team.competitionId}-${fixture.matchDay}`}
                className="block hover:bg-gray-50"
              >
                {fixture.opponent.startsWith("BYE") ? (
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-center text-lg text-gray-500">
                      <div className="flex-col items-center text-center">
                        <p>BYE</p>
                        <p className="text-sm">{fixture.dateString}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-medium text-black flex items-center">
                        <TeamName name={fixture.opponent} />
                      </p>
                      <div className="ml-2 flex-shrink-0 items-center hidden sm:flex">
                        {results[fixture.opponent] && (
                          <p className="text-xs text-gray-400 flex items-center">
                            {results[fixture.opponent][0]?.result === "L" ? (
                              <ArrowTrendingDownIcon className="w-4 h-4 text-gray-400 mr-2" />
                            ) : (
                              <ArrowTrendingUpIcon className="w-4 h-4 text-gray-400 mr-2" />
                            )}
                            {results[fixture.opponent]
                              ?.slice(0, 5)
                              ?.map((result, idx) => (
                                <ShortResult
                                  key={`${fixture.opponent}-result-${idx}`}
                                  result={result.result}
                                  isDefault={result.isDefault}
                                />
                              ))}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <MapPinIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-300"
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
                      </div>
                      <div className="mt-2 flex items-center text-right text-sm text-gray-500 sm:mt-0 justify-between">
                        <p>
                          <time className="inline mr-2" dateTime={fixture.Date}>
                            {fixture.dateString}
                          </time>
                          <time dateTime={fixture.Date}>
                            {fixture.timeString}
                          </time>
                        </p>
                        {results[fixture.opponent] && (
                          <p className="text-xs text-gray-400 flex items-center sm:hidden">
                            {results[fixture.opponent][0]?.result === "L" ? (
                              <ArrowTrendingDownIcon className="w-4 h-4 text-gray-400 mr-2" />
                            ) : (
                              <ArrowTrendingUpIcon className="w-4 h-4 text-gray-400 mr-2" />
                            )}
                            {results[fixture.opponent]
                              ?.slice(0, 4)
                              ?.map((result, idx) => (
                                <ShortResult
                                  key={`${fixture.opponent}-result-${idx}`}
                                  result={result.result}
                                  isDefault={result.isDefault}
                                />
                              ))}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            </li>
          ))}
        {!showAll && (
          <li className="lg:hidden">
            <button
              className="block hover:bg-gray-50 py-2 text-xs text-gray-500 text-center w-full"
              onClick={() => setShowAll(true)}
            >
              Show All
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
