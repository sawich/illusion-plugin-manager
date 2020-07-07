import { Task } from "@/store/modules/tasks-module/core/task";

export abstract class Resolver {
  abstract install(info: Task): Promise<void>;
  abstract update(info: Task): Promise<void>;
}
