export interface Player {
  id: number;
  name: string;
}

export interface PlayerSettings {
  playerCount: number;
  players: Player[];
}

export interface GameStorage {
  players: Player[];
}