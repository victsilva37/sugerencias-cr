import { Card } from "./Card";

export interface Player {
  tag: string;
  name: string;
  trophyChange?: number;
  startingTrophies?: number;
  crowns?: number;
  kingTowerHitPoints?: number;
  princessTowersHitPoints?: number[];
  cards: Card[];
}



