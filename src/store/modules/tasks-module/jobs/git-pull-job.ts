import { JobCategory, JobIcon } from "../types";
import { Job } from "../core/job";
import { Task } from "../core/task";

export class GitPullJob extends Job {
  public constructor(task: Task, action: () => Promise<void>) {
    super(task, JobIcon.GitHub, JobCategory.GitPull, action);
  }
}
