import { Plugin } from "../core/plugin";
import { Resolver } from "./resolver";

export class VSCSharpResolver extends Resolver {
  public async install() {}
  public async update() {}

  public constructor(plugin: Plugin) {
    super(plugin);
  }
}
