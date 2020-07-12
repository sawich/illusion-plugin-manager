import { readFile } from "fs/promises";
import { join } from "path";
import { action, createModule, mutation } from "vuex-class-component";

import { vue } from "@/main";

import { GameId } from "../packages-module/types";
import { Game, IGameInfo, IInstalledPackages as IIPS, InstalledPackage } from "./types";

const VuexModule = createModule({ namespaced: "games", strict: false });

export class GamesModule extends VuexModule {
  /**
   * Getters
   */

  get values() {
    return Object.values(this._games);
  }

  /**
   * Actions
   */

  @action async get(id: GameId) {
    return this._games[id];
  }

  @action async load() {
    const installedGames = await GamesModule.getGamesData();

    for (const installedGame of installedGames) {
      const packages = await GamesModule.getPackagesData(installedGame.path);
      const gameBaseInfo = await fetch(`${__api}/games/${installedGame.game}`);

      this.add(
        new Game({
          ...installedGame,
          info: await gameBaseInfo.json(),
          packages
        })
      );
    }
  }

  @action async togglePackage(installed: InstalledPackage) {
    this._togglePackage(installed);
    await installed.toggle();
    await installed.game.save();
  }

  /**
   * Mutations
   */

  @mutation addPackage(installed: InstalledPackage) {
    vue.$set(installed.game.packages, installed.uuid, installed);
  }

  @mutation deletePackage(installed: InstalledPackage) {
    vue.$delete(installed.game.packages, installed.uuid);
  }

  @mutation add(game: Game) {
    vue.$set(this._games, game.id, game);
  }

  @mutation private _togglePackage(installed: InstalledPackage) {
    installed.disabled = !installed.disabled;
  }

  /**
   * Statics
   */

  private static async readPackages(path: string) {
    try {
      return await readFile(join(path, "angel.packages.json"), "utf-8");
    } catch {
      return "[]";
    }
  }

  private static async readGames() {
    try {
      return await readFile(join(__userdata, "games.json"), "utf-8");
    } catch {
      return "[]";
    }
  }

  private static async getPackagesData(path: string): Promise<IIPS> {
    return JSON.parse(await GamesModule.readPackages(path));
  }

  private static async getGamesData(): Promise<IGameInfo[]> {
    return JSON.parse(await GamesModule.readGames());
  }

  /**
   * Data
   */

  private _games: { [key: number]: Game } = {};
}
