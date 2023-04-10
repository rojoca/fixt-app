import { notFound } from "next/navigation";
import Fixtures from "@/app/components/fixtures";
import { getDivisionFixtures } from "@/app/utils/getDivisionFixtures";
import { TEAM_MAP } from "@/app/utils/constants";

export const revalidate = 3600;

export default async function Page({
  params: { teamSlug },
}: {
  params: { teamSlug: string };
}) {
  const team = TEAM_MAP.find((t) => t.slug === teamSlug);
  if (!team) notFound();

  const division = await getDivisionFixtures(team.competitionId, team.key);

  return (
    <section aria-labelledby="section-1-title">
      <h2 className="sr-only" id="section-1-title">
        Section title
      </h2>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6 text-black">
          <h3 className="text-sm font-medium mb-2">Coming Up</h3>
          <Fixtures
            fixtures={division.fixtures}
            team={team}
            results={division.results}
          />
        </div>
      </div>
    </section>
  );
}
