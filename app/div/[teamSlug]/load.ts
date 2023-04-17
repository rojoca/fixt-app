import {
  COMPETITIONS,
  dateSort,
  isTeam,
  TEAM_MAP,
} from "@/app/utils/constants";
import { decorateFixtureForTeam } from "@/app/utils/fixtures";
import { getCompetitionFixtures } from "@/app/utils/getCompetitionFixtures";
import { notFound } from "next/navigation";
import { cache } from "react";

export const dynamic = "force-static";
export const revalidate = 30;

export const loadTeam = cache(async (teamSlug: string) => {
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

  return {
    results,
    fixtures,
    team,
  };
});
