import { action, createModule } from "vuex-class-component";

import { TaskExistExeption } from "@/exceptions/task-exist-exeption";

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

    while (true) {
      try {
        await installer.install();
        return;
      } catch (error) {
        if (error instanceof TaskExistExeption) {
          console.info("Task already exists. wait...");
          await error.task.awaiter;

          if (error.task.package.game.id == p.game.id) {
            console.log("start new try to install");
            return;
          }
        } else {
          console.error(error);
        }
      } finally {
        await installer.done();
      }
    }
  }
}

// https://youtu.be/7hEefkR7NHc?list=PLkqN7b9u5k92tpEpQEwgTcyddxCwwAQNP
