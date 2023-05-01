import { notFound } from "next/navigation";
import Fixtures from "@/app/components/fixtures";
import {
  dateSort,
  getDateString,
  getTodayDate,
  TEAM_MAP,
} from "@/app/utils/constants";
import { getFixtures } from "@/app/utils/data";

export const revalidate = 3600;

export async function generateStaticParams() {
  return TEAM_MAP.map((t) => ({ teamSlug: t.slug }));
}

export default async function Page({
  params: { teamSlug },
}: {
  params: { teamSlug: string };
}) {
  const team = TEAM_MAP.find((t) => t.slug === teamSlug);
  if (!team) notFound();

  const competitions = await getFixtures(
    team.competitions,
    undefined,
    team.key,
    undefined,
    true
  );

  // only want results from league games as these are
  // for showing the W L D record of opponents
  const results = competitions.find(
    (comp) => comp.competitionId === team.competitionId
  )?.results;

  if (!results) notFound();

  const today = getDateString(undefined, {
    hour: "23",
    minute: "59",
    second: "59",
  });
  const fixtures = competitions
    .flatMap((comp) => comp.allFixtures)
    .filter((f) => f.Date >= today && !f.result)
    .sort(dateSort);

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
