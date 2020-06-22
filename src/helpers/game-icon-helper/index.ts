import { PluginGame } from "@/store/modules/plugins-module/types";

export enum GameIconSize {
  "s16" = 1,
  "s24",
  "s32",
  "s48",
  "s64",
  "s96",
  "s128",
  "s192",
  "s256",
}

export const fullGameIconPath = (game: PluginGame, size: GameIconSize = GameIconSize.s16) => {
  return `/icons/games/${game}/${size}.ico`;
};
