import { writeFile } from "fs/promises";
import { join, parse } from "path";

import { games } from "@/store";

import { PackageBuilder } from "../../installer-packages-module/types/core/installer";
import { PluginGame } from "../../packages-module/types";

interface IDllInfo {
  [key: string]: string;
}

export interface IInstalledPackages {
  [key: string]: IInstalledPackage;
}

export interface IGameBaseInfo {
  dlls: IDllInfo;
}

export interface IGameInfo {
  game: PluginGame;
  path: string;
  plugins: string[];
  packages: IInstalledPackages;
  info: IGameBaseInfo;
}

export interface IInstalledPackage {
  uuid: string;
  version: string;
  files: string[];
}

export class InstalledPackage {
  get uuid() {
    return this._uuid;
  }
  get game() {
    return this._game;
  }

  get version() {
    return this._version;
  }

  get files() {
    return this._files;
  }

  toJSON() {
    return {
      uuidentity: this.uuid,
      version: this.version,
      files: this.files
    };
  }

  dll(filename: string) {
    const found = this.files.find(value => {
      const parsed = parse(value);
      return parsed.name == filename && parsed.ext == ".dll";
    });
    if (found === undefined) {
      return null;
    }

    return join(this.game.path, found);
  }

  constructor(info: IInstalledPackage & { game: Game }) {
    this._uuid = info.uuid;
    this._game = info.game;
    this._version = info.version;
    this._files = info.files;
  }

  private _uuid: string;
  private _game: Game;
  private _version: string;
  private _files: string[];
}

export class Game {
  /**
   * Getters
   */

  get id() {
    return this._game;
  }

  get url() {
    return `${__api}/packages/${this._game}`;
  }

  get path() {
    return this._path;
  }

  get keys() {
    return Object.keys(this._packages);
  }

  get packages() {
    return this._packages;
  }

  /**
   * Setters
   */

  set path(path: string) {
    this._path = path;
  }

  /**
   * Methods
   */

  has(uuid: string) {
    return uuid in this._packages;
  }

  package(uuid: string) {
    return this._packages[uuid] || null;
  }

  async save() {
    await writeFile(
      join(this.path, "angel.packages.json"),
      JSON.stringify(this._packages)
    );
  }

  add(builder: PackageBuilder) {
    this._packages[builder.package.uuid] = new InstalledPackage({
      uuid: builder.package.uuidentity,
      files: builder.files,
      version: builder.version,
      game: this
    });
  }

  dll(filename: string) {
    const item = this._dlls[filename];
    if (item !== undefined) {
      return join(this._path, item);
    }

    for (const q in this._packages) {
      const p = this._packages[q];
      const found = p.dll(filename);
      if (found !== null) {
        return found;
      }
    }

    return null;
  }

  constructor(info: IGameInfo) {
    this._game = info.game;
    this._path = info.path;
    this._dlls = info.info.dlls;

    this._packages = Object.fromEntries(
      Object.entries(info.packages).map(([uuid, p]) => [
        uuid,
        new InstalledPackage({ ...p, game: this })
      ])
    );
  }

  private _game: PluginGame;
  private _path: string;
  private _dlls: IDllInfo;
  private _packages: { [key: string]: InstalledPackage };
}
