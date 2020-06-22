import { createModule, mutation, action } from "vuex-class-component";
import { GitCloneJob } from "./jobs/git-clone-job";
import { IRunnableJob, ITasks, JobStatus } from "./types";
import { Vue } from "vue-property-decorator";
import { Job } from "./core/job";
import { Task } from "./core/task";

const VuexModule = createModule({ namespaced: "tasks", strict: false });

export class TasksModule extends VuexModule {
  /**
   * Getters
   */

  public get tasks() {
    return this._tasks;
  }

  /**
   * Actions
   */

  @action public async runGitClone({ info, action }: IRunnableJob<any>) {
    console.log(`runGitClone [id:${info.id}][identity:${info.identity}]`);

    /** Task who use this repository has launched, can just wait until she end. */
    const existsTask = Object.values(this.tasks)
      .filter((t) => t.category == info.category && t.id != info.id)
      .find((t) => t.identity == info.plugin.identity);

    if (existsTask !== undefined) {
      console.log(`[id:${info.id}][identity:${info.identity}] task exists`);
      // info.status = JobStatus.Exists;
      // console.log("change status");

      return existsTask;
    }

    console.log(`[id:${info.id}][identity:${info.identity}] task created`);
    const newTask = new GitCloneJob(info, action);
    newTask.run();

    return newTask;
  }

  /**
   * Mutations
   */

  @mutation public changeTask({ task, job }: { task: Task; job: Job }) {
    // Vue.set(task, "job", job);
    task.job = job;
  }

  @mutation public add(task: Task) {
    /** This task already exists. */

    const existsTask = this._tasks[task.id];
    if (task.id in this._tasks) {
      throw existsTask;
    }

    Vue.set(this._tasks, task.id, task);
  }

  @mutation public complete(task: Job) {
    Vue.delete(this._tasks, task.id);
    console.log("task removed:", task.id);
  }

  /**
   * Datas
   */

  private _tasks: ITasks = {};
}
