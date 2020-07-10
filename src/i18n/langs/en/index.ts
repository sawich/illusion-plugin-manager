import { PluginGame } from "@/store/modules/packages-module/types";
import { JobCategory } from "@/store/modules/tasks-module/types";

export default {
  game: {
    names: {
      [PluginGame.PlayHome]: "Play Home",
      [PluginGame.HoneySelect1]: "Honey Select 1",
      [PluginGame.Koikatsu]: "Koikatsu",
      [PluginGame.AIShoujo]: "AI Shoujo",
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
    install: "Install",
    installing: "Installing",
    items: {
      "e30cfeba-c751-4dbb-a350-1209acd960e1": {
        name: "BepInEx",
        description: "Bepis Injector Extensible"
      },
      "4df25152-dc91-4b31-bfa4-904447a02a85": {
        name: "BGMLoader",
        description:
          "Loads custom BGMs and clips played on game startup. Stock audio is replaced during runtime by custom clips from BepInEx\\BGM and BepInEx\\IntroClips directories"
      },
      "54daee20-d190-42ff-9756-438798cec16c": {
        name: "ColorCorrector",
        description:
          "Allows configuration of some post-processing filters. (change of bloom amount, disable saturation filter)"
      },
      "c3db40bf-d97d-4cd4-859c-9dd453f5e789": {
        name: "BepInEx.ConfigurationManager",
        description: "Mod configuration manager for BepInEx 5"
      },
      "1885f293-ed59-4ec2-8746-14625a9c2ab3": {
        name: "BetterHScenes",
        description:
          "This plugin fixes HScene performance bugs and adds extra features"
      },
      "1b4bb2d6-87e2-45fa-aee7-a27bba9f5342": {
        name: "HCharaSwitcher",
        description:
          "This plugin allows you to change character cards during H scene"
      },
      "fd363547-ea54-4db1-a08c-b13a1ae64542": {
        name: "BrowserFolders",
        description:
          "Maker and Studio File Browser Folders for games by Illusion"
      }
    }
  }
};
