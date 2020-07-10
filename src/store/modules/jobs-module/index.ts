import { Vue } from "vue-property-decorator";
import { action, createModule, mutation } from "vuex-class-component";

import { JobExistExeption } from "@/exceptions/job-exists-exception";

import { IJobs } from "./types";
import { Job } from "./types/core/job";

const VuexModule = createModule({ namespaced: "tasks", strict: false });

export class jobsModule extends VuexModule {
  /**
   * Getters
   */

  get jobs() {
    return this._jobs;
  }

  /**
   * Actions
   */

  @action async get(uuidentity: string) {
    return this._jobs[uuidentity];
  }

  /**
   * Mutations
   */

  @mutation add(job: Job) {
    const existsJob = this._jobs[job.task.package.uuidentity];
    if (existsJob !== undefined) {
      throw new JobExistExeption(existsJob);
    }

    Vue.set(this._jobs, job.task.package.uuidentity, job);
  }

  @mutation done(job: Job) {
    Vue.delete(this._jobs, job.task.package.uuidentity);
    console.log("job removed:", job.task.package.uuidentity);
  }

  /**
   * Datas
   */

  private _jobs: IJobs = {};
}
