import { Installer } from "../../installer-packages-module/types/core/installer";
import { PluginContainer } from "@/store/modules/installer-packages-module/types/core/installer";
import { tasks } from "@/store";
import { Job } from "../../jobs-module/types/core/job";
import { Package } from "../../packages-module/types";
import { DummyJob } from "../../jobs-module/types/jobs/dummy-job";
import { Vue } from "vue-property-decorator";

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

  // get resolver() {
  //   return this._resolver;
  // }

  /**
   * Setters
   */

  set job(task: Job) {
    this._job = task;
  }

  /**
   * Methods
   */

  async done() {
    this._resolver();
    tasks.done(this);
  }

  constructor(info: { package: Package; container: PluginContainer; installer: Installer }) {
    this._package = info.package;
    this._container = info.container;
    this._installer = info.installer;
    this._job = new DummyJob(this);

    this._awaiter = new Promise(async (resolve) => {
      this._resolver = resolve;
    });

    tasks.add(this);
    console.info(`created task info with [uuidentity:${this._container.uuid}]`);
  }

  /**
   * Datas
   */

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
