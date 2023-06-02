import { Fixture, Result, ResultMap, Team, UnicolFixture } from "../types";
import {
  DATE_FORMAT,
  FAR_REGEX,
  getNZOffset,
  getNZOffsetForFixtureDate,
  isBye,
  isNumeric,
  TEAM_MAP,
  TIME_FORMAT,
} from "./constants";

export function getResult(
  fixture: Fixture | UnicolFixture,
  isHomeFn: (fixture: Fixture | UnicolFixture) => boolean,
  competitionId: string
): Result | null {
  if (!isNumeric(fixture.HomeScore) || !isNumeric(fixture.AwayScore))
    return null;

  const isHome = isHomeFn(fixture);
  const goalsFor = Number(isHome ? fixture.HomeScore : fixture.AwayScore);
  const goalsAgainst = Number(isHome ? fixture.AwayScore : fixture.HomeScore);
  return {
    goalsFor,
    goalsAgainst,
    result: goalsFor > goalsAgainst ? "W" : goalsFor < goalsAgainst ? "L" : "D",
    isHome,
    isDefault: fixture.VenueName.toLowerCase().startsWith("default"),
    fixtureId: fixture.Id,
    competitionId,
  };
}

export function getResults(
  fixtures: Fixture[],
  competitionId: string
): ResultMap {
  return fixtures
    .filter((f: Fixture) => f.HomeScore && f.AwayScore && !isBye(f))
    .reduce(
      (
        results: { [key: string]: Result[] },
        fixture: Fixture
      ): { [key: string]: Result[] } => {
        const h = getResult(fixture, () => true, competitionId);
        const a = getResult(fixture, () => false, competitionId);

        if (!h || !a) return results;

        return {
          ...results,
          // load results latest first
          [fixture.HomeTeamNameAbbr]: [
            h,
            ...(results[fixture.HomeTeamNameAbbr] || []),
          ],
          [fixture.AwayTeamNameAbbr]: [
            a,
            ...(results[fixture.AwayTeamNameAbbr] || []),
          ],
        };
      },
      {}
    );
}

export function decorateFixtures(
  fixtures: Fixture[],
  competitionId: string,
  teamKey: string,
  isCup: boolean = false
): UnicolFixture[] {
  const tzOffset = getNZOffset();
  return (
    fixtures.map((fixture: Fixture): UnicolFixture => {
      const isHome = fixture.HomeTeamNameAbbr === teamKey;
      const isUnicol = isHome || fixture.AwayTeamNameAbbr === teamKey;
      const date = new Date(`${fixture.Date}${tzOffset}`);
      const opponent = isHome
        ? fixture.AwayTeamNameAbbr
        : fixture.HomeTeamNameAbbr;

      // this result is always the unicol result (if a unicol team is playing in the fixture)
      const result = getResult(fixture, () => isHome, competitionId);

      return {
        ...fixture,
        isHome,
        opponent,
        result,
        dateString: DATE_FORMAT.format(date),
        timeString: TIME_FORMAT.format(date),
        isFar: !isHome && !!opponent.match(FAR_REGEX),
        isUnicol,
        competitionId,
        isCup,
        isPlate: false,
      };
    }) || []
  );
}

export function decorateFixture(
  fixture: Fixture,
  competitionId: string,
  isCup: boolean = false,
  forTeam?: Team,
  isPlate: boolean = false
): UnicolFixture {
  const tzOffset = getNZOffsetForFixtureDate(fixture.Date);

  let HomeTeamNameAbbr = fixture.HomeTeamNameAbbr;
  const team =
    forTeam ||
    TEAM_MAP.find(
      (t) =>
        t.competitions.includes(competitionId) &&
        (t.key === HomeTeamNameAbbr || t.keys?.includes(HomeTeamNameAbbr))
    ) ||
    TEAM_MAP.find((t) => t.competitions.includes(competitionId));

  if (
    team &&
    isCup &&
    HomeTeamNameAbbr === "Waikato Unicol Association Football Club"
  ) {
    HomeTeamNameAbbr = team.key;
  }
  let AwayTeamNameAbbr = fixture.AwayTeamNameAbbr;
  if (
    team &&
    isCup &&
    AwayTeamNameAbbr === "Waikato Unicol Association Football Club"
  ) {
    AwayTeamNameAbbr = team.key;
  }

  const isTeamHome =
    !!team?.keys?.includes(HomeTeamNameAbbr) || team?.key === HomeTeamNameAbbr;

  const isUnicolHome = !!TEAM_MAP.find((t) =>
    t.keys ? t.keys.includes(HomeTeamNameAbbr) : t.key === HomeTeamNameAbbr
  );
  const isUnicolAway = !!TEAM_MAP.find((t) =>
    t.keys ? t.keys.includes(AwayTeamNameAbbr) : t.key === AwayTeamNameAbbr
  );
  const date = new Date(`${fixture.Date}${tzOffset}`);
  const opponent =
    isTeamHome || (!team && isUnicolHome) ? AwayTeamNameAbbr : HomeTeamNameAbbr;

  // this result is always the unicol result (if a unicol team is playing in the fixture)
  const result = team
    ? getResult(fixture, () => isTeamHome, competitionId)
    : isUnicolHome || isUnicolAway
    ? getResult(fixture, () => isUnicolHome, competitionId)
    : undefined;

  return {
    Id: fixture.Id,
    Date: fixture.Date,
    matchDay: fixture.matchDay,
    HomeScore: fixture.HomeScore,
    AwayScore: fixture.AwayScore,
    HomeTeamNameAbbr,
    AwayTeamNameAbbr,
    VenueName: fixture.VenueName,
    isHome: isTeamHome || (!team && isUnicolHome),
    opponent,
    result,
    dateString: DATE_FORMAT.format(date),
    timeString: TIME_FORMAT.format(date),
    isFar: !isUnicolHome && !!opponent.match(FAR_REGEX),
    isUnicol: isUnicolHome || isUnicolAway,
    competitionId,
    isCup,
    isPlate,
  };
}

export function decorateFixtureForTeam(
  fixture: UnicolFixture,
  teamKeys: string[] // use teamKeys to handle teams having different names (chatham / kate sheppard cup)
) {
  const isHome = teamKeys.includes(fixture.HomeTeamNameAbbr);
  const opponent = isHome ? fixture.AwayTeamNameAbbr : fixture.HomeTeamNameAbbr;
  const result = getResult(fixture, () => isHome, fixture.competitionId);
  return {
    ...fixture,
    opponent,
    isHome,
    result,
  };
}
