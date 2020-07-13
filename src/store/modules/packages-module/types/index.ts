import { vue } from '@/main';
import { Game, IInstalledPackage } from "@/store/modules/games-module/types";
import { unlink, writeFile } from "fs/promises";
import { join, parse } from "path";

export const enum GameId {
  /** 0. Play Home */
  PlayHome,

  /** 1. Honey Select 1 */
  HoneySelect1,

  /** 2. Koikatsu */
  Koikatsu,

  /** 3. Koikatsu (Steam) */
  KoikatsuSteam,

  /** 4. AI Shoujo */
  AIShoujo,

  /** 5. AI Shoujo (Steam) */
  AIShoujoSteam,

  /** 6. Honey Select 2 */
  HoneySelect2,

  /** 7. Emotion Creators */
  EmotionCreators
}

export interface IPackage {
  uuid: string;
  lang: string;
  uuidEntity: string;
}

export class InstalledPackage {
  /**
   * Getters
   */

  get uuid() {
    return this.#uuid;
  }

  get packages() {
    return this.#packages;
  }

  get uuidEntity() {
    return this.#uuidEntity;
  }

  get disabled() {
    return this.#disabled;
  }

  get version() {
    return this.#version;
  }

  /**
   * Setters
   */

  set disabled(value) {
    this.#disabled = value;
  }

  /**
   * Statics
   */

  static get disabledPrefix() {
    return "_disabled";
  }

  /**
   * Methods
   */

  async uninstall() {
    await Promise.allSettled(
      this.#files.map(file => {
        const path = this.actualPath(file);
        return unlink(path);
      })
    );
  }

  toJSON() {
    return {
      uuid: this.uuid,
      version: this.#version,
      files: this.#files,
      disabled: this.disabled
    };
  }


  dll(filename: string) {
    const found = this.#files.find(value => {
      const parsed = parse(value);
      return parsed.name == filename && parsed.ext == ".dll";
    });

    if (found === undefined) {
      return null;
    }

    return join(this.game.path, found);
  }


  actualPath(file: string) {
    return join(
      this.packages.game.path,
      this.disabled ? `${file}${InstalledPackage.disabledPrefix}` : file
    );
  }

  constructor(info: IInstalledPackage & { packages: InstalledPackages }) {
    this.#uuid = info.uuidEntity;
    this.#uuidEntity = "";
    this.#packages = info.packages;
    // this.#uuidEntity = info.uuidEntity;

    this.#version = info.version;
    this.#files = info.files;
    this.#disabled = info.disabled;
  }

  #uuid: string;
  #packages: InstalledPackages;
  #uuidEntity: string;
  #version: string;
  #files: string[];
  #disabled = false;
}

export class AvailablePackage {
  get uuid() {
    return this.#uuid;
  }

  get lang() {
    return this.#lang;
  }

  get uuidEntity() {
    return this.#uuidEntity;
  }

  /**
   * Methods
   */

  get url() {
    return `${__api}/scripts/${this.uuid}`;
  }

  constructor(info: IPackage) {
    this.#uuid = info.uuid;
    this.#lang = info.lang;
    this.#uuidEntity = info.uuidEntity;
  }

  #uuid: string;
  #lang: string;
  #uuidEntity: string;
}

export class InstalledPackages
{
  /**
   * Getters
   */

  get game() {
    return this.#game;
  }

  get values() {
    return Object.values(this.#packages);
  }

  /**
   * Setters
   */

  /**
  * Methods
  */

  has(uuid: string) {
    return uuid in this.#packages;
  }

  package(uuid: string) {
    return this.#packages[uuid];
  }

  async save() {
    await writeFile(
      join(this.#game.path, "angel.packages.json"),
      JSON.stringify(this.#packages)
    );
  }

  async add(_package: InstalledPackage) {
    vue.$set(this.#packages, _package.uuid, _package);
  }

  async remove(_package: InstalledPackage) {
    vue.$delete(this.#packages, _package.uuid);
  }

  constructor(info: { game: Game }) {
    this.#game = info.game;


    return await readFile(join(path, "angel.packages.json"), "utf-8");
  }

  #game: Game;
  #packages: { [key: string]: InstalledPackage } = {};
}
