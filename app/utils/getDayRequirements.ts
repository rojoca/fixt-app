import { cache } from "react";
import { DayRequirement, Requirement, UnicolFixture } from "../types";
import { ALL_COMP_IDS } from "./constants";
import { getFixtures } from "./data";

export const revalidate = 3600;

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
  return fixture.AwayTeamNameAbbr.toLowerCase().startsWith("bye");
}

function isPostPoned(fixture: UnicolFixture) {
  return fixture.VenueName.toLowerCase().startsWith("postponed");
}

function isDefault(fixture: UnicolFixture) {
  return fixture.VenueName.toLowerCase().startsWith("default");
}

function requirementsFilter(fixture: UnicolFixture) {
  return (
    fixture.Date && // ensure fixture has a date
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

function updateRequirement(
  requirement: Requirement,
  fixture: UnicolFixture,
  testFn: (fixture: UnicolFixture) => boolean,
  increment: number = 1
) {
  if (!testFn(fixture)) return requirement;
  return {
    count: requirement.count + increment,
    fixtures: [...requirement.fixtures, fixture],
  };
}

function updateDayRequirements(
  date: string,
  fixture: UnicolFixture,
  dayRequirement?: DayRequirement
): DayRequirement {
  const day =
    dayRequirement || ({ date, ...DEFAULT_REQUIREMENTS } as DayRequirement);

  if (day.date !== date) return day;

  return {
    ...day,
    vans: updateRequirement(day.vans, fixture, isVanFixture),
    meals: updateRequirement(
      day.meals,
      fixture,
      isMealFixture,
      MEALS_PER_FIXTURE
    ),
    changingRooms: updateRequirement(
      day.changingRooms,
      fixture,
      isChangingRoomFixture,
      2
    ),
  };
}

const MEALS_PER_FIXTURE = 2;
const DEFAULT_REQUIREMENTS = {
  vans: {
    count: 0,
    fixtures: [],
  },
  meals: {
    count: 0,
    fixtures: [],
  },
  changingRooms: {
    count: 0,
    fixtures: [],
  },
};

export const getDayRequirements = cache(async (): Promise<DayRequirement[]> => {
  const requirements = (await getFixtures(ALL_COMP_IDS, true))
    .flatMap((comp) =>
      comp.allFixtures.filter((f) => f.isUnicol && requirementsFilter(f))
    )
    .sort((f1, f2) => (f1.Date < f2.Date ? -1 : f1.Date > f2.Date ? 1 : 0))
    // filter duplicates (unicol v unicol fixtures)
    .reduce((acc: UnicolFixture[], fixture: UnicolFixture) => {
      if (acc.find((f) => f.Id === fixture.Id)) return acc;
      return [...acc, fixture];
    }, [])
    // map the date to meal, van, changing room count
    .reduce((acc: DayRequirement[], fixture: UnicolFixture) => {
      const date = fixture.Date.split("T")[0];

      // new date
      if (!acc.find((f) => f.date === date)) {
        return [...acc, updateDayRequirements(date, fixture)];
      }

      // update existing date requirements
      return acc.map((day) => updateDayRequirements(date, fixture, day));
    }, []);

  return requirements;
});
