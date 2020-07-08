export const enum PlacerType {
  Git,
  Patreon
}

export interface IPlacerHeader {
  type: PlacerType;
}

export type IGitPlacer = {
  url: string;
} & IPlacerHeader;
