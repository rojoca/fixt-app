import { add, sub } from "date-fns";
import { Fixture, Team, UnicolFixture } from "../types";

export const FAR_REGEX = new RegExp(
  "(Thames|Matamata|Waihi|Huntly|Morrinsville|Cambridge|Taupo|Te Awamutu|Papamoa|Otumoetai|Ngongotaha|Taumarunui|Tokoroa|Tauranga|Lakes|Rotorua|Otorohanga|Tokoroa|Putaruru|South Waikato)"
);

export const CUPS: { [key: string]: string } = { "2681355377": "Waikato Cup" };

export const PLATES: string[] = [];

export const COMPETITIONS = [
  {
    id: "2681355377",
    name: "Waikato Cup",
    isCup: true,
    isPlate: false,
  },
  {
    id: "2630433561",
    name: "Kate Sheppard Cup",
    teamKey: "Waikato Unicol Association Football Club",
    isCup: true,
    isPlate: false,
  },
  {
    id: "2630422858",
    name: "Chatham Cup",
    isCup: true,
    isPlate: false,
  },
  {
    id: "2647012703",
    name: "Div 2",
    isCup: false,
    isPlate: false,
  },
  {
    id: "2595102857",
    name: "W-League",
    isCup: false,
    isPlate: false,
  },
  {
    id: "2648187978",
    name: "Div 1",
    isCup: false,
    isPlate: false,
  },
  {
    id: "2576806100",
    name: "NRFL Southern Conference",
    isCup: false,
    isPlate: false,
  },
  {
    id: "2623817037",
    name: "NRFL Southern Conference (U23)",
    isCup: false,
    isPlate: false,
  },
  {
    id: "2648187511",
    name: "Div 2",
    isCup: false,
    isPlate: false,
  },
  {
    id: "2647012697",
    name: "Div 1",
    isCup: false,
    isPlate: false,
  },
  {
    id: "2647022678",
    name: "Div 3",
    isCup: false,
    isPlate: false,
  },
  // {
  //   id: "2647023978",
  //   name: "Div 4",
  //   isCup: false,
  //   isPlate: false,
  // },
];

export const ALL_COMP_IDS = COMPETITIONS.map((comp) => comp.id);

export const TEAM_MAP: Team[] = [
  {
    slug: "presidents-xi",
    key: "Waikato Unicol Veterans",
    name: "President's XI",
    abbr: "Pres XI",
    competitionId: "2647012703",
    competitions: ["2647012703", "2681355377"],
    cupIds: ["2681355377"],
    division: "Div 2",
  },
  {
    slug: "w-prem",
    key: "Waikato Unicol Women's Premiers",
    keys: [
      "Waikato Unicol Women's Premiers",
      "Waikato Unicol Association Football Club",
    ],
    name: "Womens Prems",
    abbr: "W Prem",
    competitionId: "2595102857",
    competitions: ["2595102857", "2630433561"],
    standingsId: "2654124199",
    cupIds: ["2630433561"],
    division: "W-League",
  },
  {
    slug: "w-res",
    key: "Waikato Unicol Women's Reserves",
    name: "Womens Reserves",
    abbr: "W Res",
    competitionId: "2648187978",
    competitions: ["2648187978"],
    cupIds: [],
    division: "Div 1",
  },
  {
    slug: "m-prem",
    key: "Waikato Unicol AFC Southern Conference",
    keys: [
      "Waikato Unicol AFC Southern Conference",
      "Waikato Unicol Association Football Club",
    ],
    name: "Mens Prems",
    abbr: "M Prem",
    competitionId: "2576806100",
    competitions: ["2576806100", "2630422858"],
    cupIds: [],
    division: "NRFL Southern Conference",
  },
  {
    slug: "m-res",
    key: "Waikato Unicol AFC U23 Reserves",
    name: "Mens Res (U23)",
    abbr: "M Res",
    competitionId: "2623817037",
    competitions: ["2623817037"],
    cupIds: [],
    division: "NRFL Southern Conference (U23)",
  },
  {
    slug: "w-b",
    key: "Waikato Unicol Womens B",
    name: "Womens B",
    abbr: "W B",
    competitionId: "2648187511",
    competitions: ["2648187511"],
    cupIds: [],
    division: "Div 2",
  },
  {
    slug: "black",
    key: "Waikato Unicol Black",
    name: "Black",
    abbr: "Black",
    competitionId: "2647012697",
    competitions: ["2647012697", "2681355377"],
    cupIds: ["2681355377"],
    division: "Div 1",
  },
  {
    slug: "red-boys",
    key: "Waikato Unicol Red Boys",
    name: "Red Boys",
    abbr: "Red Boys",
    competitionId: "2647012703",
    competitions: ["2647012703", "2681355377"],
    cupIds: ["2681355377"],
    division: "Div 2",
  },
  {
    slug: "gold",
    key: "Waikato Unicol Gold",
    name: "Gold",
    abbr: "Gold",
    competitionId: "2647022678",
    competitions: ["2647022678", "2681355377"],
    cupIds: ["2681355377"],
    division: "Div 3",
  },
  // {
  //   slug: "m-d4",
  //   key: "Waikato Unicol Div 4",
  //   abbr: "M D4",
  //   name: "Mens Div 4",
  //   competitionId: "2647023978",
  //   competitions: ["2647023978", "2681355377"],
  //   cupIds: ["2681355377"],
  //   division: "Div 4",
  // },
];

