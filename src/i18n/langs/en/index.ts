import { TaskStatus, JobCategory } from "@/store/modules/tasks-module/types";
import { PluginGame } from "@/store/modules/plugins-module/types";

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
    },
  },
  tasks: {
    name: "Tasks",
    status: {
      [TaskStatus.Dymmy]: "Starting...",
      [TaskStatus.Exists]: "This task runned by another game. Wait for end exists task...",
      [TaskStatus.GitCloning]: "Cloning from git...",
    },
  },
  plugins: {
    install: "Install",
    installing: "Installing",
    items: [
      {
        name: "BepInEx",
        desc: "Bepis Injector Extensible",
      },
      {
        name: "BetterHScenes",
        desc: "This plugin fixes HScene performance bugs and adds extra features",
      },
      {
        name: "BrowserFolders",
        desc: "Maker and Studio File Browser Folders for games by Illusion",
      },
    ],
  },
};
