import { action, createModule } from "vuex-class-component";

import { Package } from "../packages-module/types";
import { Installer } from "./types/core/installer";

const VuexModule = createModule({
  namespaced: "installer-packages",
  strict: false
});

export class InstallerPackagesModule extends VuexModule {
  @action async install(p: Package) {
    const request = await fetch(p.url);
    const script = await request.json();

    const installer = new Installer({ package: p, container: script });
    await installer.install();
  }
}

// https://youtu.be/7hEefkR7NHc?list=PLkqN7b9u5k92tpEpQEwgTcyddxCwwAQNP
