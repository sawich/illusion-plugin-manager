// import { Task, ProgressHandler } from "@/store/modules/tasks-module";

// // "https://dotnet.microsoft.com/download/dotnet-core/scripts/v1/dotnet-install.ps1",
// // "https://github.com/git-for-windows/git/releases/download/v2.27.0.windows.1/Git-2.27.0-32-bit.exe",

// export type ResolverType = (r: Response | PromiseLike<Response> | undefined) => void;
// export type RejectorType = (r: any) => void;

// export class Download extends Task {
//     public async run(handler: ProgressHandler) {
//         let progress = 0;

//         try {
//             const r = await fetch(this.private _url, { mode: "no-cors" });
//             if (!r.ok) return this._rejector(r);

//             const length = Number(r.headers.get("Content-Length"));
//             if (length === Infinity) return this._resolver(r);

//             const response = r.clone();
//             if (response.body === null) return this._rejector(r);

//             let received = 0;
//             const reader = response.body.getReader();
//             while (true) {
//                 const { done, value } = await reader.read();
//                 if (done || value === undefined) return this._resolver(r);

//                 received += value.length;
//                 progress = (100 * received) / length;

//                 handler(progress);
//             }
//         } finally {
//             super.resolve();
//         }
//     }

//     public constructor(url: string, description: string, resolve: ResolverType, reject: RejectorType) {
//         super("downloading", description, "just_download");

//         this._url = url;
//         this._resolver = resolve;
//         this._rejector = reject;
//     }

//     private _url: string;
//     private _resolver: ResolverType;
//     private _rejector: RejectorType;
// }
