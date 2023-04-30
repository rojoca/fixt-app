export interface Division {
  fixtures?: Fixture[];
  allFixtures: UnicolFixture[];
  firstFixtureDate: string;
  lastResultDate: string;
  roundInfo?: RoundInfo[] | null;
  results: ResultMap;
  team?: Team;
  competitionId: string;
}

export interface Competition {
  fixtures: UnicolFixture[];
  allFixtures: UnicolFixture[];
  firstFixtureDate: string;
  lastResultDate: string;
  roundInfo?: RoundInfo[] | null;
  results: ResultMap;
  team?: Team;
  competitionId: string;
}

export interface Result {
  goalsFor: number;
  goalsAgainst: number;
  result: "W" | "L" | "D";
  isHome: boolean;
  isDefault: boolean;
  fixtureId: string;
  competitionId: string;
}

export interface ResultMap {
  [key: string]: Result[];
}

export interface Fixture {
  Id: string;
  HomeOrgLogo: string;
  AwayOrgLogo: string;
  GradeId: string;
  GradeName: string;
  HomeTeamNameAbbr: string;
  AwayTeamNameAbbr: string;
  CompetitionId?: null;
  Round: string;
  RoundName: string;
  Date: string;
  VenueId?: string | null;
  VenueName: string;
  GLN?: string | null;
  HomeScore: string;
  AwayScore: string;
  SectionId: number;
  SectionName?: null;
  PublicNotes?: null;
  CssName?: null;
  MatchSummary?: null;
  MatchDayDescription?: null;
  SportId?: null;
  matchDay: number;
  Longitude: string;
  Latitude: string;
  Address: string;
  Status: string;
  CometScore: string;
  competitionId: string;
}

export interface UnicolFixture extends Partial<Fixture> {
  Id: string;
  Date: string;
  HomeTeamNameAbbr: string;
  AwayTeamNameAbbr: string;
  HomeScore: string;
  AwayScore: string;
  VenueId?: string | null;
  VenueName: string;
  matchDay: number;
  competitionId: string;
  opponent: string;
  dateString: string;
  timeString: string;
  isHome: boolean;
  isFar: boolean;
  isUnicol: boolean;
  isCup: boolean;
  isPlate: boolean;
  result: Result | null | undefined;
}

export interface CompletedFixture extends UnicolFixture {
  result: Result;
}

export interface RoundInfo {
  matchDay: number;
  description: string;
  phaseId?: null;
  earliestFixtureDate: string;
  latestFixtureDate: string;
  orderNumber: number;
}

export interface StandingsContainer {
  Id?: null;
  Provider: number;
  Name: string;
  Order: number;
  Sections?: SectionsEntity[] | null;
  NrdProvincialUnionId: number;
  IsPlayoff: boolean;
  CarryOverPoints?: null;
}

export interface SectionsEntity {
  Id?: null;
  Name: string;
  Order: number;
  GradeId: number;
  Standings?: Standings[] | null;
}

export interface Standings {
  Id?: null;
  SectionTeamId: number;
  OrganisationId: string;
  OrganisationName?: null;
  Rank: number;
  SportId: string;
  SportName: string;
  GradeId?: null;
  GradeName: string;
  SeasonId?: null;
  SeasonName?: null;
  TeamId: number;
  TeamName: string;
  TeamNameAbbr?: null;
  CompetitionId?: null;
  CompetitionName?: null;
  Played: number;
  Wins: number;
  Draws: number;
  Byes: number;
  Losses: number;
  DefaultLosses: number;
  StandingPoints: number;
  ForPoints: number;
  AgainstPoints: number;
  BonusPoints: number;
  PenaltyPoints: number;
  Differential: number;
  DifferentialPercent: number;
  Total: number;
  Notes?: null;
  PointsAdjustment: number;
  PositivePointsAdjustment: number;
  NegativePointsAdjustment: number;
  DifferentialType: number;
  Provider: number;
  ManualRank?: null;
  OrgLogo: string;
}

export interface Team {
  slug: string;
  key: string;
  keys?: string[];
  name: string;
  competitionId: string;
  competitions: string[];
  standingsId?: string;
  cupIds: string[];
  abbr: string;
  division: string;
}

export type FixturesByDate = { [key: string]: UnicolFixture[] };

export interface Allocation {
  timeString: string;
  location?: string;
  start: string;
  end?: string;
  start1?: string;
  end1?: string;
  start2?: string;
  end2?: string;
  homeRooms?: string[];
  awayRooms?: string[];
}

export interface Aftermatch {
  timeString: string;
  start: string;
  teams: string[];
}

export interface DayRequirements {
  date: string;
  meals: number;
  vans: number;
  changingRooms: number;
  mealFixtures: UnicolFixture[];
  vanFixtures: UnicolFixture[];
  changingRoomFixtures: UnicolFixture[];
}

export interface Requirement {
  count: number;
  fixtures: UnicolFixture[];
}

export interface DayRequirement {
  date: string;
  meals: Requirement;
  vans: Requirement;
  changingRooms: Requirement;
}
