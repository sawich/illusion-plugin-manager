import { JobIcon, JobCategory } from "@/store/modules/tasks-module/types";
import { Task } from "@/store/modules/tasks-module/core/task";
import { Job } from "../core/job";

export class DummyJob extends Job {
  constructor(task: Task) {
    super({ task, icon: JobIcon.Dummy, category: JobCategory.Dummy, action: async () => {} });
  }
}
