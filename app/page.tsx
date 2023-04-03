import { Inter } from "next/font/google";
import Link from "next/link";
import Header from "./components/header";
import WeekendFixtures from "./components/weekend-fixtures";
import { TEAM_MAP } from "./utils/constants";
import { getDivisionFixtures } from "./utils/getDivisionFixtures";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const teams = await Promise.all(
    TEAM_MAP.map(async (t) => {
      const division = await getDivisionFixtures(t.competitionId, t.key);
      return {
        team: t,
        fixtures: division.fixtures, // only need the first 2 at most
      };
    })
  );

  return (
    <div className="min-h-full">
      <Header teams={TEAM_MAP} title="This Week">
        <h2 className="text-2xl text-black">
          <Link href={`/`}>This Week</Link>
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
                <WeekendFixtures teams={teams} />
              </div>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <section aria-labelledby="section-2-title">
                <h2 className="sr-only" id="section-2-title">
                  Standings
                </h2>
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <h3 className="font-medium text-gray-700 mb-4">About</h3>
                    <ul className="text-sm flex flex-col gap-4">
                      <li>
                        Convenience site for Unicol fixtures/results/standings
                        because the WaiBop site can be annoying
                      </li>
                      <li>
                        Data is straight from WaiBop and can&apos;t be updated
                        manually.
                      </li>
                      <li>
                        Refreshing the page does not update data, it gets
                        updated in the background approx. hourly. Go to WaiBop
                        if you need minute by minute updates.
                      </li>
                      <li>
                        Cup games will be added sometime after the draws are
                        made (maybe).
                      </li>
                      <li>
                        There <span className="line-through">might be</span> are
                        bugs.
                      </li>
                      <li>
                        Where&apos;s the Average Aubergines? Sunday League site
                        needs to be scraped to get useful data which is too much
                        work. Plus their site is fine.
                      </li>
                      <li>
                        Cobbled together with nextjs, tailwind, and off the
                        shelf UI components. If your eyes are bleeding, feel
                        free to submit a PR with changes:
                      </li>
                      <li>
                        You cannot request features. Clone the repo and submit a
                        PR:
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
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
