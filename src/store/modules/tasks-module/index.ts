import { createModule, mutation, action } from "vuex-class-component";
import { GitCloneJob } from "./jobs/git-clone-job";
import { IRunnableJob, ITasks, TaskStatus, JobCategory } from "./types";
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

  @action public async runGitClone({ task, action }: IRunnableJob<any>) {
    console.log(`runGitClone [id:${task.id}][identity:${task.identity}]`);

    /** Task who use this repository has launched, can just wait until she end. */
    const existsTask = Object.values(this.tasks)
      .filter((t) => t.category == JobCategory.GitClone && t.id != task.id)
      .find((t) => t.identity == task.identity);

    if (existsTask !== undefined) {
      console.warn(`task exists [id:${task.id}][identity:${task.identity}]`);
      this.setStatus({ task, status: TaskStatus.Exists });
      console.log("change status");

      return existsTask;
    }

    const newTask = new GitCloneJob(task, action);
    newTask.run();

    return newTask;
  }

  /**
   * Mutations
   */

  @mutation public setJob({ task, job }: { task: Task; job: Job }) {
    // Vue.set(task, "job", job);
    task.job = job;
  }

  @mutation public setStatus({ task, status }: { task: Task; status: TaskStatus }) {
    task.status = status;
    console.log("new status:", task.status);
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
