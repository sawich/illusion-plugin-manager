import { Task } from "../../../tasks-module/core/task";
import { JobCategory, JobIcon } from "../../../tasks-module/types";


export interface IJob {
  task: Task;
  icon: JobIcon;
  category: JobCategory;
  action: () => Promise<void>;
}

export abstract class Job {
  /**
   * Getters
   */
  get task() {
    return this._task;
  }

  get icon() {
    return this._icon;
  }

  get category() {
    return this._category;
  }

  get action() {
    return this._action;
  }

  /**
   * Methods
   */

  async run() {
    console.info("job runned");
    try {
      await this._action();
    } finally {
      console.info("job finally");
    }
  }

  protected constructor(info: IJob) {
    this._task = info.task;
    this._icon = info.icon;
    this._action = info.action;
    this._category = info.category;

    this.task.job = this;

    console.info(
      `created job with [uuidEntity:${this._task.package.uuidEntity}]`
    );
  }

  /**
   * Datas
   */

  private _task: Task;
  private _icon: JobIcon;
  private _category: JobCategory;
  private _action: () => Promise<void>;
}
