import { JobIcon, JobCategory } from "@/store/modules/tasks-module/types";
import { Task } from "@/store/modules/tasks-module/core/task";
import { Job } from "../core/job";

export class GitPullJob extends Job {
  constructor(info: { task: Task; action: () => Promise<void> }) {
    super({ ...info, icon: JobIcon.GitHub, category: JobCategory.GitPull });
  }
}
