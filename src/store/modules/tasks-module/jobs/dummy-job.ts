import { JobIcon, JobCategory } from "../types";
import { Task } from "../core/task";
import { Job } from "../core/job";

export class DummyJob extends Job {
  constructor(info: Task) {
    super(info, JobIcon.Dummy, JobCategory.Dummy, async () => {});
  }
}
