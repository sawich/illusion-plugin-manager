import { readFile } from "fs/promises";
import { join } from "path";
import { action, createModule, mutation } from "vuex-class-component";

import { PluginGame } from "../packages-module/types";
import { Game, IGameInfo, IInstalledPackages } from "./types";

const VuexModule = createModule({ namespaced: "games", strict: false });

export class GamesModule extends VuexModule {
  /**
   * Getters
   */

  get list() {
    return this._games.values();
  }

  @action async get(id: PluginGame) {
    return this._games.get(id) || null;
  }

  /**
   * Actions
   */

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

  /**
   * Mutations
   */

  @mutation add(game: Game) {
    this._games.set(game.id, game);
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

  private static async getPackagesData(path: string) {
    return JSON.parse(
      await GamesModule.readPackages(path)
    ) as IInstalledPackages;
  }

  private static async getGamesData() {
    return JSON.parse(await GamesModule.readGames()) as IGameInfo[];
  }

  /**
   * Data
   */

  _games = new Map<PluginGame, Game>();
}
