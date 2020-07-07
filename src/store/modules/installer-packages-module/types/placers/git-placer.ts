import { PluginContainer } from "../core/installer";
import { promises as fs } from "fs";
import { Placer } from "./placer";
import { resolve } from "path";

import simpleGit from "simple-git";
import { Task } from "@/store/modules/tasks-module/core/task";
import { IGitPlacer } from "..";
import { GitCloneJob } from "@/store/modules/jobs-module/types/jobs/git-clone-job";

const mkdir = fs.mkdir;
const access = fs.access;

export class GitPlacer extends Placer {
  async install(task: Task) {
    console.info("call place");

    const job = new GitCloneJob({
      task,
      action: async () => {
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
      },
    });

    await job.run();
  }

  async update(info: Task) {}

  constructor(info: { container: PluginContainer; placer: IGitPlacer }) {
    super();

    this._container = info.container;
    this._url = info.placer.url;
  }

  private get path() {
    return resolve(__cache, `git/${this._container.uuid}`);
  }

  private _container: PluginContainer;
  private _url: string;
}
