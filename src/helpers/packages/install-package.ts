import { installerPackages } from "@/store";
import { Package } from "@/store/modules/packages-module/types";

export const installPackage = (p: Package) => {
  installerPackages.install(p);
};
