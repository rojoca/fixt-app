import { Division } from "../types";
import { COMPETITIONS, TEAM_MAP } from "./constants";
import { getCompetitionFixtures } from "./waibop";

export function makeSearchParams(
  competitionIds: string[],
  isUnicol?: boolean,
  team?: string,
  matchDay?: string,
  onlyTeam?: boolean
) {
  // use a function to ensure that the params are always added in the same order
  const params = new URLSearchParams();
  competitionIds.forEach((comp) => params.append("competition", comp));
  if (isUnicol) {
    params.append("isUnicol", "true");
  }
  if (team) {
    params.append("team", team);
  }
  if (matchDay) {
    params.append("matchDate", matchDay);
  }
  if (onlyTeam) {
    params.append("onlyTeam", "true");
  }
  params.sort();
  return params;
}

export async function getFixtures(
  competitionIds: string[],
  isUnicol?: boolean,
  team?: string,
  matchDay?: string,
  onlyTeam?: boolean
) {
  const params = makeSearchParams(
    competitionIds,
    isUnicol,
    team,
    matchDay,
    onlyTeam
  );

  try {
    const result = await fetch(
      `http${process.env.VERCEL_URL?.includes("localhost") ? "" : "s"}://${
        process.env.VERCEL_URL
      }/api/fixtures?${params.toString()}`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    const data: Division[] = await result.json();
    return data;
  } catch {
    const compFilter = (comp: { id: string }) =>
      competitionIds.length > 0 ? competitionIds.includes(comp.id) : true;

    const teamObj = team
      ? TEAM_MAP.find((t) => t.keys?.includes(team) || t.key === team)
      : undefined;

    return await Promise.all(
      COMPETITIONS.filter(compFilter).map(async (comp) => {
        return await getCompetitionFixtures(
          comp.id,
          comp.isCup,
          isUnicol,
          teamObj,
          matchDay ? Number(matchDay) : undefined,
          comp.isPlate,
          onlyTeam
        );
      })
    );
  }
}
