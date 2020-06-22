import { JobCategory, JobIcon, TaskStatus } from "../types";
import { Task } from "./task";
import { TasksModule } from "..";
import { tasks } from "@/store";
import { TouchBarScrubber } from "electron";

export abstract class Job {
  /**
   * Getters
   */
  public get id() {
    return this._info.id;
  }

  public get identity() {
    return this._info.identity;
  }

  public get game() {
    return this._info.game;
  }

  public get plugin() {
    return this._info.plugin;
  }

  public get status() {
    return this._status;
  }

  public get category() {
    return this._category;
  }

  public get icon() {
    return this._icon;
  }

  public get awaiter() {
    return this._awaiter;
  }

  /**
   * Setters
   */

  public set status(status: TaskStatus) {
    this._status = status;
  }

  /**
   * Methods
   */

  public async run() {
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

    tasks.changeTask({ task: this._info, job: this });

    // this._info.job = this;

    console.info(`created task with [id:${this._info.id}][identity:${this._info.identity}]`);
  }

  /**
   * Datas
   */

  private _info: Task;
  private _icon: JobIcon;
  private _status = TaskStatus.Start;
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
