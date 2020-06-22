import { Job } from "../core/job";
import { JobIcon, JobCategory } from "../types";
import { Task } from "../core/task";

export class GitCloneJob extends Job {
  public constructor(info: Task, action: () => Promise<void>) {
    super(info, JobIcon.GitHub, JobCategory.GitClone, action);
  }
}
