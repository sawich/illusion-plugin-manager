import { copyFile, mkdir } from "fs/promises";
import { dirname, join } from "path";

import { FileMoveJob } from "@/store/modules/jobs-module/types/jobs/file-move-job";
import { Task } from "@/store/modules/tasks-module/core/task";

import { IInstaller, IInstallerArguments, PluginContainer } from "../core/installer";
import { IFileMover, IFiles } from "./types";

export class FileMover implements IInstaller {
  async install(info: IInstallerArguments) {
    console.info("call place");
    const job = new FileMoveJob({
      task: info.task,
      action: this.action.bind(this, info)
    });
    await job.run();
  }

  constructor(info: { container: PluginContainer; mover: IFileMover }) {
    this._container = info.container;
    this._files = info.mover.files;
    this._path = join(__cache, `git/${this._container.uuidentity}`);
  }

  private async action(info: IInstallerArguments) {
    for (const file of this._files) {
      const src = join(this._path, file.src);
      const dst = join(info.task.package.game.path, file.dst);
      const path = dirname(dst);

      await mkdir(path, { recursive: true });
      await copyFile(src, dst);
    }

    info.builder.files = this._files.map(f => f.dst);
  }

  private _path: string;
  private _container: PluginContainer;
  private _files: IFiles;
}
