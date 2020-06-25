export const enum PluginPlace {
  Git,
  Patreon,
}

export const enum PluginGame {
  /** Play Home */
  PlayHome,

  /** Honey Select 1 */
  HoneySelect1,

  /** Koikatsu */
  Koikatsu,

  /** AI Shoujo */
  AIShoujo,

  /** Honey Select 2 */
  HoneySelect2,
}

export const enum PluginResolve {
  /** Visual Studio C# Project */
  VSCSP,

  /** Visual Studio C# Solution */
  VSCS,

  /** Visual Studio C++ Solution */
  VSCpp,

  /** Zip archive */
  UnZip,
}

export const enum ContainerCategory {
  Plugin,
  Tool,
}

export const enum ContainerType {
  All,
  Partial,
}

export interface IPluginContainer {
  identity: number;
  category: ContainerCategory;
  place: PluginPlace;
  type: ContainerType;
}

export interface IPluginEntity {
  id: number;
  lang: number;
  resolve: PluginResolve;
  dependencies: number[];
}

export interface IGitPlugin extends IPluginEntity, IPluginContainer {
  games: PluginGame[];
  url: string;
}

export interface IGitPartialPlugin extends IPluginContainer {
  url: string;
}

export interface IProjectGitPartialPlugin extends IPluginEntity {
  games: PluginGame[];
  folder: string;
}
