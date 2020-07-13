import { TaskExistExeption } from "@/exceptions/task-exist-exeption";
import { TaskIdentityExistExeption } from "@/exceptions/task-identity-exists-exeption";
import { vue } from "@/main";
import { Task } from "./core/task";
import { ITasks } from "./types";

export class TasksModule {
  /**
   * Getters
   */

  get entries() {
    return this.#entries;
  }

  /**
   * Actions
   */

  async add(task: Task) {
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

  private registerEntity(task: Task) {
    const existsTask = this.#entries[task.package.uuid];
    if (existsTask !== undefined) {
      throw new TaskExistExeption(existsTask);
    }

    task.uuidRegister = true;
    vue.$set(this.#entries, task.package.uuid, task);
  }

  private registerIdentity(task: Task) {
    const existsTask = this.#entries[task.package.uuidEntity];
    if (existsTask !== undefined) {
      throw new TaskIdentityExistExeption(existsTask);
    }

    task.uuidEntityRegister = true;
    vue.$set(this.#identitites, task.package.uuidEntity, task);
  }

  done(task: Task) {
    if (task.uuidRegister) {
      vue.$delete(this.#entries, task.package.uuid);
    }

    if (task.uuidEntityRegister) {
      vue.$delete(this.#identitites, task.package.uuidEntity);
    }

    console.log("task removed:", task.package.uuid);
  }

  /**
   * Datas
   */

  #identitites: string[] = [];
  #entries: ITasks = {};
}
