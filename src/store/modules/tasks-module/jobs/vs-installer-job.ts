import { JobCategory, JobIcon } from "../types";
import { Job } from "../core/job";
import { Task } from "../core/task";

export class VSInstallerJob extends Job {
  public constructor(task: Task, action: () => Promise<void>) {
    super(task, JobIcon.VisualStudio, JobCategory.VSInstaller, action);
  }
}
