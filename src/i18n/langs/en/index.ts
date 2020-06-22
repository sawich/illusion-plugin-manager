import { TaskStatus } from "@/store/modules/tasks-module/types";

export default {
  game: {
    names: [
      /* PluginGame.PlayHome */ "Play Home",
      /* PluginGame.HoneySelect1 */ "Honey Select 1",
      /* PluginGame.Koikatsu */ "Koikatsu",
      /* PluginGame.AIShoujo */ "AI Shoujo",
      /* PluginGame.HoneySelect2 */ "Honey Select 2",
    ],
  },
  tasks: {
    name: "Tasks",
    status: {
      [TaskStatus.Start]: "Starting...",
      [TaskStatus.Exists]: "Wait for end exists task...",
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
