import "server-only";
import { cache } from "react";
import { Standings } from "../types";

export const revalidate = 3600;

export const getDivisionStandings = cache(
  async (competitionId: string): Promise<Standings[]> => {
    const result = await fetch(
      "https://www.waibopfootball.co.nz/api/1.0/competition/cometwidget/filteredstandings",
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
        body: `{"competitionId":"${competitionId}","phaseId":"2641773001","orgIds":"","from":"2023-03-22T00:00:00.000Z","to":"2023-10-30T00:00:00.000Z","sportId":"1","seasonId":"2023","gradeIds":"","gradeId":"","organisationId":"","roundId":null,"roundsOn":false}`,
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
    return data[0]?.Sections[0]?.Standings?.filter(
      (row: Standings) => !row.TeamName.includes("BYE")
    );
  }
);
