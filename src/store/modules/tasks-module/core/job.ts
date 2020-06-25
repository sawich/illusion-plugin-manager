import { JobCategory, JobIcon, TaskStatus } from "../types";
import { Task } from "./task";
import { tasks } from "@/store";

export abstract class Job {
  /**
   * Getters
   */
  get id() {
    return this._info.id;
  }

  get identity() {
    return this._info.identity;
  }

  get game() {
    return this._info.game;
  }

  get plugin() {
    return this._info.plugin;
  }

  get status() {
    return this._status;
  }

  get category() {
    return this._category;
  }

  get icon() {
    return this._icon;
  }

  get awaiter() {
    return this._awaiter;
  }

  /**
   * Setters
   */

  set status(status: TaskStatus) {
    this._status = status;
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
      this._resolver();
      tasks.complete(this);
    }
  }

  protected constructor(info: Task, icon: JobIcon, category: JobCategory, action: () => Promise<void>) {
    this._info = info;
    this._icon = icon;
    this._action = action;
    this._category = category;

    this._awaiter = new Promise(async (resolve) => {
      this._resolver = resolve;
    });

    tasks.setJob({ task: this._info, job: this });
    console.info(`created job with [id:${this._info.id}][identity:${this._info.identity}]`);
  }

  /**
   * Datas
   */

  private _info: Task;
  private _icon: JobIcon;
  private _status = TaskStatus.Dymmy;
  private _category: JobCategory;
  private _action: () => Promise<void>;
  private _awaiter: Promise<void>;
  private _resolver = Job.badResolver;

  /**
   * Static
   */

  /** Should be newer call */
  private static badResolver = (): void => {
    throw new Error("Bad resolver");
  };
}
