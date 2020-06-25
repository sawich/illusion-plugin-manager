import { Resolver } from "./resolver";
import { Plugin } from "../core/plugin";

export class VSCSharpPartialResolver extends Resolver {
  async install() {}
  async update() {}

  constructor(plugin: Plugin) {
    super(plugin);
  }
}
