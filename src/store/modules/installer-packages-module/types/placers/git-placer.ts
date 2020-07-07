import { GitCloneJob } from "@/store/modules/jobs-module/types/jobs/git-clone-job";
import { PluginContainer, IInstaller } from "../core/installer";
import { Task } from "@/store/modules/tasks-module/core/task";
import { mkdir, access } from "fs/promises";
import simpleGit from "simple-git";
import { join } from "path";
import { IGitPlacer } from "..";

export class GitPlacer implements IInstaller {
  async install(task: Task) {
    console.info("call place");

    const job = new GitCloneJob({ task, action: this.action.bind(this) });
    await job.run();
  }

  async action() {
    console.info("task action");

    const path = this.path;
    console.info("path:", path);

    try {
      await access(path);
      console.info("already clonned");
    } catch {
      console.log("create directory");
      await mkdir(path, { recursive: true });

      const git = simpleGit(path);

      console.log("start clone");
      await git.clone(this._url, ".", ["--recursive"]);
    }

    console.info("action end");
  }

  constructor(info: { container: PluginContainer; placer: IGitPlacer }) {
    this._container = info.container;
    this._url = info.placer.url;
  }

  private get path() {
    return join(__cache, `git/${this._container.uuidentity}`);
  }

  private _container: PluginContainer;
  private _url: string;
}
