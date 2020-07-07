import { Job } from "@/store/modules/jobs-module/types/core/job";

export class JobExistExeption extends Error {
  get task() {
    return this._job;
  }

  constructor(job: Job) {
    super();
    super.name = this.constructor.name;

    this._job = job;
  }

  private _job: Job;
}
