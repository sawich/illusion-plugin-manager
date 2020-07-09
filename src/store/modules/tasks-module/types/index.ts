import { Task } from "../core/task";

export const enum JobIcon {
  /** Nothing. */
  Wait,

  GitHub,
  Download,
  VisualStudio,
  FileMove
}

export const enum JobCategory {
  VSInstaller,
  GitPull,
  GitClone,
  VSBuild,
  FileMove,

  /** Nothing. */
  Exists,
  Wait,
  InstallingDependencies
}

export interface IRunnableJob<T> {
  task: Task;
  action: () => Promise<T>;
}

export interface ITasks {
  [key: string]: Task;
}
