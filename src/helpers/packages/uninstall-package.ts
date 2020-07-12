import { games, installerPackages } from "@/store";
import { InstalledPackage } from "@/store/modules/games-module/types";

export const uninstallPackage = async (p: InstalledPackage) => {
  await installerPackages.uninstall(p);
  games.deletePackage(p);
  await p.game.save();
};
