import { FileMoveJob } from "@/store/modules/jobs-module/types/jobs/file-move-job";
import { PluginContainer, IInstaller } from "../core/installer";
import { Task } from "@/store/modules/tasks-module/core/task";
import { mkdir, copyFile } from "fs/promises";
import { IFileMover, IFiles } from "./types";
import { join, dirname } from "path";

export class FileMover implements IInstaller {
  async install(task: Task) {
    console.info("call place");
    const job = new FileMoveJob({ task, action: this.action.bind(this, task) });
    await job.run();
  }

  constructor(info: { container: PluginContainer; mover: IFileMover }) {
    this._container = info.container;
    this._files = info.mover.files;
    this._path = join(__cache, `git/${this._container.uuidentity}`);
  }

  private async action(task: Task) {
    for (const file of this._files) {
      const src = join(this._path, file.src);
      const dst = join(task.package.game.path, file.dst);
      const path = dirname(dst);

      await mkdir(path, { recursive: true });
      await copyFile(src, dst);
    }
  }

  private _path: string;
  private _container: PluginContainer;
  private _files: IFiles;
}
