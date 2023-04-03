import {
  BuildingStorefrontIcon,
  CakeIcon,
  TruckIcon,
} from "@heroicons/react/20/solid";
import Requirements from "../components/requirements";
import { DayRequirements } from "../types";
import { getDayRequirements } from "../utils/getDayRequirements";

interface Totals {
  vans: number;
  meals: number;
  changingRooms: number;
  sat: {
    vans: number;
    meals: number;
    changingRooms: number;
  };
  sun: {
    vans: number;
    meals: number;
    changingRooms: number;
  };
}

export default async function Page() {
  const dayRequirements = await getDayRequirements();
  const totals = dayRequirements.reduce(
    (acc: Totals, day: DayRequirements) => {
      const dayOfWeek = new Date(day.date).getDay();
      return {
        vans: acc.vans + day.vans,
        meals: acc.meals + day.meals,
        changingRooms: acc.changingRooms + day.changingRooms,
        sat: {
          vans: acc.sat.vans + (dayOfWeek === 6 ? day.vans : 0),
          meals: acc.sat.meals + (dayOfWeek === 6 ? day.meals : 0),
          changingRooms:
            acc.sat.changingRooms + (dayOfWeek === 6 ? day.changingRooms : 0),
        },
        sun: {
          vans: acc.sat.vans + (dayOfWeek === 0 ? day.vans : 0),
          meals: acc.sat.meals + (dayOfWeek === 0 ? day.meals : 0),
          changingRooms:
            acc.sat.changingRooms + (dayOfWeek === 0 ? day.changingRooms : 0),
        },
      } as Totals;
    },
    {
      vans: 0,
      meals: 0,
      changingRooms: 0,
      sat: {
        vans: 0,
        meals: 0,
        changingRooms: 0,
      },
      sun: {
        vans: 0,
        meals: 0,
        changingRooms: 0,
      },
    } as Totals
  );

  return (
    <div className="w-full p-4 rounded-lg bg-white">
      <section className="">
        <h2 className="text-base font-semibold leading-6 text-gray-900 mb-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between">
          <span>Upcoming</span>
          <div className="flex items-center justify-end gap-x-4">
            <span className="text-sm sm:text-base">Season Totals</span>
            <div className="flex items-center gap-x-2">
              <span className="bg-blue-300 p-2 rounded-md block gap-x-2">
                <TruckIcon className="w-4 h-4" />
              </span>
              {totals.vans}
            </div>
            <div className="flex items-center gap-x-2">
              <span className="bg-green-300 p-2 rounded-md block gap-x-2">
                <CakeIcon className="w-4 h-4" />
              </span>
              {totals.meals}
            </div>
            <div className="flex items-center gap-x-2">
              <span className="bg-unicol p-2 rounded-md block">
                <BuildingStorefrontIcon className="w-4 h-4" />
              </span>
              {totals.changingRooms}
            </div>
          </div>
        </h2>
        <Requirements dayRequirements={dayRequirements} />
      </section>
    </div>
  );
}
