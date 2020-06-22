import { JobCategory, JobIcon } from "../types";
import { Job } from "../core/job";
import { Task } from "../core/task";

export class GitPullJob extends Job {
  public constructor(info: Task, action: () => Promise<void>) {
    super(info, JobIcon.GitHub, JobCategory.GitPull, action);
  }
}
