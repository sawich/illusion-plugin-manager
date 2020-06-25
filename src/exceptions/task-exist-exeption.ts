import { Task } from "@/store/modules/tasks-module/core/task";

export class TaskExistExeption extends Error {
  get task() {
    return this._task;
  }

  constructor(task: Task) {
    super();
    super.name = this.constructor.name;

    this._task = task;
  }

  private _task: Task;
}
