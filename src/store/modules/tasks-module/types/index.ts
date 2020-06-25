import { Task } from "../core/task";

export const enum JobCategory {
  VSInstaller,
  GitPull,
  GitClone,
  VSBuild,

  /** Nothing. */
  Dummy,
}

export const enum JobIcon {
  /** Nothing. */
  Dummy,

  GitHub,
  Download,
  VisualStudio,
}

export interface IRunnableJob<T> {
  task: Task;
  action: () => Promise<T>;
}

export const enum TaskStatus {
  Exists,
  GitCloning,

  /** Nothing. */
  Dymmy,
}

export interface ITasks {
  [key: string]: Task;
}
