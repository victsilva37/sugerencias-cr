import { GameMode } from "./GameMode";
import { Player } from "./Player";

export interface Batalla {
  type: string;
  battleTime: string;
  gameMode: GameMode;
  arena?: string;
  deckSelection?: string;
  isLadderTournament?: boolean;
  team: Player[];
  opponent: Player[];
}