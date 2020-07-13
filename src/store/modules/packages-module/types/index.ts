import { vue } from '@/main';
import { Game, IInstalledPackage } from "@/store/modules/games-module/types";
import { unlink } from "fs/promises";
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

export abstract class APackageContext {
  /**
   * Getters
   */

  get uuid() {
    return this.#uuid;
  }

  get game() {
    return this.#game;
  }

  get disabled(): boolean {
    throw new Error("Method not implemented.");
  }

  /**
   * Setters
   */

  set disabled(_) {
    throw new Error("Method not implemented.");
  }

  /**
   * Methods
   */

  async install(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async uninstall(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  constructor(info: { uuid: string, game: Game }) {
    this.#uuid = info.uuid;
    this.#game = info.game;
  }

  #uuid: string;
  #game: Game;
}

export class InstalledPackageContext extends APackageContext {
  /**
   * Getters
   */

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


  actualPath(file: string) {
    return join(
      this.game.path,
      this.disabled ? `${file}${InstalledPackageContext.disabledPrefix}` : file
    );
  }

  constructor(info: IInstalledPackage & { game: Game }) {
    super({ uuid: info.uuid, game: info.game });

    this.#version = info.version;
    this.#files = info.files;
    this.#disabled = info.disabled;
  }

  #version: string;
  #files: string[];
  #disabled = false;
}

export class JustPackageContext extends APackageContext {
  /**
   * Methods
   */

  get url() {
    return `${__api}/scripts/${super.uuid}`;
  }
}

export class Package {
  /**
   * Getters
   */

  get lang() {
    return this.#lang;
  }

  get uuidEntity() {
    return this.#uuidEntity;
  }

  get disabled() {
    return this.#context.disabled;
  }

  /**
   * Setters
   */

   set disabled(value) {
    this.#context.disabled = value;
   }

  /**
   * Methods
   */

  async install() {
    await this.#context.install();
  }

  async uninstall() {
    await this.#context.uninstall();
  }

  constructor(info: { package: IPackage; game: Game, context: APackageContext }) {
    this.#uuid = info.package.uuid;
    this.#lang = info.package.lang;
    this.#uuidEntity = info.package.uuidEntity;
    this.#context = info.context;
  }

  #uuid: string;
  #lang: string;
  #uuidEntity: string;
  #context: APackageContext;
}

export class InstalledPackage extends Package {

  /**
   * Methods
   */

  toJSON() {
    return {
      uuid: this.uuid,
      version: this.#version,
      files: this.#files,
      disabled: this.disabled
    };
  }


  dll(filename: string) {
    const found = super.files.find(value => {
      const parsed = parse(value);
      return parsed.name == filename && parsed.ext == ".dll";
    });
    if (found === undefined) {
      return null;
    }

    return join(this.game.path, found);
  }
}

export class InstalledPackages
{
  /**
   * Getters
   */

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
    const p = JSON.stringify(this.#packages);
    console.log(p);

    // await writeFile(
    //   join(this.#game.path, "angel.packages.json"),
    //   JSON.stringify(Object.values(this.#packages).filter(p => p instanceof InstalledPackageContext))
    // );
  }

  async add(_package: Package) {
    vue.$set(this.#packages, _package.uuid, _package);
  }

  async remove(_package: Package) {
    vue.$delete(this.#packages, _package.uuid);
  }

  constructor(info: { game: Game }) {
    this.#game = info.game;
    this.#packages = {};
  }

  #game: Game;
  #packages: { [key: string]: Package };
}
