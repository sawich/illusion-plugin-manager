import { GameId } from "@/store/modules/packages-module/types";

export const enum GameIconSize {
  "s16" = 1,
  "s24",
  "s32",
  "s48",
  "s64",
  "s96",
  "s128",
  "s192",
  "s256"
}

export const fullGameIconPath = (
  game: GameId,
  size: GameIconSize = GameIconSize.s16
) => {
  return `/icons/games/${game}/${size}.ico`;
};
