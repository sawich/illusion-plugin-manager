import { PluginContainer } from "../core/installer";
import { Task } from "@/store/modules/tasks-module/core/task";

export abstract class Placer {
  abstract install(info: Task): Promise<void>;
  abstract update(info: Task): Promise<void>;
}
