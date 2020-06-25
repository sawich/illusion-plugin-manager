import { Job } from "../core/job";
import { JobIcon, JobCategory, TaskStatus } from "../types";
import { Task } from "../core/task";
import { tasks } from "@/store";

export class GitCloneJob extends Job {
  constructor(task: Task, action: () => Promise<void>) {
    super(task, JobIcon.GitHub, JobCategory.GitClone, action);

    tasks.setStatus({ task, status: TaskStatus.GitCloning });
  }
}
