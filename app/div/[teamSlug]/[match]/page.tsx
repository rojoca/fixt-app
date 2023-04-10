import { notFound } from "next/navigation";
import FixtureMeta from "@/app/components/fixture-meta";
import Results from "@/app/components/results";
import TeamName from "@/app/components/team-name";
import { UnicolFixture } from "@/app/types";
import { TEAM_MAP } from "@/app/utils/constants";
import { getDivisionFixtures } from "@/app/utils/getDivisionFixtures";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const revalidate = 3600;

function OtherFixtures({ fixtures }: { fixtures: UnicolFixture[] }) {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {fixtures.map((fixture) => (
          <li key={fixture.Id}>
            <div className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-normal text-black flex items-center justify-between w-full">
                    <span className="truncate">
                      <TeamName name={fixture.HomeTeamNameAbbr} />
                    </span>
                    <span>{fixture.HomeScore}</span>
                  </p>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <p className="truncate text-sm font-normal text-black flex items-center justify-between w-full">
                    <span className="truncate">
                      <TeamName name={fixture.AwayTeamNameAbbr} />
                    </span>
                    <span>{fixture.AwayScore}</span>
                  </p>
                </div>
                <FixtureMeta fixture={fixture} showDate={false} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function Page({
  params: { teamSlug, match },
}: {
  params: { teamSlug: string; match: string };
}) {
  const [compId, matchDay] = match.split(/-(.*)/, 2);
  const team = TEAM_MAP.find((t) => t.slug === teamSlug);
  if (!team) notFound();

  const division = await getDivisionFixtures(compId, team.key);
  const fixture = division.fixtures.find(
    (f) => f.matchDay === Number(matchDay)
  );

  if (!fixture) notFound();

  const otherFixturesInRound = division.allFixtures.filter(
    (f) =>
      f.matchDay === Number(matchDay) &&
      f.HomeTeamNameAbbr !== fixture.opponent &&
      f.HomeTeamNameAbbr !== team.key &&
      f.AwayTeamNameAbbr !== team.key &&
      f.AwayTeamNameAbbr !== fixture.opponent
  );

  const opponentResults = division.allFixtures.filter(
    (f) =>
      fixture.matchDay !== f.matchDay &&
      (f.AwayTeamNameAbbr === fixture.opponent ||
        f.HomeTeamNameAbbr === fixture.opponent)
  );

  return (
    <section>
      <h2 className="sr-only" id="section-1-title">
        Section title
      </h2>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <p className="m-4 flex items-end">
          <Link href={`/div/${team.slug}`}>
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-transparent px-2.5 py-1.5 text-sm font-normal text-gray-400 border-1 border-black shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              <ChevronLeftIcon className="-ml-0.5 h-3 w-3" aria-hidden="true" />
              {team.name} Fixtures
            </button>
          </Link>
        </p>
        <div className="overflow-hidden rounded-lg bg-white shadow m-4 sm:px-2">
          <div className="p-6 text-center text-sm text-black">
            <h2 className="font-semibold leading-6 text-lg">
              <TeamName name={fixture?.HomeTeamNameAbbr} />
            </h2>
            {fixture.result ? (
              <p className="font-semibold leading- text-xl my-2">
                {fixture.HomeScore} - {fixture.AwayScore}
              </p>
            ) : (
              <span className="my-2">v</span>
            )}
            <h2 className="font-semibold leading-6 text-lg">
              <TeamName name={fixture?.AwayTeamNameAbbr} />
            </h2>
          </div>
          <div className="m-4">
            <FixtureMeta fixture={fixture} />
          </div>

          <div className="m-4">
            <Results
              fixtures={opponentResults}
              unicolTeam={team}
              teamKey={fixture.opponent}
              title={`Latest results for ${fixture.opponent}`}
            />
          </div>
        </div>
        <div className="m-4">
          <h3 className="font-medium text-sm mb-2 text-gray-500">
            Other fixtures this round
          </h3>
          <OtherFixtures fixtures={otherFixturesInRound} />
        </div>
      </div>
    </section>
  );
}
