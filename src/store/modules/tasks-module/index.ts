import { Vue } from "vue-property-decorator";
import { action, createModule, mutation } from "vuex-class-component";

import { JobExistExeption } from "@/exceptions/job-exists-exception";
import { TaskExistExeption } from "@/exceptions/task-exist-exeption";
import { TaskIdentityExistExeption } from "@/exceptions/task-identity-exists-exeption";

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
   * Actions
   */

  @action async add(task: Task) {
    this.registerEntity(task);

    /** Task with same root project exists. Wait and and try recreate. */
    while (true) {
      try {
        this.registerIdentity(task);
        return;
      } catch (error) {
        if (!(error instanceof TaskIdentityExistExeption)) {
          throw error;
        }

        await error.task.awaiter;
      }
    }
  }

  /**
   * Mutations
   */

  @mutation setJob(info: { task: Task; job: Job }) {
    info.task.job = info.job;
  }

  @mutation private registerEntity(task: Task) {
    const existsTask = this._entries[task.package.uuid];
    if (existsTask !== undefined) {
      throw new TaskExistExeption(existsTask);
    }

    task.uuidRegister = true;
    Vue.set(this._entries, task.package.uuid, task);
  }

  @mutation private registerIdentity(task: Task) {
    const existsTask = this._entries[task.package.uuidentity];
    if (existsTask !== undefined) {
      throw new TaskIdentityExistExeption(existsTask);
    }

    task.uuidentityRegister = true;
    Vue.set(this._identitites, task.package.uuidentity, task);
  }

  @mutation done(task: Task) {
    if (task.uuidRegister) {
      Vue.delete(this._entries, task.package.uuid);
    }

    if (task.uuidentityRegister) {
      Vue.delete(this._identitites, task.package.uuidentity);
    }

    console.log("task removed:", task.package.uuid);
  }

  /**
   * Datas
   */

  private _identitites: string[] = [];
  private _entries: ITasks = {};
}
