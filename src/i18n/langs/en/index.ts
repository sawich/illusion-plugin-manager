import { JobCategory } from "@/store/modules/tasks-module/types";
import { PluginGame } from "@/store/modules/packages-module/types";

export default {
  game: {
    names: {
      [PluginGame.PlayHome]: "Play Home",
      [PluginGame.HoneySelect1]: "Honey Select 1",
      [PluginGame.Koikatsu]: "Koikatsu",
      [PluginGame.AIShoujo]: "AI Shoujo",
      [PluginGame.HoneySelect2]: "Honey Select 2",
    },
  },
  job: {
    categories: {
      [JobCategory.Dummy]: "—",
      [JobCategory.VSInstaller]: "VSInstaller",
      [JobCategory.GitPull]: "GitPull",
      [JobCategory.GitClone]: "GitClone",
      [JobCategory.VSBuild]: "VSBuild",
      [JobCategory.Dummy]: "Starting...",
      [JobCategory.Exists]: "This task runned by another game. Wait for end exists task...",
    },
  },
  // tasks: {
  //   name: "Tasks",
  //   status: {
  //     [JobStatus.Dummy]: "Starting...",
  //     [JobStatus.Exists]: "This task runned by another game. Wait for end exists task...",
  //     [JobStatus.Git]: "Cloning from git...",
  //   },
  // },
  plugins: {
    install: "Install",
    installing: "Installing",
    items: {
      "2f94706f-97e3-4274-8ed1-53fbd1c82498": {
        name: "BepInEx",
        description: "Bepis Injector Extensible",
      },
      "31388055-2886-40f7-9b43-c6ae146875da": {
        name: "BepInEx.ConfigurationManager",
        description: "Mod configuration manager for BepInEx 5",
      },
      "1885f293-ed59-4ec2-8746-14625a9c2ab3": {
        name: "BetterHScenes",
        description: "This plugin fixes HScene performance bugs and adds extra features",
      },
    },
  },
};
