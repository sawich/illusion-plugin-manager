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
      { name: "BepInEx", description: "Bepis Injector Extensible" },
      { name: "BepInEx.ConfigurationManager", description: "Mod configuration manager for BepInEx 5" },
      { name: "BetterHScenes", description: "This plugin fixes HScene performance bugs and adds extra features" },
      { name: "BrowserFolders", description: "Maker and Studio File Browser Folders for games by Illusion" },
      {
        name: "CameraTargetFix",
        description:
          "Hides the cursor when the camera target is disabled in Studio. In AI Girl, also makes the camera target option in the game settings work properly for the character maker",
      },
      { name: "CharacterListOptimizations", description: "Makes character lists load faster" },
      {
        name: "CenteredHSceneCursor",
        description:
          "Fixes the cursor texture not being properly centeres in H scenes, so it's easier to click on things",
      },
      {
        name: "ExpandShaderDropdown",
        description:
          "Makes the shader drop down menu extend down instaed of up and expands it. Necessary to select modded shaders since they run off the screen by default",
      },
      {
        name: "HeterochromiaFix",
        description: "Allows you to load characters with different iris types without them being reset",
      },
      {
        name: "InvalidSceneFileProtection",
        description:
          "Adds error handling to scene loading and importing. If a scene is invalid or from the wrong game version then a message is shown and the studio doesn't crash",
      },
      {
        name: "LoadingFixes",
        description:
          "Fixes some studio scenes failing to load (sometimes you can't load the scene you've just saved with the stock game, many scenes on uploader are like this). Also fixes color picker breaking in maker because of a similar issue",
      },
      {
        name: "MainGameOptimizations",
        description:
          "Multiple performance optimizations for the story mode. Aimed to reduce stutter and random FPS drops",
      },
      {
        name: "MakerOptimizations",
        description:
          "Multiple performance optimizations for the character maker. Can greatly increase FPSMultiple performance optimizations for the character maker. Can greatly increase FPS, makes turning on/off the interface in maker by pressing space much faster (after the 1st press), and more",
      },
      {
        name: "ManifestCorrector",
        description:
          "Prevents mods that use incorrect data in the MainManifest column of item lists from locking up the game in story mode",
      },
      {
        name: "ModdedHeadEyeliner",
        description: "Fixes modded head eyeliners not working on other head types than default",
      },
      {
        name: "NewGameShowAllCards",
        description:
          "Fixes downloaded character cards not appearing in the New Game character selection (so you don't have to go to maker and re-save them)",
      },
      { name: "NullChecks", description: "Fixes for some questionably made mods causing issues" },
      {
        name: "PartyCardCompatibility",
        description: "Allows loading of cards saved in Koikatsu Party (Steam release) in Koikatu and Studio",
      },
      {
        name: "PersonalityCorrector",
        description:
          "Prevents cards with invalid or missing personalities from crashing the game. A default personality is set instead",
      },
      { name: "PoseLoad", description: "Corrects Honey Select poses loaded in Koikatsu and prevents errors" },
      {
        name: "ResourceUnloadOptimizations",
        description: 'Improves loading times and eliminates stutter after loading was "finished"',
      },
      {
        name: "SettingsVerifier",
        description:
          "Prevents corrupted setting from causing issues and forces studio to use the settings.xml file instead of registry",
      },
      {
        name: "ShowerAccessories",
        description:
          "Prevents accessories from being removed in shower peeping mode. No more gaping holes in the head when using hair accessories",
      },
      {
        name: "UnlimitedMapLights",
        description:
          "Allows using an unlimited amount of map lights in studio. Not all items support more than 3 lights",
      },
    ],
  },
};
