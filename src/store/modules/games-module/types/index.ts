import { resolve } from "path";
import { PluginGame } from "../../packages-module/types";

interface IDllInfo {
  [key: string]: string;
}

export interface IGameInfo {
  game: PluginGame;
  path: string;
  plugins: string[];
}

export abstract class Game {
  get id() {
    return this._game;
  }

  getDllPath(filename: string) {
    const item = this._dlls[filename];
    if (item !== undefined) {
      return resolve(this._path, filename);
    }
    return null;
  }

  get packagesUrl() {
    return `http://localhost:3000/packages/${this._game}`;
  }

  get path() {
    return this._path;
  }

  set path(path: string) {
    this._path = path;
  }

  protected constructor(info: IGameInfo, dlls: IDllInfo) {
    this._game = info.game;
    this._path = info.path;
    this._dlls = dlls;
  }

  private _game: PluginGame;
  private _path: string;
  private _dlls: IDllInfo;
}

export class KoikatsuGame extends Game {
  public constructor(info: IGameInfo) {
    super(info, {
      AmplifyColor: "Koikatu_Data/Managed/AmplifyColor.dll",
      AmplifyOcclusion: "Koikatu_Data/Managed/AmplifyOcclusion.dll",
      "Assembly-CSharp-firstpass": "Koikatu_Data/Managed/Assembly-CSharp-firstpass.dll",
      "Assembly-CSharp": "Koikatu_Data/Managed/Assembly-CSharp.dll",
      "Assembly-UnityScript": "Koikatu_Data/Managed/Assembly-UnityScript.dll",
      "Boo.Lang": "Koikatu_Data/Managed/Boo.Lang.dll",
      DOTween: "Koikatu_Data/Managed/DOTween.dll",
      DOTween43: "Koikatu_Data/Managed/DOTween43.dll",
      DOTween46: "Koikatu_Data/Managed/DOTween46.dll",
      DOTween50: "Koikatu_Data/Managed/DOTween50.dll",
      "Mono.Security": "Koikatu_Data/Managed/Mono.Security.dll",
      mscorlib: "Koikatu_Data/Managed/mscorlib.dll",
      "Sirenix.OdinInspector.Attributes": "Koikatu_Data/Managed/Sirenix.OdinInspector.Attributes.dll",
      "Sirenix.Serialization.Config": "Koikatu_Data/Managed/Sirenix.Serialization.Config.dll",
      "Sirenix.Serialization": "Koikatu_Data/Managed/Sirenix.Serialization.dll",
      "Sirenix.Utilities": "Koikatu_Data/Managed/Sirenix.Utilities.dll",
      "System.Core": "Koikatu_Data/Managed/System.Core.dll",
      System: "Koikatu_Data/Managed/System.dll",
      "System.Runtime.Serialization": "Koikatu_Data/Managed/System.Runtime.Serialization.dll",
      "System.Xml": "Koikatu_Data/Managed/System.Xml.dll",
      "System.Xml.Linq": "Koikatu_Data/Managed/System.Xml.Linq.dll",
      "TextMeshPro-1.0.55.56.0b12": "Koikatu_Data/Managed/TextMeshPro-1.0.55.56.0b12.dll",
      UnityEngine: "Koikatu_Data/Managed/UnityEngine.dll",
      "UnityEngine.Networking": "Koikatu_Data/Managed/UnityEngine.Networking.dll",
      "UnityEngine.UI": "Koikatu_Data/Managed/UnityEngine.UI.dll",
      Vectrosity: "Koikatu_Data/Managed/Vectrosity.dll",
    });
  }
}
