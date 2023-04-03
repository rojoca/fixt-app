import { add, sub } from "date-fns";
import Vans from "../components/vans";
import { FixturesByDate, UnicolFixture } from "../types";
import { TEAM_MAP } from "../utils/constants";
import { getDivisionFixtures } from "../utils/getDivisionFixtures";

export default async function Page() {
  const uniFixtures: FixturesByDate = (
    await Promise.all(
      TEAM_MAP.map(async (team) => {
        const division = await getDivisionFixtures(
          team.competitionId,
          team.key
        );
        return division.fixtures.filter((f) => f.isFar);
      })
    )
  )
    .flat()
    // sort by date
    .sort((f1, f2) => (f1.Date < f2.Date ? -1 : f1.Date > f2.Date ? 1 : 0))
    .reduce((acc: FixturesByDate, f) => {
      const dateKey = f.Date.split("T")[0];
      if (acc[dateKey] && acc[dateKey].find((a) => a.Id === f.Id)) return acc;
      return {
        ...acc,
        [dateKey]: [...((acc[dateKey] as UnicolFixture[]) || []), f],
      } as FixturesByDate;
    }, {} as FixturesByDate);

  return (
    <div className="w-full p-4 rounded-lg bg-white">
      <section className="mt-4 ">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          Upcoming Van Requirements
        </h2>
        <Vans uniFixtures={uniFixtures} />
      </section>
    </div>
  );
}
