import { notFound } from "next/navigation";
import Header from "@/app/components/header";
import {
  COMPETITIONS,
  DATE_FORMAT,
  getNZOffset,
  TEAM_MAP,
} from "@/app/utils/constants";
import Link from "next/link";
import { getCompetitionFixtures } from "@/app/utils/getCompetitionFixtures";
import FixturesByDate from "@/app/components/fixtures-by-date";

export const revalidate = 3600;

export default async function Page({
  params: { date },
}: {
  params: { date: string };
}) {
  const fixtures = (
    await Promise.all(
      COMPETITIONS.map(async (comp) => {
        const result = await getCompetitionFixtures(comp.id, comp.isCup);
        return result.allFixtures;
      })
    )
  )
    .flat()
    .filter((f) => f.isUnicol);

  if (
    !date.match(new RegExp("2023-[01][0-9]-[0-3][0-9]")) ||
    isNaN(Date.parse(date))
  ) {
    // inavlid dates should show 404
    notFound();
  }

  // Get the date using NZ timezone offset
  const nzDate = new Date(`${date}T00:00:00${getNZOffset()}`);
  const formattedDate = DATE_FORMAT.format(nzDate);

  return (
    <div className="min-h-full">
      <Header teams={TEAM_MAP} title={formattedDate}>
        <h2 className="text-2xl text-black">
          <Link href={`/`}>{formattedDate}</Link>
        </h2>
      </Header>
      <main className="-mt-24 pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 text-black">
          <h1 className="sr-only">Page title</h1>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-5 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-3">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <FixturesByDate
                  fixtures={fixtures}
                  date={nzDate}
                  fullWeekend={false}
                />
              </div>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2"></div>
          </div>
        </div>
      </main>
      <footer>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="border-t border-gray-300 dark:border-yellow-200 py-8 text-center text-sm text-gray-300 dark:text-yellow-200 sm:text-left">
            <span className="block sm:inline">
              &copy; 2023 Waikato Unicol AFC.
            </span>{" "}
            <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
