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
  month: "long",
  timeZone: "Pacific/Auckland",
});
