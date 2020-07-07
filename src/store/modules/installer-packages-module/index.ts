import { createModule, action } from "vuex-class-component";
import { Package } from "../packages-module/types";
import { Installer } from "./types/core/installer";

const VuexModule = createModule({
  namespaced: "installer-packages",
  strict: false
});

export class InstallerPackagesModule extends VuexModule {
  @action async install(info: { package: Package; dep: boolean }) {
    const request = await fetch(info.package.url);
    const script = await request.json();

    const p = new Installer({ package: info.package, container: script });
    await p.install(info.dep);
  }
}

// https://youtu.be/7hEefkR7NHc?list=PLkqN7b9u5k92tpEpQEwgTcyddxCwwAQNP
