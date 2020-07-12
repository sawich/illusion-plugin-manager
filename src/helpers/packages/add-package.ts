import { games } from "@/store";
import { PackageBuilder } from "@/store/modules/installer-packages-module/types/core/installer";

export const addPackage = (builder: PackageBuilder) => {
  games.addPackage(builder);
};
