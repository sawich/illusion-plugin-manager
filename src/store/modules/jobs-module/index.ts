import { Vue } from "vue-property-decorator";
import { action, createModule, mutation } from "vuex-class-component";

import { JobExistExeption } from "@/exceptions/job-exists-exception";
import { vue } from "@/main";

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

  @action async get(uuidEntity: string) {
    return this._jobs[uuidEntity];
  }

  /**
   * Mutations
   */

  @mutation add(job: Job) {
    const existsJob = this._jobs[job.task.package.uuidEntity];
    if (existsJob !== undefined) {
      throw new JobExistExeption(existsJob);
    }

    vue.$set(this._jobs, job.task.package.uuidEntity, job);
  }

  @mutation done(job: Job) {
    Vue.delete(this._jobs, job.task.package.uuidEntity);
    console.log("job removed:", job.task.package.uuidEntity);
  }

  /**
   * Datas
   */

  private _jobs: IJobs = {};
}
