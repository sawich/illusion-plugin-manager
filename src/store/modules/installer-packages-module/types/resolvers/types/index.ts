export const enum ResolverType {
  VisualStudio,
  UnZip
}

export interface IResolverHeader {
  type: ResolverType;
}

export interface IVSBuild {
  file: string;
}

export interface IVSResolver extends IResolverHeader {
  build: IVSBuild[];
}
