// import { Task } from "@/store/modules/tasks-module";
// import simpleGit from "simple-git";
// import { resolve } from "path";

// export class GitPullTask extends Task {
//      async run() {
//         const path = resolve(__cache, "git/Mantas-2155X/BetterHScenes2");
//         const git = simpleGit(path);

//         try {
//             const r = await git.pull("https://github.com/Mantas-2155X/BetterHScenes");
//             if (r.files.length > 0) {
//             }

//             console.log(r);
//         } catch (e) {
//             console.log(e);
//         }
//     }

//      constructor(description: string) {
//         super("cloning", description, "github");
//     }
// }
