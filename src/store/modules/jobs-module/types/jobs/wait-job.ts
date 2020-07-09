import { Task } from "@/store/modules/tasks-module/core/task";
import { JobCategory, JobIcon } from "@/store/modules/tasks-module/types";

import { Job } from "../core/job";

export class WaitJob extends Job {
  constructor(task: Task) {
    super({
      task,
      icon: JobIcon.Wait,
      category: JobCategory.Wait,
      action: async () => {}
    });
  }
}
