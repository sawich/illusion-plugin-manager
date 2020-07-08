import { IResolverHeader } from "./resolvers/types";
import { IPlacerHeader } from "./placers/types";
import { IMoverHeader } from "./movers/types";

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
  uuid: string;
  uuidentity: string;
  dependence: string[];
  nodes: INodeHeader[];
}
