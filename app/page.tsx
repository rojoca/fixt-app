import Link from "next/link";
import FixturesByDate from "./components/fixtures-by-date";
import Header from "./components/header";
import { COMPETITIONS, TEAM_MAP } from "./utils/constants";
import { getFixtures } from "./utils/data";

export const revalidate = 3600;

export default async function Home() {
  const fixtures = (
    await getFixtures(
      COMPETITIONS.map((c) => c.id),
      true
    )
  ).flatMap((comp) => comp.allFixtures);

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
                <FixturesByDate fixtures={fixtures} fullWeekend />
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
                        Where&apos;s the Average Aubergines? Sunday League site
                        needs to be scraped to get useful data which is too much
                        work. Plus{" "}
                        <a
                          href="https://wssl.co.nz/fixtures-results/division-2/"
                          className="text-yellow-700 underline"
                        >
                          their site is fine (see UAA)
                        </a>
                        .
                      </li>
                      <li>
                        Cobbled together with nextjs, tailwind, and off the
                        shelf UI components. If your eyes are bleeding or you
                        want to add something, feel free to submit a PR with
                        changes:{" "}
                        <a
                          href="https://github.com/rojoca/fixt-app"
                          className="text-yellow-700 underline"
                        >
                          https://github.com/rojoca/fixt-app
                        </a>
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
          <div className="border-t border-gray-300 dark:border-yellow-200 py-8 text-center text-sm text-gray-300 dark:text-yellow-200 sm:text-left flex flex-col justify-start sm:items-center sm:flex-row sm:justify-between">
            <div>
              <span className="block sm:inline">
                &copy; 2023 Waikato Unicol AFC.
              </span>{" "}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
            <Link href="/requirements">Requirements</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
