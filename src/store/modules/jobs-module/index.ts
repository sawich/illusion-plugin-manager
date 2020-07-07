import { createModule, mutation, action } from "vuex-class-component";
import { TaskExistExeption } from "@/exceptions/task-exist-exeption";
import { Vue } from "vue-property-decorator";
import { IJobs } from "./types";
import { Job } from "./types/core/job";
import { JobExistExeption } from "@/exceptions/job-exists-exception";

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
    const existsJob = this._jobs[job.task.container.uuidentity];
    if (existsJob !== undefined) {
      throw new JobExistExeption(existsJob);
    }

    Vue.set(this._jobs, job.task.container.uuidentity, job);
  }

  @mutation done(job: Job) {
    Vue.delete(this._jobs, job.task.container.uuidentity);
    console.log("job removed:", job.task.container.uuidentity);
  }

  /**
   * Datas
   */

  private _jobs: IJobs = {};
}
