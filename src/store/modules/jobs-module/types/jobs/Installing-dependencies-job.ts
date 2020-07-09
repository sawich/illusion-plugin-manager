import { Task } from "@/store/modules/tasks-module/core/task";
import { JobCategory, JobIcon } from "@/store/modules/tasks-module/types";

import { Job } from "../core/job";

export class InstallingDependenciesJob extends Job {
  constructor(task: Task) {
    super({
      task,
      icon: JobIcon.Wait,
      category: JobCategory.InstallingDependencies,
      action: async () => {}
    });
  }
}
