export type CardType =
  | "challenge"
  | "idea"
  | "event"
  | "inspiration";

export interface RegionStatus {
  vitality: number;
  livability: number;
  environment: number;
  connection: number;
}

export interface Card {
  id: string;
  type: CardType;
  title: string;
  content: string;
}

export interface ChallengeCard extends Card {
  type: "challenge";
  currentSituation: string;
  background: string;
  stakeholders: string[];
  points: string[];
}

export interface IdeaCard extends Card {
  type: "idea";
  benefits: string;
  notes: string;
  statusEffects: Partial<RegionStatus>;
}

export interface EventCard extends Card {
  type: "event";
  impact: string;
  discussionTheme: string;
}

export interface InspirationCard extends Card {
  type: "inspiration";
  region: string;
  initiative: string;
  learning: string;
  application: string;
}

export type GamePhase =
  | "event"
  | "challenge"
  | "discussion"
  | "idea"
  | "result"
  | "reflection"
  | "finished";


export interface GameState {
  turn: number;
  maxTurns: number;
  phase: GamePhase;
  regionStatus: RegionStatus;
}