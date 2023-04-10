import { add, sub } from "date-fns";
import { Team } from "../types";

export const FAR_REGEX =
  /(Thames|Matamata|Waihi|Huntly|Morrinsville|Cambridge|Taupo|Te Awamutu|Papamoa|Otumoetai|Ngongotaha|Taumarunui|Tokoroa|Tauranga|Lakes|Rotorua|Otorohanga|Tokoroa|Putaruru|South Waikato)/;

export const TEAM_MAP: Team[] = [
  {
    slug: "presidents-xi",
    key: "Waikato Unicol Veterans",
    name: "President's XI",
    abbr: "Pres XI",
    competitionId: "2647012703",
  },
  {
    slug: "w-prem",
    key: "Waikato Unicol Women's Premiers",
    name: "Womens Prems",
    abbr: "W Prem",
    competitionId: "2595102857",
    standingsId: "2654124199",
  },
  {
    slug: "w-res",
    key: "Waikato Unicol Women's Reserves",
    name: "Womens Reserves",
    abbr: "W Res",
    competitionId: "2648187978",
  },
  {
    slug: "m-prem",
    key: "Waikato Unicol AFC Southern Conference",
    name: "Mens Prems",
    abbr: "M Prem",
    competitionId: "2576806100",
  },
  {
    slug: "m-res",
    key: "Waikato Unicol AFC U23 Reserves",
    name: "Mens Res (U23)",
    abbr: "M Res",
    competitionId: "2623817037",
  },
  {
    slug: "w-b",
    key: "Waikato Unicol Womens B",
    name: "Womens B",
    abbr: "W B",
    competitionId: "2648187511",
  },
  {
    slug: "black",
    key: "Waikato Unicol Black",
    name: "Black",
    abbr: "Black",
    competitionId: "2647012697",
  },
  {
    slug: "red-boys",
    key: "Waikato Unicol Red Boys",
    name: "Red Boys",
    abbr: "Red Boys",
    competitionId: "2647012703",
  },
  {
    slug: "gold",
    key: "Waikato Unicol Gold",
    name: "Gold",
    abbr: "Gold",
    competitionId: "2647022678",
  },
  {
    slug: "m-d4",
    key: "Waikato Unicol Div 4",
    abbr: "M D4",
    name: "Mens Div 4",
    competitionId: "2647023978",
  },
];

export function isNumeric(value: string) {
  return /^-?\d+$/.test(value);
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

export function getNZOffset() {
  const dateString = Intl.DateTimeFormat("en-NZ", {
    day: "2-digit",
    timeZone: "Pacific/Auckland",
    timeZoneName: "short",
  }).format(new Date());
  return dateString.slice(3) === "NZDT" ? "+1300" : "+1200";
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
  const regex =
    /(?<day>\d+)\/(?<month>\d+)\/(?<year>\d+), (?<hour>\d+):(?<minute>\d+):(?<second>\d+) ([ap]m) (?<tz>NZ[DS]T)/;
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

  console.log(
    "DAY STRING ",
    date,
    " | ",
    dateString,
    " | ",
    dateString.match(regex)?.groups
  );
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
  console.log("DAY", day);
  const startOfWeekDate = sub(utcDate, { days: DAYS.indexOf(day) });
  console.log("startOfWeekDate", startOfWeekDate);

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
