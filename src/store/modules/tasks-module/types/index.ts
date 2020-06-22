import { Task } from "../core/task";

export enum JobCategory {
  VSInstaller,
  GitPull,
  GitClone,
  VSBuild,
  Dummy,
}

export enum JobIcon {
  GitHub,
  Download,
  VisualStudio,
  Dummy,
}

export interface IRunnableJob<T> {
  info: Task;
  action: () => Promise<T>;
}

export enum TaskStatus {
  Start,
  Exists,
}

export interface ITasks {
  [key: string]: Task;
}
