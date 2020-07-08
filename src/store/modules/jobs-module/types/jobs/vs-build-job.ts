import { JobIcon, JobCategory } from "@/store/modules/tasks-module/types";
import { Task } from "@/store/modules/tasks-module/core/task";
import { Job } from "../core/job";

export class VSBuildJob extends Job {
  constructor(info: { task: Task; action: () => Promise<void> }) {
    super({
      ...info,
      icon: JobIcon.VisualStudio,
      category: JobCategory.VSBuild
    });
  }
}
