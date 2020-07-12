import { games } from "@/store";
import { InstalledPackage } from "@/store/modules/games-module/types";
import { PackageBuilder } from "@/store/modules/installer-packages-module/types/core/installer";

export const addPackage = (builder: PackageBuilder) => {
  const installed = new InstalledPackage({
    uuid: builder.package.uuid,
    version: builder.version,
    files: builder.files,
    disabled: false,
    game: builder.package.game
  });

  games.addPackage(installed);
};
