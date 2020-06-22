import { Plugin } from "../../plugins-module/core/plugin";
import { PluginGame } from "../../plugins-module/types";
import { DummyJob } from "../jobs/dummy-job";
import { JobStatus } from "../types";
import { tasks } from "@/store";
import { Job } from "./job";

export class Task {
  /**
   * Getters
   */

  public get id() {
    return this._id;
  }

  public get identity() {
    return this.plugin.identity;
  }

  public get game() {
    return this._game;
  }

  public get plugin() {
    return this._plugin;
  }

  public get status() {
    return this._status;
  }

  public get category() {
    return this._job.category;
  }

  public get icon() {
    return this._job.icon;
  }

  public get job() {
    return this._job;
  }

  public get awaiter() {
    return this._job.awaiter;
  }

  /**
   * Setters
   */

  public set status(status: JobStatus) {
    this._status = status;
  }

  public set job(task: Job) {
    this._job = task;
  }

  /**
   * Methods
   */

  public constructor(game: PluginGame, plugin: Plugin) {
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
  private _status = JobStatus.Start;
  private _job: Job;
}
