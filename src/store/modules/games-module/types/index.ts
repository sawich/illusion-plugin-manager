import { join } from "path";
import { GameId, InstalledPackages } from "../../packages-module/types";


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
  game: GameId;
  path: string;
  plugins: string[];
  packages: IInstalledPackages;
  info: IGameBaseInfo;
}

export interface IInstalledPackage {
  uuid: string;
  version: string;
  files: string[];
  disabled: boolean;
}

// export class InstalledPackage {
//   /**
//    * Getters
//    */
//   get uuid() {
//     return this._uuid;
//   }

//   get game() {
//     return this._game;
//   }

//   get version() {
//     return this._version;
//   }

//   get files() {
//     return this._files;
//   }

//   get disabled() {
//     return this._disabled;
//   }

//   /**
//    * Setters
//    */

//   set disabled(value) {
//     this._disabled = value;
//   }

//   /**
//    * Statics
//    */

//   static get disabledPrefix() {
//     return "_disabled";
//   }

//   /**
//    * Methods
//    */

//   actualPath(file: string) {
//     return join(
//       this.game.path,
//       this.disabled ? `${file}${InstalledPackage.disabledPrefix}` : file
//     );
//   }

//   paths(file: string) {
//     if (this.disabled) {
//       return {
//         old: join(this.game.path, file),
//         new: join(this.game.path, `${file}${InstalledPackage.disabledPrefix}`)
//       };
//     }

//     return {
//       old: join(this.game.path, `${file}${InstalledPackage.disabledPrefix}`),
//       new: join(this.game.path, file)
//     };
//   }

//   async toggle() {
//     await Promise.allSettled(
//       this.files.map(file => {
//         const paths = this.paths(file);
//         rename(paths.old, paths.new);
//         console.log(paths);
//       })
//     );
//   }

//   toJSON() {
//     return {
//       uuidEntity: this.uuid,
//       version: this.version,
//       files: this.files,
//       disabled: this.disabled
//     };
//   }

//   dll(filename: string) {
//     const found = this.files.find(value => {
//       const parsed = parse(value);
//       return parsed.name == filename && parsed.ext == ".dll";
//     });
//     if (found === undefined) {
//       return null;
//     }

//     return join(this.game.path, found);
//   }

//   constructor(info: IInstalledPackage & { game: Game }) {
//     this._uuid = info.uuid;
//     this._game = info.game;
//     this._version = info.version;
//     this._files = info.files;
//     this._disabled = info.disabled;
//   }

//   private _uuid: string;
//   private _game: Game;
//   private _version: string;
//   private _files: string[];
//   private _disabled: boolean;
// }

export class Game {
  /**
   * Getters
   */

  get id() {
    return this._id;
  }

  get url() {
    return `${__api}/packages/${this._id}`;
  }

  get path() {
    return this._path;
  }

  get packages() {
    return this.#packages;
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
    return this.#packages.has(uuid);
  }

  package(uuid: string) {
    return this.#packages.package(uuid);
  }

  dll(filename: string) {
    const item = this._dlls[filename];
    if (item) {
      return join(this._path, item);
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
    this._id = info.game;
    this._path = info.path;
    this._dlls = info.info.dlls;

    this.#packages = Object.fromEntries(
      Object.entries(info.packages).map(([uuid, p]) => [
        uuid,
        new InstalledPackage({ ...p, game: this })
      ])
    );
  }

  private _id: GameId;
  private _path: string;
  private _dlls: IDllInfo;
  #packages: InstalledPackages;
}
