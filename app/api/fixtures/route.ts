import { COMPETITIONS, TEAM_MAP } from "@/app/utils/constants";
import { getCompetitionFixtures } from "@/app/utils/waibop";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const competitionIds = searchParams.getAll("competition");
  const isUnicol = searchParams.has("unicol");
  const teamKey = searchParams.get("team") || undefined;
  const matchDay = searchParams.get("matchDay") || undefined;
  const onlyTeam = searchParams.has("onlyTeam");

  const compFilter = (comp: { id: string }) =>
    competitionIds.length > 0 ? competitionIds.includes(comp.id) : true;

  const team = teamKey
    ? TEAM_MAP.find((t) => t.keys?.includes(teamKey) || t.key === teamKey)
    : undefined;

  const comps = await Promise.all(
    COMPETITIONS.filter(compFilter).map(async (comp) => {
      return await getCompetitionFixtures(
        comp.id,
        comp.isCup,
        isUnicol,
        team,
        matchDay ? Number(matchDay) : undefined,
        comp.isPlate,
        onlyTeam
      );
    })
  );

  return NextResponse.json(comps);
}
