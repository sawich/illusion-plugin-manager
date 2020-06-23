import { Task } from "@/store/modules/tasks-module/core/task";

export class TaskExistExeption extends Error {
  public get task() {
    return this._task;
  }

  public constructor(task: Task) {
    super();
    super.name = this.constructor.name;

    this._task = task;
  }

  private _task: Task;
}
