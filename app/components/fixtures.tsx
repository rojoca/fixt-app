"use client";

import { MapPinIcon, TrophyIcon, TruckIcon } from "@heroicons/react/24/outline";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { Result, Team, UnicolFixture } from "../types";
import ShortResult from "./short-result";
import Link from "next/link";
import TeamName from "./team-name";
import { useState } from "react";
import Trend from "./trend";
import Venue from "./venue";
import FixtureMeta from "./fixture-meta";
import PlateIcon from "./plate-icon";

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
                href={`/div/${team.slug}/${fixture.competitionId}-${fixture.matchDay}`}
                className={`block   ${
                  fixture.isCup ? "hover:bg-yellow-50" : "hover:bg-gray-50"
                }`}
              >
                {fixture.opponent.toUpperCase().startsWith("BYE") ? (
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <p className="flex items-center">
                        <span className="text-gray-400">BYE</span>
                        <span className="inline-flex ml-2 items-center">
                          {team.competitionId === fixture.competitionId ? (
                            team.division
                          ) : (
                            <TrophyIcon className="w-4 h-4 text-yellow-700" />
                          )}
                        </span>
                      </p>
                      <p className="text-sm">{fixture.dateString}</p>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex flex-row sm:items-start justify-between gap-y-2">
                      <p
                        className={`text-sm font-medium ${
                          fixture.isCup ? "text-yellow-700" : "text-black"
                        } flex flex-wrap gap-x-2`}
                      >
                        <TeamName name={fixture.opponent} />
                        {!fixture.isHome && (
                          <span className="text-xs font-normal text-yellow-700 bg-yellow-100 inline-flex items-center px-2 rounded-md">
                            Away
                          </span>
                        )}
                      </p>
                      <div className="pl-2 flex items-center self-start h-5">
                        {fixture.isCup ? (
                          <TrophyIcon className="w-4 h-4 text-yellow-700" />
                        ) : (
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
