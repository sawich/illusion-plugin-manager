import { Plugin } from "../core/plugin";
import { Resolver } from "./resolver";

export class VSCSharpResolver extends Resolver {
  async install() {}
  async update() {}

  constructor(plugin: Plugin) {
    super(plugin);
  }
}
