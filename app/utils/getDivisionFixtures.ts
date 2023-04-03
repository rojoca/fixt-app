import { cache } from "react";
import { Division, Fixture, Result } from "../types";
import { DATE_FORMAT, FAR_REGEX, isNumeric, TIME_FORMAT } from "./constants";

export const revalidate = 3600;

export const getDivisionFixtures = cache(
  async (competitionId: string, teamKey: string): Promise<Division> => {
    const result = await fetch(
      "https://www.waibopfootball.co.nz/api/1.0/competition/cometwidget/filteredfixtures",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          "content-type": "application/json; charset=UTF-8",
          "sec-ch-ua":
            '"Chromium";v="110", "Not A Brand";v="24", "Google Chrome";v="110"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
        referrer:
          "https://www.waibopfootball.co.nz/draws/seniors-waikato-bop-1",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: `{"competitionId":"${competitionId}","orgIds":"94747,84593,45039,44984,44917,44985,70953,44978,66265,66266,66255,66267,66268,70472,68152,68153,68154,68192,68232,82419,82420,45076,47312,88341,44986,91614,44895,45077,45015,44919,44987,265712,44988,44989,45036,59241,44990,59260,44991,45072,44535,44992,44950,256572,59262,44993,93454,44994,45081,104712,44937,45018,44973,44930,44903,44946,44996,203732,45021,44890,45073,44893,44940,45082,45029,44980,44998,45038,45078,44907,113192,45165,80712,247532,44995,45000,44936,45030,44948,44931,45014,44891,44971,44943,227532,44910,45001,45002,44938,44904,44899,45003,44977,45016,44939,59266,45004,91620,91619,91618,45005,44915,45022,59316,45006,45007,44941,45008,44956,44900,44942,45028,44969,44892,47321,45031,44914,45009,91615,44972,44898,45013,44922,45170,45033,44982,44968,45160,44896,44947,45079,44979,45026,45023,45010,44897,73855,73857,73856,73854,73853,73852,60685,44546,47006,89783,47227,46709,47220,66262,66256,66258,67972,44908,44927,62175,70954,47313,66259,66261,66232,66263,66264,45070,45034,88714,44894,45017,45011,44912,45168,44911,44949,45166,45012","from":"2023-03-20T00:00:00.000Z","to":"2023-09-30T00:00:00.000Z","sportId":"1","seasonId":"2023","gradeIds":"SENIORS","gradeId":"","organisationId":"","roundId":null,"roundsOn":false,"matchDay":null,"phaseId":null}`,
        method: "POST",
        mode: "cors",
        credentials: "include",
        next: {
          revalidate: 3600,
        },
      }
    );
    // Recommendation: handle errors
    if (!result.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    const data = await result.json();

    data.results = data.fixtures
      .filter((f: Fixture) => f.HomeScore && f.AwayScore)
      .reduce(
        (
          results: { [key: string]: Result[] },
          fixture: Fixture
        ): { [key: string]: Result[] } => {
          const home = Number(fixture.HomeScore);
          const away = Number(fixture.AwayScore);

          const h: Result = {
            goalsFor: home,
            goalsAgainst: away,
            result: home > away ? "W" : home < away ? "L" : "D",
            isHome: true,
            isDefault: fixture.VenueName.toLowerCase().startsWith("default"),
            fixtureId: fixture.Id,
            competitionId,
          };

          const a: Result = {
            goalsFor: away,
            goalsAgainst: home,
            result: away > home ? "W" : away < home ? "L" : "D",
            isHome: false,
            isDefault: fixture.VenueName.toLowerCase().startsWith("default"),
            fixtureId: fixture.Id,
            competitionId,
          };

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

    data.allFixtures =
      data?.fixtures.map((fixture: Fixture) => {
        const isHome = fixture.HomeTeamNameAbbr === teamKey;
        const isUnicol = isHome || fixture.AwayTeamNameAbbr === teamKey;
        const date = new Date(
          `${fixture.Date}+${
            fixture.Date < "2023-04-02" || fixture.Date > "2023-10-01"
              ? "1300"
              : "1200"
          }`
        );
        const opponent = isHome
          ? fixture.AwayTeamNameAbbr
          : fixture.HomeTeamNameAbbr;

        const hasResult =
          isNumeric(fixture.HomeScore) && isNumeric(fixture.AwayScore);
        let result = null;

        if (hasResult) {
          const goalsFor = Number(
            isHome ? fixture.HomeScore : fixture.AwayScore
          );
          const goalsAgainst = Number(
            isHome ? fixture.AwayScore : fixture.HomeScore
          );
          result = {
            goalsFor: isUnicol ? goalsFor : fixture.HomeScore,
            goalsAgainst: isUnicol ? goalsAgainst : fixture.AwayScore,
            result:
              goalsFor > goalsAgainst
                ? "W"
                : goalsFor < goalsAgainst
                ? "L"
                : "D",
            isHome,
            isUnicol,
            isDefault: fixture.VenueName.toLowerCase().startsWith("default"),
            fixtureId: fixture.Id,
            competitionId,
          };
        }

        return {
          ...fixture,
          isHome,
          opponent,
          hasResult,
          result,
          dateString: DATE_FORMAT.format(date),
          timeString: TIME_FORMAT.format(date),
          isFar: !isHome && !!opponent.match(FAR_REGEX),
          competitionId,
        };
      }) || [];

    data.fixtures = data.allFixtures.filter(
      (fixture: Fixture) =>
        fixture.HomeTeamNameAbbr == teamKey ||
        fixture.AwayTeamNameAbbr === teamKey
    );

    return data;
  }
);
