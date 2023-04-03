import Header from "@/app/components/header";
import { getDivisionFixtures } from "@/app/utils/getDivisionFixtures";
import { TEAM_MAP } from "@/app/utils/constants";
import { getDivisionStandings } from "@/app/utils/getDivisionStandings";
import StandingsTable from "@/app/components/standings";
import Results from "@/app/components/results";
import Link from "next/link";

export const revalidate = 3600;

export default async function DivisionLayout({
  params: { teamSlug },
  children,
}: {
  params: { teamSlug: string };
  children: React.ReactNode;
}) {
  const team = TEAM_MAP.find((t) => t.slug === teamSlug);
  if (!team) throw Error("not-found");

  const [division, standings] = await Promise.all([
    getDivisionFixtures(team.competitionId, team.key),
    getDivisionStandings(team.standingsId || team.competitionId),
  ]);

  return (
    <>
      <div className="min-h-full">
        <Header teams={TEAM_MAP} title={team.name}>
          <h2 className="text-2xl text-black">
            <Link href={`/div/${team.slug}`}>{team.name}</Link>
          </h2>
        </Header>
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Page title</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-5 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-3">
                {children}
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-2-title">
                  <h2 className="sr-only" id="section-2-title">
                    Standings
                  </h2>
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      <StandingsTable
                        team={team}
                        teams={TEAM_MAP}
                        standings={standings}
                      />
                      <Results fixtures={division.fixtures} unicolTeam={team} />
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
    </>
  );
}
