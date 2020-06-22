import { Task } from "../core/task";

export enum JobCategory {
  VSInstaller,
  GitPull,
  GitClone,
  VSBuild,

  /** Nothing. */
  Dummy,
}

export enum JobIcon {
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

export enum TaskStatus {
  Exists,
  GitCloning,

  /** Nothing. */
  Dymmy,
}

export interface ITasks {
  [key: string]: Task;
}
