"use strict";
import { app, protocol, BrowserWindow } from "electron";
import { createProtocol, } from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }]);
// protocol.registerStandardSchemes(['app'], { secure: true })
function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            webSecurity: process.env.NODE_ENV !== "development",
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            // nodeIntegration: Boolean(process.env.ELECTRON_NODE_INTEGRATION)
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
        },
    });
    win.setMenuBarVisibility(false);
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST)
            win.webContents.openDevTools();
    }
    else {
        createProtocol("app");
        // Load the index.html when not in development
        win.loadURL("app://./index.html");
    }
    win.on("closed", () => {
        win = null;
    });
}
// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        // Devtools extensions are broken in Electron 6.0.0 and greater
        // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
        // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
        // If you are not using Windows 10 dark mode, you may uncomment these lines
        // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
        // try {
        //   await installVueDevtools()
        // } catch (e) {
        //   console.error('Vue Devtools failed to install:', e.toString())
        // }
    }
    createWindow();
});
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", (data) => {
            if (data === "graceful-exit") {
                app.quit();
            }
        });
    }
    else {
        process.on("SIGTERM", () => {
            app.quit();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhY2tncm91bmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3hELE9BQU8sRUFDTCxjQUFjLEdBRWYsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3QyxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUM7QUFFNUQsOEVBQThFO0FBQzlFLDJFQUEyRTtBQUMzRSxJQUFJLEdBQXlCLENBQUM7QUFFOUIsb0RBQW9EO0FBQ3BELFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4Ryw4REFBOEQ7QUFDOUQsU0FBUyxZQUFZO0lBQ25CLDZCQUE2QjtJQUM3QixHQUFHLEdBQUcsSUFBSSxhQUFhLENBQUM7UUFDdEIsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsR0FBRztRQUNYLEtBQUssRUFBRSxLQUFLO1FBQ1osY0FBYyxFQUFFO1lBQ2QsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLGFBQWE7WUFDbkQsc0RBQXNEO1lBQ3RELDRHQUE0RztZQUM1RyxrRUFBa0U7WUFDbEUsZUFBZSxFQUFFLElBQUk7WUFDckIsdUJBQXVCLEVBQUUsSUFBSTtTQUM5QjtLQUNGLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVoQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUU7UUFDdEMsd0RBQXdEO1FBQ3hELEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBZ0MsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU87WUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQzFEO1NBQU07UUFDTCxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEIsOENBQThDO1FBQzlDLEdBQUcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUNuQztJQUVELEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtRQUNwQixHQUFHLEdBQUcsSUFBSSxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsb0NBQW9DO0FBQ3BDLEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO0lBQy9CLDREQUE0RDtJQUM1RCw4REFBOEQ7SUFDOUQsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUNqQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDWjtBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO0lBQ3RCLGlFQUFpRTtJQUNqRSw0REFBNEQ7SUFDNUQsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO1FBQ2hCLFlBQVksRUFBRSxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCx3REFBd0Q7QUFDeEQseURBQXlEO0FBQ3pELHNEQUFzRDtBQUN0RCxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRTtJQUN6QixJQUFJLGFBQWEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1FBQ3pDLHVCQUF1QjtRQUN2QiwrREFBK0Q7UUFDL0QsMkZBQTJGO1FBQzNGLDJGQUEyRjtRQUMzRiwyRUFBMkU7UUFDM0UsaUdBQWlHO1FBQ2pHLFFBQVE7UUFDUiwrQkFBK0I7UUFDL0IsZ0JBQWdCO1FBQ2hCLG1FQUFtRTtRQUNuRSxJQUFJO0tBQ0w7SUFDRCxZQUFZLEVBQUUsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQztBQUVILG1FQUFtRTtBQUNuRSxJQUFJLGFBQWEsRUFBRTtJQUNqQixJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO1FBQ2hDLE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDN0IsSUFBSSxJQUFJLEtBQUssZUFBZSxFQUFFO2dCQUM1QixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDWjtRQUNILENBQUMsQ0FBQyxDQUFDO0tBQ0o7U0FBTTtRQUNMLE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUN6QixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQztLQUNKO0NBQ0YifQ==