"use client";

import {
  BuildingStorefrontIcon,
  CakeIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { startOfDay } from "date-fns";
import format from "date-fns/format";
import { useEffect, useState } from "react";
import { DayRequirements } from "../types";
import { DATE_FORMAT } from "../utils/constants";

export default function Requirements({
  dayRequirements,
}: {
  dayRequirements: DayRequirements[];
}) {
  // handle server / client sync
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted)
    return (
      <div className="w-full h-96 flex items-center justify-center">
        Loading...
      </div>
    );

  const today = format(startOfDay(new Date()), "yyyy-MM-dd");

  return (
    <div className="flex flex-col gap-y-8">
      {dayRequirements
        .filter((day) => day.date >= today)
        .map((day) => {
          return (
            <div key={day.date}>
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                {DATE_FORMAT.format(new Date(day.date))}
              </h3>
              <dl className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {day.vans > 0 && (
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-blue-900">
                      Vans Required
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 flex items-center justify-start gap-x-4">
                      <span className="bg-blue-300 p-2 rounded-md">
                        <TruckIcon className="w-6 h-6" />
                      </span>
                      {day.vans}
                    </dd>
                    <dd className="text-gray-500 text-xs flex flex-col gap-y-1 mt-4">
                      {day.vanFixtures.map((f) => (
                        <span
                          key={f.AwayTeamNameAbbr}
                          className="text-red dark:text-red"
                        >
                          {f.AwayTeamNameAbbr} - {f.VenueName}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                {day.meals > 0 && (
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-green-900">
                      Meals Required
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 flex items-center justify-start gap-x-4">
                      <span className="bg-green-300 p-2 rounded-md">
                        <CakeIcon className="w-6 h-6" />
                      </span>
                      {day.meals}
                    </dd>
                    <dd className="text-gray-500 text-xs flex flex-col gap-y-1 mt-4">
                      {day.mealFixtures.map((f) => (
                        <span
                          key={f.HomeTeamNameAbbr}
                          className="text-red dark:text-red"
                        >
                          {f.HomeTeamNameAbbr}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                {day.changingRooms > 0 && (
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-yellow-900">
                      Changing Rooms (Uni)
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 flex items-center justify-start gap-x-4">
                      <span className="bg-unicol p-2 rounded-md">
                        <BuildingStorefrontIcon className="w-6 h-6" />
                      </span>
                      {day.changingRooms}
                    </dd>
                    <dd className="text-gray-500 text-xs flex flex-col gap-y-1 mt-4">
                      {day.changingRoomFixtures.map((f) => (
                        <span
                          key={f.HomeTeamNameAbbr}
                          className="text-red dark:text-red"
                        >
                          {f.HomeTeamNameAbbr} - {f.AwayTeamNameAbbr}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          );
        })}
    </div>
  );
}
