import { games, installerPackages } from "@/store";
import { InstalledPackage } from "@/store/modules/games-module/types";

export const uninstallPackage = async (p: InstalledPackage) => {
  await installerPackages.uninstall(p);
  await p.game.save();
  games.deletePackage(p);
  console.log("uninstaled");
};
