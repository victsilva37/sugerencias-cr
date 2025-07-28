export interface Card {
  name: string;
  level: number;
  evolutionLevel?: number;
  rarity: string;
  elixirCost: number;
  iconUrls: {
    medium: string;
    evolutionMedium?: string;
  };
}
