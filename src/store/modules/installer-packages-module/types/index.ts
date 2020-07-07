export interface IPluginContainer {
  uuid: string;
  uuidentity: string;
  dependence: string[];
  placer: IPlacerHeader;
  resolver: IResolverHeader;
}

export const enum PlacerType {
  Git,
  Patreon,
}

export const enum ResolverType {
  VisualStudio,
  UnZip,
}

export interface IPlacerHeader extends IPluginContainer {
  // placer: {
  type: PlacerType;
  // };
}

export type IGitPlacer = {
  // placer: {
  url: string;
  // };
} & IPlacerHeader;
// export interface IGitPlacer extends IPlacerHeader {
//   placer: {
//     url: string;
//   };
// }

export interface IResolverHeader extends IPluginContainer {
  type: ResolverType;
}

export interface IVSResolver extends IResolverHeader {
  files: {
    src: string;
    dst: string;
  }[];
  build: {
    file: string;
  }[];
}
