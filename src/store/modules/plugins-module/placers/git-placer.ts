import { IGitPluginRaw } from "../types";
import { Placer } from "./placer";
import { Plugin } from "../core/plugin";
import { promises as fs } from "fs";
import { tasks } from "@/store";
import { resolve } from "path";

import simpleGit from "simple-git";
import { Task } from "../../tasks-module/core/task";

const mkdir = fs.mkdir;
const access = fs.access;

export class GitPlacer extends Placer {
  public async clonned(path: string) {
    try {
      await access(path);
      return true;
    } catch {
      return false;
    }
  }

  public async place(info: Task) {
    console.info("call place");

    const task = await tasks.runGitClone({
      info,
      action: async () => {
        console.info("task action");

        const path = this.path;
        console.info("path:", path);
        if (await this.clonned(path)) {
          console.info("already clonned");
          return;
        }

        await mkdir(path, { recursive: true });

        const git = simpleGit(path);
        await git.clone(this._url, ".", ["--recursive"]);
        console.info("action end");
      },
    });

    await task.awaiter;
  }

  public async update(info: Task) {}

  public constructor(raw: IGitPluginRaw, plugin: Plugin) {
    super(plugin);

    this._url = raw.url;
  }

  private get path() {
    return resolve(__cache, `git/${this.plugin.identity}`);
  }

  private _url: string;
}
