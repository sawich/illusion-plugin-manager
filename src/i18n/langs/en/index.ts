import { PluginGame } from "@/store/modules/packages-module/types";
import { JobCategory } from "@/store/modules/tasks-module/types";

import games from "./games.json";
import packages from "./packages.json";

export default {
  game: {
    names: {
      ...games,
      [PluginGame.PlayHome]: "Play Home",
      [PluginGame.HoneySelect1]: "Honey Select 1",
      [PluginGame.Koikatsu]: "Koikatsu",
      [PluginGame.KoikatsuSteam]: "Koikatsu (Steam)",
      [PluginGame.AIShoujo]: "AI Shoujo",
      [PluginGame.AIShoujoSteam]: "AI Shoujo (Steam)",
      [PluginGame.HoneySelect2]: "Honey Select 2",
      [PluginGame.EmotionCreators]: "Emotion Creators"
    }
  },
  tasks: {
    empty: "Hello there..."
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
