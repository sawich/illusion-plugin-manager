import { Resolver } from "./resolver";
import { Plugin } from "../core/plugin";

export class VSCSharpPartialResolver extends Resolver {
  public async install() {}
  public async update() {}

  public constructor(plugin: Plugin) {
    super(plugin);
  }
}
