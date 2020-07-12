import { unlink } from "fs/promises";
import { action, createModule } from "vuex-class-component";

import { TaskExistExeption } from "@/exceptions/task-exist-exeption";

import { InstalledPackage } from "../games-module/types";
import { Package } from "../packages-module/types";
import { Installer } from "./types/core/installer";

const VuexModule = createModule({
  namespaced: "installer-packages",
  strict: false
});

export class InstallerPackagesModule extends VuexModule {
  @action async uninstall(installed: InstalledPackage) {
    await Promise.allSettled(
      installed.files.map(file => {
        const path = installed.actualPath(file);
        return unlink(path);
      })
    );
  }

  @action async install(p: Package) {
    const request = await fetch(p.url);
    const script = await request.json();

    if (p.game.has(p.uuid)) {
      console.warn(`Already installed, skipped [game: ${p.game.id}]`);
      return;
    }

    const installer = new Installer({ package: p, container: script });

    try {
      await installer.install();
      return;
    } catch (error) {
      if (error instanceof TaskExistExeption) {
        console.info("Task already exists. wait...");
        await error.task.awaiter;
      } else {
        console.error(error);
      }
    } finally {
      await installer.done();
    }
  }
}

// https://youtu.be/7hEefkR7NHc?list=PLkqN7b9u5k92tpEpQEwgTcyddxCwwAQNP
