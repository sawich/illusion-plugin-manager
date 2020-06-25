import { PluginGame } from "../../plugins-module/types";
import { resolve } from "path";

export interface IInstalledGame {
  id: PluginGame;
  path: string;
}

export abstract class Game {
  getDllPath(filename: string) {
    const item = this._dlls.get(filename);
    if (item !== undefined) {
      return resolve(this._path, filename);
    }
    return null;
  }

  get path() {
    return this._path;
  }

  set path(path: string) {
    this._path = path;
  }

  protected constructor(_dlls: Iterable<[string, string]>) {
    this._dlls = new Map(_dlls);
  }

  private _path = "";
  private _dlls = new Map<string, string>();
}

export class Koikatsu extends Game {
  public constructor() {
    super([
      ["AmplifyColor", "Koikatu_Data/Managed/AmplifyColor.dll"],
      ["AmplifyOcclusion", "Koikatu_Data/Managed/AmplifyOcclusion.dll"],
      ["Assembly-CSharp-firstpass", "Koikatu_Data/Managed/Assembly-CSharp-firstpass.dll"],
      ["Assembly-CSharp", "Koikatu_Data/Managed/Assembly-CSharp.dll"],
      ["Assembly-UnityScript", "Koikatu_Data/Managed/Assembly-UnityScript.dll"],
      ["Boo.Lang", "Koikatu_Data/Managed/Boo.Lang.dll"],
      ["DOTween", "Koikatu_Data/Managed/DOTween.dll"],
      ["DOTween43", "Koikatu_Data/Managed/DOTween43.dll"],
      ["DOTween46", "Koikatu_Data/Managed/DOTween46.dll"],
      ["DOTween50", "Koikatu_Data/Managed/DOTween50.dll"],
      ["Mono.Security", "Koikatu_Data/Managed/Mono.Security.dll"],
      ["mscorlib", "Koikatu_Data/Managed/mscorlib.dll"],
      ["Sirenix.OdinInspector.Attributes", "Koikatu_Data/Managed/Sirenix.OdinInspector.Attributes.dll"],
      ["Sirenix.Serialization.Config", "Koikatu_Data/Managed/Sirenix.Serialization.Config.dll"],
      ["Sirenix.Serialization", "Koikatu_Data/Managed/Sirenix.Serialization.dll"],
      ["Sirenix.Utilities", "Koikatu_Data/Managed/Sirenix.Utilities.dll"],
      ["System.Core", "Koikatu_Data/Managed/System.Core.dll"],
      ["System", "Koikatu_Data/Managed/System.dll"],
      ["System.Runtime.Serialization", "Koikatu_Data/Managed/System.Runtime.Serialization.dll"],
      ["System.Xml", "Koikatu_Data/Managed/System.Xml.dll"],
      ["System.Xml.Linq", "Koikatu_Data/Managed/System.Xml.Linq.dll"],
      ["TextMeshPro-1.0.55.56.0b12", "Koikatu_Data/Managed/TextMeshPro-1.0.55.56.0b12.dll"],
      ["UnityEngine", "Koikatu_Data/Managed/UnityEngine.dll"],
      ["UnityEngine.Networking", "Koikatu_Data/Managed/UnityEngine.Networking.dll"],
      ["UnityEngine.UI", "Koikatu_Data/Managed/UnityEngine.UI.dll"],
      ["Vectrosity", "Koikatu_Data/Managed/Vectrosity.dll"],
    ]);
  }
}
