import { JobStatus } from "@/store/modules/tasks-module/types";

export default {
  tasks: {
    name: "Tasks",
    progress: {
      status: {
        [JobStatus.Start]: "Starting...",
        [JobStatus.Exists]: "WAit for end exists task...",
      },
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
