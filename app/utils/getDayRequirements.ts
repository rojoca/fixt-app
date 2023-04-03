import { cache } from "react";
import { DayRequirements, UnicolFixture } from "../types";
import { TEAM_MAP } from "./constants";
import { getDivisionFixtures } from "./getDivisionFixtures";

function isVanFixture(fixture: UnicolFixture) {
  return fixture.isFar;
}

function isMealFixture(fixture: UnicolFixture) {
  return (
    fixture.isHome ||
    fixture.VenueName.includes("Jansen Park") ||
    // meals and changing rooms
    fixture.VenueName.includes("Waikato University")
  );
}

function isChangingRoomFixture(fixture: UnicolFixture) {
  return fixture.VenueName.includes("Waikato University");
}

function isBye(fixture: UnicolFixture) {
  return fixture.AwayTeamNameAbbr.startsWith("BYE");
}

function isPostPoned(fixture: UnicolFixture) {
  return fixture.VenueName.startsWith("Postponed");
}

function isDefault(fixture: UnicolFixture) {
  return fixture.VenueName.startsWith("Default");
}

function orgFilter(fixture: UnicolFixture) {
  return (
    !isPostPoned(fixture) &&
    !isBye(fixture) &&
    !isDefault(fixture) &&
    // vans
    (isVanFixture(fixture) ||
      // meals
      isMealFixture(fixture) ||
      // meals and changing rooms
      isChangingRoomFixture(fixture))
  );
}

const MEALS_PER_FIXTURE = 2;

export const getDayRequirements = cache(
  async (): Promise<DayRequirements[]> => {
    const fixtures = (
      await Promise.all(
        TEAM_MAP.map(async (team) => {
          const division = await getDivisionFixtures(
            team.competitionId,
            team.key
          );
          return division.fixtures.filter(orgFilter);
        })
      )
    )
      .flat()
      .reduce((acc: UnicolFixture[], fixture: UnicolFixture) => {
        // filter duplicates (unicol v unicol fixtures)
        if (acc.find((f) => f.Id === fixture.Id)) return acc;
        return [...acc, fixture];
      }, [])
      .reduce((acc: DayRequirements[], fixture: UnicolFixture) => {
        // map the date to meal, van, changing room count
        const date = fixture.Date.split("T")[0];
        const dayIndex = acc.findIndex((d) => d.date === date);
        const index = dayIndex < 0 ? acc.length : dayIndex;
        const updated = [...acc];

        const day =
          dayIndex >= 0
            ? acc[dayIndex]
            : ({
                date,
                meals: 0,
                vans: 0,
                changingRooms: 0,
                mealFixtures: [],
                vanFixtures: [],
                changingRoomFixtures: [],
              } as DayRequirements);

        updated.splice(index, 1, {
          ...day,

          vans: day.vans + (isVanFixture(fixture) ? 1 : 0),
          vanFixtures: [
            ...day.vanFixtures,
            ...(isVanFixture(fixture) ? [fixture] : []),
          ],

          meals: day.meals + (isMealFixture(fixture) ? MEALS_PER_FIXTURE : 0),
          mealFixtures: [
            ...day.mealFixtures,
            ...(isMealFixture(fixture) ? [fixture] : []),
          ],

          changingRooms:
            day.changingRooms + (isChangingRoomFixture(fixture) ? 2 : 0),
          changingRoomFixtures: [
            ...day.changingRoomFixtures,
            ...(isChangingRoomFixture(fixture) ? [fixture] : []),
          ],
        });

        return updated;
      }, [])
      .sort((d1, d2) => (d1.date < d2.date ? -1 : d1.date > d2.date ? 1 : 0));

    return fixtures;
  }
);