export function isNumeric(value: string) {
  return /^-?[0-9]+$/.test(value);
}

export const TIME_FORMAT = new Intl.DateTimeFormat("en-NZ", {
  timeStyle: "short",
  timeZone: "Pacific/Auckland",
});

export const DATE_FORMAT = new Intl.DateTimeFormat("en-NZ", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "Pacific/Auckland",
});

export function getNZOffset(fromDate = new Date()) {
  const dateString = Intl.DateTimeFormat("en-NZ", {
    day: "2-digit",
    timeZone: "Pacific/Auckland",
    timeZoneName: "short",
  }).format();
  return dateString.slice(3) === "NZDT" ? "+1300" : "+1200";
}

export function getNZOffsetForFixtureDate(date: string) {
  // fixture dates are alwasy YYY-MM-DDTHH:mm:ss
  const [datePart] = date.split("T");
  const dateObj = new Date(datePart);
  return getNZOffset(dateObj);
}

/**
 * Get NZ date string with offset from given date or Today if none is given
 *
 * @param date? Date (optional) if not given, use current date
 * @returns string in "YYYY-MM-DDTHH:mm:ss+1300|1200" format
 */
export function getDateString(
  date?: Date,
  overrides?: {
    day?: string;
    month?: string;
    year?: string;
    hour?: string;
    minute?: string;
    second?: string;
    tz?: string;
  }
): string {
  // Have to do this because latest Intl.DateTimeFormat options are not available everywhere yet
  const regex = new RegExp(
    "(?<day>[0-9]+)[/](?<month>[0-9]+)[/](?<year>[0-9]+),[\\s](?<hour>[0-9]+):(?<minute>[0-9]+):(?<second>[0-9]+)[\\s][ap]m[\\s](?<tz>NZ[DS]T)"
  );
  const dateString = Intl.DateTimeFormat("en-NZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Pacific/Auckland",
    timeZoneName: "short",
  }).format(date || new Date());

  const values = dateString.match(regex)?.groups || {};
  if (values) {
    const v = { ...values, ...(overrides || {}) };
    const offset = v["tz"] === "NZDT" ? "+1300" : "+1200";
    return `${v["year"]}-${v["month"]}-${v["day"]}T${v["hour"]}:${v["minute"]}:${v["second"]}${offset}`;
  }

  // should never get here
  return dateString;
}

/**
 * Get current JS Date in
 * @returns Date
 */
export function getTodayDate() {
  const dateString = getDateString();
  return new Date(dateString);
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Sat", "Sun"];

/**
 * Get the start of the week (in NZ time) as a date string for the given
 * date.
 * @param date Date
 * @returns string
 */
export function getStartOfNZWeek(date?: Date): string {
  const utcDate = date || new Date();
  const day = Intl.DateTimeFormat("en-NZ", {
    weekday: "short",
    timeZone: "Pacific/Auckland",
  }).format(utcDate);
  const startOfWeekDate = sub(utcDate, { days: DAYS.indexOf(day) });

  return getDateString(startOfWeekDate, {
    hour: "00",
    minute: "00",
    second: "00",
  });
}

/**
 * Get the end of the week in NN time as a date string for the given
 * date
 * @param date Date
 * @returns stringn
 */
export function getEndOfNZWeek(date?: Date): string {
  const utcDate = date || new Date();
  const day = Intl.DateTimeFormat("en-NZ", {
    weekday: "short",
    timeZone: "Pacific/Auckland",
  }).format(utcDate);
  const endOfNZWeek = add(utcDate, { days: 6 - DAYS.indexOf(day) });

  return getDateString(endOfNZWeek, {
    hour: "23",
    minute: "59",
    second: "59",
  });
}

export function dateSort(
  f1: Fixture | UnicolFixture,
  f2: Fixture | UnicolFixture,
  reverse = false
) {
  const first = reverse ? 1 : -1;
  const last = reverse ? -1 : 1;
  return f1.Date < f2.Date ? first : f1.Date > f2.Date ? last : 0;
}

export function dateSortReverse(
  f1: Fixture | UnicolFixture,
  f2: Fixture | UnicolFixture,
  reverse = false
) {
  return dateSort(f1, f2, true);
}

export function isCup(competitionId: string) {
  return Object.keys(CUPS).includes(competitionId);
}

export function isPlate(competitionId: string) {
  return PLATES.includes(competitionId);
}

export function isTeam(fixture: Fixture | UnicolFixture, team: Team) {
  if (team.keys) {
    return (
      team.keys.includes(fixture.HomeTeamNameAbbr) ||
      team.keys.includes(fixture.AwayTeamNameAbbr)
    );
  }
  return (
    team.key === fixture.HomeTeamNameAbbr ||
    team.key === fixture.AwayTeamNameAbbr
  );
}

export function isBye(fixture: Fixture | UnicolFixture) {
  return (
    fixture.AwayTeamNameAbbr.toLowerCase().startsWith("bye") ||
    fixture.HomeTeamNameAbbr.toLowerCase().startsWith("bye")
  );
}
