import { Plugin } from "../../plugins-module/core/plugin";
import { PluginGame } from "../../plugins-module/types";
import { DummyJob } from "../jobs/dummy-job";
import { TaskStatus } from "../types";
import { tasks } from "@/store";
import { Job } from "./job";

export class Task {
  /**
   * Getters
   */

  get id() {
    return this._id;
  }

  get game() {
    return this._game;
  }

  get status() {
    return this._status;
  }

  get plugin() {
    return this._plugin;
  }

  get identity() {
    return this._plugin.identity;
  }

  get lang() {
    return this._plugin.lang;
  }

  get job() {
    return this._job;
  }

  get category() {
    return this._job.category;
  }

  get icon() {
    return this._job.icon;
  }

  get awaiter() {
    return this._job.awaiter;
  }

  /**
   * Setters
   */

  set status(status: TaskStatus) {
    this._status = status;
  }

  set job(task: Job) {
    this._job = task;
  }

  /**
   * Methods
   */

  constructor(game: PluginGame, plugin: Plugin) {
    this._id = `${game}-id-${plugin.id}`;
    this._game = game;
    this._plugin = plugin;
    this._job = new DummyJob(this);

    tasks.add(this);
    console.info(`created task info with [id:${this.id}][identity:${this.identity}]`);
  }

  /**
   * Datas
   */

  private _id: string;
  private _game: PluginGame;
  private _plugin: Plugin;
  private _status = TaskStatus.Dymmy;
  private _job: Job;
}
