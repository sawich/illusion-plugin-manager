import { writeFile } from "fs/promises";
import { join, parse } from "path";

import { PackageBuilder } from "../../installer-packages-module/types/core/installer";
import { PluginGame } from "../../packages-module/types";

interface IDllInfo {
  [key: string]: string;
}

export interface IInstalledPackages {
  [key: string]: IInstalledPackage;
}

export interface IGameInfo {
  game: PluginGame;
  path: string;
  plugins: string[];
  packages: IInstalledPackages;
}

export interface IInstalledPackage {
  version: string;
  files: string[];
}

class InstalledPackage {
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
    this._game = info.game;
    this._version = info.version;
    this._files = info.files;
  }

  private _game: Game;
  private _version: string;
  private _files: string[];
}

export abstract class Game {
  get id() {
    return this._game;
  }

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
    this._packages[builder.uuid] = new InstalledPackage({
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

  get url() {
    return `http://localhost:3000/packages/${this._game}`;
  }

  get path() {
    return this._path;
  }

  set path(path: string) {
    this._path = path;
  }

  protected constructor(info: { game: IGameInfo; dlls: IDllInfo }) {
    this._game = info.game.game;
    this._path = info.game.path;
    this._dlls = info.dlls;

    this._packages = Object.fromEntries(
      Object.entries(info.game.packages).map(([uuid, p]) => [
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

export class KoikatsuGame extends Game {
  public constructor(game: IGameInfo) {
    super({
      game,
      dlls: {
        AmplifyColor: "Koikatu_Data/Managed/AmplifyColor.dll",
        AmplifyOcclusion: "Koikatu_Data/Managed/AmplifyOcclusion.dll",
        "Assembly-CSharp-firstpass":
          "Koikatu_Data/Managed/Assembly-CSharp-firstpass.dll",
        "Assembly-CSharp": "Koikatu_Data/Managed/Assembly-CSharp.dll",
        "Assembly-UnityScript": "Koikatu_Data/Managed/Assembly-UnityScript.dll",
        "Boo.Lang": "Koikatu_Data/Managed/Boo.Lang.dll",
        DOTween: "Koikatu_Data/Managed/DOTween.dll",
        DOTween43: "Koikatu_Data/Managed/DOTween43.dll",
        DOTween46: "Koikatu_Data/Managed/DOTween46.dll",
        DOTween50: "Koikatu_Data/Managed/DOTween50.dll",
        "Mono.Security": "Koikatu_Data/Managed/Mono.Security.dll",
        mscorlib: "Koikatu_Data/Managed/mscorlib.dll",
        "Sirenix.OdinInspector.Attributes":
          "Koikatu_Data/Managed/Sirenix.OdinInspector.Attributes.dll",
        "Sirenix.Serialization.Config":
          "Koikatu_Data/Managed/Sirenix.Serialization.Config.dll",
        "Sirenix.Serialization":
          "Koikatu_Data/Managed/Sirenix.Serialization.dll",
        "Sirenix.Utilities": "Koikatu_Data/Managed/Sirenix.Utilities.dll",
        "System.Core": "Koikatu_Data/Managed/System.Core.dll",
        System: "Koikatu_Data/Managed/System.dll",
        "System.Runtime.Serialization":
          "Koikatu_Data/Managed/System.Runtime.Serialization.dll",
        "System.Xml": "Koikatu_Data/Managed/System.Xml.dll",
        "System.Xml.Linq": "Koikatu_Data/Managed/System.Xml.Linq.dll",
        "TextMeshPro-1.0.55.56.0b12":
          "Koikatu_Data/Managed/TextMeshPro-1.0.55.56.0b12.dll",
        UnityEngine: "Koikatu_Data/Managed/UnityEngine.dll",
        "UnityEngine.Networking":
          "Koikatu_Data/Managed/UnityEngine.Networking.dll",
        "UnityEngine.UI": "Koikatu_Data/Managed/UnityEngine.UI.dll",
        Vectrosity: "Koikatu_Data/Managed/Vectrosity.dll"
      }
    });
  }
}
