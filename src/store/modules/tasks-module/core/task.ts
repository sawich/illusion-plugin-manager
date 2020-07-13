import { tasks } from "@/store";
import { PluginContainer } from "@/store/modules/installer-packages-module/types/core/installer";
import { Installer } from "../../installer-packages-module/types/core/installer";
import { Job } from "../../jobs-module/types/core/job";
import { WaitJob } from "../../jobs-module/types/jobs/wait-job";
import { Package } from "../../packages-module/types";

export interface ITask {
  package: Package;
  container: PluginContainer;
  installer: Installer;
}

export class Task {

  /**
   * Getters
   */

  get package() {
    return this._package;
  }

  get container() {
    return this._container;
  }

  get installer() {
    return this._installer;
  }

  get job() {
    return this._job;
  }

  get awaiter() {
    return this._awaiter;
  }

  get uuidRegister() {
    return this._uuidRegister;
  }

  get uuidEntityRegister() {
    return this._uuidentityRegister;
  }

  /**
   * Setters
   */

  set job(job: Job) {
    this._job = job;
  }

  set uuidRegister(value) {
    this._uuidRegister = value;
  }

  set uuidEntityRegister(value) {
    this._uuidentityRegister = value;
  }

  /**
   * Methods
   */

  async done() {
    this._resolver();
    tasks.done(this);
  }

  async run() {
    await tasks.add(this);
  }

  constructor(task: ITask) {
    this._package = task.package;
    this._container = task.container;
    this._installer = task.installer;
    this._job = new WaitJob(this);

    this._awaiter = new Promise(async resolve => {
      this._resolver = resolve;
    });

    console.info(`created task info with [uuidEntity:${this.package.uuid}]`);
  }

  /**
   * Datas
   */

  private _uuidRegister = false;
  private _uuidentityRegister = false;

  private _package: Package;
  private _container: PluginContainer;
  private _installer: Installer;
  private _job: Job;
  private _awaiter: Promise<void>;
  private _resolver = Task.badResolver;

  /**
   * Static
   */

  /** Should be newer call */
  private static badResolver = (): void => {
    throw new Error("Bad resolver");
  };
}
