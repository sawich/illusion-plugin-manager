export const enum ResolverType {
  VisualStudio,
  UnZip
}

export interface IResolverHeader {
  type: ResolverType;
}

export interface IVSProject {
  file: string;
  ignore: string[];
}

export type IVSProjects = IVSProject[];

export interface IVSResolver extends IResolverHeader {
  projects: IVSProjects;
}
