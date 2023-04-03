export interface Division {
  fixtures: UnicolFixture[];
  allFixtures: UnicolFixture[];
  firstFixtureDate: string;
  lastResultDate: string;
  roundInfo?: RoundInfo[] | null;
  results: { [key: string]: Result[] };
  team?: Team;
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

export interface UnicolFixture extends Fixture {
  opponent: string;
  date: Date;
  dateString: string;
  timeString: string;
  isHome: boolean;
  isFar: boolean;
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
  name: string;
  competitionId: string;
  standingsId?: string;
  abbr: string;
}
