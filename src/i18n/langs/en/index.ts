import { GameId } from "@/store/modules/packages-module/types";
import { JobCategory } from "@/store/modules/tasks-module/types";

import games from "./games.json";
import packages from "./packages.json";

export default {
  game: {
    names: {
      ...games,
      [GameId.PlayHome]: "Play Home",
      [GameId.HoneySelect1]: "Honey Select 1",
      [GameId.Koikatsu]: "Koikatsu",
      [GameId.KoikatsuSteam]: "Koikatsu (Steam)",
      [GameId.AIShoujo]: "AI Shoujo",
      [GameId.AIShoujoSteam]: "AI Shoujo (Steam)",
      [GameId.HoneySelect2]: "Honey Select 2",
      [GameId.EmotionCreators]: "Emotion Creators"
    }
  },
  tasks: {
    empty: "Nothing..."
  },
  job: {
    categories: {
      [JobCategory.VSInstaller]:
        "Installing addditional Visual Studio components",
      [JobCategory.GitPull]: "Pulling from git",
      [JobCategory.GitClone]: "Cloning from git",
      [JobCategory.VSBuild]: "Building binaries",
      [JobCategory.Wait]: "Wait...",
      [JobCategory.InstallingDependencies]: "Installing dependencies..."
      // [JobCategory.Exists]: "This task runned by another game. Wait for end exists task..."
    }
  },
  plugins: {
    uninstall: "Uninstall",
    disable: "Disable",
    enable: "Enable",
    install: "Install",
    installing: "Installing",
    items: {
      ...packages
    }
  }
};
