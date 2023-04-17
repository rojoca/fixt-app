import { notFound } from "next/navigation";
import Fixtures from "@/app/components/fixtures";
import {
  COMPETITIONS,
  dateSort,
  isTeam,
  TEAM_MAP,
} from "@/app/utils/constants";
import { getCompetitionFixtures } from "@/app/utils/getCompetitionFixtures";
import { decorateFixtureForTeam } from "@/app/utils/fixtures";

export const dynamic = "force-static";
export const revalidate = 30;

export default async function Page({
  params: { teamSlug },
}: {
  params: { teamSlug: string };
}) {
  const team = TEAM_MAP.find((t) => t.slug === teamSlug);
  if (!team) notFound();

  const comps = COMPETITIONS.filter((c) => team.competitions.includes(c.id));
  const competitions = await Promise.all(
    comps.map(async (comp) => await getCompetitionFixtures(comp.id, comp.isCup))
  );

  // only want results from league games as these are
  // for showing the W L D record of opponents
  const results = competitions.find(
    (comp) => comp.competitionId === team.competitionId
  )?.results;

  if (!results) notFound();

  const fixtures = competitions
    .flatMap((comp) =>
      comp.allFixtures
        .filter((f) => isTeam(f, team))
        .map((f) => decorateFixtureForTeam(f, team.keys || [team.key]))
    )
    .sort(dateSort);

  console.log("BROKE THE CACHE");

  return (
    <section aria-labelledby="section-1-title">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-4 sm:p-6 text-black">
          <h3 className="text-sm font-medium mb-2">Coming Up</h3>
          <Fixtures fixtures={fixtures} team={team} results={results} />
        </div>
      </div>
    </section>
  );
}
