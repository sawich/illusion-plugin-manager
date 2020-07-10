import { Vue } from "vue-property-decorator";
import { createModule, mutation } from "vuex-class-component";

import { TaskExistExeption } from "@/exceptions/task-exist-exeption";

import { Job } from "../jobs-module/types/core/job";
import { Task } from "./core/task";
import { ITasks } from "./types";

const VuexModule = createModule({ namespaced: "tasks", strict: false });

export class TasksModule extends VuexModule {
  /**
   * Getters
   */

  get entries() {
    return this._entries;
  }

  /**
   * Mutations
   */

  @mutation setJob(info: { task: Task; job: Job }) {
    info.task.job = info.job;
  }

  @mutation add(task: Task) {
    const existsTask = this._entries[task.package.uuidentity];
    if (existsTask !== undefined) {
      throw new TaskExistExeption(existsTask);
    }

    Vue.set(this._entries, task.package.uuidentity, task);
  }

  @mutation done(task: Task) {
    Vue.delete(this._entries, task.package.uuidentity);
    console.log("task removed:", task.package.uuidentity);
  }

  /**
   * Datas
   */

  private _entries: ITasks = {};
}
