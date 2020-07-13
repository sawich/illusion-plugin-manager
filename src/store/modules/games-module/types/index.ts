import { GameId, InstalledPackages } from "@/store/modules/packages-module/types";
import { join } from "path";


interface IDllInfo {
  [key: string]: string;
}

export interface IGameBaseInfo {
  dlls: IDllInfo;
}

export interface IGameInfo {
  game: GameId;
  path: string;
}

export interface IInstalledPackage {
  files: string[];
  version: string;
  disabled: boolean;
}

export class Game {
  /**
   * Getters
   */

  get id() {
    return this.#id;
  }

  get url() {
    return `${__api}/packages/${this.#id}`;
  }

  get path() {
    return this.#path;
  }

  get packages() {
    return this.#packages;
  }

  /**
   * Setters
   */

  set path(path: string) {
    this.#path = path;
  }

  /**
   * Methods
   */

  has(uuid: string) {
    return this.#packages.has(uuid);
  }

  package(uuid: string) {
    return this.#packages.package(uuid);
  }

  dll(filename: string) {
    const item = this.#dlls[filename];
    if (item) {
      return join(this.#path, item);
    }

    for (const uuid in this.#packages) {
      const _package = this.#packages.package(uuid);
      const found = _package.dll(filename);
      if (found) {
        return found;
      }
    }

    return null;
  }

  constructor(info: IGameInfo) {
    this.#id = info.game;
    this.#path = info.path;
    this.#dlls = info.info.dlls;

    this.#packages = new InstalledPackages({ game: this });
  }

  #id: GameId;
  #path: string;
  #dlls: IDllInfo;
  #packages: InstalledPackages;
}
