import { Job } from "../core/job";
import { JobIcon, JobCategory, TaskStatus } from "../types";
import { Task } from "../core/task";
import { tasks } from "@/store";

export class WaitExistsJob extends Job {
  public constructor(task: Task) {
    super(task, JobIcon.GitHub, JobCategory.GitClone, async () => {});

    tasks.setStatus({ task, status: TaskStatus.GitCloning });
  }
}
