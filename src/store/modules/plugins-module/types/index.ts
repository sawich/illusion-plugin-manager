export enum PluginPlace {
  Git,
  Patreon,
}

export enum PluginGame {
  PlayHome,
  HoneySelect1,
  Koikatsu,
  AIShoujo,
  HoneySelect2,
}

export enum PluginResolver {
  VSCSharpPartial,
  VSCSharp,
  VSCpp,
  UnZip,
}

export interface IPluginRaw {
  id: number;
  lang: number;
  identity: number;
  place: PluginPlace;
  games: PluginGame[];
  resolver: PluginResolver;
  dependencies: number[];
}

export interface IGitPluginRaw extends IPluginRaw {
  url: string;
  folder: string;
}
