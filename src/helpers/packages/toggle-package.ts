import { games } from "@/store";
import { InstalledPackage } from "@/store/modules/games-module/types";

export const togglePackage = (installed: InstalledPackage) => {
  games.togglePackage(installed);
};
