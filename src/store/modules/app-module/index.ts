import { createModule } from "vuex-class-component";

import { readFile } from "fs/promises";

interface IAppInstalled {
  guid: string;
  path: string;
}

const VuexModule = createModule({ namespaced: "app", strict: false });

export class AppModule extends VuexModule {
  //  get installed() {
  //     return this._installed;
  // }
  //
  //  constructor(module: Mod<ThisType<any>, any>) {
  //     super(module);
  //     readFile(`${__static}\\installed.json`, "utf8")
  //         .then((data: string) => {
  //             const apps = JSON.parse(data) as IAppInstalled[];
  //         })
  //         .catch(() => {
  //             fs.writeFile(`${__static}\\installed.json`, "[]", "utf8");
  //         });
  // }
  // @action
  //  load() {}
  //
  // private _installed: IAppInstalled[] = [];
  //
  // #buildtools = {
  //     "15.0": join(__cache, "vs_BuildTools15.exe"),
  //     "16.0": join(__cache, "vs_BuildTools16.exe"),
  // };
}
