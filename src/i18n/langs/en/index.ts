import { PluginGame } from "@/store/modules/packages-module/types";
import { JobCategory } from "@/store/modules/tasks-module/types";

export default {
  game: {
    names: {
      [PluginGame.PlayHome]: "Play Home",
      [PluginGame.HoneySelect1]: "Honey Select 1",
      [PluginGame.Koikatsu]: "Koikatsu",
      [PluginGame.AIShoujo]: "AI Shoujo",
      [PluginGame.HoneySelect2]: "Honey Select 2"
    }
  },
  job: {
    categories: {
      [JobCategory.Wait]: "—",
      [JobCategory.VSInstaller]: "VSInstaller",
      [JobCategory.GitPull]: "GitPull",
      [JobCategory.GitClone]: "GitClone",
      [JobCategory.VSBuild]: "VSBuild",
      [JobCategory.Wait]: "Wait...",
      [JobCategory.InstallingDependencies]: "Installing dependencies...",
      [JobCategory.Exists]:
        "This task runned by another game. Wait for end exists task..."
    }
  },
  plugins: {
    install: "Install",
    installing: "Installing",
    items: {
      "2f94706f-97e3-4274-8ed1-53fbd1c82498": {
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
      "31388055-2886-40f7-9b43-c6ae146875da": {
        name: "BepInEx.ConfigurationManager",
        description: "Mod configuration manager for BepInEx 5"
      },
      "1885f293-ed59-4ec2-8746-14625a9c2ab3": {
        name: "BetterHScenes",
        description:
          "This plugin fixes HScene performance bugs and adds extra features"
      },
      "4b11249a-f9a8-46d0-b372-748eb61091fe": {
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
