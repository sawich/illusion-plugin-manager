import { TaskExistExeption } from "@/exceptions/task-exist-exeption";
import { createModule, mutation } from "vuex-class-component";
import { Vue } from "vue-property-decorator";
import { Task } from "./core/task";
import { ITasks } from "./types";
import { Job } from "../jobs-module/types/core/job";

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

  // @action async get(uuidentity: string) {
  //   return this._tasks[uuidentity];
  // }

  // @action async runGitClone(job: IRunnableJob<any>) {
  //   console.log(`runGitClone [id:${job.task.container}][identity:${job.task.identity}]`);

  //   /** Task who use this repository has launched, can just wait until she end. */
  //   const existsTask = Object.values(this.tasks)
  //     .filter((t) => t.category == JobCategory.GitClone && t.container != job.task.container)
  //     .find((t) => t.identity == job.task.identity);

  //   if (existsTask !== undefined) {
  //     console.warn(`task exists [id:${job.task.container}][identity:${job.task.identity}]`);
  //     this.setStatus({ task: job.task, status: JobStatus.Exists });
  //     console.log("change status");

  //     return existsTask;
  //   }

  //   const newTask = new GitCloneJob(job.task, job.action);
  //   newTask.run();

  //   return newTask;
  // }

  /**
   * Mutations
   */

  @mutation setJob(info: { task: Task; job: Job }) {
    info.task.job = info.job;
  }

  @mutation add(task: Task) {
    const existsTask = this._entries[task.container.uuidentity];
    if (existsTask !== undefined) {
      throw new TaskExistExeption(existsTask);
    }

    Vue.set(this._entries, task.container.uuidentity, task);
  }

  @mutation done(task: Task) {
    Vue.delete(this._entries, task.container.uuidentity);
    console.log("task removed:", task.container.uuidentity);
  }

  /**
   * Datas
   */

  private _entries: ITasks = {};
}
