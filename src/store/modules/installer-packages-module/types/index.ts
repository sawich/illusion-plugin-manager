import { IMoverHeader } from "./movers/types";
import { IPlacerHeader } from "./placers/types";
import { IResolverHeader } from "./resolvers/types";

export const enum NodeType {
  Resolver,
  Placer,
  Mover
}

export interface INodeHeader {
  type: NodeType;
  node: IPlacerHeader | IResolverHeader | IMoverHeader;
}

export interface IPluginContainer {
  dependence: string[];
  nodes: INodeHeader[];
}
